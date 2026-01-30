import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PublicContentService } from '../../core/services/public-content.service';
import { BulletinList } from '../../core/models/content.models';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';
@Component({
  selector: 'app-warta-page',
  standalone: true,
  imports: [NgIf, NgFor, LoadingStateComponent, ErrorStateComponent, EmptyStateComponent],
  templateUrl: './warta.html',
  styleUrl: './warta.css'
})
export class WartaPageComponent {
  private readonly contentService = inject(PublicContentService);
  private readonly destroyRef = inject(DestroyRef);

  bulletins: BulletinList | null = null;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadBulletins();
  }

  loadBulletins(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.contentService
      .getBulletins()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.bulletins = null;
            return;
          }
          this.bulletins = response.data;
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data warta jemaat.';
          this.bulletins = null;
        }
      });
  }
}
