// src/app/gastronomy/gastronomy-list/gastronomy-list.component.ts
import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { Gastronomy } from '../models/gastronomy.model';

@Component({
  selector: 'app-gastronomy-list',
  standalone: true,
  imports: [CommonModule,PaginationComponent],
  templateUrl: './gastronomy-list.component.html',
  styleUrls: ['./gastronomy-list.component.css']
})
export class GastronomyListComponent implements OnChanges {

  @Input() items: Gastronomy[] = [];

  pagedItems: Gastronomy[] = [];
  page = 1;
  pageSize = 21;

  images: string[] = [
    '/assets/rest1.jpg',
    '/assets/rest2.jpg',
    '/assets/rest3.jpg'
  ];

  ngOnChanges(): void {
    this.updatePage();
  }

  updatePage(): void {
    const start = (this.page - 1) * this.pageSize;
    this.pagedItems = this.items.slice(start, start + this.pageSize);
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.updatePage();
  }

  openUrl(url?: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
