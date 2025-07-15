import { Component, Input } from '@angular/core';
import { imagenRoutes } from '../models/routes-card.model';


@Component({
  selector: 'app-routes-card',
  imports: [],
  templateUrl: './routes-card.component.html',
  styleUrl: './routes-card.component.css'
})
export class RoutesCardComponent {
  /*@Input() nameRoutes:string='';*/

@Input() routesName: imagenRoutes=
   {name:'',
    subtitle: '',
    src:''}
    
  }
