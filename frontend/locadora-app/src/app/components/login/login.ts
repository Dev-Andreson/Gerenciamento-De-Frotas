import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials = {
    email: '',
    senha: ''
  };
  
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    this.isLoading = true;
    
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
    }, 1000);
  }
}