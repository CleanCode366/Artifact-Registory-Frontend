export const getEnvConfig = () => ({
  backendDetectUrl: window._env_?.VITE_BACKEND_AI_URL || import.meta.env.VITE_BACKEND_AI_URL,
  backendApiUrl: window._env_?.VITE_BACKEND_API_URL || import.meta.env.VITE_BACKEND_API_URL,
  backendBaseUrl: window._env_?.VITE_BACKEND_BASE_URL || import.meta.env.VITE_BACKEND_BASE_URL,
  webhookUrl: window._env_?.VITE_N8N_WEBHOOK_URL || import.meta.env.VITE_N8N_WEBHOOK_URL,
});