import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteDto } from '../models/favorite-dto.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private apiUrl = 'http://localhost:8080/favorite';

  constructor(private http: HttpClient) {}

  addFavorito(usuarioId: number, sitioId: number): Observable<any> {
    const dto: FavoriteDto = { usuario_id: usuarioId, sitio_id: sitioId };
    return this.http.post<any>(`${this.apiUrl}/add-favorite`, dto);
  }

  removeFavorito(usuarioId: number, sitioId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${usuarioId}/${sitioId}`);
  }

  comprobarFavorito(usuarioId: number, sitioId: number): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/comprobar-favorito/?usuarioid=${usuarioId}&sitioid=${sitioId}`
    );
  }
}
