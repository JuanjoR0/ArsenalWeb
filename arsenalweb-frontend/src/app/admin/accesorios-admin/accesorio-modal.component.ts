import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Accesorio } from '../../services/accesorios.service';

@Component({
  selector: 'app-accesorio-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accesorio-modal.component.html',
  styleUrl: './accesorio-modal.component.scss'
})
export class AccesorioModalComponent {
  @Input() visible = false;
  @Input() modo: 'crear' | 'editar' | 'eliminar' = 'crear';
  @Input() accesorio: Partial<Accesorio> = {};
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Accesorio>();
  @Output() confirmarEliminar = new EventEmitter<void>();

  onGuardar(): void {
    this.guardar.emit(this.accesorio as Accesorio);
  }

  onEliminar(): void {
    this.confirmarEliminar.emit();
  }

  onCerrar(): void {
    this.cerrar.emit();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.accesorio.imagen = reader.result as string;
    reader.readAsDataURL(file);
  }
}
