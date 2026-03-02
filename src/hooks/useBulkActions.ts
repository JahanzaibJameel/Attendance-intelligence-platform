import { useContext } from 'react';
import { BulkActionsContext } from '../components/bulk/BulkActions';
import type { BulkActionsContextType } from '../types/bulk';

export const useBulkActions = (): BulkActionsContextType => {
  const context = useContext(BulkActionsContext);
  if (!context) {
    throw new Error('useBulkActions must be used within a BulkActionsProvider');
  }
  return context;
};
