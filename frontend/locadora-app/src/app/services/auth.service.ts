import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginCredentials, LoginResponse, Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Ajuste para sua porta do backend
  private tokenKey = 'jwt_token';
  private userKey = 'user_data';
  
  // BehaviorSubject para gerenciar o estado da autenticação
  private authSubject = new BehaviorSubject<Usuario | null>(null);
  public auth$ = this.authSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar se já existe usuário logado no localStorage
    const storedUser = localStorage.getItem(this.userKey);
    if (storedUser) {
      this.authSubject.next(JSON.parse(storedUser));
    }
  }

  // Login
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          // Armazenar token e usuário
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, JSON.stringify(response.usuario));
          this.authSubject.next(response.usuario);
        })
      );
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.authSubject.next(null);
  }

  // Obter token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Obter usuário atual
  getCurrentUser(): Usuario | null {
    return this.authSubject.value;
  }

  // Verificar se está logado
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Verificar se é admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.perfil === 'admin';
  }
}