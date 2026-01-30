import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PublicContentService } from '../../core/services/public-content.service';
import { WorshipContent } from '../../core/models/content.models';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-ibadah-page',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, LoadingStateComponent, ErrorStateComponent, EmptyStateComponent],
  templateUrl: './ibadah.html',
  styleUrl: './ibadah.css'
})
export class IbadahPageComponent {
  private readonly contentService = inject(PublicContentService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);

  worship: WorshipContent | null = null;
  onlineEmbedUrl: SafeResourceUrl | null = null;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadWorship();
  }

  loadWorship(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.contentService
      .getWorship()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.worship = null;
            this.onlineEmbedUrl = null;
            return;
          }
          this.worship = response.data;
          this.onlineEmbedUrl = response.data.online?.embedUrl
            ? this.sanitizer.bypassSecurityTrustResourceUrl(response.data.online.embedUrl)
            : null;
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data ibadah.';
          this.worship = null;
          this.onlineEmbedUrl = null;
        }
      });
  }
}
