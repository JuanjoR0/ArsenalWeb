import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Accesorio {
  id?: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccesoriosService {
  private apiUrl = 'http://localhost:8080/api/admin/accesorios';

  constructor(private http: HttpClient) {}

  // ✅ Obtener accesorios (listado con paginación)
  getAccesorios(page: number = 0, size: number = 50): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  // ✅ Buscar accesorios por nombre
  buscarAccesorios(termino: string) {
    return this.http.get<Accesorio[]>(`${this.apiUrl}/buscar?termino=${termino}`);
  }

  // ✅ Crear nuevo accesorio
  crearAccesorio(accesorio: Accesorio): Observable<Accesorio> {
    return this.http.post<Accesorio>(this.apiUrl, accesorio);
  }

  // ✅ Actualizar accesorio existente
  actualizarAccesorio(id: number, accesorio: Accesorio): Observable<Accesorio> {
    return this.http.put<Accesorio>(`${this.apiUrl}/${id}`, accesorio);
  }

  // ✅ Eliminar accesorio
  deleteAccesorio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
