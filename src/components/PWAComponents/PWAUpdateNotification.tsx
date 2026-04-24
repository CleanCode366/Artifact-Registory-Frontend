import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { registerSW } from 'virtual:pwa-register';

/**
 * PWA Update Notification Hook
 * Integrates with notistack to show update notifications
 * Usage: Place <PWAUpdateNotification /> in your App or main layout
 */
export function usePWAUpdateNotification() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        enqueueSnackbar('New version available!', {
          variant: 'info',
          persist: true,
          action: (key) => (
            <button
              onClick={() => {
                updateSW();
                window.location.reload();
              }}
              style={{
                color: 'white',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Reload
            </button>
          ),
        });
      },
      onOfflineReady() {
        enqueueSnackbar('App is ready to work offline', {
          variant: 'success',
          autoHideDuration: 4000,
        });
      },
      immediate: true,
    });

    (window as any).__updateSW = updateSW;
  }, [enqueueSnackbar]);
}

/**
 * PWA Update Notification Component
 * Wraps the hook for easier integration
 * Usage:
 * <SnackbarProvider>
 *   <PWAUpdateNotification />
 *   <App />
 * </SnackbarProvider>
 */
export function PWAUpdateNotification() {
  usePWAUpdateNotification();
  return null;
}
