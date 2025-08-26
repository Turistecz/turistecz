export interface Accommodation {
  title: string;
  descripcion: string;
  email: string;
  link?: string;
}

export interface AccommodationResponse {
  result: Accommodation[];
}