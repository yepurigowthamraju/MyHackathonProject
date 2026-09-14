import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Activity, 
  BatteryCharging, 
  Heart, 
  ArrowUpDown, 
  Sparkles,
  ShieldCheck,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { PersonnelRecord } from '../types';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';

interface PersonnelPageProps {
  personnelList: PersonnelRecord[];
  onSelectPersonnel: (personnel: PersonnelRecord) => void;
  onOpenScheduleModal: (personnel: PersonnelRecord) => void;
}

export const PersonnelPage: React.FC<PersonnelPageProps> = ({
  personnelList,
  onSelectPersonnel,
  onOpenScheduleModal
}) => {
  const [search, setSearch] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('All');
  const [selectedRisk, setSelectedRisk] = useState('All');
  const [sortBy, setSortBy] = useState<'id' | 'wellness' | 'stress' | 'fatigue'>('wellness');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filtered = personnelList.filter(p => {
    const matchesSearch = 
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase()) ||
      p.unit.toLowerCase().includes(search.toLowerCase());

    const matchesUnit = selectedUnit === 'All' || p.unit === selectedUnit;
    const matchesRisk = selectedRisk === 'All' || p.overallRisk === selectedRisk;

    return matchesSearch && matchesUnit && matchesRisk;
  }).sort((a, b) => {
    let diff = 0;
    if (sortBy === 'id') diff = a.id.localeCompare(b.id);
    if (sortBy === 'wellness') diff = a.wellnessScore - b.wellnessScore;
    if (sortBy === 'stress') diff = a.stressIndicator - b.stressIndicator;
    if (sortBy === 'fatigue') diff = a.fatigueIndicator - b.fatigueIndicator;
    return sortOrder === 'asc' ? diff : -diff;
  });

  const toggleSort = (field: 'id' | 'wellness' | 'stress' | 'fatigue') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            Personnel Welfare Directory
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Authorized oversight of uniformed personnel wellness, fatigue accumulation, and proactive support readiness.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Non-Disciplinary Welfare Records</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <GlassCard className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Personnel ID or Role..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Unit Filter */}
          <div>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Formations / Units</option>
              <option value="Unit Alpha">Unit Alpha</option>
              <option value="Unit Bravo">Unit Bravo</option>
              <option value="Unit Charlie">Unit Charlie</option>
              <option value="Unit Delta">Unit Delta</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          <div>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Risk Profiles</option>
              <option value="Low">Low Risk Only (Normal)</option>
              <option value="Moderate">Moderate Attention</option>
              <option value="High">High Risk Focus</option>
              <option value="Critical">Critical Priority</option>
            </select>
          </div>

          {/* Quick Stats pill */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300">
            <span>Showing:</span>
            <strong className="text-cyan-400 font-bold">{filtered.length} / {personnelList.length}</strong>
          </div>
        </div>
      </GlassCard>

      {/* Personnel Records Table */}
      <GlassCard className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
                <th
                  onClick={() => toggleSort('id')}
                  className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Personnel ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Unit</th>
                <th className="py-3 px-3">Role / Specialty</th>
                <th className="py-3 px-3">Duty Profile</th>
                <th
                  onClick={() => toggleSort('wellness')}
                  className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Wellness Score</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('stress')}
                  className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Stress Indicator</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('fatigue')}
                  className="py-3 px-3 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Fatigue Indicator</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Recovery</th>
                <th className="py-3 px-3">AI Risk Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => onSelectPersonnel(p)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-3 font-bold text-cyan-400 group-hover:underline">
                    {p.id}
                  </td>
                  <td className="py-3.5 px-3 text-slate-200 font-sans">{p.unit}</td>
                  <td className="py-3.5 px-3 text-slate-400 font-sans">{p.role}</td>
                  <td className="py-3.5 px-3 text-slate-400 font-sans text-[11px]">{p.dutyType}</td>
                  <td className="py-3.5 px-3 font-bold">
                    <span className={`${
                      p.wellnessScore < 50 ? 'text-rose-400' :
                      p.wellnessScore < 70 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {p.wellnessScore}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-medium">
                    <span className={`${
                      p.stressIndicator >= 80 ? 'text-rose-400 font-bold' :
                      p.stressIndicator >= 60 ? 'text-amber-400' : 'text-slate-300'
                    }`}>
                      {p.stressIndicator}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-medium">
                    <span className={`${
                      p.fatigueIndicator >= 80 ? 'text-rose-400 font-bold' :
                      p.fatigueIndicator >= 60 ? 'text-orange-400' : 'text-slate-300'
                    }`}>
                      {p.fatigueIndicator}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-emerald-400">
                    {p.recoveryScore}%
                  </td>
                  <td className="py-3.5 px-3">
                    <Badge level={p.overallRisk} pulse={p.overallRisk === 'Critical'} />
                  </td>
                  <td className="py-3.5 px-3 text-right font-sans">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onSelectPersonnel(p)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors flex items-center gap-1"
                      >
                        <span>Profile</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </button>
                      <button
                        onClick={() => onOpenScheduleModal(p)}
                        className="px-2.5 py-1 rounded bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs transition-colors"
                        title="Schedule Check-In"
                      >
                        Support
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
