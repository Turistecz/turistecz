import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { EventResponse} from '../models/event-card.model';
import {  CalendarTest } from '../models/calendar-event.models';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'https://www.zaragoza.es/sede/servicio/puntos-interes';

  private apiInfo = 'https://www.zaragoza.es/sede/servicio/actividades/evento/calendar?startDate=04-10-2025';

  constructor(private http: HttpClient ) {}

getEvents(): Observable<EventResponse> {
      const Params = new HttpParams().set('rf','html').set('srsname','utm30n').set('start','0').set('rows','500').set('distance','500');
      const Headers = new HttpHeaders({
        Accept: 'application/geo+json', 
      });
      return this.http.get<EventResponse>(this.apiUrl,{params: Params, headers: Headers});
    }

getEventstest(date:string): Observable<CalendarTest[]> {

  const params = new HttpParams().set('startDate', date).set('idPortal', '1').set('rows', '200');
   const headers = new HttpHeaders({
        Accept: 'application/json', 
      });
  
  return this.http.get<any>(this.apiInfo, {params, headers}).pipe(
    map(response => {
      const results = response?.result ?? [];
  
      if (!Array.isArray(results)) return [];
      return results.map((ev: any) => ({
        title: ev.title,
        startDate: ev.startDate ?? '',
        endDate: ev.endDate ?? '',
        subEvent: (ev.subEvent ?? []).map((sub: any) => ({
          openingHours: Array.isArray(sub.openingHours)
            ? sub.openingHours.map((h: any) => ({
                dayOfWeek: h.dayOfWeek ?? '',
                startTime: h.startTime ?? '',
                endTime: h.endTime ?? ''
              })):[]  
        }))
      }));
    })
  );
}}
