import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RoutesCardComponent } from '../routes-card/routes-card.component';
import { RoutesService } from '../services/routes.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute} from '@angular/router';
import { RoutesPage } from '../models/routes.model';

@Component({
  selector: 'app-page-routes',
  imports: [CommonModule, RoutesCardComponent],
  templateUrl: './page-routes.component.html',
  styleUrl: './page-routes.component.css'
})
export class pageRoutesComponent {

  private route = inject(ActivatedRoute);
  constructor(private http: HttpClient,private routeService: RoutesService) {}

   routesName: RoutesPage[]=[];

  async loadAllRoutes(): Promise<any> {
    try {
      const datos = await this.routeService.getAllRoutes().subscribe(
        datos => {
          this.routesName = datos // Aqui cargamos los datos de rutas como viene en la interface de RoutesPage[]
          }
        )
      return datos  
      }   
    catch (error) {
        console.error('Error al cargar Rutas:', error);
    }   
  } 
  
  async ngOnInit(): Promise<void> {
    await this.loadAllRoutes(); // Muestra todas las rutas
  }
}