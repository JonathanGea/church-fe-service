import { Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  private readonly destroyRef = inject(DestroyRef);

  errorMessage = '';
  isSubmitting = false;

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
