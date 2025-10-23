export interface Event {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  startDate: string;
  endDate: string;
  venue?: string;
  organizer: string;
  organization?: string;
  isPublic: boolean;
  tickets?: any[];
  staff?: string[];
}

export interface EventPayload {
  title: string;
  description?: string;
  category?: string;
  startDate: string;
  endDate: string;
  venue?: string;
  organizer: string;
  organization?: string;
  isPublic?: boolean;
}

export interface EventState {
  events: Event[];
  selectedEvent: Event | null;
  loading: boolean;
  error: string | null;
}