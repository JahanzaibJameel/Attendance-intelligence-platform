import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

// Import design tokens (must be first)
import './styles/design-tokens.css';
import './styles/dark-mode.css';

// Layout Components
import AppRoutes from './routing/AppRoutes';

// Components
import { ErrorBoundary as AppErrorBoundary } from './components/error/ErrorBoundary';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { ResponsiveProvider } from './components/responsive/ResponsiveProvider';
import { PWAProvider } from './utils/pwa';
import { GamificationProvider } from './components/gamification/GamificationProvider';
import { AnalyticsProvider } from './components/analytics/AdvancedAnalytics';
import { BulkActionsProvider } from './components/bulk/BulkActions';

// Create optimized QueryClient with production-ready configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && 'status' in error && typeof error.status === 'number') {
          if (error.status >= 400 && error.status < 500) return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Error boundary fallback
const ErrorFallback = ({ error, resetErrorBoundary }: { 
  error: Error; 
  resetErrorBoundary: () => void 
}) => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="text-center max-w-md">
      <div className="w-16 h-16 bg-danger-100 dark:bg-danger-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-danger-600 dark:text-danger-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {error.message || 'An unexpected error occurred while loading this page.'}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
);

function App() {
  return (
    <AppErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ResponsiveProvider>
          <PWAProvider>
            <ThemeProvider>
              <GamificationProvider userId="current-user">
                <AnalyticsProvider>
                  <BulkActionsProvider>
                    <Router>
                      <div className="min-h-screen bg-surface-0 dark:bg-surface-950 transition-colors duration-200">
                        <AppRoutes />
                      </div>
                    </Router>
                    
                    {/* Global Toast Notifications */}
                    <Toaster 
                      position="top-right"
                      expand={false}
                      richColors
                      closeButton
                      toastOptions={{
                        style: {
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-primary)',
                        },
                      }}
                    />
                  </BulkActionsProvider>
                </AnalyticsProvider>
              </GamificationProvider>
            </ThemeProvider>
          </PWAProvider>
        </ResponsiveProvider>
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}
export default App;
