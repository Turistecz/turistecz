import { Component, Input } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service'; // importa el servicio
import { Data, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-one-place-card',
  standalone: true,
  templateUrl: './one-place-card.component.html',
  styleUrls: ['./one-place-card.component.css'],
  imports : [RouterModule, CommonModule]

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

  if (!usuario) {
    alert('Debes estar registrado para poder aañadir a favoritos ⭐');
    return;
  }

  usuario = JSON.parse(usuario);

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

  async ngOnInit(): Promise<void> {
    let usuario: any = localStorage.getItem('usuario');
    if (usuario) {
      usuario = JSON.parse(usuario);
    } else {
      console.error('No hay usuario logueado');
      return;
    }
    await this.comprobarFavorito(usuario.id,this.data.id);    
  }

}


