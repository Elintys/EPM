import api from "../../utils/axiosInstance";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  register: async (data: RegisterData) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  login: async (data: LoginData) => {
      console.log('====================================');
      console.log("auth response: ",data.email, data.password);
      console.log('====================================');
    const res = await api.post("http://localhost:3000/api/auth/login", data);
    // const res = await api.post("/auth/login", data);
    return res.data;
  },

  recoverPassword: async (email: string) => {
    const res = await api.post("/auth/recover", { email });
    return res.data;
  },
};
