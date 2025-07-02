import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { cardsHome, cardsHomeResponse } from '../place-card/place-card.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-place-card-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './place-card-list.component.html',
  styleUrl: './place-card-list.component.css'
})
export class PlaceCardListComponent {
 constructor(private http: HttpClient) {}
async ngOnInit(): Promise<void> {
  await this.loadImages();
}

cards: cardsHome[]=[];


 async loadImages(): Promise<void> {
  try {
    const datos = await firstValueFrom(this.http.get<any[]>(
      'http://localhost:8080/api/sitios'
    ));

    // Recorremos cada sitio, y si tiene imágenes, las añadimos
    this.cards = datos.flatMap(sitio =>
      sitio.imagenes.map((img: any) => ({
        nombre: img.nombre,
        url: img.url
      }))
    );
    

    console.log(this.cards);
  } catch (error) {
    console.error('Error al cargar monumentos:', error);
  }
}

  };

