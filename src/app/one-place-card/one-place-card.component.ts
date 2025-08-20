import { Component, Input } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service'; // importa el servicio
import { Data, Router, RouterModule } from '@angular/router';
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

  toggleFavorito(sitio: any) {
  let usuario: any = localStorage.getItem('usuario');
  if (usuario) {
    usuario = JSON.parse(usuario);
  } else {
    console.error('No hay usuario logueado');
    return;
  }

  if (sitio.esFavorito) {
    this.favoritosService.removeFavorito(usuario.id, sitio.id).subscribe(() => {
      sitio.esFavorito = false;
    });
  } else {
    this.favoritosService.addFavorito(usuario.id, sitio.id).subscribe(() => {
      sitio.esFavorito = true;
    });
  }
}


    comprobarFavorito(idusuario: number, idsitio: number) {
    this.favoritosService.comprobarFavorito(idusuario, idsitio)
      .subscribe((res: boolean) => {
        this.data.esFavorito = !!res; 
      });
}
}


