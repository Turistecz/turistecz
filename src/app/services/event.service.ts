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

  //Crear variable para almacenar un array de eventos
  eventos: EventItem[] = [];



  //Devuelve el contenido de la variable eventos (en caso de que contenga algo). Si está vacía, primero llamamos al servicio REST del ayuntamiento, 
  // porcesamos su respuesta, llenamos la variable eventos con lo que nos ha devuelto y la devolvemos.
  getEvents(): EventItem[] {

    //if (AppComponent.eventosGlobal.length > 0) {
    if (localStorage.getItem('eventosGlobal')) {
      this.eventos = JSON.parse(localStorage.getItem('eventosGlobal') || '{}');

      return this.eventos;
    } else {
      const Params = new HttpParams().set('rf','html').set('srsname','utm30n').set('start','0').set('rows','500').set('distance','500');
      const Headers = new HttpHeaders({ 
        Accept: 'application/geo+json',
      });
      
      this.http.get<EventResponse>(this.apiUrl,{params: Params, headers: Headers}).subscribe(dataEventos => {            
      //  GeoJSON: debes acceder a features y luego a properties
      const rawEvents = dataEventos?.features ?? [];
        
      // Extraer solo el contenido útil de cada evento (properties)
      this.eventos = rawEvents.map((f: any) => f.properties);
      localStorage.setItem('eventosGlobal', JSON.stringify(rawEvents.map((f: any) => f.properties)));
      
      });
      
      return this.eventos;
    }
  }

}