import { createAxiosClient } from "../axiosFactory";

const suggestionApiUrl = window._env_?.VITE_N8N_WEBHOOK_URL || import.meta.env.VITE_N8N_WEBHOOK_URL;

export const suggestionApiClient = createAxiosClient(suggestionApiUrl, []);