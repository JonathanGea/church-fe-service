import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-placeholder-page',
  standalone: true,
  templateUrl: './admin-placeholder.component.html'
})
export class AdminPlaceholderPageComponent {
  private readonly route = inject(ActivatedRoute);

  title = this.route.snapshot.data['title'] ?? 'Admin';
  description =
    this.route.snapshot.data['description'] ??
    'Halaman admin ini akan diisi sesuai kebutuhan data di _docs/admin-menu.md.';
}
