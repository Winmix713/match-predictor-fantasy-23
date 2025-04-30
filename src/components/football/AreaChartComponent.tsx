
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface AreaChartComponentProps {
  data: Array<{
    name: string;
    [key: string]: any;
  }>;
  areas: Array<{
    key: string;
    color: string;
    label?: string;
  }>;
  height?: number;
  title?: string;
  subtitle?: string;
  stacked?: boolean;
}

export const AreaChartComponent: React.FC<AreaChartComponentProps> = ({
  data,
  areas,
  height = 300,
  title,
  subtitle,
  stacked = false
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
        <AreaChart
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
          {areas.map((area, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={area.key}
              name={area.label || area.key}
              stroke={area.color}
              fill={area.color}
              fillOpacity={0.3}
              stackId={stacked ? "1" : index.toString()}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
