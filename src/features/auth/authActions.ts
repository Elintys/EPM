// import { logout, setError, setUser, startLoading } from "../../store/slices/userSlice";
import { AppDispatch } from "../../store/store";
import { authService } from "./authService";

export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    console.log('====================================');
    console.log("body request: email:",email,"password: ",password);
    console.log('====================================');
    const data = await authService.login({ email, password });
    console.log('====================================');
    console.log("data lors de la connexion: ", data);
    console.log('====================================');
    dispatch(setUser(data.user));
  } catch (err: any) {
    dispatch(setError(err.response?.data?.message || "Erreur de connexion"));
    console.log('====================================');
    console.log("Erreur lors de la connexion: ", err);
    console.log('====================================');
}
};

export const registerUser = (name: string, email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const data = await authService.register({ name, email, password });
    dispatch(setUser(data.user));
  } catch (err: any) {
    dispatch(setError(err.response?.data?.message || "Erreur lors de l'inscription"));
  }
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(logout());
};
