/**
 * PWA Integration Examples
 * 
 * This file shows various ways to integrate PWA features into your application.
 * Copy and adapt these examples to your specific needs.
 */

import React from 'react';

// ============================================================
// Example 1: Basic PWA with Update Notifications
// ============================================================

import { SnackbarProvider } from 'notistack';
import { PWAUpdateNotification } from '@/components/PWAUpdateNotification';
import { PWAInstallBanner, OfflineIndicator } from '@/components/PWABanners';
import App from '@/App';

export function AppWithPWA() {
  return (
    <SnackbarProvider maxSnack={5}>
      {/* Service worker update notifications */}
      <PWAUpdateNotification />

      {/* Install banner */}
      <PWAInstallBanner />

      {/* Offline indicator */}
      <OfflineIndicator />

      {/* Main app */}
      <App />
    </SnackbarProvider>
  );
}

// ============================================================
// Example 2: Using PWA Hooks in Components
// ============================================================

import { useOnlineStatus, useInstallPrompt, useIsAppInstalled } from '@/hooks/usePWA';

export function ComponentWithPWAFeatures() {
  // Detect online/offline status
  const isOnline = useOnlineStatus();

  // Get installation prompt
  const { canInstall, installApp } = useInstallPrompt();

  // Check if app is already installed
  const isInstalled = useIsAppInstalled();

  return (
    <div>
      <h2>PWA Status</h2>
      <p>Online: {isOnline ? '✅ Yes' : '❌ No'}</p>
      <p>Installed: {isInstalled ? '✅ Yes' : '❌ No'}</p>
      <p>Can Install: {canInstall ? '✅ Yes' : '❌ No'}</p>

      {canInstall && !isInstalled && (
        <button onClick={installApp}>Install App</button>
      )}
    </div>
  );
}

// ============================================================
// Example 3: PWA Utilities Usage
// ============================================================

import {
  isOnline,
  onNetworkStatusChange,
  cacheUtils,
  installUtils,
  notificationUtils,
} from '@/utils/pwaUtils';

async function handleCacheManagement() {
  // Check online status
  console.log('Is online:', isOnline());

  // Get cache size
  const size = await cacheUtils.getCacheSize();
  console.log('Cache size:', cacheUtils.formatBytes(size));

  // Get cached URLs
  const cachedUrls = await cacheUtils.getCachedUrls('api-cache');
  console.log('Cached APIs:', cachedUrls);

  // Clear all caches
  // await cacheUtils.clearAllCaches();

  // Check if app can be installed
  if (installUtils.canInstall()) {
    await installUtils.installApp();
  }

  // Send notification
  await notificationUtils.requestPermission();
  await notificationUtils.sendNotification('Hello from PWA!', {
    body: 'This is a web notification',
    icon: '/cdacroundlogo.png',
    tag: 'pwa-notification',
  });
}

// Listen for network status changes
onNetworkStatusChange((isOnline) => {
  console.log('Network status changed:', isOnline ? 'online' : 'offline');
  // Handle offline/online events
});

// ============================================================
// Example 4: Service Worker Manual Registration
// ============================================================

import {
  initServiceWorker,
  forceUpdateCheck,
  unregisterServiceWorkers,
} from '@/utils/serviceWorkerRegistration';

// Initialize service worker (already done in main.tsx)
initServiceWorker();

// Force check for updates
async function checkForUpdates() {
  forceUpdateCheck();
}

// Unregister all service workers (for debugging)
async function clearServiceWorkers() {
  await unregisterServiceWorkers();
}

// ============================================================
// Example 5: Conditional Features Based on PWA Status
// ============================================================

export function FeatureBasedOnPWA() {
  const isInstalled = useIsAppInstalled();
  const isOnline = useOnlineStatus();

  return (
    <div>
      {isOnline && (
        <section>
          <h3>Online Features</h3>
          <ul>
            <li>Sync data with server</li>
            <li>Download new content</li>
            <li>Upload files</li>
          </ul>
        </section>
      )}

      {!isOnline && (
        <section>
          <h3>Offline Features</h3>
          <ul>
            <li>View cached content</li>
            <li>Work with local data</li>
            <li>Queued operations</li>
          </ul>
        </section>
      )}

      {isInstalled && (
        <section>
          <h3>Native App Features</h3>
          <ul>
            <li>Full screen mode</li>
            <li>App shortcuts</li>
            <li>Custom shortcuts</li>
          </ul>
        </section>
      )}
    </div>
  );
}

// ============================================================
// Example 6: Navbar with PWA Status
// ============================================================

export function NavbarWithPWAStatus() {
  const isOnline = useOnlineStatus();
  const isInstalled = useIsAppInstalled();
  const { canInstall, installApp } = useInstallPrompt();

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>CDAC Inscription Analyzer</div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {/* Online status indicator */}
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: isOnline ? '#4caf50' : '#f44336',
            title: isOnline ? 'Online' : 'Offline',
          }}
        />

        {/* Install button */}
        {canInstall && !isInstalled && (
          <button onClick={installApp} style={{ padding: '8px 16px' }}>
            📥 Install App
          </button>
        )}

        {/* Installed indicator */}
        {isInstalled && (
          <span style={{ fontSize: '12px', color: '#666' }}>✓ App Installed</span>
        )}
      </div>
    </nav>
  );
}

// ============================================================
// Example 7: Setup with SnackbarProvider (Main.tsx Style)
// ============================================================

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Option A: Wrap with SnackbarProvider
export function renderWithPWA() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <SnackbarProvider maxSnack={3}>
        <PWAUpdateNotification />
        <PWAInstallBanner />
        <OfflineIndicator />
        <App />
      </SnackbarProvider>
    </StrictMode>
  );
}

// Option B: Keep existing setup and add PWA everywhere
export function integrateWithExistingSetup() {
  // In your main.tsx, just add the service worker initialization
  // The rest of PWA features can be selectively added to components
}

// ============================================================
// Example 8: Development Helpers
// ============================================================

// Add to window for easy testing in console
if (import.meta.env.DEV) {
  (window as any).__pwa = {
    isOnline,
    cacheUtils,
    installUtils,
    notificationUtils,
    checkForUpdates,
    clearServiceWorkers,
  };

  console.log(
    'PWA utilities available at window.__pwa (dev only)',
  );
}

// ============================================================
// Example 9: Custom App Component with Full PWA Integration
// ============================================================

export function FullyIntegratedApp() {
  const isOnline = useOnlineStatus();
  const isInstalled = useIsAppInstalled();
  const { canInstall, installApp } = useInstallPrompt();

  React.useEffect(() => {
    // Log PWA status on mount
    console.log('PWA Status:', {
      online: isOnline,
      installed: isInstalled,
      canInstall,
    });
  }, [isOnline, isInstalled, canInstall]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header with PWA controls */}
      <NavbarWithPWAStatus />

      {/* Main content area */}
      <main style={{ flex: 1 }}>
        <App />
      </main>

      {/* Status indicators */}
      <OfflineIndicator />
    </div>
  );
}
