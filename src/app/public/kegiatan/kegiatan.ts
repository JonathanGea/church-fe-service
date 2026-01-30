import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PublicContentService } from '../../core/services/public-content.service';
import { ActivityList } from '../../core/models/content.models';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-kegiatan-page',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, LoadingStateComponent, ErrorStateComponent, EmptyStateComponent],
  templateUrl: './kegiatan.html',
  styleUrl: './kegiatan.css'
})
export class KegiatanPageComponent {
  private readonly contentService = inject(PublicContentService);
  private readonly destroyRef = inject(DestroyRef);

  activities: ActivityList | null = null;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.contentService
      .getActivities()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.activities = null;
            return;
          }
          this.activities = response.data;
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data kegiatan.';
          this.activities = null;
        }
      });
  }
}
