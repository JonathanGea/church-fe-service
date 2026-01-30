import { Routes } from '@angular/router';
import { AdminAlbumPageComponent } from './admin/album/album';
import { DashboardPageComponent } from './admin/dashboard/dashboard';
import { IbadahPageComponent } from './admin/ibadah/ibadah.component';
import { KegiatanPageComponent } from './admin/kegiatan/kegiatan.component';
import { KontakPageComponent } from './admin/kontak/kontak.component';
import { AdminPlaceholderPageComponent } from './admin/placeholder/admin-placeholder';
import { WartaPageComponent } from './admin/warta/warta.component';

export const adminRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    data: {
      title: 'Dashboard',
      breadcrumbs: ['Admin', 'Dashboard']
    }
  },
  {
    path: 'warta',
    component: WartaPageComponent,
    data: {
      title: 'Warta',
      breadcrumbs: ['Admin', 'Warta']
    }
  },
  {
    path: 'kegiatan',
    component: KegiatanPageComponent,
    data: {
      title: 'Kegiatan',
      breadcrumbs: ['Admin', 'Kegiatan']
    }
  },
  {
    path: 'ibadah',
    component: IbadahPageComponent,
    data: {
      title: 'Ibadah',
      breadcrumbs: ['Admin', 'Ibadah']
    }
  },
  {
    path: 'album',
    component: AdminAlbumPageComponent,
    data: {
      title: 'Album',
      breadcrumbs: ['Admin', 'Album']
    }
  },
  {
    path: 'kontak',
    component: KontakPageComponent,
    data: {
      title: 'Kontak',
      breadcrumbs: ['Admin', 'Kontak']
    }
  },
  {
    path: 'tentang-jemaat',
    component: AdminPlaceholderPageComponent,
    data: {
      title: 'Tentang Jemaat',
      breadcrumbs: ['Admin', 'Tentang Jemaat'],
      description: 'Kelola profil, sejarah, visi, dan struktur pelayan.'
    }
  },
  {
    path: 'pelayanan',
    component: AdminPlaceholderPageComponent,
    data: {
      title: 'Pelayanan',
      breadcrumbs: ['Admin', 'Pelayanan'],
      description: 'Atur pelayanan kategorial dan fungsional.'
    }
  },
  {
    path: 'persembahan',
    component: AdminPlaceholderPageComponent,
    data: {
      title: 'Persembahan',
      breadcrumbs: ['Admin', 'Persembahan'],
      description: 'Kelola rekening, QRIS, dan konfirmasi persembahan.'
    }
  },
  {
    path: 'user-management',
    component: AdminPlaceholderPageComponent,
    data: {
      title: 'User Management',
      breadcrumbs: ['Admin', 'User Management'],
      description: 'Kelola admin, role, dan reset password.'
    }
  },
  {
    path: 'settings',
    component: AdminPlaceholderPageComponent,
    data: {
      title: 'Settings',
      breadcrumbs: ['Admin', 'Settings'],
      description: 'Atur identitas jemaat, tema, dan metadata.'
    }
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
