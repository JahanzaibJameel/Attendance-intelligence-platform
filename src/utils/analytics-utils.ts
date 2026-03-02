// Analytics utility functions

// Local type definitions
interface AttendancePrediction {
  studentId: string;
  date: string;
  predictedAttendance: boolean;
  confidence: number;
  factors: string[];
}

interface RiskAnalysis {
  studentId: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  factors: string[];
  recommendations: string[];
}

interface TrendAnalysis {
  period: 'daily' | 'weekly' | 'monthly';
  trend: 'improving' | 'declining' | 'stable';
  change: number;
  data: Array<{ date: string; value: number }>;
  factors: string[];
}

interface Insight {
  id: string;
  type: 'pattern' | 'anomaly' | 'prediction' | 'recommendation';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  data: Record<string, unknown>;
  actionable: boolean;
  actions?: string[];
}

export const generateMockPredictions = (): AttendancePrediction[] => {
  return [
    {
      studentId: '1',
      date: '2024-01-15',
      predictedAttendance: true,
      confidence: 0.85,
      factors: ['Historical attendance', 'Recent patterns', 'Class schedule']
    },
    {
      studentId: '2',
      date: '2024-01-15',
      predictedAttendance: false,
      confidence: 0.72,
      factors: ['Recent absences', 'Health indicators', 'External factors']
    }
  ];
};

export const generateMockRiskAnalysis = (): RiskAnalysis[] => {
  return [
    {
      studentId: '1',
      riskLevel: 'low',
      riskScore: 15,
      factors: ['Consistent attendance', 'Good academic performance'],
      recommendations: ['Maintain current patterns', 'Continue monitoring']
    },
    {
      studentId: '2',
      riskLevel: 'high',
      riskScore: 78,
      factors: ['Frequent absences', 'Declining performance', 'External issues'],
      recommendations: ['Immediate intervention', 'Parental contact', 'Support services']
    }
  ];
};

export const generateMockTrendAnalysis = (): TrendAnalysis[] => {
  return [
    {
      period: 'weekly',
      trend: 'improving',
      change: 5.2,
      data: [
        { date: '2024-01-01', value: 88 },
        { date: '2024-01-08', value: 91 },
        { date: '2024-01-15', value: 93 }
      ],
      factors: ['New policies', 'Weather improvements', 'Seasonal patterns']
    }
  ];
};

export const generateMockInsights = (): Insight[] => {
  return [
    {
      id: '1',
      type: 'pattern',
      title: 'Monday Morning Absenteeism',
      description: '15% increase in absences on Monday mornings compared to other days',
      severity: 'warning',
      data: { day: 'Monday', increase: 15 },
      actionable: true,
      actions: ['Review Monday schedule', 'Consider student wellness programs']
    },
    {
      id: '2',
      type: 'anomaly',
      title: 'Unusual Absence Pattern Detected',
      description: '3 students showing concerning absence patterns in Class 10A',
      severity: 'critical',
      data: { class: '10A', students: 3 },
      actionable: true,
      actions: ['Immediate intervention required', 'Contact parents']
    },
    {
      id: '3',
      type: 'prediction',
      title: 'Upcoming Week Prediction',
      description: 'Expected 92% attendance rate based on historical patterns',
      severity: 'info',
      data: { predictedRate: 92 },
      actionable: false
    },
    {
      id: '4',
      type: 'recommendation',
      title: 'Optimize Class Schedule',
      description: 'Consider adjusting first period timing to improve attendance',
      severity: 'info',
      data: { suggestedTime: '9:00 AM' },
      actionable: true,
      actions: ['Survey students', 'Pilot schedule change']
    }
  ];
};
