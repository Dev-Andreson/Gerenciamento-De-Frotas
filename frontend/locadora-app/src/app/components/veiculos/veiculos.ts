import { Component } from '@angular/core';

@Component({
  selector: 'app-veiculos',
  standalone: false,
  templateUrl: './veiculos.html',
  styleUrl: './veiculos.css',
})
export class Veiculos {
  veiculos: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // Será preenchido quando conectar com backend
  }
}