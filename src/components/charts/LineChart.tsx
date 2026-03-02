import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor?: string;
      fill?: boolean;
      tension?: number;
      borderWidth?: number;
      pointRadius?: number;
    }[];
  };
  options?: ChartOptions<'line'>;
  title?: string;
  height?: number;
  showArea?: boolean;
}

export default function LineChartComponent({ 
  data, 
  options, 
  title, 
  height = 300,
  showArea = false 
}: LineChartProps) {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: !!title,
        text: title,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    ...options,
  };

  // Add fill if showArea is true
  const chartData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      fill: showArea,
      backgroundColor: showArea 
        ? dataset.backgroundColor || `${dataset.borderColor}20`
        : undefined,
    })),
  };

  return (
    <div style={{ height }}>
      <Line data={chartData} options={defaultOptions} />
    </div>
  );
}
