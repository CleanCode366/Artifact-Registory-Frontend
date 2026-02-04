import { type AxiosInstance } from "axios";

export const errorInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};
