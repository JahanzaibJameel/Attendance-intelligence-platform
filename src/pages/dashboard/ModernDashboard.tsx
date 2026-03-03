import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  BookOpen,
  Download,
  Activity,
  Target,
  Sparkles,
  Award,
  Clock,
  BarChart3
} from 'lucide-react';

// Import our advanced components
import { AttendanceTrendChart } from '../../components/charts';
import { AnimatedSlideUp } from '../../components/ui/animations';
import { useGamification } from '../../hooks/useGamification';
import { UserLevelDisplay } from '../../components/gamification/GamificationProvider';

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
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastAttendance: string;
  attendanceRate: number;
}

const ModernDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const { userStats } = useGamification();

  // Mock data for demonstration
  const kpiData: KPICard[] = [
    {
      title: 'Total Students',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      description: 'Active students this month',
      icon: <Users className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Today\'s Attendance',
      value: '89.2%',
      change: '+3.4%',
      trend: 'up',
      description: 'Average attendance rate',
      icon: <Activity className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Risk Students',
      value: '23',
      change: '-8%',
      trend: 'down',
      description: 'Students needing attention',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Classes Active',
      value: '48',
      change: '+2',
      trend: 'stable',
      description: 'Active classes today',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      message: '5 students marked absent in Computer Science 101',
      time: '2 minutes ago',
      type: 'attendance'
    },
    {
      id: '2',
      message: 'Monthly attendance report generated',
      time: '1 hour ago',
      type: 'report'
    },
    {
      id: '3',
      message: 'New achievement unlocked: Perfect Week!',
      time: '3 hours ago',
      type: 'achievement'
    },
    {
      id: '4',
      message: 'High risk alert: John Smith - 3 days absent',
      time: '5 hours ago',
      type: 'alert'
    }
  ];

  const riskAlerts: RiskAlert[] = [
    {
      id: '1',
      studentId: 'STU001',
      studentName: 'John Smith',
      riskLevel: 'critical',
      lastAttendance: '3 days ago',
      attendanceRate: 45
    },
    {
      id: '2',
      studentId: 'STU002',
      studentName: 'Sarah Johnson',
      riskLevel: 'high',
      lastAttendance: '1 day ago',
      attendanceRate: 62
    },
    {
      id: '3',
      studentId: 'STU003',
      studentName: 'Mike Davis',
      riskLevel: 'medium',
      lastAttendance: '2 days ago',
      attendanceRate: 78
    }
  ];

  const getRiskColor = (level: RiskAlert['riskLevel']) => {
    switch (level) {
      case 'critical': return 'from-red-500 to-rose-500';
      case 'high': return 'from-orange-500 to-amber-500';
      case 'medium': return 'from-yellow-500 to-amber-500';
      case 'low': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <AnimatedSlideUp delay={0.1}>
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Dashboard Overview
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Welcome back! Here's what's happening with your attendance today.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
                
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Report</span>
                </button>
              </div>
            </div>
          </div>
        </AnimatedSlideUp>

        {/* KPI Cards Grid */}
        <AnimatedSlideUp delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <motion.div
                key={kpi.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)" 
                }}
                className="relative group"
              >
                <div className={`
                  relative overflow-hidden rounded-2xl p-6
                  bg-white dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700
                  shadow-lg hover:shadow-xl
                  transition-all duration-300
                `}>
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${kpi.color} text-white`}>
                        {kpi.icon}
                      </div>
                      {kpi.trend && (
                        <div className={`flex items-center space-x-1 text-sm ${
                          kpi.trend === 'up' ? 'text-green-500' : 
                          kpi.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                        }`}>
                          {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : 
                           kpi.trend === 'down' ? <TrendingDown className="w-4 h-4" /> : 
                           <Activity className="w-4 h-4" />}
                          <span>{kpi.change}</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {kpi.value}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {kpi.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSlideUp>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Charts Section */}
          <AnimatedSlideUp delay={0.3}>
            <div className="lg:col-span-2 space-y-8">
              {/* Attendance Trend Chart */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                    Attendance Trends
                  </h2>
                  <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                </div>
                <div className="h-64">
                  <AttendanceTrendChart data={{
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                    datasets: [{
                      label: 'Attendance Rate',
                      data: [85, 89, 92, 87, 91],
                      borderColor: '#a855f7',
                      backgroundColor: 'rgba(168, 85, 247, 0.1)',
                      tension: 0.4
                    }]
                  }} />
                </div>
              </motion.div>

              {/* Recent Activities */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  Recent Activities
                </h2>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        {activity.type === 'attendance' && <Users className="w-4 h-4 text-blue-500" />}
                        {activity.type === 'alert' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                        {activity.type === 'report' && <BarChart3 className="w-4 h-4 text-green-500" />}
                        {activity.type === 'achievement' && <Award className="w-4 h-4 text-yellow-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </AnimatedSlideUp>

          {/* Side Section */}
          <AnimatedSlideUp delay={0.4}>
            <div className="space-y-8">
              
              {/* Gamification Widget */}
              {userStats && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 shadow-xl text-white"
                >
                  <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    Your Progress
                  </h2>
                  <div className="space-y-4">
                    <UserLevelDisplay userStats={userStats} />
                    <div className="flex items-center justify-between">
                      <span className="text-sm opacity-90">Current Points</span>
                      <span className="text-2xl font-bold">{userStats.points || 0}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Risk Alerts */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Risk Alerts
                </h2>
                <div className="space-y-4">
                  {riskAlerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            {alert.studentName}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {alert.lastAttendance}
                          </p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getRiskColor(alert.riskLevel)}`}>
                          {alert.riskLevel.toUpperCase()}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Attendance Rate
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {alert.attendanceRate}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm">
                    Mark Attendance
                  </button>
                  <button className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm">
                    Generate Report
                  </button>
                  <button className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm">
                    Add Student
                  </button>
                  <button className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm">
                    Schedule Class
                  </button>
                </div>
              </motion.div>
            </div>
          </AnimatedSlideUp>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernDashboard;
