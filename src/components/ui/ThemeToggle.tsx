import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import type { Theme } from '../../types';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'dropdown';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'button'
}) => {
  const { theme, setTheme } = useTheme();

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="w-full px-3 py-2 text-sm font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="light" className="flex items-center">
            ☀️ Light
          </option>
          <option value="dark" className="flex items-center">
            🌙 Dark
          </option>
          <option value="system" className="flex items-center">
            💻 System
          </option>
        </select>
      </div>
    );
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className={iconSizes[size]} />;
      case 'dark':
        return <Moon className={iconSizes[size]} />;
      case 'system':
        return <Monitor className={iconSizes[size]} />;
      default:
        return <Sun className={iconSizes[size]} />;
    }
  };

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      onClick={cycleTheme}
      className={`
        ${sizeClasses[size]}
        rounded-lg 
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        text-gray-500 dark:text-gray-400
        hover:bg-gray-50 dark:hover:bg-gray-700
        hover:text-gray-700 dark:hover:text-gray-300
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        transition-all duration-200
        ${className}
      `}
      title={`Current theme: ${theme}. Click to cycle themes.`}
      aria-label={`Theme toggle. Current theme: ${theme}`}
    >
      {getIcon()}
    </button>
  );
};

export default ThemeToggle;
