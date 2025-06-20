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

  constructor(private http: HttpClient) {}

  //datos.result[this.index].description

  ngOnInit() {
    this.http.get<MonumentResponse>(
      'https://www.zaragoza.es/sede/servicio/monumento?rf=html&srsname=utm30n&start=0&rows=500&distance=500&locale=es'
    ).subscribe(datos => {
      this.monuments = datos.result;
    });
  }

}
