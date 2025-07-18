import { Injectable } from '@angular/core';
import { BiziResponse } from '../models/map.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getBizis():Observable<BiziResponse> {
    return this.http.get<BiziResponse>('https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/estacion-bicicleta?rf=html&srsname=wgs84&start=0&rows=200&distance=500');
  }

  getBusesStation():Observable<BiziResponse> {
    return this.http.get<BiziResponse>('https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/poste-autobus?rf=html&srsname=wgs84&start=0&rows=500&distance=500');
  }

  getBusesInfo():Observable<BiziResponse> {
    // tuzsa-387 tendra que ser variable que venga de la api anterior, es el id
    return this.http.get<BiziResponse>('https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/poste-autobus/tuzsa-387?rf=html&srsname=wgs84');
  }

  getTramsStation():Observable<BiziResponse> {
    // dentro de properties, en destinos[] viene el tiempo de espera
    return this.http.get<BiziResponse>('https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/parada-tranvia?rf=html&srsname=wgs84&start=0&rows=50&distance=50');
  }

  getTaxisStops():Observable<BiziResponse> {
    return this.http.get<BiziResponse>('https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/equipamiento/parada-taxi?rf=html&srsname=wgs84&start=0&rows=500&distance=500');
  }

}
