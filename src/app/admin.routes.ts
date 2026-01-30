import { Routes } from '@angular/router';
import { AdminPlaceholderPageComponent } from './admin/placeholder/admin-placeholder.component';
import { AdminHomePageComponent } from './admin/home/home.component';
import { AdminAboutPageComponent } from './admin/about/about.component';
import { AdminWorshipPageComponent } from './admin/worship/worship.component';
import { AdminBulletinsPageComponent } from './admin/bulletins/bulletins.component';
import { AdminActivitiesPageComponent } from './admin/activities/activities.component';
import { AdminActivitiesDetailPageComponent } from './admin/activities-detail/activities-detail.component';
import { AdminMinistryPageComponent } from './admin/ministry/ministry.component';
import { AdminOfferingsPageComponent } from './admin/offerings/offerings.component';
import { AdminContactPageComponent } from './admin/contact/contact.component';
import { AdminAlbumsPageComponent } from './admin/albums/albums.component';

export const adminRoutes: Routes = [
  {
    path: 'home',
    component: AdminHomePageComponent,
    data: {
      title: 'Beranda',
      breadcrumbs: ['Konten', 'Beranda']
    }
  },
  {
    path: 'about',
    component: AdminAboutPageComponent,
    data: {
      title: 'Tentang Jemaat',
      breadcrumbs: ['Konten', 'Tentang Jemaat']
    }
  },
  {
    path: 'worship',
    component: AdminWorshipPageComponent,
    data: {
      title: 'Ibadah',
      breadcrumbs: ['Konten', 'Ibadah']
    }
  },
  {
    path: 'bulletins',
    component: AdminBulletinsPageComponent,
    data: {
      title: 'Warta Jemaat',
      breadcrumbs: ['Konten', 'Warta Jemaat']
    }
  },
  {
    path: 'activities',
    component: AdminActivitiesPageComponent,
    data: {
      title: 'Kegiatan Jemaat',
      breadcrumbs: ['Konten', 'Kegiatan Jemaat']
    }
  },
  {
    path: 'activities/:id',
    component: AdminActivitiesDetailPageComponent,
    data: {
      title: 'Kegiatan Detail',
      breadcrumbs: ['Konten', 'Kegiatan Detail']
    }
  },
  {
    path: 'ministry',
    component: AdminMinistryPageComponent,
    data: {
      title: 'Pelayanan Jemaat',
      breadcrumbs: ['Konten', 'Pelayanan Jemaat']
    }
  },
  {
    path: 'offerings',
    component: AdminOfferingsPageComponent,
    data: {
      title: 'Persembahan',
      breadcrumbs: ['Konten', 'Persembahan']
    }
  },
  {
    path: 'contact',
    component: AdminContactPageComponent,
    data: {
      title: 'Kontak',
      breadcrumbs: ['Konten', 'Kontak']
    }
  },
  {
    path: 'albums',
    component: AdminAlbumsPageComponent,
    data: {
      title: 'Album',
      breadcrumbs: ['Konten', 'Album']
    }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
