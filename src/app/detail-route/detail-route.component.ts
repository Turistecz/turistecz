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

  name:string = 'app-detail-route';

  /* SITE & TEXT DETAIL */
  routeText: textoDetails [] =[];

  /* MAP */
  idsSitiosRuta:any[]=[]; // Almacena los ids de los sitios de la ruta
  todosSitios:any[]=[]; // Almacena todos los sitios
  mapRoutes:mapRoute[]=[]; // Almacena los datos concretos que se envian al mapa

  /* FRONT DETAIL */
  async loadRoutebyId(id: number): Promise<any> {
    try {
      const datos = await firstValueFrom(this.routeService.getRouteById(id));
      this.oneRoute = datos;
      this.idRuta = datos.id;
      return this.oneRoute;
    } 
    catch (error) {
      console.error('Error al cargar ruta por IDRuta:', error);
      throw error;
    }
  }

  /* SITE & TEXT DETAIL */
  async loadRoutesSite(id: number): Promise<any> {
    try {
      const datos = await firstValueFrom(this.routeService.getRouteSites(id));
      this.routeText = datos;
      /* MAP */
      /* idsSitiosRuta → guarda el id sitios de la ruta ORDENADOS en un array */
      this.idsSitiosRuta = datos.map((item: any) => item.idSitio);
    } 
    catch (error) {
      console.error('Error al cargar los sitios de la ruta por IDRuta:', error);
      throw error;
    }
  }

  /* MAP */
  /* loadSite() → trae TODOS los sitios de la ruta */
  async loadSite(): Promise<void> {
    try {
      const datos = await firstValueFrom(this.monumentService.getMonumentsNames());
      this.todosSitios = datos; 
    } 
    catch (error) {
      console.error('Error al cargar los sitios:', error);
      throw error;
    }
  }

  // filtrarSitiosRuta() → crea una nueva array de objetos con los datos necesarios de cada sitio de la ruta en el orden correcto. 
  // Se guarda en mapRoutes
  async filtrarSitiosRuta() {
    this.mapRoutes = this.idsSitiosRuta 
    .map(id => {
      const sitio = this.todosSitios.find(site => site.id === id)
      return {
        idSitio: sitio.id,
        nombre: sitio.nombre,
        longitud: sitio.longitud,
        latitud: sitio.latitud,
      };
    })
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
    

