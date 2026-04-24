import { useEffect, useState } from 'react';

/**
 * Hook to detect if the app is online or offline
 * @returns boolean - true if online, false if offline
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(() => {
    // Initialize with actual navigator status
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

/**
 * Hook to listen for the beforeinstallprompt event
 * Returns the event and a function to show the install prompt
 */
export function useInstallPrompt(): {
  installPrompt: BeforeInstallPromptEvent | null;
  canInstall: boolean;
  installApp: () => Promise<void>;
} {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const event = e as BeforeInstallPromptEvent;
      setInstallPrompt(event);
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setCanInstall(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if app is already installed (PWA mode)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setCanInstall(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) {
      console.log('Install prompt not available');
      return;
    }

    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA installation accepted');
      setInstallPrompt(null);
      setCanInstall(false);
    } else {
      console.log('PWA installation dismissed');
    }
  };

  return { installPrompt, canInstall, installApp };
}

/**
 * Hook for displaying PWA installation banner
 * Returns info about whether to show the banner
 */
export function useInstallationBanner(): {
  showBanner: boolean;
  dismiss: () => void;
  install: () => Promise<void>;
} {
  const { canInstall, installApp } = useInstallPrompt();
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show banner if install is possible and not dismissed
    if (canInstall && !dismissed) {
      // Wait a bit before showing to ensure good UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [canInstall, dismissed]);

  const dismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    // Store dismissal preference for 7 days
    const dismissalTime = new Date().getTime();
    localStorage.setItem('pwa-install-banner-dismissed', dismissalTime.toString());
  };

  return {
    showBanner,
    dismiss,
    install: installApp,
  };
}

/**
 * Hook to detect if app is running in standalone/installed mode
 */
export function useIsAppInstalled(): boolean {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (PWA installed)
    const isStandalone =
      (window.navigator as any).standalone === true ||
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches;

    setIsInstalled(isStandalone);
  }, []);

  return isInstalled;
}
