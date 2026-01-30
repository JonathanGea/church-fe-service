import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminContentService } from '../../core/services/admin-content.service';
import { ConfirmService } from '../../core/services/confirm.service';
import {
  ActivityArchive,
  ActivityCalendarItem,
  ActivityItem,
  ActivityList,
  ActivityPayload
} from '../../core/models/content.models';
import { validateActivityList } from '../../core/validators/content.validators';
import { AdminFormActionsComponent } from '../../shared/ui/admin-form-actions/admin-form-actions.component';
import { StatusBannerComponent, StatusVariant } from '../../shared/ui/status-banner/status-banner.component';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-admin-activities-page',
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
  templateUrl: './activities.component.html'
})
export class AdminActivitiesPageComponent {
  private readonly adminContentService = inject(AdminContentService);
  private readonly confirmService = inject(ConfirmService);
  private readonly destroyRef = inject(DestroyRef);

  activities: ActivityList = this.createEmptyActivities();
  isLoading = false;
  isSaving = false;
  isSavingUpcoming = false;
  errorMessage = '';
  statusMessage = '';
  statusVariant: StatusVariant = 'info';
  hasData = false;

  newUpcoming: ActivityPayload = this.createEmptyActivityPayload();

  private snapshot: ActivityList = this.createEmptyActivities();

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.statusMessage = '';

    this.adminContentService
      .getActivities()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.errorMessage = 'Gagal memuat data kegiatan.';
            return;
          }

          if (response.data) {
            this.activities = this.normalizeActivities(response.data);
            this.snapshot = this.normalizeActivities(response.data);
            this.hasData = true;
          } else {
            this.activities = this.createEmptyActivities();
            this.snapshot = this.createEmptyActivities();
            this.hasData = false;
          }
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data kegiatan.';
        }
      });
  }

  onSaveContent(): void {
    if (this.isSaving) {
      return;
    }

    const validation = validateActivityList(this.activities);
    if (!validation.isValid) {
      this.statusVariant = 'error';
      this.statusMessage = validation.errors.join(' ');
      return;
    }

    this.isSaving = true;
    this.statusMessage = '';

    this.adminContentService
      .updateActivities(this.activities)
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
            this.statusMessage = 'Gagal menyimpan konten kegiatan.';
            return;
          }
          this.statusVariant = 'success';
          this.statusMessage = 'Konten kegiatan berhasil disimpan.';
          this.hasData = true;
          if (response.data) {
            this.activities = this.normalizeActivities(response.data);
            this.snapshot = this.normalizeActivities(response.data);
          }
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menyimpan konten kegiatan.';
        }
      });
  }

  onCancel(): void {
    this.activities = this.cloneActivities(this.snapshot);
    this.statusMessage = '';
  }

  addUpcoming(): void {
    if (this.isSavingUpcoming) {
      return;
    }

    if (!this.newUpcoming.title || !this.newUpcoming.category || !this.newUpcoming.dateLabel) {
      this.statusVariant = 'error';
      this.statusMessage = 'Lengkapi judul, kategori, dan tanggal kegiatan.';
      return;
    }

    this.isSavingUpcoming = true;
    this.statusMessage = '';

    this.adminContentService
      .createActivity(this.newUpcoming)
      .pipe(
        finalize(() => {
          this.isSavingUpcoming = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.statusVariant = 'error';
            this.statusMessage = 'Gagal menambah kegiatan.';
            return;
          }
          this.activities.upcoming.unshift(response.data);
          this.newUpcoming = this.createEmptyActivityPayload();
          this.statusVariant = 'success';
          this.statusMessage = 'Kegiatan ditambahkan.';
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menambah kegiatan.';
        }
      });
  }

  updateUpcoming(item: ActivityItem): void {
    if (this.isSavingUpcoming) {
      return;
    }

    this.isSavingUpcoming = true;
    this.statusMessage = '';

    const payload: ActivityPayload = {
      title: item.title,
      category: item.category,
      dateLabel: item.dateLabel,
      timeLabel: item.timeLabel,
      location: item.location,
      status: item.status,
      summary: item.summary,
      ctaPrimary: item.ctaPrimary,
      ctaSecondary: item.ctaSecondary
    };

    this.adminContentService
      .updateActivity(item.id, payload)
      .pipe(
        finalize(() => {
          this.isSavingUpcoming = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.statusVariant = 'error';
            this.statusMessage = 'Gagal memperbarui kegiatan.';
            return;
          }
          const index = this.activities.upcoming.findIndex((entry) => entry.id === item.id);
          if (index >= 0) {
            this.activities.upcoming[index] = response.data;
          }
          this.statusVariant = 'success';
          this.statusMessage = 'Kegiatan diperbarui.';
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal memperbarui kegiatan.';
        }
      });
  }

  deleteUpcoming(item: ActivityItem): void {
    if (this.isSavingUpcoming) {
      return;
    }

    const confirmed = this.confirmService.confirm('Hapus kegiatan ini?');
    if (!confirmed) {
      return;
    }

    this.isSavingUpcoming = true;
    this.statusMessage = '';

    this.adminContentService
      .deleteActivity(item.id)
      .pipe(
        finalize(() => {
          this.isSavingUpcoming = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.statusVariant = 'error';
            this.statusMessage = 'Gagal menghapus kegiatan.';
            return;
          }
          this.activities.upcoming = this.activities.upcoming.filter((entry) => entry.id !== item.id);
          this.statusVariant = 'success';
          this.statusMessage = 'Kegiatan dihapus.';
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menghapus kegiatan.';
        }
      });
  }

  addCalendar(): void {
    this.activities.calendar.push({ dateLabel: '', title: '', timeLabel: '' });
  }

  removeCalendar(index: number): void {
    this.activities.calendar.splice(index, 1);
  }

  addArchive(): void {
    this.activities.archives.push({ month: '' });
  }

  removeArchive(index: number): void {
    this.activities.archives.splice(index, 1);
  }

  trackUpcoming(index: number, item: ActivityItem): string {
    return `${item.id}-${index}`;
  }

  trackCalendar(index: number, item: ActivityCalendarItem): string {
    return `${item.dateLabel}-${item.title}-${index}`;
  }

  trackArchive(index: number, item: ActivityArchive): string {
    return `${item.month}-${index}`;
  }

  private createEmptyActivities(): ActivityList {
    return {
      hero: {
        label: '',
        title: '',
        description: ''
      },
      filters: {
        months: [],
        categories: []
      },
      upcoming: [],
      calendar: [],
      archives: [],
      contactCta: {
        title: '',
        description: '',
        label: '',
        url: ''
      }
    };
  }

  private createEmptyActivityPayload(): ActivityPayload {
    return {
      title: '',
      category: '',
      dateLabel: '',
      timeLabel: '',
      location: '',
      status: '',
      summary: '',
      ctaPrimary: { label: '', url: '' },
      ctaSecondary: { label: '', url: '' }
    };
  }

  private cloneActivities(data: ActivityList): ActivityList {
    return JSON.parse(JSON.stringify(data)) as ActivityList;
  }

  private normalizeActivities(data: ActivityList): ActivityList {
    const normalized = this.cloneActivities(data);
    normalized.upcoming = (normalized.upcoming ?? []).map((item) => ({
      ...item,
      ctaPrimary: item.ctaPrimary ?? { label: '', url: '' },
      ctaSecondary: item.ctaSecondary ?? { label: '', url: '' }
    }));
    normalized.calendar = normalized.calendar ?? [];
    normalized.archives = normalized.archives ?? [];
    normalized.filters = normalized.filters ?? { months: [], categories: [] };
    normalized.contactCta = normalized.contactCta ?? {
      title: '',
      description: '',
      label: '',
      url: ''
    };
    return normalized;
  }
}
