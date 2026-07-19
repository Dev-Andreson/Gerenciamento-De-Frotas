import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { Usuario } from './models/usuario.model';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private authSubscription: Subscription | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.auth$.subscribe((user: Usuario | null) => {
      this.isLoggedIn = !!user;
      console.log('AppComponent - isLoggedIn:', this.isLoggedIn);
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}