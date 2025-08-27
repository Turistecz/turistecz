import { Component, Input, SimpleChanges } from '@angular/core';
import { textoDetails } from '../models/details-routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-detail',
  imports: [CommonModule],
  templateUrl: './text-detail.component.html',
  styleUrl: './text-detail.component.css'
})
export class TextDetailComponent {
  constructor() {}

@Input() oneText:textoDetails = {
   nombre: '',
    sitios_ruta: {
      texto: ''
    }
  };

@Input() oneName:string = '';

    ngOnChanges(changes: SimpleChanges) {
    if (changes['oneText']) {
      console.log('onetexxtoo changed:', changes['oneText'].currentValue);
      this.oneText = {
        nombre: changes['oneText'].currentValue.nombre,
        sitios_ruta: {
          texto: changes['oneText'].currentValue.texto 
        }
      };
      console.log('oneText changed2:', this.oneText);
    }
  }

}
