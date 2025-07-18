// import { routes } from './../app.routes';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { imagenRoutes } from '../models/routes-card.model';
import { RoutesCardComponent } from '../routes-card/routes-card.component';
import { RoutesService } from '../services/routes.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { RouteResponse, RouteSites, RoutesPage } from '../models/routes.model';



@Component({
  selector: 'app-page-routes',
  imports: [CommonModule, RoutesCardComponent],
  templateUrl: './page-routes.component.html',
  styleUrl: './page-routes.component.css'
})
export class pageRoutesComponent {

  private route = inject(ActivatedRoute);
  constructor(private http: HttpClient,private routeService: RoutesService) {}


   routeSites:RouteSites={
    id:0,
    orden:0,
    texto:""
}
  allRoutes:RoutesPage={
        id:1,
        nombre:"",
        descripcion:"",
        duracion:"",
        imagen_destacada:"",
        subtitulo:"",
        sitios_ruta: []

  }

  routeResponse: RouteResponse[] =[]

 
   routesName: imagenRoutes[]=[
    {
      name:'Familia',
      subtitle: 'wiii',
      src:'routesImage/family.jpeg'},
 
    ];

  /*  INJECCION DEL SERVICIO*/

  /* Carga todas las rutas mapeadas (filtradas) por nombre, descripcion y duracion.*/
  /* Si quieres mostrar mas campos, añadelos en datos: {}*/
  // async loadAllRoutes(): Promise<any> {
  //   try {
  //     const datos = await firstValueFrom(this.routeService.getAllRoutes());
  //     const allRoutes= datos.map((datos: { nombre: string; descripcion:string; duracion:string}) => {
  //       return [datos.nombre,datos.descripcion, datos.duracion]
  //     })
  //   console.log(allRoutes)
  //   } catch (error) {
  //       console.error('Error al cargar Rutas:', error);
  //   }   
  // }  


  async loadAllRoutes(): Promise<any> {
    try {
      const datos = await this.routeService.getAllRoutes();
      console.log(datos)
      return datos  
      }   
    catch (error) {
        console.error('Error al cargar Rutas:', error);
    }   
  }  
    
  /*Carga la ruta segun el id */
  /* El id se coloca en el oninit de abajo */
  async loadRoutebyId(id: string): Promise<any> {
    try {
      const datos = await firstValueFrom(this.routeService.getRouteById(id));
      console.log('Ruta recibida:', datos);
      return datos;
    } catch (error) {
      console.error('Error al cargar ruta por ID:', error);
      throw error;
    }
  }

  /*Carga la ruta segun el nombre */
  /* El nombre se coloca en el oninit de abajo */
  async loadRoutesbyName(name: string): Promise<any> {
    try {
      const datos = await firstValueFrom(this.routeService.routesLikeByName(name));
      console.log('Ruta recibida:', datos);
      return datos;
    } catch (error) {
      console.error('Error al cargar ruta por ID:', error);
      throw error;
    }
  }

  /*Carga la ruta segun el id */
  /* El id se coloca en el oninit de abajo */
  async loadRoutesSite(id: string): Promise<any> {
    try {
      const datos = await firstValueFrom(this.routeService.getRouteSites(id));
      console.log('Ruta recibida:', datos);
      return datos;
    } catch (error) {
      console.error('Error al cargar ruta por ID:', error);
      throw error;
    }
  }

  async ngOnInit(): Promise<void> {
  await this.loadAllRoutes(); // Muestra todas las rutas
  // await this.loadRoutebyId("1"); // Muestra una ruta segun el id
  // await this.loadRoutesbyName('Romana'); // Muestra una ruta segun el nombre
   // await this.loadRoutesSite("1"); // Muestra todos los sitios de una ruta segun el id
  }
  
}
    
    


