import { Component } from '@angular/core';
import { PlaceCardComponent } from '../place-card/place-card.component';

@Component({
  selector: 'app-home',
  imports: [PlaceCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
