import { NgIf, NgFor } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface ActivityDetail {
  id: string;
  title: string;
  category: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  status: string;
  summary: string;
  highlights: string[];
  agenda: string[];
  contactName: string;
  contactPhone: string;
}

@Component({
  selector: 'app-kegiatan-detail-page',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './kegiatan-detail.html',
  styleUrl: './kegiatan-detail.css'
})
export class KegiatanDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  activities: ActivityDetail[] = [
    {
      id: 'katekisasi-batch-1',
      title: 'Kelas Katekisasi (Batch 1)',
      category: 'Kategorial',
      dateLabel: 'Sabtu, 27 Jan 2026',
      timeLabel: '16.00 - 18.00',
      location: 'Ruang Kelas Utama',
      status: 'Terbuka',
      summary:
        'Pembinaan iman untuk calon sidi/katekisasi. Peserta akan mendapatkan modul dan pendampingan mingguan.',
      highlights: [
        'Materi dasar iman Kristen dan pembekalan liturgi',
        'Sesi tanya jawab bersama pendeta dan majelis',
        'Sertifikat kehadiran untuk peserta aktif'
      ],
      agenda: [
        '16.00 - Registrasi dan pembukaan',
        '16.20 - Sesi materi 1',
        '17.00 - Diskusi kelompok',
        '17.30 - Penugasan dan penutup'
      ],
      contactName: 'Admin Katekisasi',
      contactPhone: '+62 0 0000 0000'
    },
    {
      id: 'kunjungan-jemaat',
      title: 'Kunjungan Jemaat',
      category: 'Diakonia',
      dateLabel: 'Minggu, 28 Jan 2026',
      timeLabel: '13.00 - 16.00',
      location: 'Titik kumpul: Gereja',
      status: 'Pelayanan',
      summary:
        'Tim diakonia melakukan kunjungan dan doa bagi jemaat yang membutuhkan dukungan khusus.',
      highlights: [
        'Koordinasi transportasi bersama koordinator diakonia',
        'Bawa perlengkapan doa dan kunjungan',
        'Konfirmasi kehadiran melalui admin'
      ],
      agenda: [
        '13.00 - Briefing tim dan doa',
        '13.30 - Berangkat ke lokasi',
        '15.30 - Evaluasi singkat'
      ],
      contactName: 'Koordinator Diakonia',
      contactPhone: '+62 0 0000 0000'
    },
    {
      id: 'pelatihan-liturgi',
      title: 'Pelatihan Liturgi dan Tata Ibadah',
      category: 'Pelatihan',
      dateLabel: 'Kamis, 01 Feb 2026',
      timeLabel: '19.00 - 21.00',
      location: 'Ruang Utama',
      status: 'Untuk Pelayan',
      summary:
        'Pembekalan singkat untuk pelayan ibadah tentang tata ibadah, urutan liturgi, dan koordinasi tim.',
      highlights: [
        'Simulasi alur ibadah dan pembagian tugas',
        'Latihan komunikasi antar pelayan',
        'Materi dibagikan setelah kegiatan'
      ],
      agenda: [
        '19.00 - Pembukaan dan doa',
        '19.15 - Materi liturgi',
        '20.00 - Praktik dan simulasi',
        '20.45 - Rencana tindak lanjut'
      ],
      contactName: 'Koordinator Tata Ibadah',
      contactPhone: '+62 0 0000 0000'
    }
  ];

  selected: ActivityDetail | null = null;

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('id');
        this.selected = this.activities.find((activity) => activity.id === id) ?? null;
      });
  }
}
