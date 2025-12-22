export interface ZaragozaApiResponse {
  result: CalendarTest[]; 
}

export interface CalendarTest {
  title?: string;
  id: number;
  subEvent?: {
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
    }[];
  }[];
}