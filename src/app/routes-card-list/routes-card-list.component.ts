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
      src:'routesImage/family.jpeg'},

      {name: 'Silenciosa',
      src:'routesImage/silenciosa.jpg'},

      {name:'Recomendada',
      src:'routesImage/recomendada.jpg'}
        
    ];


}
