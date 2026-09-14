import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle, Loader2, Share2, Printer } from 'lucide-react';
import { WelfareReport } from '../../types';

interface ExportReportModalProps {
  report?: WelfareReport | null;
  initialFormat?: 'pdf' | 'csv';
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ 
  report, 
  initialFormat = 'pdf',
  onClose 
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [format, setFormat] = useState<'pdf' | 'csv'>(initialFormat);

  const defaultReport: WelfareReport = {
    id: 'REP-2026-CURRENT',
    title: 'Personnel Welfare Intelligence Executive Summary',
    period: 'Current Operational Period (Last 7 Days)',
    generatedDate: 'Today, Live Snapshot',
    summary: 'Executive overview of active stress velocity, recovery indicators, and early intervention compliance across monitored personnel (1,248 active).',
    wellnessIndex: 82.6,
    riskBreakdown: { low: 74.8, moderate: 18.3, high: 5.9, critical: 1.0 },
    keyFindings: [
      '74.8% of personnel operate in stable low-risk recovery equilibrium.',
      '18.3% show moderate fatigue accumulation requiring watch cycle adjustment.',
      '6 critical personnel triaged for immediate supervisor rest authorization.',
      'Intervention efficacy tracking at 94.2% normalization within 72 hours.'
    ],
    recommendedInterventions: [
      'Continue mandatory 12-hour rest buffer enforcement.',
      'Review Unit Charlie operational pacing for secondary relief.'
    ]
  };

  const activeReport = report || defaultReport;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      // Create a lightweight mock file download
      const content = format === 'pdf'
        ? `WELFARE INTELLIGENCE PLATFORM - EXECUTIVE REPORT\n${activeReport.title}\nPeriod: ${activeReport.period}\nWellness Index: ${activeReport.wellnessIndex}%\n\nKey Findings:\n- ` + activeReport.keyFindings.join('\n- ')
        : `ReportID,Title,Period,WellnessIndex,LowRisk,ModerateRisk,HighRisk,CriticalRisk\n${activeReport.id},"${activeReport.title}","${activeReport.period}",${activeReport.wellnessIndex},${activeReport.riskBreakdown.low},${activeReport.riskBreakdown.moderate},${activeReport.riskBreakdown.high},${activeReport.riskBreakdown.critical}`;

      const blob = new Blob([content], { type: format === 'pdf' ? 'application/pdf' : 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeReport.id}_Export.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloading(false);
      setDownloadComplete(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#0b1222] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Export Intelligence Report</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-bold">{activeReport.id}</div>
            <h4 className="text-sm font-bold text-white">{activeReport.title}</h4>
            <p className="text-xs text-slate-400">{activeReport.period} • Generated {activeReport.generatedDate}</p>
            <p className="text-xs text-slate-300 pt-1">{activeReport.summary}</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 block">Export Format</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-medium transition-all ${
                  format === 'pdf'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Executive PDF Dossier</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-medium transition-all ${
                  format === 'csv'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Raw Analytics CSV Data</span>
              </button>
            </div>
          </div>

          {downloadComplete && (
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>Report exported successfully! Check your browser downloads.</span>
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              disabled={downloading}
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Dossier...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download {format.toUpperCase()}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
