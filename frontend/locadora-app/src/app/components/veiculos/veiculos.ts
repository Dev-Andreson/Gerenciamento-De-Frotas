import { Component, OnInit } from '@angular/core';
import { VeiculoService } from '../../services/veiculo.service';
import { MarcaService } from '../../services/marca.service';
import { CategoriaService } from '../../services/categoria.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-veiculos',
  standalone: false,
  templateUrl: './veiculos.html',
  styleUrl: './veiculos.css',
})

export class Veiculos implements OnInit {
  veiculos: any[] = [];
  veiculosFiltrados: any[] = [];
  veiculosPaginados: any[] = [];
  marcas: any[] = [];
  categorias: any[] = [];
  
  veiculoEditando: any = null;
  showForm = false;
  isLoading = false;
  isAdmin: boolean = false;
  
  // Filtros
  termoBusca: string = '';
  filtroPrecoMin: number | null = null;
  filtroPrecoMax: number | null = null;
  filtroAno: number | null = null;
  
  // Paginação
  paginaAtual: number = 1;
  itensPorPagina: number = 5;
  totalPaginas: number = 0;
  
  novoVeiculo = {
    modelo: '',
    ano: 2024,
    preco_diaria: 100,
    disponibilidade: 'Disponivel',
    id_marca: 1,
    id_categoria: 1
  };

  constructor(
    private veiculoService: VeiculoService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.carregarVeiculos();
    this.carregarMarcas();
    this.carregarCategorias();
  }

  carregarVeiculos(): void {
    this.veiculoService.listar(1, 100).subscribe({
      next: (response: any) => {
        if (response && response.dados) {
          this.veiculos = response.dados;
        } else if (Array.isArray(response)) {
          this.veiculos = response;
        }
        this.aplicarFiltros();
        console.log('Veículos carregados:', this.veiculos);
      },
      error: (error) => {
        console.error('Erro ao carregar veículos:', error);
        alert('Erro ao carregar lista de veículos');
      }
    });
  }

  carregarMarcas(): void {
    this.marcaService.listar().subscribe({
      next: (marcas: any) => {
        this.marcas = marcas;
      },
      error: (error) => {
        console.error('Erro ao carregar marcas:', error);
      }
    });
  }

  carregarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (categorias: any) => {
        this.categorias = categorias;
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    });
  }

  aplicarFiltros(): void {
    let resultado = [...this.veiculos];
    
    if (this.termoBusca.trim()) {
      const termo = this.termoBusca.toLowerCase().trim();
      resultado = resultado.filter(veiculo => 
        veiculo.modelo.toLowerCase().includes(termo)
      );
    }
    
    if (this.filtroPrecoMin !== null && this.filtroPrecoMin > 0) {
      resultado = resultado.filter(veiculo => 
        veiculo.preco_diaria >= this.filtroPrecoMin!
      );
    }
    
    if (this.filtroPrecoMax !== null && this.filtroPrecoMax > 0) {
      resultado = resultado.filter(veiculo => 
        veiculo.preco_diaria <= this.filtroPrecoMax!
      );
    }
    
    if (this.filtroAno !== null && this.filtroAno > 0) {
      resultado = resultado.filter(veiculo => 
        veiculo.ano === this.filtroAno
      );
    }
    
    this.veiculosFiltrados = resultado;
    this.paginaAtual = 1;
    this.atualizarPaginacao();
  }

  atualizarPaginacao(): void {
    this.totalPaginas = Math.ceil(this.veiculosFiltrados.length / this.itensPorPagina);
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.veiculosPaginados = this.veiculosFiltrados.slice(inicio, fim);
  }

  mudarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaAtual = pagina;
    this.atualizarPaginacao();
  }

  limparBusca(): void {
    this.termoBusca = '';
    this.aplicarFiltros();
  }

  limparTodosFiltros(): void {
    this.termoBusca = '';
    this.filtroPrecoMin = null;
    this.filtroPrecoMax = null;
    this.filtroAno = null;
    this.aplicarFiltros();
  }

  abrirFormulario(): void {
    if (!this.isAdmin) {
      alert('Apenas administradores podem cadastrar veículos');
      return;
    }
    this.showForm = true;
    this.veiculoEditando = null;
    this.novoVeiculo = {
      modelo: '',
      ano: 2024,
      preco_diaria: 100,
      disponibilidade: 'Disponivel',
      id_marca: this.marcas.length > 0 ? this.marcas[0].id : 1,
      id_categoria: this.categorias.length > 0 ? this.categorias[0].id : 1
    };
  }

  fecharFormulario(): void {
    this.showForm = false;
    this.veiculoEditando = null;
  }

  editarVeiculo(veiculo: any): void {
    if (!this.isAdmin) {
      alert('Apenas administradores podem editar veículos');
      return;
    }
    this.veiculoEditando = veiculo;
    this.novoVeiculo = {
      modelo: veiculo.modelo,
      ano: veiculo.ano,
      preco_diaria: veiculo.preco_diaria,
      disponibilidade: veiculo.disponibilidade === 'Disponivel' ? 'Disponivel' : 'Indisponivel',
      id_marca: veiculo.id_marca,
      id_categoria: veiculo.id_categoria
    };
    this.showForm = true;
  }

  salvarVeiculo(): void {
    if (!this.novoVeiculo.modelo.trim()) {
      alert('Digite o modelo do veículo');
      return;
    }
    if (!this.novoVeiculo.ano || this.novoVeiculo.ano < 1886 || this.novoVeiculo.ano > 2026) {
      alert('Digite um ano válido (1886-2026)');
      return;
    }
    if (!this.novoVeiculo.preco_diaria || this.novoVeiculo.preco_diaria <= 0) {
      alert('Digite um preço válido');
      return;
    }
    if (!this.novoVeiculo.id_marca) {
      alert('Selecione uma marca');
      return;
    }
    if (!this.novoVeiculo.id_categoria) {
      alert('Selecione uma categoria');
      return;
    }

    this.isLoading = true;

    const dadosParaEnvio = {
      modelo: this.novoVeiculo.modelo,
      ano: this.novoVeiculo.ano,
      preco_diaria: this.novoVeiculo.preco_diaria,
      disponibilidade: this.novoVeiculo.disponibilidade,
      id_marca: this.novoVeiculo.id_marca,
      id_categoria: this.novoVeiculo.id_categoria
    };

    if (this.veiculoEditando) {
      this.veiculoService.atualizar(this.veiculoEditando.id, dadosParaEnvio).subscribe({
        next: () => {
          alert('Veículo atualizado com sucesso!');
          this.fecharFormulario();
          this.carregarVeiculos();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao atualizar:', error);
          alert('Erro ao atualizar veículo');
          this.isLoading = false;
        }
      });
    } else {
      this.veiculoService.criar(dadosParaEnvio).subscribe({
        next: () => {
          alert('Veículo cadastrado com sucesso!');
          this.fecharFormulario();
          this.carregarVeiculos();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
          alert('Erro ao cadastrar veículo');
          this.isLoading = false;
        }
      });
    }
  }

  excluirVeiculo(id: number): void {
    if (!this.isAdmin) {
      alert('Apenas administradores podem excluir veículos');
      return;
    }
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      this.veiculoService.deletar(id).subscribe({
        next: () => {
          alert('Veículo excluído com sucesso!');
          this.carregarVeiculos();
        },
        error: (error) => {
          console.error('Erro ao excluir:', error);
          alert('Erro ao excluir veículo');
        }
      });
    }
  }
}