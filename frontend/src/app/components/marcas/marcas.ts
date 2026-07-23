import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../services/marca.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-marcas',
  standalone: false,
  templateUrl: './marcas.html',
  styleUrl: './marcas.css',
})
export class Marcas implements OnInit {
  marcas: any[] = [];
  marcasFiltradas: any[] = [];
  termoBusca: string = '';

  marcaEditando: any = null;
  showForm = false;
  isLoading = false;
  isAdmin: boolean = false;

  novaMarca = { nome: '' };

  constructor(
    private marcaService: MarcaService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.carregarMarcas();
  }

  carregarMarcas(): void {
    this.marcaService.listar().subscribe({
      next: (marcas: any) => {
        this.marcas = marcas;
        this.marcasFiltradas = [...marcas];
        console.log('Marcas carregadas:', this.marcas);
      },
      error: (error) => {
        console.error('Erro ao carregar marcas:', error);
        alert('Erro ao carregar lista de marcas');
      },
    });
  }

  aplicarFiltro(): void {
    if (!this.termoBusca.trim()) {
      this.marcasFiltradas = [...this.marcas];
      return;
    }

    const termo = this.termoBusca.toLowerCase().trim();
    this.marcasFiltradas = this.marcas.filter((marca) => marca.nome.toLowerCase().includes(termo));
  }

  limparBusca(): void {
    this.termoBusca = '';
    this.marcasFiltradas = [...this.marcas];
  }

  abrirFormulario(): void {
    if (!this.isAdmin) {
      alert('Apenas administradores podem cadastrar marcas');
      return;
    }
    this.showForm = true;
    this.marcaEditando = null;
    this.novaMarca = { nome: '' };
  }

  fecharFormulario(): void {
    this.showForm = false;
    this.marcaEditando = null;
  }

  editarMarca(marca: any): void {
    if (!this.isAdmin) {
      alert('Apenas administradores podem editar marcas');
      return;
    }
    this.marcaEditando = marca;
    this.novaMarca = { nome: marca.nome };
    this.showForm = true;
  }

  salvarMarca(): void {
    if (!this.novaMarca.nome.trim()) {
      alert('Digite o nome da marca');
      return;
    }

    this.isLoading = true;

    if (this.marcaEditando) {
      this.marcaService.atualizar(this.marcaEditando.id, this.novaMarca).subscribe({
        next: () => {
          alert('Marca atualizada com sucesso!');
          this.fecharFormulario();
          this.carregarMarcas();
          this.isLoading = false;
        },
        error: (error) => {
          if (error.status === 409) {
            alert(error.error.erro);
          } else if (error.status === 400) {
            alert(error.error.erro || 'Dados inválidos.');
          } else {
            alert('Erro ao cadastrar categoria.');
          }
          this.isLoading = false;
        },
      });
    } else {
      this.marcaService.criar(this.novaMarca).subscribe({
        next: () => {
          alert('Marca cadastrada com sucesso!');
          this.fecharFormulario();
          this.carregarMarcas();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);

          if (error.status === 409) {
            alert(error.error.erro);
          } else if (error.status === 400) {
            alert(error.error.erro || 'Dados inválidos.');
          } else {
            alert('Erro ao cadastrar marca.');
          }
          this.isLoading = false;
        },
      });
    }
  }

  excluirMarca(id: number): void {
    if (!this.isAdmin) {
      alert('Apenas administradores podem excluir marcas');
      return;
    }
    if (confirm('Tem certeza que deseja excluir esta marca?')) {
      this.marcaService.deletar(id).subscribe({
        next: () => {
          alert('Marca excluída com sucesso!');
          this.carregarMarcas();
        },
        error: (error) => {
          console.error('Erro ao excluir:', error);
          alert('Erro ao excluir marca');
        },
      });
    }
  }
}
