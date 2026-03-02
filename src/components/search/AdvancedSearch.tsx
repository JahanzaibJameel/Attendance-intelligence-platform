import React, { useState, useCallback, useMemo } from 'react';
import { Search, Filter, X, Calendar, Users, BookOpen, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Search and filter types
export interface SearchFilters {
  query: string;
  dateRange: {
    start: string;
    end: string;
  };
  classes: string[];
  students: string[];
  status: 'all' | 'present' | 'absent' | 'late';
  riskLevel: 'all' | 'low' | 'medium' | 'high' | 'critical';
  attendanceRange: {
    min: number;
    max: number;
  };
}

export interface SearchOptions {
  placeholder: string;
  showFilters: boolean;
  showDateRange: boolean;
  showClassFilter: boolean;
  showStudentFilter: boolean;
  showStatusFilter: boolean;
  showRiskFilter: boolean;
  showAttendanceRange: boolean;
}

interface AdvancedSearchProps {
  options: SearchOptions;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: (query: string) => void;
  className?: string;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  options,
  filters,
  onFiltersChange,
  onSearch,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Mock data for filters
  const mockClasses = [
    { id: '1', name: 'Class 10A' },
    { id: '2', name: 'Class 10B' },
    { id: '3', name: 'Class 11A' },
    { id: '4', name: 'Class 11B' },
    { id: '5', name: 'Class 12A' }
  ];

  const mockStudents = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mike Johnson' },
    { id: '4', name: 'Sarah Williams' },
    { id: '5', name: 'Tom Brown' }
  ];

  const handleSearch = useCallback((query: string) => {
    onSearch(query);
  }, [onSearch]);

  const handleFilterChange = useCallback((key: keyof SearchFilters, value: unknown) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  }, [filters, onFiltersChange]);

  const clearFilters = useCallback(() => {
    onFiltersChange({
      query: '',
      dateRange: { start: '', end: '' },
      classes: [],
      students: [],
      status: 'all',
      riskLevel: 'all',
      attendanceRange: { min: 0, max: 100 }
    });
  }, [onFiltersChange]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.query) count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    if (filters.classes.length > 0) count++;
    if (filters.students.length > 0) count++;
    if (filters.status !== 'all') count++;
    if (filters.riskLevel !== 'all') count++;
    if (filters.attendanceRange.min > 0 || filters.attendanceRange.max < 100) count++;
    return count;
  }, [filters]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={options.placeholder}
              value={filters.query}
              onChange={(e) => {
                handleFilterChange('query', e.target.value);
                handleSearch(e.target.value);
              }}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {filters.query && (
              <button
                onClick={() => handleFilterChange('query', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          
          {options.showFilters && (
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={`relative px-4 py-2 border rounded-lg transition-colors ${
                activeFiltersCount > 0
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Search Suggestions */}
        <AnimatePresence>
          {isExpanded && filters.query && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
            >
              <div className="p-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2">
                  Suggestions
                </div>
                {mockStudents
                  .filter(student => 
                    student.name.toLowerCase().includes(filters.query.toLowerCase())
                  )
                  .slice(0, 5)
                  .map(student => (
                    <button
                      key={student.id}
                      onClick={() => handleFilterChange('query', student.name)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300"
                    >
                      <Users className="w-4 h-4 inline mr-2" />
                      {student.name}
                    </button>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilterPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Advanced Filters
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilterPanel(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Date Range Filter */}
              {options.showDateRange && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date Range
                  </label>
                  <div className="space-y-2">
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              )}

              {/* Class Filter */}
              {options.showClassFilter && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <BookOpen className="w-4 h-4 inline mr-1" />
                    Classes
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {mockClasses.map(cls => (
                      <label key={cls.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.classes.includes(cls.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleFilterChange('classes', [...filters.classes, cls.id]);
                            } else {
                              handleFilterChange('classes', filters.classes.filter(id => id !== cls.id));
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{cls.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Student Filter */}
              {options.showStudentFilter && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Students
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {mockStudents.map(student => (
                      <label key={student.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.students.includes(student.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleFilterChange('students', [...filters.students, student.id]);
                            } else {
                              handleFilterChange('students', filters.students.filter(id => id !== student.id));
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{student.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Filter */}
              {options.showStatusFilter && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="all">All Status</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </select>
                </div>
              )}

              {/* Risk Level Filter */}
              {options.showRiskFilter && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                    Risk Level
                  </label>
                  <select
                    value={filters.riskLevel}
                    onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="all">All Levels</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              )}

              {/* Attendance Range Filter */}
              {options.showAttendanceRange && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Attendance Range (%)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.attendanceRange.min}
                      onChange={(e) => handleFilterChange('attendanceRange', { ...filters.attendanceRange, min: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Min: {filters.attendanceRange.min}%</span>
                      <span>Max: {filters.attendanceRange.max}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.attendanceRange.max}
                      onChange={(e) => handleFilterChange('attendanceRange', { ...filters.attendanceRange, max: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Quick Filter Pills
interface QuickFilterProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}

export const QuickFilter: React.FC<QuickFilterProps> = ({ 
  label, 
  isActive, 
  onClick, 
  count 
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all
        ${isActive 
          ? 'bg-primary-500 text-white shadow-md' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
      {count !== undefined && (
        <span className="ml-2 bg-white/20 dark:bg-black/20 px-2 py-0.5 rounded-full text-xs">
          {count}
        </span>
      )}
    </motion.button>
  );
};

// Filter Summary Bar
interface FilterSummaryProps {
  filters: SearchFilters;
  onRemoveFilter: (key: keyof SearchFilters, value?: unknown) => void;
  onClearAll: () => void;
}

export const FilterSummary: React.FC<FilterSummaryProps> = ({
  filters,
  onRemoveFilter,
  onClearAll
}) => {
  const activeFilters = [];

  if (filters.query) {
    activeFilters.push({ key: 'query' as keyof SearchFilters, label: `Search: "${filters.query}"` });
  }
  if (filters.dateRange.start || filters.dateRange.end) {
    activeFilters.push({ 
      key: 'dateRange' as keyof SearchFilters, 
      label: `Date: ${filters.dateRange.start || '...'} to ${filters.dateRange.end || '...'}` 
    });
  }
  if (filters.classes.length > 0) {
    activeFilters.push({ 
      key: 'classes' as keyof SearchFilters, 
      label: `${filters.classes.length} Classes` 
    });
  }
  if (filters.students.length > 0) {
    activeFilters.push({ 
      key: 'students' as keyof SearchFilters, 
      label: `${filters.students.length} Students` 
    });
  }
  if (filters.status !== 'all') {
    activeFilters.push({ 
      key: 'status' as keyof SearchFilters, 
      label: `Status: ${filters.status}` 
    });
  }
  if (filters.riskLevel !== 'all') {
    activeFilters.push({ 
      key: 'riskLevel' as keyof SearchFilters, 
      label: `Risk: ${filters.riskLevel}` 
    });
  }

  if (activeFilters.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
    >
      <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
      {activeFilters.map((filter, index) => (
        <motion.div
          key={filter.key}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm"
        >
          <span>{filter.label}</span>
          <button
            onClick={() => onRemoveFilter(filter.key)}
            className="hover:text-primary-900 dark:hover:text-primary-100"
          >
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      ))}
      <button
        onClick={onClearAll}
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
      >
        Clear all
      </button>
    </motion.div>
  );
};
