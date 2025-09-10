import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RoutesService } from '../services/routes.service';
import { firstValueFrom } from 'rxjs';
import { FrontDetailCardComponent } from "../front-detail-card/front-detail-card.component";
import { CommonModule } from '@angular/common';
import { routeDetails, textoDetails } from '../models/details-routes';
import { TextDetailComponent } from "../text-detail/text-detail.component";
import { imagenRoutes } from '../models/routes-card.model';

@Component({
  selector: 'app-detail-route',
  imports: [FrontDetailCardComponent, CommonModule, TextDetailComponent],
  templateUrl: './detail-route.component.html',
  styleUrl: './detail-route.component.css'
})
export class DetailRouteComponent {

  private route = inject(ActivatedRoute);
  constructor(private http: HttpClient,private routeService: RoutesService) {}

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

  /* FRONT DETAIL */
  /*Carga la ruta segun el id */
  /* El id se coloca en el oninit de abajo */
  async loadRoutebyId(id: number): Promise<any> {
    try {
      const datos = await firstValueFrom(this.routeService.getRouteById(id));
      this.oneRoute = datos;
      this.idRuta = datos.id;
      console.log("oneroute",this.oneRoute);
      return this.oneRoute;
    } catch (error) {
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
      console.log('routetext:',this.routeText);
    } catch (error) {
      console.error('Error al cargar ruta por ID:', error);
      throw error;
    }
  }

  async ngOnInit(): Promise<void> {
    this.idRuta = Number(this.route.snapshot.paramMap.get('id'));

    if (this.idRuta) {
      await this.loadRoutebyId(this.idRuta);
      await this.loadRoutesSite(this.idRuta);
    }
  }
}
    

