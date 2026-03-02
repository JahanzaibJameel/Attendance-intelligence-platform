import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  GraduationCap, 
  Bell, 
  FileText, 
  Settings
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    path: '/analytics',
  },
  {
    id: 'students',
    label: 'Students',
    icon: Users,
    path: '/students',
  },
  {
    id: 'classes',
    label: 'Classes',
    icon: GraduationCap,
    path: '/classes',
  },
  {
    id: 'alerts',
    label: 'Alerts',
    icon: Bell,
    path: '/alerts',
    badge: 3,
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    path: '/reports',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/settings',
  },
];

export const MinimalSidebar: React.FC = () => {
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-16 bg-surface-50 dark:bg-surface-900 border-r border-gray-200 dark:border-gray-800 z-40">
      <nav className="p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActivePath(item.path);
          
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={`
                relative flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
              title={item.label}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full" />
              )}

              {/* Icon */}
              <Icon className="w-5 h-5" />

              {/* Badge */}
              {item.badge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default MinimalSidebar;
