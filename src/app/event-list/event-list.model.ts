export interface EventItem {
  id: string;
  title: string;
  link: string;
  description: string;
  category: string;
}

export interface EventResponse {
  result: EventItem[];
}
