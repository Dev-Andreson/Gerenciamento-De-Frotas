import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca.model';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Listar todas as marcas
  listar(): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.apiUrl}/marcas`);
  }

  // Buscar marca por ID
  buscarPorId(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.apiUrl}/marcas/${id}`);
  }

  // Buscar marca por nome
  buscarPorNome(nome: string): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.apiUrl}/marca/?nome=${nome}`);
  }

  // Criar marca
  criar(marca: { nome: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/marca`, marca);
  }

  // Atualizar marca
  atualizar(id: number, marca: { nome: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/marca/${id}`, marca);
  }

  // Deletar marca
  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/marca/${id}`);
  }
}