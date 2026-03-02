import { useContext } from 'react';
import { ResponsiveContext } from '../components/responsive/ResponsiveProvider';
import type { ResponsiveContextType } from '../types/responsive';

export const useResponsive = (): ResponsiveContextType => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive must be used within a ResponsiveProvider');
  }
  return context;
};
