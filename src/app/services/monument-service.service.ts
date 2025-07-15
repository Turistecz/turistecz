import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonumentItem, MonumentResponse } from '../models/monument.model';
import { map } from 'rxjs/operators';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonumentServiceService {

  constructor(private http: HttpClient) { }

  monuments: MonumentItem[] = [];

  topMonuments: string[] = ['basílica de nuestra señora del pilar', 'palacio de la aljafería', 'Catedral del Salvador o La Seo y Museo de Tapices', 'Puente de Piedra', 
    'Puerta del Carmen', 'Monumento a los Sitios', 'Monumento a Agustina Zaragoza y a las Heroínas', 'Torreon de la Zuda', 'Murallas romanas', 'Mercado Central', 
    'Museo de Zaragoza: Secciones de Antiguedad y Bellas Artes', 'Museo Goya - Coleccion Ibercaja', 'Parque Grande Jose Antonio Labordeta', 'Monumento a Goya', 
    'Escultura El Alma del Ebro', 'Estatua del Emperador Augusto', 'Palacio de los Condes de Morata o Luna', 'Palacio de los Condes de Sastago', 'Casa de los Sitios' ];

  topMonumentsEmpty: string[] = [];
  topMonumentsEmpty2: string[] = [];

    
  filteredMonuments: MonumentItem[] = [];
  orderFilteredMonuments: MonumentItem[] = [];


  getMonuments(): Observable<MonumentResponse> {
    return this.http.get<MonumentResponse>('https://www.zaragoza.es/sede/servicio/monumento?rf=html&srsname=utm30n&start=0&rows=500&distance=500&locale=es');
  }

  getMonumentsNames(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/sitios');

  }

  //monumentArray param needs to be array monuments in monument.component
  getMonumentById(id: number, monumentArray: MonumentItem[]) {
    for (let monument of monumentArray){
      if (monument.id == id){
        return monument;
      }
    }
    return monumentArray[0];
  }

  //title param needs to be the exact same, but can be with lower or upper case
  //monumentArray param needs to be array monuments in monument.component
  getMonumentByName(title: string, monumentArray: MonumentItem[]) {
    for (let monument of monumentArray){
      if (monument.title.toLowerCase() == title){
        return monument;
      }
    }
    return monumentArray[0];
  }

  normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD') // descompone letras con tilde
      .replace(/[\u0300-\u036f]/g, '') // elimina las tildes
      .replace(/[^\w\s]/g, '') // elimina puntuación
      .trim();
  }
filterTopMonuments(monumentArray: MonumentItem[]): Observable<MonumentItem[]> {
  const normalize = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // elimina acentos, diéresis, tildes
    .replace(/[’‘”“"']/g, '')        // elimina comillas tipográficas y simples
    .replace(/[-‐‑‒–—―]/g, ' ')       // reemplaza guiones y rayas por espacio
    .replace(/[^\w\s]/g, '')          // elimina otros signos de puntuación
    .replace(/\s+/g, ' ')             // colapsa múltiples espacios
    .trim();
};

  const mapTitles = new Map<string, MonumentItem>();
  monumentArray.forEach(m => mapTitles.set(normalize(m.title), m));

  return this.getMonumentsNames().pipe(
    map(data => {
      const nombres = data
        .filter(m => m && m.nombre)
        .map(m => m.nombre);

      const filtrados = nombres
        .map(nombre => mapTitles.get(normalize(nombre)))
        .filter((m): m is MonumentItem => !!m);

      return filtrados;
    })
  );
}

  // filterTopMonuments(monumentArray: MonumentItem[]) {
  //   const map = new Map<string, MonumentItem>();

  //   monumentArray.forEach(m => {
  //     const key = this.normalize(m.title);
  //     map.set(key, m);
  //   });

  //   console.log(map);

  //   this.getMonumentsNames().subscribe(data => {
  //     data.map(monumento => this.topMonumentsEmpty.push(monumento.nombre));
  //   });  



  //   console.log(this.topMonumentsEmpty);


  //   return this.topMonumentsEmpty
  //     .map(name => map.get(this.normalize(name)))
  //     .filter((m): m is MonumentItem => !!m); // elimina nulls
  // }

  
 //array private y luego funciones get para acceder a los elementos
//añadirmetodo split para añadir monumentos al array en una posicion especifica cuando queramos
//añadir metodo para modificar posicion de un determinado monumento

}
