import React, { useState } from 'react';
import { 
  BatteryCharging, 
  Moon, 
  Sun, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  Calendar,
  CheckCircle,
  Activity
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { PersonnelRecord } from '../types';

interface FatigueMonitoringPageProps {
  personnelList: PersonnelRecord[];
  onSelectPersonnel: (personnel: PersonnelRecord) => void;
  onOpenScheduleModal: (personnel: PersonnelRecord) => void;
}

export const FatigueMonitoringPage: React.FC<FatigueMonitoringPageProps> = ({
  personnelList,
  onSelectPersonnel,
  onOpenScheduleModal
}) => {
  const [activeShiftFilter, setActiveShiftFilter] = useState<'All' | 'Night Watch' | 'Day Shift'>('All');

  const fatigueAtRisk = personnelList.filter(p => p.fatigueIndicator >= 60);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <BatteryCharging className="w-6 h-6 text-cyan-400" />
            Personnel Fatigue & Recovery Monitoring
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tracking circadian alignment, cumulative sleep debt, rest buffers, and predictive exhaustion horizons.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs font-mono text-amber-300">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>72-Hour Fatigue Velocity Watch</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono">Average Recovery Score</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">76%</div>
          <p className="text-[11px] text-slate-400 mt-1">Baseline threshold: &gt;70%</p>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono">Reduced Recovery Roster</span>
            <Moon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">112</div>
          <p className="text-[11px] text-slate-400 mt-1">&lt;6h consecutive sleep window</p>
        </GlassCard>

        <GlassCard className="p-4 border-violet-500/30">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono">72h AI Fatigue Risk</span>
            <Sparkles className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-violet-300">37</div>
          <p className="text-[11px] text-slate-400 mt-1">Personnel entering high fatigue</p>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono">Active Rest Buffers</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-300">48</div>
          <p className="text-[11px] text-slate-400 mt-1">12h rest protocols applied</p>
        </GlassCard>
      </div>

      {/* Fatigue Risk Distribution Breakdown */}
      <GlassCard className="p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Fatigue Risk Distribution
          </h3>
          <span className="text-xs font-mono text-cyan-400">1,248 Monitored Personnel</span>
        </div>

        <div className="space-y-4 mt-4">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-emerald-400">Low Risk (Healthy Sleep & Rest Buffers)</span>
              <span className="text-white font-bold">68% (848 personnel)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '68%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-amber-400">Moderate Warning (Elevated Shift Density)</span>
              <span className="text-white font-bold">21% (262 personnel)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '21%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-orange-400">High Risk (Cumulative Sleep Debt &gt;8h)</span>
              <span className="text-white font-bold">8% (100 personnel)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: '8%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-rose-400">Critical Priority (Severe Exhaustion Threshold)</span>
              <span className="text-white font-bold">3% (38 personnel)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: '3%' }} />
            </div>
          </div>
        </div>

        <div className="mt-5 p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs">
            <span className="font-mono font-bold text-cyan-400 uppercase">AI Predictive Notice: </span>
            <span className="text-slate-200">
              “37 personnel may enter elevated fatigue risk within the next 72 hours unless duty rotation intervals or rest buffers are authorized.”
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Roster of Personnel with Elevated Fatigue */}
      <GlassCard className="p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Personnel Requiring Fatigue Optimization
            </h3>
            <p className="text-xs text-slate-400">Recommended for 12-hour turnaround or schedule rebalancing</p>
          </div>
          <Badge level="High" text={`${fatigueAtRisk.length} High Fatigue`} />
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase">
                <th className="py-2.5 px-3">Personnel ID</th>
                <th className="py-2.5 px-3">Formation</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Fatigue Score</th>
                <th className="py-2.5 px-3">Recovery Capacity</th>
                <th className="py-2.5 px-3">Avg Sleep / Night</th>
                <th className="py-2.5 px-3">Weekly Hours</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {fatigueAtRisk.map(p => (
                <tr
                  key={p.id}
                  onClick={() => onSelectPersonnel(p)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-bold text-cyan-400">{p.id}</td>
                  <td className="py-3 px-3 text-slate-300 font-sans">{p.unit}</td>
                  <td className="py-3 px-3 text-slate-400 font-sans">{p.role}</td>
                  <td className="py-3 px-3 font-bold text-rose-400">{p.fatigueIndicator}/100</td>
                  <td className="py-3 px-3 text-emerald-400 font-medium">{p.recoveryScore}%</td>
                  <td className="py-3 px-3 text-amber-300">{p.sleepAverageHours} hrs</td>
                  <td className="py-3 px-3 text-slate-300">{p.weeklyDutyHours} hrs</td>
                  <td className="py-3 px-3 text-right font-sans">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenScheduleModal(p);
                      }}
                      className="px-2.5 py-1 rounded bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs transition-colors"
                    >
                      Schedule Check-In
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
