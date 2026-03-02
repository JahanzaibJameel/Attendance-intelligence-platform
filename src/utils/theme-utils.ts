export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const applyThemeToDocument = (theme: 'light' | 'dark'): void => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(theme);
    
    // Set data attribute for CSS
    root.setAttribute('data-theme', theme);
  }
};

export const saveThemeToStorage = (theme: string, storageKey: string): void => {
  try {
    localStorage.setItem(storageKey, theme);
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error);
  }
};

export const loadThemeFromStorage = (storageKey: string): string | null => {
  try {
    return localStorage.getItem(storageKey);
  } catch (error) {
    console.warn('Failed to load theme from localStorage:', error);
    return null;
  }
};
