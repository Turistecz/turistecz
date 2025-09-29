export interface CalendarTest {
  title: string;
  startDate: string;
  endDate?: string;
  subEvent?: {
    title: string;
    openingHours?: {
      dayOfWeek: string;
      startTime: string;
      endTime?: string;
    }[];
  }[];
  } 