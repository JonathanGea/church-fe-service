import { Routes } from '@angular/router';
import { HomePageComponent } from './public/home/home';
import { AlbumPageComponent } from './public/album/album';
import { IbadahPageComponent } from './public/ibadah/ibadah';
import { KegiatanPageComponent } from './public/kegiatan/kegiatan';
import { KegiatanDetailPageComponent } from './public/kegiatan-detail/kegiatan-detail';
import { KontakPageComponent } from './public/kontak/kontak';
import { PelayananPageComponent } from './public/pelayanan/pelayanan';
import { PersembahanPageComponent } from './public/persembahan/persembahan';
import { TentangPageComponent } from './public/tentang/tentang';
import { WartaPageComponent } from './public/warta/warta';

export const publicRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'album',
    component: AlbumPageComponent
  },
  {
    path: 'tentang',
    component: TentangPageComponent
  },
  {
    path: 'ibadah',
    component: IbadahPageComponent
  },
  {
    path: 'warta',
    component: WartaPageComponent
  },
  {
    path: 'kegiatan/:id',
    component: KegiatanDetailPageComponent
  },
  {
    path: 'kegiatan',
    component: KegiatanPageComponent
  },
  {
    path: 'pelayanan',
    component: PelayananPageComponent
  },
  {
    path: 'persembahan',
    component: PersembahanPageComponent
  },
  {
    path: 'kontak',
    component: KontakPageComponent
  }
];
