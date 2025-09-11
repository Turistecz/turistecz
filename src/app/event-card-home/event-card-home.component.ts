import { Component, Input } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { EventItem, EventResponse } from '../models/event-card.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../services/event.service';


@Component({
  selector: 'app-event-card-home',
  imports: [CommonModule, FormsModule, EventCardComponent, RouterModule],
  templateUrl: './event-card-home.component.html',
  styleUrl: './event-card-home.component.css'
})

export class EventCardHomeComponent {

  constructor(private http: HttpClient, private eventService: EventService) {}

events: EventItem[] = [];
sortedEvents: EventItem[] = [];

ngOnInit() {
  this.events = this.eventService.getEvents();
  this.sortedEvents = this.events.slice(); // ordénalos si quieres
}

get eventGroups(): EventItem[][] { // Esta funcion para recorrer el array de eventos y los divido en grupos de 3
  const groupito: EventItem[][] = [];
  for (let i = 0; i < this.sortedEvents.length; i += 3) {
    groupito.push(this.sortedEvents.slice(i, i + 3));
  }
  return groupito;
}
}
