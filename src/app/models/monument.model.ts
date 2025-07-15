export interface MonumentItem {
  id: number;
  title: string;
  description: string;
  address: string;
  horario: string;
  phone: string;
  price: string;
  image: string;
  uri: string;
  imagenes: [{
    url: string,
    nombre: string,
    copy: string,
    id: number
  }]
}

export interface MonumentResponse {
  result: MonumentItem[];
}
