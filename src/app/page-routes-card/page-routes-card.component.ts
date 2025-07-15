import { Component, Input } from '@angular/core';
import { imagenRoutes } from '../models/routes-card.model';


@Component({
  selector: 'app-page-routes-card',
  imports: [],
  templateUrl: './page-routes-card.component.html',
  styleUrl: './page-routes-card.component.css'
})
export class pageRoutesCardComponent {
  /*@Input() nameRoutes:string='';*/

@Input() routesName: imagenRoutes=
   {name:'',
   src:''}
    
  }
