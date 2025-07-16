import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MonumentItem } from '../models/monument.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { MonumentServiceService } from '../services/monument-service.service';
import { MapComponent } from "../map/map.component";

@Component({
  selector: 'app-monument',
  standalone: true,
  imports: [CommonModule, RouterModule, MapComponent],
  templateUrl: './monument.component.html',
  styleUrl: './monument.component.css'
})
export class MonumentComponent implements OnInit {
   private route = inject(ActivatedRoute);

  constructor(private http: HttpClient, private apiConnectService: MonumentServiceService) {}

  monumentNumber: number = -1;
  monuments: MonumentItem[] = [];
  monumentsFiltered: MonumentItem[] = [];
  monumentsNames: string[] = [];

  //cards: cardsHome[] = [];
  monumento: MonumentItem = {
    id: 0,
    title: "",
    description: "",
    address: "",
    horario: "",
    phone: "",
    price: "",
    image: "",
    uri: "",
    imagenes: [
      {
        url: "",
        nombre: "",
        copy: "",
        id: 0
      }
    ]
  };

  coords = {
    latitud: 0,
    longitud: 0
  };


  async loadImages(): Promise<void> {
     const variableNumero = this.route.snapshot.paramMap.get('id'); 
    try {
      const datos = await firstValueFrom(this.http.get<any>(
        `http://localhost:8080/api/sitioCorrespondienteALaImagen?id=${variableNumero}`
      ));

      this.monumento = datos;
      this.coords = datos;

    } catch (error) {
      console.error('Error al cargar monumentos:', error);
    }
  }

  async loadMonuments(): Promise<void> {
    try {
      const datos = await firstValueFrom(this.apiConnectService.getMonuments());
      //this.monumentServiceService.monuments = datos.result;
      this.monuments = datos.result;
      //this.monumentsFiltered = this.apiConnectService.filterMonuments(this.monuments);
      this.apiConnectService.filterTopMonuments(this.monuments).subscribe(filtrados => {
        this.monumentsFiltered = filtrados;
      });
    
    } catch (error) {
      console.error('Error al cargar monumentos:', error);
    }
  
  }

  removeHTMLTags(text: string): string {
    return text ? text.replace(/<[^>]*>/g, '').trim() : "";
  }

  get cleanHorario(): string {
    return this.removeHTMLTags(this.monumentsFiltered[this.monumentNumber].horario);
  }

  get cleanDescription(): string {
    return this.removeHTMLTags(this.monumentsFiltered[this.monumentNumber].description);
  }

  get cleanPrice(): string {
    return this.removeHTMLTags(this.monumentsFiltered[this.monumentNumber].price);
  }

  get img(): string {
    return this.monumento.imagenes[this.monumentNumber].url;
  }

  // Un solo ngOnInit combinando las dos tareas
  async ngOnInit(): Promise<void> {
    await this.loadImages();
    await this.loadMonuments();
    this.apiConnectService.getMonumentsNames().subscribe(data => {
      data.map(monumento => this.monumentsNames.push(monumento.nombre));
    });  

    this.monumentNumber = Number(this.route.snapshot.paramMap.get('id'));
    this.monumentNumber--;

  }
}