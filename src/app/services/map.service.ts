import { Injectable } from '@angular/core';
import { BiziResponse, BusInfoResponse, BusStopResponse, TaxiStopResponse, TramStopResponse } from '../models/map.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }
  

  getBizis():Observable<BiziResponse> {
    //return this.http.get<BiziResponse>('https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/estacion-bicicleta?rf=html&srsname=wgs84&start=0&rows=200&distance=500');
    const url = "https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/";
    const bizi = "estacion-bicicleta";
    const biziParams = new HttpParams().set('rf', 'html').set('srsname', 'wgs84').set('start', '0').set('rows', '200').set('distance', '500');
    const biziHeaders = new HttpHeaders({
      Accept: 'application/geo+json', 
    });

    return this.http.get<BiziResponse>(url+bizi,{params: biziParams, headers: biziHeaders});
  }

  getBusesStation():Observable<BusStopResponse> {
    return this.http.get<BusStopResponse>('https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/poste-autobus?rf=html&srsname=wgs84&start=0&rows=500&distance=500');
  }

  getBusesInfo():Observable<BusInfoResponse> {
    // tuzsa-387 tendra que ser variable que venga de la api anterior, es el id
    return this.http.get<BusInfoResponse>('https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/poste-autobus/tuzsa-387?rf=html&srsname=wgs84');
  }

  getTramsStation():Observable<TramStopResponse> {
    // dentro de properties, en destinos[] viene el tiempo de espera
    return this.http.get<TramStopResponse>('https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/parada-tranvia?rf=html&srsname=wgs84&start=0&rows=50&distance=50');
  }

  getTaxisStops():Observable<TaxiStopResponse> {
    return this.http.get<TaxiStopResponse>('https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/equipamiento/parada-taxi?rf=html&srsname=wgs84&start=0&rows=500&distance=500');
  }

}
