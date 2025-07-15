import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  private routesUrl = 'http://localhost:8080/api/rutas';
  private routeIdUrl = 'http://localhost:8080/api/rutaPorID';
  private routesLikeByNameUrl = 'http://localhost:8080/api/rutasParecidas';

  constructor(private http: HttpClient) { }


/* Mostrar todas las rutas*/ 
  getAllRoutes():Observable<any>{
    return this.http.get(this.routesUrl);
  }

  /*Buscar Rutas por Id*/
  getRouteById(id:string):Observable<any>{
    return this.http.post(this.routeIdUrl,{id});
  }

    /*Buscar Rutas por Nombre parecido*/
  routesLikeByName(name:string):Observable<any>{
    return this.http.post(this.routesLikeByNameUrl, {name})
  }

}

