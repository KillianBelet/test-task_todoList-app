import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap }        from 'rxjs/operators';
import { Observable } from 'rxjs';
import { API_URL } from '../app.component';

interface AuthResponse { token: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = API_URL; 

  constructor(private http: HttpClient) {}

  login(creds: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/auth/token`, creds
    ).pipe(
      tap(res => localStorage.setItem('jwt', res.token))
    );
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
