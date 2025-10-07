import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Armas } from './pages/armas/armas';
import { AccesoriosComponent } from './pages/accesorios/accesorios';
import { Contacto } from './pages/contacto/contacto';

import { AdminLayoutComponent } from './admin/admin-layout/admin-layout';
import { ArmasAdminComponent } from './admin/armas-admin/armas-admin';
import { AccesoriosAdminComponent } from './admin/accesorios-admin/accesorios-admin';
import { UsuariosAdminComponent } from './admin/usuarios-admin/usuarios-admin';
import { PedidosAdminComponent } from './admin/pedidos-admin/pedidos-admin';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'armas', component: Armas },
  { path: 'accesorios', component: AccesoriosComponent },
  { path: 'contacto', component: Contacto },

  // 🔹 Zona administración con sidebar y secciones CRUD
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'armas', component: ArmasAdminComponent },
      { path: 'accesorios', component: AccesoriosAdminComponent },
      { path: 'usuarios', component: UsuariosAdminComponent },
      { path: 'pedidos', component: PedidosAdminComponent },
      { path: '', redirectTo: 'armas', pathMatch: 'full' } // default
    ]
  }
];
