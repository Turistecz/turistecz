import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RutaUsuario, SitiosRutaUsuario } from '../models/custom-route.model';

@Injectable({
  providedIn: 'root'
})

export class CustomRouteService {

  constructor(private http: HttpClient) { }
  /* HEADER DEL TOKEN DEL USUARIO */
  private getAuthHeaders(): HttpHeaders | undefined {
  const token = localStorage.getItem('token');
  if (!token) return undefined;
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
}

  /* ----- URLs RUTA USUARIO ----- */
  private newRouteURL = 'http://localhost:8080/auth/nuevaRutaUsuario';
  private allRoutesURL = 'http://localhost:8080/auth/rutasUsuario?id_usuario=';

  /* ----- URLs SITIO RUTA USUARIO ----- */
  private newSitioRutaURL = 'http://localhost:8080/auth/nuevoSitioRutaUsuario';

  /* ----- MÉTODOS RUTA USUARIO ----- */
  postNuevaRutaUsuario(usuario:number, titulo: string, descripcion:string): Observable<any> {
    // IMPORTANTE: En los pares "clave:valor", la clave debe llamarse igual que los datos que recibe SpringBoot
    const enviarDatosRutaUsuario = { 
      id_usuario: usuario,
      titulo_ruta: titulo, 
      descripcion_ruta: descripcion 
    }; 
    // Headers del token del usuario
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.post<RutaUsuario>(this.newRouteURL, enviarDatosRutaUsuario, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.post<RutaUsuario>(this.newRouteURL, enviarDatosRutaUsuario)
        .pipe(catchError(this.handleError));
    }
  }

  getRutasUsuarioExistentes(id:number){
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.get<RutaUsuario>(this.allRoutesURL + id, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.get<RutaUsuario>(this.allRoutesURL + id)
        .pipe(catchError(this.handleError));
    }
  }

  /* ----- MÉTODOS SITIOS RUTA USUARIO ----- */
  postSitioRutaUsuario(ruta:number, sitio:number): Observable<any> {
    // IMPORTANTE: En los pares "clave:valor", la clave debe llamarse igual que los datos que recibe SpringBoot
    const enviarDatosSitiosRutaUsuario = { 
      id_ruta: ruta,
      id_sitio_favorito: sitio 
    }
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.post<SitiosRutaUsuario>(this.newSitioRutaURL, enviarDatosSitiosRutaUsuario, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.post<SitiosRutaUsuario>(this.newSitioRutaURL, enviarDatosSitiosRutaUsuario)
        .pipe(catchError(this.handleError));
    }
  }

  /* ----- MÉTODO CONTROL DE ERRORES ----- */
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error en CustomRouteService:', error);
    return throwError(() => new Error('Error al obtener datos. Inténtalo de nuevo más tarde.'));
  } 
}
