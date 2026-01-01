import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/axiosInstance';
/**
 * Récupère tous les événements
 */
export const fetchAllEvents = createAsyncThunk(
  'events',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/events');
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du chargement des événements');
    }
  }
);


/**
 * 🔹 Récupère les événements de l’utilisateur actuellement connecté
 */
export const fetchEventsByUser = createAsyncThunk(
  'events/fetchEventsByUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const currentUserId = state.user.user?._id;

      if (!currentUserId) {
        return rejectWithValue('Utilisateur non connecté.');
      }

      const response = await api.get(`/events/user/${currentUserId}`);
      
      console.log('====================================');
      console.log('User events:', response.data);
      console.log('====================================');

      return response.data;
    } catch (error) {
      console.error('Erreur fetchEventsByUser:', error);
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du chargement des événements utilisateur');
    }
  }
);

/**
 * Récupère un événement par ID
 */
export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du chargement de l’événement');
    }
  }
);

/**
 * Crée un nouvel événement
 */
export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/events', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la création de l’événement');
    }
  }
);

/**
 * Met à jour un événement existant
 */
export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/events/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la mise à jour de l’événement');
    }
  }
);

/**
 * Supprime un événement
 */
export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/events/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la suppression de l’événement');
    }
  }
);
