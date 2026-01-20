import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EnumServiciosAdaptabilidad } from '../../place-card-list/EnumServiciosAdaptabilidad';

@Component({
  selector: 'app-accesibility-icons',
  imports: [CommonModule],
  templateUrl: './accesibility-icons.component.html',
  styleUrl: './accesibility-icons.component.css'
})
export class AccesibilityIconsComponent {
  @Input() data: any;

  serviciosMap = [
    { key: 'rampas', icon: 'fas fa-wheelchair', label: 'Rampas' },
    { key: 'ascensores', icon: 'fas fa-elevator', label: 'Ascensores' },
    { key: 'puertas_automaticas', icon: 'fas fa-door-open', label: 'Puertas automáticas' },
    { key: 'escaleras_mecanicas', icon: 'fas fa-stairs', label: 'Escaleras mecánicas' },
    { key: 'servicios_adaptados', icon: 'fas fa-toilet', label: 'Servicios adaptados' },
    { key: 'parking_adaptado', icon: 'fas fa-parking', label: 'Parking adaptado' },
    { key: 'mostrador_adaptado', icon: 'fas fa-user-tie', label: 'Mostrador adaptado' },
    { key: 'sin_barreras_arquitectonicas', icon: 'fas fa-universal-access', label: 'Sin barreras arquitectónicas' },
    { key: 'braille', icon: 'fas fa-braille', label: 'Braille' },
    { key: 'interprete_lengua_signos', icon: 'fas fa-sign-language', label: 'Lengua de signos' },
    { key: 'videos_subtitulos', icon: 'fas fa-closed-captioning', label: 'Vídeos subtitulados' },
    { key: 'ayudas_visuales', icon: 'fas fa-eye', label: 'Ayudas visuales' },
    { key: 'sala_lactancia', icon: 'fas fa-baby-carriage', label: 'Sala de lactancia' },
    { key: 'cambiador', icon: 'fas fa-baby', label: 'Cambiador' },
    { key: 'bancos', icon: 'fas fa-chair', label: 'Bancos' },
    { key: 'visitas_grupales', icon: 'fas fa-users', label: 'Visitas grupales' },
    { key: 'ayuda_movilidad', icon: 'fas fa-walking', label: 'Ayuda movilidad' },
    { key: 'lenguaje_simple', icon: 'fas fa-language', label: 'Lenguaje simple' },
    { key: 'acceso_perros_guias', icon: 'fas fa-dog', label: 'Acceso perros guía' },
    { key: 'acceso_perros_asistencia', icon: 'fas fa-paw', label: 'Acceso perros asistencia' },
    { key: 'guias_turisticos_multiidioma', icon: 'fas fa-globe', label: 'Guías turísticos' },
    { key: 'elementos_audiovisuales_multiidioma', icon: 'fas fa-video', label: 'Elementos audiovisuales' },
    { key: 'documentacion_multiidioma', icon: 'fas fa-book', label: 'Documentación' }
  ];

  getServiciosDisponibles() {
    if (!this.data) return [];
    return this.serviciosMap.filter(servicio =>
      this.data[servicio.key] === EnumServiciosAdaptabilidad.si
    );
  }
}
