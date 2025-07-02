import { Component, Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { cardsHome } from '../place-card/place-card.model';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-one-place-card',
  imports: [RouterModule],
  templateUrl: './one-place-card.component.html',
  styleUrl: './one-place-card.component.css'
})
export class OnePlaceCardComponent {
  
  constructor(private http: HttpClient) {}
async ngOnInit(): Promise<void> {
  await this.loadImages();
}

cards: cardsHome[]=[];

  @Input() data!: {
    id: number;
    nombre: string;
    url: string;
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
}


