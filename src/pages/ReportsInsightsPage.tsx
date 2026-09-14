import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  Calendar, 
  Eye, 
  TrendingUp, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  Printer,
  BarChart2
} from 'lucide-react';
import { mockReportsList } from '../data/mockAnalytics';
import { WelfareReport } from '../types';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface ReportsInsightsPageProps {
  onOpenExportModal: (report?: WelfareReport, format?: 'pdf' | 'csv') => void;
}

export const ReportsInsightsPage: React.FC<ReportsInsightsPageProps> = ({ onOpenExportModal }) => {
  const [selectedReport, setSelectedReport] = useState<WelfareReport>(mockReportsList[0]);
  const [generating, setGenerating] = useState(false);
  const [genSuccess, setGenSuccess] = useState(false);

  const handleGenerateReport = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenSuccess(true);
      setTimeout(() => setGenSuccess(false), 3500);
    }, 1200);
  };

  const chartData = [
    { name: 'Low Risk', value: selectedReport.riskBreakdown.low, fill: '#10b981' },
    { name: 'Moderate', value: selectedReport.riskBreakdown.moderate, fill: '#f59e0b' },
    { name: 'High Risk', value: selectedReport.riskBreakdown.high, fill: '#f97316' },
    { name: 'Critical', value: selectedReport.riskBreakdown.critical, fill: '#f43f5e' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-cyan-400" />
            Welfare Intelligence Reports & Dossiers
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated compliance summaries, circadian fatigue reviews, and longitudinal intervention efficacy digests.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono transition-colors disabled:opacity-50 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{generating ? 'Compiling AI Telemetry...' : 'Generate Report'}</span>
          </button>

          <button
            onClick={() => onOpenExportModal(selectedReport, 'pdf')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Active Dossier</span>
          </button>
        </div>
      </div>

      {genSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>New Welfare Intelligence Report Generated! Aggregated telemetry from all 1,248 monitored personnel synchronized.</span>
        </div>
      )}

      {/* 5 Report Cards Grid (Prompt Section 18) */}
      <div>
        <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
          Available Welfare Intelligence Dossiers (5 Editions)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {mockReportsList.map((rep) => {
            const isSelected = selectedReport.id === rep.id;

            return (
              <GlassCard
                key={rep.id}
                className={`p-5 flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected ? 'border-cyan-500/70 shadow-xl shadow-cyan-950/60 ring-1 ring-cyan-500/40' : 'hover:border-slate-700'
                }`}
                onClick={() => setSelectedReport(rep)}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-cyan-400 font-bold">{rep.id}</span>
                    <span className="text-slate-400">{rep.period}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">{rep.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{rep.summary}</p>

                  {/* Visual Analytics Preview: Cohort Distribution Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400">Wellness Index:</span>
                      <strong className="text-emerald-400">{rep.wellnessIndex}%</strong>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden flex" title="Risk cohort breakdown">
                      <div style={{ width: `${rep.riskBreakdown.low}%` }} className="bg-emerald-500 h-full" />
                      <div style={{ width: `${rep.riskBreakdown.moderate}%` }} className="bg-amber-500 h-full" />
                      <div style={{ width: `${rep.riskBreakdown.high}%` }} className="bg-orange-500 h-full" />
                      <div style={{ width: `${rep.riskBreakdown.critical}%` }} className="bg-rose-500 h-full" />
                    </div>

                    <div className="flex justify-between text-[9px] font-mono text-slate-500">
                      <span className="text-emerald-400">{rep.riskBreakdown.low}% Low</span>
                      <span className="text-amber-400">{rep.riskBreakdown.moderate}% Mod</span>
                      <span className="text-orange-400">{rep.riskBreakdown.high}% High</span>
                      <span className="text-rose-400">{rep.riskBreakdown.critical}% Crit</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons (Prompt requirement: View Report, Export PDF, Export CSV) */}
                <div className="pt-4 mt-3 border-t border-slate-800 flex items-center justify-between gap-1.5 font-mono text-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedReport(rep);
                    }}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Report</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenExportModal(rep, 'pdf');
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[11px] flex items-center gap-1 transition-colors"
                      title="Export PDF"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenExportModal(rep, 'csv');
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1 transition-colors"
                      title="Export CSV"
                    >
                      <Download className="w-3 h-3 text-slate-400" />
                      <span>CSV</span>
                    </button>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Detailed Report Preview Dossier */}
      <GlassCard className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono font-bold text-cyan-400">{selectedReport.id} • OFFICIAL DOSSIER</div>
            <h2 className="text-lg font-bold text-white mt-0.5">{selectedReport.title}</h2>
            <div className="text-xs text-slate-400 font-mono mt-1">
              Timeframe: {selectedReport.period} • Compiled {selectedReport.generatedDate}
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => onOpenExportModal(selectedReport, 'pdf')}
              className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
            <button
              onClick={() => onOpenExportModal(selectedReport, 'csv')}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        {/* Visual Analytics Preview Bar Chart */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Visual Analytics Preview: Risk Cohort Distribution
              </h4>
            </div>
            <span className="text-[11px] font-mono text-cyan-400">Total Personnel: 1,248</span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
                <Tooltip 
                  formatter={(val: any) => [`${val}%`, 'Personnel Share']}
                  contentStyle={{ backgroundColor: '#0d1527', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} 
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Executive Summary Section */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
              1. Executive Summary & Key Health Indicators
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 font-sans">
              {selectedReport.summary}
            </p>
          </div>

          {/* Risk Breakdown distribution */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
              2. Personnel Risk Classification Breakdown
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
                <span className="text-emerald-400 block text-[11px]">Low Risk</span>
                <strong className="text-lg text-white">{selectedReport.riskBreakdown.low}%</strong>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30">
                <span className="text-amber-400 block text-[11px]">Moderate</span>
                <strong className="text-lg text-white">{selectedReport.riskBreakdown.moderate}%</strong>
              </div>
              <div className="p-3 rounded-lg bg-orange-950/20 border border-orange-500/30">
                <span className="text-orange-400 block text-[11px]">High Risk</span>
                <strong className="text-lg text-white">{selectedReport.riskBreakdown.high}%</strong>
              </div>
              <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30">
                <span className="text-rose-400 block text-[11px]">Critical</span>
                <strong className="text-lg text-white">{selectedReport.riskBreakdown.critical}%</strong>
              </div>
            </div>
          </div>

          {/* Key Findings */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
              3. Telemetric Findings & Shift Velocity
            </h4>
            <div className="space-y-2">
              {selectedReport.keyFindings.map((kf, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>{kf}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Interventions */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
              4. Recommended Command Interventions
            </h4>
            <div className="space-y-2">
              {selectedReport.recommendedInterventions.map((ri, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  <span>{ri}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
