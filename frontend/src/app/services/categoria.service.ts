import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) {}

  listar(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/categorias`);
  }

  criar(categoria: { descricao: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/categoria`, categoria);
  }

  atualizar(id: number, categoria: { descricao: string }): Observable<any> {
    return this.http.put(`${environment.apiUrl}/categoria/${id}`, categoria);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/categoria/${id}`);
  }
}