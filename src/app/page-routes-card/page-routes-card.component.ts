import { Component, Input } from '@angular/core';
import { imagenRoutes } from '../models/routes-card.model';
import { CommonModule } from '@angular/common';
import { RoutesCardComponent } from '../routes-card/routes-card.component';


@Component({
  selector: 'app-page-routes-card',
  imports: [CommonModule],
  templateUrl: './page-routes-card.component.html',
  styleUrl: './page-routes-card.component.css'
})
export class pageRoutesCardComponent {

@Input() routesName: imagenRoutes=
   {name:'',
    subtitle: '',
   src:''}
    
  }
