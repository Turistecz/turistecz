import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sitio {
  id: number;
  nombre: string;
  url: string;
  esFavorito?: boolean;
  imagenes?: { url: string }[];
}

export interface Favoritos {
  id: number;
  usuario: any;
  sitio: Sitio;
}

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private apiUrl = 'http://localhost:8080/api/favoritos';

  constructor(private http: HttpClient) {}

  addFavorito(usuarioId: number, sitioId: number): Observable<Favoritos> {
    const dto = { usuarioId, sitioId };
    return this.http.post<Favoritos>(this.apiUrl, dto);
  }

  removeFavorito(usuarioId: number, sitioId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${usuarioId}/${sitioId}`);
  }

  comprobarFavorito(usuarioId: number, sitioId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/comprobar/${usuarioId}/${sitioId}`);
  }

  getMisFavoritos(usuarioId: number): Observable<Sitio[]> {
    return this.http.get<Sitio[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}
