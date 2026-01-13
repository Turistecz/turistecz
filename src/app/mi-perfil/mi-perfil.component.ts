import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoritosService, Sitio } from '../services/favoritos.service';
import { LoginService } from '../services/login.service';
import { OnePlaceCardComponent } from '../one-place-card/one-place-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { CustomRouteComponent } from "../custom-route/custom-route.component";
import { CalendarComponent } from "../calendar/calendar.component";

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule, OnePlaceCardComponent, CalendarComponent, CustomRouteComponent],
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  favoritos: Sitio[] = [];
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

    const chatbotTab = document.getElementById('v-pills-chatbot-tab');

    chatbotTab?.addEventListener('shown.bs.tab', () => {
      const container = document.getElementById('landbot-container');
      if (container) {
        this.loginService.init(container);
      }
    });
  }
  
  async cargarFavoritosConImagen(): Promise<void> {
    forkJoin({
      favoritosData: this.favoritosService.getMisFavoritos(this.usuario.id),
      sitiosConImagenes: this.http.get<any[]>('http://localhost:8080/api/sitios')
    }).subscribe({
      next: ({ favoritosData, sitiosConImagenes }) => {
        this.favoritos = favoritosData.map(sitio => {
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

  onFavoritoEliminado(favoritoId: number) {
    this.favoritos = this.favoritos.filter(f => f.id !== favoritoId);
  }

  
  ngOnDestroy(): void {
    this.loginService.destroyLandbot();
  }
}

