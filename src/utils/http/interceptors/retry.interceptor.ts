import { type AxiosInstance } from "axios";

export const retryInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(undefined, async (error) => {
    const config = error.config;
    if (error.response?.status === 429 && !config._retry) {
      config._retry = true;
      return client(config);
    }
    return Promise.reject(error);
  });
};
