import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Sparkles, 
  ShieldCheck, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  Clock,
  Menu,
  Award,
  Volume2,
  VolumeX,
  Radio
} from 'lucide-react';
import { EarlyWarningAlert, UserProfile } from '../../types';
import { soundFx } from '../../utils/soundEffects';

interface TopNavbarProps {
  pageTitle: string;
  pageSubtitle: string;
  presentationMode: boolean;
  onTogglePresentationMode: () => void;
  alerts: EarlyWarningAlert[];
  currentUser?: UserProfile;
  onLogout?: () => void;
  onSelectAlert?: (alert: EarlyWarningAlert) => void;
  onNavigate?: (page: string) => void;
  onSearchQuery?: (q: string) => void;
  onOpenMobileMenu?: () => void;
  onOpenJudgePitch?: () => void;
  isSimulatingLive?: boolean;
  onToggleSimulateLive?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  pageTitle,
  pageSubtitle,
  presentationMode,
  onTogglePresentationMode,
  alerts,
  currentUser,
  onLogout,
  onSelectAlert,
  onNavigate,
  onSearchQuery,
  onOpenMobileMenu,
  onOpenJudgePitch,
  isSimulatingLive = false,
  onToggleSimulateLive
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.enabled = next;
    if (next) soundFx.playClick();
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }) + ' • ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeAlerts = alerts.filter(a => a.status === 'Active' || a.status === 'Under Investigation');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onSearchQuery) onSearchQuery(e.target.value);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Mobile menu toggle + Page Title & Subtitle */}
        <div className="flex items-center gap-3">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 md:hidden hover:text-white"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
                {pageTitle}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                CONFIDENTIAL WELFARE TIER
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{pageSubtitle}</p>
          </div>
        </div>

        {/* Center / Right Controls */}
        <div className="flex items-center gap-2.5 flex-wrap md:flex-nowrap justify-end">
          {/* Global Search */}
          <div className="relative w-44 sm:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search personnel, units..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 font-mono"
            />
          </div>

          {/* Time Display */}
          <div className="hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentTime}</span>
          </div>

          {/* Live Telemetry Simulator Toggle */}
          {onToggleSimulateLive && (
            <button
              onClick={() => {
                soundFx.playClick();
                onToggleSimulateLive();
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                isSimulatingLive
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle Simulated Live Telemetry Stream"
            >
              <Radio className={`w-3.5 h-3.5 ${isSimulatingLive ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">
                {isSimulatingLive ? 'Telemetry: Live' : 'Simulate Stream'}
              </span>
            </button>
          )}

          {/* Audio Feedback Toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-lg bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-white"
            title={soundEnabled ? 'Mute Interface Audio' : 'Unmute Interface Audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Judge Pitch Brief Button */}
          {onOpenJudgePitch && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenJudgePitch();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/30 to-indigo-600/30 border border-violet-500/40 text-violet-300 hover:text-white text-xs font-mono font-semibold transition-all shadow-sm"
              title="View Hackathon Judge Pitch & Architecture"
            >
              <Award className="w-3.5 h-3.5 text-violet-400" />
              <span className="hidden lg:inline">Judge Pitch Brief</span>
            </button>
          )}

          {/* AI Status Badge */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-xs font-mono select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-semibold tracking-wider text-[11px]">AI ONLINE</span>
          </div>

          {/* Presentation Mode Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              onTogglePresentationMode();
            }}
            title={presentationMode ? 'Exit Presentation Mode' : 'Enter Hackathon Presentation Mode'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              presentationMode
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400'
                : 'bg-slate-900/70 text-slate-300 border-slate-700 hover:border-cyan-500/40 hover:text-cyan-300'
            }`}
          >
            {presentationMode ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Exit</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Presentation Mode</span>
              </>
            )}
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                soundFx.playClick();
                setShowNotifications(!showNotifications);
              }}
              className="relative p-2 rounded-lg bg-slate-900/70 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="Alerts"
            >
              <Bell className="w-4 h-4" />
              {activeAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white ring-2 ring-[#070b14]">
                  {activeAlerts.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
                      Early Warning Feed
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400">
                    {activeAlerts.length} Active
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60 my-1">
                  {activeAlerts.map(alert => (
                    <div
                      key={alert.id}
                      onClick={() => {
                        soundFx.playClick();
                        if (onSelectAlert) onSelectAlert(alert);
                        setShowNotifications(false);
                      }}
                      className="py-2.5 px-1 hover:bg-slate-800/40 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className={`font-semibold font-mono ${
                          alert.severity === 'Critical' ? 'text-rose-400' : 'text-amber-400'
                        }`}>
                          {alert.severity} • {alert.riskType}
                        </span>
                        <span className="text-slate-500 font-mono">{alert.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-200 font-medium line-clamp-1">{alert.title}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{alert.affectedGroup}</p>
                    </div>
                  ))}
                  {activeAlerts.length === 0 && (
                    <div className="py-6 text-center text-xs text-slate-400">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-1.5 opacity-80" />
                      All personnel indicators within normal parameters
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-mono">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      if (onNavigate) onNavigate('Alerts');
                      setShowNotifications(false);
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                  >
                    View Alert Center →
                  </button>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-slate-300 text-[11px]"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800/80 group relative">
            <button
              onClick={() => {
                if (onNavigate) onNavigate('Settings');
              }}
              className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500/30 to-violet-600/30 border border-cyan-500/40 flex items-center justify-center text-xs font-mono font-bold text-cyan-300 shadow-sm hover:border-cyan-400 transition-colors"
              title="View Profile in Settings"
            >
              {currentUser?.avatarInitials || 'WA'}
            </button>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-200 leading-tight line-clamp-1 max-w-[130px]">
                {currentUser?.name || 'Welfare Admin'}
              </span>
              <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                {currentUser?.id || 'Authorized'}
              </span>
            </div>

            {onLogout && (
              <button
                onClick={onLogout}
                className="hidden sm:inline-flex text-[10px] font-mono text-slate-500 hover:text-rose-400 px-1.5 py-0.5 rounded border border-transparent hover:border-slate-800 transition-colors ml-1"
                title="Sign Out"
              >
                Exit
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
