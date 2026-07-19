import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VeiculoService } from '../../services/veiculo.service';
import { MarcaService } from '../../services/marca.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  totalVeiculos: number = 0;
  totalMarcas: number = 0;
  totalCategorias: number = 0;
  ultimosVeiculos: any[] = [];

  constructor(
    private veiculoService: VeiculoService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarVeiculos();
    this.carregarMarcas();
    this.carregarCategorias();
  }

  carregarVeiculos(): void {
    this.veiculoService.listar(1, 5).subscribe({
      next: (response: any) => {
        console.log('Dados recebidos:', response);
        
        if (response && response.dados) {
          this.totalVeiculos = response.paginacao?.total_itens || response.dados.length;
          this.ultimosVeiculos = response.dados;
        } else if (Array.isArray(response)) {
          this.totalVeiculos = response.length;
          this.ultimosVeiculos = response;
        }
        
        // Forçar atualização da tela
        this.cdr.detectChanges();
        
        console.log('totalVeiculos atualizado:', this.totalVeiculos);
        console.log('ultimosVeiculos atualizado:', this.ultimosVeiculos);
      },
      error: (error) => {
        console.error('Erro:', error);
      }
    });
  }

  carregarMarcas(): void {
    this.marcaService.listar().subscribe({
      next: (marcas: any) => {
        this.totalMarcas = Array.isArray(marcas) ? marcas.length : 0;
        this.cdr.detectChanges();
        console.log('totalMarcas atualizado:', this.totalMarcas);
      },
      error: (error) => {
        console.error('Erro:', error);
      }
    });
  }

  carregarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (categorias: any) => {
        this.totalCategorias = Array.isArray(categorias) ? categorias.length : 0;
        this.cdr.detectChanges();
        console.log('totalCategorias atualizado:', this.totalCategorias);
      },
      error: (error) => {
        console.error('Erro:', error);
      }
    });
  }
}