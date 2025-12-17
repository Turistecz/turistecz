import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})

export class WeatherComponent implements OnInit{

  current: any;

  constructor(private weatherService: WeatherService){}

  ngOnInit(): void {
    this.weatherService.getWeather(41.662246,-1.025696).subscribe(data => {
         
          this.current = data.current;
    
  })};

getWeatherIcon(current: any): string{
  if (current.rain > 0 || current.precipitation > 0){
    let icon = 'fa-cloud-rain text-primary'
    return icon;

  }
  else{
    let icon = 'fa-sun text-warning'
    return icon;
  }
  }

 
}