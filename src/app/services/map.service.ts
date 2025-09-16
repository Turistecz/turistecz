import { Injectable } from '@angular/core';
import { AdapParkingResponse, BiziResponse, BusInfoResponse, BusStopResponse, FarmaciaResponse, MapRouteItem, TaxiStopItem, TaxiStopResponse, TramStopResponse } from '../models/map.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as L from 'leaflet';
import { mapRoute } from '../models/details-routes';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private urbanismo: string = "https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/";
  private farmacia: string = "https://www.zaragoza.es/sede/servicio/farmacia";

  constructor(private http: HttpClient) { }
  
  getBizis():Observable<BiziResponse> {
    const bizi = "estacion-bicicleta";
    const Params = new HttpParams().set('rf', 'html').set('srsname', 'wgs84').set('start', '0').set('rows', '500').set('distance', '500');
    const Headers = new HttpHeaders({
      Accept: 'application/geo+json', 
    });

    return this.http.get<BiziResponse>(this.urbanismo+bizi,{params: Params, headers: Headers});
  }

  getBusesStation():Observable<BusStopResponse> {
     const bus = "transporte-urbano/poste-autobus";
    const Params = new HttpParams().set('rf', 'html').set('srsname', 'wgs84').set('start', '0').set('rows', '600').set('distance', '600');
    const Headers = new HttpHeaders({
      Accept: 'application/geo+json', 
    });
    return this.http.get<BusStopResponse>(this.urbanismo+bus,{params: Params, headers: Headers});
  }

  getBusesInfo(id: string):Observable<BusInfoResponse> {
    const bus = "transporte-urbano/poste-autobus/";
    const Params = new HttpParams().set('rf', 'html').set('srsname', 'wgs84');
    const Headers = new HttpHeaders({
       Accept: 'application/geo+json', 
    });
    return this.http.get<BusInfoResponse>(this.urbanismo+bus+id,{params: Params, headers: Headers});
  }

  getTramsStation():Observable<TramStopResponse> {
    // dentro de properties, en destinos[] viene el tiempo de espera
    const tram = "transporte-urbano/parada-tranvia";
    const Params = new HttpParams().set('rf', 'html').set('srsname', 'wgs84').set('start', '0').set('rows', '500').set('distance', '500');
    const Headers = new HttpHeaders({
      Accept: 'application/geo+json', 
    });
    return this.http.get<TramStopResponse>(this.urbanismo+tram,{params: Params, headers: Headers});
  }

  getTaxisStops():Observable<TaxiStopResponse> {
    const taxi = "equipamiento/parada-taxi";
    const Params = new HttpParams().set('rf', 'html').set('srsname', 'wgs84').set('start', '0').set('rows', '500').set('distance', '500');
    const Headers = new HttpHeaders({
      Accept: 'application/geo+json', 
    });
    
    return this.http.get<TaxiStopResponse>(this.urbanismo+taxi,{params: Params, headers: Headers});
  }

  getAdapParking():Observable<AdapParkingResponse> {
    const adapParking = "equipamiento/aparcamiento-personas-discapacidad";
    const Params = new HttpParams().set('rf', 'html').set('start', '0').set('rows', '500');
    const Headers = new HttpHeaders({
      Accept: 'application/geo+json', 
    });
    
    return this.http.get<AdapParkingResponse>(this.urbanismo+adapParking,{params: Params, headers: Headers});
  }

  getFarmacia():Observable<FarmaciaResponse> {
    const Params = new HttpParams().set('rf', 'html').set('srsname', 'wgs84').set('tipo', 'guardia').set('start', '0').set('rows', '50').set('distance', '500');
    const Headers = new HttpHeaders({
      Accept: 'application/geo+json', 
    });
    
    return this.http.get<FarmaciaResponse>(this.farmacia,{params: Params, headers: Headers});
  }

  getRoute(latLng: L.LatLngExpression, userLatLong: [number, number]):Observable <MapRouteItem> {
    const service = 'route';
    const version = 'v1';
    const profile = 'foot';
    const host = 'http://localhost:5000';
  
    const siteCoords = [L.latLng(latLng).lng, L.latLng(latLng).lat];
    const userCoords = [L.latLng(userLatLong).lng, L.latLng(userLatLong).lat];
    const allCoords = (userCoords + ';' + siteCoords).toString();

    const url = host + '/' + service + '/' + version + '/' + profile + '/' + allCoords + '?overview=full&steps=true&geometries=geojson';
    return this.http.get<MapRouteItem>(url);
  }

  getRouteSites (userLatLong: [number, number], coordsRouted:[[number, number]]):Observable <MapRouteItem> {
    const service = 'route';
    const version = 'v1';
    const profile = 'foot';
    const host = 'http://localhost:5000';
  
    const userCoords = [L.latLng(userLatLong).lng, L.latLng(userLatLong).lat];
    let arrayR:[[number, number]]=[[0,0]]

    arrayR.shift();
    arrayR.push([userCoords[0], userCoords[1]])
    coordsRouted.forEach((item: [number, number]) => {
      arrayR.push([item[1], item[0]])
    })

    const allCoords = arrayR.join(";")
    const url = host + '/' + service + '/' + version + '/' + profile + '/' + allCoords + '?overview=full&steps=true&geometries=geojson';

    return this.http.get<MapRouteItem>(url);
  }
}
