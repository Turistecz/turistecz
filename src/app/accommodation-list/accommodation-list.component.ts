import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accommodation } from '../models/accommodation.models';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-accommodation-list',
  imports: [CommonModule,PaginationComponent],
  templateUrl: './accommodation-list.component.html',
  styleUrl: './accommodation-list.component.css'
})
export class AccommodationListComponent {
  @Input() items: Accommodation[] = [];

  //  Variables de paginación
  page: number = 1;
  pageSize: number = 18; // ajusta al número de tarjetas por página que quieras

  get pagedItems(): Accommodation[] {
    const start = (this.page - 1) * this.pageSize;
    return this.items.slice(start, start + this.pageSize);
  }

  abrirEnlace(url?: string) {
    if (!url) return;

    window.open(url, '_blank');
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  
}
