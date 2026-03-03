import React, { createContext, ReactNode, useState } from 'react';
import type { AppContextType, User } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// Demo users for testing
const demoUsers: Record<string, { password: string; user: User }> = {
  'admin@example.com': {
    password: '123456',
    user: {
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
    },
  },
  'teacher@example.com': {
    password: '123456',
    user: {
      name: 'Teacher User',
      email: 'teacher@example.com',
      role: 'teacher',
    },
  },
  'student@example.com': {
    password: '123456',
    user: {
      name: 'Student User',
      email: 'student@example.com',
      role: 'student',
    },
  },
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const demoUser = demoUsers[email];
      if (!demoUser || demoUser.password !== password) {
        throw new Error('Invalid credentials');
      }
      
      setUser(demoUser.user);
      setIsAuthenticated(true);
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(demoUser.user));
      localStorage.setItem('isAuthenticated', 'true');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  const updateUser = (userData: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Check for existing session on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAuth = localStorage.getItem('isAuthenticated');
    
    if (storedUser && storedAuth === 'true') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch {
        // Clear invalid stored data
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    }
  }, []);

  const appContext: AppContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};

export { AppContext };
