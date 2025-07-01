// import { routes } from './../app.routes';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoutesCardComponent } from '../routes-card/routes-card.component';
import { imagenRoutes } from '../routes-card/routes-card.model';

@Component({
  selector: 'app-page-routes',
  imports: [CommonModule,RoutesCardComponent],
  templateUrl: './page-routes.component.html',
  styleUrl: './page-routes.component.css'
})
export class pageRoutesComponent {

   routesName: imagenRoutes[]=[
    {
      name:'Familia',
      src:'routesImage/family.jpeg'},

      {name: 'Silenciosa',
      src:'routesImage/silenciosa.jpg'},

      {name:'Recomendada',
      src:'routesImage/recomendada.jpg'},
         
      {name:'Familia',
      src:'routesImage/family.jpeg'},

      {name: 'Silenciosa',
      src:'routesImage/silenciosa.jpg'},

      {name:'Recomendada',
      src:'routesImage/recomendada.jpg'}
        
    ];


}
