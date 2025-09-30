import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthModalService } from '../auth-modal/auth-modal.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  constructor(
    private modalService: AuthModalService,
    public authService: AuthService
  ) {}

  openAuth(mode: 'login' | 'register') {
    this.modalService.open(mode);
  }

  logout() {
    this.authService.logout();
  }
}
