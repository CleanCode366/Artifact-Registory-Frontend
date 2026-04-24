# PWA Configuration Guide

This document explains the Progressive Web App (PWA) setup for the CDAC Inscription Analyzer application.

## Overview

The application has been configured with PWA capabilities, enabling:
- **Offline Support**: App works without internet connection
- **Installable**: Can be installed as a native-like app on devices
- **Caching**: Intelligent caching of assets and API responses
- **Auto-Updates**: Automatic detection and installation of updates
- **App Shortcuts**: Quick access to common features

## What's Been Configured

### 1. Dependencies Added
- `vite-plugin-pwa`: Vite plugin for PWA integration
- `workbox-window`: Client-side library for service worker interaction

### 2. Files Created/Modified

#### Created Files:
- `public/manifest.json` - PWA manifest with app metadata
- `src/utils/serviceWorkerRegistration.ts` - Service worker initialization
- `src/components/PWAUpdateNotification.tsx` - Update notification component
- `src/utils/pwaUtils.ts` - PWA utility functions

#### Modified Files:
- `package.json` - Added PWA dependencies
- `vite.config.ts` - Added PWA plugin configuration
- `index.html` - Added PWA meta tags and manifest link
- `src/main.tsx` - Service worker registration

### 3. Service Worker Features

The auto-generated service worker includes:

#### Asset Caching
```
- All JS, CSS, HTML, SVG, PNG, ICO files
- Images and fonts
- Max file size: 5MB per file
```

#### API Caching Strategy
```
- Network First: Tries network, falls back to cache
- Cache Duration: 5 minutes
- Max entries: 50
```

#### CDN Caching Strategy
```
- Cache First: Uses cached version if available
- Cache Duration: 30 days
- Max entries: 50
```

## Usage

### Basic Setup (Already Done)

The PWA is automatically initialized in `src/main.tsx`:

```typescript
import { initServiceWorker } from './utils/serviceWorkerRegistration.ts';

initServiceWorker();
```

### Display Update Notifications (Optional)

To show users when updates are available, use the update notification component:

```typescript
import { SnackbarProvider } from 'notistack';
import { PWAUpdateNotification } from '@/components/PWAUpdateNotification';
import App from './App';

export default function Root() {
  return (
    <SnackbarProvider>
      <PWAUpdateNotification />
      <App />
    </SnackbarProvider>
  );
}
```

### PWA Utilities

The `pwaUtils` module provides helpful functions:

```typescript
import {
  isOnline,
  onNetworkStatusChange,
  cacheUtils,
  installUtils,
  notificationUtils,
} from '@/utils/pwaUtils';

// Check online status
const online = isOnline();

// Listen for network changes
const unsubscribe = onNetworkStatusChange((isOnline) => {
  console.log('Online status changed:', isOnline);
});

// Clear caches
await cacheUtils.clearAllCaches();

// Get cache size
const size = await cacheUtils.getCacheSize();
console.log('Cache size:', cacheUtils.formatBytes(size));

// Check if app can be installed
if (installUtils.isAppInstalled()) {
  console.log('App is installed');
}

// Install PWA
await installUtils.installApp();

// Send notification
await notificationUtils.requestPermission();
await notificationUtils.sendNotification('Hello!', {
  body: 'This is a test notification',
  icon: '/cdacroundlogo.png',
});
```

## Offline Support

The app automatically works offline for:
1. **Cached Assets**: All JS, CSS, and static files
2. **Cached API Responses**: Last 50 API calls (5 minutes cache)
3. **Navigation**: Fallback page is served for navigation errors

## Installation

Users can install the app as:
- Progressive Web App on Android
- Web App on iOS (limited)
- Desktop app (Windows, macOS, Linux with certain browsers)

Installation prompt appears automatically or can be triggered via:
```typescript
import { installUtils } from '@/utils/pwaUtils';
await installUtils.installApp();
```

## Development

### Enable Service Worker in Development
The service worker is enabled in development mode for testing:
```typescript
devOptions: {
  enabled: true,
  navigateFallback: 'index.html',
  suppressWarnings: true,
}
```

### Testing PWA Features

1. **Chrome DevTools**:
   - Application tab → Service Workers
   - Application tab → Manifest
   - Application tab → Storage (view caches)

2. **Test Offline**:
   - Network tab → Throttle to "Offline"
   - Refresh page - app should work

3. **Install Prompt**:
   - Three dots menu → "Install app"
   - Or create a custom install button using `installUtils.installApp()`

### Clear Service Worker Data

For debugging, clear service workers:
```typescript
import { unregisterServiceWorkers } from '@/utils/serviceWorkerRegistration';
await unregisterServiceWorkers();
```

## Build & Deployment

### Building for Production
```bash
pnpm build
```

This generates:
- Optimized app bundle
- Service worker file (`sw.js`)
- Web app manifest
- Workbox cache manifest

### Host Requirements
- HTTPS is required for PWA in production (localhost works without HTTPS)
- Proper cache headers recommended
- Manifest.json must be served with correct MIME type

## Manifest Configuration

The manifest is defined in `src/vite.config.ts` with:
- App name and short name
- Icons (192x192 and 512x512)
- Theme colors
- Display mode (standalone)
- Start URL
- App shortcuts (Gallery, Upload)

You can also use `public/manifest.json` directly by the browser.

## Troubleshooting

### Service Worker Not Registering
- Check browser console for errors
- Verify HTTPS in production
- Clear cache and hard refresh (Ctrl+Shift+R)

### App Not Installing
- Check manifest.json is valid
- Verify icons are served correctly
- Ensure app is on HTTPS (except localhost)

### Cache Issues
- Clear caches in DevTools → Application → Storage
- Change cache names in `vite.config.ts` to force refresh
- Use `cacheUtils.clearAllCaches()`

### Updates Not Applying
- Service worker updates check every 24 hours or on page reload
- Force check: Call `forceUpdateCheck()` or reload page
- Users see update notification after new version is available

## Resources

- [MDN - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev - PWA Checklist](https://web.dev/pwa-checklist/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)

## Next Steps

1. **Test PWA**: Build and test on different devices
2. **Add Splash Screen**: Customize `public/index.html` for iOS
3. **Custom Install UI**: Create branded install button
4. **Analytics**: Track PWA installation and usage
5. **Push Notifications**: Implement web push notifications (requires server)
6. **Background Sync**: Sync data when app comes back online

## Environment Variables

Consider adding PWA-related env variables:
```
VITE_PWA_ENABLED=true
VITE_PWA_SCOPE=/
VITE_PWA_START_URL=/
```

And using them in `vite.config.ts`:
```typescript
disabled: !import.meta.env.VITE_PWA_ENABLED,
```
