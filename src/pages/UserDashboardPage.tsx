import React, { useMemo, useState } from 'react';
import { API_BASE_URL } from '../config/api';
import {
  Activity,
  BrainCircuit,
  HeartHandshake,
  Moon,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Droplets,
  Utensils,
  Dumbbell,
  Smile,
  LogOut,
  Send,
  Bot,
} from 'lucide-react';

import { UserProfile, WellnessUpdate } from '../types';

import UserAIAssistantPage from './UserAIAssistantPage';
interface UserDashboardPageProps {
  currentUser: UserProfile;
  wellnessUpdates: WellnessUpdate[];
  onSubmitWellnessUpdate: (update: WellnessUpdate) => void;
  onLogout: () => void;
}

export function UserDashboardPage({
  currentUser,
  wellnessUpdates,
  onSubmitWellnessUpdate,
  onLogout,
}: UserDashboardPageProps) {

  const [form, setForm] = useState({
    bodyWeight: '',
    waterIntake: '',
    meals: '',
    sleepHours: '',
    sleepQuality: 'Good' as WellnessUpdate['sleepQuality'],
    exercise: '',
    stressLevel: 5,
    fatigueLevel: 5,
    mood: 'Good' as WellnessUpdate['mood'],
    energyLevel: 5,
    restRecovery: '',
    notes: '',
  });

  const [selectedMood, setSelectedMood] = useState('');
  const [showAIAssistant, setShowAIAssistant] =
  useState(false);

  const latestUpdate = wellnessUpdates.find(
    (item) => item.personnelId === currentUser.id
  );

  const wellnessScore = useMemo(() => {
    if (!latestUpdate) return 82;

    const stressScore = 100 - latestUpdate.stressLevel * 10;
    const fatigueScore = 100 - latestUpdate.fatigueLevel * 10;
    const energyScore = latestUpdate.energyLevel * 10;

    return Math.max(
      0,
      Math.min(
        100,
        Math.round((stressScore + fatigueScore + energyScore) / 3)
      )
    );
  }, [latestUpdate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const update: WellnessUpdate = {
      id: `WU-${Date.now()}`,
      personnelId: currentUser.id,
      date: new Date().toISOString(),

      bodyWeight: form.bodyWeight
        ? Number(form.bodyWeight)
        : undefined,

      waterIntake: form.waterIntake
        ? Number(form.waterIntake)
        : undefined,

      meals: form.meals,

      sleepHours: Number(form.sleepHours) || 0,
      sleepQuality: form.sleepQuality,

      exercise: form.exercise,

      stressLevel: form.stressLevel,
      fatigueLevel: form.fatigueLevel,

      mood: form.mood,
      energyLevel: form.energyLevel,

      restRecovery: form.restRecovery,
      notes: form.notes,

      // AI prediction is initially generated as a decision-support result.
      // Human verification remains pending.
      aiRisk:
        form.stressLevel >= 8 || form.fatigueLevel >= 8
          ? 'High'
          : form.stressLevel >= 6 || form.fatigueLevel >= 6
          ? 'Moderate'
          : 'Low',

      aiConfidence: 80,

      humanVerification: 'Pending',
      notificationStatus: 'Not Sent',
    };

    try {
  const token = localStorage.getItem('welfare_token');

  if (!token) {
    throw new Error('Your login session has expired. Please log in again.');
  }

  const response = await fetch(
    `${API_BASE_URL}/api/wellness`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(update),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || 'Failed to save wellness update.'
    );
  }

  onSubmitWellnessUpdate(update);
} catch (error) {
  alert(
    error instanceof Error
      ? error.message
      : 'Failed to save wellness update.'
  );

  return;
}

    setSelectedMood(form.mood);

    setForm({
      bodyWeight: '',
      waterIntake: '',
      meals: '',
      sleepHours: '',
      sleepQuality: 'Good',
      exercise: '',
      stressLevel: 5,
      fatigueLevel: 5,
      mood: 'Good',
      energyLevel: 5,
      restRecovery: '',
      notes: '',
    });
  };

  const updateField = (
    field: keyof typeof form,
    value: string | number
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  if (showAIAssistant) {
  return (
    <UserAIAssistantPage
      currentUserName={currentUser.name}
      onBack={() => setShowAIAssistant(false)}
    />
  );
}
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-6 md:p-8">

      {/* HEADER */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Personal Welfare Portal
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Welcome, {currentUser.name}
          </h1>

          <p className="text-slate-400 mt-2">
            {currentUser.id} • {currentUser.unit}
          </p>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:border-rose-500/50 hover:text-rose-300 transition text-sm"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>

      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Wellness Score</span>
            <HeartHandshake className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="text-3xl font-bold mt-3">
            {wellnessScore}
          </div>

          <div className="text-xs text-emerald-400 mt-1">
            Supportive wellness indicator
          </div>
        </div>

        <div className="rounded-2xl border border-violet-500/20 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Stress Level</span>
            <Activity className="w-5 h-5 text-violet-400" />
          </div>

          <div className="text-3xl font-bold mt-3">
            {latestUpdate
              ? `${latestUpdate.stressLevel}/10`
              : 'Not Recorded'}
          </div>

          <div className="text-xs text-slate-400 mt-1">
            Latest submitted value
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Recovery</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="text-3xl font-bold mt-3">
            {latestUpdate ? latestUpdate.sleepQuality : 'Good'}
          </div>

          <div className="text-xs text-emerald-400 mt-1">
            Latest recovery indicator
          </div>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Sleep</span>
            <Moon className="w-5 h-5 text-amber-400" />
          </div>

          <div className="text-3xl font-bold mt-3">
            {latestUpdate
              ? `${latestUpdate.sleepHours}h`
              : 'Not Recorded'}
          </div>

          <div className="text-xs text-slate-400 mt-1">
            Latest recorded sleep
          </div>
        </div>

      </div>

      {/* DAILY WELLNESS UPDATE */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6 mb-6"
      >

        <div className="flex items-center gap-3 mb-6">

          <div className="p-2 rounded-lg bg-cyan-500/10">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
          </div>

          <div>
            <h2 className="font-bold text-white text-lg">
              Daily Wellness Update
            </h2>

            <p className="text-xs text-slate-500">
              Submit today's personal wellness information
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* WEIGHT */}
          <div>
            <label className="text-xs text-slate-400 block mb-2">
              Body Weight (kg)
            </label>

            <input
              type="number"
              step="0.1"
              value={form.bodyWeight}
              onChange={(e) =>
                updateField('bodyWeight', e.target.value)
              }
              placeholder="Optional"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 outline-none focus:border-cyan-500"
            />
          </div>

          {/* WATER */}
          <div>
            <label className="text-xs text-slate-400 block mb-2">
              Water Intake (litres)
            </label>

            <div className="relative">
              <Droplets className="absolute left-3 top-3.5 w-4 h-4 text-cyan-400" />

              <input
                type="number"
                step="0.1"
                value={form.waterIntake}
                onChange={(e) =>
                  updateField('waterIntake', e.target.value)
                }
                placeholder="e.g. 2.5"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 pl-10 pr-4 py-3 outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* MEALS */}
          <div className="md:col-span-2">
            <label className="text-xs text-slate-400 block mb-2">
              Meals / Food
            </label>

            <div className="relative">
              <Utensils className="absolute left-3 top-3.5 w-4 h-4 text-emerald-400" />

              <textarea
                value={form.meals}
                onChange={(e) =>
                  updateField('meals', e.target.value)
                }
                placeholder="Briefly record your meals today"
                rows={3}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 pl-10 pr-4 py-3 outline-none focus:border-cyan-500 resize-none"
              />
            </div>
          </div>

          {/* SLEEP */}
          <div>
            <label className="text-xs text-slate-400 block mb-2">
              Sleep Duration (hours)
            </label>

            <input
              type="number"
              step="0.1"
              min="0"
              max="24"
              value={form.sleepHours}
              onChange={(e) =>
                updateField('sleepHours', e.target.value)
              }
              placeholder="e.g. 7.5"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 outline-none focus:border-cyan-500"
              required
            />
          </div>

          {/* SLEEP QUALITY */}
          <div>
            <label className="text-xs text-slate-400 block mb-2">
              Sleep Quality
            </label>

            <select
              value={form.sleepQuality}
              onChange={(e) =>
                updateField('sleepQuality', e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 outline-none focus:border-cyan-500"
            >
              <option>Poor</option>
              <option>Fair</option>
              <option>Good</option>
              <option>Excellent</option>
            </select>
          </div>

          {/* EXERCISE */}
          <div className="md:col-span-2">
            <label className="text-xs text-slate-400 block mb-2">
              Exercise / Physical Activity
            </label>

            <div className="relative">
              <Dumbbell className="absolute left-3 top-3.5 w-4 h-4 text-violet-400" />

              <input
                value={form.exercise}
                onChange={(e) =>
                  updateField('exercise', e.target.value)
                }
                placeholder="Example: Walking 30 min, gym, sports, rest day"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 pl-10 pr-4 py-3 outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* STRESS */}
          <div>
            <label className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Stress Level</span>
              <span className="text-violet-400 font-bold">
                {form.stressLevel}/10
              </span>
            </label>

            <input
              type="range"
              min="1"
              max="10"
              value={form.stressLevel}
              onChange={(e) =>
                updateField('stressLevel', Number(e.target.value))
              }
              className="w-full accent-violet-500"
            />
          </div>

          {/* FATIGUE */}
          <div>
            <label className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Fatigue Level</span>
              <span className="text-amber-400 font-bold">
                {form.fatigueLevel}/10
              </span>
            </label>

            <input
              type="range"
              min="1"
              max="10"
              value={form.fatigueLevel}
              onChange={(e) =>
                updateField('fatigueLevel', Number(e.target.value))
              }
              className="w-full accent-amber-500"
            />
          </div>

          {/* MOOD */}
          <div>
            <label className="text-xs text-slate-400 block mb-2">
              Mood
            </label>

            <div className="grid grid-cols-2 gap-2">
              {['Excellent', 'Good', 'Okay', 'Low'].map((mood) => (
                <button
                  type="button"
                  key={mood}
                  onClick={() => {
                    updateField('mood', mood);
                    setSelectedMood(mood);
                  }}
                  className={`rounded-xl border px-3 py-2 text-sm transition ${
                    form.mood === mood || selectedMood === mood
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                      : 'border-slate-700 text-slate-400 hover:border-cyan-500/40'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* ENERGY */}
          <div>
            <label className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Energy Level</span>
              <span className="text-emerald-400 font-bold">
                {form.energyLevel}/10
              </span>
            </label>

            <input
              type="range"
              min="1"
              max="10"
              value={form.energyLevel}
              onChange={(e) =>
                updateField('energyLevel', Number(e.target.value))
              }
              className="w-full accent-emerald-500"
            />
          </div>

          {/* RECOVERY */}
          <div className="md:col-span-2">
            <label className="text-xs text-slate-400 block mb-2">
              Rest / Recovery
            </label>

            <input
              value={form.restRecovery}
              onChange={(e) =>
                updateField('restRecovery', e.target.value)
              }
              placeholder="Example: Good rest, stretching, recovery day"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 outline-none focus:border-cyan-500"
            />
          </div>

          {/* NOTES */}
          <div className="md:col-span-2">
            <label className="text-xs text-slate-400 block mb-2">
              Personal Notes
            </label>

            <textarea
              value={form.notes}
              onChange={(e) =>
                updateField('notes', e.target.value)
              }
              placeholder="Anything else you want to record?"
              rows={3}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 outline-none focus:border-cyan-500 resize-none"
            />
          </div>

        </div>

        <button
          type="submit"
          className="mt-6 w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 transition"
        >
          <Send className="w-4 h-4" />
          Submit Daily Wellness Update
        </button>

      </form>

      {/* AI STATUS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="rounded-2xl border border-violet-500/20 bg-slate-900/60 p-6">

          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <h2 className="font-bold">
              AI Wellness Insight
            </h2>
          </div>

          <p className="text-sm leading-6 text-slate-300">
            {latestUpdate
              ? `Your latest wellness update has been analyzed as a ${latestUpdate.aiRisk.toLowerCase()} wellness attention level with ${latestUpdate.aiConfidence}% model confidence.`
              : 'Submit your daily wellness information to generate a supportive AI wellness analysis.'}
          </p>

          <div className="mt-5 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">

            <div className="text-xs text-violet-300 font-mono">
              HUMAN REVIEW STATUS
            </div>

            <p className="text-sm text-slate-300 mt-2">
              {latestUpdate
                ? latestUpdate.humanVerification
                : 'No submission yet'}
            </p>

          </div>

        </div>

        {/* SUPPORT */}
<div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-6">

  <HeartHandshake className="w-6 h-6 text-emerald-400 mb-4" />

  <h2 className="font-bold text-white">
    Welfare & Support
  </h2>

  <p className="text-sm text-slate-400 mt-2 leading-6">
    Need help while a welfare employee is unavailable?
    Get immediate general guidance from the AI Welfare Assistant.
  </p>

  <button
    type="button"
    onClick={() => setShowAIAssistant(true)}
    className="mt-5 w-full rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 py-3 text-sm font-semibold transition flex items-center justify-center gap-2"
  >
    <Bot className="w-4 h-4" />
    Talk to AI Assistant
  </button>

</div>

      </div>

      {/* DISCLAIMER */}
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-500">

        <div className="flex items-start gap-2">
          <BrainCircuit className="w-4 h-4 text-cyan-500 mt-0.5" />

          <p>
            Wellness indicators are supportive, non-clinical decision aids.
            AI predictions do not independently trigger notifications or
            interventions. Human verification is required before welfare
            action is taken.
          </p>
        </div>

      </div>

    </div>
  );
}