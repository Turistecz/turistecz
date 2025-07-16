// import { routes } from './../app.routes';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { pageRoutesCardComponent } from '../page-routes-card/page-routes-card.component';
import { imagenRoutes } from '../models/routes-card.model';
<<<<<<< HEAD
import { RoutesCardComponent } from '../routes-card/routes-card.component';
=======
import { RoutesService } from '../services/routes.service';
>>>>>>> 517978125af9058bd40d5dc58413b653abad2232

@Component({
  selector: 'app-page-routes',
  imports: [CommonModule, RoutesCardComponent],
  templateUrl: './page-routes.component.html',
  styleUrl: './page-routes.component.css'
})
export class pageRoutesComponent {

    constructor(private routeService: RoutesService) {}

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
      src:'routesImage/recomendada.jpg'},
         
      {name:'Familia',
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
