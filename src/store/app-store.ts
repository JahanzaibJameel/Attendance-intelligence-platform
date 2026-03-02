import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  userRole: 'admin' | 'teacher' | 'student';
  notifications: Notification[];
  
  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setSidebarOpen: (open: boolean) => void;
  setUserRole: (role: 'admin' | 'teacher' | 'student') => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  autoClose?: boolean;
  duration?: number;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      sidebarOpen: false,
      userRole: 'admin',
      notifications: [],

      setTheme: (theme) => set({ theme }),
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      setUserRole: (role) => set({ userRole: role }),
      
      addNotification: (notification) => {
        const id = crypto.randomUUID();
        const newNotification: Notification = {
          ...notification,
          id,
          timestamp: new Date(),
          autoClose: notification.autoClose ?? true,
          duration: notification.duration ?? 5000,
        };
        
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));

        // Auto-remove notification if specified
        if (newNotification.autoClose && newNotification.duration) {
          setTimeout(() => {
            get().removeNotification(id);
          }, newNotification.duration);
        }
      },
      
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        theme: state.theme,
        userRole: state.userRole,
      }),
    }
  )
);
