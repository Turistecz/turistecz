import { Component, Input } from '@angular/core';
import { imagenRoutes } from '../models/routes-card.model';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-routes-card',
  imports: [RouterLink],
  templateUrl: './routes-card.component.html',
  styleUrl: './routes-card.component.css'
})
export class RoutesCardComponent {  

@Input() routesName: imagenRoutes =
   {
    id:0,
    imagen_destacada: '',
    nombre:'',
    subtitulo: '' 
  };
  
}


