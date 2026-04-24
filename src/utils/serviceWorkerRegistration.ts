import { registerSW } from 'virtual:pwa-register';

/**
 * Service Worker Registration
 * Handles PWA updates and user notifications
 */
export function initServiceWorker(): void {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Workers are not supported in this browser');
    return;
  }

  // Register the service worker with auto-update
  const updateSW = registerSW({
    onNeedRefresh() {
      // Show update notification
      handleUpdateAvailable();
    },
    onOfflineReady() {
      // Show offline ready notification
      handleOfflineReady();
    },
    immediate: true,
  });

  // Store the update function globally for manual trigger if needed
  (window as any).__updateSW = updateSW;
}

/**
 * Handle when a new version is available
 */
function handleUpdateAvailable(): void {
  // You can show a notification/toast to the user
  console.log('New version of the app is available');

  // Optional: Show a toast notification (you can integrate with notistack)
  const message = 'New version available! Refresh to update.';
  console.log(message);

  // Optional: Auto-reload after a delay (uncomment if needed)
  // setTimeout(() => {
  //   window.location.reload();
  // }, 5000);
}

/**
 * Handle when app is ready to work offline
 */
function handleOfflineReady(): void {
  console.log('App is ready to work offline');
  // You can show a notification that the app is cached and ready for offline use
}

/**
 * Manually trigger a service worker update
 * Call this function when you want to force check for updates
 */
export function forceUpdateCheck(): void {
  const updateSW = (window as any).__updateSW;
  if (updateSW) {
    updateSW();
  }
}

/**
 * Unregister all service workers (useful for debugging)
 */
export async function unregisterServiceWorkers(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;

  const registrations = await navigator.serviceWorker.getRegistrations();
  for (const registration of registrations) {
    await registration.unregister();
  }
  console.log('All service workers unregistered');
}
