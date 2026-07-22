import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-categorias',
  standalone: false,
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias implements OnInit {
  categorias: any[] = [];
  categoriasFiltradas: any[] = [];
  termoBusca: string = '';

  categoriaEditando: any = null;
  showForm = false;
  isLoading = false;
  isAdmin: boolean = false;

  novaCategoria = { descricao: '' };

  constructor(
    private categoriaService: CategoriaService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (categorias: any) => {
        this.categorias = categorias;
        this.categoriasFiltradas = [...categorias];
        console.log('Categorias carregadas:', this.categorias);
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
        alert('Erro ao carregar lista de categorias');
      },
    });
  }

  aplicarFiltro(): void {
    if (!this.termoBusca.trim()) {
      this.categoriasFiltradas = [...this.categorias];
      return;
    }

    const termo = this.termoBusca.toLowerCase().trim();
    this.categoriasFiltradas = this.categorias.filter((categoria) =>
      categoria.descricao.toLowerCase().includes(termo),
    );
  }

  limparBusca(): void {
    this.termoBusca = '';
    this.categoriasFiltradas = [...this.categorias];
  }

  abrirFormulario(): void {
    if (!this.isAdmin) {
      alert('Apenas administradores podem cadastrar categorias');
      return;
    }
    this.showForm = true;
    this.categoriaEditando = null;
    this.novaCategoria = { descricao: '' };
  }

  fecharFormulario(): void {
    this.showForm = false;
    this.categoriaEditando = null;
  }

  editarCategoria(categoria: any): void {
    if (!this.isAdmin) {
      alert('Apenas administradores podem editar categorias');
      return;
    }
    this.categoriaEditando = categoria;
    this.novaCategoria = { descricao: categoria.descricao };
    this.showForm = true;
  }

  salvarCategoria(): void {
    if (!this.novaCategoria.descricao.trim()) {
      alert('Digite a descrição da categoria');
      return;
    }

    this.isLoading = true;

    if (this.categoriaEditando) {
      this.categoriaService.atualizar(this.categoriaEditando.id, this.novaCategoria).subscribe({
        next: () => {
          alert('Categoria atualizada com sucesso!');
          this.fecharFormulario();
          this.carregarCategorias();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);

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
      this.categoriaService.criar(this.novaCategoria).subscribe({
        next: () => {
          alert('Categoria cadastrada com sucesso!');
          this.fecharFormulario();
          this.carregarCategorias();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
          alert('Erro ao cadastrar categoria');
          this.isLoading = false;
        },
      });
    }
  }

  excluirCategoria(id: number): void {
    if (!this.isAdmin) {
      alert('Apenas administradores podem excluir categorias');
      return;
    }
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categoriaService.deletar(id).subscribe({
        next: () => {
          alert('Categoria excluída com sucesso!');
          this.carregarCategorias();
        },
        error: (error) => {
          console.error('Erro ao excluir:', error);
          alert('Erro ao excluir categoria');
        },
      });
    }
  }
}
