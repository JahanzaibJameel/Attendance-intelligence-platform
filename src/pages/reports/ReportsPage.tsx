import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Filter, Search, Plus, Eye } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const mockReports = [
    {
      id: 1,
      name: 'Monthly Attendance Report',
      type: 'attendance',
      period: 'February 2024',
      generatedBy: 'Admin',
      generatedAt: '2024-02-28 10:30 AM',
      size: '2.4 MB',
      status: 'completed',
    },
    {
      id: 2,
      name: 'Class Performance Analysis',
      type: 'analytics',
      period: 'Q1 2024',
      generatedBy: 'Mrs. Johnson',
      generatedAt: '2024-02-25 03:15 PM',
      size: '1.8 MB',
      status: 'completed',
    },
    {
      id: 3,
      name: 'Student Risk Assessment',
      type: 'risk',
      period: 'February 2024',
      generatedBy: 'System',
      generatedAt: '2024-02-20 09:00 AM',
      size: '3.1 MB',
      status: 'completed',
    },
    {
      id: 4,
      name: 'Weekly Summary',
      type: 'summary',
      period: 'Week 8, 2024',
      generatedBy: 'Auto-generated',
      generatedAt: '2024-02-18 06:00 PM',
      size: '856 KB',
      status: 'completed',
    },
  ];

  const getReportTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      attendance: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      analytics: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      risk: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      summary: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    };
    return colors[type] || colors.attendance;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Reports
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Generate, view, and manage attendance reports and analytics.
          </p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Reports', value: '247', change: '+18 this month' },
          { title: 'Generated Today', value: '12', change: 'On track' },
          { title: 'Scheduled', value: '8', change: 'Auto-reports' },
          { title: 'Storage Used', value: '1.2 GB', change: '42% of quota' },
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

      {/* Report Generator Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Quick Report Generator
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select className="px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg">
            <option>Report Type</option>
            <option>Attendance Summary</option>
            <option>Class Performance</option>
            <option>Student Analytics</option>
            <option>Risk Assessment</option>
          </select>
          <select className="px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg">
            <option>Date Range</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last Quarter</option>
            <option>Custom Range</option>
          </select>
          <select className="px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg">
            <option>All Classes</option>
            <option>10A</option>
            <option>10B</option>
            <option>11A</option>
            <option>11B</option>
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all flex items-center justify-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Generate</span>
          </button>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports..."
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
            <option>Attendance</option>
            <option>Analytics</option>
            <option>Risk</option>
            <option>Summary</option>
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {mockReports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-slate-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {report.name}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          by {report.generatedBy}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getReportTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">
                    {report.period}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {report.generatedAt}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">
                    {report.size}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Scheduled Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Scheduled Reports
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Weekly Attendance Summary', schedule: 'Every Monday, 6:00 AM', nextRun: '2024-03-04 06:00 AM' },
            { name: 'Monthly Performance Report', schedule: '1st of each month, 8:00 AM', nextRun: '2024-03-01 08:00 AM' },
            { name: 'Quarterly Analytics', schedule: 'Last day of quarter, 5:00 PM', nextRun: '2024-03-31 05:00 PM' },
            { name: 'Risk Assessment Update', schedule: 'Every Friday, 9:00 AM', nextRun: '2024-03-01 09:00 AM' },
          ].map((scheduled, index) => (
            <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-900 dark:text-slate-100">
                  {scheduled.name}
                </h4>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <div>Schedule: {scheduled.schedule}</div>
                <div>Next run: {scheduled.nextRun}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ReportsPage;
