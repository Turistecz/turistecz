import { Component, Input } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { FilterComponent } from "../filter/filter.component";
import { Category } from '../models/filter.model';
import { cardsHome } from '../place-card/place-card.model';
import { categories } from '../models/filter.data';
import { firstValueFrom } from 'rxjs';
import { MonumentServiceService } from '../services/monument-service.service';
import { HttpClient } from '@angular/common/http';
import { MonumentItem } from '../models/monument.model';

@Component({
  selector: 'app-map-page',
  imports: [MapComponent, FilterComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})
export class MapPageComponent {

 globalCategories:Category[]= categories;
 sitiosFiltrados: MonumentItem[] = [];
 name:string = 'app-map-page';

constructor(private http: HttpClient, private monumentService: MonumentServiceService) {}

  async loadSite(): Promise<void> {
    try {
      if (localStorage.getItem('monumentDDBBGlobal')) {
       this.sitiosFiltrados = JSON.parse(localStorage.getItem('monumentDDBBGlobal') || '{}');
      } else {
        this.sitiosFiltrados = await firstValueFrom(this.monumentService.getMonumentsNames()); 
        localStorage.setItem('monumentDDBBGlobal', JSON.stringify(this.sitiosFiltrados));
      }
    } 
    catch (error) {
      console.error('Error al cargar ruta por ID:', error);
      throw error;
    }
  }

  async ngOnInit(): Promise<void> {
    await this.loadSite();
  }

  updatePlaces(filteredPlaces: MonumentItem[]) {
    const idsFiltrados = filteredPlaces.map(p => p.id);
    this.sitiosFiltrados = this.sitiosFiltrados.filter(s => idsFiltrados.includes(s.id));
  }
}
