export interface CalendarTest {
  title: string;
  id:number;
  startDate: string;
  endDate?: string;
  location?: string;
  subEvent?: {
    title: string;
    openingHours?: {
      dayOfWeek: string;
      startTime: string;
      endTime?: string;
    }[];
  }[];
  }