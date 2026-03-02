import React, { createContext, ReactNode } from 'react';
import type { AppContextType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const appContext: AppContextType = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: async () => {},
    logout: () => {},
    updateUser: () => {},
  };

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};

export { AppContext };
