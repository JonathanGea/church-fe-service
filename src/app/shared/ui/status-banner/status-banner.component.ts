import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

export type StatusVariant = 'success' | 'error' | 'info';

@Component({
  selector: 'app-status-banner',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './status-banner.component.html'
})
export class StatusBannerComponent {
  @Input() variant: StatusVariant = 'info';
  @Input() message = '';

  get classes(): string {
    switch (this.variant) {
      case 'success':
        return 'border-emerald-200 bg-emerald-50 text-emerald-700';
      case 'error':
        return 'border-red-200 bg-red-50 text-red-700';
      default:
        return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  }
}
