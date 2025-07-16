import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  private routesURL = 'http://localhost:8080/api/rutas';
  private routeIdURL = 'http://localhost:8080/api/rutaPorID';
  private routesLikeByNameURL = 'http://localhost:8080/api/rutasParecidas';
  private routeSitesURL = 'http://localhost:8080/api/sitiosRuta'

  constructor(private http: HttpClient) { }

  /* Mostrar todas las rutas*/ 
  getAllRoutes():Observable<any>{
    return this.http.get(this.routesURL)
    .pipe(
      catchError(this.handleError)
    );
  }

  /*Buscar Rutas por Id*/
  getRouteById(id:string):Observable<any>{
    return this.http.post(this.routeIdURL,{id})
    .pipe(
      catchError(this.handleError)
    );
  }

  /*Buscar Rutas por Nombre parecido*/
  routesLikeByName(name:string):Observable<any>{
    return this.http.post(this.routesLikeByNameURL, {name})
    .pipe(
      catchError(this.handleError)
    )
  }

  /*Muetras los sitios de la Ruta ordenados*/
   getRouteSites(id:string):Observable<any>{
    return this.http.post(this.routeSitesURL , {id})
    .pipe(
      catchError(this.handleError)
    )
  }

  /*Manejador para capturar cualquier error durante la petición */
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error en RoutesService:', error);
    return throwError(() => new Error('Error al obtener datos. Inténtalo de nuevo más tarde.'));
  } 
  /*throwError() es un método de la librería RxJS para errores.*/ 

}

