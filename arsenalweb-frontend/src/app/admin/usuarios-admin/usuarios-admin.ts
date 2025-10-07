import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService, Usuario, UsuarioPayload } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios-admin.html',
  styleUrls: ['./usuarios-admin.scss']
})
export class UsuariosAdminComponent implements OnInit {
  usuarios: Usuario[] = [];

  // 🔹 Variables para crear nuevo usuario
  nuevoUsuario: UsuarioPayload = { username: '', email: '', password: '', rol: 'USER' };
  creando = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => (this.usuarios = data),
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }

  crearUsuario(): void {
    if (!this.nuevoUsuario.username || !this.nuevoUsuario.email || !this.nuevoUsuario.password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    this.creando = true;
    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe({
      next: (usuarioCreado) => {
        this.usuarios.push(usuarioCreado);
        this.cancelarCreacion();
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
        alert('Error al crear usuario');
        this.creando = false;
      }
    });
  }

  cancelarCreacion(): void {
    this.nuevoUsuario = { username: '', email: '', password: '', rol: 'USER' };
    this.creando = false;
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe(() => {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
      });
    }
  }
  terminoBusqueda: string = '';

buscarUsuarios(): void {
  if (this.terminoBusqueda.trim() === '') {
    this.cargarUsuarios();
    return;
  }

  this.usuarioService.buscarUsuarios(this.terminoBusqueda).subscribe({
    next: (data) => (this.usuarios = data),
    error: (err) => console.error('Error al buscar usuarios:', err),
  });
}
}
