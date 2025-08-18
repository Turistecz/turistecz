export interface cardsHome {
  nombre: string;
  url: string;
  id: number;
  esFavorito? : boolean;
}

export interface cardsHomeResponse {
  id: string;
  imagenes: cardsHome[];
}