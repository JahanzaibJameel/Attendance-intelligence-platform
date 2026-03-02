export interface AttendancePrediction {
  studentId: string;
  date: string;
  predictedStatus: 'present' | 'absent' | 'late';
  confidence: number;
  factors: PredictionFactor[];
}

export interface PredictionFactor {
  name: string;
  value: number;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number;
}

export interface RiskAnalysis {
  studentId: string;
  currentRisk: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  trend: 'improving' | 'stable' | 'declining';
  factors: RiskFactor[];
  recommendations: string[];
}

export interface RiskFactor {
  type: 'attendance' | 'performance' | 'behavioral' | 'external';
  name: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface TrendAnalysis {
  period: 'week' | 'month' | 'quarter' | 'year';
  trend: 'upward' | 'downward' | 'stable';
  changeRate: number;
  prediction: TrendPrediction;
}

export interface TrendPrediction {
  nextPeriodValue: number;
  confidence: number;
  factors: string[];
}

export interface Insight {
  id: string;
  type: 'pattern' | 'anomaly' | 'prediction' | 'recommendation';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  data: Record<string, unknown>;
  actionable: boolean;
  actions?: string[];
}

export interface AnalyticsContextType {
  predictions: AttendancePrediction[];
  riskAnalysis: RiskAnalysis[];
  trendAnalysis: TrendAnalysis[];
  insights: Insight[];
  generatePredictions: (studentIds: string[], dates: string[]) => Promise<void>;
  analyzeRisks: (studentIds: string[]) => Promise<void>;
  analyzeTrends: (period: string) => Promise<void>;
  generateInsights: () => Promise<void>;
  getStudentPrediction: (studentId: string, date: string) => AttendancePrediction | null;
  getStudentRiskAnalysis: (studentId: string) => RiskAnalysis | null;
}
