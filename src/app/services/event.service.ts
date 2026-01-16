import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { EventResponse} from '../models/event-card.model';
import { CalendarTest, ZaragozaApiResponse } from '../models/calendar.model';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'https://www.zaragoza.es/sede/servicio/puntos-interes';

  //Se actualiza cada mes
  //private apiInfo = 'https://www.zaragoza.es/sede/servicio/cultura/evento/calendar?rf=html&idPortal=1';
  private apiInfo = 'https://www.zaragoza.es/sede/servicio/actividades/evento/list?rf=html&srsname=utm30n&start=0&rows=50&distance=500';

  constructor(private http: HttpClient ) {}

getEvents(): Observable<EventResponse> {
      const Params = new HttpParams().set('rf','html').set('srsname','utm30n').set('start','0').set('rows','500').set('distance','500');
      const Headers = new HttpHeaders({
        Accept: 'application/geo+json', 
      });
      return this.http.get<EventResponse>(this.apiUrl,{params: Params, headers: Headers});

    }

getEventstest(): Observable<ZaragozaApiResponse> {

  const params = new HttpParams().set('rf', 'html').set('srsname','utm30n').set('start', '0').set('rows', '500').set('distance', '500');
   const headers = new HttpHeaders({
        Accept: 'application/json', 
      });
      return this.http.get<ZaragozaApiResponse>(this.apiInfo,{params: params, headers: headers});
}}