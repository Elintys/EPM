export interface Guest {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  eventId: string;
  checkedIn: boolean;
  avatar?: string;
  role?: string; // ex: VIP, Staff, etc.
}

export interface GuestState {
  guests: Guest[];
  loading: boolean;
  error: string | null;
}