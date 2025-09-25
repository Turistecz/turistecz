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
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        console.log('🌐 Respuesta cruda de la API:', response);

        return response.features.map((f: any) => {
          const ev: CalendarEvent = {
            title: f.properties.title,
            description: f.properties.description,
            category: f.properties.category,
            location: f.properties.description,
            link: f.properties.link,
            icon: response.properties?.icon
          };
        });
      })
    );
}
}