import React from 'react';

interface HeatMapData {
  date: string;
  value: number;
}

interface HeatMapProps {
  data: HeatMapData[];
  startDate: string;
  endDate: string;
  title?: string;
  height?: number;
  colorScale?: {
    min: string;
    low: string;
    medium: string;
    high: string;
    max: string;
  };
}

export default function HeatMapComponent({
  data,
  startDate,
  endDate,
  title,
  height = 300,
  colorScale = {
    min: '#ebedf0',
    low: '#9be9a8',
    medium: '#40c463',
    high: '#30a14e',
    max: '#216e39',
  },
}: HeatMapProps) {
  // Generate all dates between start and end
  const generateDateRange = () => {
    const dates = [];
    const current = new Date(startDate);
    const end = new Date(endDate);
    
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  };

  const dates = generateDateRange();
  
  // Group by week
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  
  dates.forEach((date, index) => {
    if (index % 7 === 0 && currentWeek.length > 0) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
    currentWeek.push(date);
  });
  
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Get value for a date
  const getValue = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const item = data.find(d => d.date === dateStr);
    return item ? item.value : 0;
  };

  // Get color for value
  const getColor = (value: number) => {
    if (value === 0) return colorScale.min;
    if (value < 20) return colorScale.low;
    if (value < 40) return colorScale.medium;
    if (value < 60) return colorScale.high;
    return colorScale.max;
  };

  // Get month name
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6" style={{ minHeight: height }}>
      {title && (
        <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      )}
      
      <div className="overflow-x-auto">
        <div className="flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-1 mr-2">
            {['Mon', 'Wed', 'Fri'].map(day => (
              <div key={day} className="h-4 text-xs text-gray-500 text-right pr-2">
                {day}
              </div>
            ))}
          </div>

          {/* Heat map grid */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {/* Month label for first week of month */}
                {weekIndex === 0 || 
                 new Date(week[0]).getMonth() !== new Date(weeks[weekIndex - 1][0]).getMonth() ? (
                  <div className="text-xs text-gray-500 text-center h-4">
                    {getMonthName(week[0])}
                  </div>
                ) : (
                  <div className="h-4"></div>
                )}
                
                {/* Week cells */}
                {week.map((date, dayIndex) => {
                  const value = getValue(date);
                  const color = getColor(value);
                  
                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: color }}
                      title={`${date.toLocaleDateString()}: ${value}% attendance`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <span className="text-xs text-gray-500">Less</span>
          {Object.values(colorScale).map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="text-xs text-gray-500">More</span>
        </div>
      </div>
    </div>
  );
}
