import React from 'react';

/**
 * PWA Utility Functions
 * Provides helpers for PWA functionality
 */

/**
 * Check if service workers are supported
 */
export function isServiceWorkerSupported(): boolean {
  return 'serviceWorker' in navigator;
}

/**
 * Check if app can be installed as PWA
 */
export function canInstallPWA(): boolean {
  return isServiceWorkerSupported() && 'BeforeInstallPromptEvent' in window;
}

/**
 * Check current online status
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Listen for online/offline status changes
 * @param callback Function called with online status (true/false)
 * @returns Cleanup function to remove listeners
 */
export function onNetworkStatusChange(
  callback: (isOnline: boolean) => void
): () => void {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

/**
 * Create a hook for detecting offline status
 * Usage: const isOnline = useOnlineStatus();
 */
export function createUseOnlineStatus() {
  return function useOnlineStatus() {
    const [isOnlineStatus, setIsOnlineStatus] = React.useState(isOnline());

    React.useEffect(() => {
      return onNetworkStatusChange(setIsOnlineStatus);
    }, []);

    return isOnlineStatus;
  };
}

/**
 * Cache API utilities
 */
export const cacheUtils = {
  /**
   * Open a cache store
   */
  async openCache(cacheName: string): Promise<Cache> {
    return caches.open(cacheName);
  },

  /**
   * Delete a cache store
   */
  async deleteCache(cacheName: string): Promise<boolean> {
    if (caches) {
      return caches.delete(cacheName);
    }
    return false;
  },

  /**
   * Clear all caches
   */
  async clearAllCaches(): Promise<void> {
    if (caches) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    }
  },

  /**
   * Get all cached URLs
   */
  async getCachedUrls(cacheName: string): Promise<string[]> {
    try {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      return requests.map((req) => req.url);
    } catch (error) {
      console.error(`Error reading cache ${cacheName}:`, error);
      return [];
    }
  },

  /**
   * Get cache size
   */
  async getCacheSize(): Promise<number> {
    if (!caches) return 0;

    let totalSize = 0;
    const cacheNames = await caches.keys();

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();

      for (const request of requests) {
        try {
          const response = await cache.match(request);
          if (response) {
            const blob = await response.blob();
            totalSize += blob.size;
          }
        } catch (error) {
          console.error('Error calculating cache size:', error);
        }
      }
    }

    return totalSize;
  },

  /**
   * Format bytes to human readable format
   */
  formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },
};

/**
 * PWA Installation utilities
 */
export const installUtils = {
  /**
   * Get beforeInstallPrompt event
   */
  getInstallPrompt(): BeforeInstallPromptEvent | null {
    return (window as any).__deferredPrompt || null;
  },

  /**
   * Trigger PWA installation
   */
  async installApp(): Promise<void> {
    const deferredPrompt = (window as any).__deferredPrompt;

    if (!deferredPrompt) {
      console.log('Install prompt not available');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA installed');
    } else {
      console.log('PWA installation dismissed');
    }

    (window as any).__deferredPrompt = null;
  },

  /**
   * Check if app is already installed
   */
  isAppInstalled(): 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser' | null {
    // Check if app is running as PWA
    if (window.navigator.standalone === true) {
      return 'standalone';
    }

    // Check display mode from manifest
    const displayMode = window.matchMedia('(display-mode: standalone)').matches
      ? 'standalone'
      : null;

    return displayMode;
  },
};

/**
 * Notification utilities for PWA
 */
export const notificationUtils = {
  /**
   * Request notification permission
   */
  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.log('Notifications not supported');
      return 'denied';
    }

    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      return Notification.requestPermission();
    }

    return Notification.permission;
  },

  /**
   * Send a notification
   */
  async sendNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (Notification.permission === 'granted') {
      if ('serviceWorker' in navigator && 'controller' in navigator.serviceWorker) {
        navigator.serviceWorker.controller?.postMessage({
          type: 'SHOW_NOTIFICATION',
          title,
          options,
        });
      } else {
        new Notification(title, options);
      }
    }
  },
};
