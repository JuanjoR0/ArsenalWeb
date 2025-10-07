import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArmasService, Arma } from '../../services/armas.service';
import { ArmaModalComponent } from './arma-modal.component';

@Component({
  selector: 'app-armas-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ArmaModalComponent],
  templateUrl: './armas-admin.html',
  styleUrl: './armas-admin.scss'
})
export class ArmasAdminComponent implements OnInit {

  armas: Arma[] = [];
  searchTerm = '';
  paginaActual = 0;
  totalPaginas = 0;
  itemsPorPagina = 10;

  // Propiedades del modal
  modalVisible = false;
  modalModo: 'crear' | 'editar' | 'eliminar' = 'crear';
  armaSeleccionada: Partial<Arma> = {};

  constructor(private armasService: ArmasService) {}

  ngOnInit(): void {
    this.cargarArmas();
  }

  cargarArmas(): void {
    this.armasService.getArmas(this.paginaActual, this.itemsPorPagina, this.searchTerm)
      .subscribe({
        next: (data: any) => {
          console.log('📦 Datos recibidos del backend:', data);

          // Si viene paginado (Spring Page)
          if (Array.isArray(data.content)) {
            this.armas = data.content;
            this.totalPaginas = data.totalPages || 1;
          } 
          // Si viene como lista simple
          else if (Array.isArray(data)) {
            this.armas = data;
            this.totalPaginas = 1;
          } 
          // Si viene vacío
          else {
            this.armas = [];
          }
        },
        error: (err: unknown) => {
          console.error('❌ Error cargando armas:', err);
          this.armas = [];
        }
      });
  }


  buscarArmas(): void {
    this.paginaActual = 0;
    this.cargarArmas();
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.cargarArmas();
  }

  // 🔹 Abrir modal de creación
  abrirModalCrear(): void {
    this.modalModo = 'crear';
    this.armaSeleccionada = { 
      nombre: '', 
      tipo: '', 
      descripcion: '', 
      precio: 0, 
      imagenUrl: '', 
      categoria: null, 
      alcance: 0, 
      danio: 0, 
      precision: 0 
    };
    this.modalVisible = true;
  }

  // 🔹 Abrir modal de edición
  abrirModalEditar(arma: Arma): void {
    this.modalModo = 'editar';
    this.armaSeleccionada = { ...arma };
    this.modalVisible = true;
  }

  // 🔹 Abrir modal de eliminación
  abrirModalEliminar(arma: Arma): void {
    this.modalModo = 'eliminar';
    this.armaSeleccionada = arma;
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }

  guardarArma(arma: Arma): void {
    console.log('🟢 Intentando guardar arma:', arma);

    // 🧩 Crear objeto en el formato exacto que espera el backend
    const armaDTO = {
      nombre: arma.nombre,
      tipo: arma.tipo || 'Desconocido', // 👈 añadido para evitar el error de tipo
      descripcion: arma.descripcion,
      precio: Number(arma.precio),
      stock: 10, // valor por defecto
      imagenUrl: arma.imagenUrl || '',
      categoria: arma.categoria ? { id: arma.categoria.id } : null,
      alcance: arma.alcance ?? 0,
      danio: arma.danio ?? 0,
      precision: arma.precision ?? 0
    };

    console.log('📦 Enviando a backend:', armaDTO);

    // Seleccionar el endpoint correcto según el modo
    const peticion =
      this.modalModo === 'crear'
        ? this.armasService.crearArma(armaDTO as Arma)
        : arma.id
          ? this.armasService.actualizarArma(arma.id, armaDTO as Arma)
          : null;

    if (!peticion) return;

    peticion.subscribe({
      next: () => {
        console.log('✅ Arma guardada correctamente');
        this.cerrarModal();
        this.cargarArmas();
      },
      error: (err) => {
        console.error('❌ Error al guardar arma:', err);
        alert('Hubo un error al guardar el arma. Ver consola para más detalles.');
      }
    });
  }



  eliminarArmaConfirmada(): void {
    if (this.armaSeleccionada?.id) {
      this.armasService.deleteArma(this.armaSeleccionada.id).subscribe({
        next: () => {
          this.cerrarModal();
          this.cargarArmas();
        },
        error: (err: unknown) => console.error('Error al eliminar arma:', err)
      });
    }
  }
}
