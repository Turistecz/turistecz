// src/app/gastronomy/gastronomy.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams, } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GastronomyListComponent } from '../gastronomy-list/gastronomy-list.component';
import { Gastronomy } from '../models/gastronomy.model';

@Component({
  selector: 'app-gastronomy',
  standalone: true,
  imports: [CommonModule, HttpClientModule, GastronomyListComponent],
  templateUrl: './gastronomy.component.html',
  styleUrls: ['./gastronomy.component.css']
})
export class GastronomyComponent implements OnInit {

  gastronomy: Gastronomy[] = [];
  cargando = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const params = new HttpParams()
      .set('rf', 'json')        // importante para que devuelva JSON
      .set('srsname', 'utm30n')
      .set('start', 0)
      .set('rows', 5000000);

    this.http
  .get<any>('https://www.zaragoza.es/sede/servicio/restaurante', { params })
  .subscribe({
    next: (data) => {
      console.log('Respuesta API gastronomía RAW: ', data);

      // 1) Intentamos localizar el array de elementos
        let features: any[] = [];

        if (Array.isArray(data.features)) {
          features = data.features;
        } else if (Array.isArray(data.result)) {
          features = data.result;
        } else if (Array.isArray(data)) {
          features = data;
        } else {
          console.warn('No se ha encontrado un array de elementos en features/result/data');
        }

        // 2) Mapeamos cada elemento a tu interfaz Gastronomy
        this.gastronomy = features.map((f: any): Gastronomy => {
  const p = f.properties || f;

  return {
    title: p.title,
    streetAddress: p.streetAddress,
    postalCode: p.postalCode,
    addressLocality: p.addressLocality,
    tel: p.tel?.tel ?? p.tel,
    url: p.url,
    image: p.image ? 'https:' + p.image : undefined
  };
});


      this.cargando = false;
    },
    error: (err) => {
      console.error('Error cargando gastronomía', err);
      this.cargando = false;
    }
  });

  }
}