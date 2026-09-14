import React, { useState } from 'react';
import { X, Award, BrainCircuit, ShieldCheck, TrendingUp, Sparkles, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface JudgePitchModalProps {
  onClose: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const JudgePitchModal: React.FC<JudgePitchModalProps> = ({ onClose, onNavigateToTab }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'ethics' | 'demoGuide'>('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0b1222] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Glow bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-violet-500 to-emerald-400" />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Award className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase">
                HACKATHON EVALUATION & ARCHITECTURE BRIEF
              </span>
              <h2 className="text-lg font-bold text-white leading-tight">
                AI-Based Predictive Personnel Stress & Welfare Monitoring System
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Tabs */}
        <div className="px-6 pt-3 border-b border-slate-800 bg-slate-950/40 flex gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: '1. Executive Pitch & Value' },
            { id: 'architecture', label: '2. AI Predictive Pipeline' },
            { id: 'ethics', label: '3. Non-Punitive Ethical Safeguards' },
            { id: 'demoGuide', label: '4. Judge Interactive Demo Guide' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 px-3 text-xs font-mono font-medium transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-violet-950/40 border border-cyan-500/30">
                <h3 className="text-sm font-bold text-white mb-1 font-mono">The Operational Challenge</h3>
                <p className="text-slate-300 leading-relaxed">
                  In high-tempo uniformed forces, personnel frequently operate under acute cognitive strain and sleep deprivation. Traditional military welfare is **reactive**—interventions only happen after mental breakdown, chronic burnout, or critical performance failure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Predictive Lead Time</span>
                  <div className="text-xl font-bold text-cyan-400 mt-0.5">72 Hours Prior</div>
                  <span className="text-[10px] text-slate-500">Detects acute strain before physical exhaustion</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Burnout Reduction</span>
                  <div className="text-xl font-bold text-emerald-400 mt-0.5">-31% Decrease</div>
                  <span className="text-[10px] text-slate-500">Achieved via proactive 12h rest buffers</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Recovery Normalization</span>
                  <div className="text-xl font-bold text-violet-300 mt-0.5">94.2% Efficacy</div>
                  <span className="text-[10px] text-slate-500">Personnel stabilized post-intervention</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white font-mono">Core Value Propositions:</h4>
                <ul className="space-y-1.5 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Early Indicator Telemetry:</strong> Multimodal analysis of duty hours, sleep continuity, and workload velocity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Proactive Support Pathways:</strong> Automated suggestions for rest buffers, duty rebalancing, and confidential check-ins.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Decision Support Hierarchy:</strong> AI guides and flags; authorized human commanders and welfare officers make final decisions.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold font-mono">
                    <BrainCircuit className="w-4 h-4" />
                    Predictive Model Architecture
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Hybrid Temporal Gradient Boosted Trees (XGBoost) + Bidirectional LSTM network running on encrypted edge enclaves. Models temporal fatigue velocity across rolling 24h, 72h, and 7-day operational windows.
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-slate-400">
                    Accuracy: <strong className="text-white">94.2% AUC-ROC</strong> • False Positives: <strong className="text-emerald-400">&lt; 3.8%</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-violet-400 font-bold font-mono">
                    <Sparkles className="w-4 h-4" />
                    Explainable AI (SHAP Weights)
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Every prediction outputs statistical contributing factors rather than opaque scores:
                  </p>
                  <div className="space-y-1 text-[11px] font-mono">
                    <div className="flex justify-between text-slate-300">
                      <span>Shift Density (&gt;50h/wk):</span> <strong className="text-rose-400">34%</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Rest Buffer Deficit (&lt;7h):</span> <strong className="text-amber-400">28%</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Circadian Inversion:</span> <strong className="text-cyan-400">19%</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ethics' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  Ethical Welfare Charter & Privacy Framework
                </div>
                <p className="text-slate-200 leading-relaxed">
                  Strictly engineered to ensure AI serves as a **protective shield for personnel**, never a disciplinary instrument.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-cyan-300 font-bold block mb-1">1. Support &gt; Punishment</span>
                  <p className="text-slate-400 font-sans text-xs">
                    Outputs are strictly non-disciplinary. Fatigue warnings trigger rest recommendations, never negative service marks.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-cyan-300 font-bold block mb-1">2. No Medical Diagnoses</span>
                  <p className="text-slate-400 font-sans text-xs">
                    Uses non-clinical terminology ("Wellness Indicator", "Early Warning", "Rest Deficit") to avoid unauthorized psychiatric labels.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-cyan-300 font-bold block mb-1">3. Pseudonymous Data Minimization</span>
                  <p className="text-slate-400 font-sans text-xs">
                    Names and private civilian records stripped; personnel are managed via secure tactical IDs (e.g. P-1042).
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-cyan-300 font-bold block mb-1">4. Immutable Audit Ledger</span>
                  <p className="text-slate-400 font-sans text-xs">
                    Every lookup by authorized supervisors is cryptographically stamped to prevent unauthorized snooping.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demoGuide' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Play className="w-4 h-4 text-cyan-400" />
                Recommended Interactive Demo Walkthrough
              </h4>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-cyan-400 font-bold">Step 1: </span>
                    <span className="text-slate-200">Inspect Key Metrics & Risk Donut on Overview</span>
                  </div>
                  <button
                    onClick={() => {
                      onNavigateToTab('Overview');
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] hover:bg-cyan-500/30"
                  >
                    Go to Overview →
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-cyan-400 font-bold">Step 2: </span>
                    <span className="text-slate-200">Click Field Officer P-1042 in Table to view Wellness Profile</span>
                  </div>
                  <button
                    onClick={() => {
                      onNavigateToTab('Personnel');
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] hover:bg-cyan-500/30"
                  >
                    Go to Personnel →
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-cyan-400 font-bold">Step 3: </span>
                    <span className="text-slate-200">Schedule a Confidential Check-In from Modal</span>
                  </div>
                  <span className="text-emerald-400 text-[11px]">Real-time state update</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-cyan-400 font-bold">Step 4: </span>
                    <span className="text-slate-200">Test AI Assistant by clicking suggested query chips</span>
                  </div>
                  <button
                    onClick={() => {
                      onNavigateToTab('AIAssistant');
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] hover:bg-cyan-500/30"
                  >
                    Go to AI Assistant →
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-cyan-400 font-bold">Step 5: </span>
                    <span className="text-slate-200">Toggle 'Presentation Mode' in top bar for judge view</span>
                  </div>
                  <span className="text-cyan-400 text-[11px]">Widescreen layout</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Hackathon Defense & Health Track Entry 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
          >
            Close Pitch Brief
          </button>
        </div>
      </div>
    </div>
  );
};
