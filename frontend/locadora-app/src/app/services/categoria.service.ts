import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Listar todas as categorias
  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }

  // Buscar categoria por ID
  buscarPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/categoria/${id}`);
  }

  // Criar categoria
  criar(categoria: { descricao: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/categoria`, categoria);
  }

  // Atualizar categoria
  atualizar(id: number, categoria: { descricao: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/categoria/${id}`, categoria);
  }

  // Deletar categoria
  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categoria/${id}`);
  }
}