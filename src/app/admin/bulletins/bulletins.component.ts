import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminContentService } from '../../core/services/admin-content.service';
import { ConfirmService } from '../../core/services/confirm.service';
import {
  BulletinArchive,
  BulletinItem,
  BulletinList,
  BulletinPayload
} from '../../core/models/content.models';
import { validateBulletinList } from '../../core/validators/content.validators';
import { AdminFormActionsComponent } from '../../shared/ui/admin-form-actions/admin-form-actions.component';
import { StatusBannerComponent, StatusVariant } from '../../shared/ui/status-banner/status-banner.component';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-admin-bulletins-page',
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
  templateUrl: './bulletins.component.html'
})
export class AdminBulletinsPageComponent {
  private readonly adminContentService = inject(AdminContentService);
  private readonly confirmService = inject(ConfirmService);
  private readonly destroyRef = inject(DestroyRef);

  bulletins: BulletinList = this.createEmptyBulletins();
  isLoading = false;
  isSaving = false;
  isSavingWeekly = false;
  isSavingLatest = false;
  errorMessage = '';
  statusMessage = '';
  statusVariant: StatusVariant = 'info';
  hasData = false;

  newLatest: BulletinPayload = { dateLabel: '', theme: '', pdfUrl: '' };

  private snapshot: BulletinList = this.createEmptyBulletins();

  ngOnInit(): void {
    this.loadBulletins();
  }

  loadBulletins(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.statusMessage = '';

    this.adminContentService
      .getBulletins()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.errorMessage = 'Gagal memuat data warta jemaat.';
            return;
          }

          if (response.data) {
            this.bulletins = this.normalizeBulletins(response.data);
            this.snapshot = this.normalizeBulletins(response.data);
            this.hasData = true;
          } else {
            this.bulletins = this.createEmptyBulletins();
            this.snapshot = this.createEmptyBulletins();
            this.hasData = false;
          }
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data warta jemaat.';
        }
      });
  }

  onSaveContent(): void {
    if (this.isSaving) {
      return;
    }

    const validation = validateBulletinList(this.bulletins);
    if (!validation.isValid) {
      this.statusVariant = 'error';
      this.statusMessage = validation.errors.join(' ');
      return;
    }

    this.isSaving = true;
    this.statusMessage = '';

    this.adminContentService
      .updateBulletins(this.bulletins)
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
            this.statusMessage = 'Gagal menyimpan konten warta.';
            return;
          }
          this.statusVariant = 'success';
          this.statusMessage = 'Konten warta berhasil disimpan.';
          this.hasData = true;
          if (response.data) {
            this.bulletins = this.normalizeBulletins(response.data);
            this.snapshot = this.normalizeBulletins(response.data);
          }
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menyimpan konten warta.';
        }
      });
  }

  onCancel(): void {
    this.bulletins = this.cloneBulletins(this.snapshot);
    this.statusMessage = '';
  }

  saveWeekly(): void {
    if (this.isSavingWeekly) {
      return;
    }

    const payload: BulletinPayload = {
      dateLabel: this.bulletins.weekly.dateLabel,
      theme: this.bulletins.weekly.theme,
      pdfUrl: this.bulletins.weekly.pdfUrl
    };

    if (!payload.dateLabel || !payload.theme || !payload.pdfUrl) {
      this.statusVariant = 'error';
      this.statusMessage = 'Lengkapi tanggal, tema, dan PDF warta mingguan.';
      return;
    }

    this.isSavingWeekly = true;
    this.statusMessage = '';

    const request$ = this.bulletins.weekly.id
      ? this.adminContentService.updateBulletin(this.bulletins.weekly.id, payload)
      : this.adminContentService.createBulletin(payload);

    request$
      .pipe(
        finalize(() => {
          this.isSavingWeekly = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.statusVariant = 'error';
            this.statusMessage = 'Gagal menyimpan warta mingguan.';
            return;
          }
          this.bulletins.weekly = response.data;
          this.statusVariant = 'success';
          this.statusMessage = 'Warta mingguan tersimpan.';
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menyimpan warta mingguan.';
        }
      });
  }

  addLatest(): void {
    if (this.isSavingLatest) {
      return;
    }

    if (!this.newLatest.dateLabel || !this.newLatest.theme || !this.newLatest.pdfUrl) {
      this.statusVariant = 'error';
      this.statusMessage = 'Lengkapi tanggal, tema, dan PDF warta terbaru.';
      return;
    }

    this.isSavingLatest = true;
    this.statusMessage = '';

    this.adminContentService
      .createBulletin(this.newLatest)
      .pipe(
        finalize(() => {
          this.isSavingLatest = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.statusVariant = 'error';
            this.statusMessage = 'Gagal menambah warta terbaru.';
            return;
          }
          this.bulletins.latest.unshift(response.data);
          this.newLatest = { dateLabel: '', theme: '', pdfUrl: '' };
          this.statusVariant = 'success';
          this.statusMessage = 'Warta terbaru ditambahkan.';
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menambah warta terbaru.';
        }
      });
  }

  updateLatest(item: BulletinItem): void {
    if (this.isSavingLatest) {
      return;
    }

    this.isSavingLatest = true;
    this.statusMessage = '';

    const payload: BulletinPayload = {
      dateLabel: item.dateLabel,
      theme: item.theme,
      pdfUrl: item.pdfUrl
    };

    this.adminContentService
      .updateBulletin(item.id, payload)
      .pipe(
        finalize(() => {
          this.isSavingLatest = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response.data) {
            this.statusVariant = 'error';
            this.statusMessage = 'Gagal memperbarui warta terbaru.';
            return;
          }
          const index = this.bulletins.latest.findIndex((entry) => entry.id === item.id);
          if (index >= 0) {
            this.bulletins.latest[index] = response.data;
          }
          this.statusVariant = 'success';
          this.statusMessage = 'Warta terbaru diperbarui.';
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal memperbarui warta terbaru.';
        }
      });
  }

  deleteLatest(item: BulletinItem): void {
    if (this.isSavingLatest) {
      return;
    }

    const confirmed = this.confirmService.confirm('Hapus warta ini?');
    if (!confirmed) {
      return;
    }

    this.isSavingLatest = true;
    this.statusMessage = '';

    this.adminContentService
      .deleteBulletin(item.id)
      .pipe(
        finalize(() => {
          this.isSavingLatest = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.statusVariant = 'error';
            this.statusMessage = 'Gagal menghapus warta terbaru.';
            return;
          }
          this.bulletins.latest = this.bulletins.latest.filter((entry) => entry.id !== item.id);
          this.statusVariant = 'success';
          this.statusMessage = 'Warta terbaru dihapus.';
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menghapus warta terbaru.';
        }
      });
  }

  addArchive(): void {
    this.bulletins.archives.push({ month: '', count: 0 });
  }

  removeArchive(index: number): void {
    this.bulletins.archives.splice(index, 1);
  }

  trackLatest(index: number, item: BulletinItem): string {
    return `${item.id}-${index}`;
  }

  trackArchive(index: number, item: BulletinArchive): string {
    return `${item.month}-${index}`;
  }

  private createEmptyBulletins(): BulletinList {
    return {
      hero: {
        label: '',
        title: '',
        description: ''
      },
      weekly: {
        id: '',
        dateLabel: '',
        theme: '',
        pdfUrl: ''
      },
      latest: [],
      weeklyTheme: {
        title: '',
        verse: '',
        summary: ''
      },
      archives: []
    };
  }

  private cloneBulletins(data: BulletinList): BulletinList {
    return JSON.parse(JSON.stringify(data)) as BulletinList;
  }

  private normalizeBulletins(data: BulletinList): BulletinList {
    const normalized = this.cloneBulletins(data);
    normalized.latest = normalized.latest ?? [];
    normalized.archives = normalized.archives ?? [];
    return normalized;
  }
}
