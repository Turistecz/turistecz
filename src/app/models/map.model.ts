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

export interface BiziResponse {
  result: BiziItem[];
}

