export interface cardsHome {
  nombre: string;
  url: string;
  id: string;
}

export interface cardsHomeResponse {
  id: string;
  imagenes: cardsHome[];
}