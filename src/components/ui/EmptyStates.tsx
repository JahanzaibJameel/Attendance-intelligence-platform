import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  Search,
  Plus,
  RefreshCw
} from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        flex flex-col items-center justify-center text-center p-8
        bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700
        ${className}
      `}
    >
      {icon && (
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-gray-400">
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          {description}
        </p>
      )}
      
      {action && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.onClick}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          {action.icon}
          <span>{action.label}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

// Predefined empty states
export const EmptyStudents: React.FC<{ onAdd?: () => void }> = ({ onAdd }) => (
  <EmptyState
    icon={<Users className="w-8 h-8" />}
    title="No students found"
    description="Get started by adding your first student to begin tracking attendance."
    action={onAdd ? {
      label: "Add Student",
      onClick: onAdd,
      icon: <Plus className="w-4 h-4" />
    } : undefined}
  />
);

export const EmptyClasses: React.FC<{ onAdd?: () => void }> = ({ onAdd }) => (
  <EmptyState
    icon={<Calendar className="w-8 h-8" />}
    title="No classes scheduled"
    description="Create your first class to organize your students and schedule."
    action={onAdd ? {
      label: "Create Class",
      onClick: onAdd,
      icon: <Plus className="w-4 h-4" />
    } : undefined}
  />
);

export const EmptyReports: React.FC<{ onGenerate?: () => void }> = ({ onGenerate }) => (
  <EmptyState
    icon={<FileText className="w-8 h-8" />}
    title="No reports available"
    description="Generate your first attendance report to analyze patterns and trends."
    action={onGenerate ? {
      label: "Generate Report",
      onClick: onGenerate,
      icon: <Plus className="w-4 h-4" />
    } : undefined}
  />
);

export const EmptySearch: React.FC<{ onClear?: () => void; query?: string }> = ({ 
  onClear, 
  query 
}) => (
  <EmptyState
    icon={<Search className="w-8 h-8" />}
    title={`No results for "${query || 'search'}"`}
    description="Try adjusting your search terms or browse the full list."
    action={onClear ? {
      label: "Clear Search",
      onClick: onClear,
      icon: <RefreshCw className="w-4 h-4" />
    } : undefined}
  />
);

export const EmptyAlerts: React.FC = () => (
  <EmptyState
    icon={<AlertTriangle className="w-8 h-8" />}
    title="No alerts"
    description="Everything looks good! No attendance alerts or issues to review."
  />
);

export const EmptyAnalytics: React.FC<{ onAddData?: () => void }> = ({ onAddData }) => (
  <EmptyState
    icon={<FileText className="w-8 h-8" />}
    title="No analytics data"
    description="Start tracking attendance to see detailed analytics and insights."
    action={onAddData ? {
      label: "Add Attendance Data",
      onClick: onAddData,
      icon: <Plus className="w-4 h-4" />
    } : undefined}
  />
);
