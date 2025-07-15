import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { cardsHome, cardsHomeResponse } from '../place-card/place-card.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { OnePlaceCardComponent } from "../one-place-card/one-place-card.component";
import { MonumentServiceService } from '../services/monument-service.service';
import { MonumentItem } from '../models/monument.model';




@Component({
  selector: 'app-place-card-list',
  imports: [CommonModule, RouterModule, OnePlaceCardComponent],
  templateUrl: './place-card-list.component.html',
  styleUrl: './place-card-list.component.css'
})
export class PlaceCardListComponent {

 constructor(private http: HttpClient, private apiConnectService: MonumentServiceService) {}

cards: cardsHome[]=[];
monuments: MonumentItem[] = [];
monumentsNames: string[] = [];

async ngOnInit(): Promise<void> {
  await this.loadImages();
  this.apiConnectService.getMonumentsNames().subscribe(data => {
      this.monumentsNames = data.map(monumento => monumento.nombre);
      console.log(this.monumentsNames); 
    });  

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

    console.log(this.cards);


  } catch (error) {
    console.error('Error al cargar monumentos:', error);
  }
}


};

