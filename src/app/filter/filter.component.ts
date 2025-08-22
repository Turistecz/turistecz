import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventItem } from '../models/event-card.model';
import { HttpClient } from '@angular/common/http';
import { cardsHome } from '../place-card/place-card.model';


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
  @Input() places: cardsHome[] = [];
  @Input() categories: string[] = [];

  @Input() categoryKeywords: { [key: string]: string[] } = {};
  @Output() filteredEvents = new EventEmitter<any[]>(); 
  @Output() filteredCards = new EventEmitter<any[]>();
  // @Input() accesibilityCategories : Accesibilidad[] = [];
  @Input() 

  selectedEventsCategoriesMap: { [key: string]: boolean } = {};
  selectedPlacesCategoriesMap: { [key: string]: boolean } = {};
  selectedAccesibilityCategoriesMap: { [key: string]: boolean } = {}; //Mirar si esto va aquí o en places

  constructor(private http: HttpClient) {}

categoriesAdaptability: string[] = [
    'Rampas',
    'Ascensores',
    'Puertas automáticas',
    'Escaleras mecánicas',
    'Servicios adaptados',
    'Sala de lactancia',
    'Cambiador',
    'Parking adaptado',
    'Bancos/asientos',
    'Mostrador adaptado',
    'Sin barreras arquitectónicas',
    'Braille',
    'Intérprete de lengua de signos',
    'Vídeos subtítulos',
    'Ayudas visuales',
    'Guías turísticos multiidioma',
    'Elementos audiovisuales multiidioma',
    'Documentacion multiidioma',
    'Visitas grupales',
    'Ayuda a la movilidad',
    'Lenguaje simple',
    'Acceso para perros guías',
    'Acceso para perro de asistencia'

  ];
  ngOnInit() {
    // Inicializar todos los checkboxes como false
    this.categories.forEach(cat => {
      this.selectedEventsCategoriesMap[cat] = false;
      this.selectedPlacesCategoriesMap[cat] = false;
      this.selectedAccesibilityCategoriesMap[cat] = false;
    });
    this.applyEventFilters();
    this.applyPlaceFilters();
  
  }
    //Para que los eventos se carguen al inicio de la página. Antes no funcionaba porque se ejecutaba primero 
    // el Filter y events[] quedaba vacío.
  ngOnChanges(changes: SimpleChanges) {
    if (changes['events'] && changes['events'].currentValue) {
      this.applyEventFilters();
    }
    if (changes['places'] && changes ['places'].currentValue)
      this.applyPlaceFilters();
  }

  showAccesibilityCategories: boolean = false;
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

  applyEventFilters() {
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

    const selectedEventsCategories = Object.keys(this.selectedEventsCategoriesMap).filter(cat => this.selectedEventsCategoriesMap[cat]);
    if (selectedEventsCategories.length > 0) {
      filtered = filtered.filter(event => {
        const texto = (event.title + ' ' + (event.description ?? '')).toLowerCase();
        return selectedEventsCategories.some(cat =>
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

  applyPlaceFilters(){
      
    let filteredPlaces = this.places;

    const selectedPlacesCategories = Object.keys(this.selectedPlacesCategoriesMap).filter(cat => this.selectedPlacesCategoriesMap[cat]);
    if (selectedPlacesCategories.length > 0) {
      filteredPlaces = filteredPlaces.filter(place => {
        const texto = place.nombre.toLowerCase();
        return selectedPlacesCategories.some(cat =>
          this.categoryKeywords[cat]?.some(keyword => texto.includes(keyword))
        );
      });
    }

    const selectedAccesibilityCategories = Object.keys(this.selectedAccesibilityCategoriesMap).filter(cat => this.selectedAccesibilityCategoriesMap[cat]);
    if (selectedAccesibilityCategories.length > 0) {
      filteredPlaces = filteredPlaces.filter(place => {
        const texto = place.nombre.toLowerCase();
        return selectedAccesibilityCategories.some(cat =>
          this.categoryKeywords[cat]?.some(keyword => texto.includes(keyword))
        );
      });
    }

    if (this.searchText.trim()) {
      const search = this.normalize(this.searchText);
      filteredPlaces = filteredPlaces.filter(place =>
        this.normalize(place.nombre).includes(search)
      );
    }

    this.filteredCards.emit(filteredPlaces);
};

 toggleAccesibilityDropdown() {
    this.showAccesibilityCategories = !this.showAccesibilityCategories;
  }
  
  toggleCategory(cat: string) {
    this.selectedEventsCategoriesMap[cat] = !this.selectedEventsCategoriesMap[cat];
    this.selectedPlacesCategoriesMap[cat] = !this.selectedPlacesCategoriesMap[cat];
    this.selectedAccesibilityCategoriesMap[cat] = !this.selectedAccesibilityCategoriesMap[cat];
    this.applyEventFilters();
    this.applyPlaceFilters();
  }

  onSearch() {
    this.applyEventFilters();
    this.applyPlaceFilters();
  }

  setFilter(option: 'month' | 'future' | 'alpha') {
    this.filterOption = option;
    this.applyEventFilters();
    this.applyPlaceFilters();
  }

  resetFilters() {
    this.searchText = '';
    this.filterOption = 'future';
    this.categories.forEach(cat => {
      this.selectedEventsCategoriesMap[cat] = false;
      this.selectedPlacesCategoriesMap[cat] = false;
    });
    this.applyEventFilters();
    this.applyPlaceFilters();
  }

  // getDifferentColor(): boolean {
  //   return Math.random() >= 0.5;
  // }
}
  