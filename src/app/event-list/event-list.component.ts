import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventItem, EventResponse } from './event-list.model';
import { HttpClient } from '@angular/common/http';
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, EventComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {

  constructor(private http: HttpClient) {}
    events: EventItem[] = [];

  ngOnInit() {
    this.http.get<EventResponse>(
      'https://www.zaragoza.es/sede/servicio/puntos-interes?rf=html&srsname=utm30n&start=0&rows=50&distance=500'
    ).subscribe(datos => {
      this.events = datos.result;
    });
    
  }
}
