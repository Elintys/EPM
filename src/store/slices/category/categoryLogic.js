import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/axiosInstance';

/**
 * Récupère la liste des catégories disponibles dans la base
 */
export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/categories');
      console.log('Catégories récupérées:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du chargement des catégories');
    }
  }
);

/**
 * Récupère les événements d’une catégorie donnée
 */
export const fetchEventsByCategory = createAsyncThunk(
  'categories/fetchEventsByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/events/category/${categoryId}`);
      console.log(`Événements de la catégorie ${categoryId}:`, response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du chargement des événements par catégorie');
    }
  }
);
