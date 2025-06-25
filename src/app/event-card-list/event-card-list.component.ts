import { Component } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-card-list',
  imports: [EventCardComponent, CommonModule],
  templateUrl: './event-card-list.component.html',
  styleUrl: './event-card-list.component.css'
})
export class EventCardListComponent {

events = [];

}
