
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface LineChartComponentProps {
  data: Array<{
    name: string;
    value: number;
    [key: string]: any;
  }>;
  lines: Array<{
    key: string;
    color: string;
    label?: string;
  }>;
  height?: number;
  title?: string;
  subtitle?: string;
}

export const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data,
  lines,
  height = 300,
  title,
  subtitle
}) => {
  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 p-5 w-full">
      {title && (
        <div className="mb-4">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }} 
          />
          <YAxis 
            tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.8)', 
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.key}
              name={line.label || line.key}
              stroke={line.color}
              strokeWidth={2}
              dot={{ r: 4, fill: line.color, stroke: line.color }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
