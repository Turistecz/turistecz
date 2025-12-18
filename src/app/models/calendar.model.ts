export interface ZaragozaApiResponse {
  result: CalendarTest[]; 
}

export interface CalendarTest {
  title?: string;
  subEvent?: {
    id: number;
    location?: {
      title?: string;
      streetAddress?: string;
      accessibility?: string;
    }
    startDate: string;
    endDate?: string;
    openingHours?: {
      dayOfWeek?: string;
      startTime?: string;
    };
  }[];
}