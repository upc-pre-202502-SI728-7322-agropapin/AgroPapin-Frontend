interface DataPoint {
  day: string;
  value: number;
}

interface LineChartProps {
  title: string;
  subtitle: string;
  data: DataPoint[];
  color?: string;
  unit?: string;
}

export function LineChart({ 
  title, 
  subtitle, 
  data, 
  color = '#4ade80',
  unit = '°C'
}: LineChartProps) {
  // Calculate dimensions
  const width = 600;
  const height = 200;
  const padding = { top: 40, right: 20, bottom: 30, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate scales
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const valueRange = maxValue - minValue;
  const yScale = (value: number) => {
    return chartHeight - ((value - minValue) / valueRange) * chartHeight;
  };
  const xScale = (index: number) => {
    return (index / (data.length - 1)) * chartWidth;
  };

  // Create path
  const pathData = data.map((point, index) => {
    const x = xScale(index);
    const y = yScale(point.value);
    return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
  }).join(' ');

  // Calculate current value
  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[data.length - 2]?.value || currentValue;
  const change = currentValue - previousValue;
  const changePercent = previousValue !== 0 ? ((change / previousValue) * 100).toFixed(1) : '0.0';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-1">{title}</div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{currentValue}{unit}</span>
          <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(changePercent))}%
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
      </div>

      <svg 
        width="100%" 
        height={height} 
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((percent, i) => {
          const y = padding.top + chartHeight * percent;
          return (
            <line
              key={i}
              x1={padding.left}
              y1={y}
              x2={padding.left + chartWidth}
              y2={y}
              stroke="#f0f0f0"
              strokeWidth="1"
            />
          );
        })}

        {/* X-axis labels */}
        {data.map((point, index) => {
          if (index % Math.ceil(data.length / 7) === 0 || index === data.length - 1) {
            return (
              <text
                key={index}
                x={padding.left + xScale(index)}
                y={padding.top + chartHeight + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#999"
              >
                {point.day}
              </text>
            );
          }
          return null;
        })}

        {/* Chart line */}
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {data.map((point, index) => (
            <circle
              key={index}
              cx={xScale(index)}
              cy={yScale(point.value)}
              r="4"
              fill={color}
              className="hover:r-6 transition-all cursor-pointer"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
