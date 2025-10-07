import { Component } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { HeaderComponent } from './header/header';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { AuthModalService } from './auth-modal/auth-modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    AuthModalComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(
    public authModalService: AuthModalService,
    private router: Router
  ) {}

  esAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}