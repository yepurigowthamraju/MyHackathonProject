import React, { useState } from 'react';
import { X, Calendar, Clock, User, ShieldCheck, HeartHandshake, CheckCircle } from 'lucide-react';
import { PersonnelRecord } from '../../types';

interface ScheduleCheckInModalProps {
  personnel: PersonnelRecord | null;
  onClose: () => void;
  onConfirm: (data: {
    personnelId: string;
    unit: string;
    counselor: string;
    dateTime: string;
    type: string;
    notes: string;
  }) => void;
}

export const ScheduleCheckInModal: React.FC<ScheduleCheckInModalProps> = ({
  personnel,
  onClose,
  onConfirm
}) => {
  if (!personnel) return null;

  const [counselor, setCounselor] = useState('Dr. Katherine Vance (Welfare Directorate)');
  const [dateTime, setDateTime] = useState('2026-09-12T10:00');
  const [type, setType] = useState('Confidential Welfare 1-on-1');
  const [notes, setNotes] = useState('Discussion on recent workload schedule, rest optimization, and recovery buffers.');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onConfirm({
        personnelId: personnel.id,
        unit: personnel.unit,
        counselor,
        dateTime,
        type,
        notes
      });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#0d1527] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Schedule Confidential Check-In</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Check-In Scheduled Successfully</h4>
            <p className="text-xs text-slate-400">
              Confidential invitation transmitted to authorized liaison for {personnel.id} ({personnel.unit}).
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Personnel: </span>
                <strong className="text-white font-mono">{personnel.id}</strong>
                <span className="text-slate-400"> ({personnel.role} • {personnel.unit})</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Welfare Priority
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Designated Welfare Facilitator / Counselor
              </label>
              <select
                value={counselor}
                onChange={(e) => setCounselor(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Dr. Katherine Vance (Welfare Directorate)">Dr. Katherine Vance (Welfare Directorate)</option>
                <option value="Lt. Sarah Jenkins (Unit Welfare Liaison)">Lt. Sarah Jenkins (Unit Welfare Liaison)</option>
                <option value="Staff Sgt. David Ross (Peer Support Coordinator)">Staff Sgt. David Ross (Peer Support Coordinator)</option>
                <option value="External Military Family & Mental Health Service">External Mental Health Support Service</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Date & Time</label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Intervention Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Confidential Welfare 1-on-1">Confidential Welfare 1-on-1</option>
                  <option value="Recovery Schedule Optimization">Recovery Schedule Optimization</option>
                  <option value="Peer Support Connection">Peer Support Connection</option>
                  <option value="Voluntary Counseling Referral">Voluntary Counseling Referral</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Confidential Notes</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                Protected under uniformed forces welfare privacy regulations. Details are not exposed to commanding disciplinary channels.
              </span>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
              >
                Confirm & Dispatch
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
