import React, { useState } from 'react';
import { Sun, Moon, Monitor, Sparkles } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import type { Theme } from '../../types';

interface ModernThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'dropdown' | 'switch';
}

export const ModernThemeToggle: React.FC<ModernThemeToggleProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'button'
}) => {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const cycleTheme = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    
    // Add animation delay
    await new Promise(resolve => setTimeout(resolve, 150));
    setTheme(themes[nextIndex]);
    setIsAnimating(false);
  };

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="w-full px-4 py-2 text-sm font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer"
        >
          <option value="light" className="flex items-center">
            ☀️ Light Mode
          </option>
          <option value="dark" className="flex items-center">
            🌙 Dark Mode
          </option>
          <option value="system" className="flex items-center">
            💻 System Preference
          </option>
        </select>
      </div>
    );
  }

  if (variant === 'switch') {
    return (
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
          ${theme === 'light' ? 'bg-gray-200' : 'bg-purple-600'}
        `}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
            ${theme === 'light' ? 'translate-x-1' : 'translate-x-6'}
          `}
        />
        <span className="sr-only">
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </span>
      </button>
    );
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className={`${iconSizes[size]} text-yellow-500`} />;
      case 'dark':
        return <Moon className={`${iconSizes[size]} text-blue-400`} />;
      case 'system':
        return <Monitor className={`${iconSizes[size]} text-gray-500`} />;
      default:
        return <Sun className={`${iconSizes[size]} text-yellow-500`} />;
    }
  };

  return (
    <button
      onClick={cycleTheme}
      disabled={isAnimating}
      className={`
        ${sizeClasses[size]}
        relative rounded-2xl 
        bg-gradient-to-r from-purple-500 to-pink-500
        text-white
        shadow-lg hover:shadow-xl
        transform transition-all duration-300 hover:scale-110 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center
        group
        ${className}
      `}
      title={`Current theme: ${theme}. Click to cycle themes.`}
      aria-label={`Theme toggle. Current theme: ${theme}`}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon with glow effect */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/20 rounded-full blur-md" />
        {getIcon()}
      </div>
      
      {/* Sparkle animation on hover */}
      <Sparkles 
        className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" 
      />
      
      {/* Theme indicator dot */}
      <div className={`
        absolute bottom-1 right-1 w-2 h-2 rounded-full
        ${theme === 'light' ? 'bg-yellow-400' : theme === 'dark' ? 'bg-blue-400' : 'bg-gray-400'}
      `} />
    </button>
  );
};

export default ModernThemeToggle;
