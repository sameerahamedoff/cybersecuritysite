import React from 'react';

export default function BarChart({ data, height = 200, showValues = true }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: `${height}px` }}>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }
  
  const maxValue = Math.max(...data.map(item => item.value), 1);
  const chartWidth = 400;
  const chartHeight = 200;
  const padding = 40;
  const barAreaWidth = chartWidth - 2 * padding;
  const barAreaHeight = chartHeight - padding - 30;
  const barWidth = barAreaWidth / data.length;
  const barSpacing = 5;
  const actualBarWidth = barWidth - barSpacing;
  
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent) => {
          const y = padding + (percent / 100) * barAreaHeight;
          return (
            <line
              key={percent}
              x1={padding}
              y1={y}
              x2={chartWidth - padding}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}
        
        {/* Y-axis labels */}
        {[0, 25, 50, 75, 100].map((percent) => {
          const value = Math.round((percent / 100) * maxValue);
          const y = padding + (percent / 100) * barAreaHeight;
          return (
            <text
              key={percent}
              x={padding - 5}
              y={y + 4}
              textAnchor="end"
              className="text-xs fill-gray-500"
            >
              {value}
            </text>
          );
        })}
        
        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * barAreaHeight;
          const x = padding + index * barWidth + barSpacing / 2;
          const y = padding + barAreaHeight - barHeight;
          
          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={actualBarWidth}
                height={barHeight}
                fill={item.color}
                rx="4"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              {showValues && barHeight > 20 && (
                <text
                  x={x + actualBarWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  className="text-xs font-semibold fill-gray-700"
                >
                  {item.value}
                </text>
              )}
              <text
                x={x + actualBarWidth / 2}
                y={chartHeight - 5}
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

