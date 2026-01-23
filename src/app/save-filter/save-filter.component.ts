import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Category, CleanFilter } from '../models/filter.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-save-filter',
  imports: [CommonModule],
  templateUrl: './save-filter.component.html',
  styleUrl: './save-filter.component.css'
})
export class SaveFilterComponent implements OnChanges{

  @Input() userFavFilter!: CleanFilter;
  @Input() categories: Category[] = [];

  @Output() draftChanged = new EventEmitter<CleanFilter>();
  @Output() saveClicked = new EventEmitter<void>();

  // Catálogo de accesibilidad (label + grupo)
  accesibilityOptions = [
    { key: 'rampas', label: 'Rampas', group: 'Accesibilidad' },
    { key: 'ascensores', label: 'Ascensores', group: 'Accesibilidad' },
    { key: 'puertasAutomaticas', label: 'Puertas automáticas', group: 'Accesibilidad' },
    { key: 'escalerasMecanicas', label: 'Escaleras mecánicas', group: 'Accesibilidad' },
    { key: 'serviciosAdaptados', label: 'Servicios adaptados', group: 'Accesibilidad' },
    { key: 'parkingAdaptado', label: 'Parking adaptado', group: 'Accesibilidad' },
    { key: 'mostradorAdaptado', label: 'Mostrador adaptado', group: 'Accesibilidad' },
    { key: 'sinBarrerasArquitectonicas', label: 'Sin barreras arquitectónicas', group: 'Accesibilidad' },
    { key: 'braille', label: 'Braille', group: 'Accesibilidad' },
    { key: 'interpreteLenguaSignos', label: 'Intérprete de lengua de signos', group: 'Accesibilidad' },
    { key: 'videosSubtitulados', label: 'Vídeos subtitulados', group: 'Accesibilidad' },
    { key: 'ayudasVisuales', label: 'Ayudas visuales', group: 'Accesibilidad' },
    { key: 'bancos', label: 'Bancos / asientos', group: 'Servicios' },
    { key: 'ayudaMovilidad', label: 'Ayuda a la movilidad', group: 'Servicios' },
    { key: 'lenguajeSimple', label: 'Lenguaje simple', group: 'Servicios' },
    { key: 'accesoPerrosGuias', label: 'Acceso a perros guía', group: 'Servicios' },
    { key: 'accesoPerrosAsistencia', label: 'Acceso a perros de asistencia', group: 'Servicios' },
    { key: 'salaLactancia', label: 'Sala de lactancia', group: 'Familiar' },
    { key: 'cambiador', label: 'Cambiador', group: 'Familiar' },
    { key: 'visitasGrupales', label: 'Visitas grupales', group: 'Familiar' },
    { key: 'guiasTuristicosMultiidioma', label: 'Guías turísticos multiidioma', group: 'Multiidioma' },
    { key: 'elementosAudiovisualesMultiidioma', label: 'Elementos audiovisuales multiidioma', group: 'Multiidioma' },
    { key: 'documentacionMultiidioma', label: 'Documentación multiidioma', group: 'Multiidioma' }
  ];

  // Resultado final para la vista
  keyOrder = (a: any, b: any): number => {
  if (a.key === 'Categorías') return -1;
  if (b.key === 'Categorías') return 1;
  return a.key.localeCompare(b.key);
};

  groupedFilters: {
  [group: string]: { key: string; label: string }[];
} = {};


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userFavFilter'] && this.userFavFilter) {
      this.buildSelectedFilters();
    }
  }

private buildSelectedFilters(): void {
  this.groupedFilters = {};

  Object.entries(this.userFavFilter).forEach(([key, value]) => {
    if (value !== true) return;

    const category = this.categories.find(c => c.type === key);
    if (category) {
      this.addToGroup('Categorías', key, category.name);
      return;
    }

    const acc = this.accesibilityOptions.find(opt => opt.key === key);
    if (acc) {
      this.addToGroup(acc.group, key, acc.label);
    }
  });
}

 private addToGroup(group: string, key: string, label: string): void {
  if (!this.groupedFilters[group]) {
    this.groupedFilters[group] = [];
  }
  this.groupedFilters[group].push({ key, label });
}

removeFilter(filterKey: string) {
  (this.userFavFilter as any)[filterKey] = false;
  this.buildSelectedFilters();

  this.draftChanged.emit(this.userFavFilter);
}

hasFilters(): boolean {
  return Object.keys(this.groupedFilters).length > 0;
}

onSave() {
  this.saveClicked.emit();
}

}