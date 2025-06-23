import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonumentItem, MonumentResponse } from '../monument-list/monument.model';
import { CommonModule } from '@angular/common';
import { MonumentComponent } from '../monument/monument.component';

@Component({
  selector: 'app-monument-list',
  imports: [CommonModule, MonumentComponent ],
  templateUrl: './monument-list.component.html',
  styleUrl: './monument-list.component.css'
})
export class MonumentListComponent implements OnInit {

  monuments: MonumentItem[] = [];
  index: number = 1;
  condition: boolean = true;
  filtrados: MonumentItem[] = [];

  constructor(private http: HttpClient) {}

  //datos.result[this.index].description

  ngOnInit() {
    this.http.get<MonumentResponse>(
      'https://www.zaragoza.es/sede/servicio/monumento?rf=html&srsname=utm30n&start=0&rows=500&distance=500&locale=es'
    ).subscribe(datos => {
      this.monuments = datos.result;
    });
    
  }


  keyWords = ['goya','augusto','alfonso','batallador','pignatelli','palacio','basílica','catedral','monasterio','iglesia','museo'];
  place = ['plaza del pilar','plaza de los sitios','recinto expo','parque grande','coso','avenida césar augusto'];

    scoreMonument(m: MonumentItem) {
    let score = 0;
    const title = m.title.toLowerCase();
    const desc = m.description.toLowerCase();

    if (this.keyWords.some(p => title.includes(p))) score += 3;
    if (this.place.some(u => desc.includes(u))) score += 2;
    if (title.includes(('Basílica de Nuestra Señora del Pilar').toLowerCase())) score += 10;
    if (title.includes(('Aljafería').toLowerCase())) score += 9;
    if (title.includes(('La Seo').toLowerCase())) score += 8;
    if (title.includes(('Puente de piedra').toLowerCase())) score += 7;
    if (title.includes(('Parque Grande').toLowerCase()) || title.includes(('Alma del Ebro').toLowerCase()) || title.includes(('Museo Goya').toLowerCase()) || title.includes(('Museo de Zaragoza').toLowerCase())) score += 6;
    if (title.includes(('Monumento a Goya').toLowerCase())) score += 5;
    if (title.includes(('Mercado Central').toLowerCase())) score += 5;
    if (title.includes(('zuda').toLowerCase())) score += 5;
    if (title.includes(('murallas').toLowerCase())) score += 5;
    if (title.includes(('sitios').toLowerCase())) score += 5;
    if (title.includes(('carmen').toLowerCase())) score += 5;
    if (title.includes(('agustina').toLowerCase())) score += 5;
    if (title.includes(('congresos').toLowerCase())) score -= 10;
    //if (desc.includes('cerrado temporalmente') || desc.includes('desaparecida') || desc.trim() === '<p></p>') score -= 5;

    return score;
  };
    
    mostrar():void{
       this.filtrados = this.monuments
      .map(m => ({m, score: this.scoreMonument(m)}))
      .filter(x => x.score >= 4)
      .sort((a,b) => b.score - a.score)
      .map(x => x.m);

      console.log(this.filtrados);
    }


};
    
    


