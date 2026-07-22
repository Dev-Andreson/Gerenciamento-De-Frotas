import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) {}

  listar(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/marcas`);
  }

  criar(marca: { nome: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/marca`, marca);
  }

  atualizar(id: number, marca: { nome: string }): Observable<any> {
    return this.http.put(`${environment.apiUrl}/marca/${id}`, marca);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/marca/${id}`);
  }
}