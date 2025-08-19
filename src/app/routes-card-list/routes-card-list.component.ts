import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RoutesCardComponent } from '../routes-card/routes-card.component';
import { imagenRoutes } from '../models/routes-card.model';
import { RoutesPage } from '../models/routes.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RoutesService } from '../services/routes.service';

@Component({
  selector: 'app-routes-card-list',
  imports: [CommonModule,RoutesCardComponent],
  templateUrl: './routes-card-list.component.html',
  styleUrl: './routes-card-list.component.css'
})
export class RoutesCardListComponent {

  private route = inject(ActivatedRoute);
  constructor(private http: HttpClient,private routeService: RoutesService) {}

  routesName: RoutesPage[]=[];

     async loadAllRoutes(): Promise<any> {
    try {
      console.log('Aqui ha entrado')
      const datos = await this.routeService.getAllRoutes().subscribe(
        datos => {
          this.routesName = datos.slice(0,3)
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
  };
}
