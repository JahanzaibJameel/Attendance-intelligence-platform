import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, CheckCircle, Clock, Filter, Search } from 'lucide-react';

const AlertsPage: React.FC = () => {
  const mockAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Critical Attendance Drop',
      message: 'Sarah Davis has missed 5 consecutive classes',
      student: 'Sarah Davis',
      class: '11B',
      time: '2 hours ago',
      status: 'active',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Attendance Warning',
      message: 'John Smith attendance below 75% this month',
      student: 'John Smith',
      class: '10A',
      time: '4 hours ago',
      status: 'active',
    },
    {
      id: 3,
      type: 'info',
      title: 'Pattern Detected',
      message: '3 students consistently late on Mondays',
      student: 'Multiple',
      class: '10A, 10B',
      time: '6 hours ago',
      status: 'active',
    },
    {
      id: 4,
      type: 'success',
      title: 'Improvement Alert',
      message: 'Michael Brown attendance improved by 15%',
      student: 'Michael Brown',
      class: '11A',
      time: '1 day ago',
      status: 'resolved',
    },
    {
      id: 5,
      type: 'warning',
      title: 'Class Performance Alert',
      message: 'Class 10B attendance dropped below 80%',
      student: 'Class 10B',
      class: '10B',
      time: '2 days ago',
      status: 'active',
    },
  ];

  const getAlertColor = (type: string) => {
    const colors: Record<string, { bg: string; icon: string; border: string }> = {
      critical: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        icon: 'text-red-600 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800',
      },
      warning: {
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        icon: 'text-yellow-600 dark:text-yellow-400',
        border: 'border-yellow-200 dark:border-yellow-800',
      },
      info: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        icon: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
      },
      success: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        icon: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800',
      },
    };
    return colors[type] || colors.info;
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return AlertTriangle;
      case 'warning':
        return AlertTriangle;
      case 'success':
        return CheckCircle;
      default:
        return Bell;
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      active: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      resolved: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    };
    return badges[status] || badges.active;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Alerts
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Real-time monitoring and alerts for attendance issues.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
            Mark All as Read
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all">
            Configure Alerts
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Critical Alerts', value: '3', change: '+1 today', color: 'red' },
          { title: 'Warnings', value: '12', change: '+3 today', color: 'yellow' },
          { title: 'Resolved Today', value: '8', change: 'Good progress', color: 'green' },
          { title: 'Active Alerts', value: '15', change: 'Need attention', color: 'blue' },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {stat.title}
            </h3>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              {stat.value}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {stat.change}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <select className="px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg">
            <option>All Types</option>
            <option>Critical</option>
            <option>Warning</option>
            <option>Info</option>
            <option>Success</option>
          </select>
          <select className="px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg">
            <option>All Status</option>
            <option>Active</option>
            <option>Resolved</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {mockAlerts.map((alert, index) => {
          const Icon = getAlertIcon(alert.type);
          const colors = getAlertColor(alert.type);
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-slate-800 rounded-xl border ${colors.border} p-6 hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {alert.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-3">
                      {alert.message}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center space-x-1">
                        <span>Student:</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {alert.student}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Class:</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {alert.class}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                    View Details
                  </button>
                  <button className="px-3 py-1 text-sm bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                    Resolve
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State (when no alerts) */}
      {mockAlerts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center"
        >
          <Bell className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            No alerts
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            All systems are running smoothly. No alerts at this time.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default AlertsPage;
