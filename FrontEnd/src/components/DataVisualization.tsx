import { useMemo } from "react";

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export const CircularProgress = ({ 
  value, 
  max, 
  size = 120, 
  strokeWidth = 8, 
  color = "hsl(var(--primary))",
  label 
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = (value / max) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="progress-ring"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${color}30)`
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {label && <span className="text-xs text-muted-foreground text-center">{label}</span>}
      </div>
    </div>
  );
};

interface BarChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  height?: number;
}

export const MiniBarChart = ({ data, height = 60 }: BarChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="flex items-end space-x-1" style={{ height }}>
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className="w-full rounded-t-md transition-all duration-700 ease-out"
            style={{
              height: `${(item.value / maxValue) * 100}%`,
              backgroundColor: item.color,
              minHeight: item.value > 0 ? '4px' : '2px',
              boxShadow: `0 -2px 8px ${item.color}40`
            }}
          />
          <span className="text-xs mt-1 text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

interface GeometricShapeProps {
  type: 'hexagon' | 'triangle' | 'diamond' | 'circle';
  size?: number;
  color?: string;
  children?: React.ReactNode;
}

export const GeometricShape = ({ type, size = 60, color = "hsl(var(--primary))", children }: GeometricShapeProps) => {
  const shapes = {
    hexagon: (
      <polygon 
        points="30,5 55,17.5 55,42.5 30,55 5,42.5 5,17.5" 
        fill={color}
        fillOpacity={0.1}
        stroke={color}
        strokeWidth={2}
      />
    ),
    triangle: (
      <polygon 
        points="30,5 55,50 5,50" 
        fill={color}
        fillOpacity={0.1}
        stroke={color}
        strokeWidth={2}
      />
    ),
    diamond: (
      <polygon 
        points="30,5 55,30 30,55 5,30" 
        fill={color}
        fillOpacity={0.1}
        stroke={color}
        strokeWidth={2}
      />
    ),
    circle: (
      <circle 
        cx="30" 
        cy="30" 
        r="25" 
        fill={color}
        fillOpacity={0.1}
        stroke={color}
        strokeWidth={2}
      />
    )
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 60 60">
        {shapes[type]}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter = ({ value, duration = 1000, prefix = "", suffix = "" }: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    const startValue = 0;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (value - startValue) * easeOutQuart);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{prefix}{displayValue}{suffix}</span>;
};

// Import useState and useEffect
import { useState, useEffect } from "react";