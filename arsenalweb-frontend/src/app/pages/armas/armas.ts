import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArmasPublicService, ArmaPublica } from '../../services/armas-public.service';

@Component({
  selector: 'app-armas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './armas.html',
  styleUrl: './armas.scss'
})
export class Armas implements OnInit {
  armas: ArmaPublica[] = [];
  paginaActual = 0;
  totalPaginas = 0;
  itemsPorPagina = 12;
  searchTerm = '';

  constructor(private armasService: ArmasPublicService) {}

  ngOnInit(): void {
    this.cargarArmas();
  }

  cargarArmas() {
    this.armasService.getArmas(this.paginaActual, this.itemsPorPagina, this.searchTerm)
      .subscribe(data => {
        console.log('Respuesta backend:', data); // 👈 DEBUG
        this.armas = data.content;
        this.totalPaginas = data.totalPages;
      });
  }

  cambiarPagina(p: number) {
    this.paginaActual = p;
    this.cargarArmas();
  }

  buscar() {
    console.log('Buscando:', this.searchTerm);
    this.paginaActual = 0;
    this.cargarArmas();
  }
}
