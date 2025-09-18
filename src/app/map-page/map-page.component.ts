import { Component, Input } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { FilterComponent } from "../filter/filter.component";
import { Category } from '../models/filter.model';

@Component({
  selector: 'app-map-page',
  imports: [MapComponent, FilterComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})
export class MapPageComponent {



 @Input() categories:Category[]=[]
 
}
