import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = false,
  hoverEffect = false,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
        glow ? 'glass-panel-glow' : 'glass-panel'
      } ${
        hoverEffect
          ? 'hover:-translate-y-0.5 hover:shadow-cyan-500/10 hover:border-cyan-500/30 cursor-pointer'
          : ''
      } ${className}`}
    >
      {/* Subtle top reflective border highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
      {children}
    </div>
  );
};
