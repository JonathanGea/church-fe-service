import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-form-actions',
  standalone: true,
  templateUrl: './admin-form-actions.component.html'
})
export class AdminFormActionsComponent {
  @Input() isSubmitting = false;
  @Input() disableSave = false;
  @Input() saveLabel = 'Simpan';
  @Input() cancelLabel = 'Batal';
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
