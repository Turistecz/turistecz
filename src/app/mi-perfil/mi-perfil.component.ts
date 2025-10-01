import { Component, OnInit } from '@angular/core';
import { FavoritosService, Sitio } from '../services/favoritos.service';
import { LoginService } from '../services/login.service';
import { OnePlaceCardComponent } from '../one-place-card/one-place-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Category, FilterItem } from '../models/filter.model';
import { categories } from '../models/filter.data';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule, OnePlaceCardComponent, FilterComponent],
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  favoritos: Sitio[] = [];
  usuario: any;

  categories: Category[] = categories;

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

  favFilters: FilterItem[] = [];
  userFavFilter: FilterItem = {
    features: [
      {id: false},
      {museosExposiciones: false},
      {monumentosEsculturas: false},
      {zonasVerdes: false},
      {arquitectura: false},
      {arteMudejar: false},
      {arteRomano: false},
      {rampas: false},
      {ascensores: false},
      {puertasAutomaticas: false},
      {escalerasMecanicas: false},
      {serviciosAdaptados: false},
      {parkingAdaptado: false},
      {mostradorAdaptado: false},
      {sinBarrerasArquitectonicas: false},
      {braille: false},
      {interpreteLenguaSignos: false},
      {videosSubtitulados: false},
      {ayudasVisuales: false},
      {bancos: false},
      {ayudaMovilidad: false},
      {lenguajeSimple: false},
      {accesoPerrosGuias: false},
      {accesoPerrosAsistencia: false},
      {salaLactancia: false},
      {cambiador: false},
      {visitasGrupales: false},
      {guiasTuristicosMultiidioma: false},
      {elementosAudiovisualesMultiidioma: false},
      {documentacionMultiidioma: false},
    ]
  }

  constructor(
    private loginService: LoginService,
    private favoritosService: FavoritosService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const usuarioLS = localStorage.getItem('usuario');
    if (usuarioLS) {
      this.usuario = JSON.parse(usuarioLS);
    } else {
      console.error('No hay usuario logueado');
      return;
    }

    this.cargarFavoritosConImagen();
  }

  async cargarFavoritosConImagen(): Promise<void> {
    forkJoin({
      favoritosData: this.favoritosService.getMisFavoritos(this.usuario.id),
      sitiosConImagenes: this.http.get<any[]>('http://localhost:8080/api/sitios')
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
            esFavorito: true
          };
        });
      },
      error: (err) => console.error('Error al cargar favoritos o imágenes:', err)
    });
  }

  /**
   * Elimina un favorito del array cuando se elimina desde la tarjeta
   */
  onFavoritoEliminado(favoritoId: number) {
    this.favoritos = this.favoritos.filter(f => f.id !== favoritoId);
  }



}
