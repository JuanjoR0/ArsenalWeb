import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { AccesoriosService, Accesorio } from '../../services/accesorios.service';

// 👇 IMPORTA el modal
import { AccesorioModalComponent } from './accesorio-modal.component';

@Component({
  selector: 'app-accesorios-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, AccesorioModalComponent],
  templateUrl: './accesorios-admin.html',
  styleUrl: './accesorios-admin.scss'
})
export class AccesoriosAdminComponent implements OnInit {
  accesorios: Accesorio[] = [];
  searchTerm = '';

  // 👇 Estado del modal
  modalVisible = false;
  modalModo: 'crear' | 'editar' | 'eliminar' = 'crear';
  accesorioSeleccionado: Partial<Accesorio> = {};

  constructor(private accesoriosService: AccesoriosService) {}

  ngOnInit(): void {
    this.cargarAccesorios();
  }

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

  buscarAccesorios(): void {
    const term = this.searchTerm.trim();
    if (!term) {
      this.cargarAccesorios();
      return;
    }
    this.accesoriosService.buscarAccesorios(term).subscribe({
      next: (data: any) => {
        this.accesorios = data.content || data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al buscar accesorios:', err.message);
      }
    });
  }

  // -------- MODAL: abrir/cerrar ----------
  abrirModalCrear(): void {
    this.modalModo = 'crear';
    this.accesorioSeleccionado = {
      nombre: '',
      tipo: '',
      descripcion: '',
      precio: 0,
      imagen: ''
    };
    this.modalVisible = true;
  }

  abrirModalEditar(acc: Accesorio): void {
    this.modalModo = 'editar';
    this.accesorioSeleccionado = { ...acc };
    this.modalVisible = true;
  }

  abrirModalEliminar(acc: Accesorio): void {
    this.modalModo = 'eliminar';
    this.accesorioSeleccionado = { ...acc };
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }

  // -------- Guardar (crear/editar) ----------
  guardarAccesorio(accesorio: Accesorio): void {
    if (this.modalModo === 'crear') {
      this.accesoriosService.crearAccesorio(accesorio).subscribe({
        next: () => {
          this.cerrarModal();
          this.cargarAccesorios();
        },
        error: (err) => {
          console.error('Error al crear accesorio:', err);
          alert('No se pudo crear el accesorio.');
        }
      });
    } else if (this.modalModo === 'editar' && this.accesorioSeleccionado.id != null) {
      this.accesoriosService.actualizarAccesorio(this.accesorioSeleccionado.id, accesorio).subscribe({
        next: () => {
          this.cerrarModal();
          this.cargarAccesorios();
        },
        error: (err) => {
          console.error('Error al actualizar accesorio:', err);
          alert('No se pudo actualizar el accesorio.');
        }
      });
    }
  }

  // -------- Eliminar (confirmación desde modal) ----------
  eliminarAccesorioConfirmada(): void {
    const id = this.accesorioSeleccionado.id;
    if (id == null) return;

    this.accesoriosService.deleteAccesorio(id).subscribe({
      next: () => {
        this.cerrarModal();
        this.cargarAccesorios();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al eliminar accesorio:', err.message);
        alert('No se pudo eliminar el accesorio.');
      }
    });
  }
}
