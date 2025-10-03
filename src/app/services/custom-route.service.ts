import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RutaUsuario, SitiosRutaUsuario } from '../models/custom-route.model';

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

  /* URLs RUTA */
  private newRouteURL = 'http://localhost:8080/auth/nuevaRutaUsuario';
  private allRouteURL = 'http://localhost:8080/auth/rutasUsuario?id_usuario=';
  // private lastRouteURL = 'http://localhost:8080/auth/ultimaRutaUsuario'

  /* URLs SITIO RUTA */
  private newSitioRutaURL = 'http://localhost:8080/auth/nuevoSitioRutaUsuario';

  /* RUTA */
  postRutaUsuario(usuario:number, titulo: string, descripcion:string): Observable<any> {
    const enviar = { 
      id_usuario: usuario,
      titulo_ruta: titulo, 
      descripcion_ruta: descripcion }; // SE TIENE QUE LLAMAR IGUAL QUE EN LA BBDD
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.post<RutaUsuario>(this.newRouteURL, enviar, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.post<RutaUsuario>(this.newRouteURL, enviar)
        .pipe(catchError(this.handleError));
    }
  }

  getRutasUsuario(id:number){
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.get<RutaUsuario>(this.allRouteURL + id, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.get<RutaUsuario>(this.allRouteURL + id)
        .pipe(catchError(this.handleError));
    }
  }

  /* SITIOS RUTA */
  postSitioRutaUsuario(ruta:number, sitio:number): Observable<any> {
    const enviar = { 
      id_ruta: ruta,
      id_sitio_favorito: sitio 
    }
    const headers = this.getAuthHeaders();
    if (headers) {
      console.log(enviar);
      return this.http.post<SitiosRutaUsuario>(this.newSitioRutaURL, enviar, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.post<SitiosRutaUsuario>(this.newSitioRutaURL, enviar)
        .pipe(catchError(this.handleError));
    }
  }

  /* CONTROL ERRORES */
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error en CustomRouteService:', error);
    return throwError(() => new Error('Error al obtener datos. Inténtalo de nuevo más tarde.'));
  } 

}
