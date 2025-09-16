import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonumentItem, MonumentResponse } from '../models/monument.model';
import { map } from 'rxjs/operators';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonumentServiceService {

  constructor(private http: HttpClient) {}

  getMonuments(): Observable<MonumentResponse> {
     const monument = "https://www.zaragoza.es/sede/servicio/monumento.json";
    const Params = new HttpParams().set('rf', 'html').set('srsname', 'utm30n').set('start', '0').set('rows', '500').set('distance', '500').set('locale', 'es');
    const Headers = new HttpHeaders({
      Accept: 'application/geo+json', 
    });
    return this.http.get<MonumentResponse>(monument,{params: Params, headers: Headers});
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

}
