import { Component } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EventItem, EventResponse } from './event-card.model';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-card-list',
  imports: [EventCardComponent, CommonModule],
  templateUrl: './event-card-list.component.html',
 styleUrls: ['./event-card-list.component.css']
})
export class EventCardListComponent {

//constructor(private http: HttpClient) {}
    events: EventItem[] = [];
   
    bg: boolean = false;

 ngOnInit() {
    this.eventService.getEvents().subscribe(datos => {
      this.events = datos.result;
    });
  }


  constructor(private eventService: EventService) {}
  
  getDifferentColor(){
    if (this.bg==true){
       this.bg=false;
     } else {
       this.bg=true;
     }
     return this.bg;   
  }

}



