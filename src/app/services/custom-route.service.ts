import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CrearRuta, MostrarRuta, MostrarSitioRuta, SitioRutaSeleccionado } from '../models/custom-route.model';
import { environment } from '../../environments/environment';

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
  private newRouteURL = `${environment.apiBaseUrl}/auth/nuevaRutaUsuario`;
  private allRoutesURL = `${environment.apiBaseUrl}/auth/rutasUsuario?id_usuario=`;

  /* ----- URLs SITIO RUTA USUARIO ----- */
  private newSitioRutaURL = `${environment.apiBaseUrl}/auth/nuevoSitioRutaUsuario`;
  private allSitiosRutaURL = `${environment.apiBaseUrl}/auth/sitiosRutaUsuario?id_ruta=`;
  private deleteRutaURL = `${environment.apiBaseUrl}/auth/eliminarRutaUsuario?id_ruta=`;
  private editTituloRutaURL = `${environment.apiBaseUrl}/auth/editarTituloRutaUsuario`;
  private editDescripcionRutaURL = `${environment.apiBaseUrl}/auth/editarDescripcionRutaUsuario`;
  private deleteSitiosRutaURL = `${environment.apiBaseUrl}/auth/eliminarSitiosRuta?id=`;

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
      return this.http.post<CrearRuta>(this.newRouteURL, enviarDatosRutaUsuario, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.post<CrearRuta>(this.newRouteURL, enviarDatosRutaUsuario)
        .pipe(catchError(this.handleError));
    }
  }

  getRutasUsuarioExistentes(id:number){
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.get<MostrarRuta[]>(this.allRoutesURL + id, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.get<MostrarRuta[]>(this.allRoutesURL + id)
        .pipe(catchError(this.handleError));
    }
  }

  putTituloRutaUsuario(id_ruta:number, titulo:string){
    const enviarDatosRutaUsuario = { 
      id: id_ruta,
      titulo_ruta: titulo
    }; 
    // Headers del token del usuario
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.put(this.editTituloRutaURL, enviarDatosRutaUsuario, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.put(this.editTituloRutaURL, enviarDatosRutaUsuario)
        .pipe(catchError(this.handleError));
    }
  }

  putDescripcionRutaUsuario(id_ruta:number, descripcion:string){
    const enviarDatosRutaUsuario = { 
      id: id_ruta,
      descripcion_ruta: descripcion
    };
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.put(this.editDescripcionRutaURL, enviarDatosRutaUsuario, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.put(this.editDescripcionRutaURL, enviarDatosRutaUsuario)
        .pipe(catchError(this.handleError));
    }
  }

  deleteRutaUsuario(id_ruta:number){
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.delete(this.deleteRutaURL + id_ruta, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.delete(this.deleteRutaURL + id_ruta)
        .pipe(catchError(this.handleError));
    }
  }

  /* ----- MÉTODOS SITIOS RUTA USUARIO ----- */
  postSitioRutaUsuario(ruta:number, sitio:number, orden:number): Observable<any> {
    // IMPORTANTE: En los pares "clave:valor", la clave debe llamarse igual que los datos que recibe SpringBoot
    const enviarDatosSitiosRutaUsuario = { 
      id_ruta: ruta,
      id_sitio_favorito: sitio,
      orden: orden
    }
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.post<SitioRutaSeleccionado>(this.newSitioRutaURL, enviarDatosSitiosRutaUsuario, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.post<SitioRutaSeleccionado>(this.newSitioRutaURL, enviarDatosSitiosRutaUsuario)
        .pipe(catchError(this.handleError));
    }
  }

  getSitiosRutaUsaurio(){
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.get<MostrarSitioRuta[]>(this.allSitiosRutaURL, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.get<MostrarSitioRuta[]>(this.allSitiosRutaURL)
        .pipe(catchError(this.handleError));
    }
  }

  deleteSitioRutaUsuario(id:number){
    const headers = this.getAuthHeaders();
    if (headers) {
      return this.http.delete(this.deleteSitiosRutaURL + id, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.delete(this.deleteSitiosRutaURL + id)
        .pipe(catchError(this.handleError));
    }
  }
  
  /* ----- MÉTODO CONTROL DE ERRORES ----- */
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error en CustomRouteService:', error);
    return throwError(() => new Error('Error al obtener datos. Inténtalo de nuevo más tarde.'));
  } 
}
