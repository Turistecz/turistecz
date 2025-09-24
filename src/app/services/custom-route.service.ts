import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RutaUsuario } from '../models/custom-route.model';

@Injectable({
  providedIn: 'root'
})

export class CustomRouteService {

  constructor(private http: HttpClient) { }

  // private getAuthHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token');
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  // }

  private getAuthHeaders(): HttpHeaders | undefined {
  const token = localStorage.getItem('token');
  if (!token) return undefined;
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
}

  /* URL */
  private titleRouteURL = 'http://localhost:8080/auth/tituloRutaUsuario';

  postTituloRutaUsuario(titulo: string): Observable<any> {
    const enviar = { titulo_ruta: titulo };
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.post<RutaUsuario>(this.titleRouteURL, enviar, { headers })
      .pipe(catchError(this.handleError));
    } else {
      return this.http.post<RutaUsuario>(this.titleRouteURL, enviar)
      .pipe(catchError(this.handleError));
    }
  }

  private handleError(error: any): Observable<never> {
      console.error('Ocurrió un error en RoutesService:', error);
      return throwError(() => new Error('Error al obtener datos. Inténtalo de nuevo más tarde.'));
    } 
}
