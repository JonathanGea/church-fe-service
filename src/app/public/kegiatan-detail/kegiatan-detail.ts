import { NgIf, NgFor } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { PublicContentService } from '../../core/services/public-content.service';
import { ActivityDetail } from '../../core/models/content.models';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-kegiatan-detail-page',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    LoadingStateComponent,
    ErrorStateComponent,
    EmptyStateComponent
  ],
  templateUrl: './kegiatan-detail.html',
  styleUrl: './kegiatan-detail.css'
})
export class KegiatanDetailPageComponent {
  private readonly contentService = inject(PublicContentService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  selected: ActivityDetail | null = null;
  isLoading = false;
  errorMessage = '';
  notFound = false;

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('id');
        if (!id) {
          this.notFound = true;
          this.selected = null;
          return;
        }
        this.loadDetail(id);
      });
  }

  loadDetail(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.notFound = false;

    this.contentService
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
            this.selected = null;
            return;
          }
          this.selected = response.data;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.notFound = true;
            this.selected = null;
            return;
          }
          this.errorMessage = 'Gagal memuat detail kegiatan.';
          this.selected = null;
        }
      });
  }
}
