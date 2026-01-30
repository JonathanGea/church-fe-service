import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html'
})
export class AnalyticsPageComponent {
  stats = [
    {
      title: 'Warta aktif',
      value: '6',
      detail: 'Terbit bulan ini',
      accent: '+2 dari pekan lalu'
    },
    {
      title: 'Kegiatan minggu ini',
      value: '4',
      detail: 'Terjadwal 30 Jan - 5 Feb',
      accent: '2 kegiatan terbaru'
    },
    {
      title: 'Album terbaru',
      value: '1',
      detail: 'Album "Retret Jemaat"',
      accent: '18 foto baru'
    },
    {
      title: 'Pengunjung',
      value: '1,260',
      detail: 'Opsional (estimasi mingguan)',
      accent: '+8% dibanding minggu lalu'
    }
  ];

  actions = [
    {
      title: 'Upload warta',
      description: 'Tambahkan PDF warta terbaru untuk jemaat.',
      icon: 'fa-file-arrow-up',
      cta: 'Upload warta'
    },
    {
      title: 'Tambah kegiatan',
      description: 'Jadwalkan kegiatan baru dan detail pelaksanaan.',
      icon: 'fa-calendar-plus',
      cta: 'Tambah kegiatan'
    },
    {
      title: 'Tambah album',
      description: 'Buat album baru dan siapkan upload foto.',
      icon: 'fa-images',
      cta: 'Tambah album'
    }
  ];
}
