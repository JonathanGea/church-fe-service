import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout';
import { adminRoutes } from './admin.routes';
import { publicRoutes } from './public.routes';
import { LoginPageComponent } from './auth/login/login';
import { RegisterPageComponent } from './auth/register/register';
import { adminChildGuard, adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: publicRoutes
  },
  {
    path: 'admin/login',
    component: AuthLayoutComponent,
    children: [{ path: '', component: LoginPageComponent }]
  },
  {
    path: 'admin/register',
    component: AuthLayoutComponent,
    children: [{ path: '', component: RegisterPageComponent }]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    canActivateChild: [adminChildGuard],
    children: adminRoutes
  },
  {
    path: '**',
    redirectTo: ''
  }
];
