import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "./slices/userSlice";

// Configuration de la persistance
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"], // liste des slices à persister
};

// Combine tous les reducers
const rootReducer = combineReducers({
  user: userReducer,
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
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefault) => getDefault({ serializableCheck: false }),
// });

