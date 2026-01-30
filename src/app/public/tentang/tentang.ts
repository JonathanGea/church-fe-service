import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PublicContentService } from '../../core/services/public-content.service';
import { AboutContent } from '../../core/models/content.models';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';
@Component({
  selector: 'app-tentang-page',
  standalone: true,
  imports: [NgIf, NgFor, LoadingStateComponent, ErrorStateComponent, EmptyStateComponent],
  templateUrl: './tentang.html',
  styleUrl: './tentang.css'
})
export class TentangPageComponent {
  private readonly contentService = inject(PublicContentService);
  private readonly destroyRef = inject(DestroyRef);

  about: AboutContent | null = null;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadAbout();
  }

  loadAbout(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.contentService
      .getAbout()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.about = null;
            return;
          }
          this.about = response.data;
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data tentang jemaat.';
          this.about = null;
        }
      });
  }
}
