export interface cardsHome {
  nombre: string;
  url: string;
  id: number;
}



export interface cardsHomeResponse {
  id: string;
  imagenes: cardsHome[];
}