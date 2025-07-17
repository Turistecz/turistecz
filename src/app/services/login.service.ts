// src/app/login.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
    
  private usuario: any = null;

  constructor() {
    const guardado = localStorage.getItem('usuario');
    if (guardado) {
      this.usuario = JSON.parse(guardado);
    }
  }

  setUsuario(usuario: any): void {
    this.usuario = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuario(): string {
    return this.usuario?.nombre || '';
  }

  estaLogueado(): boolean {
    return !!this.usuario;
  }
}
