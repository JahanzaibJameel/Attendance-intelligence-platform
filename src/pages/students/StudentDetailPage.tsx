import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, Calendar, AlertTriangle } from 'lucide-react';

const StudentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock student data
  const student = {
    id: id || '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 234 567 8900',
    class: '10A',
    rollNumber: '1001',
    enrollmentDate: '2023-09-01',
    attendance: {
      overall: '92%',
      thisMonth: '94%',
      lastWeek: '88%',
    },
    riskLevel: 'low',
    performance: {
      grades: 'A',
      behavior: 'Excellent',
      participation: 'Good',
    },
    recentAttendance: [
      { date: '2024-02-28', status: 'Present', markedBy: 'Mrs. Johnson' },
      { date: '2024-02-27', status: 'Present', markedBy: 'Mrs. Johnson' },
      { date: '2024-02-26', status: 'Absent', markedBy: 'Mrs. Johnson' },
      { date: '2024-02-23', status: 'Present', markedBy: 'Mrs. Johnson' },
      { date: '2024-02-22', status: 'Present', markedBy: 'Mrs. Johnson' },
    ],
  };

  const getRiskColor = (risk: string) => {
    const colors: Record<string, string> = {
      low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    };
    return colors[risk] || colors.low;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Present: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      Absent: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      Late: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    };
    return colors[status] || colors.Present;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/students')}
        className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Students</span>
      </motion.button>

      {/* Student Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {student.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {student.name}
              </h1>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-slate-600 dark:text-slate-400">
                  Class {student.class} • Roll No: {student.rollNumber}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(student.riskLevel)}`}>
                  {student.riskLevel} risk
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
              Edit Student
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all">
              Send Alert
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Overall Attendance', value: student.attendance.overall, icon: Calendar, color: 'blue' },
          { title: 'This Month', value: student.attendance.thisMonth, icon: Calendar, color: 'green' },
          { title: 'Last Week', value: student.attendance.lastWeek, icon: Calendar, color: 'purple' },
          { title: 'Risk Level', value: student.riskLevel, icon: AlertTriangle, color: student.riskLevel === 'low' ? 'green' : student.riskLevel === 'medium' ? 'yellow' : 'red' },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Personal Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                <p className="text-slate-900 dark:text-slate-100">{student.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Phone</p>
                <p className="text-slate-900 dark:text-slate-100">{student.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Enrollment Date</p>
                <p className="text-slate-900 dark:text-slate-100">{student.enrollmentDate}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Performance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Grades</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{student.performance.grades}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Behavior</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{student.performance.behavior}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Participation</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{student.performance.participation}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Attendance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Recent Attendance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Marked By
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {student.recentAttendance.map((record, index) => (
                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">
                    {record.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">
                    {record.markedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDetailPage;
