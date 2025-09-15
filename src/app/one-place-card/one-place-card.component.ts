import { Component, Input } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-one-place-card',
  standalone: true,
  templateUrl: './one-place-card.component.html',
  styleUrls: ['./one-place-card.component.css'],
  imports: [RouterModule, CommonModule]
})
export class OnePlaceCardComponent {

  @Input() data!: {
    id: number;
    nombre: string;
    url: string;
    esFavorito?: boolean;
  };

  constructor(
    private favoritosService: FavoritosService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // Inicializamos esFavorito si viene undefined
    if (this.data.esFavorito === undefined) {
      this.data.esFavorito = false;
    }

    // Comprobamos si el sitio es favorito solo si hay usuario logueado
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      const usuario = JSON.parse(usuarioStr);
      this.comprobarFavorito(Number(usuario.id), Number(this.data.id));
    } else {
      console.warn('⚠️ No hay usuario logueado, no se comprobarán favoritos.');
    }
  }

  toggleFavorito(sitio: any) {
    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) {
      const irLogin = confirm('⚠️ Debes iniciar sesión para añadir favoritos.\n\n¿Quieres ir a la página de login ahora?');
      if (irLogin) {
        this.router.navigate(['/login']);
      }
      return;
    }

    const usuario = JSON.parse(usuarioStr);

    if (sitio.esFavorito) {
      // 🔹 Quitar favorito
      console.log('Eliminando favorito', usuario.id, sitio.id);
      this.favoritosService.removeFavorito(Number(usuario.id), Number(sitio.id))
        .subscribe({
          next: () => {
            sitio.esFavorito = false;
            console.log("🗑️ Eliminado de favoritos");
          },
          error: err => {
            console.error("❌ Error al eliminar de favoritos", err);
            alert("Error al eliminar de favoritos");
          }
        });
    } else {
      // 🔹 Añadir favorito
      console.log('Añadiendo favorito', usuario.id, sitio.id);
      this.favoritosService.addFavorito(Number(usuario.id), Number(sitio.id))
        .subscribe({
          next: (response) => {
            console.log("📥 Respuesta backend:", response);
            sitio.esFavorito = true;
            console.log("✅ Añadido a favoritos");
          },
          error: err => {
            console.error("❌ Error al añadir a favoritos", err);
            alert("Error al añadir a favoritos");
          }
        });
    }
  }

  comprobarFavorito(usuarioId: number, sitioId: number) {
    this.favoritosService.comprobarFavorito(usuarioId, sitioId)
      .subscribe({
        next: (res: boolean) => {
          this.data.esFavorito = !!res;
        },
        error: (err) => {
          console.error("⚠️ Error comprobando favorito:", err);
          this.data.esFavorito = false;
        }
      });
  }
}
