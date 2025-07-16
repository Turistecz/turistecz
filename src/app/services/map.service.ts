import { Injectable } from '@angular/core';
import { BiziResponse } from '../models/map.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getBizis(): Observable<BiziResponse> {
    return this.http.get<BiziResponse>('https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/estacion-bicicleta?rf=html&srsname=wgs84&start=0&rows=200&distance=500');
  }
}
