import React from 'react';

export default function LineChart({ data, height = 200, color = '#3b82f6' }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: `${height}px` }}>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }
  
  const maxValue = Math.max(...data.map(item => item.value), 1);
  const minValue = Math.min(...data.map(item => item.value), 0);
  const range = maxValue - minValue || 1;
  const width = 400;
  const chartHeight = 180;
  const padding = 40;
  const chartWidth = width - 2 * padding;
  
  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1 || 1)) * chartWidth;
    const y = padding + chartHeight - ((item.value - minValue) / range) * chartHeight;
    return { x, y, value: item.value, label: item.label };
  });
  
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');
  
  const areaPathData = [
    pathData,
    `L ${points[points.length - 1].x} ${padding + chartHeight}`,
    `L ${points[0].x} ${padding + chartHeight}`,
    'Z'
  ].join(' ');
  
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent) => {
          const y = padding + (percent / 100) * chartHeight;
          return (
            <line
              key={percent}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}
        
        {/* Y-axis labels */}
        {[0, 25, 50, 75, 100].map((percent) => {
          const value = Math.round(minValue + (percent / 100) * range);
          const y = padding + (percent / 100) * chartHeight;
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
        
        {/* Area */}
        <path
          d={areaPathData}
          fill={color}
          fillOpacity="0.2"
        />
        
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Points */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill={color}
              stroke="white"
              strokeWidth="2"
              className="hover:r-6 transition-all cursor-pointer"
            />
            {point.value > 0 && (
              <text
                x={point.x}
                y={point.y - 8}
                textAnchor="middle"
                className="text-xs font-semibold fill-gray-700"
              >
                {point.value}
              </text>
            )}
          </g>
        ))}
        
        {/* X-axis labels - show every 5th label */}
        {points.map((point, index) => {
          const showLabel = index % Math.max(1, Math.ceil(data.length / 6)) === 0 || index === points.length - 1;
          return showLabel ? (
            <text
              key={index}
              x={point.x}
              y={padding + chartHeight + 15}
              textAnchor="middle"
              className="text-xs fill-gray-600"
            >
              {point.label}
            </text>
          ) : null;
        })}
      </svg>
    </div>
  );
}

