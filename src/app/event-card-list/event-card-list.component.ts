import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventItem, EventResponse } from './event-card.model';

@Component({
  selector: 'app-event-card-list',
  standalone: true,
  templateUrl: './event-card-list.component.html',
  styleUrl: './event-card-list.component.css',
  imports: [CommonModule, FormsModule, EventCardComponent],
})
export class EventCardListComponent {
  events: EventItem[] = [];
  sortedEvents: EventItem[] = [];
  searchText: string = '';
  sortOption: string = 'upcoming';

  apiBaseUrl: string = 'https://www.zaragoza.es/sede/servicio/puntos-interes?rf=html&srsname=utm30n&start=0&rows=500&distance=500';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<EventResponse>(this.apiBaseUrl).subscribe((datos) => {
      this.events = datos?.result ?? [];
      this.sortEvents();
    });
  }

  extractDateFromText(text: string): number {
    const regex = /(\d{2})[-\/](\d{2})[-\/](\d{4})/;
    const match = text.match(regex);
    if (match) {
      const [_, day, month, year] = match;
      const dateStr = `${year}-${month}-${day}`;
      return new Date(dateStr).getTime();
    }
    return Infinity;
  }

  sortEvents() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filtered = this.events
      .map(event => ({
        ...event,
        eventTime: this.extractDateFromText(event.description ?? '')
      }))
      .filter(event => event.eventTime >= today.getTime());

    // aplicar búsqueda si hay texto
    if (this.searchText.trim()) {
      const search = this.normalize(this.searchText);
      filtered = filtered.filter(event =>
        this.normalize(event.title).includes(search) ||
        this.normalize(event.description ?? '').includes(search)
      );
    }

    // orden
    if (this.sortOption === 'upcoming') {
      this.sortedEvents = filtered.sort((a, b) => a.eventTime - b.eventTime);
    } else {
      this.sortedEvents = filtered.sort((a, b) => b.eventTime - a.eventTime);
    }
  }

  searchEvents() {
    this.sortEvents(); // ya aplica búsqueda y orden
  }

  normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-ZáéíóúñÑ ]/g, '')
      .trim();
  }

  getDifferentColor(): boolean {
    return Math.random() >= 0.5;
  }
}