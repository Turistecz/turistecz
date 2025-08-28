import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { cardsHome, cardsHomeResponse } from '../place-card/place-card.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { OnePlaceCardComponent } from "../one-place-card/one-place-card.component";
import { MonumentServiceService } from '../services/monument-service.service';
import { MonumentItem } from '../models/monument.model';
import { FilterComponent } from '../filter/filter.component';
import { PaginationComponent } from '../pagination/pagination.component';



@Component({
  selector: 'app-place-card-list',
  imports: [CommonModule, RouterModule, OnePlaceCardComponent, FilterComponent, PaginationComponent],
  templateUrl: './place-card-list.component.html',
  styleUrl: './place-card-list.component.css'
})

export class PlaceCardListComponent {

 constructor(private http: HttpClient, private apiConnectService: MonumentServiceService) {}
 
  page: number = 1;
  pageSize: number = 21;
  
 
noResultsPlaces: boolean = false;
cards: cardsHome[]=[];
sortedCards: cardsHome[]=[];

monumentsNames: string[] = [];
monumentos: MonumentItem[] = [];

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
  onPageChange(newPage: number) {
    this.page = newPage;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  get pagedPlaces(): cardsHome[] {
  const start = (this.page - 1) * this.pageSize;
  return this.sortedCards.slice(start, start + this.pageSize);
}


async ngOnInit(): Promise<void> {
  await this.loadImages();
  console.log('Monumentos cargados:', this.monumentos);
  console.log('Cards cargadas:', this.sortedCards);
}
 

 async loadImages(): Promise<void> {
  try {
      const datos = await firstValueFrom(this.http.get<MonumentItem[]>(
        'http://localhost:8080/api/sitios'
      ));

      // Guardamos todos los monumentos en el array
      this.monumentos = datos;

      // Creamos las cards a partir de todas las imágenes de todos los monumentos
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

      this.sortedCards = this.cards;

      // Log detallado
      console.log(`Se cargaron ${this.monumentos.length} monumentos`);
      this.monumentos.forEach((m, index) => {
        console.log(`Monumento ${index + 1}:`, m);
      });

    } catch (error) {
      console.error('Error al cargar monumentos:', error);
    }
  }

  updatePlaces(filteredPlaces: cardsHome[]) {
    this.sortedCards = filteredPlaces;
  }


  

  //funcion para comprobar que recibe datos accesibilidad
  // recibeDatos(sitiosFiltrados: MonumentItem[]){
  //   if(sitiosFiltrados.rampas){
  //     console.log(sitiosFiltrados.nombre)
  //   }
  // }
};
