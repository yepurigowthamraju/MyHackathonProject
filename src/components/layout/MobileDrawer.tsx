import React from 'react';
import { X, ShieldCheck, Lock } from 'lucide-react';
import { Logo } from '../common/Logo';
import { NavItem } from './Sidebar';
import { soundFx } from '../../utils/soundEffects';

import { UserProfile } from '../../types';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  currentUser?: UserProfile;
  onLogout?: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  navItems,
  activeTab,
  onSelectTab,
  currentUser,
  onLogout
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-72 max-w-[80vw] bg-[#090e1a] border-r border-slate-800 h-full flex flex-col justify-between z-10 shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <Logo size="sm" />
          <button onClick={onClose} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1">
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
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border-l-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border border-current/20 ${item.badgeColor || ''}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center text-xs font-mono font-bold text-white">
              {currentUser?.avatarInitials || 'WA'}
            </div>
            <div className="flex flex-col text-left max-w-[130px]">
              <span className="text-xs font-semibold text-slate-200 line-clamp-1">
                {currentUser?.name || 'Welfare Administrator'}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 line-clamp-1">
                <Lock className="w-2.5 h-2.5 flex-shrink-0" /> {currentUser?.role || 'Authorized'}
              </span>
            </div>
          </div>

          {onLogout && (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full mt-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 hover:text-rose-400"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
