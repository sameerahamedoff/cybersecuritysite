import React from 'react';

export default function PieChart({ data, size = 200, innerRadius = 60 }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <p className="text-gray-500">No data</p>
      </div>
    );
  }
  
  const total = data.reduce((sum, item) => sum + (item.value || 0), 0);
  if (total === 0) {
    return (
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <p className="text-gray-500">No data</p>
      </div>
    );
  }
  
  let currentAngle = -90; // Start from top
  const radius = size / 2;
  const centerX = radius;
  const centerY = radius;
  
  const segments = data
    .filter(item => item && item.value > 0)
    .map((item, index) => {
      const value = item.value || 0;
      const percentage = (value / total) * 100;
      const angle = (value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      // Convert angles to radians
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      // Outer arc points
      const outerX1 = centerX + radius * Math.cos(startRad);
      const outerY1 = centerY + radius * Math.sin(startRad);
      const outerX2 = centerX + radius * Math.cos(endRad);
      const outerY2 = centerY + radius * Math.sin(endRad);
      
      // Inner arc points (for donut)
      const innerX1 = centerX + innerRadius * Math.cos(startRad);
      const innerY1 = centerY + innerRadius * Math.sin(startRad);
      const innerX2 = centerX + innerRadius * Math.cos(endRad);
      const innerY2 = centerY + innerRadius * Math.sin(endRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      // Create donut segment path
      const pathData = [
        `M ${outerX1} ${outerY1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${outerX2} ${outerY2}`,
        `L ${innerX2} ${innerY2}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerX1} ${innerY1}`,
        'Z'
      ].join(' ');
      
      // Label position
      const labelAngle = (startAngle + endAngle) / 2;
      const labelRad = (labelAngle * Math.PI) / 180;
      const labelRadius = (radius + innerRadius) / 2;
      const labelX = centerX + labelRadius * Math.cos(labelRad);
      const labelY = centerY + labelRadius * Math.sin(labelRad);
      
      currentAngle += angle;
      
      return {
        ...item,
        pathData,
        percentage,
        labelX,
        labelY,
        index
      };
    });
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((segment) => (
          <g key={segment.index}>
            <path
              d={segment.pathData}
              fill={segment.color}
              stroke="white"
              strokeWidth="2"
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
            {segment.percentage > 8 && (
              <text
                x={segment.labelX}
                y={segment.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-semibold"
                fill="white"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
              >
                {segment.percentage.toFixed(0)}%
              </text>
            )}
          </g>
        ))}
      </svg>
      {innerRadius > 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>
      )}
    </div>
  );
}

