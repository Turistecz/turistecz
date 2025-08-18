import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoutesCardComponent } from '../routes-card/routes-card.component';
import { imagenRoutes } from '../models/routes-card.model';

@Component({
  selector: 'app-routes-card-list',
  imports: [CommonModule,RoutesCardComponent],
  templateUrl: './routes-card-list.component.html',
  styleUrl: './routes-card-list.component.css'
})
export class RoutesCardListComponent {

   routesName: imagenRoutes[]=[
    {
      nombre:'Familiar',
      subtitulo: 'wiii',
      imagen_destacada:'images/rutas/portada_ruta_familiar.jpg'},

      {nombre: 'Romana',
      subtitulo: 'wiii',
      imagen_destacada:'images/rutas/portada_ruta_romana.jpg'},

      {nombre:'Mudéjar',
      subtitulo: 'wiii',
      imagen_destacada:'images/rutas/portada_ruta_mudejar.jpg'}
        
    ];


}
