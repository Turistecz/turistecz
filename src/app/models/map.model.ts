export interface BiziItem {
  geometry: {
  coordinates: [number, number] // [lon, lat]
  },
  id: string,
  title: string,
  estado: string,
  address: string,
  bicisDisponibles: number,
  anclajesDisponibles: number,
  description: string
 
}

export interface BusStopItem {
  geometry: {
  coordinates: [number, number] // [lon, lat]
  },
  id: string,
  title: string 
}


export interface BusInfoItem {
  geometry: {
  coordinates: [number, number] // [lon, lat]
  },
  id: string,
  title: string,
  destinos: {
    linea: string,
    destino: string,
    primero: string,
    segundo: string
  }
 
}

export interface TaxiStopItem {
  geometry: {
  coordinates: [number, number] // [lon, lat]
  },
  id: string,
  title: string 
}

export interface TramStopItem {
  geometry: {
  coordinates: [number, number] // [lon, lat]
  },
  id: number,
  title: string, 
  destinos: [
    {
      linea: string,
      destino: string,
      minutos: number
    },
    {
      linea: string,
      destino: string,
      minutos: number
    }
  ]
}

export interface AdapParkingItem{
  geometry: {
        type: string,
        coordinates: [number, number]
      },
      properties: {
        gid: number,
        id: number,
        tipo_reserva: string,
        calle_1: string,
        num_calle1: string,
        longitud: number,
        horario: string,
        categoria: string,
        plazas: string,
        icon: string
      }
}

export interface AdapParkingResponse{
  features: AdapParkingItem[];
}

export interface BiziResponse {
  features: BiziItem[];
}
export interface BusStopResponse {
  features: BusStopItem[];
}
export interface BusInfoResponse {
  result: BusInfoItem[];
}
export interface TaxiStopResponse {
  features: TaxiStopItem[];
}
export interface TramStopResponse {
  features: TramStopItem[];
}

export interface MapRouteItem {
  routes: [
    {
      distance: number, //in meters
      duration: number, //in seconds
      geometry: {
        coordinates: [[number, number]]
      }
      legs: [
        {
          steps: MapRouteSteps[]
        }
      ]
    }
  ]
}

export interface MapRouteSteps {
  distance: number,
  driving_side: string,
  duration: number,
  geometry: {
    coordinates: [[number, number]]
  }
  maneuver: {
    location: [number, number], //long, lat of the turn
    modifier?: string,
    type: string
  },
  name: string,
}