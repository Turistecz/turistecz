import { Component, Input } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { EventItem, EventResponse } from '../models/event-card.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventCardListComponent } from '../event-card-list/event-card-list.component';
import { EventService } from '../services/event.service';


@Component({
  selector: 'app-event-card-home',
  imports: [CommonModule, FormsModule, EventCardComponent, RouterModule],
  templateUrl: './event-card-home.component.html',
  styleUrl: './event-card-home.component.css'
})

export class EventCardHomeComponent {

  constructor(private http: HttpClient, private eventService: EventService) {}

  events: EventItem[] = [];
  sortedEvents: EventItem[] = [];

  page: number = 1;
  pageSize: number = 3;


  ngOnInit() {
    this.loadEvents();
  }

  async loadEvents(): Promise<void> {
  try {
    this.events = this.eventService.getEvents();

    this.sortedEvents = this.events.slice();


  } catch (error) {
    console.error('Error al cargar eventos:', error);
  }
}

get pagedEvents(): EventItem[] {
  const start = (this.page - 1) * this.pageSize;
  return this.sortedEvents.slice(start, start + this.pageSize);
}

}
