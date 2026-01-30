import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminContentService } from '../../core/services/admin-content.service';
import { ContactInfo, ContactOfficeHour } from '../../core/models/content.models';
import { validateContactInfo } from '../../core/validators/content.validators';
import { AdminFormActionsComponent } from '../../shared/ui/admin-form-actions/admin-form-actions.component';
import { StatusBannerComponent, StatusVariant } from '../../shared/ui/status-banner/status-banner.component';
import { LoadingStateComponent } from '../../shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/ui/error-state/error-state.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-admin-contact-page',
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
  templateUrl: './contact.component.html'
})
export class AdminContactPageComponent {
  private readonly adminContentService = inject(AdminContentService);
  private readonly destroyRef = inject(DestroyRef);

  contact: ContactInfo = this.createEmptyContact();
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  statusMessage = '';
  statusVariant: StatusVariant = 'info';
  hasData = false;

  private snapshot: ContactInfo = this.createEmptyContact();

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.statusMessage = '';

    this.adminContentService
      .getContact()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess) {
            this.errorMessage = 'Gagal memuat data kontak.';
            return;
          }

          if (response.data) {
            this.contact = this.normalizeContact(response.data);
            this.snapshot = this.normalizeContact(response.data);
            this.hasData = true;
          } else {
            this.contact = this.createEmptyContact();
            this.snapshot = this.createEmptyContact();
            this.hasData = false;
          }
        },
        error: () => {
          this.errorMessage = 'Gagal memuat data kontak.';
        }
      });
  }

  onSave(): void {
    if (this.isSaving) {
      return;
    }

    const validation = validateContactInfo(this.contact);
    if (!validation.isValid) {
      this.statusVariant = 'error';
      this.statusMessage = validation.errors.join(' ');
      return;
    }

    this.isSaving = true;
    this.statusMessage = '';

    this.adminContentService
      .updateContact(this.contact)
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
            this.statusMessage = 'Gagal menyimpan data kontak.';
            return;
          }
          this.statusVariant = 'success';
          this.statusMessage = 'Data kontak berhasil disimpan.';
          this.hasData = true;
          if (response.data) {
            this.contact = this.normalizeContact(response.data);
            this.snapshot = this.normalizeContact(response.data);
          }
        },
        error: () => {
          this.statusVariant = 'error';
          this.statusMessage = 'Gagal menyimpan data kontak.';
        }
      });
  }

  onCancel(): void {
    this.contact = this.cloneContact(this.snapshot);
    this.statusMessage = '';
  }

  addOfficeHour(): void {
    this.contact.officeHours.push({ label: '', time: '' });
  }

  removeOfficeHour(index: number): void {
    this.contact.officeHours.splice(index, 1);
  }

  trackOfficeHour(index: number, item: ContactOfficeHour): string {
    return `${item.label}-${index}`;
  }

  private createEmptyContact(): ContactInfo {
    return {
      hero: {
        label: '',
        title: '',
        description: ''
      },
      locationSection: {
        title: '',
        description: ''
      },
      address: '',
      landmark: '',
      officeContacts: {
        phone: '',
        email: '',
        whatsapp: ''
      },
      ctaLabels: {
        whatsappLabel: '',
        mapLabel: ''
      },
      map: {
        embedUrl: '',
        mapUrl: ''
      },
      officeHours: [],
      officeHoursNote: '',
      pastoralService: {
        isEnabled: false,
        title: '',
        description: '',
        ctaLabel: '',
        ctaUrl: ''
      }
    };
  }

  private cloneContact(data: ContactInfo): ContactInfo {
    return JSON.parse(JSON.stringify(data)) as ContactInfo;
  }

  private normalizeContact(data: ContactInfo): ContactInfo {
    const normalized = this.cloneContact(data);
    normalized.officeHours = normalized.officeHours ?? [];
    normalized.pastoralService = normalized.pastoralService ?? {
      isEnabled: false,
      title: '',
      description: '',
      ctaLabel: '',
      ctaUrl: ''
    };
    normalized.ctaLabels = normalized.ctaLabels ?? { whatsappLabel: '', mapLabel: '' };
    normalized.locationSection = normalized.locationSection ?? { title: '', description: '' };
    normalized.hero = normalized.hero ?? { label: '', title: '', description: '' };
    return normalized;
  }
}
