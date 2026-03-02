import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
  options?: ChartOptions<'pie'>;
  title?: string;
  height?: number;
  showLegend?: boolean;
}

export default function PieChartComponent({ 
  data, 
  options, 
  title, 
  height = 300,
  showLegend = true 
}: PieChartProps) {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: showLegend,
        position: 'right' as const,
      },
      title: {
        display: !!title,
        text: title,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const label = context.label || '';
            const value = typeof context.raw === 'number' ? context.raw : 0;
            const total = context.dataset.data.reduce((a, b) => a + Number(b || 0), 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    ...options,
  };

  return (
    <div style={{ height }}>
      <Pie data={data} options={defaultOptions} />
    </div>
  );
}
