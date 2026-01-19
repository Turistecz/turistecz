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

  extractDateFromText(text: string): number {
    const regex = /(\d{2})[-\/](\d{2})[-\/](\d{4})/; // regex patrones para manipular texto
    const match = text.match(regex);
    if (match) {
      const [_, day, month, year] = match;
      return new Date(`${year}-${month}-${day}`).getTime();
    }
    return Infinity;
  }

  async loadEvents(): Promise<void> {
    try {
      const datos = await firstValueFrom(this.eventService.getEvents());
      const rawEvents = datos?.features ?? [];
      this.events = rawEvents.map((f: any) => f.properties);

      // Mostrar solo los eventos de este mes
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      let filtered = this.events.map(event => ({
        ...event,
        eventTime: this.extractDateFromText(event.description ?? '')
      })).filter(event => event.eventTime >= today.getTime());

      filtered = filtered.filter(event => {
        const date = new Date(event.eventTime);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });
      
      this.events = filtered;
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
    return groupito;
  }

  get eventGroups02(): EventItem[][] { 
    const groupito: EventItem[][] = [];
    for (let i = 0; i < this.sortedEvents.length; i += 2) {
      groupito.push(this.sortedEvents.slice(i, i + 2));
    }
    return groupito;
  }

  get eventGroups01(): EventItem[][] { 
    const groupito: EventItem[][] = [];
    for (let i = 0; i < this.sortedEvents.length; i += 1) {
      groupito.push(this.sortedEvents.slice(i, i + 1));
    }
    return groupito;
  }

  /////////////////////////////////////////////////////////////////
}
