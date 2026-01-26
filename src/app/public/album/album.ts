import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-album-page',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './album.html',
  styleUrl: './album.css'
})
export class AlbumPageComponent {
  tags = ['Semua', 'Ibadah', 'Kegiatan', 'Pelayanan', 'Pelatihan'];
  selectedTag = 'Semua';

  photos = [
    { title: 'Ibadah Minggu', count: 24, tag: 'Ibadah' },
    { title: 'Kelas Katekisasi', count: 18, tag: 'Kegiatan' },
    { title: 'Pelatihan Liturgi', count: 15, tag: 'Pelatihan' },
    { title: 'Doa Bersama', count: 12, tag: 'Pelayanan' },
    { title: 'Ibadah Natal', count: 36, tag: 'Ibadah' },
    { title: 'Pelayanan Diakonia', count: 14, tag: 'Pelayanan' }
  ];

  setTag(tag: string): void {
    this.selectedTag = tag;
  }

  get filteredPhotos() {
    if (this.selectedTag === 'Semua') {
      return this.photos;
    }
    return this.photos.filter((photo) => photo.tag === this.selectedTag);
  }
}
