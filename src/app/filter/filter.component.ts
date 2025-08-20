import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output, SimpleChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventItem, EventResponse } from '../models/event-card.model';
import { HttpClient } from '@angular/common/http';
import { EventCardListComponent } from '../event-card-list/event-card-list.component';
import { Events } from 'leaflet';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  sortedEvents: EventItem[] = [];
  searchText: string = '';
  filterOption: 'month' | 'future' | 'alpha' = 'future';

  @Input() events: EventItem[] = [];
  @Input() categories: string[] = [];
  @Input() categoryKeywords: { [key: string]: string[] } = {};
  @Output() filteredEvents = new EventEmitter<any>(); //falta poner Sitios[]


   
  // Categorias visibles
  // categoryOptions: string[] = [
  //   'Actividades',
  //   'Turismo',
  //   'Cultura',
  //   'Ocio y entretenimiento'
  // ];

  // Palabras clave asociadas a cada categoria
//  categoryKeywords: { [key: string]: string[] } = {
//   'Actividades': [
//     'actividad', 'evento', 'taller', 'zumba',
//     'charla', 'concurso', 'funcional', 'torneo'
//   ],
//   'Turismo': [
//     'turismo', 'visita', 'guía', 'monumento',
//     'histórico', 'museo', 'patrimonio', 'expo'
//   ],
//   'Cultura': [
//     'cultural', 'museo', 'teatro', 'exposición',
//     'concierto', 'arte', 'cine', 'festival'
//   ],
//   'Ocio y entretenimiento': [
//     'feria', 'show', 'tapeo', 'zumba',
//     'mercado', 'baile', 'juego', 'fiesta'
//   ]
// };

  selectedCategoriesMap: { [key: string]: boolean } = {};

  apiBaseUrl: string = 'https://www.zaragoza.es/sede/servicio/puntos-interes?rf=html&srsname=utm30n&start=0&rows=500&distance=500';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Inicializar todos los checkboxes como false
    this.categories.forEach(cat => {
      this.selectedCategoriesMap[cat] = false;
    });
    this.applyFilters();
  
  }
    //Para que los eventos se carguen al inicio de la página. Antes no funcionaba porque se ejecutaba primero 
    // el Filter y events[] quedaba vacío.
    
   ngOnChanges(changes: SimpleChanges) {
      if (changes['events'] && changes['events'].currentValue) {
        this.applyFilters();
      }
    }

 showCategories: boolean = false; //  


  

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

    const selectedCategories = Object.keys(this.selectedCategoriesMap).filter(cat => this.selectedCategoriesMap[cat]);
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(event => {
        const texto = (event.title + ' ' + (event.description ?? '')).toLowerCase();
        return selectedCategories.some(cat =>
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

    this.filteredEvents.emit(filtered);
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
    this.categories.forEach(cat => {
      this.selectedCategoriesMap[cat] = false;
    });
    this.applyFilters();
  }

  // getDifferentColor(): boolean {
  //   return Math.random() >= 0.5;
  // }
}
  