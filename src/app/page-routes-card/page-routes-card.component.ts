import { Component, inject, Input } from '@angular/core';
import { imagenRoutes, /*routes*/ } from './routes-card.model';
import { RoutesService } from '../services/routes.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-page-routes-card',
  imports: [],
  templateUrl: './page-routes-card.component.html',
  styleUrl: './page-routes-card.component.css'
})
export class pageRoutesCardComponent {

  private route = inject(ActivatedRoute);

  constructor(private http: HttpClient,private routeService: RoutesService) {}

@Input() routesName: imagenRoutes=
   {name:'',
   src:''}
  /*
  ruta: routes = 
    {
      id:1,
      nombre:"",
      descripcion:""
    }

  routes: routes[] = [];
 
  async loadRoutes(): Promise<any> {
    try {
      const datos = await firstValueFrom(this.routeService.getAllRoutes());
      this.routes = datos;
    } catch (error) {
        console.error('Error al cargar Rutas:', error);
    }   
  }  

  async ngOnInit(): Promise<void> {
    await this.loadRoutes();
    console.log(this.routes) 
  }
  */
}