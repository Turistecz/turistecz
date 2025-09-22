export interface Accommodation {
 title: string;
  streetAddress?: string;
  telefonos?: string;
  link?: string;
}

export interface AccommodationResponse {
  result: Accommodation[];
}