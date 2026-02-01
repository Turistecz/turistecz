import { Component, HostListener, OnInit } from '@angular/core';
import { cardsHome } from './place-card.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { OnePlaceCardComponent } from '../one-place-card/one-place-card.component';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-place-card',
  imports: [CommonModule, RouterModule, OnePlaceCardComponent],
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css'] // corregido
})
export class PlaceCardComponent implements OnInit {

  constructor(private http: HttpClient) {}

  cards: cardsHome[] = [];
  visibleCount: number = 4; 

  async ngOnInit(): Promise<void> {
    await this.loadImages();
    this.actualizarVisibleCount();
    
  }

  async loadImages(): Promise<void> {
    try {
      // 🔹 Recuperar JWT de localStorage (lo guardas tras login)
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` // enviar token al backend
      });

      // 🔹 Llamada HTTP con headers
      const datos = await firstValueFrom(this.http.get<any[]>(
        `${environment.apiBaseUrl}/api/sitios`, { headers }
      ));

      // 🔹 Mapear imágenes de cada sitio
      this.cards = datos.flatMap(sitio =>
        sitio.imagenes.map((img: any) => ({
          nombre: img.nombre,
          url: img.url,
          id: img.id,
          rampas: sitio.rampas,
          ascensores: sitio.ascensores,
          puertas_automaticas: sitio.puertas_automaticas,
          escaleras_mecanicas: sitio.escaleras_mecanicas,
          servicios_adaptados: sitio.servicios_adaptados,
          sala_lactancia: sitio.sala_lactancia,
          cambiador: sitio.cambiador,
          parking_adaptado: sitio.parking_adaptado,
          bancos: sitio.bancos,
          mostrador_adaptado: sitio.mostrador_adaptado,
          sin_barreras_arquitectonicas: sitio.sin_barreras_arquitectonicas,
          braille: sitio.braille,
          interprete_lengua_signos: sitio.interprete_lengua_signos,
          videos_subtitulos: sitio.videos_subtitulos,
          ayudas_visuales: sitio.ayudas_visuales,
          guias_turisticos_multiidioma: sitio.guias_turisticos_multiidioma,
          elementos_audiovisuales_multiidioma: sitio.elementos_audiovisuales_multiidioma,
          documentacion_multiidioma: sitio.documentacion_multiidioma,
          visitas_grupales: sitio.visitas_grupales,
          ayuda_movilidad: sitio.ayuda_movilidad,
          lenguaje_simple: sitio.lenguaje_simple,
          acceso_perros_guias: sitio.acceso_perros_guias,
          acceso_perros_asistencia: sitio.acceso_perros_asistencia
        }))
      );
    } catch (error) {
      console.error('Error al cargar monumentos:', error);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.actualizarVisibleCount();
  }

  private actualizarVisibleCount() {
    const width = window.innerWidth;

    // aquí pones tus cortes: ejemplo
    if (width < 992) {          // móvil / tablet (por ejemplo < 992px)
      this.visibleCount = 3;
    } else {                    // escritorio
      this.visibleCount = 4;
    }
  }
}