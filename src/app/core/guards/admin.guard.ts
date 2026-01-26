import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

const isAdmin = (auth: AuthService): boolean => {
  if (!auth.isAuthenticated()) {
    return false;
  }

  const user = auth.getUser();
  return Boolean(user?.roles?.includes('ADMIN'));
};

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return isAdmin(auth) ? true : router.createUrlTree(['/admin/login']);
};

export const adminChildGuard: CanActivateChildFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return isAdmin(auth) ? true : router.createUrlTree(['/admin/login']);
};
