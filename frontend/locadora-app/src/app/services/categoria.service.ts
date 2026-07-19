import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  listar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias`);
  }

  criar(categoria: { descricao: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/categoria`, categoria);
  }

  atualizar(id: number, categoria: { descricao: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/categoria/${id}`, categoria);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categoria/${id}`);
  }
}