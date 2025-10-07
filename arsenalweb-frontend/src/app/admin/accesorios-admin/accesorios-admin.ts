import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AccesoriosService } from '../../services/accesorios.service'; 

@Component({
  selector: 'app-accesorios-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accesorios-admin.html',
  styleUrl: './accesorios-admin.scss'
})
export class AccesoriosAdminComponent implements OnInit {
  accesorios: any[] = [];
  searchTerm: string = '';

  constructor(private accesoriosService: AccesoriosService) {}

  ngOnInit(): void {
    this.cargarAccesorios();
  }

  /**
   * Carga todos los accesorios con paginación básica
   */
  cargarAccesorios(): void {
    this.accesoriosService.getAccesorios(0, 50).subscribe({
      next: (data: any) => {
        this.accesorios = data.content || data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar accesorios:', err.message);
      }
    });
  }

  /**
   * Busca accesorios por nombre
   */
  buscarAccesorios(): void {
    if (this.searchTerm.trim().length === 0) {
      this.cargarAccesorios();
      return;
    }

    this.accesoriosService.buscarAccesorios(this.searchTerm).subscribe({
      next: (data: any) => {
        this.accesorios = data.content || data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al buscar accesorios:', err.message);
      }
    });
  }

  /**
   * Crea un nuevo accesorio
   */
  crearAccesorio(): void {
    alert('Funcionalidad para crear accesorio próximamente.');
  }

  /**
   * Edita un accesorio existente
   */
  editarAccesorio(id: number): void {
    alert('Editar accesorio con ID: ' + id);
  }

  /**
   * Elimina un accesorio
   */
  eliminarAccesorio(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este accesorio?')) {
      this.accesoriosService.deleteAccesorio(id).subscribe({
        next: () => {
          this.accesorios = this.accesorios.filter((a) => a.id !== id);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error al eliminar accesorio:', err.message);
        }
      });
    }
  }
}
