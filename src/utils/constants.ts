/**
 * Application constants and configuration
 */

// Application Information
export const APP_INFO = {
  name: 'Next-Gen Attendance Intelligence & Analytics Platform',
  version: '2026.1.0',
  developer: 'Muhammad Jahanzaib',
  year: '2026 Edition',
  description: 'Advanced institutional attendance management system with AI-ready insights and analytics',
};

// Storage Keys
export const STORAGE_KEYS = {
  STUDENTS: 'attendance_students',
  ATTENDANCE_RECORDS: 'attendance_records',
  HOLIDAYS: 'attendance_holidays',
  CLASSES: 'attendance_classes',
  SETTINGS: 'attendance_settings',
  USER_PREFERENCES: 'attendance_user_preferences',
  ANALYTICS_CACHE: 'attendance_analytics_cache',
};

// Default Settings
export const DEFAULT_SETTINGS = {
  attendanceThresholds: {
    warning: 75,    // Below 75% shows warning
    critical: 65,   // Below 65% shows critical alert
    excellent: 90,  // Above 90% considered excellent
  },
  notifications: {
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    dailyReports: true,
    weeklyReports: true,
    monthlyReports: true,
  },
  system: {
    autoSave: true,
    dataRetention: 365, // Days to keep data
    backupFrequency: 'daily',
    theme: 'light',
    language: 'en',
    timezone: 'Asia/Karachi',
  },
  academic: {
    academicYear: '2024-2025',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: {
      start: '08:00',
      end: '14:00',
    },
    lateThreshold: 15, // Minutes after which marked as late
  },
};

// Attendance Status Options
export const ATTENDANCE_STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
  LATE: 'Late',
  HOLIDAY: 'Holiday',
} as const;

export const ATTENDANCE_STATUS_OPTIONS = [
  { value: 'Present', label: 'Present', color: 'green', icon: 'check-circle' },
  { value: 'Absent', label: 'Absent', color: 'red', icon: 'x-circle' },
  { value: 'Late', label: 'Late', color: 'yellow', icon: 'clock' },
  { value: 'Holiday', label: 'Holiday', color: 'blue', icon: 'calendar' },
] as const;

// Risk Levels
export const RISK_LEVELS = {
  CRITICAL: { threshold: 65, label: 'Critical', color: 'red' },
  HIGH: { threshold: 75, label: 'High', color: 'orange' },
  MEDIUM: { threshold: 85, label: 'Medium', color: 'yellow' },
  LOW: { threshold: 95, label: 'Low', color: 'green' },
  EXCELLENT: { threshold: 100, label: 'Excellent', color: 'blue' },
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
} as const;

export const USER_ROLE_OPTIONS = [
  { value: 'admin', label: 'Administrator', permissions: ['all'] },
  { value: 'teacher', label: 'Teacher', permissions: ['mark_attendance', 'view_reports', 'manage_students'] },
  { value: 'student', label: 'Student', permissions: ['view_own_attendance'] },
] as const;

// Class Sections
export const CLASS_SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F'] as const;

// Academic Years
export const ACADEMIC_YEARS = [
  '2023-2024',
  '2024-2025',
  '2025-2026',
  '2026-2027',
] as const;

// Holiday Types
export const HOLIDAY_TYPES = {
  NATIONAL: 'national',
  ACADEMIC: 'academic',
  REGIONAL: 'regional',
  RELIGIOUS: 'religious',
} as const;

export const HOLIDAY_TYPE_OPTIONS = [
  { value: 'national', label: 'National Holiday' },
  { value: 'academic', label: 'Academic Break' },
  { value: 'regional', label: 'Regional Holiday' },
  { value: 'religious', label: 'Religious Holiday' },
] as const;

// Report Types
export const REPORT_TYPES = {
  STUDENT: 'student',
  CLASS: 'class',
  MONTHLY: 'monthly',
  CUSTOM: 'custom',
  SUMMARY: 'summary',
  DETAILED: 'detailed',
} as const;

export const REPORT_TYPE_OPTIONS = [
  { value: 'student', label: 'Student Report' },
  { value: 'class', label: 'Class Report' },
  { value: 'monthly', label: 'Monthly Report' },
  { value: 'custom', label: 'Custom Report' },
] as const;

// Export Formats
export const EXPORT_FORMATS = {
  JSON: 'json',
  CSV: 'csv',
  PDF: 'pdf',
  EXCEL: 'excel',
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD MMMM YYYY',
  SHORT: 'DD MMM YYYY',
  INPUT: 'YYYY-MM-DD',
  TIME: 'hh:mm A',
  DATETIME: 'DD MMM YYYY, hh:mm A',
} as const;

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4',
  PURPLE: '#8b5cf6',
  PINK: '#ec4899',
  INDIGO: '#6366f1',
  TEAL: '#14b8a6',
  ORANGE: '#f97316',
  CYAN: '#22d3ee',
  LIME: '#84cc16',
  EMERALD: '#059669',
  ROSE: '#f43f5e',
  AMBER: '#f59e0b',
  SKY: '#0ea5e9',
  VIOLET: '#7c3aed',
  FUCHSIA: '#d946ef',
} as const;

// Chart Color Schemes
export const CHART_COLOR_SCHEMES = {
  ATTENDANCE: [CHART_COLORS.SUCCESS, CHART_COLORS.WARNING, CHART_COLORS.DANGER],
  PERFORMANCE: [CHART_COLORS.INDIGO, CHART_COLORS.PURPLE, CHART_COLORS.PINK],
  RISK: [CHART_COLORS.DANGER, CHART_COLORS.WARNING, CHART_COLORS.SUCCESS],
  CLASSES: [
    CHART_COLORS.PRIMARY,
    CHART_COLORS.INFO,
    CHART_COLORS.INDIGO,
    CHART_COLORS.PURPLE,
    CHART_COLORS.PINK,
    CHART_COLORS.ROSE,
  ],
} as const;

// Default Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [10, 25, 50, 100],
  DEFAULT_PAGE: 1,
} as const;

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
  STUDENTS: '/api/students',
  ATTENDANCE: '/api/attendance',
  CLASSES: '/api/classes',
  HOLIDAYS: '/api/holidays',
  REPORTS: '/api/reports',
  ANALYTICS: '/api/analytics',
  AUTH: '/api/auth',
} as const;

// Local Storage Limits
export const STORAGE_LIMITS = {
  MAX_ITEMS_PER_KEY: 10000,
  MAX_TOTAL_SIZE: 5 * 1024 * 1024, // 5MB
  WARNING_THRESHOLD: 4 * 1024 * 1024, // 4MB
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  STUDENT_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  ROLL_NUMBER: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
  },
  EMAIL: {
    MAX_LENGTH: 255,
  },
  PHONE: {
    MIN_LENGTH: 11,
    MAX_LENGTH: 15,
  },
  CLASS_NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 50,
  },
  HOLIDAY_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  ATTENDANCE_MARKED: 'attendance_marked',
  LOW_ATTENDANCE: 'low_attendance',
  REPORT_GENERATED: 'report_generated',
  SYSTEM_ALERT: 'system_alert',
  HOLIDAY_REMINDER: 'holiday_reminder',
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_PDF_EXPORT: true,
  ENABLE_DATA_EXPORT: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: true,
  ENABLE_LATE_TRACKING: true,
  ENABLE_RISK_ALERTS: true,
  ENABLE_ROLE_BASED_ACCESS: true,
} as const;

// Academic Calendar Defaults
export const ACADEMIC_CALENDAR = {
  TERM_1: {
    name: 'First Term',
    start: '2024-01-15',
    end: '2024-04-15',
  },
  TERM_2: {
    name: 'Second Term',
    start: '2024-04-16',
    end: '2024-08-15',
  },
  TERM_3: {
    name: 'Third Term',
    start: '2024-08-16',
    end: '2024-12-15',
  },
} as const;

// Keyboard Shortcuts
export const KEYBOARD_SHORTPASTS = {
  MARK_PRESENT: ['p', 'P'],
  MARK_ABSENT: ['a', 'A'],
  MARK_LATE: ['l', 'L'],
  SAVE_ATTENDANCE: ['Ctrl', 's'],
  SEARCH: ['Ctrl', 'f'],
  NEW_STUDENT: ['Ctrl', 'n'],
  PRINT_REPORT: ['Ctrl', 'p'],
  EXPORT_DATA: ['Ctrl', 'e'],
} as const;

// Analytics Time Ranges
export const ANALYTICS_TIME_RANGES = {
  LAST_7_DAYS: '7days',
  LAST_30_DAYS: '30days',
  LAST_90_DAYS: '90days',
  THIS_MONTH: 'thismonth',
  LAST_MONTH: 'lastmonth',
  THIS_YEAR: 'thisyear',
  CUSTOM: 'custom',
} as const;

// Default Sample Data Counts
export const SAMPLE_DATA_COUNTS = {
  STUDENTS: 50,
  CLASSES: 6,
  ATTENDANCE_RECORDS_PER_STUDENT: 30,
  HOLIDAYS: 4,
} as const;

// Performance Settings
export const PERFORMANCE_SETTINGS = {
  DEBOUNCE_DELAY: 300, // ms
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  MAX_RECORDS_PER_PAGE: 100,
  LAZY_LOAD_THRESHOLD: 50,
} as const;
