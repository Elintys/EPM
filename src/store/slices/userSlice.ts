import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import axios from '../../utils/axiosInstance';

export interface UserState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

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
      // 1️⃣ Création du compte Firebase
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const idToken = await userCredential.user.getIdToken();

      // 2️⃣ Création du profil MongoDB via backend Elyntis
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
      // 1️⃣ Connexion Firebase
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const idToken = await userCredential.user.getIdToken();

      // 2️⃣ Vérifie l’existence du profil MongoDB
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // REGISTER
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // LOGOUT
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
