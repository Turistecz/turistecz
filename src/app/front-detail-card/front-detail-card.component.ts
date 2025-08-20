import { Component, Input } from '@angular/core';
import { imagenRoutes } from '../models/routes-card.model';
import { routeDetails } from '../models/details-routes';

@Component({
  selector: 'app-front-detail-card',
  imports: [],
  templateUrl: './front-detail-card.component.html',
  styleUrl: './front-detail-card.component.css'
})
export class FrontDetailCardComponent {

@Input() oneRoute: routeDetails =
   {
    id:0,
    imagen_destacada: '',
    nombre:'',
    descripcion: '',
  } 
  
}
