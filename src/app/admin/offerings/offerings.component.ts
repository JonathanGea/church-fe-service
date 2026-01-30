import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminContentService } from '../../core/services/admin-content.service';
import {
  OfferingInfo,
  OfferingMethod,
  OfferingMethodDetail,
  OfferingTransparencyItem
} from '../../core/models/content.models';
import { validateOfferingInfo } from '../../core/validators/content.validators';
import { AdminFormActionsComponent } from '../../shared/ui/admin-form-actions/admin-form-actions.component';
import { StatusBannerComponent, StatusVariant } from '../../shared/ui/status-banner/status-banner.component';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-admin-offerings-page',
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
  templateUrl: './offerings.component.html'
})
export class AdminOfferingsPageComponent {
  private readonly adminContentService = inject(AdminContentService);
  private readonly destroyRef = inject(DestroyRef);

  offerings: OfferingInfo = this.createEmptyOfferings();
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  statusMessage = '';
  statusVariant: StatusVariant = 'info';
  hasData = false;

  private snapshot: OfferingInfo = this.createEmptyOfferings();

  ngOnInit(): void {
    this.loadOfferings();
  }

  loadOfferings(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.statusMessage = '';

    this.adminContentService
      .getOfferings()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.errorMessage = 'Gagal memuat data persembahan.';
            return;
          }

          if (response.data) {
            this.offerings = this.normalizeOfferings(response.data);
            this.snapshot = this.normalizeOfferings(response.data);
            this.hasData = true;
          } else {
            this.offerings = this.createEmptyOfferings();
            this.snapshot = this.createEmptyOfferings();
            this.hasData = false;
          }
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data persembahan.';
        }
      });
  }

  onSave(): void {
    if (this.isSaving) {
      return;
    }

    const validation = validateOfferingInfo(this.offerings);
    if (!validation.isValid) {
      this.statusVariant = 'error';
      this.statusMessage = validation.errors.join(' ');
      return;
    }

    this.isSaving = true;
    this.statusMessage = '';

    this.adminContentService
      .updateOfferings(this.offerings)
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
            this.statusMessage = 'Gagal menyimpan data persembahan.';
            return;
          }
          this.statusVariant = 'success';
          this.statusMessage = 'Data persembahan berhasil disimpan.';
          this.hasData = true;
          if (response.data) {
            this.offerings = this.normalizeOfferings(response.data);
            this.snapshot = this.normalizeOfferings(response.data);
          }
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menyimpan data persembahan.';
        }
      });
  }

  onCancel(): void {
    this.offerings = this.cloneOfferings(this.snapshot);
    this.statusMessage = '';
  }

  addMethod(): void {
    this.offerings.methods.push({
      type: 'TRANSFER',
      title: '',
      details: [{ label: '', value: '' }],
      note: '',
      action: { label: '', url: '' }
    });
  }

  removeMethod(index: number): void {
    this.offerings.methods.splice(index, 1);
  }

  addMethodDetail(method: OfferingMethod): void {
    method.details.push({ label: '', value: '' });
  }

  removeMethodDetail(method: OfferingMethod, index: number): void {
    method.details.splice(index, 1);
  }

  addGuideItem(): void {
    this.offerings.guide.push('');
  }

  removeGuideItem(index: number): void {
    this.offerings.guide.splice(index, 1);
  }

  addTransparencyItem(): void {
    this.offerings.transparency.items.push({ label: '', url: '' });
  }

  removeTransparencyItem(index: number): void {
    this.offerings.transparency.items.splice(index, 1);
  }

  trackMethod(index: number, item: OfferingMethod): string {
    return `${item.type}-${index}`;
  }

  trackMethodDetail(index: number, item: OfferingMethodDetail): string {
    return `${item.label}-${index}`;
  }

  trackGuide(index: number, item: string): string {
    return `${item}-${index}`;
  }

  trackTransparency(index: number, item: OfferingTransparencyItem): string {
    return `${item.label}-${index}`;
  }

  private createEmptyOfferings(): OfferingInfo {
    return {
      hero: {
        label: '',
        title: '',
        description: ''
      },
      methodsSection: {
        title: '',
        description: ''
      },
      methods: [],
      guideSection: {
        title: '',
        description: '',
        note: ''
      },
      guide: [],
      confirmationForm: {
        isEnabled: false,
        title: '',
        description: '',
        contactCta: { label: '', url: '' },
        note: ''
      },
      transparency: {
        isEnabled: false,
        title: '',
        description: '',
        items: []
      }
    };
  }

  private cloneOfferings(data: OfferingInfo): OfferingInfo {
    return JSON.parse(JSON.stringify(data)) as OfferingInfo;
  }

  private normalizeOfferings(data: OfferingInfo): OfferingInfo {
    const normalized = this.cloneOfferings(data);
    normalized.methods = normalized.methods ?? [];
    normalized.guide = normalized.guide ?? [];
    normalized.confirmationForm = normalized.confirmationForm ?? {
      isEnabled: false,
      title: '',
      description: '',
      contactCta: { label: '', url: '' },
      note: ''
    };
    normalized.transparency = normalized.transparency ?? {
      isEnabled: false,
      title: '',
      description: '',
      items: []
    };
    normalized.guideSection = normalized.guideSection ?? { title: '', description: '', note: '' };
    normalized.methodsSection = normalized.methodsSection ?? { title: '', description: '' };
    normalized.hero = normalized.hero ?? { label: '', title: '', description: '' };
    return normalized;
  }
}
