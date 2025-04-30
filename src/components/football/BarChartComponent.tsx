
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';

interface BarChartComponentProps {
  data: Array<{
    name: string;
    [key: string]: any;
  }>;
  bars: Array<{
    key: string;
    color: string;
    label?: string;
    stackId?: string;
  }>;
  height?: number;
  title?: string;
  subtitle?: string;
  layout?: 'horizontal' | 'vertical';
  showReferenceLine?: boolean;
  referenceLineValue?: number;
}

export const BarChartComponent: React.FC<BarChartComponentProps> = ({
  data,
  bars,
  height = 300,
  title,
  subtitle,
  layout = 'horizontal',
  showReferenceLine = false,
  referenceLineValue = 0
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
        <BarChart
          data={data}
          layout={layout}
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
          <Legend 
            wrapperStyle={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '12px'
            }}
          />
          {showReferenceLine && <ReferenceLine y={referenceLineValue} stroke="rgba(255, 255, 255, 0.5)" />}
          {bars.map((bar, index) => (
            <Bar 
              key={index}
              dataKey={bar.key}
              name={bar.label || bar.key}
              fill={bar.color}
              stackId={bar.stackId}
              radius={[4, 4, 0, 0]}
              barSize={bar.stackId ? 20 : 30}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
