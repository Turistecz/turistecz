import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { EventItem } from '../models/event-card.model';
import { HttpClient } from '@angular/common/http';
import { cardsHome } from '../place-card/place-card.model';
import { EnumServiciosAdaptabilidad } from '../place-card-list/EnumServiciosAdaptabilidad';


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
  showAdaptability: boolean = true;

  @Input() events: EventItem[] = [];
  @Input() places: cardsHome[] = [];
  @Input() categories: string[] = [];
  @Input() categoryKeywords: { [key: string]: string[] } = {};
  @Output() filteredEvents = new EventEmitter<any[]>(); 
  @Output() filteredCards = new EventEmitter<any[]>();
  @Output() filtersAdaptability = new EventEmitter<string[]>();
  @Output() noResultsPlacesEvent = new EventEmitter<boolean>();
@Output() noResultsEventsEvent = new EventEmitter<boolean>();
  

  selectedEventsCategoriesMap: { [key: string]: boolean } = {};
  selectedPlacesCategoriesMap: { [key: string]: boolean } = {};
  selectedAccesibilityCategoriesMap: { [key: string]: boolean } = {}; //Mirar si esto va aquí o en places
  groups = ['accesibilidad', 'servicios', 'infraestructura', 'familiar', 'multiidioma'];

  
  showAccesibilityCategories: boolean = false;
  showCategories: boolean = false; //  
  showOrder: boolean = false;
  //Para el mensaje de "no se han encontrado resultados"
  noResultsPlaces: boolean = false;
  noResultsEvents: boolean = false;

accesibilityOptions = [
  { key: 'rampas', label: 'Rampas', groups: ['accesibilidad', 'infraestructura'] },
  { key: 'ascensores', label: 'Ascensores', groups:['accesibilidad', 'infraestructura'] },
  { key: 'puertas_automaticas', label: 'Puertas automáticas', groups: ['accesibilidad', 'infraestructura'] },
  { key: 'escaleras_mecanicas', label: 'Escaleras mecánicas', groups: ['accesibilidad', 'infraestructura'] },
  { key: 'servicios_adaptados', label: 'Servicios adaptados', groups: ['accesibilidad', 'infraestructura'] },
  { key: 'sala_lactancia', label: 'Sala de lactancia', groups: ['familiar', 'servicios'] },
  { key: 'cambiador', label: 'Cambiador', groups: ['familiar', 'servicios'] },
  { key: 'parking_adaptado', label: 'Parking adaptado', groups: ['accesibilidad', 'infraestructura'] },
  { key: 'bancos', label: 'Bancos/asientos', groups: ['accesibilidad', 'infraestructura', 'servicios'] },
  { key: 'mostrador_adaptado', label: 'Mostrador adaptado', groups: ['accesibilidad', 'infraestructura'] },
  { key: 'sin_barreras_arquitectónicas', label: 'Sin barreras arquitectónicas', groups: ['accesibilidad', 'infraestructura'] },
  { key: 'braille', label: 'Braille', groups: ['accesibilidad', 'servicio' ] },
  { key: 'interprete_lengua_signos', label: 'Intérprete de lengua de signos', groups: ['accesibilidad', 'servicios'] },
  { key: 'videos_subtitulados', label: 'Vídeos subtitulados', groups: ['accesibilidad', 'servicios'] },
  { key: 'ayudas_visuales', label: 'Ayudas visuales', groups: ['accesibilidad', 'servicios'] },
  { key: 'guias_turisticos_multiidioma', label: 'Guías turísticos multiidioma', groups: ['multiidioma', 'servicios'] },
  { key: 'elementos_audiovisuales_multiidioma', label: 'Elementos audiovisuales multiidioma', groups: ['multiidioma', 'servicios'] },
  { key: 'documentacion_multiidioma', label: 'Documentación multiidioma', groups: ['multiidioma', 'servicios']  },
  { key: 'visitas_grupales', label: 'Visitas grupales', groups: ['familiar', 'servicios'] },
  { key: 'ayuda_movilidad', label: 'Ayuda a la movilidad', groups: ['accesibilidad', 'servicios'] },
  { key: 'lenguaje_simple', label: 'Lenguaje simple', groups: ['accesibilidad', 'servicios'] },
  { key: 'acceso_perros_guias', label: 'Acceso a perros guías', groups: ['accesibilidad', 'servicios'] },
  { key: 'acceso_perros_asistencia', label: 'Acceso a perros de asistencia', groups: ['accesibilidad', 'servicios'] },

];

getOptionsByGroup(group: string) {
  return this.accesibilityOptions.filter(option => option.groups.includes(group));
}


  constructor(private router: Router){
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd){
        if (val.url === '/sitios'){
          this.showAdaptability = true;
          this.showOrder = false;
        }else {
          this.showAdaptability = false;
          this.showOrder= true
        }
      }
    })
  }


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
      
    });

    this.accesibilityOptions.forEach(option => {
      this.selectedAccesibilityCategoriesMap[option.key] = false;
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

  toggleAccessibility(key: string) {
  this.selectedAccesibilityCategoriesMap[key] = !this.selectedAccesibilityCategoriesMap[key];
  this.applyPlaceFilters();
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
    this.noResultsEvents = this.filteredEvents.length === 0;

    this.noResultsEvents= filtered.length === 0;
    this.filteredEvents.emit(filtered);
    this.noResultsEventsEvent.emit(this.noResultsEvents);
  }

  applyPlaceFilters(){
      
    let filteredPlaces = [...this.places];

    const selectedPlacesCategories = Object.keys(this.selectedPlacesCategoriesMap)
    .filter(cat => this.selectedPlacesCategoriesMap[cat]);

    if (selectedPlacesCategories.length > 0) {
      filteredPlaces = filteredPlaces.filter(place => {
        const texto = place.nombre.toLowerCase();
        return selectedPlacesCategories.some(cat =>
          this.categoryKeywords[cat]?.some(keyword => texto.includes(keyword))
        );
      });
    }

    const selectedAccessibilityKeys = Object.keys(this.selectedAccesibilityCategoriesMap)
    .filter(key => this.selectedAccesibilityCategoriesMap[key]);

    if (selectedAccessibilityKeys.length > 0) {
    filteredPlaces = filteredPlaces.filter(place =>
      selectedAccessibilityKeys.every(key =>
        place[key as keyof cardsHome] === EnumServiciosAdaptabilidad.si ||
        place[key as keyof cardsHome] === EnumServiciosAdaptabilidad.bajo_peticion
      )
    );
  
  }

    if (this.searchText.trim()) {
      const search = this.normalize(this.searchText);
      filteredPlaces = filteredPlaces.filter(place =>
        this.normalize(place.nombre).includes(search)
      );
    }
    this.noResultsPlaces = filteredPlaces.length === 0;

    this.filteredCards.emit(filteredPlaces);
     this.noResultsPlacesEvent.emit(this.noResultsPlaces);
};
  
  toggleCategory(cat: string) {
    this.selectedEventsCategoriesMap[cat] = !this.selectedEventsCategoriesMap[cat];
    this.selectedPlacesCategoriesMap[cat] = !this.selectedPlacesCategoriesMap[cat];
    // this.selectedAccesibilityCategoriesMap[cat] = !this.selectedAccesibilityCategoriesMap[cat];
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

     this.accesibilityOptions.forEach(option => {
      this.selectedAccesibilityCategoriesMap[option.key] = false;
    });
  }

  // getDifferentColor(): boolean {
  //   return Math.random() >= 0.5;
  // }
}
  