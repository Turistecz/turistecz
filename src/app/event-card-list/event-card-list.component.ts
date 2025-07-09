import { Component } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EventItem, EventResponse } from './event-card.model';

@Component({
  selector: 'app-event-card-list',
  imports: [EventCardComponent, CommonModule],
  templateUrl: './event-card-list.component.html',
  styleUrl: './event-card-list.component.css'
})
export class EventCardListComponent {

constructor(private http: HttpClient) {}
    events: EventItem[] = [];
    
    bg: boolean = false;

  ngOnInit() {
    this.http.get<EventResponse>(
      'https://www.zaragoza.es/sede/servicio/puntos-interes?rf=html&srsname=utm30n&start=0&rows=50&distance=500'
    ).subscribe(datos => {
      this.events = datos.result;
    });
    
  }

  getDifferentColor(){
    if (this.bg==true){
       this.bg=false;
     } else {
       this.bg=true;
     }
     return this.bg;   
  }

}



