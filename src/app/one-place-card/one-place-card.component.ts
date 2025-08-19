import { Component, Input } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service'; // importa el servicio
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-one-place-card',
  standalone: true,
  templateUrl: './one-place-card.component.html',
  styleUrls: ['./one-place-card.component.css'],
  imports : [RouterModule]

})
export class OnePlaceCardComponent {

  constructor(private favoritosService: FavoritosService, LoginService: LoginService) {}

  @Input() data!: {
    id: number;
    nombre: string;
    url: string;
    esFavorito?: boolean; // propiedad extra para controlar estado
  };

  toggleFavorito(usuario: any,sitio: any) {
    //const usuarioId = " ";
    if (sitio.esFavorito) {
      this.favoritosService.removeFavorito(sitio.id).subscribe(() => {
        sitio.esFavorito = false;
      });
    } else {
      this.favoritosService.addFavorito(usuario.id, sitio.id).subscribe(() => {
        
        sitio.esFavorito = true;
      });
    }
  }
}

