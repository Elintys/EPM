import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/axiosInstance';
import { RootState } from '../../store';
import { Guest } from '../../types/guest';

/**
 * Récupère les invités d’un événement donné
 */
export const fetchGuestsByEvent = createAsyncThunk<
  Guest[],                // Type de retour
  string,                 // eventId
  { state: RootState; rejectValue: string }
>(
  'invitations/event',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/invitations/event/${eventId}`);
      console.log(`Invités de l’événement ${eventId}:`, response.data);
      return response.data as Guest[];
    } catch (error: any) {
      console.error('Erreur fetchGuestsByEvent:', error);
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du chargement des invités');
    }
  }
);
