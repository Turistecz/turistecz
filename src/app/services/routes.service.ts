import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, of, tap } from 'rxjs';
import { RoutesPage } from '../models/routes.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  private routesURL = `${environment.apiBaseUrl}/api/rutas`;
  private routeIdURL = `${environment.apiBaseUrl}/api/rutaPorID?id=`;
  private routesLikeByNameURL = `${environment.apiBaseUrl}/api/rutasParecidas?nombre=`;
  private routeSitesURL = `${environment.apiBaseUrl}/api/sitiosRutaID?id=`

  routesCache: RoutesPage[] = [];
  

  routesFilter: RoutesPage[]=[];

  constructor(private http: HttpClient) { }

   private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  /* Mostrar todas las rutas*/
  getAllRoutes():Observable<RoutesPage[]>{
    if (this.routesCache.length > 0) {
      return of(this.routesCache);
    } 
    else{
     return this.http.get<RoutesPage[]>(this.routesURL)
    }
  }

  /*Buscar Rutas por Id*/
  getRouteById(id:number):Observable<any>{
    return this.http.get(this.routeIdURL+id)
    .pipe(
      catchError(this.handleError)
    );
  }

  /*Buscar Rutas por Nombre parecido*/
  routesLikeByName(name:string):Observable<any>{
    return this.http.get(this.routesLikeByNameURL+name)
    .pipe(
      catchError(this.handleError)
    )
  }

  /*Muetras los sitios de la Ruta ordenados*/
   getRouteSites(id:number):Observable<any>{
    return this.http.get(this.routeSitesURL+id)
    .pipe(
      catchError(this.handleError)
    )
  }

  /*Manejador para capturar cualquier error durante la petición */
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error en RoutesService:', error);
    return throwError(() => new Error('Error al obtener datos. Inténtalo de nuevo más tarde.'));
  } 

}

