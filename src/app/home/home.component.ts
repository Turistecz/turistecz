import { Component, OnInit } from '@angular/core';
import { PlaceCardComponent } from '../place-card/place-card.component';
import { RoutesCardListComponent } from '../routes-card-list/routes-card-list.component';
import { CommonModule } from '@angular/common';
import { EventCardHomeComponent } from '../event-card-home/event-card-home.component';
import { EventCardComponent } from "../event-card/event-card.component";
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  imports: [PlaceCardComponent, RoutesCardListComponent, CommonModule, EventCardHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  current: any;


  constructor(private weatherService: WeatherService){}

  ngOnInit(): void {
    this.weatherService.getWeather(41.662246,-1.025696).subscribe(data => {
         
          this.current = data.current;
          // console.log('tiempo actual', this.current)
          // console.log('llueve?', this.current.precipitation)
        
  })};

getWeatherIcon(current: any): string{
  if (current.rain > 0 || current.precipitation > 0){
    let icon = 'fa-cloud-rain text-primary'
    return icon;

  }else{
    let icon = 'fa-sun text-warning'
    return icon;
  }
  }
}

