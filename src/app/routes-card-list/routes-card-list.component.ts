import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoutesCardComponent } from '../routes-card/routes-card.component';
import { imagenRoutes } from '../routes-card/routes-card.model';

@Component({
  selector: 'app-routes-card-list',
  imports: [CommonModule,RoutesCardComponent],
  templateUrl: './routes-card-list.component.html',
  styleUrl: './routes-card-list.component.css'
})
export class RoutesCardListComponent {

   routesName: imagenRoutes[]=[
    {
      name:'Familia',
      subtitle: 'wiii',
      src:'routesImage/family.jpeg'},

      {name: 'Romana',
      subtitle: 'wiii',
      src:'images/images_sitios/14_EstatuaEmperadorAugusto.jpg'},

      {name:'Recomendada',
      subtitle: 'wiii',
      src:'routesImage/recomendada.jpg'}
        
    ];


}
