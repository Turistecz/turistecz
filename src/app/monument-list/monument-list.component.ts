import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonumentItem, MonumentResponse } from '../monument-list/monument.model';
import { CommonModule } from '@angular/common';
import { MonumentComponent } from '../monument/monument.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-monument-list',
  imports: [CommonModule, MonumentComponent],
  templateUrl: './monument-list.component.html',
  styleUrls: ['./monument-list.component.css']  
})
export class MonumentListComponent implements OnInit {

  monuments: MonumentItem[] = [];
  filtrados: MonumentItem[] = [];
  keyWords = ['goya','augusto','alfonso','batallador','pignatelli','palacio','basílica','catedral','monasterio','iglesia','museo'];
  place = ['plaza del pilar','plaza de los sitios','recinto expo','parque grande','coso','avenida césar augusto'];

  constructor(private http: HttpClient) {}

  // wait for the loadMonuments to end, then call filterMonuments
  async ngOnInit() {
    await this.loadMonuments();
    this.filterMonuments();
  }

  // Function to wait for api to be read
  async loadMonuments(): Promise<void> {
    try {
      const datos = await firstValueFrom(this.http.get<MonumentResponse>(
        'https://www.zaragoza.es/sede/servicio/monumento?rf=html&srsname=utm30n&start=0&rows=500&distance=500&locale=es'
      ));
      this.monuments = datos.result;
    
    } catch (error) {
      console.error('Error al cargar monumentos:', error);
    }
  
  }

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

    return score;
  }

  // filter monuments based on their score
  filterMonuments(): void {
    this.filtrados = this.monuments
      .map(m => ({m, score: this.scoreMonument(m)}))
      .filter(x => x.score >= 4)
      .sort((a,b) => b.score - a.score)
      .map(x => x.m);
      console.log(this.filtrados); //Para ver la lista ordenada de los monumentos
  }


   
}
