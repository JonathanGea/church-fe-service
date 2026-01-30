import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PublicContentService } from '../../core/services/public-content.service';
import { ContactInfo } from '../../core/models/content.models';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';
@Component({
  selector: 'app-kontak-page',
  standalone: true,
  imports: [NgIf, NgFor, LoadingStateComponent, ErrorStateComponent, EmptyStateComponent],
  templateUrl: './kontak.html',
  styleUrl: './kontak.css'
})
export class KontakPageComponent {
  private readonly contentService = inject(PublicContentService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);

  contact: ContactInfo | null = null;
  mapEmbedUrl: SafeResourceUrl | null = null;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.contentService
      .getContact()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.contact = null;
            this.mapEmbedUrl = null;
            return;
          }
          this.contact = response.data;
          this.mapEmbedUrl = response.data.map?.embedUrl
            ? this.sanitizer.bypassSecurityTrustResourceUrl(response.data.map.embedUrl)
            : null;
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data kontak.';
          this.contact = null;
          this.mapEmbedUrl = null;
        }
      });
  }
}
