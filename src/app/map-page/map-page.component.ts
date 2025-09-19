import { Component, Input } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { FilterComponent } from "../filter/filter.component";
import { Category } from '../models/filter.model';
import { cardsHome } from '../place-card/place-card.model';
import { categories } from '../models/filter.data';
import { firstValueFrom } from 'rxjs';
import { MonumentServiceService } from '../services/monument-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map-page',
  imports: [MapComponent, FilterComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})
export class MapPageComponent {

 categories:Category[]= categories;
 places:cardsHome[]=[]
 sitios: any[]=[];

 name:string = 'app-map-page';

  constructor(private http: HttpClient, private monumentService: MonumentServiceService) {}


  async loadSite(): Promise<void> {
    try {
      if (localStorage.getItem('monumentDDBBGlobal')) {
        this.sitios = JSON.parse(localStorage.getItem('monumentDDBBGlobal') || '{}');
      } else {
        const datos = await firstValueFrom(this.monumentService.getMonumentsNames());
        this.sitios = datos; 
        localStorage.setItem('monumentDDBBGlobal', JSON.stringify(datos));
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

}
