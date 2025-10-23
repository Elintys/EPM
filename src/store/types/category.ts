export interface Category {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}
export interface CategoryState {
  categories: Category[];
  eventsByCategory: Event[];
  selectedCategory: string | null;
  loading: boolean;
  error: string | null;
}