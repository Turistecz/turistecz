export interface cardsHome {
  nombre: string;
  url: string;
  id: string;
  //TODO: interfaz de adaptabilidad para ponerla aquí dentro, que incluya cada recurso en boolean
  }


export interface cardsHomeResponse {
  id: string;
  imagenes: cardsHome[];
}