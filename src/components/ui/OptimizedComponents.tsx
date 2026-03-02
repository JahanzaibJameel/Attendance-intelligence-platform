import React, { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, FileText, AlertTriangle, TrendingUp } from 'lucide-react';

// Memoized card component
interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

export const StatCard = memo<StatCardProps>(({ title, value, change, icon, color }) => {
  const changeColor = useMemo(() => {
    if (!change) return 'text-gray-500';
    return change > 0 ? 'text-green-600' : 'text-red-600';
  }, [change]);

  const changeIcon = useMemo(() => {
    if (!change) return null;
    return change > 0 ? '↑' : '↓';
  }, [change]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
          {change && (
            <p className={`text-sm ${changeColor} flex items-center mt-1`}>
              {changeIcon} {Math.abs(change)}%
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

// Memoized student row component
interface StudentRowProps {
  student: {
    id: string;
    name: string;
    email: string;
    attendance: number;
    status: 'present' | 'absent' | 'late';
  };
  onSelect?: (id: string) => void;
  isSelected?: boolean;
}

export const StudentRow = memo<StudentRowProps>(({ student, onSelect, isSelected }) => {
  const handleClick = useCallback(() => {
    onSelect?.(student.id);
  }, [student.id, onSelect]);

  const statusColor = useMemo(() => {
    switch (student.status) {
      case 'present': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'absent': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'late': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  }, [student.status]);

  return (
    <motion.tr
      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      onClick={handleClick}
      className={`cursor-pointer ${isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
            <Users className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {student.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {student.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-gray-100">{student.attendance}%</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
          {student.status}
        </span>
      </td>
    </motion.tr>
  );
});

StudentRow.displayName = 'StudentRow';

// Memoized class card component
interface ClassCardProps {
  class: {
    id: string;
    name: string;
    subject: string;
    students: number;
    time: string;
    attendance: number;
  };
  onSelect?: (id: string) => void;
}

export const ClassCard = memo<ClassCardProps>(({ class: classData, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect?.(classData.id);
  }, [classData.id, onSelect]);

  const attendanceColor = useMemo(() => {
    if (classData.attendance >= 90) return 'text-green-600';
    if (classData.attendance >= 75) return 'text-yellow-600';
    return 'text-red-600';
  }, [classData.attendance]);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {classData.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {classData.subject}
          </p>
        </div>
        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
          <Calendar className="w-5 h-5" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Students</span>
          <span className="text-gray-900 dark:text-gray-100">{classData.students}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Time</span>
          <span className="text-gray-900 dark:text-gray-100">{classData.time}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Attendance</span>
          <span className={`font-semibold ${attendanceColor}`}>
            {classData.attendance}%
          </span>
        </div>
      </div>
    </motion.div>
  );
});

ClassCard.displayName = 'ClassCard';

// Memoized alert item component
interface AlertItemProps {
  alert: {
    id: string;
    type: 'warning' | 'error' | 'info';
    title: string;
    message: string;
    time: string;
  };
  onDismiss?: (id: string) => void;
}

export const AlertItem = memo<AlertItemProps>(({ alert, onDismiss }) => {
  const handleDismiss = useCallback(() => {
    onDismiss?.(alert.id);
  }, [alert.id, onDismiss]);

  const alertColors = useMemo(() => {
    switch (alert.type) {
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800/30 dark:text-yellow-400';
      case 'error': return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800/30 dark:text-red-400';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800/30 dark:text-blue-400';
      default: return 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-800/30 dark:text-gray-400';
    }
  }, [alert.type]);

  const alertIcon = useMemo(() => {
    switch (alert.type) {
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <TrendingUp className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  }, [alert.type]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`p-4 rounded-lg border ${alertColors}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {alertIcon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold mb-1">{alert.title}</h4>
          <p className="text-sm opacity-80">{alert.message}</p>
          <p className="text-xs opacity-60 mt-2">{alert.time}</p>
        </div>
        {onDismiss && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 ml-3 opacity-60 hover:opacity-100"
          >
            ×
          </button>
        )}
      </div>
    </motion.div>
  );
});

AlertItem.displayName = 'AlertItem';
