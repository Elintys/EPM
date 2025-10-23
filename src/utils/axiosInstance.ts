// import { API_URL_DEV, API_URL_PROD, APP_ENV } from "@env";
import { API_URL_DEV, API_URL_PROD, APP_ENV } from "@env";
import auth from "@react-native-firebase/auth";
import axios from "axios";

// Crée une instance Axios avec une base URL
// const api = axios.create({
//   baseURL: "http://localhost:3000/api/auth/login", 
//   baseURL: APP_ENV === "development" ? API_URL_DEV : API_URL_PROD, 
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });



const instance = axios.create({
  baseURL: APP_ENV === "development" ? API_URL_DEV : API_URL_PROD,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Intercepteur pour ajouter automatiquement le token Firebase
instance.interceptors.request.use(async (config) => {
  const currentUser = auth().currentUser;
  if (currentUser) {
    const idToken = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${idToken}`;
  }
  return config;
});

export default instance;

