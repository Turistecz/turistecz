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
}

export interface MonumentResponse {
  result: MonumentItem[];
}
