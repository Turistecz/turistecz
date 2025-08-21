import { Component, AfterViewInit, Input, input, OnInit, ElementRef, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
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

  private map: any

  userLatLong: [number, number] = [0, 0];

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
    await this.getUserCoords();
    await this.loadBizis();
    await this.loadTaxiStops();
    await this.loadBusStops();
    await this.loadTramStops();
    this.makeLocationMarkers();
    
    //TODO: queda la de bus info
    this.createBiziMarkers();
    this.createBusMarkers();
    this.createTaxiMarkers();
    this.createTramMarkers();
  }

// function to initialize the map, set the location point
private initMap(): void {
  const coords = this.convertCoords(this.data.latitud, this.data.longitud);
  const latlng: L.LatLngExpression = [coords[1], coords[0]]; // [lat, lon]
  
  this.map = L.map('map').setView(latlng, 15); // Zaragoza

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(this.map);

}


 getUserCoords(){
  navigator.geolocation.getCurrentPosition(position => 
    {
      this.userLatLong = [position.coords.latitude, position.coords.longitude];
    });
  }

// creates markers for user and monument location and adjusts the map view to fit both
makeLocationMarkers(){
  const coords = this.convertCoords(this.data.latitud, this.data.longitud);
  const latlng: L.LatLngExpression = [coords[1], coords[0]]; // [lat, lon]

  let userMarker = L.marker(this.userLatLong).addTo(this.map)
  .bindPopup("Estás aquí", {autoClose: false})
  .openPopup();

  let monumentMarker = L.marker(latlng).addTo(this.map)
  .bindPopup(this.name, {autoClose: false})
  .openPopup();

  L.Routing.control({ 
    waypoints: [
        L.latLng(this.userLatLong),
        L.latLng(latlng)
    ],
    addWaypoints: false,
    router: new L.Routing.OSRMv1({
      language: 'es',
    })
  }).addTo(this.map);

  let markers = L.featureGroup([userMarker, monumentMarker]).addTo(this.map);

  this.map.fitBounds(markers.getBounds(), {paddingTopLeft: [-80, 0]});
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
    this.bizis = datos.features;
  
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
    this.tramStops = datos.features;

  } catch (error) {
    console.error('Error al cargar monumentos:', error);
  }
}

async loadBusStops(): Promise<void> {
  try {
    const datos = await firstValueFrom(this.apiMapService.getBusesStation());
    this.busStops = datos.features;

  } catch (error) {
    console.error('Error al cargar monumentos:', error);
  }
}

public showHideMarkers(event: Event, group: L.FeatureGroup): void {
  if ((event.target as HTMLInputElement).checked){
    group.addTo(this.map);
  } else {
    this.map.removeLayer(group);
  }
}

//TODO: hide & show markers on zoom
// map.on('zoomend', function() {
//     if (map.getZoom() <7){
//             map.removeLayer(shelterMarkers);
//     }
//     else {
//             map.addLayer(shelterMarkers);
//         }
// });

private createBiziMarkers(): void {
this.createMarkers(this.biziIcon, this.biziMarkerGroup, this.bizis, "bizis");
};

private createTaxiMarkers(): void {
  this.createMarkers(this.taxiIcon, this.taxiMarkerGroup, this.taxiStops, "taxi");
};

private createBusMarkers(): void {
  this.createMarkers(this.busIcon, this.busMarkerGroup, this.busStops, "bus");
};

private createTramMarkers(): void {
  this.createMarkers(this.tramIcon, this.tramMarkerGroup, this.tramStops, "tram");
};

private createMarkers(icon: L.Icon, group: L.FeatureGroup, array: any[], sort: string): void {
  array.forEach((elem) => {
    const coords = elem.geometry.coordinates;
    const props = elem;

    if (!coords || !props) return;

    const lat = coords[1];
    const lon = coords[0];

    const markerVar = L.marker([lat, lon],{ icon: icon });//.addTo(this.map);
    group.addLayer(markerVar);

    switch (sort){
      case "bizis":
        markerVar.bindPopup(`
          <strong>${props.properties.title}</strong><br>
          Estado: ${props.properties.estado}<br>
          Bicis: ${props.properties.bicisDisponibles}<br>
          Anclajes: ${props.properties.anclajesDisponibles}<br>
          Dirección: ${props.properties.address}
        `);
      break;

      case "tram":
        if (elem.properties.destinos){
          markerVar.bindPopup(`
            <strong>${props.properties.title}</strong><br>
            Dirección: ${props.properties.destinos[0].destino} <br>
            Tiempo de espera: ${props.properties.destinos[0].minutos} minutos, ${props.properties.destinos[1].minutos} minutos <br>
          `);
        }
        else {
          markerVar.bindPopup(`
            <strong>${props.properties.title}</strong><br>
            No hay información en estos momentos, <br> vuelva a intentarlo más tarde <br>
          `);
        }
      break;

      case "taxi":
        markerVar.bindPopup(`
          <strong>${props.title}</strong><br>
        `);
        break;

      case "bus":
        markerVar.bindPopup(`
          <strong>${props.properties.title}</strong><br>
        `);
        break;
    }
  });
}

}