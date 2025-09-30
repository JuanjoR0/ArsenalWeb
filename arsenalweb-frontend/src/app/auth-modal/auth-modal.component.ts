import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthModalService } from './auth-modal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {
  username = '';
  email = '';
  password = '';
  errorMsg = '';

  constructor(public modalService: AuthModalService,
              private auth: AuthService) {}

  onSubmit() {
    if (this.modalService.isLoginMode) {
      this.auth.login(this.email, this.password).subscribe({
        next: res => {
          this.auth.saveAuthData(res.token, res.username, res.rol); // ✅ solo si ok
          this.errorMsg = '';
          this.modalService.close();
        },
        error: err => this.errorMsg = this.readError(err)
      });
    } else {
      this.auth.register(this.username, this.email, this.password).subscribe({
        next: res => {
          this.auth.saveAuthData(res.token, res.username, res.rol); // ✅ solo si ok
          this.errorMsg = '';
          this.modalService.close();
        },
        error: err => this.errorMsg = this.readError(err)
      });
    }
  }

  private readError(err: any): string {
    // Mensajes personalizados según el JSON del backend
    if (err.error?.error?.includes('ya existe')) {
      this.modalService.isLoginMode = true; // 👈 cambia automáticamente a login
      return 'Este email ya está registrado. Inicia sesión.';
    }
    if (err.error?.error?.includes('no existe')) {
      return 'El usuario no existe. Regístrate primero.';
    }
    if (err?.status === 401) return 'Credenciales incorrectas.';
    if (err?.status === 403) return 'Acceso denegado (403). Revisa seguridad del backend.';
    return err.error?.error || 'Error al autenticar.';
  }
}
