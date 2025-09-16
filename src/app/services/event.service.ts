import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { EventResponse, EventItem } from '../models/event-card.model';
import { EventCardListComponent } from '../event-card-list/event-card-list.component';
import { AppComponent } from ".././app.component";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'https://www.zaragoza.es/sede/servicio/puntos-interes';

  constructor(private http: HttpClient ) {}

  eventos: EventItem[] = [];

  getEvents(): Observable<EventResponse> {
      const Params = new HttpParams().set('rf','html').set('srsname','utm30n').set('start','0').set('rows','500').set('distance','500');
      const Headers = new HttpHeaders({
        Accept: 'application/geo+json', 
      });
      return this.http.get<EventResponse>(this.apiUrl,{params: Params, headers: Headers});
    }

}