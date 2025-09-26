export interface CalendarEvent {
  title: string;         // título del lugar o del evento
  startDate: string;     // fecha de inicio
  endDate: string;       // fecha de fin
  openingHours: {
    dayOfWeek: string;
    startTime: string;
  }[];
}


export interface UnifiedEvent {
  // Del root
  title: string;
  description: string;
  link: string;

  // De cada subEvent (features)
  locationTitle?: string;
  startDate?: string;
  endDate?: string;
  openingHours?: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[];
}