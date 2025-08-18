import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private apiUrl = 'http://localhost:8080/api/favoritos';

  constructor(private http: HttpClient) {}

  getFavoritos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addFavorito(sitioId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${sitioId}`, {});
  }

  removeFavorito(sitioId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${sitioId}`);
  }
}
