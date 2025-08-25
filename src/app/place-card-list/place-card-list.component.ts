import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { cardsHome, cardsHomeResponse } from '../place-card/place-card.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { OnePlaceCardComponent } from "../one-place-card/one-place-card.component";
import { MonumentServiceService } from '../services/monument-service.service';
import { MonumentItem } from '../models/monument.model';
import { FilterComponent } from '../filter/filter.component';
import { AccesibilidadEnum } from './accesibilidadEnum';



@Component({
  selector: 'app-place-card-list',
  imports: [CommonModule, RouterModule, OnePlaceCardComponent, FilterComponent],
  templateUrl: './place-card-list.component.html',
  styleUrl: './place-card-list.component.css'
})

export class PlaceCardListComponent {

 constructor(private http: HttpClient, private apiConnectService: MonumentServiceService) {}

cards: cardsHome[]=[];
sortedCards: cardsHome[]=[];
monuments: MonumentItem[] = [];
monumentsNames: string[] = [];
// accesibilidad: Accesibilidad[]=[];

// categoriesAdaptability: string[] = [
//   'Rampas',
//   'Ascensores',
//   'Puertas automáticas',
//   'Escaleras mecánicas',
//   'Servicios adaptados',
//   'Sala de lactancia',
//   'Cambiador',
//   'Parking adaptado',
//   'Bancos/asientos',
//   'Mostrador adaptado',
//   'Sin barreras arquitectónicas',
//   'Braille',
//   'Intérprete de lengua de signos',
//   'Vídeos subtítulos',
//   'Ayudas visuales',
//   'Guías turísticos multiidioma',
//   'Elementos audiovisuales multiidioma',
//   'Documentacion multiidioma',
//   'Visitas grupales',
//   'Ayuda a la movilidad',
//   'Lenguaje simple',
//   'Acceso para perros guías',
//   'Acceso para perro de asistencia'

//   ];

categoriesSites: string[] = [
    'Museos/Exposiciones',
    'Monumentos/Esculturas',
    'Zonas verdes',
    'Arquitectura',
    'Arte mudéjar',
    'Arte romano',

  ];

  // categoriesAdaptability : AccesibilidadEnum[] =[]
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

async ngOnInit(): Promise<void> {
  await this.loadImages();

}

 async loadImages(): Promise<void> {
  try {
    const datos = await firstValueFrom(this.http.get<any[]>(
      'http://localhost:8080/api/sitios'
    ));

    // Recorremos cada sitio, y si tiene imágenes, las añadimos
    this.cards = datos.flatMap(sitio =>
      sitio.imagenes.map((img: any) => ({
        nombre: img.nombre,
        url: img.url,
        id: img.id,
        // rampas: img.rampas,
        // ascensores: img.ascensores,
        // puertas_automaticas: img.puertas_automaticas,
        // escaleras_mecanicas: img.escaleras_mecanicas,
        // servicios_adaptados: img.servicios_adaptados,
        // sala_lactancia: img.sala_lactancia,
        // cambiador: img.cambiador,
        // parking_adaptado: img.parking_adaptado,
        // bancos: img.bancos,
        // mostrador_adaptado: img.mostrador_adaptado,
        // sin_barreras_arquitectonicas: img.sin_barreras_arquitectonicas,
        // braille: img.braille,
        // interprete_lengua_signos: img.interprete_lengua_signos,
        // videos_subtitulos: img.videos_subtitulos,
        // ayudas_visuales: img.ayudas_visuales,
        // guias_turisticos_multiidioma: img.guias_turisticos_multiidioma,
        // elementos_audiovisuales_multiidioma: img.elementos_audiovisuales_multiidioma,
        // documentacion_multiidioma: img.documentacion_multiidioma,
        // visitas_grupales: img.visitas_grupales,
        // ayuda_movilidad: img.ayuda_movilidad,
        // lenguaje_simple: img.lenguaje_simple,
        // acceso_perros_guias: img.acceso_perros_guias,
        // acceso_perros_asistencia: img.acceso_perros_asistencia

      }))
    );    

    this.sortedCards = this.cards;
    console.log('Cards loaded:', this.sortedCards);


  } catch (error) {
    console.error('Error al cargar monumentos:', error);
  }
}

  updatePlaces(filteredPlaces: cardsHome[]){
    // console.log("eventos filtrados");
    // console.log(filteredPlaces);
    this.sortedCards = filteredPlaces;
  }

  //funcion para comprobar que recibe datos accesibilidad
  // recibeDatos(sitiosFiltrados: MonumentItem[]){
  //   if(sitiosFiltrados.rampas){
  //     console.log(sitiosFiltrados.nombre)
  //   }
  // }
};
