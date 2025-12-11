import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var Landbot: any;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private usuarioSubject = new BehaviorSubject<any | null>(null);
  private landbotWidget: any = null;
  private landbotScript: HTMLScriptElement | null = null;
  private scriptLoaded = false;

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
    this.destroyLandbot();
  }

  getUsuario(): string {
    return this.usuarioSubject.value?.nombre || '';
  }

  estaLogueado(): boolean {
    return !!this.usuarioSubject.value;
  }

  getUsuarioObservable() {
    return this.usuarioSubject.asObservable();
  }

  
 loadScript(): Promise<void> {
    return new Promise(resolve => {
      if (this.scriptLoaded) return resolve();

      const script = document.createElement('script');
      script.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs';
      script.type = 'module';
      script.async = true;

      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };

      document.body.appendChild(script);
    });
  }

  async init(container: HTMLElement): Promise<void> {
    await this.loadScript();

    if (!this.landbotWidget) {
      this.landbotWidget = new Landbot.Container({
        container: container,
        configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-3105920-Z876DCRA7X45MZUP/index.json',
        startVisible: true,
      });
    } else {
      this.landbotWidget.show();
    }
  }

  destroyLandbot(): void {
    if (this.landbotWidget?.destroy) {
      this.landbotWidget.destroy();
    }
    this.landbotWidget = null;
  }
}

