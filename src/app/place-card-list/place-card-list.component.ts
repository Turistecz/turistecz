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
        id: img.id
      }))
    );    

    this.sortedCards = this.cards;


  } catch (error) {
    console.error('Error al cargar monumentos:', error);
  }
}

  updatePlaces(filteredPlaces: cardsHome[]){
    console.log("eventos filtrados");
    console.log(filteredPlaces);
    this.sortedCards = filteredPlaces;
  }

};

