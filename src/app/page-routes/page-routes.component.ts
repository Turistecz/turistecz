// import { routes } from './../app.routes';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { pageRoutesCardComponent } from '../page-routes-card/page-routes-card.component';
import { imagenRoutes } from '../routes-card/routes-card.model';
import { RoutesService } from '../services/routes.service';

@Component({
  selector: 'app-page-routes',
  imports: [CommonModule,pageRoutesCardComponent],
  templateUrl: './page-routes.component.html',
  styleUrl: './page-routes.component.css'
})
export class pageRoutesComponent {

    constructor(private routeService: RoutesService) {}

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
