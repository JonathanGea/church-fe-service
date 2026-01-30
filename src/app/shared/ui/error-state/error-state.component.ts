import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  standalone: true,
  templateUrl: './error-state.component.html'
})
export class ErrorStateComponent {
  @Input() message = 'Terjadi kesalahan. Silakan coba lagi.';
  @Input() actionLabel = 'Coba lagi';
  @Output() retry = new EventEmitter<void>();
}
