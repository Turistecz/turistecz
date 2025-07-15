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
  imports: [CommonModule, FormsModule, EventCardComponent]
})
export class EventCardListComponent {
  events: EventItem[] = [];
  sortedEvents: EventItem[] = [];
  sortOption: string = 'alpha';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<EventResponse>(
      'https://www.zaragoza.es/sede/servicio/puntos-interes?rf=html&srsname=utm30n&start=0&rows=50&distance=500'
    ).subscribe((datos) => {
      this.events = datos.result;
      this.sortEvents();
    });
  }

  // 🔠 Normaliza títulos para orden alfabético correcto
  normalize(text: string): string {
    return text
      .trim()
      .toLowerCase()
      .replace(/['"«»“”‘’]/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // 📅 Extrae la primera fecha en formato dd-mm-yyyy o dd/mm/yyyy del texto
  extractDateFromText(text: string): number {
    const regex = /(\d{2})[-\/](\d{2})[-\/](\d{4})/;
    const match = text.match(regex);
    if (match) {
      const [_, day, month, year] = match;
      const dateStr = `${year}-${month}-${day}`; // formato ISO
      return new Date(dateStr).getTime();
    }
    return Infinity; // si no hay fecha válida, poner al final
  }

  // 🔃 Ordena los eventos según la opción seleccionada
  sortEvents(): void {
    this.sortedEvents = [...this.events];

    if (this.sortOption === 'alpha') {
      this.sortedEvents.sort((a, b) =>
        this.normalize(a.title).localeCompare(this.normalize(b.title), 'es', { sensitivity: 'base' })
      );
    } else if (this.sortOption === 'date') {
      this.sortedEvents.sort((a, b) => {
        const timeA = this.extractDateFromText(a.description ?? '');
        const timeB = this.extractDateFromText(b.description ?? '');
        return timeA - timeB;
      });
    }
  }

  getDifferentColor(): boolean {
    return Math.random() >= 0.5;
  }
}



