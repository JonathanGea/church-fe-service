import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PublicContentService } from '../../core/services/public-content.service';
import { HomeContent } from '../../core/models/content.models';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    NgIf,
    NgFor,
    LoadingStateComponent,
    ErrorStateComponent,
    EmptyStateComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomePageComponent {
  private readonly contentService = inject(PublicContentService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);

  home: HomeContent | null = null;
  onlineEmbedUrl: SafeResourceUrl | null = null;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadHome();
  }

  loadHome(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.contentService
      .getHome()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.home = null;
            this.onlineEmbedUrl = null;
            return;
          }
          this.home = response.data;
          this.onlineEmbedUrl = response.data.onlineWorship?.embedUrl
            ? this.sanitizer.bypassSecurityTrustResourceUrl(response.data.onlineWorship.embedUrl)
            : null;
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data beranda.';
          this.home = null;
          this.onlineEmbedUrl = null;
        }
      });
  }
}
