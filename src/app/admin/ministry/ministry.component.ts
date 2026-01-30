import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminContentService } from '../../core/services/admin-content.service';
import { MinistryContent, MinistryFungsionalItem, MinistryKategorialItem } from '../../core/models/content.models';
import { validateMinistryContent } from '../../core/validators/content.validators';
import { AdminFormActionsComponent } from '../../shared/ui/admin-form-actions/admin-form-actions.component';
import { StatusBannerComponent, StatusVariant } from '../../shared/ui/status-banner/status-banner.component';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-admin-ministry-page',
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
  templateUrl: './ministry.component.html'
})
export class AdminMinistryPageComponent {
  private readonly adminContentService = inject(AdminContentService);
  private readonly destroyRef = inject(DestroyRef);

  ministry: MinistryContent = this.createEmptyMinistry();
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  statusMessage = '';
  statusVariant: StatusVariant = 'info';
  hasData = false;

  private snapshot: MinistryContent = this.createEmptyMinistry();

  ngOnInit(): void {
    this.loadMinistry();
  }

  loadMinistry(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.statusMessage = '';

    this.adminContentService
      .getMinistry()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.errorMessage = 'Gagal memuat data pelayanan.';
            return;
          }

          if (response.data) {
            this.ministry = this.normalizeMinistry(response.data);
            this.snapshot = this.normalizeMinistry(response.data);
            this.hasData = true;
          } else {
            this.ministry = this.createEmptyMinistry();
            this.snapshot = this.createEmptyMinistry();
            this.hasData = false;
          }
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data pelayanan.';
        }
      });
  }

  onSave(): void {
    if (this.isSaving) {
      return;
    }

    const validation = validateMinistryContent(this.ministry);
    if (!validation.isValid) {
      this.statusVariant = 'error';
      this.statusMessage = validation.errors.join(' ');
      return;
    }

    this.isSaving = true;
    this.statusMessage = '';

    this.adminContentService
      .updateMinistry(this.ministry)
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
            this.statusMessage = 'Gagal menyimpan data pelayanan.';
            return;
          }
          this.statusVariant = 'success';
          this.statusMessage = 'Data pelayanan berhasil disimpan.';
          this.hasData = true;
          if (response.data) {
            this.ministry = this.normalizeMinistry(response.data);
            this.snapshot = this.normalizeMinistry(response.data);
          }
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menyimpan data pelayanan.';
        }
      });
  }

  onCancel(): void {
    this.ministry = this.cloneMinistry(this.snapshot);
    this.statusMessage = '';
  }

  addKategorial(): void {
    this.ministry.kategorial.push({ label: '', name: '', description: '', schedule: '' });
  }

  removeKategorial(index: number): void {
    this.ministry.kategorial.splice(index, 1);
  }

  addFungsional(): void {
    this.ministry.fungsional.push({ label: '', name: '', description: '' });
  }

  removeFungsional(index: number): void {
    this.ministry.fungsional.splice(index, 1);
  }

  trackKategorial(index: number, item: MinistryKategorialItem): string {
    return `${item.name}-${index}`;
  }

  trackFungsional(index: number, item: MinistryFungsionalItem): string {
    return `${item.name}-${index}`;
  }

  private createEmptyMinistry(): MinistryContent {
    return {
      hero: {
        label: '',
        title: '',
        description: ''
      },
      kategorialSection: {
        title: '',
        description: ''
      },
      kategorialCta: {
        label: '',
        url: ''
      },
      kategorial: [],
      fungsionalSection: {
        title: '',
        description: ''
      },
      fungsional: [],
      ctaSection: {
        title: '',
        description: '',
        primaryLink: { label: '', url: '' },
        secondaryLink: { label: '', url: '' },
        note: ''
      }
    };
  }

  private cloneMinistry(data: MinistryContent): MinistryContent {
    return JSON.parse(JSON.stringify(data)) as MinistryContent;
  }

  private normalizeMinistry(data: MinistryContent): MinistryContent {
    const normalized = this.cloneMinistry(data);
    normalized.kategorial = normalized.kategorial ?? [];
    normalized.fungsional = normalized.fungsional ?? [];
    normalized.kategorialCta = normalized.kategorialCta ?? { label: '', url: '' };
    normalized.ctaSection = normalized.ctaSection ?? {
      title: '',
      description: '',
      primaryLink: { label: '', url: '' },
      secondaryLink: { label: '', url: '' },
      note: ''
    };
    normalized.kategorialSection = normalized.kategorialSection ?? { title: '', description: '' };
    normalized.fungsionalSection = normalized.fungsionalSection ?? { title: '', description: '' };
    return normalized;
  }
}
