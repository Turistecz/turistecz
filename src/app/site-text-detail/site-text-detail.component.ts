import { Component, Input, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { sitioResponse } from '../models/details-routes';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-site-text-detail',
  imports: [],
  templateUrl: './site-text-detail.component.html',
  styleUrl: './site-text-detail.component.css'
})
export class SiteTextDetailComponent {
  constructor() {}

@Input() oneSite: sitioResponse = {
  imagenes: {
    id: '',
    url: '',
    nombre:''    
    } 
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['oneSite']) {
      console.log('oneSite changed:', changes['oneSite'].currentValue);
      this.oneSite = {
        imagenes: {
          id: changes['oneSite'].currentValue.id,
          url: changes['oneSite'].currentValue.url,
          nombre:changes['oneSite'].currentValue.nombre    
        }   
      };
    }
  }

}
