import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2, Shield, BrainCircuit, Activity, Clock, UserCheck } from 'lucide-react';
import { EarlyWarningAlert } from '../../types';
import { Badge } from '../common/Badge';

interface AlertInvestigateModalProps {
  alert: EarlyWarningAlert | null;
  onClose: () => void;
  onUpdateStatus: (alertId: string, newStatus: EarlyWarningAlert['status']) => void;
}

export const AlertInvestigateModal: React.FC<AlertInvestigateModalProps> = ({
  alert,
  onClose,
  onUpdateStatus
}) => {
  if (!alert) return null;

  const [notes, setNotes] = useState('');

  const handleAcknowledge = () => {
    onUpdateStatus(alert.id, 'Acknowledged');
    onClose();
  };

  const handleInvestigate = () => {
    onUpdateStatus(alert.id, 'Under Investigation');
    onClose();
  };

  const handleResolve = () => {
    onUpdateStatus(alert.id, 'Resolved');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#0b1222] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className={`w-5 h-5 ${
              alert.severity === 'Critical' ? 'text-rose-400' : 'text-amber-400'
            }`} />
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400">ALERT DOSSIER • {alert.id}</span>
              <h3 className="text-sm font-bold text-white leading-tight">{alert.title}</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge level={alert.severity} pulse={alert.severity === 'Critical'} />
              <Badge level={alert.status} />
            </div>
            <span className="text-slate-400 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {alert.timestamp}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="text-slate-400">Affected Target Group:</div>
            <div className="text-sm font-semibold text-white font-mono">{alert.affectedGroup}</div>
            <div className="text-slate-300 pt-1 leading-relaxed">{alert.description}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1">Risk Category</div>
              <div className="font-semibold text-slate-200">{alert.riskType}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1">AI Predictive Confidence</div>
              <div className="font-semibold text-cyan-400 font-mono">{alert.aiConfidence}% Probability</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
            <div className="flex items-center gap-2 text-cyan-300 font-bold mb-1.5">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              Recommended Welfare Action
            </div>
            <p className="text-slate-200 leading-relaxed">{alert.recommendedAction}</p>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Supervisor Triage Log / Action Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Discussed with detachment commander; rest rotation in effect..."
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs"
            >
              Cancel
            </button>

            <div className="flex items-center gap-2">
              {alert.status !== 'Acknowledged' && alert.status !== 'Resolved' && (
                <button
                  onClick={handleAcknowledge}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs transition-colors"
                >
                  Acknowledge Alert
                </button>
              )}

              {alert.status !== 'Under Investigation' && alert.status !== 'Resolved' && (
                <button
                  onClick={handleInvestigate}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs transition-colors"
                >
                  Mark Under Investigation
                </button>
              )}

              {alert.status !== 'Resolved' && (
                <button
                  onClick={handleResolve}
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20"
                >
                  Mark As Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
