import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminContentService } from '../../core/services/admin-content.service';
import { WorshipContent, WorshipScheduleItem } from '../../core/models/content.models';
import { validateWorshipContent } from '../../core/validators/content.validators';
import { AdminFormActionsComponent } from '../../shared/ui/admin-form-actions/admin-form-actions.component';
import { StatusBannerComponent, StatusVariant } from '../../shared/ui/status-banner/status-banner.component';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-admin-worship-page',
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
  templateUrl: './worship.component.html'
})
export class AdminWorshipPageComponent {
  private readonly adminContentService = inject(AdminContentService);
  private readonly destroyRef = inject(DestroyRef);

  worship: WorshipContent = this.createEmptyWorshipContent();
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  statusMessage = '';
  statusVariant: StatusVariant = 'info';
  hasData = false;

  private snapshot: WorshipContent = this.createEmptyWorshipContent();

  ngOnInit(): void {
    this.loadWorship();
  }

  loadWorship(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.statusMessage = '';

    this.adminContentService
      .getWorship()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.errorMessage = 'Gagal memuat data ibadah.';
            return;
          }

          if (response.data) {
            this.worship = this.normalizeWorship(response.data);
            this.snapshot = this.normalizeWorship(response.data);
            this.hasData = true;
          } else {
            this.worship = this.createEmptyWorshipContent();
            this.snapshot = this.createEmptyWorshipContent();
            this.hasData = false;
          }
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data ibadah.';
        }
      });
  }

  onSave(): void {
    if (this.isSaving) {
      return;
    }

    const validation = validateWorshipContent(this.worship);
    if (!validation.isValid) {
      this.statusVariant = 'error';
      this.statusMessage = validation.errors.join(' ');
      return;
    }

    this.isSaving = true;
    this.statusMessage = '';

    this.adminContentService
      .updateWorship(this.worship)
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
            this.statusMessage = 'Gagal menyimpan data ibadah.';
            return;
          }
          this.statusVariant = 'success';
          this.statusMessage = 'Data ibadah berhasil disimpan.';
          this.hasData = true;
          if (response.data) {
            this.worship = this.normalizeWorship(response.data);
            this.snapshot = this.normalizeWorship(response.data);
          }
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menyimpan data ibadah.';
        }
      });
  }

  onCancel(): void {
    this.worship = this.cloneWorship(this.snapshot);
    this.statusMessage = '';
  }

  addScheduleItem(): void {
    this.worship.schedule.push({
      day: '',
      title: '',
      time: '',
      location: ''
    });
  }

  removeScheduleItem(index: number): void {
    this.worship.schedule.splice(index, 1);
  }

  trackScheduleItem(index: number, item: WorshipScheduleItem): string {
    return `${item.day}-${item.title}-${index}`;
  }

  private createEmptyWorshipContent(): WorshipContent {
    return {
      hero: {
        label: '',
        title: '',
        description: ''
      },
      schedule: [],
      liturgy: {
        wartaUrl: ''
      },
      online: {
        isLive: false,
        embedUrl: '',
        streamUrl: '',
        channelUrl: ''
      },
      weeklyTheme: {
        title: '',
        verse: '',
        preacher: ''
      }
    };
  }

  private cloneWorship(data: WorshipContent): WorshipContent {
    return JSON.parse(JSON.stringify(data)) as WorshipContent;
  }

  private normalizeWorship(data: WorshipContent): WorshipContent {
    const normalized = this.cloneWorship(data);
    normalized.schedule = normalized.schedule ?? [];
    return normalized;
  }
}
