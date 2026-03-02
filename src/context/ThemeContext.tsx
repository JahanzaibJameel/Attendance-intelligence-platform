import React, { createContext, ReactNode, useEffect, useCallback } from 'react';
import type { Theme, ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get system preference
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Get saved theme or default to system
  const getSavedTheme = useCallback((): Theme => {
    if (typeof window === 'undefined') return 'system';
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'system';
  }, []);

  // Get effective theme (what's actually applied)
  const getEffectiveTheme = useCallback((theme: Theme): 'light' | 'dark' => {
    if (theme === 'system') {
      return getSystemTheme();
    }
    return theme;
  }, [getSystemTheme]);

  const setTheme = useCallback((newTheme: Theme): void => {
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to document
    const effective = getEffectiveTheme(newTheme);
    if (effective === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', effective === 'dark' ? '#0f172a' : '#ffffff');
    }
  }, [getEffectiveTheme]);

  // Initialize theme on mount
  useEffect(() => {
    const theme = getSavedTheme();
    setTheme(theme);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (getSavedTheme() === 'system') {
        setTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [getSavedTheme, setTheme]);

  const theme = getSavedTheme();
  const systemTheme = getSystemTheme();
  const effectiveTheme = getEffectiveTheme(theme);

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    systemTheme,
    effectiveTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
