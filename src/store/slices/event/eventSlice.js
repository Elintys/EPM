import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllEvents,
  fetchEventsByUser,
  fetchEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from './eventLogic';
const initialState = {
  events: [],
  selectedEvent: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEvents: (state) => {
      state.events = [];
      state.selectedEvent = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- FETCH ALL EVENTS ---
      .addCase(fetchAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur inconnue';
      })

      // --- FETCH EVENTS BY USER ---
      .addCase(fetchEventsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEventsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur inconnue';
      })

      // --- FETCH EVENT BY ID ---
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erreur inconnue';
      })

      // --- CREATE EVENT ---
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.error = action.payload || 'Erreur inconnue';
      })

      // --- UPDATE EVENT ---
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        if (state.selectedEvent && state.selectedEvent._id === action.payload._id) {
          state.selectedEvent = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.error = action.payload || 'Erreur inconnue';
      })

      // --- DELETE EVENT ---
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e._id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.error = action.payload || 'Erreur inconnue';
      });
  },
});

export const { clearEvents } = eventSlice.actions;
export default eventSlice.reducer;
