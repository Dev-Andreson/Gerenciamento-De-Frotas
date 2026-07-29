import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperarSenha',
  standalone: false,
  templateUrl: './recuperarSenha.html',
  styleUrl: './recuperarSenha.css'
})
export class RecuperarSenha implements OnInit {
  email: string = '';
  token: string = '';
  novaSenha: string = '';
  confirmarSenha: string = '';
  
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  modo: 'solicitar' | 'redefinir' = 'solicitar';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Verifica se há um token na URL (ex: /recuperar-senha?token=xyz)
    this.token = this.route.snapshot.queryParams['token'];
    if (this.token) {
      this.modo = 'redefinir';
    }
  }

  solicitarRecuperacao(): void {
    if (!this.email) {
      this.errorMessage = 'Informe seu e-mail';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.recuperarSenha(this.email).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Se o e-mail existir, enviamos as instruções.';
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao processar solicitação.';
      }
    });
  }

  confirmarRedefinicao(): void {
    if (this.novaSenha.length < 6) {
      this.errorMessage = 'A senha deve ter no mínimo 6 caracteres';
      return;
    }
    if (this.novaSenha !== this.confirmarSenha) {
      this.errorMessage = 'As senhas não conferem';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.confirmarRecuperacao(this.token, this.novaSenha).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Senha alterada com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.erro || 'Token inválido ou expirado';
      }
    });
  }

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
}
