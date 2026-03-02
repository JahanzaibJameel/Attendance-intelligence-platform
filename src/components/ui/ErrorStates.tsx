import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home,
  ArrowLeft,
  WifiOff,
  Database,
  Lock
} from 'lucide-react';

interface ErrorStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        flex flex-col items-center justify-center text-center p-8
        bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800/30
        ${className}
      `}
    >
      {icon && (
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-red-700 dark:text-red-300 mb-6 max-w-md">
          {description}
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3">
        {action && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            {action.icon}
            <span>{action.label}</span>
          </motion.button>
        )}
        
        {secondaryAction && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={secondaryAction.onClick}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            {secondaryAction.icon}
            <span>{secondaryAction.label}</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

// Predefined error states
export const NetworkError: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <ErrorState
    icon={<WifiOff className="w-8 h-8" />}
    title="Network Error"
    description="Unable to connect to the server. Please check your internet connection and try again."
    action={onRetry ? {
      label: "Try Again",
      onClick: onRetry,
      icon: <RefreshCw className="w-4 h-4" />
    } : undefined}
  />
);

export const DataError: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <ErrorState
    icon={<Database className="w-8 h-8" />}
    title="Data Loading Error"
    description="We couldn't load the data. This might be a temporary issue."
    action={onRetry ? {
      label: "Retry",
      onClick: onRetry,
      icon: <RefreshCw className="w-4 h-4" />
    } : undefined}
    secondaryAction={{
      label: "Go Home",
      onClick: () => window.location.href = '/dashboard',
      icon: <Home className="w-4 h-4" />
    }}
  />
);

export const PermissionError: React.FC = () => (
  <ErrorState
    icon={<Lock className="w-8 h-8" />}
    title="Access Denied"
    description="You don't have permission to view this content. Please contact your administrator."
    secondaryAction={{
      label: "Go Back",
      onClick: () => window.history.back(),
      icon: <ArrowLeft className="w-4 h-4" />
    }}
  />
);

export const GenericError: React.FC<{ onRetry?: () => void; error?: string }> = ({ 
  onRetry, 
  error 
}) => (
  <ErrorState
    icon={<AlertTriangle className="w-8 h-8" />}
    title="Something went wrong"
    description={error || "An unexpected error occurred. Please try again."}
    action={onRetry ? {
      label: "Try Again",
      onClick: onRetry,
      icon: <RefreshCw className="w-4 h-4" />
    } : undefined}
    secondaryAction={{
      label: "Go Home",
      onClick: () => window.location.href = '/dashboard',
      icon: <Home className="w-4 h-4" />
    }}
  />
);

interface ErrorBoundaryFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({
  error,
  resetErrorBoundary
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GenericError 
        error={error.message}
        onRetry={resetErrorBoundary}
      />
    </div>
  );
};
