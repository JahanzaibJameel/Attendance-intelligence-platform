import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { Theme, ThemeContextType } from '../../types/theme';
import { applyThemeToDocument, saveThemeToStorage, loadThemeFromStorage } from '../../utils/theme-utils';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'attendance-platform-theme'
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  // Resolve the actual theme to apply
  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  // Initialize theme from localStorage
  useEffect(() => {
    const stored = loadThemeFromStorage(storageKey);
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      setTimeout(() => setThemeState(stored as Theme), 0);
    }
    setTimeout(() => setIsInitialized(true), 0);
  }, [storageKey]);

  // Monitor system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Set initial system theme - use setTimeout to avoid synchronous setState
    setTimeout(() => setSystemTheme(mediaQuery.matches ? 'dark' : 'light'), 0);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isInitialized) {
      applyThemeToDocument(resolvedTheme);
    }
  }, [resolvedTheme, isInitialized]);

  // Save theme to localStorage
  useEffect(() => {
    if (isInitialized) {
      saveThemeToStorage(theme, storageKey);
    }
  }, [theme, storageKey, isInitialized]);

  // Theme manipulation functions
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prevTheme => {
      switch (prevTheme) {
        case 'light': return 'dark';
        case 'dark': return 'system';
        case 'system': return 'light';
        default: return 'light';
      }
    });
  }, []);

  const contextValue: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    systemTheme,
    isSystemDark: systemTheme === 'dark'
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
