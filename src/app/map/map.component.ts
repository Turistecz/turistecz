import { Component, AfterViewInit, Input, input, OnInit, ElementRef, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import proj4 from 'proj4';
import { MapService } from '../services/map.service';
import { BiziItem, BusStopItem, TaxiStopItem, TramStopItem } from '../models/map.model';
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
  taxiStops: TaxiStopItem[] = [];
  busStops: BusStopItem[] = [];
  tramStops: TramStopItem[] = [];

  biziIcon = L.icon({
    iconUrl: 'media/bizi-icon.png',
    iconSize: [30, 30],
    iconAnchor: [12, 20],
    popupAnchor: [3, -20],
  });

  busIcon = L.icon({
    iconUrl: 'media/bus-icon.png',
    iconSize: [22, 32],
    iconAnchor: [12, 20],
    popupAnchor: [0, -20],
  });

  taxiIcon = L.icon({
    iconUrl: 'media/taxi-icon.png',
    iconSize: [25, 30],
    iconAnchor: [12, 20],
    popupAnchor: [0, -20],
  });

  tramIcon = L.icon({
    iconUrl: 'media/tram-icon.png',
    iconSize: [30, 30],
    iconAnchor: [12, 20],
    popupAnchor: [0, -20],
  });

  markerVar = L.marker([0,0]);
  biziMarkerGroup = new L.FeatureGroup();
  busMarkerGroup = new L.FeatureGroup();
  tramMarkerGroup = new L.FeatureGroup();
  taxiMarkerGroup = new L.FeatureGroup();

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
  await this.loadTaxiStops();
  await this.loadTramStops();
  await this.loadBusStops();
  //queda la de bus info
  this.createBiziMarkers();
  this.createTaxiMarkers();
  this.createBusMarkers();
  this.createTramMarkers();
}

// function to initialize the map, set the location point
private initMap(): void {
  const coords = this.convertCoords(this.data.latitud, this.data.longitud);
  const latlng: L.LatLngExpression = [coords[1], coords[0]]; // [lat, lon]

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
    console.error('Error al cargar las paradas de bici:', error);
  }
}

async loadTaxiStops(): Promise<void> {
  try {
    const datos = await firstValueFrom(this.apiMapService.getTaxisStops());
    this.taxiStops = datos.result;

  } catch (error) {
    console.error('Error al cargar monumentos:', error);
  }
}

async loadTramStops(): Promise<void> {
  try {
    const datos = await firstValueFrom(this.apiMapService.getTramsStation());
    this.tramStops = datos.result;

  } catch (error) {
    console.error('Error al cargar monumentos:', error);
  }
}

async loadBusStops(): Promise<void> {
  try {
    const datos = await firstValueFrom(this.apiMapService.getBusesStation());
    this.busStops = datos.result;

  } catch (error) {
    console.error('Error al cargar monumentos:', error);
  }
}

public showHideMarkers(event: Event, group: L.FeatureGroup): void {
  if ((event.target as HTMLInputElement).checked){
    group.addLayer(this.markerVar);
    group.addTo(this.map);
  } else {
    this.map.removeLayer(group);
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
this.createMarkers(this.biziIcon, this.biziMarkerGroup, this.bizis);
};

private createTaxiMarkers(): void {
  this.createMarkers(this.taxiIcon, this.taxiMarkerGroup, this.taxiStops);
};

private createBusMarkers(): void {
  this.createMarkers(this.busIcon, this.busMarkerGroup, this.busStops);
};

private createTramMarkers(): void {
  this.createMarkers(this.tramIcon, this.tramMarkerGroup, this.tramStops);
};

private createMarkers(icon: L.Icon, group: L.FeatureGroup, array: any[]): void {
  array.forEach((elem) => {
  const coords = elem.geometry.coordinates;
  const props = elem;

  if (!coords || !props) return;

  const lat = coords[1];
  const lon = coords[0];

  this.markerVar = L.marker([lat, lon],{ icon: icon });//.addTo(this.map);
  group.addLayer(this.markerVar);


    //
    // TAREAS
    //
  // mapa ancho 100% y grande, leyenda abajo y horizontal, check a al izq e icono a al derecha
  // cambiar mapa jaw light y lo de los botones de leyenda (poner taxis buses y tranvia)

  // como cada uno tiene x datos tendra que ser mas especifico, igual con ifs comprobando si el nombre del grupo tiene bizi o asi y poner cada pop up a cada grupo
  // this.markerVar.bindPopup(`
  //   <strong>${props.title}</strong><br>
  //   Estado: ${props.estado}<br>
  //   Bicis: ${props.bicisDisponibles}<br>
  //   Anclajes: ${props.anclajesDisponibles}<br>
  //   Dirección: ${props.address}
  // `);

});
}

}