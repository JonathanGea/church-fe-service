import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PublicContentService } from '../../core/services/public-content.service';
import { OfferingInfo } from '../../core/models/content.models';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-persembahan-page',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    LoadingStateComponent,
    ErrorStateComponent,
    EmptyStateComponent
  ],
  templateUrl: './persembahan.html',
  styleUrl: './persembahan.css'
})
export class PersembahanPageComponent {
  private readonly contentService = inject(PublicContentService);
  private readonly destroyRef = inject(DestroyRef);

  offerings: OfferingInfo | null = null;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadOfferings();
  }

  loadOfferings(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.contentService
      .getOfferings()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.offerings = null;
            return;
          }
          this.offerings = response.data;
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data persembahan.';
          this.offerings = null;
        }
      });
  }
}
