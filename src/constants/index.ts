export const APP_CONFIG = {
  name: 'Attendance Intelligence Platform',
  version: '2.0.0',
  description: 'Advanced institutional attendance management system with AI-powered analytics',
  
  // API endpoints (for future backend integration)
  api: {
    baseUrl: process.env.VITE_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
  },
  
  // Storage keys
  storage: {
    appState: 'app-store',
    attendanceData: 'attendance-store',
    userPreferences: 'user-preferences',
    analyticsCache: 'analytics-cache',
  },
  
  // UI Configuration
  ui: {
    sidebarWidth: 280,
    headerHeight: 64,
    footerHeight: 80,
    animationDuration: 300,
    debounceDelay: 300,
    
    // Chart configurations
    charts: {
      defaultColors: [
        '#3b82f6', // blue-500
        '#10b981', // emerald-500
        '#f59e0b', // amber-500
        '#ef4444', // red-500
        '#8b5cf6', // violet-500
        '#06b6d4', // cyan-500
        '#f97316', // orange-500
        '#84cc16', // lime-500
      ],
      gridColor: 'rgba(156, 163, 175, 0.1)',
      textColor: '#6b7280',
    },
    
    // Risk thresholds
    risk: {
      low: 85,
      medium: 70,
      high: 50,
    },
  },
  
  // Business logic
  business: {
    // Working days (Monday-Friday)
    workingDays: [1, 2, 3, 4, 5],
    
    // Late threshold in minutes
    lateThreshold: 15,
    
    // Minimum attendance percentage
    minimumAttendance: 75,
    
    // Consecutive days for risk alert
    consecutiveAbsenceThreshold: 3,
    
    // Data retention in days
    dataRetentionDays: 365,
  },
  
  // Export settings
  export: {
    dateFormat: 'yyyy-MM-dd',
    timeFormat: 'HH:mm:ss',
    csvDelimiter: ',',
    pdfFormat: 'A4',
  },
  
  // Performance settings
  performance: {
    virtualScrollThreshold: 100,
    cacheSize: 1000,
    batchSize: 50,
  },
} as const;

export const ROUTES = {
  dashboard: '/',
  attendance: '/attendance',
  analytics: '/analytics',
  reports: '/reports',
  students: '/students',
  settings: '/settings',
  setup: '/setup',
} as const;

export const PERMISSIONS = {
  // Admin permissions
  admin: [
    'view:dashboard',
    'manage:students',
    'manage:attendance',
    'view:analytics',
    'manage:reports',
    'manage:settings',
    'manage:users',
  ],
  
  // Teacher permissions
  teacher: [
    'view:dashboard',
    'manage:attendance',
    'view:analytics',
    'view:reports',
    'view:students',
  ],
  
  // Student permissions
  student: [
    'view:own-attendance',
    'view:own-reports',
  ],
} as const;

export const ATTENDANCE_STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
  LATE: 'Late',
  HOLIDAY: 'Holiday',
} as const;

export const RISK_LEVELS = {
  SAFE: 'safe',
  MONITOR: 'monitor',
  HIGH_RISK: 'high-risk',
  CRITICAL: 'critical',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
} as const;

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;
