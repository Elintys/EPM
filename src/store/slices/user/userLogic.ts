import auth from '@react-native-firebase/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosInstance';

/**
 * Inscription : Firebase + backend Elyntis
 */
export const registerUser = createAsyncThunk(
  'user/register',
  async (
    { email, password, firstName, lastName }: { email: string; password: string; firstName: string; lastName: string },
    { rejectWithValue }
  ) => {
    try {
      // Création du compte Firebase
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const idToken = await userCredential.user.getIdToken();

      // Création du profil MongoDB via backend Elyntis
      const response = await axios.post(
        '/auth/register',
        { email, firstName, lastName },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      return { user: response.data, token: idToken };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/**
 * Connexion : Firebase + backend Elyntis
 */
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Connexion Firebase
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const idToken = await userCredential.user.getIdToken();

      // Vérifie l’existence du profil MongoDB
      const response = await axios.post(
        '/auth/login',
        {},
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      return { user: response.data, token: idToken };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/**
 * Déconnexion
 */
export const logoutUser = createAsyncThunk('user/logout', async () => {
  await auth().signOut();
  return null;
});
