import { authStore } from "../../../store/authStore";
import { type AxiosInstance } from "axios";

export const attachAuthToken = (client: AxiosInstance) => {
  client.interceptors.request.use((config) => {
    const token = authStore.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};
