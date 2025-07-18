import { Component, Input } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { CommonModule } from '@angular/common';
import { EventItem, EventResponse } from '../models/event-card.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-event-card-home',
  imports: [CommonModule, FormsModule, EventCardComponent, RouterModule],
  templateUrl: './event-card-home.component.html',
  styleUrl: './event-card-home.component.css'
})

export class EventCardHomeComponent {

  constructor(private http: HttpClient) {}

  events: EventItem[] = [];
  sortedEvents: EventItem[] = [];


}
