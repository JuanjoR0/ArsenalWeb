import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  username: string;
  email: string;
  rol: 'USER' | 'ADMIN';
}

export interface UsuarioPayload extends Usuario {
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/admin/usuarios';

  constructor(private http: HttpClient) {}

  // 🔹 Obtener todos los usuarios (para admin)
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // 🔹 Buscar usuarios por nombre o email
  buscarUsuarios(term: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/buscar?term=${encodeURIComponent(term)}`);
  }

  // 🔹 Crear un nuevo usuario (usa el endpoint /crear)
  crearUsuario(usuario: UsuarioPayload): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/crear`, usuario);
  }

  // 🔹 Eliminar usuario por ID
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
