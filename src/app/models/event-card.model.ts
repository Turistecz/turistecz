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
  result: EventItem[];
}
