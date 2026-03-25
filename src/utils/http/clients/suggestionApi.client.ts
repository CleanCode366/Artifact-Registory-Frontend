// suggestionApiClient.ts
import { createAxiosClient } from "../axiosFactory";

const suggestionApiUrl =
  window._env_?.VITE_N8N_WEBHOOK_URL || import.meta.env.VITE_N8N_WEBHOOK_URL;

export const suggestionApiClient = createAxiosClient(
  suggestionApiUrl,
  [],
  50000,
  false  // 👈 withCredentials: false — n8n webhook doesn't need cookies/auth headers
);