import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Clock, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend,
  AreaChart,
  Area
} from 'recharts';

export const AIRiskPage: React.FC = () => {
  const [selectedHorizon, setSelectedHorizon] = useState<'24h' | '72h' | '7d' | '14d' | '30d'>('7d');

  // Simulated risk migration over selected horizon
  const horizonProjections = [
    { time: 'Day 1', low: 75, moderate: 18, high: 6, critical: 1 },
    { time: 'Day 2', low: 74, moderate: 19, high: 6, critical: 1 },
    { time: 'Day 3', low: 72, moderate: 20, high: 7, critical: 1 },
    { time: 'Day 4', low: 70, moderate: 21, high: 7, critical: 2 },
    { time: 'Day 5', low: 73, moderate: 19, high: 6, critical: 2 },
    { time: 'Day 6', low: 76, moderate: 17, high: 6, critical: 1 },
    { time: 'Day 7', low: 78, moderate: 16, high: 5, critical: 1 }
  ];

  // SHAP Feature Importance weights
  const featureWeights = [
    { factor: 'Cumulative Shift Density (>50h)', weight: 34, color: '#f43f5e' },
    { factor: 'Rest Buffer Deficit (<7h window)', weight: 28, color: '#f59e0b' },
    { factor: 'Circadian Transition Inversion', weight: 19, color: '#06b6d4' },
    { factor: 'Consecutive High-Tempo Shifts', weight: 12, color: '#8b5cf6' },
    { factor: 'Physiological Baseline Variance', weight: 7, color: '#10b981' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <BrainCircuit className="w-6 h-6 text-cyan-400" />
            AI Predictive Risk Architecture
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Machine-learning risk forecasting horizon, SHAP contribution weights, and proactive stabilization modeling.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Predictive Horizon: {selectedHorizon.toUpperCase()}</span>
        </div>
      </div>

      {/* Model Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <span className="text-[11px] font-mono text-slate-400 uppercase block">Model Architecture</span>
          <div className="text-xl font-bold font-mono text-cyan-300 mt-1">Temporal GBD + LSTM</div>
          <span className="text-[11px] text-emerald-400 mt-1 block font-mono">Ensemble v4.2.8</span>
        </GlassCard>

        <GlassCard className="p-4">
          <span className="text-[11px] font-mono text-slate-400 uppercase block">Predictive Precision</span>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-1">94.2% AUC-ROC</div>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">Validated vs 18k shifts</span>
        </GlassCard>

        <GlassCard className="p-4">
          <span className="text-[11px] font-mono text-slate-400 uppercase block">Early Lead Latency</span>
          <div className="text-xl font-bold font-mono text-white mt-1">72 Hours Prior</div>
          <span className="text-[11px] text-cyan-400 mt-1 block font-mono">Pre-exhaustion detection</span>
        </GlassCard>

        <GlassCard className="p-4">
          <span className="text-[11px] font-mono text-slate-400 uppercase block">False Positive Bound</span>
          <div className="text-xl font-bold font-mono text-cyan-400 mt-1">&lt; 3.8%</div>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">Strict ethical calibration</span>
        </GlassCard>
      </div>

      {/* Horizon Selection & Projection Chart */}
      <GlassCard className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Projected Risk Distribution Horizon
            </h3>
            <p className="text-xs text-slate-400">Simulated progression across personnel cohorts over time</p>
          </div>

          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs font-mono">
            {(['24h', '72h', '7d', '14d', '30d'] as const).map((h) => (
              <button
                key={h}
                onClick={() => setSelectedHorizon(h)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  selectedHorizon === h
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {h.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={horizonProjections} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0d1527', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                labelStyle={{ color: '#00f2fe', fontWeight: 'bold' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Area type="monotone" dataKey="low" name="Low Risk Cohort (%)" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="moderate" name="Moderate Attention (%)" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              <Area type="monotone" dataKey="high" name="High Risk Focus (%)" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.7} />
              <Area type="monotone" dataKey="critical" name="Critical Priority (%)" stackId="1" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.8} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Feature Attribution (SHAP) + Model Confidence Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SHAP Feature Importance */}
        <GlassCard className="lg:col-span-7 p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              AI Feature Contribution Weights (SHAP)
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Relative Weight (%)</span>
          </div>

          <div className="space-y-3.5 mt-4">
            {featureWeights.map((fw, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">{fw.factor}</span>
                  <span className="text-white font-bold">{fw.weight}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${fw.weight * 2}%`, backgroundColor: fw.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 mt-5 leading-relaxed">
            * Shift density and post-duty rest intervals account for <strong>62%</strong> of the predictive risk signal. Intervening early on schedule turnaround directly dampens the cumulative risk index.
          </p>
        </GlassCard>

        {/* Ethical AI Safeguard Matrix */}
        <GlassCard className="lg:col-span-5 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Ethical Safeguards & Privacy
              </h3>
              <Badge level="Low" text="Audited" />
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-white font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Non-Punitive Design Principle
                </div>
                <p className="text-slate-400">
                  Outputs cannot be used for performance grading, disciplinary actions, or promotion evaluations.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-white font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Aggregated Grouping Threshold
                </div>
                <p className="text-slate-400">
                  Unit drill predictions are aggregated to protect individuals unless critical emergency thresholds occur.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-white font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Human-in-the-Loop Requirement
                </div>
                <p className="text-slate-400">
                  All automated suggestions require supervisory validation before any roster or schedule modifications take place.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
            Compliance: ISO/IEC 42001 AI Ethics Standard & Military Privacy Directive
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
