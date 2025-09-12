import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  
  Math= Math; 
  @Input() page: number = 1;
  @Input() pageSize: number = 21;
  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pagesToShow(): number[] {
    let pages: number[] = [];
    let start = this.page - 2;
    let end = this.page + 2;

    if (start < 1) start = 1;
    if (end > this.totalPages) end = this.totalPages;

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

      get startIndex(): number {
      return (this.page - 1) * this.pageSize + 1;
    }

    get endIndex(): number {
      return Math.min(this.page * this.pageSize, this.totalItems);
    }

    onPageChange(newPage: number) {
    this.page = newPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToPage(num: number) {
    if (num >= 1 && num <= this.totalPages) {
      this.pageChange.emit(num);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  nextPage() {
    this.goToPage(this.page + 1);
  }

  prevPage() {
    this.goToPage(this.page - 1);
  }
}