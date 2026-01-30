import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { API_BASE_URL } from '../tokens/api-base-url';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

const shouldAttachToken = (requestUrl: string, baseUrl: string): boolean => {
  return (
    requestUrl.startsWith(`${baseUrl}/admin`) ||
    requestUrl.startsWith(`${baseUrl}/auth/logout`)
  );
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const baseUrl = inject(API_BASE_URL);
  const router = inject(Router);
  const token = auth.getAccessToken();
  const isProtectedRequest = shouldAttachToken(req.url, baseUrl);

  if (!token || !isProtectedRequest) {
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (isProtectedRequest && error.status === 401) {
          auth.logout();
          if (router.url !== '/admin/login') {
            router.navigate(['/admin/login'], {
              queryParams: { reason: 'expired' }
            });
          }
        }
        return throwError(() => error);
      })
    );
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        auth.logout();
        if (router.url !== '/admin/login') {
          router.navigate(['/admin/login'], {
            queryParams: { reason: 'expired' }
          });
        }
      }
      return throwError(() => error);
    })
  );
};
