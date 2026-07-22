import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VeiculoRequest } from '../models/veiculo.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class VeiculoService {

  constructor(private http: HttpClient) {}

  listar(page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get(`${environment.apiUrl}/veiculos`, { params });
  }

  buscarPorId(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/veiculos/${id}`);
  }

  criar(veiculo: VeiculoRequest): Observable<any> {
    return this.http.post(`${environment.apiUrl}/veiculos`, veiculo);
  }

  atualizar(id: number, veiculo: VeiculoRequest): Observable<any> {
    return this.http.put(`${environment.apiUrl}/veiculos/editar/${id}`, veiculo);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/veiculos/${id}`);
  }
}