
import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { cn } from "@/lib/utils";

interface BarChartProps {
  data: any[];
  bars: {
    dataKey: string;
    fill: string;
    name?: string;
  }[];
  xAxisDataKey: string;
  className?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  bars,
  xAxisDataKey,
  className,
  height = 300,
  showGrid = true,
  showLegend = true
}) => {
  return (
    <ResponsiveContainer width="100%" height={height} className={cn("mt-4", className)}>
      <RechartsBarChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 5,
        }}
      >
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        )}
        <XAxis 
          dataKey={xAxisDataKey} 
          tick={{ fill: 'rgba(255,255,255,0.7)' }}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
        />
        <YAxis 
          tick={{ fill: 'rgba(255,255,255,0.7)' }}
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(0,0,0,0.8)', 
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'white'
          }} 
        />
        {showLegend && (
          <Legend wrapperStyle={{ color: 'white' }} />
        )}
        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey}
            name={bar.name || bar.dataKey}
            fill={bar.fill}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
