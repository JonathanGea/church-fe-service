import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [NgIf, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  infoMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor() {
    const reason = this.route.snapshot.queryParamMap.get('reason');
    if (reason === 'expired') {
      this.infoMessage = 'Sesi admin telah berakhir. Silakan login kembali.';
    }
  }

  onLogin(event: Event): void {
    event.preventDefault();
    if (this.isSubmitting) {
      return;
    }

    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const username = String(data.get('username') ?? '').trim();
    const password = String(data.get('password') ?? '').trim();

    if (!username || !password) {
      this.errorMessage = 'Username dan password wajib diisi.';
      return;
    }

    this.errorMessage = '';
    this.infoMessage = '';
    this.isSubmitting = true;

    this.authService
      .login(username, password)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (!response?.isSuccess || !response?.data?.accessToken) {
            this.errorMessage = 'Login gagal. Periksa kredensial atau server.';
            return;
          }
          this.router.navigate(['/admin']);
        },
        error: () => {
          this.errorMessage = 'Login gagal. Periksa kredensial atau server.';
        }
      });
  }
}
