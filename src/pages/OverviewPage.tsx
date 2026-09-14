import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Heart, 
  ShieldCheck, 
  AlertTriangle, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ArrowRight, 
  Download, 
  Sparkles, 
  Calendar, 
  Clock, 
  Activity, 
  BatteryCharging, 
  Info,
  CheckCircle2,
  ChevronRight,
  Filter
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { Sparkline } from '../components/common/Sparkline';
import { PersonnelRecord, EarlyWarningAlert } from '../types';

import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

interface OverviewPageProps {
  personnelList: PersonnelRecord[];
  alerts: EarlyWarningAlert[];
  onSelectPersonnel: (personnel: PersonnelRecord) => void;
  onSelectAlert: (alert: EarlyWarningAlert) => void;
  onOpenExportModal: () => void;
  onNavigate: (page: string) => void;
  onOpenScheduleModal: (personnel: PersonnelRecord) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  personnelList,
  alerts,
  onSelectPersonnel,
  onSelectAlert,
  onOpenExportModal,
  onNavigate,
  onOpenScheduleModal
}) => {
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'custom'>('week');
  const [trendTimeframe, setTrendTimeframe] = useState<'24h' | '7d' | '30d'>('7d');
  const [unitFilter, setUnitFilter] = useState<string>('All');
  const [liveAlerts, setLiveAlerts] = useState<EarlyWarningAlert[]>([]);
  const [wellnessTrends, setWellnessTrends] = useState<
  { date: string; avgStress: number; fatigue: number; recovery: number }[]
>([]);
const [wellnessPersonnel, setWellnessPersonnel] = useState<any[]>([]);
    const [analytics, setAnalytics] = useState({
    totalPersonnel: 0,
    totalRecords: 0,
    lowRisk: 0,
    moderateRisk: 0,
    highRisk: 0,
    pendingReviews: 0,
    averageStress: 0,
    averageFatigue: 0,
    averageSleep: 0,
    averageEnergy: 0,
    riskDistribution: [
      { name: 'Low Risk', value: 0, color: '#10b981' },
      { name: 'Moderate', value: 0, color: '#f59e0b' },
      { name: 'High', value: 0, color: '#f97316' },
    ],
  });
    useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const token = localStorage.getItem('welfare_token');

        if (!token) {
          return;
        }

        const response = await fetch(
          'http://localhost:3001/api/wellness/analytics',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || 'Failed to load analytics.'
          );
        }

        setAnalytics(data);
      } catch (error) {
        console.error('Analytics loading error:', error);
      }
    };

    loadAnalytics();
  }, []);
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
          data.error || 'Failed to load alerts.'
        );
      }

      setLiveAlerts(data);
    } catch (error) {
      console.error('Alerts loading error:', error);
    }
  };

  loadAlerts();
}, []);
  useEffect(() => {
  const loadWellnessTrends = async () => {
    try {
      const token = localStorage.getItem('welfare_token');

      if (!token) {
        return;
      }

      const response = await fetch(
        'http://localhost:3001/api/wellness/trends',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to load wellness trends.'
        );
      }

      setWellnessTrends(data);
    } catch (error) {
      console.error('Wellness trends loading error:', error);
    }
  };

  loadWellnessTrends();
}, []);
useEffect(() => {
  const loadWellnessPersonnel = async () => {
    try {
      const token = localStorage.getItem('welfare_token');

      if (!token) {
        return;
      }

      const response = await fetch(
        'http://localhost:3001/api/wellness/personnel',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to load personnel wellness data.'
        );
      }

      setWellnessPersonnel(data);
    } catch (error) {
      console.error('Personnel wellness loading error:', error);
    }
  };

  loadWellnessPersonnel();
}, []);

  // Trend data based on selected timeframe
  const currentTrendData = wellnessTrends.filter((item) => {
  const itemDate = new Date(item.date);
  const now = new Date();

  const daysAgo =
    trendTimeframe === '24h'
      ? 1
      : trendTimeframe === '7d'
      ? 7
      : 30;

  const startDate = new Date(now);
  startDate.setDate(now.getDate() - daysAgo);

  return itemDate >= startDate;
});

  // Donut chart data for AI Predictive Risk
    const riskDonutData = analytics.riskDistribution;

  // Filtered personnel requiring attention (Moderate, High, Critical)
  const filteredPersonnel = wellnessPersonnel.filter((p) => {
  const requiresAttention =
    p.ai_risk === 'Moderate' || p.ai_risk === 'High';

  const matchesRisk =
    unitFilter === 'All' || p.ai_risk === unitFilter;

  return requiresAttention && matchesRisk;
});

  return (
    <div className="space-y-6 pb-12">
      {/* 5. Header Bar with Date Range Selector & Export Report Button */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Personnel Welfare Intelligence
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            AI-powered predictive insights for stress, fatigue and personnel wellbeing.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Date Selector */}
          <div className="flex items-center rounded-xl bg-slate-900/80 border border-slate-800 p-1 text-xs">
            {(['today', 'week', 'month', 'custom'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 rounded-lg capitalize font-mono text-[11px] transition-colors ${
                  dateRange === range
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range === 'today' ? 'Today' : range === 'week' ? 'This Week' : range === 'month' ? 'This Month' : 'Custom Range'}
              </button>
            ))}
          </div>

          {/* Export Report Button */}
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 6. KEY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Personnel */}
        <GlassCard className="p-4" hoverEffect>
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-mono">Total Personnel</span>
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold font-mono text-white">
  {analytics.totalPersonnel}
</span>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Live
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Active monitored personnel</p>
          <div className="mt-3 flex justify-end">
            <Sparkline
  data={[
    analytics.totalPersonnel,
    analytics.totalPersonnel,
    analytics.totalPersonnel,
  ]}
  color="#06b6d4"
/>
          </div>
        </GlassCard>

        {/* Wellness Index */}
        <GlassCard className="p-4" hoverEffect>
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-mono">Wellness Index</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold font-mono text-emerald-400">
  {analytics.averageEnergy > 0
    ? Math.round((analytics.averageEnergy / 10) * 100)
    : 0}%
</span>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Live
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Based on current wellness data</p>
          <div className="mt-3 flex justify-end">
            <Sparkline data={[76, 77, 79, 80, 81, 82, 82.6]} color="#10b981" />
          </div>
        </GlassCard>

        {/* Low Risk */}
        <GlassCard className="p-4" hoverEffect>
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-mono">Low Risk</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold font-mono text-white">
  {analytics.riskDistribution.find(
    (item) => item.name === 'Low Risk'
  )?.value || 0}%
</span>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Live
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Personnel within healthy indicators</p>
          <div className="mt-3 flex justify-end">
            <Sparkline data={[71, 72, 72, 73, 74, 74.2, 74.8]} color="#10b981" />
          </div>
        </GlassCard>

        {/* Attention Required */}
        <GlassCard className="p-4" hoverEffect>
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-mono">Attention Required</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold font-mono text-amber-400">
  {(
    (analytics.moderateRisk / Math.max(analytics.totalRecords, 1)) *
    100
  ).toFixed(1)}%
</span>
            <span className="text-[11px] font-mono text-amber-400 flex items-center gap-0.5">
              <TrendingDown className="w-3 h-3" /> Live
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Showing elevated indicators</p>
          <div className="mt-3 flex justify-end">
            <Sparkline data={[21, 20.4, 19.8, 19.2, 18.9, 18.5, 18.3]} color="#f59e0b" />
          </div>
        </GlassCard>

        {/* Critical Alerts */}
        <GlassCard className="p-4 border-rose-500/30" hoverEffect glow>
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-mono">High Risk</span>
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold font-mono text-rose-400">
  {analytics.highRisk}
</span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
  High-risk records requiring welfare review
</p>
          <div className="mt-3 flex justify-end">
            <Sparkline data={[8, 8, 7, 7, 6, 6, 6]} color="#f43f5e" />
          </div>
        </GlassCard>
      </div>
      {/* REAL WELLNESS STATISTICS */}
      <GlassCard className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Live Wellness Statistics
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">
              Avg Stress
            </span>
            <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
              {analytics.averageStress}/10
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">
              Avg Fatigue
            </span>
            <div className="text-2xl font-bold text-orange-400 font-mono mt-1">
              {analytics.averageFatigue}/10
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">
              Avg Sleep
            </span>
            <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">
              {analytics.averageSleep}h
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">
              Avg Energy
            </span>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
              {analytics.averageEnergy}/10
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">
              Pending Reviews
            </span>
            <div className="text-2xl font-bold text-rose-400 font-mono mt-1">
              {analytics.pendingReviews}
            </div>
          </div>
        </div>
      </GlassCard>


      {/* 7 & 8: Top Analytics Row (AI Predictive Risk Overview + Personnel Stress Trend) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 7. AI PREDICTIVE RISK OVERVIEW (5 cols) */}
        <GlassCard className="lg:col-span-5 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  AI Predictive Risk Overview
                </h3>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                Model v4.2
              </span>
            </div>

            {/* Donut & Stats Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mt-4">
              {/* Radial / Donut Chart */}
              <div className="h-44 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDonutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={46}
                      outerRadius={68}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {riskDonutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#070b14" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [`${val}%`, 'Personnel']}
                      contentStyle={{ backgroundColor: '#0d1527', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold font-mono text-white">
  {analytics.riskDistribution.find(
    (item) => item.name === 'Low Risk'
  )?.value || 0}%
</span>
                  <span className="text-[10px] uppercase font-mono text-emerald-400">Low Risk</span>
                </div>
              </div>

              {/* Percentage Badges */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> LOW RISK
                  </span>
                  <span className="font-bold text-white">
  {analytics.riskDistribution.find(
    (item) => item.name === 'Low Risk'
  )?.value || 0}%
</span>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" /> MODERATE
                  </span>
                  <span className="font-bold text-white">
  {analytics.riskDistribution.find(
    (item) => item.name === 'Moderate'
  )?.value || 0}%
</span>
                </div>

                <div className="flex items-center justify-between p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <span className="text-orange-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-400" /> HIGH
                  </span>
                  <span className="font-bold text-white">
  {analytics.riskDistribution.find(
    (item) => item.name === 'High'
  )?.value || 0}%
</span>
                </div>

                
              </div>
            </div>

            {/* Model Metadata Details */}
            <div className="mt-5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block">AI Confidence</span>
                <strong className="text-cyan-400 text-sm">
  Live Data
</strong>
              </div>
              <div className="border-x border-slate-800">
                <span className="text-[10px] text-slate-400 block">Horizon</span>
                <strong className="text-white text-sm">Next 7 Days</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Model Sync</span>
               <strong className="text-slate-300 text-xs">
  Current Database
</strong>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => onNavigate('AIRisk')}
              className="text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <span>View AI Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </GlassCard>

        {/* 8. STRESS TREND ANALYTICS (7 cols) */}
        <GlassCard className="lg:col-span-7 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Personnel Stress Trend
                </h3>
                <p className="text-xs text-slate-400">Aggregated Stress, Fatigue, and Recovery dynamics</p>
              </div>

              {/* Timeframe Toggles */}
              <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs font-mono">
                {(['24h', '7d', '30d'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTrendTimeframe(t)}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      trendTimeframe === t
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t === '24h' ? 'Last 24 Hours' : t === '7d' ? '7 Days' : '30 Days'}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Chart */}
            <div className="h-52 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis
  stroke="#64748b"
  domain={[0, 10]}
  tick={{ fill: '#94a3b8', fontSize: 11 }}
/>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0d1527', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                    labelStyle={{ color: '#00f2fe', fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                  <Line type="monotone" dataKey="avgStress" name="Average Stress Indicator" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="fatigue" name="Fatigue Indicator" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="recovery" name="Recovery Indicator" stroke="#10b981" strokeWidth={2.5} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* AI Insight Box */}
            <div className="mt-4 p-3 rounded-xl bg-slate-900/70 border border-cyan-500/20 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase">AI Insight</div>
                  <p className="text-xs text-slate-300 mt-0.5">
  Current trend is calculated from recorded wellness check-ins.
  Review the chart for changes in stress, fatigue and recovery indicators.
</p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('StressAnalytics')}
                className="text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 whitespace-nowrap flex items-center gap-1 transition-colors flex-shrink-0 mt-1"
              >
                <span>View Contributing Factors</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* 9. FATIGUE MONITORING SECTION */}
      <GlassCard className="p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BatteryCharging className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Fatigue Monitoring & Recovery Forecast
            </h3>
          </div>
          <button
            onClick={() => onNavigate('FatigueMonitoring')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Review Fatigue Risks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 items-center">
          {/* Horizontal Progress Bars: Low, Moderate, High, Critical */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              Fatigue Risk Distribution
            </div>

            {/* Low: 68% */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-emerald-400">Low (Baseline Recovery)</span>
                <span className="text-white font-bold">
  {analytics.averageFatigue <= 3 ? 100 : analytics.averageFatigue <= 6 ? 50 : 0}%
</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{
  width: `${analytics.averageFatigue <= 3 ? 100 : analytics.averageFatigue <= 6 ? 50 : 0}%`,
}}/>
              </div>
            </div>

            {/* Moderate: 21% */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-amber-400">Moderate (Fatigue Buffer Strain)</span>
                <span className="text-white font-bold">
  {analytics.averageFatigue > 3 && analytics.averageFatigue <= 6 ? 100 : 0}%
</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full transition-all duration-700" style={{
  width: `${analytics.averageFatigue > 3 && analytics.averageFatigue <= 6 ? 100 : 0}%`,
}} />
              </div>
            </div>

            {/* High: 8% */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-orange-400">High (Acute Sleep Deficit)</span>
                <span className="text-white font-bold">
  {analytics.averageFatigue > 6 ? 100 : 0}%
</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full transition-all duration-700" style={{
  width: `${analytics.averageFatigue > 6 ? 100 : 0}%`,
}} />
              </div>
            </div>

            {/* Critical: 3% */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-rose-400">Critical (Exhaustion Threshold)</span>
                <span className="text-white font-bold">
  {analytics.averageFatigue > 8 ? 100 : 0}%
</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full transition-all duration-700" style={{
  width: `${analytics.averageFatigue > 8 ? 100 : 0}%`,
}} />
              </div>
            </div>
          </div>

          {/* Metric Callouts & AI Prediction */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Average Recovery Score</span>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">
  {Math.round((analytics.averageEnergy / 10) * 100)}%
</div>
              <span className="text-[10px] text-slate-500">Target baseline: &gt;70%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Reduced Recovery Roster</span>
              <div className="text-2xl font-bold font-mono text-amber-400 mt-0.5">
  {analytics.pendingReviews}
</div>
              <span className="text-[10px] text-slate-500">Shift adjust queued</span>
            </div>

            <div className="col-span-2 p-3 rounded-xl bg-violet-950/25 border border-violet-500/30 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-[10px] font-mono font-bold text-violet-300 uppercase">AI Fatigue Projection</div>
               <p className="text-xs text-slate-200 mt-0.5">
  Current average fatigue level is {analytics.averageFatigue}/10.
  Continue monitoring personnel with elevated fatigue indicators.
</p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* 10. PERSONNEL RISK TABLE: "Personnel Requiring Attention" */}
      <GlassCard className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              Personnel Requiring Attention
            </h3>
            <p className="text-xs text-slate-400">Non-punitive decision support roster for authorized welfare review</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Unit Filter */}
            <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <select
  value={unitFilter}
  onChange={(e) => setUnitFilter(e.target.value)}
  className="bg-slate-900 border border-slate-700/80 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
>
  <option value="All">All Risk Levels</option>
  <option value="High">High Risk</option>
  <option value="Moderate">Moderate Risk</option>
</select>
            </div>

            <button
              onClick={() => onNavigate('Personnel')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              View Full Directory →
            </button>
          </div>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
                <th className="py-2.5 px-3">Personnel ID</th>
                <th className="py-2.5 px-3">Data Type</th>
<th className="py-2.5 px-3">Personnel Type</th>
                <th className="py-2.5 px-3">Wellness Score</th>
                <th className="py-2.5 px-3">Stress Risk</th>
                <th className="py-2.5 px-3">Fatigue Risk</th>
                <th className="py-2.5 px-3 text-center">Trend</th>
                <th className="py-2.5 px-3">AI Confidence</th>
                <th className="py-2.5 px-3">Last Check-in</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {wellnessPersonnel.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => {
  const originalPersonnel = personnelList.find(
    (person) => person.id === p.personnel_id
  );

  if (originalPersonnel) {
    onSelectPersonnel(originalPersonnel);
  }
}}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-3 font-bold text-cyan-400 group-hover:underline">
                    {p.id}
                  </td>
                 <td className="py-3 px-3 text-slate-400 font-sans">
  Wellness Record
</td>
                  <td className="py-3 px-3 text-slate-400 font-sans">
  Personnel
</td>
                  <td className="py-3 px-3 font-bold">
                    <span className={`${
  p.average_energy < 4 ? 'text-rose-400' :
  p.average_energy < 7 ? 'text-amber-400' : 'text-emerald-400'
}`}>
  {Math.round((p.average_energy / 10) * 100)}/100
</span>
                  </td>
                  <td className="py-3 px-3">
                    <Badge
  level={
    p.average_stress >= 7
      ? 'High'
      : p.average_stress >= 4
      ? 'Moderate'
      : 'Low'
  }
/>
                  </td>
                  <td className="py-3 px-3">
                    <Badge
  level={
    p.average_fatigue >= 7
      ? 'High'
      : p.average_fatigue >= 4
      ? 'Moderate'
      : 'Low'
  }
/>
                  </td>
                  <td className="py-3 px-3 text-center">
                   {p.average_stress >= 7 ? (
  <span className="inline-flex items-center text-rose-400 font-bold">↑</span>
) : p.average_stress <= 3 ? (
  <span className="inline-flex items-center text-emerald-400 font-bold">↓</span>
) : (
  <span className="inline-flex items-center text-slate-400 font-bold">→</span>
)}
                  </td>
                  <td className="py-3 px-3 text-slate-300">
  {p.ai_confidence ?? 0}%
</td>
                  <td className="py-3 px-3 text-slate-400 font-sans">
  {p.last_check_in
    ? new Date(p.last_check_in).toLocaleDateString()
    : 'No check-in'}
</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
  e.stopPropagation();

  const originalPersonnel = personnelList.find(
    (person) => person.id === p.personnel_id
  );

  if (originalPersonnel) {
    onSelectPersonnel(originalPersonnel);
  }
}}
                      className="px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-sans transition-colors"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* 11 & 12: Bottom Row (AI Early Warning Center + AI Recommended Interventions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 11. AI EARLY WARNING CENTER (7 cols) */}
        <GlassCard className="lg:col-span-7 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  AI Early Warning Center
                </h3>
              </div>
              <button
                onClick={() => onNavigate('Alerts')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300"
              >
                All Alerts ({liveAlerts.length}) →
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {liveAlerts.length === 0 && (
  <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
    <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />

    <p className="text-sm font-semibold text-emerald-300">
      No current wellness alerts
    </p>

    <p className="text-xs text-slate-400 mt-1">
      Current wellness records do not contain Moderate or High risk indicators.
    </p>
  </div>
)}
              {liveAlerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => onSelectAlert(alert)}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all space-y-1.5 group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Badge level={alert.severity} pulse={alert.severity === 'Critical'} />
                      <span className="font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {alert.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{alert.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{alert.description}</p>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-cyan-400 font-mono">
                      Target: {alert.affectedGroup}
                    </span>
                    <span className="text-xs font-medium text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View details →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* 12. AI RECOMMENDED INTERVENTIONS (5 cols) */}
        <GlassCard className="lg:col-span-5 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  AI Recommended Interventions
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Proactive Support</span>
            </div>

            <div className="space-y-3 mt-4">
              {/* Card 1: Recovery Optimization */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono">Recovery Optimization</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Duty Roster</span>
                </div>
                <p className="text-xs text-slate-300">
                  “Consider reviewing workload distribution and recovery periods for selected personnel.”
                </p>
                <button
                  onClick={() => onNavigate('InterventionCenter')}
                  className="w-full py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors"
                >
                  Review Recommendation
                </button>
              </div>

              {/* Card 2: Welfare Check-In */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono">Welfare Check-In</span>
                  <span className="text-[10px] text-amber-400 font-mono">Confidential</span>
                </div>
                <p className="text-xs text-slate-300">
                  “Schedule a confidential welfare check-in for personnel showing persistent elevated indicators.”
                </p>
                <button
                  onClick={() => {
                    const topTarget = personnelList.find(p => p.id === 'P-1042') || personnelList[0];
                    onOpenScheduleModal(topTarget);
                  }}
                  className="w-full py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                >
                  Schedule Check-In
                </button>
              </div>

              {/* Card 3: Workload Review */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono">Workload Review</span>
                  <span className="text-[10px] text-violet-400 font-mono">Correlation</span>
                </div>
                <p className="text-xs text-slate-300">
                  “AI detected a possible correlation between extended duty periods and increased fatigue indicators.”
                </p>
                <button
                  onClick={() => onNavigate('StressAnalytics')}
                  className="w-full py-1.5 rounded-lg bg-violet-500/15 hover:bg-violet-500/25 text-violet-300 border border-violet-500/30 text-xs font-semibold transition-colors"
                >
                  Analyze Workload
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 italic">
            * Note: Recommendations are decision-support aids designed for voluntary, confidential welfare planning.
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
