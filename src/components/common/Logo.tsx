import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  }[size];

  const titleSizes = {
    sm: 'text-sm font-semibold tracking-wider',
    md: 'text-base font-bold tracking-wider',
    lg: 'text-xl font-extrabold tracking-widest'
  }[size];

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Abstract Shield + Neural Nodes + Pulse Vector Icon */}
      <div className={`relative ${iconSizes} flex items-center justify-center`}>
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-cyan-500/20 rounded-xl blur-sm" />

        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          {/* Shield Outline with subtle cyber bevel */}
          <path
            d="M32 4L10 13V30C10 46 20 57 32 60C44 57 54 46 54 30V13L32 4Z"
            stroke="url(#shieldGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="rgba(6, 182, 212, 0.08)"
          />

          {/* Neural Network Nodes & Interconnects */}
          <circle cx="24" cy="22" r="2.5" fill="#00f2fe" />
          <circle cx="40" cy="22" r="2.5" fill="#8b5cf6" />
          <circle cx="32" cy="30" r="3" fill="#10b981" />
          <circle cx="25" cy="42" r="2" fill="#00f2fe" opacity="0.8" />
          <circle cx="39" cy="42" r="2" fill="#8b5cf6" opacity="0.8" />

          {/* Neural lines connecting nodes */}
          <line x1="24" y1="22" x2="32" y2="30" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="1.2" />
          <line x1="40" y1="22" x2="32" y2="30" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1.2" />
          <line x1="32" y1="30" x2="25" y2="42" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.2" />
          <line x1="32" y1="30" x2="39" y2="42" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1.2" />

          {/* Heartbeat / Wellness Pulse Sine Line passing across the core */}
          <path
            d="M17 33H24L28 26L32 40L36 29L39 35L42 33H47"
            stroke="#00f2fe"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <defs>
            <linearGradient id="shieldGrad" x1="10" y1="4" x2="54" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00f2fe" />
              <stop offset="0.5" stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-mono text-white ${titleSizes} flex items-center gap-1.5`}>
            WELFARE <span className="text-cyan-400">INTELLIGENCE</span>
          </span>
          <span className="text-[9px] tracking-[0.2em] font-semibold text-cyan-500/80 uppercase">
            AI PERSONNEL WELLBEING PLATFORM
          </span>
        </div>
      )}
    </div>
  );
};
