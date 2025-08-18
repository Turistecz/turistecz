import { Component, Input } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service'; // importa el servicio
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-one-place-card',
  standalone: true,
  templateUrl: './one-place-card.component.html',
  styleUrls: ['./one-place-card.component.css'],
  imports : [RouterModule]

})
export class OnePlaceCardComponent {

  constructor(private favoritosService: FavoritosService) {}

  @Input() data!: {
    id: number;
    nombre: string;
    url: string;
    esFavorito?: boolean; // propiedad extra para controlar estado
  };

  toggleFavorito(sitio: any) {
    if (sitio.esFavorito) {
      this.favoritosService.removeFavorito(sitio.id).subscribe(() => {
        sitio.esFavorito = false;
      });
    } else {
      this.favoritosService.addFavorito(sitio.id).subscribe(() => {
        sitio.esFavorito = true;
      });
    }
  }
}

