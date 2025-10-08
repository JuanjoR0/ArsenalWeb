import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AccesorioPublico {
  id?: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export interface AccesorioPage {
  content: AccesorioPublico[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class AccesoriosPublicService {
  private apiUrl = 'http://localhost:8080/api/accesorios';

  constructor(private http: HttpClient) {}

  getAccesorios(page = 0, size = 12, nombre = '', tipo = ''): Observable<AccesorioPage> {
    let url = `${this.apiUrl}?page=${page}&size=${size}`;
    if (nombre) url += `&nombre=${encodeURIComponent(nombre)}`;
    if (tipo) url += `&tipo=${encodeURIComponent(tipo)}`;
    return this.http.get<AccesorioPage>(url);
  }

  getAccesorioById(id: number): Observable<AccesorioPublico> {
    return this.http.get<AccesorioPublico>(`${this.apiUrl}/${id}`);
  }
}
