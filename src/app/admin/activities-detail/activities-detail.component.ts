import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminContentService } from '../../core/services/admin-content.service';
import { ActivityDetail, ActivityPayload } from '../../core/models/content.models';
import { validateActivityDetail } from '../../core/validators/content.validators';
import { AdminFormActionsComponent } from '../../shared/ui/admin-form-actions/admin-form-actions.component';
import { StatusBannerComponent, StatusVariant } from '../../shared/ui/status-banner/status-banner.component';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-admin-activities-detail-page',
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
  templateUrl: './activities-detail.component.html'
})
export class AdminActivitiesDetailPageComponent {
  private readonly adminContentService = inject(AdminContentService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  activity: ActivityDetail | null = null;
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  statusMessage = '';
  statusVariant: StatusVariant = 'info';
  notFound = false;

  private snapshot: ActivityDetail | null = null;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('id');
        if (!id) {
          this.notFound = true;
          return;
        }
        this.loadDetail(id);
      });
  }

  loadDetail(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.statusMessage = '';
    this.notFound = false;

    this.adminContentService
      .getActivityDetail(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.errorMessage = 'Gagal memuat detail kegiatan.';
            return;
          }
          this.activity = this.normalizeDetail(response.data);
          this.snapshot = this.normalizeDetail(response.data);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.notFound = true;
            this.activity = null;
            return;
          }
          this.errorMessage = 'Gagal memuat detail kegiatan.';
        }
      });
  }

  onSave(): void {
    if (!this.activity || this.isSaving) {
      return;
    }

    const validation = validateActivityDetail(this.activity);
    if (!validation.isValid) {
      this.statusVariant = 'error';
      this.statusMessage = validation.errors.join(' ');
      return;
    }

    this.isSaving = true;
    this.statusMessage = '';

    const payload: ActivityPayload = {
      title: this.activity.title,
      category: this.activity.category,
      dateLabel: this.activity.dateLabel,
      timeLabel: this.activity.timeLabel,
      location: this.activity.location,
      status: this.activity.status,
      summary: this.activity.summary,
      highlights: this.activity.highlights,
      agenda: this.activity.agenda,
      contactName: this.activity.contactName,
      contactPhone: this.activity.contactPhone
    };

    this.adminContentService
      .updateActivity(this.activity.id, payload)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.statusVariant = 'error';
            this.statusMessage = 'Gagal menyimpan detail kegiatan.';
            return;
          }
          this.activity = this.normalizeDetail(response.data);
          this.snapshot = this.normalizeDetail(response.data);
          this.statusVariant = 'success';
          this.statusMessage = 'Detail kegiatan berhasil disimpan.';
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menyimpan detail kegiatan.';
        }
      });
  }

  onCancel(): void {
    this.activity = this.snapshot ? this.cloneDetail(this.snapshot) : null;
    this.statusMessage = '';
  }

  addHighlight(): void {
    if (!this.activity) return;
    this.activity.highlights.push('');
  }

  removeHighlight(index: number): void {
    this.activity?.highlights.splice(index, 1);
  }

  addAgenda(): void {
    if (!this.activity) return;
    this.activity.agenda.push('');
  }

  removeAgenda(index: number): void {
    this.activity?.agenda.splice(index, 1);
  }

  goBack(): void {
    this.router.navigate(['/admin/activities']);
  }

  private cloneDetail(data: ActivityDetail): ActivityDetail {
    return JSON.parse(JSON.stringify(data)) as ActivityDetail;
  }

  private normalizeDetail(data: ActivityDetail): ActivityDetail {
    const normalized = this.cloneDetail(data);
    normalized.highlights = normalized.highlights ?? [];
    normalized.agenda = normalized.agenda ?? [];
    return normalized;
  }
}
