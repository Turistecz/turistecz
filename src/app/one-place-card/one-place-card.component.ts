import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EnumServiciosAdaptabilidad } from '../place-card-list/EnumServiciosAdaptabilidad';

@Component({
  selector: 'app-one-place-card',
  standalone: true,
  templateUrl: './one-place-card.component.html',
  styleUrls: ['./one-place-card.component.css'],
  imports: [RouterModule, CommonModule]
})
export class OnePlaceCardComponent {

  @Input() data!: {
    id: number;
    nombre: string;
    url: string;
    esFavorito?: boolean;

    rampas?: EnumServiciosAdaptabilidad;
    ascensores?: EnumServiciosAdaptabilidad;
    puertas_automaticas?: EnumServiciosAdaptabilidad;
    escaleras_mecanicas?: EnumServiciosAdaptabilidad;
    servicios_adaptados?: EnumServiciosAdaptabilidad;
    parking_adaptado?: EnumServiciosAdaptabilidad;
    mostrador_adaptado?: EnumServiciosAdaptabilidad;
    sin_barreras_arquitectonicas?: EnumServiciosAdaptabilidad;
    braille?: EnumServiciosAdaptabilidad;
    interprete_lengua_signos?: EnumServiciosAdaptabilidad;
    videos_subtitulos?: EnumServiciosAdaptabilidad;
    ayudas_visuales?: EnumServiciosAdaptabilidad;
    sala_lactancia?: EnumServiciosAdaptabilidad;
    cambiador?: EnumServiciosAdaptabilidad;
    bancos?: EnumServiciosAdaptabilidad;
    visitas_grupales?: EnumServiciosAdaptabilidad;
    ayuda_movilidad?: EnumServiciosAdaptabilidad;
    lenguaje_simple?: EnumServiciosAdaptabilidad;
    acceso_perros_guias?: EnumServiciosAdaptabilidad;
    acceso_perros_asistencia?: EnumServiciosAdaptabilidad;
    guias_turisticos_multiidioma?: EnumServiciosAdaptabilidad;
    elementos_audiovisuales_multiidioma?: EnumServiciosAdaptabilidad;
    documentacion_multiidioma?: EnumServiciosAdaptabilidad;
  };

  @Output() favoritoEliminado: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private favoritosService: FavoritosService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.data.esFavorito === undefined) {
      this.data.esFavorito = false;
    }

    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      const usuario = JSON.parse(usuarioStr);
      this.comprobarFavorito(Number(usuario.id), Number(this.data.id));
    } else {
      console.warn('⚠️ No hay usuario logueado, no se comprobarán favoritos');
    }
  }

  toggleFavorito(sitio: any) {
    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) {
      if (confirm('⚠️ Debes iniciar sesión para añadir favoritos.\n\n¿Quieres ir a la página de login ahora?')) {
        this.router.navigate(['/login']);
      }
      return;
    }

    const usuario = JSON.parse(usuarioStr);

    if (sitio.esFavorito) {
      this.favoritosService.removeFavorito(Number(usuario.id), Number(sitio.id))
        .subscribe({
          next: () => {
            sitio.esFavorito = false;
            console.log("🗑️ Eliminado de favoritos");
            this.favoritoEliminado.emit(sitio.id);
          },
          error: err => {
            console.error("❌ Error al eliminar de favoritos", err);
            alert("Error al eliminar de favoritos");
          }
        });
    } else {
      this.favoritosService.addFavorito(Number(usuario.id), Number(sitio.id))
        .subscribe({
          next: (response) => {
            sitio.esFavorito = true;
            console.log("✅ Añadido a favoritos");
          },
          error: err => {
            console.error("❌ Error al añadir a favoritos", err);
            alert("Error al añadir a favoritos");
          }
        });
    }
  }
  
  comprobarFavorito(usuarioId: number, sitioId: number) {
    this.favoritosService.comprobarFavorito(usuarioId, sitioId)
      .subscribe({
        next: (res: boolean) => {
          this.data.esFavorito = !!res;
        },
        error: (err) => {
          console.error("⚠️ Error comprobando favorito:", err);
          this.data.esFavorito = false;
        }
      });
  }

  // -------------------------------------------
  // NUEVO: Iconos de accesibilidad
  // -------------------------------------------
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
    return this.serviciosMap.filter(servicio =>
      this.data[servicio.key as keyof typeof this.data] === EnumServiciosAdaptabilidad.si
    );
  }
}
