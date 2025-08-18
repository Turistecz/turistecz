import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private usuarioSubject = new BehaviorSubject<any | null>(null);

  constructor() {
    const guardado = localStorage.getItem('usuario');
    if (guardado) {
      this.usuarioSubject.next(JSON.parse(guardado));
    }
  }

  setUsuario(usuario: any): void {
    this.usuarioSubject.next(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));
   
  }

  logout(): void {
    this.usuarioSubject.next(null);
    localStorage.removeItem('usuario');
  }

  getUsuario(): string {
    return this.usuarioSubject.value?.nombre || '';
  }

  estaLogueado(): boolean {
    return !!this.usuarioSubject.value;
  }

  // Esto permite a otros componentes suscribirse y reaccionar al cambio
  getUsuarioObservable() {
    return this.usuarioSubject.asObservable();
  }
  
}
