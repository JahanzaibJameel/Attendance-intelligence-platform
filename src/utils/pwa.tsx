// PWA utilities and hooks
import React, { createContext, useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent {
  readonly platforms: string[];
  readonly userChoice: 'accepted' | 'dismissed';
  prompt: () => Promise<'accepted' | 'dismissed'>;
}

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

interface WindowWithNavigator extends Window {
  navigator: NavigatorWithStandalone;
}

interface PWAContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  installPrompt: BeforeInstallPromptEvent | null;
  installApp: () => Promise<void>;
  showInstallPrompt: boolean;
  setShowInstallPrompt: (show: boolean) => void;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

export type { BeforeInstallPromptEvent, PWAContextType };
export { PWAContext };

interface PWAProviderProps {
  children: React.ReactNode;
}

export const PWAProvider: React.FC<PWAProviderProps> = ({ children }) => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // Check if app is already installed
  useEffect(() => {
    const checkInstalled = (): void => {
      // Check if running in standalone mode
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const windowWithNav = window as WindowWithNavigator;
      const isInWebAppiOS = windowWithNav.navigator.standalone === true;
      const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches;
      
      setIsInstalled(isStandalone || isInWebAppiOS || isInWebAppChrome);
    };

    checkInstalled();
  }, []);

  // Listen for beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event): void => {
      e.preventDefault();
      const promptEvent = e as unknown as BeforeInstallPromptEvent;
      setInstallPrompt(promptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = (): void => {
      setIsOnline(true);
    };

    const handleOffline = (): void => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Install app
  const installApp = useCallback(async (): Promise<void> => {
    if (!installPrompt) {
      return;
    }

    try {
      const result = await installPrompt.prompt();
      if (result === 'accepted') {
        setInstallPrompt(null);
        setIsInstallable(false);
        setShowInstallPrompt(false);
        setIsInstalled(true);
      }
    } catch (error) {
      console.error('Error installing PWA:', error);
    }
  }, [installPrompt]);

  const contextValue: PWAContextType = {
    isInstallable,
    isInstalled,
    isOnline,
    installPrompt,
    installApp,
    showInstallPrompt,
    setShowInstallPrompt,
  };

  return (
    <PWAContext.Provider value={contextValue}>
      {children}
    </PWAContext.Provider>
  );
};
