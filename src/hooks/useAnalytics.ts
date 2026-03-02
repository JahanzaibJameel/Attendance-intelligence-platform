import { useContext } from 'react';
import { AnalyticsContext } from '../components/analytics/AdvancedAnalytics';
import type { AnalyticsContextType } from '../types/analytics';

export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
