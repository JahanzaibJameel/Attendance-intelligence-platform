// Toast convenience functions - separate file to avoid fast refresh issues
import { Toast } from './toast';

// Create a global toast context reference
let toastContext: {
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
} | null = null;

export const setToastContext = (context: typeof toastContext) => {
  toastContext = context;
};

// Export the toast object for direct use
export const toast = {
  success: (title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    if (!toastContext) return '';
    return toastContext.addToast({ type: 'success', title, description, ...options });
  },
  error: (title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    if (!toastContext) return '';
    return toastContext.addToast({ type: 'error', title, description, ...options });
  },
  warning: (title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    if (!toastContext) return '';
    return toastContext.addToast({ type: 'warning', title, description, ...options });
  },
  info: (title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    if (!toastContext) return '';
    return toastContext.addToast({ type: 'info', title, description, ...options });
  },
  loading: (title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    if (!toastContext) return '';
    return toastContext.addToast({ type: 'loading', title, description, duration: 0, ...options });
  },
  dismiss: (id: string) => {
    if (!toastContext) return;
    toastContext.removeToast(id);
  },
  clear: () => {
    if (!toastContext) return;
    toastContext.clearToasts();
  }
};

// Hook for using toast functions
export const useToastFunctions = () => {
  return toast;
};
