import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

   getWeather(lat: number, lon: number): Observable<any> {
    let params = new HttpParams()
      .set('latitude', lat)
      .set('longitude', lon)
      .set('current', ['temperature_2m', 'precipitation', 'rain', "wind_speed_10m", "cloudcover"].join(','))
      .set('timezone', 'auto')
      .set('forecast_days', 1);

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        const current = response.current;
        const weatherData = {
          current: {
            time: new Date(current.time),
            temperature_2m: current.temperature_2m,
            precipitation: current.precipitation,
            rain: current.rain,
            wind: current.wind_speed_10m,
            cloud_cover: current.cloud_cover
          }
        };
        return weatherData;
      })
    );
  }
}
