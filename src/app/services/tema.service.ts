import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private apiUrl = 'http://localhost/api/tema.php';
  private tema$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    console.log("antes de la llamada cargarTema");
    this.cargarTema();
  }
  
  cargarTema() {
    this.http.get<any>(this.apiUrl).subscribe(
      res => {
        if (res.status === 'success') {
          this.tema$.next(res.data);
          this.aplicarTema(res.data);
          console.log(res.data);
        }
      },
      err => console.error('Error cargando tema:', err)
    );
  }

  getTema() {
    return this.tema$.asObservable();
  }

  private aplicarTema(data: any) {
    const root = document.documentElement;

    // Paleta con valores por defecto
    const tema = {
      color_primary: data.color_primary || '#184591',
      color_secondary: data.color_secondary || '#2A8BEA',
      color_accent: data.color_accent || '#42D5A5',
      gradient_primary_start: data.gradient_primary_start || '#1f57b9',
      gradient_primary_end: data.gradient_primary_end || '#8adff5',
      gradient_home_start: data.gradient_home_start || '#8ee3f7',
      gradient_home_end: data.gradient_home_end || '#478ed1',
      bg_primary: data.bg_primary || '#ffffff',
      bg_secondary: data.bg_secondary || '#f0f0f0',
      text_primary: data.text_primary || '#03080a',
      text_secondary: data.text_secondary || '#495057',
      text_light: data.text_light || '#ffffff'
    };

    // Aplicar todas las variables CSS
    root.style.setProperty('--color-primary', this.hexToRgba(tema.color_primary));
    root.style.setProperty('--color-secondary', this.hexToRgba(tema.color_secondary));
    root.style.setProperty('--color-accent', this.hexToRgba(tema.color_accent));

    root.style.setProperty('--gradient-primary-start', this.hexToRgba(tema.gradient_primary_start));
    root.style.setProperty('--gradient-primary-end', this.hexToRgba(tema.gradient_primary_end));
    root.style.setProperty('--gradient-home-start', this.hexToRgba(tema.gradient_home_start));
    root.style.setProperty('--gradient-home-end', this.hexToRgba(tema.gradient_home_end));

    root.style.setProperty('--bg-primary', tema.bg_primary);
    root.style.setProperty('--bg-secondary', tema.bg_secondary);
    root.style.setProperty('--text-primary', tema.text_primary);
    root.style.setProperty('--text-secondary', tema.text_secondary);
    root.style.setProperty('--text-light', tema.text_light);
  }

  /**
   * Convierte un color HEX (#RRGGBB o #RRGGBBAA) a rgba(r,g,b,a)
   */
  private hexToRgba(hex: string): string {
    let r = 0, g = 0, b = 0, a = 1;

    if (typeof hex !== 'string' || !hex.startsWith('#')) {
      return 'rgba(0,0,0,1)';
    }

    // Quitar el #
    hex = hex.replace('#', '');

    if (hex.length === 8) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      a = parseInt(hex.slice(6, 8), 16) / 255;
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else {
      console.warn('Formato HEX no soportado:', hex);
      return 'rgba(0,0,0,1)';
    }

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
}