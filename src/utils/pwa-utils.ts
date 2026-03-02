// PWA utility functions

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

interface WindowWithNavigator extends Window {
  navigator: NavigatorWithStandalone;
}

export const checkPWASupport = (): boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};

export const registerServiceWorker = async (): Promise<void> => {
  if (!checkPWASupport()) {
    console.warn('PWA is not supported in this browser');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
};

export const unregisterServiceWorker = async (): Promise<void> => {
  if (!navigator.serviceWorker) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.unregister();
    console.log('Service Worker unregistered');
  } catch (error) {
    console.error('Service Worker unregistration failed:', error);
  }
};

export const checkNetworkStatus = (): boolean => {
  return navigator.onLine;
};

export const subscribeToNetworkChanges = (callback: (online: boolean) => void): (() => void) => {
  const handleOnline = (): void => callback(true);
  const handleOffline = (): void => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return (): void => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

export const checkIfInstalled = (): boolean => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const windowWithNav = window as WindowWithNavigator;
  const isInWebAppiOS = windowWithNav.navigator.standalone === true;
  const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches;
  
  return isStandalone || isInWebAppiOS || isInWebAppChrome;
};

export const requestInstall = (): void => {
  // Trigger install prompt manually if available
  const event = new CustomEvent('beforeinstallprompt');
  window.dispatchEvent(event);
};
