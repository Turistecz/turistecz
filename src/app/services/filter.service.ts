import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleanFilter, FilterItem, FilterUser } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private apiUrl = 'http://localhost:8080/api/filtrosUser';
  private filtroUrl = 'http://localhost:8080/api/filtros';

  constructor(private http: HttpClient) { }

  getFilters():Observable<FilterItem[]>  {
    return this.http.get<FilterItem[]>('http://localhost:8080/api/filtros');
  }

  addNewFilter(filter: CleanFilter) {
    return this.http.post<CleanFilter>(this.filtroUrl, filter);
  }

  removeFilter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.filtroUrl}/${id}`);
  }

  addFavorito(usuarioId: number, filtroId: number): Observable<FilterUser> {
    const dto = { usuarioId, filtroId };
    return this.http.post<FilterUser>(this.apiUrl, dto);
  }

  removeFavorito(usuarioId: number, filtroId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${usuarioId}/${filtroId}`);
  }

  comprobarFavorito(usuarioId: number, filtroId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/comprobar/${usuarioId}/${filtroId}`);
  }

  getUserFilters(usuarioId: number): Observable<FilterItem> {
    return this.http.get<FilterItem>(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}
