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

  // function to add scores to monuments to filter them
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
  filterMonuments(): void {
    this.filtrados = this.monuments
      .map(m => ({m, score: this.scoreMonument(m)}))
      .filter(x => x.score >= 4)
      .sort((a,b) => b.score - a.score)
      .map(x => x.m);
      
  }

  getMonuments(): Observable<MonumentResponse> {
    return this.http.get<MonumentResponse>('https://www.zaragoza.es/sede/servicio/monumento?rf=html&srsname=utm30n&start=0&rows=500&distance=500&locale=es');
  }

  // getMonumentById(id: number) {
  //   for (let monument of this.monuments){
  //     if (monument.id == id){
  //       console.log(monument);
  //       return monument;
  //     }
  //   }
  //   return this.monuments[0];
  // }


 //obtener los sitios filtrados, obtener todos los sitios, obtener por id, obtener por nombre, obtener filtrados por score, añadir x puntos a x elemento
 //array private y luego funciones get para acceder a los elementos


}
