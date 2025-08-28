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
    imagenes: {
        url: ''
      },
    sitio_ruta_texto:''
  };

    ngOnChanges(changes: SimpleChanges) {
    if (changes['oneText']) {
      console.log('onetexxtoo changed:', changes['oneText'].currentValue);
      this.oneText = {
        nombre: changes['oneText'].currentValue.nombre,
        imagenes: {
          url: changes['oneText'].currentValue.imagenes.url,
        },
        sitio_ruta_texto: changes['oneText'].currentValue.sitio_ruta_texto}
      };
      console.log('oneText changed2:', this.oneText);
    }
  }


