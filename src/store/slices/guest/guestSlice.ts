import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGuestsByEvent } from './guestLogic';
import { Guest, GuestState } from '../../types/guest';



const initialState: GuestState = {
  guests: [],
  loading: false,
  error: null,
};

const guestSlice = createSlice({
  name: 'guests',
  initialState,
  reducers: {
    clearGuests: (state) => {
      state.guests = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuestsByEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuestsByEvent.fulfilled, (state, action: PayloadAction<Guest[]>) => {
        state.loading = false;
        state.guests = action.payload;
      })
      .addCase(fetchGuestsByEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur inconnue';
      });
  },
});

export const { clearGuests } = guestSlice.actions;
export default guestSlice.reducer;
