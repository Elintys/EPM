import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/axiosInstance';

/**
 * Récupère les invités d’un événement donné
 */
export const fetchGuestsByEvent = createAsyncThunk(
  'invitations/event',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/invitations/event/${eventId}`);
      console.log(`Invités de l’événement ${eventId}:`, response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur fetchGuestsByEvent:', error);
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du chargement des invités');
    }
  }
);
