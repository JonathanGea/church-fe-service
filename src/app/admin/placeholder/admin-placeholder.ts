import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-placeholder-page',
  standalone: true,
  templateUrl: './admin-placeholder.html'
})
export class AdminPlaceholderPageComponent {
  private readonly route = inject(ActivatedRoute);

  title = this.route.snapshot.data['title'] ?? 'Coming Soon';
  description =
    this.route.snapshot.data['description'] ??
    'Halaman ini sedang disiapkan untuk pengembangan berikutnya.';
}
