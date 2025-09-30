import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Armas } from './pages/armas/armas';
import { Accesorios } from './pages/accesorios/accesorios';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'armas', component: Armas },
  { path: 'accesorios', component: Accesorios },
  { path: 'contacto', component: Contacto },
];
