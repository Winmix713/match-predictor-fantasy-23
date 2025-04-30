
import React from 'react';

interface CircularProgressChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  value?: string | number;
  className?: string;
}

export const CircularProgressChart: React.FC<CircularProgressChartProps> = ({
  percentage,
  size = 120,
  strokeWidth = 6,
  color = '#2196f3',
  label,
  value,
  className,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className={`circular-chart ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="circular-chart-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        
        <circle
          className="circular-chart-path"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          stroke={color}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        
        {/* Center text */}
        {value !== undefined && (
          <text
            x={size / 2}
            y={size / 2}
            className="circular-chart-text"
          >
            {value}
          </text>
        )}
        
        {/* Label below */}
        {label && (
          <text
            x={size / 2}
            y={size / 2 + 20}
            className="text-xs fill-gray-400 text-anchor-middle"
            textAnchor="middle"
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  );
};
