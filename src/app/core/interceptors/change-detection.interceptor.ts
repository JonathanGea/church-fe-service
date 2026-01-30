import { ApplicationRef, NgZone, inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const changeDetectionInterceptor: HttpInterceptorFn = (req, next) => {
  const appRef = inject(ApplicationRef);
  const ngZone = inject(NgZone);

  return next(req).pipe(
    finalize(() => {
      try {
        ngZone.run(() => appRef.tick());
      } catch {
        appRef.tick();
      }
    })
  );
};
