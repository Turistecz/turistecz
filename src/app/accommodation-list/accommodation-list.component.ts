import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accommodation } from '../models/accommodation.models';

@Component({
  selector: 'app-accommodation-list',
  imports: [CommonModule],
  templateUrl: './accommodation-list.component.html',
  styleUrl: './accommodation-list.component.css'
})
export class AccommodationListComponent {
  @Input() items: Accommodation[] = [];

}
