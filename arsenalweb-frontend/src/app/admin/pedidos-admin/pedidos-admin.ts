import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos-admin.html',
  styleUrls: ['./pedidos-admin.scss']
})
export class PedidosAdminComponent implements OnInit {

  pedidos: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // Aquí luego llamaremos al servicio admin para obtener los pedidos
    console.log("PedidosAdminComponent cargado");
  }

  cambiarEstado(pedidoId: number, nuevoEstado: string) {
    console.log(`Cambiar estado del pedido ${pedidoId} a ${nuevoEstado}`);
    // Aquí luego llamaremos al backend
  }
}
