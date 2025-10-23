export interface IGuest {
  id: string;
  _id: string;
  eventId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  checkedIn: boolean;
  avatar: string;
  [key: string]: any;
}