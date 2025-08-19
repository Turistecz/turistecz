import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private apiUrl = 'http://localhost:8080/favorite'; 

  constructor(private http: HttpClient) {}

  getFavoritos(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/add-favorite`);
  }

  addFavorito(usuarioId: number, sitioId: number): Observable<any> {
    console.log(usuarioId);
    console.log(sitioId);
    // tu backend espera un objeto Favoritos en el body
    return this.http.post<{usuario: number, sitio: number}>(`${this.apiUrl}/add-favorite`, {
      usuario_id: usuarioId ,
      sitio_id: sitioId
    });
  }

  removeFavorito(favoritoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${favoritoId}`);
  }
}
