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
      name:'Familiar',
      subtitle: 'wiii',
      src:'images/rutas/portada_ruta_familiar.jpg'},

      {name: 'Romana',
      subtitle: 'wiii',
      src:'images/rutas/portada_ruta_romana.jpg'},

      {name:'Mudéjar',
      subtitle: 'wiii',
      src:'images/rutas/portada_ruta_mudejar.jpg'}
        
    ];


}
