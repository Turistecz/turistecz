import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RoutesCardComponent } from '../routes-card/routes-card.component';
import { imagenRoutes } from '../models/routes-card.model';
import { RoutesPage } from '../models/routes.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RoutesService } from '../services/routes.service';
import { firstValueFrom } from 'rxjs';


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
  async loadAllRoutes(): Promise<void> {
    try {
      console.log('Aqui ha entrado');
      const datos = await firstValueFrom(this.routeService.getAllRoutes());
      this.routesName = datos.slice(0, 3); // usar slice aquí
      console.log(this.routesName);
    } catch (error) {
      console.error('Error al cargar Rutas:', error);
    }
  }
  async ngOnInit(): Promise<void> {
    await this.loadAllRoutes(); // Muestra todas las rutas
  };
}
