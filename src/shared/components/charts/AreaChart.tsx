import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  day: string;
  value: number;
}

interface AreaChartProps {
  title: string;
  subtitle?: string;
  data: DataPoint[];
  color?: string;
  unit?: string;
  dataKey?: string;
}

export function AreaChart({ 
  title, 
  subtitle = '',
  data, 
  color = '#4ade80',
  unit = '°C',
  dataKey = 'value'
}: AreaChartProps) {
  // Calculate current value and change
  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[data.length - 2]?.value || currentValue;
  const change = currentValue - previousValue;
  const changePercent = previousValue !== 0 ? ((change / previousValue) * 100).toFixed(1) : '0.0';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 w-full min-w-0">
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-1">{title}</div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{currentValue}{unit}</span>
          <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(changePercent))}%
          </span>
        </div>
        {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
      </div>

      <div className="w-full min-w-0">
        <ResponsiveContainer width="100%" height={200}>
          <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`colorGradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              tick={{ fill: '#999', fontSize: 12 }}
              axisLine={{ stroke: '#e5e5e5' }}
            />
            <YAxis 
              tick={{ fill: '#999', fontSize: 12 }}
              axisLine={{ stroke: '#e5e5e5' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
              formatter={(value: number) => [`${value}${unit}`, title]}
            />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={3}
              fillOpacity={1} 
              fill={`url(#colorGradient-${color})`}
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
