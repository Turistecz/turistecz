import { Component, Input } from '@angular/core';
import { cardsHome } from '../place-card/place-card.model';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-one-place-card',
  imports: [RouterModule],
  templateUrl: './one-place-card.component.html',
  styleUrl: './one-place-card.component.css'
})
export class OnePlaceCardComponent {
  
  constructor(private http: HttpClient) {}
async ngOnInit(): Promise<void> {
}

  @Input() data!: {
    id: string;
    nombre: string;
    url: string;
  }
}


