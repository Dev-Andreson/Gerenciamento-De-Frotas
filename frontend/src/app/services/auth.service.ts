import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginCredentials, LoginResponse, Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private tokenKey = 'jwt_token';
  private userKey = 'user_data';

  private authSubject = new BehaviorSubject< Usuario | null>(null);
  public auth$ = this.authSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem(this.userKey);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.authSubject.next(user);
      } catch (e) {
        console.error('Erro ao carregar usuário:', e);
        this.logout();
      }
    }
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, credentials).pipe(
      tap({
        next: (response) => {
          if (response && response.token && response.usuario) {
            localStorage.setItem(this.tokenKey, response.token);
            localStorage.setItem(this.userKey, JSON.stringify(response.usuario));
            this.authSubject.next(response.usuario);
          }
        },
        error: (error) => {
          console.error('Erro no login:', error);
        },
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.authSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): Usuario | null {
    return this.authSubject.value;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.perfil === 'admin';
  }
}
