import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  usuario = {
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };
  
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (!this.usuario.nome.trim()) {
      this.errorMessage = 'Digite seu nome';
      return;
    }
    if (!this.usuario.email.trim() || !this.usuario.email.includes('@')) {
      this.errorMessage = 'Digite um e-mail válido';
      return;
    }
    if (this.usuario.senha.length < 6) {
      this.errorMessage = 'A senha deve ter no mínimo 6 caracteres';
      return;
    }
    if (this.usuario.senha !== this.usuario.confirmarSenha) {
      this.errorMessage = 'As senhas não coincidem';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post(`${this.apiUrl}/registro`, {
      nome: this.usuario.nome,
      email: this.usuario.email,
      senha: this.usuario.senha
    }).subscribe({
      next: (response: any) => {
        this.successMessage = 'Usuário cadastrado com sucesso! Faça login para continuar.';
        this.isLoading = false;
        this.usuario = { nome: '', email: '', senha: '', confirmarSenha: '' };
        
        // Redirecionar para login após 3 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        console.error('Erro no cadastro:', error);
        this.isLoading = false;
        
        if (error.status === 409) {
          this.errorMessage = 'E-mail já está cadastrado';
        } else if (error.status === 0) {
          this.errorMessage = 'Erro de conexão com o servidor';
        } else {
          this.errorMessage = 'Erro ao cadastrar usuário. Tente novamente.';
        }
      }
    });
  }

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
}