import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Layout Components
import AppLayout from '../layout/AppLayout';
import AuthLayout from '../layout/AuthLayout';

// Route Guards
import { ProtectedRoute, PublicRoute } from '../components/routing/ProtectedRoute';

// Page Components (Lazy Loaded)
const LoginPage = React.lazy(() => import('../pages/auth/LoginPage'));
const DashboardPage = React.lazy(() => import('../pages/dashboard/DashboardPage'));
const AnalyticsPage = React.lazy(() => import('../pages/analytics/AnalyticsPage'));
const StudentsPage = React.lazy(() => import('../pages/students/StudentsPage'));
const StudentDetailPage = React.lazy(() => import('../pages/students/StudentDetailPage'));
const ClassesPage = React.lazy(() => import('../pages/classes/ClassesPage'));
const AlertsPage = React.lazy(() => import('../pages/alerts/AlertsPage'));
const ReportsPage = React.lazy(() => import('../pages/reports/ReportsPage'));
const SettingsPage = React.lazy(() => import('../pages/settings/SettingsPage'));
const ProfilePage = React.lazy(() => import('../pages/profile/ProfilePage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

// Loading Component
const PageLoading: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center space-y-4"
    >
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      <p className="text-gray-600 dark:text-gray-400 animate-pulse">Loading...</p>
    </motion.div>
  </div>
);

// Animation Wrapper
const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <AuthLayout>
            <Suspense fallback={<PageLoading />}>
              <AnimatedPage>
                <LoginPage />
              </AnimatedPage>
            </Suspense>
          </AuthLayout>
        </PublicRoute>
      } />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        {/* Default redirect */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard - All authenticated users */}
        <Route path="dashboard" element={
          <Suspense fallback={<PageLoading />}>
            <AnimatedPage>
              <DashboardPage />
            </AnimatedPage>
          </Suspense>
        } />

        {/* Analytics - Admin and Teacher only */}
        <Route path="analytics" element={
          <ProtectedRoute requiredRole="admin">
            <Suspense fallback={<PageLoading />}>
              <AnimatedPage>
                <AnalyticsPage />
              </AnimatedPage>
            </Suspense>
          </ProtectedRoute>
        } />

        {/* Students - Admin and Teacher only */}
        <Route path="students" element={
          <ProtectedRoute requiredRole="admin">
            <Suspense fallback={<PageLoading />}>
              <AnimatedPage>
                <StudentsPage />
              </AnimatedPage>
            </Suspense>
          </ProtectedRoute>
        } />

        {/* Student Detail - Admin and Teacher only */}
        <Route path="students/:id" element={
          <ProtectedRoute requiredRole="admin">
            <Suspense fallback={<PageLoading />}>
              <AnimatedPage>
                <StudentDetailPage />
              </AnimatedPage>
            </Suspense>
          </ProtectedRoute>
        } />

        {/* Classes - Admin and Teacher only */}
        <Route path="classes" element={
          <ProtectedRoute requiredRole="admin">
            <Suspense fallback={<PageLoading />}>
              <AnimatedPage>
                <ClassesPage />
              </AnimatedPage>
            </Suspense>
          </ProtectedRoute>
        } />

        {/* Alerts - All authenticated users */}
        <Route path="alerts" element={
          <Suspense fallback={<PageLoading />}>
            <AnimatedPage>
              <AlertsPage />
            </AnimatedPage>
          </Suspense>
        } />

        {/* Reports - Admin and Teacher only */}
        <Route path="reports" element={
          <ProtectedRoute requiredRole="admin">
            <Suspense fallback={<PageLoading />}>
              <AnimatedPage>
                <ReportsPage />
              </AnimatedPage>
            </Suspense>
          </ProtectedRoute>
        } />

        {/* Settings - All authenticated users */}
        <Route path="settings" element={
          <Suspense fallback={<PageLoading />}>
            <AnimatedPage>
              <SettingsPage />
            </AnimatedPage>
          </Suspense>
        } />

        {/* Profile - All authenticated users */}
        <Route path="profile" element={
          <Suspense fallback={<PageLoading />}>
            <AnimatedPage>
              <ProfilePage />
            </AnimatedPage>
          </Suspense>
        } />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={
        <Suspense fallback={<PageLoading />}>
          <NotFoundPage />
        </Suspense>
      } />
    </Routes>
  );
};

export default AppRoutes;
