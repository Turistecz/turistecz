import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import proj4 from 'proj4';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  // wait for map to load
  ngAfterViewInit(): void {
    this.initMap();
  }

  // function to initialize the map, set the location point
  private initMap(): void {
    const coords = this.convertCoords(676764.33, 4614005.34);
    const latlng: L.LatLngExpression = [coords[1], coords[0]];
 // [lat, lon]

    this.map = L.map('map').setView(latlng, 13); // Zaragoza

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    L.marker(latlng).addTo(this.map)
      .bindPopup('Zaragoza')
      .openPopup();
  }
  

  // Definir UTM zona 30N
  convertCoords(easting: number, northing: number): [number, number] {
    proj4.defs("EPSG:32630", "+proj=utm +zone=30T +datum=WGS84 +units=m +no_defs");

    const utmCoords: [number, number] = [easting, northing];
    const latLon: [number, number] = proj4("EPSG:32630", "WGS84", utmCoords);


    return latLon; // [longitud, latitud]
  }

}