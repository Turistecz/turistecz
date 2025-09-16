import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventCardComponent } from '../event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { EventItem } from '../models/event-card.model';
import { RouterModule } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';
import { EventService } from '../services/event.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-event-card-list',
  templateUrl: './event-card-list.component.html',
  styleUrls: ['./event-card-list.component.css'],
  imports: [CommonModule, FormsModule, EventCardComponent, RouterModule, FilterComponent, PaginationComponent]
})
export class EventCardListComponent {
  noResultsEvents: boolean = false;
  events: EventItem[] = [];
  eventsFiltered: EventItem[] = [];
  sortedEvents: EventItem[] = [];

  @Input() categoryKeywords: { [key: string]: string[] } = {};

  categoriesEvents: string[] = ['Actividades', 'Turismo', 'Cultura', 'Ocio y entretenimiento'];

  categoryEventsKeywords: { [key: string]: string[] } = {
    'Actividades': ['actividad', 'evento', 'taller', 'zumba', 'charla', 'concurso', 'funcional', 'torneo'],
    'Turismo': ['turismo', 'visita', 'guía', 'monumento', 'histórico', 'museo', 'patrimonio', 'expo'],
    'Cultura': ['cultural', 'museo', 'teatro', 'exposición', 'concierto', 'arte', 'cine', 'festival'],
    'Ocio y entretenimiento': ['feria', 'show', 'tapeo', 'zumba', 'mercado', 'baile', 'juego', 'fiesta']
  };

  selectedCategoriesMap: { [key: string]: boolean } = {};

  page: number = 1;
  pageSize: number = 21;

  constructor(private eventService: EventService) {}

  async ngOnInit(): Promise<void> {
    this.categoriesEvents.forEach(cat => this.selectedCategoriesMap[cat] = false);
    await this.loadEvents(); 
  }

  async loadEvents(): Promise<void> {
      try {
        if (localStorage.getItem('eventGlobal')) {
          this.events = JSON.parse(localStorage.getItem('eventGlobal') || '{}');
        } else {
          const datos = await firstValueFrom(this.eventService.getEvents());
          const rawEvents = datos?.features ?? [];
          this.events = rawEvents.map((f: any) => f.properties);
          localStorage.setItem('eventGlobal', JSON.stringify(rawEvents.map((f: any) => f.properties)));
        }
      } catch (error) {
        console.error('Error al cargar eventos:', error);
      }
    }

  onPageChange(newPage: number) {
    this.page = newPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get pagedEvents(): EventItem[] {
    const start = (this.page - 1) * this.pageSize;
    return this.sortedEvents.slice(start, start + this.pageSize);
  }

  updateEvents(filteredEvents: EventItem[]) {
    this.sortedEvents = filteredEvents;
    this.page = 1; // resetear página al cambiar filtros
  }
 
}