import { Component, OnInit } from '@angular/core';
import { cardsHome } from './place-card.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { OnePlaceCardComponent } from '../one-place-card/one-place-card.component';

@Component({
  selector: 'app-place-card',
  imports: [CommonModule, RouterModule, OnePlaceCardComponent],
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css'] // corregido
})
export class PlaceCardComponent implements OnInit {

  constructor(private http: HttpClient) {}

  cards: cardsHome[] = [];

  async ngOnInit(): Promise<void> {
    await this.loadImages();
  }

  async loadImages(): Promise<void> {
    try {
      // 🔹 Recuperar JWT de localStorage (lo guardas tras login)
      const token = localStorage.getItem('token');
      console.log("JWT desde localStorage", token);
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` // enviar token al backend
      });

      // 🔹 Llamada HTTP con headers
      const datos = await firstValueFrom(this.http.get<any[]>(
        'http://localhost:8080/api/sitios', { headers }
      ));

      // 🔹 Mapear imágenes de cada sitio
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