import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RoutesService } from '../services/routes.service';
import { firstValueFrom } from 'rxjs';
import { FrontDetailCardComponent } from "../front-detail-card/front-detail-card.component";
import { CommonModule } from '@angular/common';
import { mapRoute, routeDetails, textoDetails } from '../models/details-routes';
import { TextDetailComponent } from "../text-detail/text-detail.component";
import { MapComponent } from '../map/map.component';
import { MonumentServiceService } from '../services/monument-service.service';


@Component({
  selector: 'app-detail-route',
  imports: [FrontDetailCardComponent, CommonModule, TextDetailComponent, MapComponent],
  templateUrl: './detail-route.component.html',
  styleUrl: './detail-route.component.css'
})
export class DetailRouteComponent {

  private route = inject(ActivatedRoute);
  constructor(private http: HttpClient, private routeService: RoutesService, private monumentService: MonumentServiceService) {}

  /* FRONT DETAIL */
  oneRoute: routeDetails = {
    id:0,
    imagen_destacada: '',
    nombre:'',
    descripcion: '',
  } ;

  idRuta!:number;

  /* SITE & TEXT DETAIL */
  routeText: textoDetails [] =[];

  /* MAP */
  idsSitiosRuta:any[]=[];
  todosSitios:any[]=[];
  mapRoutes:mapRoute[]=[];

  /* FRONT DETAIL */
  /*Carga la ruta segun el id */
  /* El id se coloca en el oninit de abajo */
  async loadRoutebyId(id: number): Promise<any> {
    try {
      const datos = await firstValueFrom(this.routeService.getRouteById(id));
      this.oneRoute = datos;
      this.idRuta = datos.id;
      return this.oneRoute;
    } 
    catch (error) {
      console.error('Error al cargar ruta por ID:', error);
      throw error;
    }
  }

  /* SITE & TEXT DETAIL */
  // /*Carga el sitio segun el id */
  /* El id se coloca en el oninit de abajo */
  
  async loadRoutesSite(id: number): Promise<any> {
    try {
      const datos = await firstValueFrom(this.routeService.getRouteSites(id));
      this.routeText = datos;
      /* MAP → recuperar id sitios de la ruta */
      this.idsSitiosRuta = datos.map((item: any) => item.idSitio);
    } 
    catch (error) {
      console.error('Error al cargar ruta por ID:', error);
      throw error;
    }
  }

  /* MAP → traer todos los sitos */
  async loadSite(): Promise<void> {
    try {
      const datos = await firstValueFrom(this.monumentService.getMonumentsNames());
      this.todosSitios = datos; 
    } 
    catch (error) {
      console.error('Error al cargar ruta por ID:', error);
      throw error;
    }
  }

  /* Filtrar sitios de la ruta */
  async filtrarSitiosRuta(){
    this.mapRoutes = this.todosSitios
    .filter(sitio => this.idsSitiosRuta.includes(sitio.id)) 
    .map(sitio => ({                                      
      idSitio: sitio.id,
      nombre: sitio.nombre,
      longitud: sitio.longitud,
      latitud: sitio.latitud
    }));
    // console.log('Sitios de esta ruta:', this.mapRoutes);
  }

  async ngOnInit(): Promise<void> {
    this.idRuta = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idRuta) {
      await this.loadRoutebyId(this.idRuta);
      await this.loadRoutesSite(this.idRuta);
    }
    /* MAP */
    await this.loadSite();
    await this.filtrarSitiosRuta();
  }

}
    

