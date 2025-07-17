// import { routes } from './../app.routes';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { pageRoutesCardComponent } from '../page-routes-card/page-routes-card.component';
import { imagenRoutes } from '../models/routes-card.model';
import { RoutesCardComponent } from '../routes-card/routes-card.component';
import { RoutesService } from '../services/routes.service';

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
 
    ];


}
