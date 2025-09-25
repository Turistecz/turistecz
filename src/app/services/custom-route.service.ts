import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RutaUsuario } from '../models/custom-route.model';

@Injectable({
  providedIn: 'root'
})

export class CustomRouteService {

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders | undefined {
  const token = localStorage.getItem('token');
  if (!token) return undefined;
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
}

  /* URL */
  private newRouteURL = 'http://localhost:8080/auth/nuevaRutaUsuario';
  private allRouteURL = 'http://localhost:8080/auth/rutasUsuario';

  postRutaUsuario(titulo: string, descripcion:string): Observable<any> {
    const enviar = { titulo_ruta: titulo, descripcion_ruta: descripcion, };
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.post<RutaUsuario>(this.newRouteURL, enviar, { headers })
      .pipe(catchError(this.handleError));
    } else {
      return this.http.post<RutaUsuario>(this.newRouteURL, enviar)
      .pipe(catchError(this.handleError));
    }
  }

  getTituloRutaUsuario(){
    return this.http.get(this.allRouteURL)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
      console.error('Ocurrió un error en RoutesService:', error);
      return throwError(() => new Error('Error al obtener datos. Inténtalo de nuevo más tarde.'));
    } 
}
