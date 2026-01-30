import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PublicContentService } from '../../core/services/public-content.service';
import { MinistryContent } from '../../core/models/content.models';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-pelayanan-page',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, LoadingStateComponent, ErrorStateComponent, EmptyStateComponent],
  templateUrl: './pelayanan.html',
  styleUrl: './pelayanan.css'
})
export class PelayananPageComponent {
  private readonly contentService = inject(PublicContentService);
  private readonly destroyRef = inject(DestroyRef);

  ministry: MinistryContent | null = null;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadMinistry();
  }

  loadMinistry(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.contentService
      .getMinistry()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.ministry = null;
            return;
          }
          this.ministry = response.data;
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data pelayanan.';
          this.ministry = null;
        }
      });
  }
}
