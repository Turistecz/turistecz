import { Component } from '@angular/core';
import { OnePlaceCardComponent } from "../one-place-card/one-place-card.component";
import { PlaceCardComponent } from "../place-card/place-card.component";

@Component({
  selector: 'app-site-text-detail',
  imports: [OnePlaceCardComponent],
  templateUrl: './site-text-detail.component.html',
  styleUrl: './site-text-detail.component.css'
})
export class SiteTextDetailComponent {

}
