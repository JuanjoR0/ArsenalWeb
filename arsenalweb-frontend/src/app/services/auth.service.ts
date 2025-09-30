import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // URL del backend

  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  /**
   * Guardar token y datos del usuario en localStorage
   */
  saveAuthData(token: string, username: string, rol: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('rol', rol);
  }
  /**
   * Cerrar sesión
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('rol');
  }

  /**
   * Obtener token actual
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Saber si el usuario está autenticado
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Saber si el usuario es ADMIN
   */
  isAdmin(): boolean {
    return localStorage.getItem('rol') === 'ADMIN';
  }

  /**
   * Obtener username del usuario actual
   */
  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
