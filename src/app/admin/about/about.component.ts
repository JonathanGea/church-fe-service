import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminContentService } from '../../core/services/admin-content.service';
import { AboutContent, AboutLeader } from '../../core/models/content.models';
import { validateAboutContent } from '../../core/validators/content.validators';
import { AdminFormActionsComponent } from '../../shared/ui/admin-form-actions/admin-form-actions.component';
import { StatusBannerComponent, StatusVariant } from '../../shared/ui/status-banner/status-banner.component';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-admin-about-page',
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
  templateUrl: './about.component.html'
})
export class AdminAboutPageComponent {
  private readonly adminContentService = inject(AdminContentService);
  private readonly destroyRef = inject(DestroyRef);

  about: AboutContent = this.createEmptyAboutContent();
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  statusMessage = '';
  statusVariant: StatusVariant = 'info';
  hasData = false;

  private snapshot: AboutContent = this.createEmptyAboutContent();

  ngOnInit(): void {
    this.loadAbout();
  }

  loadAbout(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.statusMessage = '';

    this.adminContentService
      .getAbout()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.errorMessage = 'Gagal memuat data tentang jemaat.';
            return;
          }

          if (response.data) {
            this.about = this.normalizeAbout(response.data);
            this.snapshot = this.normalizeAbout(response.data);
            this.hasData = true;
          } else {
            this.about = this.createEmptyAboutContent();
            this.snapshot = this.createEmptyAboutContent();
            this.hasData = false;
          }
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data tentang jemaat.';
        }
      });
  }

  onSave(): void {
    if (this.isSaving) {
      return;
    }

    const validation = validateAboutContent(this.about);
    if (!validation.isValid) {
      this.statusVariant = 'error';
      this.statusMessage = validation.errors.join(' ');
      return;
    }

    this.isSaving = true;
    this.statusMessage = '';

    this.adminContentService
      .updateAbout(this.about)
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
            this.statusMessage = 'Gagal menyimpan data tentang jemaat.';
            return;
          }
          this.statusVariant = 'success';
          this.statusMessage = 'Data tentang jemaat berhasil disimpan.';
          this.hasData = true;
          if (response.data) {
            this.about = this.normalizeAbout(response.data);
            this.snapshot = this.normalizeAbout(response.data);
          }
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menyimpan data tentang jemaat.';
        }
      });
  }

  onCancel(): void {
    this.about = this.cloneAbout(this.snapshot);
    this.statusMessage = '';
  }

  addMission(): void {
    this.about.missions.push('');
  }

  removeMission(index: number): void {
    this.about.missions.splice(index, 1);
  }

  addLeader(): void {
    this.about.leaders.push({ role: '', name: '' });
  }

  removeLeader(index: number): void {
    this.about.leaders.splice(index, 1);
  }

  trackMission(index: number, mission: string): string {
    return `${mission}-${index}`;
  }

  trackLeader(index: number, leader: AboutLeader): string {
    return `${leader.role}-${leader.name}-${index}`;
  }

  private createEmptyAboutContent(): AboutContent {
    return {
      hero: {
        label: '',
        title: '',
        description: ''
      },
      history: {
        summary: '',
        establishedYear: 0,
        serviceArea: '',
        notes: ''
      },
      vision: '',
      missions: [],
      leaders: []
    };
  }

  private cloneAbout(data: AboutContent): AboutContent {
    return JSON.parse(JSON.stringify(data)) as AboutContent;
  }

  private normalizeAbout(data: AboutContent): AboutContent {
    const normalized = this.cloneAbout(data);
    normalized.missions = normalized.missions ?? [];
    normalized.leaders = normalized.leaders ?? [];
    return normalized;
  }
}
