import { authStore } from "../../../store/authStore";
import type { AxiosInstance } from "axios";

let isRefreshing = false;
let pendingQueue: ((token: string) => void)[] = [];

const processQueue = (token: string) => {
  pendingQueue.forEach((cb) => cb(token));
  pendingQueue = [];
};

export const refreshTokenInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        // If refresh already in progress, wait
        if (isRefreshing) {
          return new Promise((resolve) => {
            pendingQueue.push((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            });
          });
        }

        isRefreshing = true;

        try {
          const res = await apiClient.post("/auth/refresh");

          const newAccessToken = res.data.auth_token;

          authStore.setToken(newAccessToken);
          processQueue(newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          authStore.clear();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
