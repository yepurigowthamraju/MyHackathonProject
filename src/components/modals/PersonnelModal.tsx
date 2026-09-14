import React from 'react';
import { 
  X, 
  BrainCircuit, 
  Calendar, 
  Clock, 
  Activity, 
  BatteryMedium, 
  Heart, 
  AlertCircle, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles,
  UserCheck,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { PersonnelRecord } from '../../types';
import { Badge } from '../common/Badge';
import { GlassCard } from '../common/GlassCard';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

interface PersonnelModalProps {
  personnel: PersonnelRecord | null;
  onClose: () => void;
  onScheduleCheckIn: (personnel: PersonnelRecord) => void;
}

export const PersonnelModal: React.FC<PersonnelModalProps> = ({
  personnel,
  onClose,
  onScheduleCheckIn
}) => {
  if (!personnel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0b1222] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Glow Line */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-400" />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-start justify-between bg-slate-900/60">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded">
                PERSONNEL WELLNESS PROFILE
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {personnel.id}</span>
              <Badge level={personnel.overallRisk} pulse={personnel.overallRisk === 'Critical'} />
            </div>

            <h2 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
              {personnel.id} • {personnel.unit}
              <span className="text-sm font-normal text-slate-400">({personnel.role})</span>
            </h2>

            <div className="flex items-center gap-4 mt-1 text-xs text-slate-400 font-mono">
              <span>Duty: <strong className="text-slate-200">{personnel.dutyType}</strong></span>
              <span>•</span>
              <span>Weekly Load: <strong className="text-slate-200">{personnel.weeklyDutyHours} hrs</strong></span>
              <span>•</span>
              <span>Avg Sleep: <strong className="text-slate-200">{personnel.sleepAverageHours} hrs/night</strong></span>
              <span>•</span>
              <span>Last Check-in: <strong className="text-slate-300">{personnel.lastCheckIn}</strong></span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Non-Punitive Welfare Banner */}
          <div className="px-4 py-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-between text-xs text-cyan-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>
                <strong>Confidential Decision Support:</strong> Indicators are predictive wellness markers to aid early rest and support decisions, not medical diagnoses or disciplinary scoring.
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 ml-2 whitespace-nowrap">
              Confidence: {personnel.aiConfidence}%
            </span>
          </div>

          {/* 4 Core Wellbeing KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GlassCard className="p-4 border-amber-500/20 bg-slate-900/50">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Stress Indicator</span>
                <Activity className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-amber-400">
                {personnel.stressIndicator}<span className="text-xs text-slate-500 font-normal">/100</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Status: {personnel.stressRisk} Risk</p>
            </GlassCard>

            <GlassCard className="p-4 border-rose-500/20 bg-slate-900/50">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Fatigue Indicator</span>
                <BatteryMedium className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-rose-400">
                {personnel.fatigueIndicator}<span className="text-xs text-slate-500 font-normal">/100</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Status: {personnel.fatigueRisk} Risk</p>
            </GlassCard>

            <GlassCard className="p-4 border-emerald-500/20 bg-slate-900/50">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Recovery Score</span>
                <Heart className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-400">
                {personnel.recoveryScore}<span className="text-xs text-slate-500 font-normal">/100</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {personnel.recoveryScore >= 70 ? 'Adequate Rest' : 'Rest Deficit Detected'}
              </p>
            </GlassCard>

            <GlassCard className="p-4 border-cyan-500/20 bg-slate-900/50">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Wellness Index</span>
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-cyan-300">
                {personnel.wellnessScore}<span className="text-xs text-slate-500 font-normal">/100</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">7-Day Composite</p>
            </GlassCard>
          </div>

          {/* Historical Trend Chart */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">7-Day Personnel Wellbeing Trend</h3>
                <p className="text-xs text-slate-400">Tracking Stress, Fatigue, Recovery, and Workload index</p>
              </div>
              <span className="text-xs font-mono text-slate-400">Values normalized 0-100</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={personnel.historicalTrend} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0d1527', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: '#00f2fe', fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="stress" name="Stress Indicator" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="fatigue" name="Fatigue Indicator" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="recovery" name="Recovery Score" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="workload" name="Workload Load" stroke="#8b5cf6" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* AI Risk Forecast Horizon */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-1">AI Risk Forecast (Next 24h)</div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white font-mono">{personnel.forecast.next24h}</span>
                <Badge level={personnel.forecast.next24h} />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Short-term duty shift projection</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-1">AI Risk Forecast (Next 72h)</div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white font-mono">{personnel.forecast.next72h}</span>
                <Badge level={personnel.forecast.next72h} />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Anticipated cumulative strain window</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-1">AI Risk Forecast (Next 7 Days)</div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white font-mono">{personnel.forecast.next7d}</span>
                <Badge level={personnel.forecast.next7d} />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Projection post-intervention</p>
            </div>
          </div>

          {/* Contributing Factors & Recommended Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Contributing Factors */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Potential Contributing Factors
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {personnel.potentialFactors.map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-slate-500 mt-3 italic">
                * Note: Factors represent statistical correlations with shift and recovery metrics, not deterministic root causes.
              </p>
            </div>

            {/* Recommended Support Actions */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Recommended Support Actions
                  </h4>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {personnel.recommendedActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex gap-2">
                <button
                  onClick={() => onScheduleCheckIn(personnel)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Schedule Confidential Check-In
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono text-[11px]">
            Record Access: Welfare Administrator (Audit Log Ref: #SEC-9842)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
