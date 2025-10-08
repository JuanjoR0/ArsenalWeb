import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Arma {
  id?: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  categoria?: { id: number; nombre?: string } | null; // 👈 acepta null ahora
  alcance?: number;
  danio?: number;
  precision?: number;
}



@Injectable({
  providedIn: 'root'
})
export class ArmasService {
  private apiUrl = 'http://localhost:8080/api/admin/armas';

  constructor(private http: HttpClient) {}

  // 🔹 Obtener lista de armas con paginación y búsqueda
  getArmas(page = 0, size = 10, search = ''): Observable<any> {
    let params = `?page=${page}&size=${size}`;
    if (search) {
      params += `&search=${encodeURIComponent(search)}`;
    }
    return this.http.get<any>(`${this.apiUrl}${params}`);
  }


  // 🔹 Crear arma
  crearArma(arma: Arma): Observable<Arma> {
    return this.http.post<Arma>(this.apiUrl, arma);
  }


  // 🔹 Actualizar arma
  actualizarArma(id: number, arma: Arma): Observable<Arma> {
    return this.http.put<Arma>(`${this.apiUrl}/${id}`, arma);
  }

  // 🔹 Eliminar arma
  deleteArma(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Obtener arma por ID (opcional)
  getArmaById(id: number): Observable<Arma> {
    return this.http.get<Arma>(`${this.apiUrl}/${id}`);
  }
}
