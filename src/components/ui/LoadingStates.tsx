import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center justify-center ${className}`}
    >
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary-600`} />
    </motion.div>
  );
};

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...', 
  size = 'md',
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-3 p-8 ${className}`}>
      <LoadingSpinner size={size} />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-gray-500 dark:text-gray-400 animate-pulse"
      >
        {message}
      </motion.p>
    </div>
  );
};

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  animate = true 
}) => {
  return (
    <div
      className={`
        bg-gray-200 dark:bg-gray-700 rounded
        ${animate ? 'animate-pulse' : ''}
        ${className}
      `}
    />
  );
};

interface PageLoadingProps {
  message?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({ 
  message = 'Loading page...' 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingState message={message} size="lg" />
    </div>
  );
};

interface TableLoadingProps {
  rows?: number;
  columns?: number;
}

export const TableLoading: React.FC<TableLoadingProps> = ({ 
  rows = 5, 
  columns = 4 
}) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-3">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className={`
                ${colIndex === 0 ? 'w-12 h-12 rounded-full' : 'h-4 flex-1'}
                ${colIndex === columns - 1 ? 'w-20' : ''}
              `}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

interface CardLoadingProps {
  height?: string;
}

export const CardLoading: React.FC<CardLoadingProps> = ({ 
  height = 'h-48' 
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 ${height}`}>
      <div className="space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex justify-between items-end">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>
    </div>
  );
};
