import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { EventItem } from '../models/event-card.model';
import { HttpClient } from '@angular/common/http';
import { cardsHome } from '../place-card/place-card.model';
import { EnumServiciosAdaptabilidad } from '../place-card-list/EnumServiciosAdaptabilidad';
import { Category, CleanFilter, FilterItem } from '../models/filter.model';
import { firstValueFrom, map, Subscription } from 'rxjs';
import { MonumentItem } from '../models/monument.model';
import { FilterService } from '../services/filter.service';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-filter',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  sortedEvents: EventItem[] = [];
  searchText: string = '';
  filterOption: 'month' | 'future' | 'alpha' = 'future';
  showAdaptability: boolean = false;
  filtersExpanded: boolean = false;
  

  @Input() events: EventItem[] = [];
  @Input() places: cardsHome[] = [];
  @Input() categories: Category[] = [];
  @Input() categoryKeywords: { [key: string]: string[] } = {};
  @Input() datos: MonumentItem[]=[];

  @Output() filteredEvents = new EventEmitter<any[]>(); 
  @Output() filteredCards = new EventEmitter<any[]>();
  @Output() filteredMonuments = new EventEmitter<any[]>();
  @Output() filtersAdaptability = new EventEmitter<string[]>();
  @Output() noResultsPlacesEvent = new EventEmitter<boolean>();
  @Output() noResultsEventsEvent = new EventEmitter<boolean>();
  

  selectedEventsCategoriesMap: { [key: string]: boolean } = {};
  selectedPlacesCategoriesMap: { [key: string]: boolean } = {};
  selectedMapCategoriesMap: { [key: string]: boolean } = {};
  selectedAccesibilityCategoriesMap: { [key: string]: boolean } = {}; //Mirar si esto va aquí o en places
  groups = ['accesibilidad', 'servicios', 'familiar', 'multiidioma'];

  
  showAccesibilityCategories: boolean = false;
  showCategories: boolean = false; //  
  showOrder: boolean = false;
  //Para el mensaje de "no se han encontrado resultados"
  noResultsPlaces: boolean = false;
  noResultsEvents: boolean = false;

  accesibilityOptions = [
    { key: 'rampas', label: 'Rampas', groups: ['accesibilidad'] },
    { key: 'ascensores', label: 'Ascensores', groups:['accesibilidad'] },
    { key: 'puertas_automaticas', label: 'Puertas automáticas', groups: ['accesibilidad'] },
    { key: 'escaleras_mecanicas', label: 'Escaleras mecánicas', groups: ['accesibilidad'] },
    { key: 'servicios_adaptados', label: 'Servicios adaptados', groups: ['accesibilidad'] },
    { key: 'sala_lactancia', label: 'Sala de lactancia', groups: ['familiar'] },
    { key: 'cambiador', label: 'Cambiador', groups: ['familiar'] },
    { key: 'parking_adaptado', label: 'Parking adaptado', groups: ['accesibilidad'] },
    { key: 'bancos', label: 'Bancos/asientos', groups: ['servicios'] },
    { key: 'mostrador_adaptado', label: 'Mostrador adaptado', groups: ['accesibilidad'] },
    { key: 'sin_barreras_arquitectonicas', label: 'Sin barreras arquitectónicas', groups: ['accesibilidad'] },
    { key: 'braille', label: 'Braille', groups: ['accesibilidad' ] },
    { key: 'interprete_lengua_signos', label: 'Intérprete de lengua de signos', groups: ['accesibilidad'] },
    { key: 'videos_subtitulados', label: 'Vídeos subtitulados', groups: ['accesibilidad'] },
    { key: 'ayudas_visuales', label: 'Ayudas visuales', groups: ['accesibilidad'] },
    { key: 'guias_turisticos_multiidioma', label: 'Guías turísticos multiidioma', groups: ['multiidioma'] },
    { key: 'elementos_audiovisuales_multiidioma', label: 'Elementos audiovisuales multiidioma', groups: ['multiidioma'] },
    { key: 'documentacion_multiidioma', label: 'Documentación multiidioma', groups: ['multiidioma']  },
    { key: 'visitas_grupales', label: 'Visitas grupales', groups: ['familiar'] },
    { key: 'ayuda_movilidad', label: 'Ayuda a la movilidad', groups: [ 'servicios'] },
    { key: 'lenguaje_simple', label: 'Lenguaje simple', groups: ['servicios'] },
    { key: 'acceso_perros_guias', label: 'Acceso a perros guías', groups: ['servicios'] },
    { key: 'acceso_perros_asistencia', label: 'Acceso a perros de asistencia', groups: ['servicios'] },

  ];

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

  inputs: HTMLInputElement[] = [];
  favFilters: FilterItem[] = [];
  sortedFilter: FilterItem[] = [];
  @Input() userFavFilter: FilterItem = {
    features: [
      {id: false},
      {museosExposiciones: false},
      {monumentosEsculturas: false},
      {zonasVerdes: false},
      {arquitectura: false},
      {arteMudejar: false},
      {arteRomano: false},
      {rampas: false},
      {ascensores: false},
      {puertasAutomaticas: false},
      {escalerasMecanicas: false},
      {serviciosAdaptados: false},
      {parkingAdaptado: false},
      {mostradorAdaptado: false},
      {sinBarrerasArquitectonicas: false},
      {braille: false},
      {interpreteLenguaSignos: false},
      {videosSubtitulados: false},
      {ayudasVisuales: false},
      {bancos: false},
      {ayudaMovilidad: false},
      {lenguajeSimple: false},
      {accesoPerrosGuias: false},
      {accesoPerrosAsistencia: false},
      {salaLactancia: false},
      {cambiador: false},
      {visitasGrupales: false},
      {guiasTuristicosMultiidioma: false},
      {elementosAudiovisualesMultiidioma: false},
      {documentacionMultiidioma: false},
    ]
  };
  orderFilter: FilterItem = {
    features: [
      {id: false},
      {museosExposiciones: false},
      {monumentosEsculturas: false},
      {zonasVerdes: false},
      {arquitectura: false},
      {arteMudejar: false},
      {arteRomano: false},
      {rampas: false},
      {ascensores: false},
      {puertasAutomaticas: false},
      {escalerasMecanicas: false},
      {serviciosAdaptados: false},
      {parkingAdaptado: false},
      {mostradorAdaptado: false},
      {sinBarrerasArquitectonicas: false},
      {braille: false},
      {interpreteLenguaSignos: false},
      {videosSubtitulados: false},
      {ayudasVisuales: false},
      {bancos: false},
      {ayudaMovilidad: false},
      {lenguajeSimple: false},
      {accesoPerrosGuias: false},
      {accesoPerrosAsistencia: false},
      {salaLactancia: false},
      {cambiador: false},
      {visitasGrupales: false},
      {guiasTuristicosMultiidioma: false},
      {elementosAudiovisualesMultiidioma: false},
      {documentacionMultiidioma: false},
    ]
  };
  newUserFavFilter: CleanFilter = {
    id: -1,
    museosExposiciones: false,
    monumentosEsculturas: false,
    zonasVerdes: false,
    arquitectura: false,
    arteMudejar: false,
    arteRomano: false,
    rampas: false,
    ascensores: false,
    puertasAutomaticas: false,
    escalerasMecanicas: false,
    serviciosAdaptados: false,
    parkingAdaptado: false,
    mostradorAdaptado: false,
    sinBarrerasArquitectonicas: false,
    braille: false,
    interpreteLenguaSignos: false,
    videosSubtitulados: false,
    ayudasVisuales: false,
    bancos: false,
    ayudaMovilidad: false,
    lenguajeSimple: false,
    accesoPerrosGuias: false,
    accesoPerrosAsistencia: false,
    salaLactancia: false,
    cambiador: false,
    visitasGrupales: false,
    guiasTuristicosMultiidioma: false,
    elementosAudiovisualesMultiidioma: false,
    documentacionMultiidioma: false,
  }
  orderMap = new Map();
  inputNames: String[] = [];
  inputIndex: Number[] = [];
  orderedArray: [any, boolean][] = [];
  allCategoriesArray: string[] = [];

  logueado: boolean = false;
  private sub!: Subscription;

  showError = false;

  constructor(private router: Router, private http: HttpClient, private apiFilterService: FilterService,
    public loginService: LoginService){
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd){
        if (val.url === '/sitios' || val.url === '/mapa' || val.url === '/mi-perfil'){
          this.showAdaptability = true;
          this.showOrder = false;
        }else{
          this.showAdaptability = false;
          this.showOrder= true
        }
      }
    })
  }

  onlyLetters(event: KeyboardEvent) {
    const key = event.key;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
    if (key === 'Enter') {
      return;
    }
    if (!regex.test(key)) {
      event.preventDefault();
      this.showError = true;
      setTimeout(() => { this.showError = false }, 2500);
    }
  }

  toggleFilters(): void {
    this.filtersExpanded = !this.filtersExpanded;
  }

  getOptionsByGroup(group: string) {
    return this.accesibilityOptions.filter(option => option.groups.includes(group));
  }

  async ngOnInit() {
    this.sub = this.loginService.getUsuarioObservable().subscribe(usuario => {
      this.logueado = !!usuario;
    });

    // Inicializar todos los checkboxes como false
    this.categories.forEach(cat => {
      this.selectedEventsCategoriesMap[cat.type] = false;
      this.selectedPlacesCategoriesMap[cat.type] = false;
    });

    this.accesibilityOptions.forEach(option => {
      this.selectedAccesibilityCategoriesMap[option.key] = false;
    });

    this.applyEventFilters();
    this.applyPlaceFilters();
    this.applyMapFilters();
    await this.loadUserFilter();
    this.applyUserFilters();
  }

    //Para que los eventos se carguen al inicio de la página. Antes no funcionaba porque se ejecutaba primero 
    // el Filter y events[] quedaba vacío.
ngOnChanges(changes: SimpleChanges) {
  if (changes['categories'] && changes['categories'].currentValue) {
    // Inicializar maps cuando cambian categories
    this.categories.forEach(cat => {
      if (!(cat.type in this.selectedEventsCategoriesMap)) {
        this.selectedEventsCategoriesMap[cat.type] = false;
      }
      if (!(cat.type in this.selectedPlacesCategoriesMap)) {
        this.selectedPlacesCategoriesMap[cat.type] = false;
      }
      if (!(cat.type in this.selectedMapCategoriesMap)) {
        this.selectedMapCategoriesMap[cat.type] = false;
      }
      // También aseguramos que categoryKeywords tenga la info
      if (!this.categoryKeywords[cat.type]) {
        this.categoryKeywords[cat.type] = cat.keywords ?? [];
      }
    });
  }

  if (changes['events'] && changes['events'].currentValue) {
    this.applyEventFilters();
  }
  if (changes['places'] && changes['places'].currentValue){
    this.applyPlaceFilters();
  }
  if (changes['datos'] && changes['datos'].currentValue) {
    this.applyMapFilters();
  }
}


  applyUserFilters() {
    this.inputs = Array.from(document.querySelectorAll('input'));

    let trueArray: [String, any] = ["", -1];
    trueArray.shift();
    trueArray.shift();

    Object.entries(this.newUserFavFilter).forEach((elem) => {
      if (elem[1] == true){
        trueArray.push(this.camelToUnderscore(elem[0]));
      }
    });

    this.inputs.forEach((elem) => {
      let endIndex = elem.id.indexOf("-") + 1;
      let catAcc = elem.id.slice(0, endIndex);
      let newId = elem.id.slice(endIndex);
      if(trueArray.indexOf(newId) >= 0) {
        elem.checked = true
        if (catAcc == "check-"){
          this.toggleCategory(newId);
        } else {
          this.toggleAccessibility(newId)
        }
      }
    })
  }

  async loadUserFilter() {
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr){
      const usuario = JSON.parse(usuarioStr);
      this.newUserFavFilter = await firstValueFrom(this.apiFilterService.getFilter(Number(usuario.id)));
    }
  }

  camelToUnderscore(key: String) {
    return key.replace( /([A-Z])/g, "_$1").toLowerCase();
  }

  snakeToCamel(str: String){
    return str.replace(/_([a-z])/g, (g) =>  g[1].toUpperCase());
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

    if (this.datos.length > 0){
      this.applyMapFilters();
    } else if (this.places.length > 0){
      this.applyPlaceFilters();
    }
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

    const selectedEventsCategories = Object.keys(this.selectedEventsCategoriesMap)
  .filter(cat => this.selectedEventsCategoriesMap[cat]);

    if (selectedEventsCategories.length > 0) {
      filtered = filtered.filter(event => {
        const texto = (event.title + ' ' + (event.description ?? '')).toLowerCase();
        return selectedEventsCategories.some(catType => {
          const keywords = this.categoryKeywords[catType] ?? (this.categories.find(c => c.type === catType)?.keywords ?? []);
          return keywords.some(keyword => texto.includes(keyword.toLowerCase()));
        });
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

  //Sirve la misma funcion para el componente map-page
applyPlaceFilters() {
  let filteredPlaces = [...this.places];

  const selectedPlacesCategories = Object.keys(this.selectedPlacesCategoriesMap)
    .filter(cat => this.selectedPlacesCategoriesMap[cat]);

  if (selectedPlacesCategories.length > 0) {
    filteredPlaces = filteredPlaces.filter(place => {
      const texto = (place.nombre ?? '').toLowerCase();
      return selectedPlacesCategories.some(catType => {
        const keywords = this.categoryKeywords[catType] ?? (this.categories.find(c => c.type === catType)?.keywords ?? []);
        return keywords.some(keyword => texto.includes(keyword.toLowerCase()));
      });
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
}

applyMapFilters() {
  if (!this.datos || this.datos.length === 0) return;

  // Copiamos los datos originales
  let filteredPlaces = [...this.datos];

  // Categorías seleccionadas
  const selectedMapCategories = Object.keys(this.selectedMapCategoriesMap)
    .filter(cat => this.selectedMapCategoriesMap[cat]);

  if (selectedMapCategories.length > 0) {
    filteredPlaces = filteredPlaces.filter(dato => {
      const nombreNormalized = this.normalize(dato.nombre);

      return selectedMapCategories.some(catType => {
        const keywords = this.categoryKeywords[catType] ?? this.categories.find(c => c.type === catType)?.keywords ?? [];
        return keywords.some(keyword => nombreNormalized.includes(this.normalize(keyword)));
      });
    });
  }

  // Accesibilidad seleccionada
  const selectedAccessibilityKeys = Object.keys(this.selectedAccesibilityCategoriesMap)
    .filter(key => this.selectedAccesibilityCategoriesMap[key]);

  if (selectedAccessibilityKeys.length > 0) {
    filteredPlaces = filteredPlaces.filter(dato =>
      selectedAccessibilityKeys.every(key => {
        const value = dato[key as keyof MonumentItem];
        return value === EnumServiciosAdaptabilidad.si || value === EnumServiciosAdaptabilidad.bajo_peticion;
      })
    );
  }

  // Filtro de búsqueda
  if (this.searchText?.trim()) {
    const searchNormalized = this.normalize(this.searchText);
    filteredPlaces = filteredPlaces.filter(dato => this.normalize(dato.nombre).includes(searchNormalized));
  }

  // Emitir resultados
  this.noResultsPlaces = filteredPlaces.length === 0;
  this.filteredCards.emit(filteredPlaces);
  this.noResultsPlacesEvent.emit(this.noResultsPlaces);

  console.log('applyMapFilters -> filtrados:', filteredPlaces.length);
}

toggleCategory(catType: string) {
  // Activamos en los tres mapas (events, places, map)
  this.selectedEventsCategoriesMap[catType] = !this.selectedEventsCategoriesMap[catType];
  this.selectedPlacesCategoriesMap[catType] = !this.selectedPlacesCategoriesMap[catType];
  this.selectedMapCategoriesMap[catType] = !this.selectedMapCategoriesMap[catType];

  this.applyEventFilters();
  this.applyPlaceFilters();
  this.applyMapFilters();
}

   onSearch() {
    this.applyEventFilters();
    this.applyPlaceFilters();
    this.applyMapFilters();
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
      this.selectedEventsCategoriesMap[cat.type] = false;
      this.selectedPlacesCategoriesMap[cat.type] = false;
      this.selectedMapCategoriesMap[cat.type] = false;
    });
    this.accesibilityOptions.forEach(option => {
      this.selectedAccesibilityCategoriesMap[option.key] = false;
    });
    this.applyEventFilters();
    this.applyPlaceFilters();
    this.applyMapFilters();
  }

  saveFilters() {
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr){
      this.inputs.forEach((elem) => {
        let endIndex = elem.id.indexOf("-") + 1;
        let newId = elem.id.slice(endIndex);
        if(elem.checked){
          if (Object.entries(this.newUserFavFilter).indexOf([this.snakeToCamel(newId) as string, true])) {
            this.newUserFavFilter[this.snakeToCamel(newId)] = true;
          }
        } else {
          if (Object.entries(this.newUserFavFilter).indexOf([this.snakeToCamel(newId) as string, false])) {
            this.newUserFavFilter[this.snakeToCamel(newId)] = false;
          }
        }
      });

      this.apiFilterService.addNewFilter(this.newUserFavFilter).subscribe({
        next: res => {
          alert("Los filtros se han guardado correctamente.");
        },
        error: (error: any) => {
          alert("Ocurrió un error al intentar guardar los filtros, vuelve a intentarlo más adelante.");
        }
      });
    } 
  }

  noLogSaveFilters() {
    alert("Inicia sesión si quieres guardar los filtros.");
  }

}
  