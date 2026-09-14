import React from 'react';
import { RiskLevel } from '../../types';

interface BadgeProps {
  level?: RiskLevel | 'Info' | 'Active' | 'Acknowledged' | 'Under Investigation' | 'Resolved';
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ level = 'Low', text, size = 'sm', pulse = false }) => {
  const displayText = text || level;

  let colorClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let pulseDotColor = 'bg-emerald-400';

  switch (level) {
    case 'Low':
    case 'Resolved':
      colorClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      pulseDotColor = 'bg-emerald-400';
      break;
    case 'Moderate':
    case 'Under Investigation':
    case 'Acknowledged':
      colorClasses = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      pulseDotColor = 'bg-amber-400';
      break;
    case 'High':
      colorClasses = 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      pulseDotColor = 'bg-orange-400';
      break;
    case 'Critical':
    case 'Active':
      colorClasses = 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      pulseDotColor = 'bg-rose-400';
      break;
    case 'Info':
      colorClasses = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      pulseDotColor = 'bg-cyan-400';
      break;
    default:
      colorClasses = 'bg-slate-700/40 text-slate-300 border-slate-600/30';
      pulseDotColor = 'bg-slate-400';
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-medium tracking-wide uppercase ${colorClasses} ${sizeClasses}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseDotColor}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${pulseDotColor}`}></span>
        </span>
      )}
      {displayText}
    </span>
  );
};
