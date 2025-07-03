import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventItem, EventResponse } from './event-list.model';
import { HttpClient } from '@angular/common/http';
import { ApiConnectService } from '../api-connect.service';
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  
  constructor(private apiConnectService: ApiConnectService) {}
    events: EventItem[] = [];

  ngOnInit() {
    this.apiConnectService.getEvents().subscribe(datos => {
      this.events = datos.result;
    });
    
  }
}
