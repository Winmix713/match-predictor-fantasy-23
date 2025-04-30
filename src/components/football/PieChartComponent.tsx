
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface PieChartComponentProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  height?: number;
  title?: string;
  subtitle?: string;
  innerRadius?: number;
  outerRadius?: number;
  legendPosition?: 'top' | 'bottom' | 'right' | 'left';
  customLabel?: boolean;
}

export const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  height = 300,
  title,
  subtitle,
  innerRadius = 0,
  outerRadius = 80,
  legendPosition = 'bottom',
  customLabel = false
}) => {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    if (!customLabel) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 p-5 w-full">
      {title && (
        <div className="mb-4">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={customLabel}
            label={customLabel ? renderCustomizedLabel : undefined}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend 
            layout={legendPosition === 'left' || legendPosition === 'right' ? 'vertical' : 'horizontal'}
            verticalAlign={legendPosition === 'top' ? 'top' : 'bottom'}
            align="center" 
            iconType="circle"
            wrapperStyle={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '12px'
            }}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.8)', 
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: 'white'
            }}
            formatter={(value) => [`${value}`, '']}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
