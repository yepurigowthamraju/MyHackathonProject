import React, { useState } from 'react';
import { 
  Activity, 
  Filter, 
  Sparkles, 
  TrendingUp, 
  BarChart2, 
  Layers, 
  Clock, 
  Compass,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { unitComparisonData, workloadVsStressData, trendData7d } from '../data/mockAnalytics';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const StressAnalyticsPage: React.FC = () => {
  // Multi-filters required by prompt:
  const [selectedUnit, setSelectedUnit] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedRisk, setSelectedRisk] = useState('All');
  const [selectedDutyType, setSelectedDutyType] = useState('All');

  // Chart data for risk distribution
  const riskDistData = [
    { name: 'Low Risk', count: 934, color: '#10b981' },
    { name: 'Moderate Attention', count: 228, color: '#f59e0b' },
    { name: 'High Risk Focus', count: 74, color: '#f97316' },
    { name: 'Critical Immediate', count: 12, color: '#f43f5e' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-cyan-400" />
            Personnel Stress & Workload Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Deep-dive exploratory telemetry on stress dynamics, cumulative fatigue velocity, and duty hour correlations.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Telemetric Window: {selectedPeriod.toUpperCase()}</span>
        </div>
      </div>

      {/* Multi-Filters Bar */}
      <GlassCard className="p-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase font-semibold mb-3">
          <Filter className="w-3.5 h-3.5" />
          Telemetry Filters & Stratification
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Unit Filter */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1">Unit / Echelon</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Formations</option>
              <option value="Unit Alpha">Unit Alpha</option>
              <option value="Unit Bravo">Unit Bravo</option>
              <option value="Unit Charlie">Unit Charlie</option>
              <option value="Unit Delta">Unit Delta</option>
              <option value="Support Wing">Support Wing</option>
            </select>
          </div>

          {/* Role Filter */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1">Role / Function</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Roles</option>
              <option value="Field Officer">Field Officer</option>
              <option value="Technician">Technician</option>
              <option value="Officer">Command Officer</option>
              <option value="Medic">Field Medic</option>
              <option value="Logistics">Logistics Lead</option>
            </select>
          </div>

          {/* Time Period Filter */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1">Time Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Quarterly (90 Days)</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1">Risk Classification</label>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Risk Bands</option>
              <option value="Low">Low Risk Only</option>
              <option value="Moderate">Moderate Attention</option>
              <option value="High">High Risk Focus</option>
              <option value="Critical">Critical Priority</option>
            </select>
          </div>

          {/* Duty Type Filter */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1">Duty Profile</label>
            <select
              value={selectedDutyType}
              onChange={(e) => setSelectedDutyType(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Duty Profiles</option>
              <option value="Active Field">Active Field</option>
              <option value="Technical / Ops">Technical / Ops</option>
              <option value="Command & Comms">Command & Comms</option>
              <option value="Logistics & Support">Logistics & Support</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* AI Telemetric Insight Banner */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
        <div>
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase">AI Predictive Insight</div>
          <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
            “Stress indicators are highest during extended duty periods. Further review of scheduling patterns may help identify opportunities to improve recovery.”
          </p>
          <div className="flex items-center gap-4 mt-2 text-[11px] font-mono text-slate-400">
            <span>Primary Catalyst: <strong>&gt;50 Duty Hours / Week</strong></span>
            <span>•</span>
            <span>Recommended Recovery Buffer: <strong>12 Consecutive Hours</strong></span>
          </div>
        </div>
      </div>

      {/* 6 Grid Charts as requested */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Stress Trend Over Time */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">1. Stress Trend Telemetry</h3>
              <p className="text-[11px] text-slate-400">Average stress variance across monitored personnel</p>
            </div>
            <Badge level="Moderate" text="Tracking" />
          </div>
          <div className="h-56 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData7d} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" domain={[30, 80]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0d1527', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Line type="monotone" dataKey="avgStress" name="Stress Index" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Chart 2: Fatigue Trend Over Time */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">2. Fatigue Accumulation Velocity</h3>
              <p className="text-[11px] text-slate-400">Sleep deficit and cognitive fatigue velocity</p>
            </div>
            <Badge level="High" text="Elevated" />
          </div>
          <div className="h-56 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData7d} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" domain={[30, 80]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0d1527', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Line type="monotone" dataKey="fatigue" name="Fatigue Indicator" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Chart 3: Recovery Trend */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">3. Recovery Capacity Dynamics</h3>
              <p className="text-[11px] text-slate-400">Physiological recovery and resting baseline stability</p>
            </div>
            <Badge level="Low" text="Optimal >70" />
          </div>
          <div className="h-56 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData7d} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" domain={[50, 90]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0d1527', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Line type="monotone" dataKey="recovery" name="Recovery Score" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Chart 4: Workload vs Stress Correlation */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">4. Workload Hours vs Stress</h3>
              <p className="text-[11px] text-slate-400">Weekly shift hours correlated against stress output</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">r = 0.84</span>
          </div>
          <div className="h-56 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadVsStressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hours" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} unit="h" />
                <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0d1527', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="stress" name="Stress Indicator" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Chart 5: Risk Distribution */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">5. Risk Band Census</h3>
              <p className="text-[11px] text-slate-400">Headcount distribution across four risk classifications</p>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Total: 1,248</span>
          </div>
          <div className="h-56 w-full mt-3 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskDistData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={4} dataKey="count">
                  {riskDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#070b14" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val} Personnel`, 'Count']}
                  contentStyle={{ backgroundColor: '#0d1527', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Chart 6: Unit Comparison */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">6. Formation Stress Comparison</h3>
              <p className="text-[11px] text-slate-400">Comparative average stress markers by echelon</p>
            </div>
            <Badge level="Low" text="Benchmark" />
          </div>
          <div className="h-56 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={unitComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="unit" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0d1527', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="avgStress" name="Avg Stress" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avgFatigue" name="Avg Fatigue" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
