import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "./slices/user/userSlice";
import eventReducer from "./slices/event/eventSlice";
import categoryReducer from "./slices/category/categorySlice";
import guestReducer from "./slices/guest/guestSlice";

// Configuration de la persistance
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "event"], // liste des slices à persister
};

// Combine tous les reducers
const rootReducer = combineReducers({
  user: userReducer,
  events: eventReducer,
  categories: categoryReducer,
  guests: guestReducer,
});


// Applique redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store global
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // pour éviter les erreurs liées à redux-persist
      devTools: __DEV__,
    }),
});

export const persistor = persistStore(store);
