import { Component, Input } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service';
import { Router, RouterModule } from '@angular/router';
import { NgClass, CommonModule } from '@angular/common';

@Component({
  selector: 'app-one-place-card',
  standalone: true,
  templateUrl: './one-place-card.component.html',
  styleUrls: ['./one-place-card.component.css'],
  imports : [RouterModule, CommonModule]
})
export class OnePlaceCardComponent {

  constructor(
    private favoritosService: FavoritosService,
    private router: Router
  ) {}

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
      // 🔹 Confirmación: si no hay usuario logueado
      const irLogin = confirm('⚠️ Debes iniciar sesión para añadir favoritos.\n\n¿Quieres ir a la página de login ahora?');
      if (irLogin) {
        this.router.navigate(['/login']); // redirige al login
      }
      return;
    }

    // 🔹 Si está logueado: añadir/quitar favorito
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
      await this.comprobarFavorito(usuario.id, this.data.id);    
    } else {
      console.warn('⚠️ No hay usuario logueado, no se comprobarán favoritos.');
    }
  }
}
