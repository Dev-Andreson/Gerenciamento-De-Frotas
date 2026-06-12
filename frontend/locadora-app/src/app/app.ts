import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  // Forçar sempre logado para teste
  isLoggedIn(): boolean {
    return true;  // <-- Mudar para true
  }
}