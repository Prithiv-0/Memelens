import { useEffect, useState } from 'react';

export default function ConfidenceMeter({ value = 0, label = 'Confidence' }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.round(value * 100);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Dynamic color based on value
  const getColor = (v) => {
    if (v >= 80) return '#22c55e';
    if (v >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const color = getColor(animatedValue);
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (animatedValue / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: '110px', height: '110px' }}>
        {/* Background circle */}
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle
            cx="55" cy="55" r="42"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
          />
          <circle
            cx="55" cy="55" r="42"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 55 55)"
            style={{ transition: 'stroke-dashoffset 1.2s ease-out, stroke 0.5s ease' }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold" style={{ color, transition: 'color 0.5s ease' }}>
            {animatedValue}%
          </span>
        </div>
      </div>
      <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
    </div>
  );
}
