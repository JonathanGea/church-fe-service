import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type WartaStatus = 'Aktif' | 'Nonaktif';

interface WartaItem {
  id: number;
  judul: string;
  tema: string;
  tanggal: string;
  fileName: string;
  status: WartaStatus;
}

interface WartaForm {
  judul: string;
  tema: string;
  tanggal: string;
  status: WartaStatus;
  fileName: string;
}

@Component({
  selector: 'app-admin-warta-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './warta.component.html'
})
export class WartaPageComponent {
  searchQuery = '';
  statusFilter: 'Semua' | WartaStatus = 'Semua';
  temaFilter = 'Semua';
  formMode: 'create' | 'edit' = 'create';

  wartaList: WartaItem[] = [
    {
      id: 1,
      judul: 'Warta Jemaat Januari 2026',
      tema: 'Kasih dan Pengharapan',
      tanggal: '2026-01-05',
      fileName: 'warta-jemaat-jan-2026.pdf',
      status: 'Aktif'
    },
    {
      id: 2,
      judul: 'Warta Jemaat Minggu II',
      tema: 'Iman yang Bertumbuh',
      tanggal: '2026-01-12',
      fileName: 'warta-jemaat-minggu-2.pdf',
      status: 'Aktif'
    },
    {
      id: 3,
      judul: 'Warta Jemaat Minggu III',
      tema: 'Pelayanan dan Diakonia',
      tanggal: '2026-01-19',
      fileName: 'warta-jemaat-minggu-3.pdf',
      status: 'Nonaktif'
    },
    {
      id: 4,
      judul: 'Warta Jemaat Minggu IV',
      tema: 'Syukur dan Kesaksian',
      tanggal: '2026-01-26',
      fileName: 'warta-jemaat-minggu-4.pdf',
      status: 'Aktif'
    }
  ];

  formData: WartaForm = {
    judul: '',
    tema: '',
    tanggal: '',
    status: 'Aktif',
    fileName: ''
  };

  get temaOptions(): string[] {
    const unique = new Set(this.wartaList.map((item) => item.tema));
    return ['Semua', ...Array.from(unique)];
  }

  get filteredWarta(): WartaItem[] {
    const query = this.searchQuery.trim().toLowerCase();
    return this.wartaList.filter((item) => {
      const matchesQuery =
        !query ||
        item.judul.toLowerCase().includes(query) ||
        item.tema.toLowerCase().includes(query);
      const matchesStatus = this.statusFilter === 'Semua' || item.status === this.statusFilter;
      const matchesTema = this.temaFilter === 'Semua' || item.tema === this.temaFilter;
      return matchesQuery && matchesStatus && matchesTema;
    });
  }

  startCreate(): void {
    this.formMode = 'create';
    this.formData = {
      judul: '',
      tema: '',
      tanggal: '',
      status: 'Aktif',
      fileName: ''
    };
  }

  startEdit(item: WartaItem): void {
    this.formMode = 'edit';
    this.formData = { ...item };
  }
}
