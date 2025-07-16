export interface BiziItem {
  geometry: {
    coordinates: [
      lat: number,
      long: number
    ]
  },
  properties: {
    id: number,
    title: string,
    estado: string,
    address: string,
    bicisDisponibles: number,
    anclajesDisponibles: number,
    description: string
  }
 
}

export interface BiziResponse {
  result: BiziItem[];
}

