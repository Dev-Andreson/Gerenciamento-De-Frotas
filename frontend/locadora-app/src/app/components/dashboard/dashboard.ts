import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  totalVeiculos = 0;
  totalMarcas = 0;
  totalCategorias = 0;
  ultimosVeiculos: any[] = [];

  ngOnInit(): void {
    // Dados mockados para teste
    this.totalVeiculos = 0;
    this.totalMarcas = 0;
    this.totalCategorias = 0;
    this.ultimosVeiculos = [];
  }
}