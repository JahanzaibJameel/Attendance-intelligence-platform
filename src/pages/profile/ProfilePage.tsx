import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Award, Edit, Camera, Shield, Bell } from 'lucide-react';
import { useApp } from '../../hooks/useApp';

const ProfilePage: React.FC = () => {
  const { user } = useApp();

  const profileData = {
    personal: {
      name: user?.name || 'John Doe',
      email: user?.email || 'john.doe@example.com',
      phone: '+1 234 567 8900',
      role: user?.role || 'admin',
      department: 'Computer Science',
      employeeId: 'EMP001',
      joinDate: '2023-01-15',
    },
    preferences: {
      language: 'English',
      timezone: 'UTC-5',
      theme: 'system',
      notifications: 'all',
    },
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: '2024-01-15',
      activeSessions: 3,
      loginAttempts: 0,
    },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your personal information and account settings.
          </p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all flex items-center space-x-2">
          <Edit className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {profileData.personal.name}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {profileData.personal.role.charAt(0).toUpperCase() + profileData.personal.role.slice(1)} • {profileData.personal.department}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
              <span>Employee ID: {profileData.personal.employeeId}</span>
              <span>•</span>
              <span>Joined: {profileData.personal.joinDate}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Personal Information
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Full Name
                </label>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-900 dark:text-slate-100">
                    {profileData.personal.name}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Email Address
                </label>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-900 dark:text-slate-100">
                    {profileData.personal.email}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-900 dark:text-slate-100">
                    {profileData.personal.phone}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Department
                </label>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-900 dark:text-slate-100">
                    {profileData.personal.department}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Classes Managed</span>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Students Supervised</span>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">284</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Reports Generated</span>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">47</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Active Alerts</span>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">3</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Language
            </label>
            <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Timezone
            </label>
            <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100">
              <option>UTC-5</option>
              <option>UTC-8</option>
              <option>UTC+0</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Theme
            </label>
            <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100">
              <option>System</option>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Notifications
            </label>
            <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100">
              <option>All</option>
              <option>Important Only</option>
              <option>None</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Security Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Add an extra layer of security
                  </p>
                </div>
              </div>
              <button
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  profileData.security.twoFactorEnabled
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                {profileData.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    Last Password Change
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {profileData.security.lastPasswordChange}
                  </p>
                </div>
              </div>
              <button className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                Change
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    Active Sessions
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {profileData.security.activeSessions} devices
                  </p>
                </div>
              </div>
              <button className="px-3 py-1 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                Manage
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    Login Attempts
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {profileData.security.loginAttempts} failed attempts
                  </p>
                </div>
              </div>
              <button className="px-3 py-1 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                View Log
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
