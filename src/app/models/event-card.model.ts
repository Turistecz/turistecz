export interface EventItem {
  title: string;
  description: string;
  link: string;
  tema?: string; 
  fechas?: {
    startDate?: string;
    endDate?: string;
  };
}

export interface EventResponse {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: EventItem;
  }[];
}
