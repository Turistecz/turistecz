import { Component, AfterViewInit, Input, input, OnInit, ElementRef, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet.markercluster';
import proj4 from 'proj4';
import { MapService } from '../services/map.service';
import { AdapParkingItem, BiziItem, BusStopItem, TaxiStopItem, TramStopItem, MapRouteItem, FarmaciaItem } from '../models/map.model';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mapRoute } from '../models/details-routes';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit{

  constructor(private apiMapService: MapService, private http: HttpClient, element: ElementRef) {
    const isChildOf = this.hasParent(element, 'app-monument');
    this.isChild = isChildOf;
  }

  private map: any;

  userLatLong: [number, number] = [41.65606, -0.87734];
  instructionsExpanded: boolean = false;

  bizis: BiziItem[] = [];
  taxiStops: TaxiStopItem[] = [];
  busStops: BusStopItem[] = [];
  tramStops: TramStopItem[] = [];
  adapParking: AdapParkingItem[] = [];
  farmacias: FarmaciaItem[] = [];

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

 AdapParkingIcon = L.icon({
    iconUrl: 'media/parking-adap.svg',
    iconSize: [22, 32], //medidas por ajustar
    iconAnchor: [12, 20],
    popupAnchor: [0, -20],
  });

  FarmaciaIcon = L.icon({
    iconUrl: 'media/farmacia-icon.svg',
     iconSize: [22, 32], //medidas por ajustar
    iconAnchor: [12, 20],
    popupAnchor: [0, -20],
  })

  bizisMarkerGroup = new L.MarkerClusterGroup();
  busMarkerGroup = new L.MarkerClusterGroup();
  tramMarkerGroup = new L.MarkerClusterGroup();
  taxiMarkerGroup = new L.MarkerClusterGroup();
  adapParkingMarkerGroup = new L.MarkerClusterGroup();
  farmaciaMarkerGroup = new L.MarkerClusterGroup();

  route: MapRouteItem = {
    routes: [
      {
        distance: 0,
        duration: 0,
        geometry: {
          coordinates: [[0,0]]
        },
        legs: [
          {
            steps: [
              {
                distance: 0,
                driving_side: '',
                duration: 0,
                geometry: {
                  coordinates: [[0,0]]
                },
                maneuver: {
                  location: [0,0],
                  modifier: '',
                  type: ''
                },
                name: ''
              }
            ],
            summary: '',
          }
        ]
      }
    ]
  };

  sortedRouteCoords: [[number, number]] = [[0,0]];

  @Input() data = {
    latitud: 0,
    longitud: 0
  };

  name = input("");

  /* Rotue Sites*/
  @Input() routeSites:mapRoute[]=[]; 

  isChild:boolean = true;

  private hasParent(element: ElementRef, selector: string): boolean {
      let parent = element.nativeElement;
      while(parent = parent.parentElement) {
          if (parent.matches(selector)) { return true; }
      }
      return false;
  }
  
  // wait for map to load
  ngAfterViewInit(): void {
    this.initMap();
  };

  async ngOnInit(): Promise<void> {
    this.getUserCoords();
    await this.loadBizis();
    await this.loadTaxiStops();
    await this.loadBusStops();
    await this.loadTramStops();
    await this.loadAdapParking();
    await this.loadFarmacia();
    this.makeLocationMarkers();
    await this.getRoute();
    
    //TODO: queda la de bus info
    this.createBiziMarkers();
    this.createBusMarkers();
    this.createTramMarkers();
    this.createTaxiMarkers();
    this.createAdapParkingMarkers();
    this.createFarmaciaMarkers();
  }

  getUserCoords(){
    navigator.geolocation.getCurrentPosition(position => 
    {
      this.userLatLong = [position.coords.latitude, position.coords.longitude];
    });
  }

  getSiteCoords(): L.LatLngExpression {
    const coords = this.convertCoords(this.data.latitud, this.data.longitud);
    const latlng: L.LatLngExpression = [coords[1], coords[0]]; // [lat, lon]
    return latlng;
  }

// function to initialize the map, set the location point
private initMap(): void {
  this.map = L.map('map').setView(this.userLatLong, 15); // Zaragoza

  // Limits world map view and scroll to tiles outside the map
  let southWest = L.latLng(-200,-200);
  let northEast = L.latLng(300,300);
  let bounds = L.latLngBounds(southWest, northEast);
  this.map.setMaxBounds(bounds);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 2,
    attribution: `<a href="https://www.openstreetmap.org/fixthemap"> © OpenStreetMap</a>`
  }).addTo(this.map);
}

//connect to local OSRM server and insert route data in route variable
//TODO: see and move this function to map service
async getRoute() {
  const latlng = this.getSiteCoords();

  try {
    if (this.isChild) {
    const datos = await firstValueFrom(this.apiMapService.getRoute(latlng, this.userLatLong));
    this.route = datos;
    this.visualRouteLine();
    } else {
      let coords:[[number, number]] = [[0,0]];
      coords.shift();
      this.routeSites.forEach((item: mapRoute) => {
        let lat = this.convertCoords(item.latitud, item.longitud);
        coords.push([lat[1], lat[0]]);
      });
      const datos = await firstValueFrom(this.apiMapService.getRouteSites(this.userLatLong, coords));
      this.route = datos;
      this.visualRouteLine();
    }
  } catch (error) {
    console.error('Error al cargar la ruta: ', error);
  }
}

// creates markers for user and monument location and adjusts the map view to fit both
//TODO: find alternative to get user location or solution/check for when it doesn't work
makeLocationMarkers(){

  if (this.isChild) {
    const latlng = this.getSiteCoords();

    let userMarker = L.marker(this.userLatLong).addTo(this.map)
    .bindPopup("Estás aquí", {autoClose: false})
    .openPopup();

    let monumentMarker = L.marker(latlng).addTo(this.map)
    .bindPopup(this.name, {autoClose: false})
    .openPopup();

    let markers = L.featureGroup([userMarker, monumentMarker]).addTo(this.map);

    this.map.fitBounds(markers.getBounds(), {paddingTopLeft: [-80, 0]});
    } else {

    let userMarker = L.marker(this.userLatLong).addTo(this.map)
    .bindPopup("Estás aquí", {autoClose: false})
    .openPopup();

    /* Route Sites */

    let markersRouteSites: L.Marker[] = 
    this.routeSites.map((sitio) => {
      const coords = this.convertCoords(sitio.latitud, sitio.longitud);
      const latlng: L.LatLngExpression = [coords[1], coords[0]];
      const marker = L.marker(latlng)
        .addTo(this.map)
        .bindPopup(sitio.nombre, {autoClose: false})
        .openPopup();
        return marker;
    });

    L.featureGroup([userMarker]).addTo(this.map);
    let markersRS = L.featureGroup(markersRouteSites).addTo(this.map);
    this.map.fitBounds(markersRS.getBounds(), {paddingTopLeft: [-80, 0]});
  }

  /* ----- */

  //OSRM demo server (old way of getting the route)
  // L.Routing.control({ 
  //   waypoints: [
  //       L.latLng(this.userLatLong),
  //       L.latLng(latlng)
  //   ],
  //   addWaypoints: false,
  //   router: new L.Routing.OSRMv1({
  //     language: 'es'
  //   })
  // }).addTo(this.map);

}

//OSRM local server
visualRouteLine(){
  this.sortedRouteCoords.shift();
  this.route.routes[0].geometry.coordinates.forEach((item: [number, number]) => {
    this.sortedRouteCoords.push([item[1], item[0]]);
  });
  L.polyline(this.sortedRouteCoords, {color: 'red'}).addTo(this.map);
  this.routeInstructions();
}

routeInstructions(){
  let allSteps = this.route.routes[0].legs[0].steps;
  let table = document.getElementById("instructionsList");
  let directionsIcon: string[] = [];
  let directionsIconRotation: string[] = [];
  let directionsTypeSpanish: string[] = [];
  let directionsModifierSpanish: string[] = [];

  allSteps.forEach((item) => {
    switch (item.maneuver.type) {
      case "turn": {
        directionsTypeSpanish.push("Gira ");
        break;
      }
      case "new name": {
        directionsTypeSpanish.push("Continúa ");
        break;
      }
      case "depart": {
        directionsTypeSpanish.push("Inicia ");
        break;
      }
      case "arrive": {
        directionsTypeSpanish.push("Llegaste ");
        break;
      }
      case "merge": {
        directionsTypeSpanish.push("Entra a ");
        break;
      }
      case "ramp": {
        directionsTypeSpanish.push("Rampa ");
        break;
      }
      case "on ramp": {
        directionsTypeSpanish.push("Sube por la rampa ");
        break;
      }
      case "off ramp": {
        directionsTypeSpanish.push("Baja por la rampa ");
        break;
      }
      case "fork": {
        directionsTypeSpanish.push("Gira ");
        break;
      }
      case "end of road": {
        directionsTypeSpanish.push("Gira ");
        break;
      }
      case "use lane": {
        directionsTypeSpanish.push("Continúa por el carril ");
        break;
      }
      case "continue": {
        directionsTypeSpanish.push("Continúa ");
        break;
      }
      case "roundabout": {
        directionsTypeSpanish.push("Rotonda ");
        break;
      }
      case "rotary": {
        directionsTypeSpanish.push("Algo parecido a rotonda ");
        break;
      }
      case "roundabout turn": {
        directionsTypeSpanish.push("Gira en la rotonda por la ");
        break;
      }
      case "notification": {
        directionsTypeSpanish.push("Aviso: ");
        break;
      }
    }

    switch (item.maneuver.modifier) {
      case "uturn": {
        directionsModifierSpanish.push("da la vuelta ");
        directionsIcon.push("media/uturn.png");
        directionsIconRotation.push("");
        break;
      }
      case "sharp right": {
        directionsModifierSpanish.push("a la derecha ");
        directionsIcon.push("media/left-turn.png");
        directionsIconRotation.push("scaleX(-1)");
        break;
      }
      case "right": {
        directionsModifierSpanish.push("a la derecha ");
        directionsIcon.push("media/left-turn.png");
        directionsIconRotation.push("scaleX(-1)");
        break;
      }
      case "slight right": {
        directionsModifierSpanish.push("levemente a la derecha ");
        directionsIcon.push("media/arrow.png");
        directionsIconRotation.push("rotate(-225deg)");
        break;
      }
      case "straight": {
        directionsModifierSpanish.push(" ");
        directionsIcon.push("media/arrow.png");
        directionsIconRotation.push("rotate(90deg)");
        break;
      }
      case "slight left": {
        directionsModifierSpanish.push("levemente a la izquierda ");
        directionsIcon.push("media/arrow.png");
        directionsIconRotation.push("rotate(45deg)");
        break;
      }
      case "left": {
        directionsModifierSpanish.push("a la izquierda ");
        directionsIcon.push("media/left-turn.png");
        directionsIconRotation.push("scaleX(1)");
        break;
      }
      case "sharp left": {
        directionsModifierSpanish.push("a la izquierda ");
        directionsIcon.push("media/left-turn.png");
        directionsIconRotation.push("scaleX(1)");
        break;
      }
    }

  });

  //Create rows with three columns for icon instruction, instructions info and distance for every step in leg(route)
  allSteps.forEach((item, i) => {
    let tr = document.createElement("tr");
    let img = document.createElement("img");
    let tdIcon = document.createElement("td");
    let tdDirections = document.createElement("td");
    let tdDistance = document.createElement("td");
    tdDistance.classList.add("w-25");
    tdIcon.classList.add("w-25");
    img.width = 45;
    img.classList.add("bg-transparent")
    tdDirections.classList.add("py-2");
    tr.classList.add("border-bottom", "my-2");
    img.style.transform = directionsIconRotation[i];
    img.src = directionsIcon[i];
    tdIcon.appendChild(img);
    tdDirections.innerText = directionsTypeSpanish[i] + directionsModifierSpanish[i];
    if (item.name) {
      tdDirections.innerText += 'por ' + item.name;
    }
    if (item.maneuver.type == "depart") {
      if (item.name) {
        tdDirections.innerText = directionsTypeSpanish[i] + 'en ' + item.name;
      } else {
        tdDirections.innerText = directionsTypeSpanish[i] + directionsModifierSpanish[i];
      }
      img.style.transform = "";
      img.src = "media/start-map-direction.png";
    }
    if (item.maneuver.type == "arrive") {
      tdDirections.innerText = directionsTypeSpanish[i] + 'a tu destino';
      img.style.transform = "";
      img.src = "media/end-map-direction.png";
    }
    
    tdDistance.innerText = this.convertMetersToKm(item.distance);
    tr.appendChild(tdIcon);
    tr.appendChild(tdDirections);
    tr.appendChild(tdDistance);
    table?.appendChild(tr);
  });
}

toggleInstructions() {
  this.instructionsExpanded = !this.instructionsExpanded;
}

convertSecondsToMinHr(seconds: number): string{
  let hours = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} hr ${mins} min`
  } else {
    return `${mins} min`
  }
}

get mins(): string {
  return this.convertSecondsToMinHr(this.route.routes[0].duration);
}

convertMetersToKm(meters: number): string{
  let km = meters / 1000;

  if (km > 1) {
    return km.toFixed(1) + " km";
  } else {
    return meters.toFixed(1) + " m";
  }
}

get kms(): string {
  return this.convertMetersToKm(this.route.routes[0].distance);
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
    this.taxiStops = datos.features;

  } catch (error) {
    console.error('Error al cargar paradas de taxi:', error);
  }
}

async loadTramStops(): Promise<void> {
  try {
    const datos = await firstValueFrom(this.apiMapService.getTramsStation());
    this.tramStops = datos.features;

  } catch (error) {
    console.error('Error al cargar paradas de tranvía:', error);
  }
}

async loadBusStops(): Promise<void> {
  try {
    const datos = await firstValueFrom(this.apiMapService.getBusesStation());
    this.busStops = datos.features;

  } catch (error) {
    console.error('Error al cargar paradas de bus:', error);
  }
}

async loadAdapParking(): Promise<void> {
  try {
    const datos = await firstValueFrom(this.apiMapService.getAdapParking());
    this.adapParking = datos.features;

  } catch (error) {
    console.error('Error al cargar parkings adaptados:', error);
  }
}

async loadFarmacia(): Promise<void> {
  try {
    const datos = await firstValueFrom(this.apiMapService.getFarmacia());
    this.farmacias = datos.features;

  } catch (error) {
    console.error('Error al cargar farmacias:', error);
  }
}

public showHideMarkers(event: Event, group: L.FeatureGroup): void {
  if ((event.target as HTMLInputElement).checked){
    group.addTo(this.map);
  } else {
    this.map.removeLayer(group);
  }
}

private createBiziMarkers(): void {
this.createMarkers(this.biziIcon, this.bizisMarkerGroup, this.bizis, "bizis");
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

private createAdapParkingMarkers(): void {
this.createMarkers(this.AdapParkingIcon, this.adapParkingMarkerGroup, this.adapParking, "parking adaptado");
};

private createFarmaciaMarkers(): void {
this.createMarkers(this.FarmaciaIcon, this.farmaciaMarkerGroup, this.farmacias, "farmacias de guardia");
};

private createMarkers(icon: L.Icon, group: L.MarkerClusterGroup, array: any[], sort: string): void {
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

      case "parking adaptado":
        //no incluyo ${props.properties.num_calle1} porque en muchos casos el numero de la calle no aparece
        markerVar.bindPopup(`
          <strong> Calle ${props.properties.calle_1}</strong><br> 
          Horario: ${props.properties.horario} <br>
          Número de plazas: ${props.properties.plazas} 
          `);
          break;

       case "farmacias de guardia":
        //no incluyo ${props.properties.num_calle1} porque en muchos casos el numero de la calle no aparece
        markerVar.bindPopup(`
          <strong>${props.properties.title}</strong><br>  
          Calle ${props.properties.calle}<br>
          Guardia: ${props.properties.guardia.fecha} <br> 
          ${props.properties.guardia.horario} <br>
          Teléfono: ${props.properties.telefonos} 
          `)
         
    }
  });
}

}