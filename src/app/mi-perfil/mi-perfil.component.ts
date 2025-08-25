import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../services/favoritos.service';
import { LoginService } from '../services/login.service';
import { OnePlaceCardComponent } from '../one-place-card/one-place-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule, OnePlaceCardComponent],
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  favoritos: any[] = [];
  usuario: any;

  constructor(
    private loginService: LoginService,
    private favoritosService: FavoritosService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const usuarioLS = localStorage.getItem('usuario');
    if (usuarioLS) {
      this.usuario = JSON.parse(usuarioLS);
    } else {
      console.error('No hay usuario logueado');
      return;
    }

    this.cargarFavoritosConImagen();
  }

  async cargarFavoritosConImagen():Promise<void> {
    // forkJoin combina varias llamadas HTTP en un solo Observable
    forkJoin({
      favoritosData: this.favoritosService.getMisFavoritos(this.usuario.id),
      sitiosConImagenes: this.http.get<any[]>('http://localhost:8080/api/sitios')
    }).subscribe({
      next: ({ favoritosData, sitiosConImagenes }) => {
        this.favoritos = favoritosData.map(sitio => {
          // Buscamos la imagen que coincida con el sitio
          const sitioImagen = sitiosConImagenes.find(s => s.id === sitio.id);
          const urlImagen = sitioImagen?.imagenes?.length
            ? `${sitioImagen.imagenes[0].url}`
           : '/public/images/images_sitios/default.jpg';
          return {
            id: sitio.id,
            nombre: sitio.nombre,
            url: urlImagen,
            esFavorito: true
          };
        });
      },
      error: (err) => console.error('Error al cargar favoritos o imágenes:', err)
    });
  }
  
  
}
