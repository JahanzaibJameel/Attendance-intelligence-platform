import { useContext } from 'react';
import { BulkActionsContext } from '../components/bulk/BulkActions';

export const useBulkOperations = <T extends { id: string }>(items: T[]) => {
  const context = useContext(BulkActionsContext);
  const { selectedItems, toggleItem, toggleAll, clearSelection } = context || { 
    selectedItems: new Set(), 
    toggleItem: () => {}, 
    toggleAll: () => {}, 
    clearSelection: () => {} 
  };

  const selectedData = items.filter(item => selectedItems.has(item.id));
  const isAllSelected = selectedItems.size === items.length && items.length > 0;
  const isPartiallySelected = selectedItems.size > 0 && selectedItems.size < items.length;

  return {
    selectedItems,
    selectedData,
    isAllSelected,
    isPartiallySelected,
    toggleItem,
    toggleAll: () => toggleAll(items.map(item => item.id)),
    clearSelection
  };
};
