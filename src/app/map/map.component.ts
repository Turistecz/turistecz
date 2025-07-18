import { Component, AfterViewInit, Input, input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import proj4 from 'proj4';
import { MapService } from '../services/map.service';
import { BiziItem } from '../models/map.model';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit{

  constructor(private apiMapService: MapService) {}

  private map: any;

  bizis: BiziItem[] = [];

  biziIcon = L.icon({
    iconUrl: 'media/bizi-icon.png',
    iconSize: [30, 30],
    iconAnchor: [12, 20],
    popupAnchor: [1, -34],
    // shadowUrl: 'media/marker-shadow.png',
    shadowSize: [41, 41]
  });

  markerX = L.marker([0,0]);
  markerGroup = new L.FeatureGroup();
  biziChecked: boolean = false;

  @Input() data = {
    latitud: 0,
    longitud: 0
  };

  name = input("");

  // wait for map to load
  ngAfterViewInit(): void {
    this.initMap();

  };

 async ngOnInit(): Promise<void> {
  await this.loadBizis();
  this.createBiziMarkers();

}


  // function to initialize the map, set the location point
  private initMap(): void {
    const coords = this.convertCoords(this.data.latitud, this.data.longitud);
    const latlng: L.LatLngExpression = [coords[1], coords[0]];
 // [lat, lon]

    this.map = L.map('map').setView(latlng, 16); // Zaragoza

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    L.marker(latlng).addTo(this.map)
      .bindPopup(this.name)
      .openPopup();
  }
  

  // Definir UTM zona 30N
  convertCoords(easting: number, northing: number): [number, number] {
    proj4.defs("EPSG:32630", "+proj=utm +zone=30T +datum=WGS84 +units=m +no_defs");

    const utmCoords: [number, number] = [easting, northing];
    const latLon: [number, number] = proj4("EPSG:32630", "WGS84", utmCoords);


    return latLon; // [longitud, latitud]
  }

  
  async loadBizis(): Promise<void> {
    try {
      const datos = await firstValueFrom(this.apiMapService.getBizis());
      this.bizis = datos.result;
    
    } catch (error) {
      console.error('Error al cargar monumentos:', error);
    }
  
  }

  // cambiar mapa jaw light y lo de los botones de leyenda (poner taxis buses y tranvia)
public showHideBiziMarkers(): void {
  if (this.biziChecked == false){
    this.markerGroup.addTo(this.map);
    this.biziChecked = true;
  } else {
    this.biziChecked = false;
    this.map.removeLayer(this.markerGroup);    
  }
}

//hide & show markers on zoom
// map.on('zoomend', function() {
//     if (map.getZoom() <7){
//             map.removeLayer(shelterMarkers);
//     }
//     else {
//             map.addLayer(shelterMarkers);
//         }
// });

private createBiziMarkers(): void {
    this.bizis.forEach((bizi) => {
    const coords = bizi.geometry.coordinates;
    const props = bizi;

    if (!coords || !props) return;

    const lat = coords[1];
    const lon = coords[0];

    this.markerX = L.marker([lat, lon],{ icon: this.biziIcon });//.addTo(this.map);
    this.markerGroup.addLayer(this.markerX);

    this.markerX.bindPopup(`
      <strong>${props.title}</strong><br>
      Estado: ${props.estado}<br>
      Bicis: ${props.bicisDisponibles}<br>
      Anclajes: ${props.anclajesDisponibles}<br>
      Dirección: ${props.address}
    `);

  });
}

}