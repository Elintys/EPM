import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllCategories, fetchEventsByCategory } from './categoryLogic';
import { Category, CategoryState } from '../../types/category';



const initialState: CategoryState = {
  categories: [],
  eventsByCategory: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.categories = [];
      state.eventsByCategory = [];
      state.selectedCategory = null;
      state.error = null;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- FETCH ALL CATEGORIES ---
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur inconnue';
      })

      // --- FETCH EVENTS BY CATEGORY ---
      .addCase(fetchEventsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsByCategory.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.eventsByCategory = action.payload;
      })
      .addCase(fetchEventsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur inconnue';
      });
  },
});

export const { clearCategories, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
