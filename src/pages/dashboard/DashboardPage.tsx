import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  BookOpen,
  Download,
  Calendar,
  Activity,
  Target
} from 'lucide-react';

// Import our advanced components
import { AttendanceTrendChart } from '../../components/charts';
import { Skeleton, DashboardSkeleton, TableSkeleton } from '../../components/ui/loading';
import { AnimatedFade, AnimatedSlideUp } from '../../components/ui/animations';
import { AdvancedSearch } from '../../components/search/AdvancedSearch';
import { useResponsive } from '../../hooks/useResponsive';
import { toast } from '../../components/ui/toast-functions';
import { SearchFilters } from '../../components/search/AdvancedSearch';
import { useGamification } from '../../hooks/useGamification';
import { UserLevelDisplay, StreakDisplay, PointsDisplay } from '../../components/gamification/GamificationProvider';
import { AnalyticsDashboard } from '../../components/analytics/AdvancedAnalytics';

// Types
interface KPICard {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface RecentActivity {
  id: string;
  message: string;
  time: string;
  type: 'attendance' | 'alert' | 'report' | 'student' | 'achievement';
  metadata?: Record<string, unknown>;
}

interface RiskAlert {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  risk: 'low' | 'medium' | 'high' | 'critical';
  attendance: string;
  lastSeen: string;
  riskScore: number;
}

// API service functions
const fetchDashboardStats = async (): Promise<{
  totalStudents: number;
  attendanceRate: number;
  riskStudents: number;
  activeClasses: number;
  monthlyChange: {
    students: number;
    attendance: number;
    risk: number;
    classes: number;
  };
}> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    totalStudents: 1248,
    attendanceRate: 94.2,
    riskStudents: 23,
    activeClasses: 48,
    monthlyChange: {
      students: 12,
      attendance: 2.4,
      risk: -8,
      classes: 4
    }
  };
};

const fetchRecentActivity = async (): Promise<RecentActivity[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { 
      id: '1', 
      message: 'Class 10A marked attendance - 45 students present', 
      time: '2 min ago', 
      type: 'attendance',
      metadata: { class: '10A', present: 45, total: 48 }
    },
    { 
      id: '2', 
      message: '3 students flagged for low attendance risk', 
      time: '15 min ago', 
      type: 'alert',
      metadata: { students: ['John Doe', 'Jane Smith', 'Mike Johnson'] }
    },
    { 
      id: '3', 
      message: 'Monthly attendance report generated successfully', 
      time: '1 hour ago', 
      type: 'report',
      metadata: { month: 'January 2024', totalRecords: 2844 }
    },
    { 
      id: '4', 
      message: 'New student enrolled: Sarah Williams', 
      time: '2 hours ago', 
      type: 'student',
      metadata: { studentId: '1249', class: '11A' }
    },
    {
      id: '5',
      message: 'Achievement unlocked: Week Warrior',
      time: '3 hours ago',
      type: 'achievement',
      metadata: { achievementId: 'week_warrior', points: 50 }
    }
  ];
};

const fetchRiskAlerts = async (): Promise<RiskAlert[]> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  return [
    {
      id: '1',
      studentId: '101',
      studentName: 'Sarah Davis',
      class: '11B',
      risk: 'high',
      attendance: '65%',
      lastSeen: '3 days ago',
      riskScore: 78
    },
    {
      id: '2',
      studentId: '102',
      studentName: 'John Smith',
      class: '10A',
      risk: 'medium',
      attendance: '78%',
      lastSeen: '1 day ago',
      riskScore: 52
    },
    {
      id: '3',
      studentId: '103',
      studentName: 'Emma Johnson',
      class: '10B',
      risk: 'low',
      attendance: '88%',
      lastSeen: '2 hours ago',
      riskScore: 25
    }
  ];
};

const fetchChartData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'This Week',
        data: [92, 94, 89, 96, 93, 45, 38],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Last Week',
        data: [88, 91, 85, 92, 89, 42, 35],
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };
};

const DashboardPage: React.FC = () => {
  const { isMobile } = useResponsive();
  const { userStats, addPoints } = useGamification();
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: '',
    dateRange: { start: '', end: '' },
    classes: [],
    students: [],
    status: 'all' as const,
    riskLevel: 'all' as const,
    attendanceRange: { min: 0, max: 100 }
  });

  // Fetch data with React Query
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: activity, isLoading: activityLoading } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: fetchRecentActivity,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: riskAlerts, isLoading: risksLoading } = useQuery({
    queryKey: ['risk-alerts'],
    queryFn: fetchRiskAlerts,
    refetchInterval: 60000, // Refresh every minute
  });

  const { data: chartData, isLoading: chartLoading } = useQuery({
    queryKey: ['attendance-chart'],
    queryFn: fetchChartData,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Handle errors
  useEffect(() => {
    if (statsError) {
      toast.error('Failed to load dashboard statistics', 'Please try refreshing the page');
    }
  }, [statsError]);

  // Generate KPI cards
  const kpiCards: KPICard[] = stats ? [
    {
      title: 'Total Students',
      value: stats.totalStudents.toLocaleString(),
      change: `+${stats.monthlyChange.students}`,
      trend: stats.monthlyChange.students > 0 ? 'up' : 'down',
      description: `${Math.abs(stats.monthlyChange.students)} this month`,
      icon: <Users className="w-5 h-5" />,
      color: 'blue'
    },
    {
      title: 'Attendance Rate',
      value: `${stats.attendanceRate}%`,
      change: `+${stats.monthlyChange.attendance}%`,
      trend: stats.monthlyChange.attendance > 0 ? 'up' : 'down',
      description: 'Above target',
      icon: <Target className="w-5 h-5" />,
      color: 'green'
    },
    {
      title: 'Risk Students',
      value: stats.riskStudents,
      change: `${stats.monthlyChange.risk}%`,
      trend: stats.monthlyChange.risk < 0 ? 'up' : 'down',
      description: 'Requires attention',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'red'
    },
    {
      title: 'Active Classes',
      value: stats.activeClasses,
      change: `+${stats.monthlyChange.classes}`,
      trend: stats.monthlyChange.classes > 0 ? 'up' : 'down',
      description: 'New this semester',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'purple'
    }
  ] : [];

  const handleExportReport = () => {
    toast.loading('Generating report...', 'This may take a few seconds');
    
    // Simulate report generation
    setTimeout(() => {
      toast.success('Report generated successfully', 'Download will start automatically');
      addPoints(10); // Add gamification points
    }, 2000);
  };

  const handleMarkAttendance = () => {
    toast.info('Opening attendance marking...', 'Select a class to continue');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'attendance': return <Activity className="w-4 h-4" />;
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'report': return <Download className="w-4 h-4" />;
      case 'student': return <Users className="w-4 h-4" />;
      case 'achievement': return <Target className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'attendance': return 'bg-success-500';
      case 'alert': return 'bg-danger-500';
      case 'report': return 'bg-primary-500';
      case 'student': return 'bg-blue-500';
      case 'achievement': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400';
      case 'medium': return 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400';
      case 'high': return 'bg-danger-100 text-danger-800 dark:bg-danger-900/20 dark:text-danger-400';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (statsLoading || activityLoading || risksLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <AnimatedFade>
      <div className="space-y-8">
        {/* Gamification Bar */}
        <AnimatedSlideUp>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <UserLevelDisplay userStats={userStats} />
              <StreakDisplay streak={userStats.streak} />
              <PointsDisplay points={userStats.points} />
            </div>
          </div>
        </AnimatedSlideUp>

        {/* Page Header */}
        <AnimatedSlideUp delay={0.1}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Welcome back! Here's what's happening with your attendance system today.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleExportReport}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                {isMobile ? 'Export' : 'Export Report'}
              </button>
              <button
                onClick={handleMarkAttendance}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                {isMobile ? 'Mark' : 'Mark Attendance'}
              </button>
            </div>
          </div>
        </AnimatedSlideUp>

        {/* Search and Filters */}
        <AnimatedSlideUp delay={0.2}>
          <AdvancedSearch
            options={{
              placeholder: 'Search students, classes, or activities...',
              showFilters: true,
              showDateRange: true,
              showClassFilter: true,
              showStudentFilter: true,
              showStatusFilter: true,
              showRiskFilter: true,
              showAttendanceRange: false
            }}
            filters={searchFilters}
            onFiltersChange={setSearchFilters}
            onSearch={(query) => console.log('Search:', query)}
          />
        </AnimatedSlideUp>

        {/* KPI Cards */}
        <AnimatedSlideUp delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      {stat.trend && (
                        <div className="flex items-center space-x-1">
                          {stat.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-success-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-danger-500" />
                          )}
                          <span className={`text-sm font-medium ${
                            stat.trend === 'up' ? 'text-success-600' : 'text-danger-600'
                          }`}>
                            {stat.change}
                          </span>
                        </div>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {stat.description}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20' :
                    stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/20' :
                    stat.color === 'red' ? 'bg-red-100 dark:bg-red-900/20' :
                    'bg-purple-100 dark:bg-purple-900/20'
                  }`}>
                    <div className={`${
                      stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                      stat.color === 'red' ? 'text-red-600 dark:text-red-400' :
                      'text-purple-600 dark:text-purple-400'
                    }`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSlideUp>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Analytics Chart */}
          <AnimatedSlideUp delay={0.4} className="xl:col-span-2">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Attendance Trends
                </h2>
                <select className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last year</option>
                </select>
              </div>
              {chartLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <Skeleton variant="rectangular" height={256} />
                </div>
              ) : (
                <AttendanceTrendChart data={chartData || { labels: [], datasets: [] }} />
              )}
            </div>
          </AnimatedSlideUp>

          {/* Recent Activity */}
          <AnimatedSlideUp delay={0.5}>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {activity?.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                      <div className="text-white">
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSlideUp>
        </div>

        {/* Risk Alerts Table */}
        <AnimatedSlideUp delay={0.6}>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Risk Alerts
                </h2>
                <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                  View All
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              {risksLoading ? (
                <div className="p-8">
                  <TableSkeleton rows={3} />
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Risk Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Attendance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Last Seen
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {riskAlerts?.map((student, index) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                {student.studentName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {student.studentName}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                ID: {student.studentId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {student.class}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(student.risk)}`}>
                              {student.risk}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Score: {student.riskScore}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-900 dark:text-gray-100">
                              {student.attendance}
                            </span>
                            <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div
                                className="bg-primary-500 h-2 rounded-full"
                                style={{ width: student.attendance }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {student.lastSeen}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                            View Details
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </AnimatedSlideUp>

        {/* Analytics Dashboard */}
        <AnimatedSlideUp delay={0.7}>
          <AnalyticsDashboard />
        </AnimatedSlideUp>
      </div>
    </AnimatedFade>
  );
};

export default DashboardPage;
