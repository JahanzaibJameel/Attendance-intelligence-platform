import React, { createContext, useState, useEffect, useContext } from 'react';
import type { ResponsiveContextType, Breakpoint } from '../../types/responsive';

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

interface ResponsiveProviderProps {
  children: React.ReactNode;
}

export const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({ children }) => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  const getBreakpoint = (width: number): Breakpoint => {
    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    if (width < 1536) return 'xl';
    return '2xl';
  };

  const breakpoint = getBreakpoint(dimensions.width);
  const isMobile = dimensions.width < 768;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1024;
  const isDesktop = dimensions.width >= 1024;
  const isLargeScreen = dimensions.width >= 1536;
  const orientation = dimensions.width > dimensions.height ? 'landscape' : 'portrait';

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contextValue: ResponsiveContextType = {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    width: dimensions.width,
    height: dimensions.height,
    orientation
  };

  return (
    <ResponsiveContext.Provider value={contextValue}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export { ResponsiveContext };

// Responsive component wrapper
interface ResponsiveProps {
  children: React.ReactNode;
  className?: string;
  mobile?: React.ReactNode;
  tablet?: React.ReactNode;
  desktop?: React.ReactNode;
}

export const Responsive: React.FC<ResponsiveProps> = ({
  children,
  className = '',
  mobile,
  tablet,
  desktop
}) => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('Responsive must be used within a ResponsiveProvider');
  }
  
  const { isMobile, isTablet, isDesktop } = context;

  if (mobile && isMobile) return <>{mobile}</>;
  if (tablet && isTablet) return <>{tablet}</>;
  if (desktop && isDesktop) return <>{desktop}</>;
  
  return <div className={className}>{children}</div>;
};

// Mobile-first layout components
interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, className = '' }) => (
  <div className={`block sm:hidden ${className}`}>{children}</div>
);

export const TabletLayout: React.FC<MobileLayoutProps> = ({ children, className = '' }) => (
  <div className={`hidden sm:block md:hidden ${className}`}>{children}</div>
);

export const DesktopLayout: React.FC<MobileLayoutProps> = ({ children, className = '' }) => (
  <div className={`hidden md:block ${className}`}>{children}</div>
);

// Responsive text component
interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  mobile?: string;
  tablet?: string;
  desktop?: string;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  className = '',
  mobile = 'text-sm',
  tablet = 'text-base',
  desktop = 'text-lg'
}) => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('ResponsiveText must be used within a ResponsiveProvider');
  }
  
  const { isMobile, isTablet } = context;
  const textSize = isMobile ? mobile : isTablet ? tablet : desktop;
  
  return <span className={`${textSize} ${className}`}>{children}</span>;
};
