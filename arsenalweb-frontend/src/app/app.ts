import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { AuthModalService } from './auth-modal/auth-modal.service';
import { CommonModule } from '@angular/common'; // 👈 necesario para *ngIf
import { FormsModule } from '@angular/forms';   // 👈 necesario para ngModel

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    AuthModalComponent, // 👈 ahora Angular reconocerá el modal
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(public authModalService: AuthModalService) {} // 👈 ya disponible en el template
}
