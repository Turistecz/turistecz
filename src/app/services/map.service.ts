import { Injectable } from '@angular/core';
import { BiziResponse, BusInfoResponse, BusStopResponse, TaxiStopResponse, TramStopResponse } from '../models/map.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private url: string = "https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/";

  constructor(private http: HttpClient) { }
  
  getBizis():Observable<BiziResponse> {
    const bizi = "estacion-bicicleta";
    const Params = new HttpParams().set('rf', 'html').set('srsname', 'wgs84').set('start', '0').set('rows', '200').set('distance', '500');
    const Headers = new HttpHeaders({
      Accept: 'application/geo+json', 
    });

    return this.http.get<BiziResponse>(this.url+bizi,{params: Params, headers: Headers});
  }

  getBusesStation():Observable<BusStopResponse> {
     const bus = "transporte-urbano/poste-autobus";
    const Params = new HttpParams().set('rf', 'html').set('srsname', 'wgs84').set('start', '0').set('rows', '500').set('distance', '500');
    const Headers = new HttpHeaders({
      Accept: 'application/geo+json', 
    });
    return this.http.get<BusStopResponse>(this.url+bus,{params: Params, headers: Headers});
  }

  getBusesInfo():Observable<BusInfoResponse> {
    //   const bus = "transporte-urbano/poste-autobus";
    // const Params = new HttpParams().set('rf', 'html').set('srsname', 'wgs84').set('start', '0').set('rows', '500').set('distance', '500');
    // const Headers = new HttpHeaders({
    //   Accept: 'application/geo+json', 
    // });
    // tuzsa-387 tendra que ser variable que venga de la api anterior, es el id
    return this.http.get<BusInfoResponse>('https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/poste-autobus/tuzsa-387?rf=html&srsname=wgs84');
  }

  getTramsStation():Observable<TramStopResponse> {
    // dentro de properties, en destinos[] viene el tiempo de espera
    const tram = "equipamiento/parada-tranvia";
    const Params = new HttpParams().set('rf', 'html').set('srsname', 'wgs84').set('start', '0').set('rows', '500').set('distance', '500');
    const Headers = new HttpHeaders({
      Accept: 'application/geo+json', 
    });
    return this.http.get<TramStopResponse>(this.url+tram,{params: Params, headers: Headers});
  }

  getTaxisStops():Observable<TaxiStopResponse> {
    const taxi = "equipamiento/parada-taxi";
    const Params = new HttpParams().set('rf', 'html').set('srsname', 'wgs84').set('start', '0').set('rows', '500').set('distance', '500');
    const Headers = new HttpHeaders({
      Accept: 'application/geo+json', 
    });
    return this.http.get<TaxiStopResponse>(this.url+taxi,{params: Params, headers: Headers});
  }

}
