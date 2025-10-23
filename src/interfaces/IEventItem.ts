// --- Interface for Event Item ---
export interface IEventItem {
  _id: string;
  title: string;
  description: string;
  organizer: string;
  organization: string;
  venue: string;
  category: string;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  tickets: any[];   // tableau pour tickets
  staff: string[];  // tableau d'IDs du staff
  [key: string]: any;
}

// --- Interface for event Suggestion Item ---
export interface ISuggestionItem {
    id: string;
    title: string;
}