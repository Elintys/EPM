// import { API_URL_DEV, API_URL_PROD, APP_ENV } from "@env";
import { API_URL_DEV, API_URL_PROD, APP_ENV } from "@env";
import { authInstance } from "../constants/config/firebaseConfig";
import axios from "axios";


const instance = axios.create({
  baseURL: APP_ENV === "development" ? API_URL_DEV : API_URL_PROD,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Intercepteur pour ajouter automatiquement le token Firebase
instance.interceptors.request.use(async (config) => {
  const currentUser = authInstance.currentUser;
  if (currentUser) {
    const idToken = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${idToken}`;
  }
  return config;
});

export default instance;
