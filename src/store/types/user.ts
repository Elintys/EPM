export interface UserState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}