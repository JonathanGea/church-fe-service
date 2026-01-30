import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type KegiatanStatus = 'Terjadwal' | 'Berlangsung' | 'Selesai' | 'Batal';

interface KegiatanItem {
  id: number;
  judul: string;
  kategori: string;
  tanggalWaktu: string;
  lokasi: string;
  status: KegiatanStatus;
  deskripsi: string;
  agenda: string;
  highlight: boolean;
  kontak: string;
}

interface KegiatanForm {
  judul: string;
  kategori: string;
  tanggalWaktu: string;
  lokasi: string;
  status: KegiatanStatus;
  deskripsi: string;
  agenda: string;
  highlight: boolean;
  kontak: string;
}

@Component({
  selector: 'app-admin-kegiatan-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kegiatan.component.html'
})
export class KegiatanPageComponent {
  searchQuery = '';
  statusFilter: 'Semua' | KegiatanStatus = 'Semua';
  kategoriFilter = 'Semua';
  formMode: 'create' | 'edit' = 'create';

  kegiatanList: KegiatanItem[] = [
    {
      id: 1,
      judul: 'Kunjungan Diakonia',
      kategori: 'Pelayanan Sosial',
      tanggalWaktu: '2026-02-02T10:00',
      lokasi: 'Rumah Lansia Jemaat',
      status: 'Terjadwal',
      deskripsi: 'Kunjungan rutin dan doa bersama keluarga jemaat.',
      agenda: 'Doa, konseling singkat, bantuan kebutuhan dasar.',
      highlight: true,
      kontak: 'Diak. Maria - 0812 1234 5678'
    },
    {
      id: 2,
      judul: 'Latihan Paduan Suara',
      kategori: 'Pelayanan Musik',
      tanggalWaktu: '2026-02-03T18:30',
      lokasi: 'Ruang Musik',
      status: 'Terjadwal',
      deskripsi: 'Latihan rutin untuk ibadah minggu kedua.',
      agenda: 'Pemanasan vokal, latihan lagu baru, evaluasi.',
      highlight: false,
      kontak: 'Pdt. Samuel - 0813 4455 8899'
    },
    {
      id: 3,
      judul: 'Katekisasi Remaja',
      kategori: 'Pembinaan Iman',
      tanggalWaktu: '2026-02-05T16:00',
      lokasi: 'Aula Utama',
      status: 'Berlangsung',
      deskripsi: 'Sesi pembinaan iman untuk calon sidi.',
      agenda: 'Materi pokok iman, diskusi kelompok, refleksi.',
      highlight: true,
      kontak: 'Sekretariat Gereja - 021 555 8899'
    },
    {
      id: 4,
      judul: 'Retret Pemuda',
      kategori: 'Pemuda',
      tanggalWaktu: '2026-02-08T08:00',
      lokasi: 'Villa Kasih, Bogor',
      status: 'Selesai',
      deskripsi: 'Retret rohani untuk pemuda dan mahasiswa.',
      agenda: 'Ibadah, sharing kelompok, pelayanan sosial.',
      highlight: false,
      kontak: 'Koord. Pemuda - 0819 3322 1144'
    }
  ];

  formData: KegiatanForm = {
    judul: '',
    kategori: '',
    tanggalWaktu: '',
    lokasi: '',
    status: 'Terjadwal',
    deskripsi: '',
    agenda: '',
    highlight: false,
    kontak: ''
  };

  get kategoriOptions(): string[] {
    const unique = new Set(this.kegiatanList.map((item) => item.kategori));
    return ['Semua', ...Array.from(unique)];
  }

  get filteredKegiatan(): KegiatanItem[] {
    const query = this.searchQuery.trim().toLowerCase();
    return this.kegiatanList.filter((item) => {
      const matchesQuery =
        !query ||
        item.judul.toLowerCase().includes(query) ||
        item.lokasi.toLowerCase().includes(query) ||
        item.kategori.toLowerCase().includes(query);
      const matchesStatus = this.statusFilter === 'Semua' || item.status === this.statusFilter;
      const matchesKategori = this.kategoriFilter === 'Semua' || item.kategori === this.kategoriFilter;
      return matchesQuery && matchesStatus && matchesKategori;
    });
  }

  startCreate(): void {
    this.formMode = 'create';
    this.formData = {
      judul: '',
      kategori: '',
      tanggalWaktu: '',
      lokasi: '',
      status: 'Terjadwal',
      deskripsi: '',
      agenda: '',
      highlight: false,
      kontak: ''
    };
  }

  startEdit(item: KegiatanItem): void {
    this.formMode = 'edit';
    this.formData = { ...item };
  }
}
