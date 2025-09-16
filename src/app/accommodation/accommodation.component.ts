import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { AccommodationService } from '../services/accommodation.service';
import { Accommodation } from '../models/accommodation.models';
import { AccommodationListComponent } from '../accommodation-list/accommodation-list.component';

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

  ngOnInit(): void {
    this.cargando = true;

    this.accommodationService.getAccommodations(5000).subscribe({
      next: (data) => {
        // Filtrar por solo "HOTEL"
        const soloHoteles = data.filter(a => {
          const titulo = (a.title ?? '').toUpperCase();
          return titulo.includes('HOTEL');
        });

        this.accommodations = soloHoteles;
        this.cargando = false;
      }
    });
  }
}