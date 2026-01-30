import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-ibadah-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ibadah.component.html'
})
export class IbadahPageComponent {
  weeklySchedules = [
    {
      title: 'Ibadah Umum Pagi',
      day: 'Minggu',
      time: '08:00',
      location: 'Gereja Utama',
      status: 'Aktif',
      lastUpdated: '28 Jan 2026'
    },
    {
      title: 'Ibadah Umum Sore',
      day: 'Minggu',
      time: '17:00',
      location: 'Gereja Utama',
      status: 'Aktif',
      lastUpdated: '26 Jan 2026'
    },
    {
      title: 'Ibadah Doa Tengah Minggu',
      day: 'Rabu',
      time: '19:00',
      location: 'Ruang Serbaguna',
      status: 'Draft',
      lastUpdated: '25 Jan 2026'
    }
  ];

  kategorialSchedules = [
    {
      title: 'Ibadah Remaja',
      day: 'Sabtu',
      time: '17:30',
      location: 'Aula 2',
      status: 'Aktif',
      contact: 'Koordinator Remaja'
    },
    {
      title: 'Ibadah Pemuda',
      day: 'Jumat',
      time: '19:30',
      location: 'Ruang Pemuda',
      status: 'Aktif',
      contact: 'Pdt. Samuel'
    },
    {
      title: 'Ibadah Lansia',
      day: 'Kamis',
      time: '10:00',
      location: 'Ruang Konsistori',
      status: 'Perlu review',
      contact: 'Diakonia'
    }
  ];

  pdfUploads = [
    {
      title: 'Tata Ibadah Minggu Pagi',
      fileName: 'tata-ibadah-02-feb-2026.pdf',
      size: '1.2 MB',
      updated: '29 Jan 2026'
    },
    {
      title: 'Tata Ibadah Minggu Sore',
      fileName: 'tata-ibadah-02-feb-2026-sore.pdf',
      size: '980 KB',
      updated: '29 Jan 2026'
    }
  ];
}
