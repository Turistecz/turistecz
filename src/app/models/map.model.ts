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
  title: string,
  estado: string,
  address: string,
  bicisDisponibles: number,
  anclajesDisponibles: number,
  description: string
 
}


export interface BusInfoItem {
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

export interface TaxiStopItem {
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

export interface TramStopItem {
  geometry: {
  coordinates: [number, number] // [lon, lat]
  },
  id: number,
  title: string, 
}

export interface BiziResponse {
  result: BiziItem[];
}
export interface BusStopResponse {
  result: BusStopItem[];
}
export interface BusInfoResponse {
  result: BusInfoItem[];
}
export interface TaxiStopResponse {
  result: TaxiStopItem[];
}
export interface TramStopResponse {
  result: TramStopItem[];
}