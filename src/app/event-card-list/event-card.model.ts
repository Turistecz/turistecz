export interface EventItem {
  title: string;
  description: string;
  link: string;
  category?: string; // opcional, si en el futuro decides asignarla manual o dinámicamente
  fechas?: {
    startDate: string;
    endDate: string;
  };
}

export interface EventResponse {
  result: EventItem[];
}
