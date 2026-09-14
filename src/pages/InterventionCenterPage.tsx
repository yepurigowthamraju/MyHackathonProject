import React, { useState } from 'react';
import { 
  LifeBuoy, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  UserCheck, 
  Filter, 
  Sparkles, 
  ArrowRight,
  Plus,
  TrendingUp,
  History
} from 'lucide-react';
import { WelfareIntervention, PersonnelRecord } from '../types';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';

interface InterventionCenterPageProps {
  interventions: WelfareIntervention[];
  onUpdateStatus: (id: string, newStatus: WelfareIntervention['status']) => void;
  onOpenNewIntervention?: () => void;
  personnelList: PersonnelRecord[];
  onSelectPersonnel: (personnel: PersonnelRecord) => void;
}

export const InterventionCenterPage: React.FC<InterventionCenterPageProps> = ({
  interventions,
  onUpdateStatus,
  onOpenNewIntervention,
  personnelList,
  onSelectPersonnel
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Recommended' | 'Scheduled' | 'In Progress' | 'Completed'>('All');

  const filtered = interventions.filter(item => {
    if (activeTab === 'All') return true;
    return item.status === activeTab;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <LifeBuoy className="w-6 h-6 text-cyan-400" />
            Intervention Management Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tracking proactive rest buffers, confidential 1-on-1 check-ins, and workload rebalancing workflows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>94.2% Post-Intervention Recovery Efficacy</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <GlassCard className="p-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {(['All', 'Recommended', 'Scheduled', 'In Progress', 'Completed'] as const).map((tab) => {
            const count = interventions.filter(i => tab === 'All' ? true : i.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === tab
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 shadow-md shadow-cyan-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span>{tab}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </GlassCard>

      {/* Interventions Table */}
      <GlassCard className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
                <th className="py-3 px-3">Personnel / Group</th>
                <th className="py-3 px-3">Formation</th>
                <th className="py-3 px-3">Risk Level</th>
                <th className="py-3 px-3">Welfare Recommendation</th>
                <th className="py-3 px-3">Assigned Facilitator</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Date / Time</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-white font-mono">
                    {item.personnelOrGroup}
                  </td>
                  <td className="py-3.5 px-3 text-slate-300 font-sans">{item.unit}</td>
                  <td className="py-3.5 px-3">
                    <Badge level={item.riskLevel} />
                  </td>
                  <td className="py-3.5 px-3 max-w-xs font-sans text-slate-300">
                    <span className="font-semibold text-white block text-xs mb-0.5">{item.title}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-1">{item.recommendation}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-300 font-sans text-[11px]">
                    {item.assignedTo}
                  </td>
                  <td className="py-3.5 px-3">
                    <Badge
                      level={
                        item.status === 'Completed' ? 'Resolved' :
                        item.status === 'In Progress' ? 'Under Investigation' :
                        item.status === 'Scheduled' ? 'Acknowledged' : 'Info'
                      }
                      text={item.status}
                    />
                  </td>
                  <td className="py-3.5 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="py-3.5 px-3 text-right font-sans">
                    <div className="flex items-center justify-end gap-1.5">
                      {item.status === 'Recommended' && (
                        <button
                          onClick={() => onUpdateStatus(item.id, 'Scheduled')}
                          className="px-2.5 py-1 rounded bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium transition-colors"
                        >
                          Schedule
                        </button>
                      )}

                      {item.status === 'Scheduled' && (
                        <button
                          onClick={() => onUpdateStatus(item.id, 'In Progress')}
                          className="px-2.5 py-1 rounded bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-mono font-medium transition-colors"
                        >
                          Commence
                        </button>
                      )}

                      {item.status === 'In Progress' && (
                        <button
                          onClick={() => onUpdateStatus(item.id, 'Completed')}
                          className="px-2.5 py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-medium transition-colors"
                        >
                          Complete
                        </button>
                      )}

                      {item.status === 'Completed' && (
                        <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Done
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Intervention Timeline (Prompt requirement) */}
      <GlassCard className="p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Welfare Intervention Lifecycle Timeline
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Sequential Audit Trail</span>
        </div>

        <div className="relative pl-6 space-y-6 mt-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
          {interventions.map((item, idx) => (
            <div key={item.id} className="relative group">
              {/* Dot indicator */}
              <div className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full ring-4 ring-[#0d1527] ${
                item.status === 'Completed' ? 'bg-emerald-400' :
                item.status === 'In Progress' ? 'bg-amber-400 animate-pulse' :
                item.status === 'Scheduled' ? 'bg-cyan-400' : 'bg-slate-500'
              }`} />

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 group-hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-white">{item.title}</span>
                  <span className="text-slate-400">{item.date}</span>
                </div>
                <div className="text-xs text-cyan-400 font-mono mt-0.5">
                  Target: {item.personnelOrGroup} • {item.unit}
                </div>
                <p className="text-xs text-slate-300 mt-1">{item.recommendation}</p>
                {item.notes && (
                  <div className="mt-2 text-[11px] text-slate-400 font-sans italic">
                    Note: "{item.notes}"
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
