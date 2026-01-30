import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminContentService } from '../../core/services/admin-content.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { AlbumItem, AlbumList, AlbumPayload } from '../../core/models/content.models';
import { validateAlbumList } from '../../core/validators/content.validators';
import { AdminFormActionsComponent } from '../../shared/ui/admin-form-actions/admin-form-actions.component';
import { StatusBannerComponent, StatusVariant } from '../../shared/ui/status-banner/status-banner.component';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-admin-albums-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    AdminFormActionsComponent,
    StatusBannerComponent,
    LoadingStateComponent,
    ErrorStateComponent,
    EmptyStateComponent
  ],
  templateUrl: './albums.component.html'
})
export class AdminAlbumsPageComponent {
  private readonly adminContentService = inject(AdminContentService);
  private readonly confirmService = inject(ConfirmService);
  private readonly destroyRef = inject(DestroyRef);

  albums: AlbumList = this.createEmptyAlbums();
  isLoading = false;
  isSaving = false;
  isSavingAlbum = false;
  errorMessage = '';
  statusMessage = '';
  statusVariant: StatusVariant = 'info';
  hasData = false;

  newTag = '';
  newAlbum: AlbumPayload = { title: '', count: 0, tag: '' };

  private snapshot: AlbumList = this.createEmptyAlbums();

  ngOnInit(): void {
    this.loadAlbums();
  }

  loadAlbums(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.statusMessage = '';

    this.adminContentService
      .getAlbums()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.errorMessage = 'Gagal memuat data album.';
            return;
          }

          if (response.data) {
            this.albums = this.normalizeAlbums(response.data);
            this.snapshot = this.normalizeAlbums(response.data);
            this.hasData = true;
          } else {
            this.albums = this.createEmptyAlbums();
            this.snapshot = this.createEmptyAlbums();
            this.hasData = false;
          }
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data album.';
        }
      });
  }

  onSaveContent(): void {
    if (this.isSaving) {
      return;
    }

    const validation = validateAlbumList(this.albums);
    if (!validation.isValid) {
      this.statusVariant = 'error';
      this.statusMessage = validation.errors.join(' ');
      return;
    }

    this.isSaving = true;
    this.statusMessage = '';

    this.adminContentService
      .updateAlbums(this.albums)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.statusVariant = 'error';
            this.statusMessage = 'Gagal menyimpan data album.';
            return;
          }
          this.statusVariant = 'success';
          this.statusMessage = 'Data album berhasil disimpan.';
          this.hasData = true;
          if (response.data) {
            this.albums = this.normalizeAlbums(response.data);
            this.snapshot = this.normalizeAlbums(response.data);
          }
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menyimpan data album.';
        }
      });
  }

  onCancel(): void {
    this.albums = this.cloneAlbums(this.snapshot);
    this.statusMessage = '';
  }

  addTag(): void {
    const value = this.newTag.trim();
    if (!value) {
      this.statusVariant = 'error';
      this.statusMessage = 'Nama tag wajib diisi.';
      return;
    }
    if (this.albums.tags.includes(value)) {
      this.statusVariant = 'error';
      this.statusMessage = 'Tag sudah ada.';
      return;
    }
    this.albums.tags.push(value);
    if (!this.albums.selectedTag) {
      this.albums.selectedTag = value;
    }
    this.newTag = '';
  }

  removeTag(tag: string): void {
    const confirmed = this.confirmService.confirm(`Hapus tag ${tag}?`);
    if (!confirmed) {
      return;
    }
    this.albums.tags = this.albums.tags.filter((item) => item !== tag);
    if (this.albums.selectedTag === tag) {
      this.albums.selectedTag = this.albums.tags[0] ?? '';
    }
    this.albums.photos = this.albums.photos.filter((photo) => photo.tag !== tag);
  }

  addAlbum(): void {
    if (this.isSavingAlbum) {
      return;
    }

    if (!this.newAlbum.title || !this.newAlbum.tag) {
      this.statusVariant = 'error';
      this.statusMessage = 'Judul dan tag album wajib diisi.';
      return;
    }

    this.isSavingAlbum = true;
    this.statusMessage = '';

    this.adminContentService
      .createAlbum(this.newAlbum)
      .pipe(
        finalize(() => {
          this.isSavingAlbum = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.statusVariant = 'error';
            this.statusMessage = 'Gagal menambah album.';
            return;
          }
          this.albums.photos.unshift(response.data);
          this.newAlbum = { title: '', count: 0, tag: '' };
          this.statusVariant = 'success';
          this.statusMessage = 'Album ditambahkan.';
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menambah album.';
        }
      });
  }

  updateAlbum(item: AlbumItem, index: number): void {
    if (this.isSavingAlbum) {
      return;
    }

    if (!item.id) {
      this.statusVariant = 'error';
      this.statusMessage = 'ID album belum tersedia.';
      return;
    }

    this.isSavingAlbum = true;
    this.statusMessage = '';

    const payload: AlbumPayload = {
      title: item.title,
      count: item.count,
      tag: item.tag
    };

    this.adminContentService
      .updateAlbum(item.id, payload)
      .pipe(
        finalize(() => {
          this.isSavingAlbum = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.statusVariant = 'error';
            this.statusMessage = 'Gagal memperbarui album.';
            return;
          }
          this.albums.photos[index] = {
            title: response.data.title,
            tag: response.data.tag,
            count: response.data.photoCount
          };
          this.statusVariant = 'success';
          this.statusMessage = 'Album diperbarui.';
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal memperbarui album.';
        }
      });
  }

  deleteAlbum(item: AlbumItem, index: number): void {
    if (this.isSavingAlbum) {
      return;
    }

    if (!item.id) {
      this.statusVariant = 'error';
      this.statusMessage = 'ID album belum tersedia.';
      return;
    }

    const confirmed = this.confirmService.confirm('Hapus album ini?');
    if (!confirmed) {
      return;
    }

    this.isSavingAlbum = true;
    this.statusMessage = '';

    this.adminContentService
      .deleteAlbum(item.id)
      .pipe(
        finalize(() => {
          this.isSavingAlbum = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.statusVariant = 'error';
            this.statusMessage = 'Gagal menghapus album.';
            return;
          }
          this.albums.photos.splice(index, 1);
          this.statusVariant = 'success';
          this.statusMessage = 'Album dihapus.';
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menghapus album.';
        }
      });
  }

  trackTag(index: number, tag: string): string {
    return `${tag}-${index}`;
  }

  trackAlbum(index: number, album: AlbumItem): string {
    return `${album.title}-${index}`;
  }

  private createEmptyAlbums(): AlbumList {
    return {
      hero: {
        label: '',
        title: '',
        description: ''
      },
      tags: [],
      selectedTag: '',
      photos: []
    };
  }

  private cloneAlbums(data: AlbumList): AlbumList {
    return JSON.parse(JSON.stringify(data)) as AlbumList;
  }

  private normalizeAlbums(data: AlbumList): AlbumList {
    const normalized = this.cloneAlbums(data);
    normalized.tags = normalized.tags ?? [];
    normalized.photos = normalized.photos ?? [];
    normalized.hero = normalized.hero ?? { label: '', title: '', description: '' };
    return normalized;
  }

}
