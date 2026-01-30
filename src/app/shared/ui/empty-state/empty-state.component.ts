import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  templateUrl: './empty-state.component.html'
})
export class EmptyStateComponent {
  @Input() title = 'Data belum tersedia';
  @Input() description = 'Belum ada data untuk ditampilkan.';
}
