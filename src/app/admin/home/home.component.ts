import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { AdminContentService } from '../../core/services/admin-content.service';
import {
  HomeContent,
  QuickLinkCard,
  ScheduleSummaryItem
} from '../../core/models/content.models';
import { validateHomeContent } from '../../core/validators/content.validators';
import { AdminFormActionsComponent } from '../../shared/ui/admin-form-actions/admin-form-actions.component';
import { StatusBannerComponent, StatusVariant } from '../../shared/ui/status-banner/status-banner.component';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-admin-home-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    AdminFormActionsComponent,
    StatusBannerComponent,
    LoadingStateComponent,
    ErrorStateComponent,
    EmptyStateComponent
  ],
  templateUrl: './home.component.html'
})
export class AdminHomePageComponent {
  private readonly adminContentService = inject(AdminContentService);
  private readonly destroyRef = inject(DestroyRef);

  home: HomeContent = this.createEmptyHomeContent();
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  statusMessage = '';
  statusVariant: StatusVariant = 'info';
  hasData = false;
  canAddSchedule = true;

  private snapshot: HomeContent = this.createEmptyHomeContent();

  ngOnInit(): void {
    this.loadHome();
  }

  loadHome(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.statusMessage = '';

    this.adminContentService
      .getHome()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.errorMessage = 'Gagal memuat data beranda.';
            return;
          }

          if (response.data) {
            this.home = this.normalizeHome(response.data);
            this.snapshot = this.normalizeHome(response.data);
            this.hasData = true;
          } else {
            this.home = this.createEmptyHomeContent();
            this.snapshot = this.createEmptyHomeContent();
            this.hasData = false;
          }

          this.updateScheduleLimit();
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data beranda.';
        }
      });
  }

  onSave(): void {
    if (this.isSaving) {
      return;
    }

    const validation = validateHomeContent(this.home);
    if (!validation.isValid) {
      this.statusVariant = 'error';
      this.statusMessage = validation.errors.join(' ');
      return;
    }

    this.isSaving = true;
    this.statusMessage = '';

    this.adminContentService
      .updateHome(this.home)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.statusVariant = 'error';
            this.statusMessage = 'Gagal menyimpan data beranda.';
            return;
          }
          this.statusVariant = 'success';
          this.statusMessage = 'Data beranda berhasil disimpan.';
          this.hasData = true;
          if (response.data) {
            this.home = this.normalizeHome(response.data);
            this.snapshot = this.normalizeHome(response.data);
            this.updateScheduleLimit();
          }
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menyimpan data beranda.';
        }
      });
  }

  onCancel(): void {
    this.home = this.cloneHome(this.snapshot);
    this.statusMessage = '';
    this.updateScheduleLimit();
  }

  addScheduleItem(): void {
    if (!this.canAddSchedule) {
      return;
    }
    this.home.scheduleSummary.push({
      day: '',
      title: '',
      time: '',
      location: ''
    });
    this.updateScheduleLimit();
  }

  removeScheduleItem(index: number): void {
    this.home.scheduleSummary.splice(index, 1);
    this.updateScheduleLimit();
  }

  addOnlineQuickLink(): void {
    const quickLinks = this.home.onlineWorship.quickLinks ?? [];
    quickLinks.push({
      label: '',
      title: '',
      url: ''
    });
    this.home.onlineWorship.quickLinks = quickLinks;
  }

  removeOnlineQuickLink(index: number): void {
    this.home.onlineWorship.quickLinks?.splice(index, 1);
  }

  addAccessQuickLink(): void {
    this.home.quickLinks.push({
      label: '',
      title: '',
      description: '',
      url: ''
    });
  }

  removeAccessQuickLink(index: number): void {
    this.home.quickLinks.splice(index, 1);
  }

  trackScheduleItem(index: number, item: ScheduleSummaryItem): string {
    return `${item.day}-${item.title}-${index}`;
  }

  trackQuickLink(index: number, item: QuickLinkCard): string {
    return `${item.label}-${item.title}-${index}`;
  }

  private updateScheduleLimit(): void {
    this.canAddSchedule = this.home.scheduleSummary.length < 3;
  }

  private createEmptyHomeContent(): HomeContent {
    return {
      hero: {
        title: '',
        description: '',
        ctaPrimary: { label: '', url: '' },
        ctaSecondary: { label: '', url: '' },
        ctaTertiary: { label: '', url: '' }
      },
      scheduleSummary: [],
      weeklyTheme: {
        title: '',
        dateLabel: '',
        verseText: '',
        verse: '',
        preacher: '',
        location: ''
      },
      onlineWorship: {
        isLive: false,
        embedUrl: '',
        streamUrl: '',
        channelUrl: '',
        action: { label: '', url: '' },
        quickLinks: []
      },
      quickLinks: []
    };
  }

  private cloneHome(data: HomeContent): HomeContent {
    return JSON.parse(JSON.stringify(data)) as HomeContent;
  }

  private normalizeHome(data: HomeContent): HomeContent {
    const normalized = this.cloneHome(data);
    normalized.hero.ctaSecondary ??= { label: '', url: '' };
    normalized.hero.ctaTertiary ??= { label: '', url: '' };
    normalized.weeklyTheme.verseText ??= '';
    normalized.scheduleSummary = normalized.scheduleSummary ?? [];
    normalized.onlineWorship.action ??= { label: '', url: '' };
    normalized.onlineWorship.quickLinks = normalized.onlineWorship.quickLinks ?? [];
    normalized.quickLinks = normalized.quickLinks ?? [];
    return normalized;
  }
}
