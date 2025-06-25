import { Component } from '@angular/core';
import { PlaceCardComponent } from '../place-card/place-card.component';
import { RoutesCardListComponent } from '../routes-card-list/routes-card-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [PlaceCardComponent, RoutesCardListComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
