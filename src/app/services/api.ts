import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
}

@Injectable({
  providedIn: 'root' // Isso registra o serviço globalmente
})
export class ApiService {
  private apiUrl = 'https://your-api.com/api/produtos'; // Substitua pela sua API

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }
}
