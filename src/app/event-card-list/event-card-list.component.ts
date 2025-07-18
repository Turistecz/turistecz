import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventCardComponent } from '../event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EventItem, EventResponse } from '../models/event-card.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-card-list',
  templateUrl: './event-card-list.component.html',
  styleUrl: './event-card-list.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, EventCardComponent, RouterModule]
})
export class EventCardListComponent {
  events: EventItem[] = [];
  sortedEvents: EventItem[] = [];
  searchText: string = '';
  filterOption: 'month' | 'future' | 'alpha' = 'future';

  // Categorias visibles
  categoryOptions: string[] = [
    'Actividades',
    'Turismo',
    'Cultura',
    'Ocio y entretenimiento',
    'Gastronomia',
    'Alojamientos'
  ];

  // Palabras clave asociadas a cada categoria
 categoryKeywords: { [key: string]: string[] } = {
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
  ],
  'Gastronomia': [
    'restaurante', 'comida', 'gastronomía', 'cocina',
    'tapas', 'bar', 'menú', 'plato'
  ],
  'Alojamientos': [
    'alojamiento', 'hotel', 'hostal', 'pensión',
    'habitación', 'dormir', 'reserva', 'desayuno'
  ]
};

  selectedCategoriesMap: { [key: string]: boolean } = {};

  apiBaseUrl: string = 'https://www.zaragoza.es/sede/servicio/puntos-interes?rf=html&srsname=utm30n&start=0&rows=500&distance=500';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Inicializar todos los checkboxes como false
    this.categoryOptions.forEach(cat => {
      this.selectedCategoriesMap[cat] = false;
    });
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<EventResponse>(this.apiBaseUrl).subscribe((datos) => {
      this.events = datos?.result ?? [];
      this.applyFilters();
    });
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

  normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-ZáéíóúñÑ ]/g, '')
      .trim();
  }

  applyFilters() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let filtered = this.events
      .map(event => ({
        ...event,
        eventTime: this.extractDateFromText(event.description ?? '')
      }))
      .filter(event => event.eventTime >= today.getTime());

    if (this.filterOption === 'month') {
      filtered = filtered.filter(event => {
        const date = new Date(event.eventTime);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });
    }

    if (this.filterOption === 'future') {
      filtered.sort((a, b) => a.eventTime - b.eventTime);
    } else if (this.filterOption === 'alpha') {
      filtered.sort((a, b) =>
        this.normalize(a.title).localeCompare(this.normalize(b.title), 'es', { sensitivity: 'base' })
      );
    }

    const selectedCats = Object.keys(this.selectedCategoriesMap).filter(cat => this.selectedCategoriesMap[cat]);
    if (selectedCats.length > 0) {
      filtered = filtered.filter(event => {
        const texto = (event.title + ' ' + (event.description ?? '')).toLowerCase();
        return selectedCats.some(cat =>
          this.categoryKeywords[cat]?.some(keyword => texto.includes(keyword))
        );
      });
    }

    if (this.searchText.trim()) {
      const search = this.normalize(this.searchText);
      filtered = filtered.filter(event =>
        this.normalize(event.title).includes(search) ||
        this.normalize(event.description ?? '').includes(search)
      );
    }

    this.sortedEvents = filtered;
  }

  toggleCategory(cat: string) {
    this.selectedCategoriesMap[cat] = !this.selectedCategoriesMap[cat];
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  setFilter(option: 'month' | 'future' | 'alpha') {
    this.filterOption = option;
    this.applyFilters();
  }

  resetFilters() {
    this.searchText = '';
    this.filterOption = 'future';
    this.categoryOptions.forEach(cat => {
      this.selectedCategoriesMap[cat] = false;
    });
    this.applyFilters();
  }

  getDifferentColor(): boolean {
    return Math.random() >= 0.5;
  }
}