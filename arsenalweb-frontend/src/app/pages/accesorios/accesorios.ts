import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccesoriosService, Accesorio, AccesorioPage } from '../../services/accesorios.service';




@Component({
  selector: 'app-accesorios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accesorios.html',
  styleUrl: './accesorios.scss'
})
export class AccesoriosComponent implements OnInit {
  accesorios: Accesorio[] = [];
  paginaActual = 0;
  totalPaginas = 0;
  itemsPorPagina = 12;
  searchTerm = '';
  searchTipo = '';

  constructor(private accesoriosService: AccesoriosService) {}

  ngOnInit(): void {
    this.cargarAccesorios();
  }

  cargarAccesorios() {
    this.accesoriosService
      .getAccesorios(this.paginaActual, this.itemsPorPagina, this.searchTerm, this.searchTipo)
      .subscribe((data: AccesorioPage) => {
        console.log('Respuesta backend accesorios:', data);
        this.accesorios = data.content;
        this.totalPaginas = data.totalPages;
      });
  }

  cambiarPagina(p: number) {
    this.paginaActual = p;
    this.cargarAccesorios();
  }

  buscar() {
    this.paginaActual = 0;
    this.cargarAccesorios();
  }
}
