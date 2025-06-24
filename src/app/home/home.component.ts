import { Component } from '@angular/core';
import { PlaceCardComponent } from '../place-card/place-card.component';
import { RoutesCardListComponent } from '../routes-card-list/routes-card-list.component';

@Component({
  selector: 'app-home',
  imports: [PlaceCardComponent,RoutesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
