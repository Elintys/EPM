import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosInstance';
import { authInstance } from '../../../constants/config/firebaseConfig';

/**
 * Inscription : Firebase + backend Elyntis
 */
export const registerUser = createAsyncThunk(
  'user/register',
  async (
    { email, password, firstName, lastName },
    { rejectWithValue }
  ) => {
    try {
      // Création du compte Firebase
      const userCredential = await authInstance.createUserWithEmailAndPassword(email, password);
      const idToken = await userCredential.user.getIdToken();

      // Création du profil MongoDB via backend Elyntis
      const response = await axios.post(
        '/auth/register',
        { email, firstName, lastName },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      return { user: response.data, token: idToken };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/**
 * Connexion : Firebase + backend Elyntis
 */
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {

      console.log('====================================');
      console.log("entree dans le login: firebase Token: ", email, password);
      console.log('====================================');
    try {
      // Connexion Firebase
      const userCredential = await authInstance.signInWithEmailAndPassword(email, password);
      const idToken = await userCredential.user.getIdToken();

      console.log('====================================');
      console.log("entree dans le login: firebase Token: ", idToken);
      console.log('====================================');
      // Vérifie l’existence du profil MongoDB
      const response = await axios.post(
        '/auth/login',
        {},
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      return { user: response.data, token: idToken };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/**
 * Déconnexion
 */
export const logoutUser = createAsyncThunk('user/logout', async () => {
  await authInstance.signOut();
  return null;
});
