import { Component, OnInit } from '@angular/core';
import { FavoritosService, Sitio } from '../services/favoritos.service';
import { OnePlaceCardComponent } from '../one-place-card/one-place-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule, OnePlaceCardComponent],
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  favoritos: Sitio[] = [];
  usuario: any;

  constructor(private favoritosService: FavoritosService) {}

  ngOnInit(): void {
    const usuarioLS = localStorage.getItem('usuario');
    if (!usuarioLS) return;

    this.usuario = JSON.parse(usuarioLS);
    this.cargarFavoritos();
  }

  cargarFavoritos(): void {
    this.favoritosService.getMisFavoritos(this.usuario.id).subscribe({
      next: favoritos => {
        this.favoritos = favoritos.map(fav => ({
          ...fav,
          esFavorito: true,
          url: fav.imagenes?.[0]?.url || '/public/images/images_sitios/default.jpg'
        }));
      },
      error: err => console.error('Error cargando favoritos:', err)
    });
  }
}
