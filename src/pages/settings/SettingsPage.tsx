import React from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Palette, Database, Globe, HelpCircle } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const settingsSections = [
    {
      title: 'General',
      icon: Settings,
      items: [
        { label: 'System Information', description: 'View system details and version' },
        { label: 'Time Zone', description: 'Configure your local time zone' },
        { label: 'Language', description: 'Select your preferred language' },
        { label: 'Date Format', description: 'Choose date and time format' },
      ],
    },
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Profile Information', description: 'Update your personal details' },
        { label: 'Password', description: 'Change your password' },
        { label: 'Two-Factor Authentication', description: 'Add an extra layer of security' },
        { label: 'Session Management', description: 'View and manage active sessions' },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', description: 'Configure email alerts' },
        { label: 'Push Notifications', description: 'Manage browser notifications' },
        { label: 'Alert Preferences', description: 'Set alert severity levels' },
        { label: 'Digest Settings', description: 'Configure daily/weekly summaries' },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { label: 'Privacy Settings', description: 'Control data sharing preferences' },
        { label: 'API Keys', description: 'Manage API access tokens' },
        { label: 'Audit Logs', description: 'View system activity logs' },
        { label: 'Backup & Recovery', description: 'Configure data backup settings' },
      ],
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { label: 'Theme', description: 'Choose light, dark, or system theme' },
        { label: 'Accent Color', description: 'Customize accent colors' },
        { label: 'Font Size', description: 'Adjust text size for accessibility' },
        { label: 'Layout Density', description: 'Compact or comfortable spacing' },
      ],
    },
    {
      title: 'Data & Storage',
      icon: Database,
      items: [
        { label: 'Data Export', description: 'Export your data in various formats' },
        { label: 'Data Import', description: 'Import data from external sources' },
        { label: 'Storage Management', description: 'Monitor and manage storage usage' },
        { label: 'Data Retention', description: 'Configure data retention policies' },
      ],
    },
    {
      title: 'Integrations',
      icon: Globe,
      items: [
        { label: 'Connected Services', description: 'Manage third-party integrations' },
        { label: 'Webhooks', description: 'Configure webhook endpoints' },
        { label: 'API Documentation', description: 'View API documentation' },
        { label: 'Developer Tools', description: 'Access developer utilities' },
      ],
    },
    {
      title: 'Help & Support',
      icon: HelpCircle,
      items: [
        { label: 'Help Center', description: 'Browse documentation and guides' },
        { label: 'Contact Support', description: 'Get help from our support team' },
        { label: 'System Status', description: 'Check system health and uptime' },
        { label: 'Feedback', description: 'Send us your feedback and suggestions' },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section, index) => {
          const Icon = section.icon;
          
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Section Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {section.title}
                  </h3>
                </div>
              </div>

              {/* Section Items */}
              <div className="p-6 space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer group"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {item.label}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full group-hover:bg-primary-500 transition-colors"></div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left">
            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">
              Reset to Defaults
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Reset all settings to default values
            </p>
          </button>
          <button className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left">
            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">
              Export Settings
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Download your settings configuration
            </p>
          </button>
          <button className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left">
            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">
              Import Settings
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Import settings from a configuration file
            </p>
          </button>
        </div>
      </motion.div>

      {/* System Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          System Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Application Version</span>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">2.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Build Number</span>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">20240228-001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Environment</span>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Production</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Database Version</span>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">v1.2.3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Last Updated</span>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">2024-02-28</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">License</span>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Enterprise</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
