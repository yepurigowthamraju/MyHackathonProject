import React from 'react';
import {
  LayoutDashboard,
  Users,
  BrainCircuit,
  Activity,
  BatteryCharging,
  HeartHandshake,
  AlertTriangle,
  LifeBuoy,
  FileText,
  Bot,
  Settings,
  ShieldCheck,
  CheckCircle,
  Lock
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { soundFx } from '../../utils/soundEffects';
import { UserProfile } from '../../types';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeColor?: string;
}

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  currentUser?: UserProfile;
  unacknowledgedAlertsCount?: number;
  pendingInterventionsCount?: number;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  currentUser,
  unacknowledgedAlertsCount = 0,
  pendingInterventionsCount = 0,
  onLogout
}) => {
  const navItems: NavItem[] = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'Personnel', label: 'Personnel', icon: Users },
    { id: 'AIRisk', label: 'AI Risk Prediction', icon: BrainCircuit, badge: 'Horizon 7d', badgeColor: 'bg-violet-500/20 text-violet-300' },
    { id: 'StressAnalytics', label: 'Stress Analytics', icon: Activity },
    { id: 'FatigueMonitoring', label: 'Fatigue Monitoring', icon: BatteryCharging },
    { id: 'WelfareSupport', label: 'Welfare & Support', icon: HeartHandshake },
    { 
      id: 'Alerts', 
      label: 'Alerts', 
      icon: AlertTriangle, 
      badge: unacknowledgedAlertsCount > 0 ? unacknowledgedAlertsCount : undefined, 
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30' 
    },
    { 
      id: 'InterventionCenter', 
      label: 'Intervention Center', 
      icon: LifeBuoy,
      badge: pendingInterventionsCount > 0 ? pendingInterventionsCount : undefined,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    },
    { id: 'ReportsInsights', label: 'Reports & Insights', icon: FileText },
    { id: 'AIAssistant', label: 'AI Assistant', icon: Bot, badge: 'Active', badgeColor: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'Settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 xl:w-72 bg-[#090e1a] border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 select-none z-40 transition-all">
      {/* Top Section: Logo & Branding */}
      <div className="flex flex-col">
        <div className="p-5 border-b border-slate-800/80">
          <Logo size="md" />
        </div>

        {/* Navigation items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)] scrollbar-none">
          <div className="px-3 py-1 text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
            Intelligence Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectTab(item.id);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/15 via-cyan-500/10 to-transparent text-cyan-300 border-l-2 border-cyan-400 shadow-sm shadow-cyan-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span className="tracking-tight">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border border-current/20 ${
                      item.badgeColor || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: System Status & User Profile */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
        {/* System Status Indicators */}
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-2.5 space-y-2">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
            <span>System Status</span>
            <span className="text-emerald-400">99.98%</span>
          </div>

          <div className="space-y-1.5 text-[11px] font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="text-slate-400">AI Engine:</span>
              <span className="text-emerald-400 font-semibold ml-auto">Online</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              <span className="text-slate-400">Data Pipeline:</span>
              <span className="text-cyan-400 font-semibold ml-auto">Active</span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]" />
              <span className="text-slate-400">Privacy Controls:</span>
              <span className="text-violet-300 font-semibold ml-auto">Enabled</span>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-xs font-mono font-bold text-white shadow-md">
              {currentUser?.avatarInitials || 'WA'}
            </div>
            <div className="flex flex-col text-left max-w-[130px]">
              <span className="text-xs font-semibold text-slate-200 line-clamp-1">
                {currentUser?.name || 'Welfare Administrator'}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 line-clamp-1">
                <Lock className="w-2.5 h-2.5 flex-shrink-0" /> {currentUser?.role || 'Authorized Access'}
              </span>
            </div>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="text-[11px] font-mono text-slate-500 hover:text-rose-400 px-1.5 py-0.5 rounded border border-transparent hover:border-slate-800 transition-colors"
              title="Sign Out"
            >
              Exit
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
