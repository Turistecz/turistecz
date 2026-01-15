import { Component, Input } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { EventItem, EventResponse } from '../models/event-card.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../services/event.service';
import { firstValueFrom } from 'rxjs';


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

async ngOnInit() {
  //this.events = this.eventService.getEvents();
  await this.loadEvents();
  this.sortedEvents = this.events.slice(); // ordénalos si quieres
}

async loadEvents(): Promise<void> {
    try {
      if (localStorage.getItem('eventGlobal')) {
        this.events = JSON.parse(localStorage.getItem('eventGlobal') || '{}');
      } else {
        const datos = await firstValueFrom(this.eventService.getEvents());
        const rawEvents = datos?.features ?? [];
        this.events = rawEvents.map((f: any) => f.properties);
        console.log(datos.features)
        localStorage.setItem('eventGlobal', JSON.stringify(rawEvents.map((f: any) => f.properties)));
      }
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    }
  }

  // Cada una agrupa de forma diferente en función del tamaño de la pantalla

  get eventGroups03(): EventItem[][] { 
    const groupito: EventItem[][] = [];
    for (let i = 0; i < this.sortedEvents.length; i += 3) {
      groupito.push(this.sortedEvents.slice(i, i + 3));
    }
    console.log("groupito 003",groupito)
    return groupito;
  }

  get eventGroups02(): EventItem[][] { 
    const groupito: EventItem[][] = [];
    for (let i = 0; i < this.sortedEvents.length; i += 2) {
      groupito.push(this.sortedEvents.slice(i, i + 2));
    }
    console.log("groupito 002",groupito)
    return groupito;
  }

  get eventGroups01(): EventItem[][] { 
    const groupito: EventItem[][] = [];
    for (let i = 0; i < this.sortedEvents.length; i += 1) {
      groupito.push(this.sortedEvents.slice(i, i + 1));
    }
    console.log("groupito 001",groupito)
    return groupito;
  }

  /////////////////////////////////////////////////////////////////
}
