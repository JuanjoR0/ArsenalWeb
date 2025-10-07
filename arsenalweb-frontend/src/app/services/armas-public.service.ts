import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ArmaPublica {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  categoriaId?: number;
  categoriaNombre?: string;
  alcance?: number;
  danio?: number;
  precision?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ArmasPublicService {
  private apiUrl = 'http://localhost:8080/api/armas';

  constructor(private http: HttpClient) {}

  getArmas(page = 0, size = 8, nombre?: string, categoria?: string): Observable<any> {
    const params: string[] = [];
    params.push(`page=${page}`);
    params.push(`size=${size}`);
    if (nombre) params.push(`nombre=${encodeURIComponent(nombre)}`);
    if (categoria) params.push(`categoria=${encodeURIComponent(categoria)}`);

    return this.http.get<any>(`${this.apiUrl}?${params.join('&')}`);
  }

  getArmaById(id: number): Observable<ArmaPublica> {
    return this.http.get<ArmaPublica>(`${this.apiUrl}/${id}`);
  }
}
