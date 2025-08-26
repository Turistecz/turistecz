import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccommodationResponse, Accommodation } from '../models/accommodation.models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {


private apiUrl = 'https://www.zaragoza.es/sede/servicio/alojamiento.json';

  constructor(private http: HttpClient) {}

  getAccommodations(filas: number = 50): Observable<Accommodation[]> {
    let url = this.apiUrl;

    url = url + '?rows=' + filas + '&fl=title,description,email,link';

    return this.http.get<AccommodationResponse>(url).pipe(
      map((response: any) => {
        return response.result.map((h: any) => ({
          title: h.title,
          descripcion: h.description ?? '',
          email: h.email ?? ''
        }));
      })
    );
  }
}

