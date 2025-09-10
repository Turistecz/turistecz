export interface Accommodation {
 title: string;
  streetAddress?: string;
  email?: string;
  telefonos?: string;
  link?: string;
}

export interface AccommodationResponse {
  result: Accommodation[];
}