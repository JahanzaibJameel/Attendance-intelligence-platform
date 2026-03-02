// Advanced analytics components
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Brain, TrendingUp, AlertTriangle, Target, Activity, BarChart3 } from 'lucide-react';
import type { 
  AttendancePrediction, 
  RiskAnalysis, 
  TrendAnalysis, 
  Insight,
  AnalyticsContextType 
} from '../../types/analytics';
import { useAnalytics } from '../../hooks/useAnalytics';

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [predictions, setPredictions] = useState<AttendancePrediction[]>([]);
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis[]>([]);
  const [trendAnalysis, setTrendAnalysis] = useState<TrendAnalysis[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);

  // Generate predictions
  const generatePredictions = useCallback(async (studentIds: string[], dates: string[]) => {
    // Simulate prediction generation
    const newPredictions: AttendancePrediction[] = studentIds.flatMap(studentId =>
      dates.map(date => ({
        studentId,
        date,
        predictedStatus: Math.random() > 0.2 ? 'present' : Math.random() > 0.5 ? 'late' : 'absent',
        confidence: Math.random() * 0.3 + 0.7,
        factors: [
          { name: 'Historical attendance', value: 0.8, impact: 'positive', weight: 0.4 },
          { name: 'Recent performance', value: 0.6, impact: 'neutral', weight: 0.3 },
          { name: 'External factors', value: 0.3, impact: 'negative', weight: 0.3 }
        ]
      }))
    );
    setPredictions(newPredictions);
  }, []);

  // Analyze risks
  const analyzeRisks = useCallback(async (studentIds: string[]) => {
    // Simulate risk analysis
    const newRiskAnalysis: RiskAnalysis[] = studentIds.map(studentId => ({
      studentId,
      currentRisk: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      riskScore: Math.floor(Math.random() * 100),
      trend: Math.random() > 0.5 ? 'improving' : Math.random() > 0.3 ? 'stable' : 'declining',
      factors: [
        { type: 'attendance', name: 'Recent absences', severity: 'medium', description: 'Multiple recent absences' },
        { type: 'performance', name: 'Grades decline', severity: 'low', description: 'Slight grade decrease' }
      ],
      recommendations: ['Monitor attendance', 'Provide additional support']
    }));
    setRiskAnalysis(newRiskAnalysis);
  }, []);

  // Analyze trends
  const analyzeTrends = useCallback(async (period: string) => {
    // Simulate trend analysis
    const newTrendAnalysis: TrendAnalysis[] = [{
      period: period as 'week' | 'month',
      trend: Math.random() > 0.5 ? 'upward' : Math.random() > 0.3 ? 'stable' : 'downward',
      changeRate: Math.random() * 20 - 10,
      prediction: {
        nextPeriodValue: Math.random() * 100,
        confidence: Math.random() * 0.3 + 0.7,
        factors: ['Seasonal patterns', 'Historical data', 'Recent trends']
      }
    }];
    setTrendAnalysis(newTrendAnalysis);
  }, []);

  // Generate insights
  const generateInsights = useCallback(async () => {
    // Simulate insight generation
    const generatedInsights: Insight[] = [
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
    setInsights(generatedInsights);
  }, []);

  const getStudentPrediction = useCallback((studentId: string, date: string) => {
    return predictions.find(p => p.studentId === studentId && p.date === date) || null;
  }, [predictions]);

  const getStudentRiskAnalysis = useCallback((studentId: string) => {
    return riskAnalysis.find(r => r.studentId === studentId) || null;
  }, [riskAnalysis]);

  const contextValue: AnalyticsContextType = {
    predictions,
    riskAnalysis,
    trendAnalysis,
    insights,
    generatePredictions,
    analyzeRisks,
    analyzeTrends,
    generateInsights,
    getStudentPrediction,
    getStudentRiskAnalysis
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export { AnalyticsContext };

// Prediction card component
export const PredictionCard: React.FC<{
  prediction: AttendancePrediction;
  studentName: string;
  className?: string;
}> = ({ prediction, studentName, className = '' }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-100';
      case 'absent': return 'text-red-600 bg-red-100';
      case 'late': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900 dark:text-gray-100">{studentName}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prediction.predictedStatus)}`}>
          {prediction.predictedStatus}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Confidence</span>
          <span className="font-medium">{Math.round(prediction.confidence * 100)}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Date</span>
          <span className="text-gray-900 dark:text-gray-100">{prediction.date}</span>
        </div>
      </div>
    </div>
  );
};

// Risk analysis card component
export const RiskAnalysisCard: React.FC<{
  analysis: RiskAnalysis;
  studentName: string;
  className?: string;
}> = ({ analysis, studentName, className = '' }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900 dark:text-gray-100">{studentName}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(analysis.currentRisk)}`}>
          {analysis.currentRisk}
        </span>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Risk Score</span>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900 dark:text-gray-100">{analysis.riskScore}</span>
            <div className="flex items-center">
              {getTrendIcon(analysis.trend)}
              <span className="text-xs text-gray-500 ml-1">{analysis.trend}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Key Factors</p>
          <div className="space-y-1">
            {analysis.factors.slice(0, 2).map((factor, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">{factor.name}</span>
                <span className={`px-1 py-0.5 rounded text-xs ${
                  factor.severity === 'high' ? 'bg-red-100 text-red-700' :
                  factor.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {factor.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Insights panel component
export const InsightsPanel: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { insights } = useAnalytics();

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'info': return <Target className="w-4 h-4 text-blue-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-200 bg-red-50 dark:border-red-800/30 dark:bg-red-900/20';
      case 'warning': return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800/30 dark:bg-yellow-900/20';
      case 'info': return 'border-blue-200 bg-blue-50 dark:border-blue-800/30 dark:bg-blue-900/20';
      default: return 'border-gray-200 bg-gray-50 dark:border-gray-800/30 dark:bg-gray-900/20';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Insights</h3>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 rounded-lg border ${getSeverityColor(insight.severity)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getSeverityIcon(insight.severity)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {insight.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {insight.description}
                </p>
                {insight.actionable && insight.actions && (
                  <div className="flex flex-wrap gap-2">
                    {insight.actions.map((action, index) => (
                      <button
                        key={index}
                        className="text-xs px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Analytics dashboard component
export const AnalyticsDashboard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { generatePredictions, analyzeRisks, analyzeTrends, generateInsights } = useAnalytics();

  useEffect(() => {
    // Initialize analytics data
    generatePredictions(['1', '2', '3'], ['2024-01-15', '2024-01-16']);
    analyzeRisks(['1', '2', '3']);
    analyzeTrends('week');
    generateInsights();
  }, [analyzeRisks, analyzeTrends, generateInsights, generatePredictions]);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Predictions</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            AI-powered attendance predictions based on historical patterns and external factors.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Risk Analysis</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Comprehensive risk assessment for students with early warning indicators.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Trend Analysis</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Advanced trend detection and forecasting for attendance patterns.
          </p>
        </div>
      </div>
    </div>
  );
};
