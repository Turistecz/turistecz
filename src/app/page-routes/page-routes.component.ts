// import { routes } from './../app.routes';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { pageRoutesCardComponent } from '../page-routes-card/page-routes-card.component';
import { imagenRoutes } from '../models/routes-card.model';
import { RoutesCardComponent } from '../routes-card/routes-card.component';

@Component({
  selector: 'app-page-routes',
  imports: [CommonModule, RoutesCardComponent],
  templateUrl: './page-routes.component.html',
  styleUrl: './page-routes.component.css'
})
export class pageRoutesComponent {

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
