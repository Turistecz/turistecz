import { Component } from '@angular/core';
import { PlaceCardComponent } from '../place-card/place-card.component';
import { RoutesCardListComponent } from '../routes-card-list/routes-card-list.component';
import { CommonModule } from '@angular/common';
import { EventCardHomeComponent } from '../event-card-home/event-card-home.component';

@Component({
  selector: 'app-home',
  imports: [PlaceCardComponent, RoutesCardListComponent, CommonModule, EventCardHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
