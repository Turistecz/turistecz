import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventCardComponent } from '../event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { EventItem } from '../models/event-card.model';
import { RouterModule } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-card-list',
  templateUrl: './event-card-list.component.html',
  styleUrl: './event-card-list.component.css',
  imports: [CommonModule, FormsModule, EventCardComponent, RouterModule, FilterComponent]
})
export class EventCardListComponent {
  noResultsEvents: boolean = false;
  events: EventItem[] = [];
  eventsFiltered: EventItem[] = [];
  sortedEvents: EventItem[] = [];

  @Input() categoryKeywords: { [key: string]: string[] } = {};

  //Categorias visibles
  categoriesEvents: string[] = [
    'Actividades',
    'Turismo',
    'Cultura',
    'Ocio y entretenimiento'
  ];

  // Palabras clave asociadas a cada categoria
 categoryEventsKeywords: { [key: string]: string[] } = {
  'Actividades': [
    'actividad', 'evento', 'taller', 'zumba',
    'charla', 'concurso', 'funcional', 'torneo'
  ],
  'Turismo': [
    'turismo', 'visita', 'guía', 'monumento',
    'histórico', 'museo', 'patrimonio', 'expo'
  ],
  'Cultura': [
    'cultural', 'museo', 'teatro', 'exposición',
    'concierto', 'arte', 'cine', 'festival'
  ],
  'Ocio y entretenimiento': [
    'feria', 'show', 'tapeo', 'zumba',
    'mercado', 'baile', 'juego', 'fiesta'
  ]
};

   selectedCategoriesMap: { [key: string]: boolean } = {};
  
  constructor(private eventService: EventService) {}

async ngOnInit(): Promise<void> {
  this.categoriesEvents.forEach(cat => this.selectedCategoriesMap[cat] = false);
  this.loadEvents(); 
 this.eventService.getEvents();
}


async loadEvents(): Promise<void> {
  try {
    this.events = this.eventService.getEvents();

    // Sin filtros: mostrar todo
    this.sortedEvents = this.events.slice();
    this.eventsFiltered = this.events.slice();

  } catch (error) {
    console.error('Error al cargar eventos:', error);
  }
}


  // barra de paginacion
  page: number = 1;
  pageSize: number = 21;

get totalPages(): number {
  return Math.ceil(this.sortedEvents.length / this.pageSize);
}

get pagedEvents(): EventItem[] {
  const start = (this.page - 1) * this.pageSize;
  return this.sortedEvents.slice(start, start + this.pageSize);
}

goToPage(num: number) {
  if (num >= 1 && num <= this.totalPages) {
    this.page = num;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

nextPage() {
  this.goToPage(this.page + 1);
}

prevPage() {
  this.goToPage(this.page - 1);
}

get pagesToShow(): number[] {
  let pages: number[] = [];

  let start = this.page - 2;
  let end = this.page + 2;

  if (start < 1) {
    start = 1;
  }
  if (end > this.totalPages) {
    end = this.totalPages;
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}

  updateEvents(filteredEvents: EventItem[]){
    this.sortedEvents = filteredEvents;
  }
}
