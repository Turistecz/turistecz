import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { AccommodationService } from '../services/accommodation.service';
import { Accommodation } from '../models/accommodation.models';
import { AccommodationListComponent } from '../accommodation-list/accommodation-list.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-accommodation',
  imports: [CommonModule, AccommodationListComponent],
  templateUrl: './accommodation.component.html',
  styleUrl: './accommodation.component.css'
})
export class AccommodationComponent {
  accommodations: Accommodation[] = [];
  cargando = false;

  constructor(private accommodationService: AccommodationService) {}

  async ngOnInit(): Promise<void> {
    this.cargando = true;
    await this.loadAccommodation();
    this.cargando = false;
  }

  async loadAccommodation(): Promise<void> {
    try {
      if (localStorage.getItem('accommdationGlobal')) {
        this.accommodations = JSON.parse(localStorage.getItem('accommdationGlobal') || '{}');
      } else {
        const datos = await firstValueFrom(this.accommodationService.getAccommodations(500));
        // Filtrar por solo "HOTEL"
        const soloHoteles = datos.filter(a => {
          const titulo = (a.title ?? '').toUpperCase();
          return titulo.includes('HOTEL');
        });
        this.accommodations = soloHoteles;
        localStorage.setItem('accommdationGlobal', JSON.stringify(datos));
      }
    } catch (error) {
      console.error('Error al cargar alojamientos:', error);
    }
  }
}