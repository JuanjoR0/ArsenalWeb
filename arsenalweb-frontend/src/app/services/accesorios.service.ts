import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Accesorio {
  id: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export interface AccesorioPage {
  content: Accesorio[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class AccesoriosService {
  private apiUrl = 'http://localhost:8080/api/accesorios';

  constructor(private http: HttpClient) {}

  getAccesorios(page: number, size: number, nombre: string = '', tipo: string = ''): Observable<AccesorioPage> {
    let url = `${this.apiUrl}?page=${page}&size=${size}`;
    if (nombre) url += `&nombre=${nombre}`;
    if (tipo) url += `&tipo=${tipo}`;
    return this.http.get<AccesorioPage>(url);
  }

  buscarAccesorios(nombre: string) {
    return this.http.get<any>(`${this.apiUrl}?nombre=${nombre}`);
  }

  deleteAccesorio(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
