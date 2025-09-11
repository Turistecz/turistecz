import { Component, Input, SimpleChanges } from '@angular/core';
import { textoDetails } from '../models/details-routes';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-text-detail',
  imports: [CommonModule,RouterLink],
  templateUrl: './text-detail.component.html',
  styleUrl: './text-detail.component.css'
})
export class TextDetailComponent {
  constructor() {}

@Input() oneText:textoDetails = {
    idSitio: 0,
    nombre: '',
    url: '',
    texto:'',
    idRuta:0
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['oneText']) {
      this.oneText = {
        idSitio: changes['oneText'].currentValue.idSitio,
        nombre: changes['oneText'].currentValue.nombre,
        url: changes['oneText'].currentValue.url,
        texto: changes['oneText'].currentValue.texto,
        idRuta: changes['oneText'].currentValue.idRuta
      };
    }
  }
}


