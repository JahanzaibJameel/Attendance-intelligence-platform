// Bulk operations and batch actions
import React, { createContext, useState, useCallback, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertTriangle } from 'lucide-react';
import type { BulkAction, BulkActionsContextType } from '../../types/bulk';

const BulkActionsContext = createContext<BulkActionsContextType | undefined>(undefined);

export { BulkActionsContext };

interface BulkActionsProviderProps {
  children: React.ReactNode;
}

export const BulkActionsProvider: React.FC<BulkActionsProviderProps> = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isExecuting, setIsExecuting] = useState(false);

  const toggleItem = useCallback((id: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const toggleAll = useCallback((ids: string[]) => {
    setSelectedItems(prev => {
      if (prev.size === ids.length && ids.every(id => prev.has(id))) {
        return new Set();
      }
      return new Set(ids);
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

  const executeBulkAction = useCallback(async (action: BulkAction) => {
    if (selectedItems.size === 0) return;

    setIsExecuting(true);
    try {
      await action.action(Array.from(selectedItems));
      clearSelection();
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsExecuting(false);
    }
  }, [selectedItems, clearSelection]);

  const isAllSelected = false; // Would need total count from parent
  const isPartiallySelected = selectedItems.size > 0;

  const value: BulkActionsContextType = {
    selectedItems,
    isAllSelected,
    isPartiallySelected,
    toggleItem,
    toggleAll,
    clearSelection,
    executeBulkAction,
    isExecuting
  };

  return (
    <BulkActionsContext.Provider value={value}>
      {children}
    </BulkActionsContext.Provider>
  );
};

// Individual checkbox component
interface SelectableCheckboxProps {
  id: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const SelectableCheckbox: React.FC<SelectableCheckboxProps> = ({
  id,
  checked,
  onChange,
  disabled = false,
  className = ''
}) => {
  const context = useContext(BulkActionsContext);
  const { selectedItems, toggleItem } = context || { selectedItems: new Set(), toggleItem: () => {} };
  const isChecked = checked !== undefined ? checked : selectedItems.has(id);

  const handleChange = () => {
    if (onChange) {
      onChange(!isChecked);
    } else {
      toggleItem(id);
    }
  };

  return (
    <motion.div
      className={`relative inline-flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
      />
      <div
        className={`
          w-5 h-5 rounded border-2 transition-all duration-200 cursor-pointer
          ${isChecked 
            ? 'bg-primary-500 border-primary-500' 
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isChecked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center justify-center w-full h-full"
          >
            <Check className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Select all checkbox
interface SelectAllCheckboxProps {
  ids: string[];
  className?: string;
}

export const SelectAllCheckbox: React.FC<SelectAllCheckboxProps> = ({ 
  ids, 
  className = '' 
}) => {
  const context = useContext(BulkActionsContext);
  const { selectedItems, toggleAll } = context || { selectedItems: new Set(), toggleAll: () => {} };
  const isAllSelected = selectedItems.size === ids.length && ids.length > 0;

  const handleChange = () => {
    toggleAll(ids);
  };

  return (
    <SelectableCheckbox
      id="select-all"
      checked={isAllSelected}
      onChange={handleChange}
      className={className}
    />
  );
};

// Bulk actions toolbar
interface BulkActionsToolbarProps {
  actions: BulkAction[];
  totalCount: number;
  className?: string;
}

export const BulkActionsToolbar: React.FC<BulkActionsToolbarProps> = ({
  actions: actions,
  totalCount,
  className = ''
}) => {
  const context = useContext(BulkActionsContext);
  const { selectedItems, isExecuting, executeBulkAction, clearSelection } = context || { 
    selectedItems: new Set(), 
    isExecuting: false, 
    executeBulkAction: () => Promise.resolve(), 
    clearSelection: () => {} 
  };
  const [showConfirmDialog, setShowConfirmDialog] = useState<BulkAction | null>(null);

  const handleActionClick = async (action: BulkAction) => {
    if (action.requiresConfirmation) {
      setShowConfirmDialog(action);
    } else {
      await executeBulkAction(action);
    }
  };

  const handleConfirmAction = async () => {
    if (showConfirmDialog) {
      await executeBulkAction(showConfirmDialog);
      setShowConfirmDialog(null);
    }
  };

  return (
    <>
      <AnimatePresence>
        {selectedItems.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
              flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 rounded-lg
              ${className}
            `}
          >
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {selectedItems.size} of {totalCount} selected
              </span>
              <button
                onClick={() => {
                  clearSelection();
                }}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Clear selection
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {actions?.map((action: BulkAction) => (
                <motion.button
                  key={action.id}
                  onClick={() => handleActionClick(action)}
                  disabled={isExecuting}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                    ${action.variant === 'primary' 
                      ? 'bg-primary-500 hover:bg-primary-600 text-white'
                      : action.variant === 'danger'
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {action.icon}
                  <span>{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowConfirmDialog(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Confirm Action
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {showConfirmDialog.confirmationMessage || 
                 `Are you sure you want to ${showConfirmDialog.label.toLowerCase()} ${selectedItems.size} items?`}
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmDialog(null)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  disabled={isExecuting}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                >
                  {isExecuting ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
