import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonumentItem, MonumentResponse } from '../monument-list/monument.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonumentServiceService {

  constructor(private http: HttpClient) { }

  monuments: MonumentItem[] = [];
  filtrados: MonumentItem[] = [];
  keyWords = ['goya','augusto','alfonso','batallador','pignatelli','palacio','basílica','catedral','monasterio','iglesia','museo'];
  place = ['plaza del pilar','plaza de los sitios','recinto expo','parque grande','coso','avenida césar augusto'];

  topMonuments: string[] = ['basílica de nuestra señora del pilar', 'palacio de la aljafería', 'Catedral del Salvador o La Seo y Museo de Tapices', 'Museo de Zaragoza: Secciones de Antigüedad  y Bellas Artes', 
    
  ];
  filteredMonuments: MonumentItem[] = [];
  orderFilteredMonuments: MonumentItem[] = [];
 
   //function to add scores to monuments to filter them
   scoreMonument(m: MonumentItem) {
     let score = 0;
     const title = m.title ? m.title.toLowerCase() : '';
     const desc = m.description ? m.description.toLowerCase() : '';

     if (this.keyWords.some(p => title.includes(p))) score += 3;
     if (this.place.some(u => desc.includes(u))) score += 2;
     if (title.includes('basílica de nuestra señora del pilar')) score += 10;
     if (title.includes('aljafería')) score += 9;
     if (title.includes('la seo')) score += 8;
     if (title.includes('puente de piedra')) score += 7;
     if (
       title.includes('parque grande') ||
       title.includes('alma del ebro') ||
       title.includes('museo goya') ||
       title.includes('museo de zaragoza')
     ) score += 6;
     if (title.includes('monumento a goya')) score += 5;
     if (title.includes('mercado central')) score += 5;
     if (title.includes('zuda')) score += 5;
     if (title.includes('murallas')) score += 5;
     if (title.includes('sitios')) score += 5;
     if (title.includes('carmen')) score += 5;
     if (title.includes('agustina')) score += 5;
     if (title.includes('congresos')) score -= 10;
     if (title.includes('museo goya')) score -= 10;
     if (title.includes('museo goya - colección ibercaja')) score += 10;
     if (title.includes('torreón y muralla de los sitios')) score -= 10;

     return score;
   }

   // filter monuments based on their score
   filterMonuments(monumentArray: MonumentItem[]): MonumentItem[] {
     this.filtrados = monumentArray
       .map(m => ({m, score: this.scoreMonument(m)}))
       .filter(x => x.score >= 4)
       .sort((a,b) => b.score - a.score)
       .map(x => x.m);
     return this.filtrados;
      
   }

  getMonuments(): Observable<MonumentResponse> {
    return this.http.get<MonumentResponse>('https://www.zaragoza.es/sede/servicio/monumento?rf=html&srsname=utm30n&start=0&rows=500&distance=500&locale=es');
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

  // // filters monuments by array of string names
  // filterMonuments(monumentArray: MonumentItem[]){
  //   // for (let x of this.topMonuments){
  //   //   for (let m of monumentArray){
  //   //     const title = m.title ? m.title.toLowerCase() : '';
  //   //     if (title.includes(x)){
  //   //        this.filteredMonuments.push(m);
  //   //      }
  //   //   }
  //   // }
  //   for (let m of monumentArray){
  //     const title = m.title ? m.title.toLowerCase() : '';
  //     for (let x of this.topMonuments){
  //       if (title.includes(x)){
  //         this.filteredMonuments.push(m);
  //       }
  //     }
  //   }

  //   for (let x of this.topMonuments){
  //     for (let m of this.filteredMonuments){
  //       const title = m.title ? m.title.toLowerCase() : '';
  //       if (title.includes(x)){
  //         this.orderFilteredMonuments.push(m);
  //       }
  //     }
  //   }

  //   return this.orderFilteredMonuments;
  // }

  // // get the array of filtered monuments
  // getFilteredMonuments(){
  //   return this.orderFilteredMonuments;
  // }

  normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD') // descompone letras con tilde
      .replace(/[\u0300-\u036f]/g, '') // elimina las tildes
      .replace(/[^\w\s]/g, '') // elimina puntuación
      .trim();
  }

  filterTopMonuments(monumentArray: MonumentItem[]) {
    const map = new Map<string, MonumentItem>();

    monumentArray.forEach(m => {
      const key = this.normalize(m.title);
      map.set(key, m);
    });

    return this.topMonuments
      .map(name => map.get(this.normalize(name)))
      .filter((m): m is MonumentItem => !!m); // elimina nulls
  }

 //  añadir x puntos a x elemento
 //array private y luego funciones get para acceder a los elementos


}
