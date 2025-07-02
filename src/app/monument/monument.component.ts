import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { cardsHome, cardsHomeResponse } from '../place-card/place-card.model';
import { MonumentItem } from '../monument-list/monument.model';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-monument',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './monument.component.html',
  styleUrl: './monument.component.css'
})
export class MonumentComponent implements OnInit {
   private route = inject(ActivatedRoute);

  constructor(private http: HttpClient) {}

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
  imagenes: [{
    url: "",
    nombre: "",
    copy: "",
    id: 0
  }]
  };

  async loadImages(): Promise<void> {
     const variableNumero = this.route.snapshot.paramMap.get('id'); 
    try {
      const datos = await firstValueFrom(this.http.get<any>(
        'http://localhost:8080/api/sitioCorrespondienteALaImagen?id=${variableNumero}'
      ));

      this.monumento = datos;

      console.log(this.monumento);
      console.log(this.monumento.imagenes);
    } catch (error) {
      console.error('Error al cargar monumentos:', error);
    }
  }

  @Input() data = {
    id: -1,
    title: "",
    description: "",
    address: "",
    horario: "",
    phone: "",
    price: "",
    image: "",
    uri: ""
  };

  removeHTMLTags(text: string): string {
    return text ? text.replace(/<[^>]*>/g, '').trim() : "";
  }

  get cleanHorario(): string {
    return this.removeHTMLTags(this.data.horario);
  }

  get cleanDescription(): string {
    return this.removeHTMLTags(this.data.description);
  }

  get cleanPrice(): string {
    return this.removeHTMLTags(this.data.price);
  }

  // Un solo ngOnInit combinando las dos tareas
  async ngOnInit(): Promise<void> {
    await this.loadImages();

    this.data.description = this.removeHTMLTags(this.data.description);
    this.data.price = this.removeHTMLTags(this.data.price);
    this.data.horario = this.removeHTMLTags(this.data.horario);
  }
}