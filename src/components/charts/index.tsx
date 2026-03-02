import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import type { ChartOptions } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
);

// Chart configuration
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      cornerRadius: 8,
      titleFont: {
        size: 14,
        weight: 'bold' as const
      },
      bodyFont: {
        size: 12
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 11
        }
      }
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        font: {
          size: 11
        }
      }
    }
  }
};

// Attendance Trend Chart
interface AttendanceTrendChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      tension?: number;
      fill?: boolean;
    }>;
  };
  className?: string;
}

export const AttendanceTrendChart: React.FC<AttendanceTrendChartProps> = ({ 
  data, 
  className = '' 
}) => {
  const options = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: true,
        text: 'Attendance Trends',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      }
    }
  };

  return (
    <motion.div
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};

// Class Performance Chart
interface ClassPerformanceChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
    }>;
  };
  className?: string;
}

export const ClassPerformanceChart: React.FC<ClassPerformanceChartProps> = ({ 
  data, 
  className = '' 
}) => {
  const options = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: true,
        text: 'Class Performance Overview',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      }
    },
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  return (
    <motion.div
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-80">
        <Bar data={data} options={options as ChartOptions<'bar'>} />
      </div>
    </motion.div>
  );
};

// Attendance Distribution Chart
interface AttendanceDistributionChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
    }>;
  };
  className?: string;
}

export const AttendanceDistributionChart: React.FC<AttendanceDistributionChartProps> = ({ 
  data, 
  className = '' 
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Attendance Distribution',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      tooltip: {
        callbacks: {
          label: (context: { label?: string; parsed?: number; dataset: { data: number[] } }) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <motion.div
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="h-80">
        <Doughnut data={data} options={options as ChartOptions<'doughnut'>} />
      </div>
    </motion.div>
  );
};

// Risk Analysis Chart
interface RiskAnalysisChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      pointBackgroundColor: string;
      pointBorderColor: string;
      pointHoverBackgroundColor: string;
      pointHoverBorderColor: string;
    }>;
  };
  className?: string;
}

export const RiskAnalysisChart: React.FC<RiskAnalysisChartProps> = ({ 
  data, 
  className = '' 
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Risk Distribution',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  } as ChartOptions<'bar'>;

  return (
    <motion.div
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="h-80">
        <Radar data={data} options={options as ChartOptions<'radar'>} />
      </div>
    </motion.div>
  );
};

// Weekly Pattern Heatmap
interface WeeklyPatternHeatmapProps {
  data: Array<{
    day: string;
    hour: number;
    value: number;
  }>;
  className?: string;
}

export const WeeklyPatternHeatmap: React.FC<WeeklyPatternHeatmapProps> = ({ 
  data, 
  className = '' 
}) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getIntensity = (value: number) => {
    if (value >= 90) return 'bg-success-500';
    if (value >= 75) return 'bg-success-400';
    if (value >= 60) return 'bg-warning-400';
    if (value >= 40) return 'bg-warning-500';
    if (value >= 20) return 'bg-danger-400';
    return 'bg-danger-500';
  };

  const getValueForCell = (day: string, hour: number) => {
    const cell = data.find(d => d.day === day && d.hour === hour);
    return cell?.value || 0;
  };

  return (
    <motion.div
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Weekly Attendance Pattern
      </h3>
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Header */}
          <div className="flex mb-2">
            <div className="w-12"></div>
            {hours.map(hour => (
              <div key={hour} className="w-8 text-xs text-center text-gray-500 dark:text-gray-400">
                {hour}
              </div>
            ))}
          </div>
          
          {/* Grid */}
          {days.map(day => (
            <div key={day} className="flex items-center mb-1">
              <div className="w-12 text-xs text-right pr-2 text-gray-600 dark:text-gray-400">
                {day}
              </div>
              {hours.map(hour => {
                const value = getValueForCell(day, hour);
                return (
                  <motion.div
                    key={`${day}-${hour}`}
                    className={`w-8 h-6 mx-px rounded ${getIntensity(value)} cursor-pointer hover:opacity-80`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (hours.indexOf(hour) * 0.01) }}
                    title={`${day} ${hour}:00 - ${value}%`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center mt-4 space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-success-500 rounded"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Excellent (90%+)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-warning-400 rounded"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Good (60-89%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-danger-500 rounded"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Poor (&lt;60%)</span>
        </div>
      </div>
    </motion.div>
  );
};

// Student Performance Gauge
interface StudentPerformanceGaugeProps {
  value: number;
  max?: number;
  label: string;
  className?: string;
}

export const StudentPerformanceGauge: React.FC<StudentPerformanceGaugeProps> = ({ 
  value, 
  max = 100, 
  label, 
  className = '' 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const getColor = () => {
    if (percentage >= 80) return 'text-success-500';
    if (percentage >= 60) return 'text-warning-500';
    return 'text-danger-500';
  };

  return (
    <motion.div
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {label}
        </h3>
        <div className="relative w-48 h-24 mx-auto mb-4">
          {/* Gauge background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-44 h-20 border-b-4 border-gray-200 dark:border-gray-700 rounded-t-full"></div>
          </div>
          
          {/* Gauge fill */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ rotate: -90 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className={`w-44 h-20 border-b-4 ${getColor().replace('text', 'bg')} rounded-t-full`}></div>
          </motion.div>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getColor()}`}>
                {Math.round(percentage)}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {value}/{max}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
