import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PublicContentService } from '../../../core/services/public-content.service';
import { ContactInfo } from '../../../core/models/content.models';

@Component({
  selector: 'app-public-footer',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './public-footer.component.html',
  styleUrl: './public-footer.component.css'
})
export class PublicFooterComponent {
  private readonly contentService = inject(PublicContentService);
  private readonly destroyRef = inject(DestroyRef);

  contact: ContactInfo | null = null;
  isLoading = false;
  currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact(): void {
    this.isLoading = true;

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
          this.contact = response?.isSuccess ? response.data ?? null : null;
        },
        error: () => {
          this.contact = null;
        }
      });
  }
}
