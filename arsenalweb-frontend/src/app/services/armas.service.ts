import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Arma {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  categoriaId: number;
  categoriaNombre: string; 
  alcance: number;
  danio: number;
  precision: number;
}

export interface PaginaArmas {
  content: Arma[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ArmasService {
  private apiUrl = 'http://localhost:8080/api/armas';

  constructor(private http: HttpClient) {}

  getArmas(page: number, size: number, nombre?: string, categoria?: string): Observable<PaginaArmas> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (nombre) params = params.set('nombre', nombre);
    if (categoria) params = params.set('categoria', categoria);

    return this.http.get<PaginaArmas>(this.apiUrl, { params });
  }
}
