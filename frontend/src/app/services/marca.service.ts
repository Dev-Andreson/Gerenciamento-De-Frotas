import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  listar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/marcas`);
  }

  criar(marca: { nome: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/marca`, marca);
  }

  atualizar(id: number, marca: { nome: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/marca/${id}`, marca);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/marca/${id}`);
  }
}