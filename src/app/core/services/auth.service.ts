import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BaseResponse } from '../models/base-response';
import { AuthPayload, AuthUser } from '../models/auth.models';
import { API_BASE_URL } from '../tokens/api-base-url';

const STORAGE_TOKEN_KEY = 'fe_service_access_token';
const STORAGE_USER_KEY = 'fe_service_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  login(username: string, password: string): Observable<BaseResponse<AuthPayload>> {
    return this.http
      .post<BaseResponse<AuthPayload>>(`${this.baseUrl}/auth/login`, {
        username,
        password
      })
      .pipe(
        tap((response) => {
          if (response?.isSuccess && response.data) {
            this.setSession(response.data);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    localStorage.removeItem(STORAGE_USER_KEY);
  }

  logoutRequest(): Observable<BaseResponse<Record<string, never>>> {
    return this.http
      .post<BaseResponse<Record<string, never>>>(`${this.baseUrl}/auth/logout`, {})
      .pipe(
        tap(() => {
          this.logout();
        })
      );
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(STORAGE_TOKEN_KEY));
  }

  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_TOKEN_KEY);
  }

  getUser(): AuthUser | null {
    const stored = localStorage.getItem(STORAGE_USER_KEY);
    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored) as AuthUser;
    } catch {
      return null;
    }
  }

  private setSession(payload: AuthPayload): void {
    localStorage.setItem(STORAGE_TOKEN_KEY, payload.accessToken);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(payload.user));
  }
}
