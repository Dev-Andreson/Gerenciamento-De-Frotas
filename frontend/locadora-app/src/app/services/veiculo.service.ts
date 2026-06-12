import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo, VeiculoRequest } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Listar todos os veículos (com paginação)
  listar(page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get(`${this.apiUrl}/veiculos`, { params });
  }

  // Buscar veículo por ID
  buscarPorId(id: number): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.apiUrl}/veiculos/${id}`);
  }

  // Buscar veículo por modelo
  buscarPorModelo(modelo: string): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.apiUrl}/veiculo/?modelo=${modelo}`);
  }

  // Listar veículos disponíveis
  listarDisponiveis(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.apiUrl}/veiculos/disponiveis`);
  }

  // Criar veículo
  criar(veiculo: VeiculoRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/veiculos`, veiculo);
  }

  // Atualizar veículo
  atualizar(id: number, veiculo: VeiculoRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/veiculos/editar/${id}`, veiculo);
  }

  // Deletar veículo
  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/veiculos/${id}`);
  }

  // Calcular receita potencial
  calcularReceita(): Observable<any> {
    return this.http.get(`${this.apiUrl}/veiculos/receita`);
  }
}