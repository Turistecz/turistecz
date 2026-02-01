import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoritosService, Sitio } from '../services/favoritos.service';
import { LoginService } from '../services/login.service';
import { OnePlaceCardComponent } from '../one-place-card/one-place-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, forkJoin } from 'rxjs';
import { CustomRouteComponent } from "../custom-route/custom-route.component";
import { CalendarComponent } from "../calendar/calendar.component";
import { Category, CleanFilter, FilterItem } from '../models/filter.model';
import { categories } from '../models/filter.data';
import { SaveFilterComponent } from "../save-filter/save-filter.component";
import { FilterService } from '../services/filter.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule, OnePlaceCardComponent, CalendarComponent, CustomRouteComponent, SaveFilterComponent],
  providers: [FilterService],
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  favoritos: Sitio[] = [];
  usuario: any;

  categories: Category[] = categories;

  draftFilter!: CleanFilter;
  userFavFilter!: CleanFilter;

  categoriesSites: string[] = [
    'Museos/Exposiciones',
    'Monumentos/Esculturas',
    'Zonas verdes',
    'Arquitectura',
    'Arte mudéjar',
    'Arte romano',
  ];

  // Palabras clave asociadas a cada categoria
  categorySitesKeywords: { [key: string]: string[] } = {
    'Museos/Exposiciones': [
      'museo',  'museum', 'lonja',
      'caixaforum', 'infanta', 'historias', 'acuario'
    ],
    'Monumentos/Esculturas': [
      'puerta', 'estatua', 'monumento', 'murallas',
      'escultura'
    ],
    'Zonas verdes': [
      'parque', 'canal'
    ],
    'Arquitectura': [
      'basilica', 'iglesia', 'palacio', 'casa',
      'catedral', 'puente', 'zuda', 'mercado'
    ],
    'Arte mudéjar': [
      'aljaferia', 'la seo', 'san pablo', 'magdalena'
    ],
    'Arte romano':[
      'murallas', 'caesaraugusta',
    ]
  };

  constructor(
    private loginService: LoginService,
    private favoritosService: FavoritosService,
    private http: HttpClient, private filterService: FilterService
  ) {}

  async ngOnInit(): Promise<void> {
    const usuarioLS = localStorage.getItem('usuario');
    if (usuarioLS) {
      this.usuario = JSON.parse(usuarioLS);
    } else {
      console.error('No hay usuario logueado');
      return;
    }

    this.cargarFavoritosConImagen();
    await this.cargarFiltroUsuario();

    const chatbotTab = document.getElementById('v-pills-chatbot-tab');

    chatbotTab?.addEventListener('shown.bs.tab', () => {
      const container = document.getElementById('landbot-container');
      if (container) {
        this.loginService.init(container);
      }
    });
  }
  
  async cargarFavoritosConImagen(): Promise<void> {
    forkJoin({
      favoritosData: this.favoritosService.getMisFavoritos(this.usuario.id),
      sitiosConImagenes: this.http.get<any[]>(`${environment.apiBaseUrl}/api/sitios`)
    }).subscribe({
      next: ({ favoritosData, sitiosConImagenes }) => {
        this.favoritos = favoritosData.map(sitio => {
          const sitioImagen = sitiosConImagenes.find(s => s.id === sitio.id);
          const urlImagen = sitioImagen?.imagenes?.length
            ? `${sitioImagen.imagenes[0].url}`
            : '/public/images/images_sitios/default.jpg';
          return {
            id: sitio.id,
            nombre: sitio.nombre,
            url: urlImagen,
            esFavorito: true,
            rampas: sitioImagen?.rampas,
            ascensores: sitioImagen?.ascensores,
            puertas_automaticas: sitioImagen?.puertas_automaticas,
            escaleras_mecanicas: sitioImagen?.escaleras_mecanicas,
            servicios_adaptados: sitioImagen?.servicios_adaptados,
            sala_lactancia: sitioImagen?.sala_lactancia,
            cambiador: sitioImagen?.cambiador,
            parking_adaptado: sitioImagen?.parking_adaptado,
            bancos: sitioImagen?.bancos,
            mostrador_adaptado: sitioImagen?.mostrador_adaptado,
            sin_barreras_arquitectonicas: sitioImagen?.sin_barreras_arquitectonicas,
            braille: sitioImagen?.braille,
            interprete_lengua_signos: sitioImagen?.interprete_lengua_signos,
            videos_subtitulos: sitioImagen?.videos_subtitulos,
            ayudas_visuales: sitioImagen?.ayudas_visuales,
            guias_turisticos_multiidioma: sitioImagen?.guias_turisticos_multiidioma,
            elementos_audiovisuales_multiidioma: sitioImagen?.elementos_audiovisuales_multiidioma,
            documentacion_multiidioma: sitioImagen?.documentacion_multiidioma,
            visitas_grupales: sitioImagen?.visitas_grupales,
            ayuda_movilidad: sitioImagen?.ayuda_movilidad,
            lenguaje_simple: sitioImagen?.lenguaje_simple,
            acceso_perros_guias: sitioImagen?.acceso_perros_guias,
            acceso_perros_asistencia: sitioImagen?.acceso_perros_asistencia
          };
        });
      },
      error: (err) => console.error('Error al cargar favoritos o imágenes:', err)
    });
  }

  onFavoritoEliminado(favoritoId: number) {
    this.favoritos = this.favoritos.filter(f => f.id !== favoritoId);
  }

  async cargarFiltroUsuario() {
  try {
    this.userFavFilter = await firstValueFrom(
    this.filterService.getFilter(this.usuario.id)
    );
    console.log('Filtro usuario:', this.userFavFilter);
  } catch (err) {
    console.error('Error cargando filtro', err);
  }
}

  onDraftChanged(filter: CleanFilter) {
    this.draftFilter = { ...filter }; // copia
  }

  guardarCambios() {
    if (!this.draftFilter) return;

    this.filterService.addNewFilter(this.draftFilter).subscribe({
      next: () => alert('Filtros actualizados correctamente'),
      error: () => alert('Error al guardar')
    });
  }

  ngOnDestroy(): void {
    this.loginService.destroyLandbot();
  }
}

