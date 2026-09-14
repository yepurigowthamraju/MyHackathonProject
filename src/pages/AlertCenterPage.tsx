import React, { useEffect, useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Sparkles, 
  ShieldAlert, 
  Eye, 
  Check, 
  SearchCheck
} from 'lucide-react';
import { EarlyWarningAlert } from '../types';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';

interface AlertCenterPageProps {
  alerts: EarlyWarningAlert[];
  onSelectAlert: (alert: EarlyWarningAlert) => void;
  onUpdateAlertStatus: (alertId: string, status: EarlyWarningAlert['status']) => void;
}

export const AlertCenterPage: React.FC<AlertCenterPageProps> = ({
  alerts,
  onSelectAlert,
  onUpdateAlertStatus
}) => {
  const [filterSeverity, setFilterSeverity] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [liveAlerts, setLiveAlerts] = useState<EarlyWarningAlert[]>([]);
  useEffect(() => {
  const loadAlerts = async () => {
    try {
      const token = localStorage.getItem('welfare_token');

      if (!token) {
        return;
      }

      const response = await fetch(
        'http://localhost:3001/api/wellness/alerts',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to load wellness alerts.'
        );
      }

      setLiveAlerts(data);
    } catch (error) {
      console.error('Alerts loading error:', error);
    }
  };

  loadAlerts();
}, []);

  const filteredAlerts = liveAlerts.filter(a => {
    const matchesSeverity = 
      filterSeverity === 'All' ? true :
      filterSeverity === 'Resolved' ? a.status === 'Resolved' :
      a.severity === filterSeverity && a.status !== 'Resolved';

    const matchesSearch = 
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.affectedGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
            AI Early Warning Alert Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time automated early warning telemetry for personnel stress spikes, fatigue escalation, and recovery deficits.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <Clock className="w-3.5 h-3.5" />
          <span>Real-Time Stream Active</span>
        </div>
      </div>

      {/* Filters and Search */}
      <GlassCard className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Severity Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
           {['All', 'High', 'Moderate', 'Resolved'].map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  filterSeverity === sev
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search alert title or personnel ID..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>
      </GlassCard>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <GlassCard
            key={alert.id}
            className={`p-5 transition-all ${
              alert.severity === 'Critical' && alert.status !== 'Resolved'
                ? 'border-rose-500/30 bg-rose-950/10'
                : ''
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <Badge level={alert.severity} pulse={alert.severity === 'Critical' && alert.status !== 'Resolved'} />
                  <Badge level={alert.status} />
                  <span className="text-xs font-mono font-bold text-cyan-400">{alert.id}</span>
                  <span className="text-xs font-mono text-slate-400">• {alert.riskType}</span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1 ml-auto lg:ml-0">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {alert.timestamp}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{alert.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{alert.description}</p>

                <div className="flex items-center gap-4 text-xs font-mono pt-1 text-slate-400">
                  <span>Unit Target: <strong className="text-cyan-300">{alert.affectedGroup}</strong></span>
                  <span>•</span>
                  <span>AI Confidence: <strong className="text-emerald-400">{alert.aiConfidence}%</strong></span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-cyan-400 font-mono">Recommended Action: </span>
                  {alert.recommendedAction}
                </div>
              </div>

              {/* Action Buttons: Acknowledge, Investigate, Resolve */}
              <div className="flex lg:flex-col items-center lg:items-end justify-end gap-2 flex-shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                {alert.status === 'Active' && (
                  <button
                    onClick={() => {
  setLiveAlerts((previous) =>
    previous.map((item) =>
      item.id === alert.id
        ? { ...item, status: 'Acknowledged' }
        : item
    )
  );
}}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-mono font-semibold transition-colors flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Acknowledge</span>
                  </button>
                )}

                <button
                  onClick={() => onSelectAlert(alert)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold transition-colors flex items-center gap-1"
                >
                  <SearchCheck className="w-3.5 h-3.5" />
                  <span>Investigate</span>
                </button>

                {alert.status !== 'Resolved' && (
                  <button
                    onClick={() => {
  setLiveAlerts((previous) =>
    previous.map((item) =>
      item.id === alert.id
        ? { ...item, status: 'Resolved' }
        : item
    )
  );
}}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolve</span>
                  </button>
                )}
              </div>
            </div>
          </GlassCard>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="p-12 text-center text-slate-400 font-mono text-xs glass-panel rounded-xl">
            {liveAlerts.length === 0
  ? 'No current wellness alerts. All recorded personnel are currently within Low Risk.'
  : `No alerts found matching filter '${filterSeverity}'.`}
          </div>
        )}
      </div>
    </div>
  );
};
