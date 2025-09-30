import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthModalService {
  isOpen = false;
  isLoginMode = true;

  open(mode: 'login' | 'register') {
    this.isOpen = true;
    this.isLoginMode = mode === 'login';
  }

  close() {
    this.isOpen = false;
  }
}
