import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { EventResponse, EventItem } from '../models/event-card.model';
import { CalendarEvent } from '../calendar/calendar-event';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'https://www.zaragoza.es/sede/servicio/puntos-interes';

  private apiCalendar = 'https://www.zaragoza.es/sede/servicio/actividades';

  constructor(private http: HttpClient ) {}

  eventos: EventItem[] = [];
  eventus: CalendarEvent[] = [];

  getEvents(): Observable<EventResponse> {
      const Params = new HttpParams().set('rf','html').set('srsname','utm30n').set('start','0').set('rows','500').set('distance','500');
      const Headers = new HttpHeaders({
        Accept: 'application/geo+json', 
      });
      return this.http.get<EventResponse>(this.apiUrl,{params: Params, headers: Headers});
    }

  getEventsCalendar(): Observable<CalendarEvent[]> {
  const params = new HttpParams()
    .set('rf', 'json')
    .set('srsname', 'utm30n')
    .set('start', '0')
    .set('rows', '20')
    .set('distance', '500');

  const headers = new HttpHeaders({
    Accept: 'application/json'
  });

  return this.http.get<any>(this.apiCalendar, { params, headers }).pipe(
    map(response => {
      const events = response?.featuredEvents ?? [];
      if (!Array.isArray(events)) return [];

      return events.flatMap((ev: any) =>
        (ev.subEvent ?? []).map((sub: any) => ({
          title: sub.location?.title ?? sub.title ?? 'Sin título',
          startDate: sub.startDate,   // ya viene como ISO string
          endDate: sub.endDate,       // ya viene como ISO string
          openingHours: (sub.openingHours ?? []).map((h: any) => ({
            dayOfWeek: h.dayOfWeek,
            startTime: h.startTime
          }))
        })) 
      ) ;
    })
  );
}


}
