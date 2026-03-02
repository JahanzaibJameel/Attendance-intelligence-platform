import { useContext } from 'react';
import { PWAContext } from '../utils/pwa';
import type { PWAContextType } from '../utils/pwa';

export const usePWA = (): PWAContextType => {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWA must be used within a PWAProvider');
  }
  return context;
};
