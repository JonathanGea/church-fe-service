import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PublicContentService } from '../../core/services/public-content.service';
import { AlbumItem, AlbumList } from '../../core/models/content.models';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-album-page',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, LoadingStateComponent, ErrorStateComponent, EmptyStateComponent],
  templateUrl: './album.html',
  styleUrl: './album.css'
})
export class AlbumPageComponent {
  private readonly contentService = inject(PublicContentService);
  private readonly destroyRef = inject(DestroyRef);

  album: AlbumList | null = null;
  tags: string[] = [];
  selectedTag = '';
  photos: AlbumItem[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadAlbums();
  }

  loadAlbums(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.contentService
      .getAlbums()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.album = null;
            return;
          }
          this.album = response.data;
          this.tags = response.data.tags ?? [];
          this.selectedTag = response.data.selectedTag || this.tags[0] || '';
          this.photos = response.data.photos ?? [];
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data album.';
          this.album = null;
        }
      });
  }

  setTag(tag: string): void {
    this.selectedTag = tag;
  }

  get filteredPhotos() {
    if (!this.selectedTag) {
      return this.photos;
    }
    return this.photos.filter((photo) => photo.tag === this.selectedTag);
  }
}
