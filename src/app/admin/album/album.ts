import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

interface AlbumItem {
  title: string;
  category: string;
  tags: string[];
  coverLabel: string;
  count: number;
  highlight: boolean;
}

@Component({
  selector: 'app-admin-album-page',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './album.html'
})
export class AdminAlbumPageComponent {
  albums: AlbumItem[] = [
    {
      title: 'Ibadah Minggu',
      category: 'Ibadah',
      tags: ['Minggu', 'Raya'],
      coverLabel: 'Cover ibadah minggu',
      count: 42,
      highlight: true
    },
    {
      title: 'Pelatihan Liturgi',
      category: 'Pelatihan',
      tags: ['Pembinaan'],
      coverLabel: 'Cover pelatihan liturgi',
      count: 18,
      highlight: false
    },
    {
      title: 'Diakonia',
      category: 'Pelayanan',
      tags: ['Kunjungan', 'Kasih'],
      coverLabel: 'Cover pelayanan diakonia',
      count: 26,
      highlight: false
    }
  ];

  uploadQueue = [
    { name: 'ibadah-minggu-01.jpg', size: '1.4 MB' },
    { name: 'ibadah-minggu-02.jpg', size: '1.1 MB' },
    { name: 'ibadah-minggu-03.jpg', size: '980 KB' }
  ];
}
