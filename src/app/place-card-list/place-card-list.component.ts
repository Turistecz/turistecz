import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { cardsHome } from '../place-card/place-card.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { OnePlaceCardComponent } from "../one-place-card/one-place-card.component";
import { MonumentItem } from '../models/monument.model';
import { FilterComponent } from '../filter/filter.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { Category } from '../models/filter.model';
import { categories } from '../models/filter.data';



@Component({
  selector: 'app-place-card-list',
  standalone: true,
  imports: [CommonModule, RouterModule, OnePlaceCardComponent, FilterComponent, PaginationComponent],
  templateUrl: './place-card-list.component.html',
  styleUrl: './place-card-list.component.css'
})

export class PlaceCardListComponent {


  constructor(private http: HttpClient) {}
  categories: Category[] = categories;
  page: number = 1;
  pageSize: number = 21;
  
 
  noResultsPlaces: boolean = false;
  cards: cardsHome[]=[];
  sortedCards: cardsHome[]=[];

  monumentsNames: string[] = [];
  monumentos: MonumentItem[] = [];


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

    } catch (error) {
      console.error('Error al cargar monumentos:', error);
    }
  }

  updatePlaces(filteredPlaces: cardsHome[]) {
    this.sortedCards = filteredPlaces;
    this.page = 1; // Reiniciar a la primera página
  }

};

