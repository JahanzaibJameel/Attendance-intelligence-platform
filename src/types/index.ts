// Comprehensive type definitions for the Attendance Intelligence Platform

// Base types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// User and Authentication types
export interface User {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

// Student types
export interface Student extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  rollNumber: string;
  classId: string;
  class: string;
  enrollmentDate: string;
  status: StudentStatus;
  attendanceRate: number;
  attendance: string;
  riskLevel: RiskLevel;
  lastSeen: string;
  avatar?: string;
  parentContact?: string;
  emergencyContact?: string;
  section?: string;
  academicPerformance?: number;
}

export type StudentStatus = 'active' | 'inactive' | 'suspended' | 'graduated';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

// Class types
export interface Class extends BaseEntity {
  name: string;
  grade: string;
  section: string;
  teacherId?: string;
  totalStudents: number;
  academicYear: string;
  capacity: number;
  currentEnrollment: number;
  schedule: ClassSchedule[];
  status: ClassStatus;
}

export type ClassStatus = 'active' | 'inactive' | 'archived';

export interface ClassSchedule {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}

// Attendance types
export interface AttendanceRecord extends BaseEntity {
  studentId: string;
  classId: string;
  date: string;
  status: AttendanceStatus;
  checkInTime?: string;
  checkOutTime?: string;
  markedBy: string;
  notes?: string;
  location?: string;
  timestamp: string;
  lateMinutes?: number;
  remarks?: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused' | 'holiday' | 'Present' | 'Absent' | 'Late' | 'Holiday';

// Analytics and Reporting types
export interface AttendanceAnalytics {
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  attendanceRate: number;
  period: AnalyticsPeriod;
  trend: TrendDirection;
  comparison: {
    previousPeriod: number;
    change: number;
    changePercentage: number;
  };
}

export type AnalyticsPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type TrendDirection = 'up' | 'down' | 'stable';

// Chart data types
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  tension?: number;
  fill?: boolean;
  borderWidth?: number;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  pointRadius?: number;
  pointHoverRadius?: number;
}

// Search and Filter types
export interface SearchFilters {
  query: string;
  dateRange: {
    start: string;
    end: string;
  };
  classes: string[];
  students: string[];
  status: string;
  riskLevel: string;
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

// Bulk Actions types
export interface BulkAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: (selectedItems: string[]) => Promise<void>;
  variant: 'primary' | 'secondary' | 'danger';
  requiresConfirmation?: boolean;
  confirmationMessage?: string;
}

// Gamification types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: AchievementCategory;
  rarity: AchievementRarity;
  points: number;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
}

export type AchievementCategory = 'attendance' | 'streak' | 'performance' | 'special';
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface UserStats {
  totalAttendance: number;
  currentStreak: number;
  longestStreak: number;
  perfectWeeks: number;
  perfectMonths: number;
  totalPoints: number;
  level: number;
  experience: number;
  nextLevelExperience: number;
  achievements: Achievement[];
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  earnedAt?: Date;
}

// PWA types
export interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface NetworkStatus {
  online: boolean;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Toast types
export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'loading';
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  timestamp: Date;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';
export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: 'light' | 'dark';
  effectiveTheme: 'light' | 'dark';
}
export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  gray: string;
}

// Responsive types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export interface ResponsiveConfig {
  breakpoints: Record<Breakpoint, number>;
  currentBreakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  options?: FormOption[];
  validation?: ValidationRule[];
  defaultValue?: unknown;
  disabled?: boolean;
}

export type FormFieldType = 'text' | 'email' | 'password' | 'number' | 'select' | 'multiselect' | 'checkbox' | 'radio' | 'date' | 'textarea';

export interface FormOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: unknown;
  message: string;
  validator?: (value: unknown) => boolean | string;
}

// Component Props types
export interface LoadingSkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'chart' | 'table';
  width?: string | number;
  height?: string | number;
  className?: string;
  lines?: number;
  rows?: number;
  columns?: number;
}

export interface AnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  description: string;
  icon: React.ReactNode;
  color: string;
  loading?: boolean;
}

// App Context types
export interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

// Legacy types for backward compatibility
export interface Holiday {
  id: string;
  date: string;
  name: string;
  description?: string;
  type: 'national' | 'academic' | 'regional';
  recurring: boolean;
}

export interface AnalyticsData {
  date: string;
  present: number;
  absent: number;
  late: number;
  attendancePercentage: number;
}

export interface LateComerStats {
  studentId: string;
  studentName: string;
  totalLate: number;
  averageLateMinutes: number;
  mostFrequentDays: string[];
}

export interface RiskStudent {
  studentId: string;
  studentName: string;
  attendancePercentage: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastUpdated: string;
}

export interface ReportConfig {
  type: 'student' | 'class' | 'monthly' | 'custom';
  startDate: string;
  endDate: string;
  classId?: string;
  studentId?: string;
  includeAnalytics: boolean;
  includeCharts: boolean;
}

export interface DashboardStats {
  totalStudents: number;
  totalClasses: number;
  todayAttendance: number;
  todayAbsent: number;
  monthlyAverage: number;
  riskStudents: number;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Event types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp?: Date;
}

export interface UserAction {
  type: string;
  payload: unknown;
  timestamp: Date;
  userId?: string;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  stack?: string;
  timestamp: Date;
}

// Config types
export interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  features: {
    analytics: boolean;
    gamification: boolean;
    pwa: boolean;
    bulkActions: boolean;
    advancedSearch: boolean;
  };
  ui: {
    theme: Theme;
    language: string;
    timezone: string;
    dateFormat: string;
  };
}
