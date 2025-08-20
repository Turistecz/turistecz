import { Component, inject } from '@angular/core';
import { RoutesPage } from '../models/routes.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RoutesService } from '../services/routes.service';
import { firstValueFrom } from 'rxjs';
import { FrontDetailCardComponent } from "../front-detail-card/front-detail-card.component";
import { SiteTextDetailComponent } from "../site-text-detail/site-text-detail.component";
import { CommonModule } from '@angular/common';
import { routeDetails } from '../models/details-routes';

@Component({
  selector: 'app-detail-route',
  imports: [FrontDetailCardComponent, SiteTextDetailComponent,CommonModule],
  templateUrl: './detail-route.component.html',
  styleUrl: './detail-route.component.css'
})
export class DetailRouteComponent {

  private route = inject(ActivatedRoute);
  constructor(private http: HttpClient,private routeService: RoutesService) {}


  // routesName: RoutesPage[]=[];
  oneRoute: routeDetails = {
    id:0,
    imagen_destacada: '',
    nombre:'',
    descripcion: '',
  } ;

  /*  INYECCION DEL SERVICIO*/

  /* Carga todas las rutas mapeadas (filtradas) por nombre, descripcion y duracion.*/
  /* Si quieres mostrar mas campos, añadelos en datos: {}*/

  // async loadAllRoutes(): Promise<any> {
  //   try {
  //     const datos = await this.routeService.getAllRoutes().subscribe(
  //       datos => {
  //         this.routesName = datos 
  //         }
  //       )
        
  //     return datos  
  //     }   
  //   catch (error) {
  //       console.error('Error al cargar Rutas:', error);
  //   }   
  // } 
  
  /*Carga la ruta segun el id */
  /* El id se coloca en el oninit de abajo */
  async loadRoutebyId(id: number): Promise<any> {
    try {
      const datos = await firstValueFrom(this.routeService.getRouteById(id));
      this.oneRoute = datos; 
      console.log(this.oneRoute);
      return datos;
    } catch (error) {
      console.error('Error al cargar ruta por ID:', error);
      throw error;
    }
  }

  /*Carga la ruta segun el nombre */
  /* El nombre se coloca en el oninit de abajo */
  // async loadRoutesbyName(name: string): Promise<any> {
  //   try {
  //     const datos = await firstValueFrom(this.routeService.routesLikeByName(name));
  //     return datos;
  //   } catch (error) {
  //     console.error('Error al cargar ruta por ID:', error);
  //     throw error;
  //   }
  // }

  // /*Carga la ruta segun el id */
  /* El id se coloca en el oninit de abajo */
  // async loadRoutesSite(id: string): Promise<any> {
  //   try {
  //     const datos = await firstValueFrom(this.routeService.getRouteSites(id));
  //     return datos;
  //   } catch (error) {
  //     console.error('Error al cargar ruta por ID:', error);
  //     throw error;
  //   }
  // }

  async ngOnInit(): Promise<void> {
    // await this.loadAllRoutes(); // Muestra todas las rutas
    await this.loadRoutebyId(1);  // Muestra una ruta segun el id
    // await this.loadRoutesbyName('Romana'); // Muestra una ruta segun el nombre
    // await this.loadRoutesSite("1");  // Muestra todos los sitios de una ruta segun el id
  }

}
    

