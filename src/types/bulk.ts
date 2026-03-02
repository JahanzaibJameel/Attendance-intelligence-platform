export interface BulkAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: (selectedItems: string[]) => Promise<void>;
  variant: 'primary' | 'secondary' | 'danger';
  requiresConfirmation?: boolean;
  confirmationMessage?: string;
}

export interface BulkActionsContextType {
  selectedItems: Set<string>;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  toggleItem: (id: string) => void;
  toggleAll: (ids: string[]) => void;
  clearSelection: () => void;
  executeBulkAction: (action: BulkAction) => Promise<void>;
  isExecuting: boolean;
}
