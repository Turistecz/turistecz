import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonumentResponse } from './monument-list/monument.model';
import { EventResponse } from './event-list/event-list.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectService {

  constructor(private http: HttpClient) { }

   getMonuments(): Observable<MonumentResponse> {
    return this.http.get<MonumentResponse>('https://www.zaragoza.es/sede/servicio/monumento?rf=html&srsname=utm30n&start=0&rows=500&distance=500&locale=es');
  }

  getEvents(): Observable<EventResponse> {
    return this.http.get<EventResponse>('https://www.zaragoza.es/sede/servicio/puntos-interes?rf=html&srsname=utm30n&start=0&rows=50&distance=500');
  }
}
