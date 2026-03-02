import { useContext } from 'react';
import { GamificationContext } from '../components/gamification/GamificationProvider';
import type { GamificationContextType } from '../types/gamification';

export const useGamification = (): GamificationContextType => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
