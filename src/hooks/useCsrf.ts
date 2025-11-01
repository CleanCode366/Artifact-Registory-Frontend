import { getEnvConfig } from '@/config/env';
import { useEffect } from 'react';
const { backendApiUrl } = getEnvConfig();

export function useCsrf() {
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        await fetch(`${backendApiUrl}oauth2/login/csrf-token`, {
          credentials: 'include', 
        });
      } catch (err) {
        console.error('Failed to get CSRF token', err);
      }
    };
    fetchCsrfToken();
  }, []);
}
