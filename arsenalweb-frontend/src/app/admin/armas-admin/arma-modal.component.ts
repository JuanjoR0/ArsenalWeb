import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Arma } from '../../services/armas.service';
import { Categoria, CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-arma-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './arma-modal.component.html',
  styleUrls: ['./arma-modal.component.scss']
})
export class ArmaModalComponent implements OnInit {
  @Input() visible = false;
  @Input() modo: 'crear' | 'editar' | 'eliminar' = 'crear';
  @Input() arma: Partial<Arma> = {};

  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Arma>();
  @Output() confirmarEliminar = new EventEmitter<void>();

  categorias: Categoria[] = [];
  imagenPreview: string | ArrayBuffer | null = null;

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: (err) => console.error('Error cargando categorías', err)
    });

    if (this.arma.imagenUrl) {
      this.imagenPreview = this.arma.imagenUrl;
    }
  }

  onCerrar(): void {
    this.cerrar.emit();
  }

  onGuardar(): void {
    this.guardar.emit(this.arma as Arma);
  }



  onEliminar(): void {
    this.confirmarEliminar.emit();
  }

  onImagenSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result;
        this.arma.imagenUrl = this.imagenPreview as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
