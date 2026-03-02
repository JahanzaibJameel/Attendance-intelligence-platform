import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavigation from '../components/layout/TopNavigation';
import { MinimalSidebar } from '../components/layout/MinimalSidebar';

const AppLayout: React.FC = () => {
  // For now, bypass authentication check
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-surface-0 dark:bg-surface-950">
      {/* Top Navigation */}
      <TopNavigation />

      <div className="flex">
        {/* Minimal Sidebar */}
        <MinimalSidebar />

        {/* Main Content */}
        <main className="flex-1 ml-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
