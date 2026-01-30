import { NgClass, NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PublicContentService } from '../../../core/services/public-content.service';
import { ContactInfo } from '../../../core/models/content.models';

@Component({
  selector: 'app-public-header',
  standalone: true,
  imports: [NgClass, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './public-header.component.html',
  styleUrl: './public-header.component.css'
})
export class PublicHeaderComponent {
  private readonly contentService = inject(PublicContentService);
  private readonly destroyRef = inject(DestroyRef);

  contact: ContactInfo | null = null;
  isLoading = false;

  isMobileMenuOpen = false;

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

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
