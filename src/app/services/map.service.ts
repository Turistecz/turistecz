import { Injectable } from '@angular/core';
import { AdapParkingResponse, BiziResponse, BusInfoResponse, BusStopResponse, TaxiStopItem, TaxiStopResponse, TramStopResponse } from '../models/map.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private url: string = "https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/";

  constructor(private http: HttpClient) { }
  
  getBizis():Observable<BiziResponse> {
    const bizi = "estacion-bicicleta";
    const Params = new HttpParams().set('rf', 'html').set('srsname', 'wgs84').set('start', '0').set('rows', '500').set('distance', '500');
    const Headers = new HttpHeaders({
      Accept: 'application/geo+json', 
    });

    return this.http.get<BiziResponse>(this.url+bizi,{params: Params, headers: Headers});
  }

  getBusesStation():Observable<BusStopResponse> {
     const bus = "transporte-urbano/poste-autobus";
    const Params = new HttpParams().set('rf', 'html').set('srsname', 'wgs84').set('start', '0').set('rows', '600').set('distance', '600');
    const Headers = new HttpHeaders({
      Accept: 'application/geo+json', 
    });
    return this.http.get<BusStopResponse>(this.url+bus,{params: Params, headers: Headers});
  }

  getBusesInfo(id: string):Observable<BusInfoResponse> {
    const bus = "transporte-urbano/poste-autobus/";
    const Params = new HttpParams().set('rf', 'html').set('srsname', 'wgs84');
    const Headers = new HttpHeaders({
       Accept: 'application/geo+json', 
    });
    return this.http.get<BusInfoResponse>(this.url+bus+id,{params: Params, headers: Headers});
  }

  getTramsStation():Observable<TramStopResponse> {
    // dentro de properties, en destinos[] viene el tiempo de espera
    const tram = "transporte-urbano/parada-tranvia";
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

  getAdapParking():Observable<AdapParkingResponse> {
    const adapParking = "equipamiento/aparcamiento-personas-discapacidad";
    const Params = new HttpParams().set('rf', 'html').set('start', '0').set('rows', '500').set('distance', '500');
    const Headers = new HttpHeaders({
      Accept: 'application/geo+json', 
    });
    
    return this.http.get<AdapParkingResponse>(this.url+adapParking,{params: Params, headers: Headers});
  }

  getMap(){
    let lat = 0;
    let long = 0;

    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;

    })


    return [lat,long]
  }
}
