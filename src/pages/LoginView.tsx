import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';
import {
  ShieldCheck,
  User,
  BriefcaseBusiness,
  ArrowRight,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';

import { RegisterView } from './RegisterView';
import { UserProfile } from '../types';

interface LoginViewProps {
  initialUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
}

type PortalType = 'user' | 'employee' | null;
type AuthMode = 'login' | 'register';

export function LoginView({
  onLoginSuccess,
}: LoginViewProps) {
  const [selectedPortal, setSelectedPortal] = useState<PortalType>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
  event.preventDefault();
  setError('');

  if (!selectedPortal) return;

  if (!userId.trim() || !password) {
    setError('Please enter your ID and password.');
    return;
  }

  try {
   const response = await fetch(
  `${API_BASE_URL}/api/auth/login`,
  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personnelId: userId.trim(),
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || 'Invalid ID or password.'
      );
    }

    // Save the JWT token for future backend requests
    localStorage.setItem('welfare_token', data.token);

    // Make sure the selected portal matches the account role
    const expectedRole =
      selectedPortal === 'user'
        ? 'Personnel User'
        : 'Welfare Administrator';

    if (data.user.role !== expectedRole) {
      localStorage.removeItem('welfare_token');
      setError(
        'This account does not belong to the selected portal.'
      );
      return;
    }

    onLoginSuccess(data.user);
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : 'Login failed. Please try again.'
    );
  }
};

 const selectPortal = (portal: 'user' | 'employee') => {
  setSelectedPortal(portal);
  setAuthMode('login');
  setUserId('');
  setPassword('');
  setError('');
};

  const goBack = () => {
  setSelectedPortal(null);
  setAuthMode('login');
  setUserId('');
  setPassword('');
  setError('');
};

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">

      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-5xl">

        {/* HEADER */}
        <div className="text-center mb-10">

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 mb-5">
            <ShieldCheck className="w-9 h-9 text-cyan-400" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            WELFARE INTELLIGENCE
          </h1>

          <p className="text-cyan-400 font-semibold mt-3">
            AI-Based Predictive Personnel Stress & Welfare Monitoring System
          </p>

          <p className="text-slate-500 text-sm mt-2">
            Secure Welfare Access Gateway
          </p>

        </div>

        {/* PORTAL SELECTION */}
        {!selectedPortal && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* USER PORTAL */}
            <div className="group rounded-3xl border border-cyan-500/25 bg-slate-900/70 backdrop-blur-xl p-7 hover:border-cyan-400/60 transition-all duration-300">

              <div className="flex items-center gap-4 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <User className="w-7 h-7 text-cyan-400" />
                </div>

                <div>
                  <div className="text-xs text-cyan-400 font-mono uppercase tracking-widest">
                    Personal Access
                  </div>

                  <h2 className="text-2xl font-bold text-white">
                    User Portal
                  </h2>
                </div>

              </div>

              <p className="text-slate-400 text-sm leading-6 mb-6">
                Access your personal wellbeing dashboard, daily wellness
                updates, recovery information, AI wellness insights and
                confidential support resources.
              </p>

              <div className="space-y-3 mb-7">

                {[
                  'Personal Wellness Dashboard',
                  'Daily Wellness Updates',
                  'Sleep & Recovery',
                  'Confidential Support',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {item}
                  </div>
                ))}

              </div>

              <button
                onClick={() => selectPortal('user')}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all"
              >
                Continue as User
                <ArrowRight className="w-5 h-5" />
              </button>

            </div>

            {/* EMPLOYEE PORTAL */}
            <div className="group rounded-3xl border border-violet-500/25 bg-slate-900/70 backdrop-blur-xl p-7 hover:border-violet-400/60 transition-all duration-300">

              <div className="flex items-center gap-4 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
                  <BriefcaseBusiness className="w-7 h-7 text-violet-400" />
                </div>

                <div>
                  <div className="text-xs text-violet-400 font-mono uppercase tracking-widest">
                    Administrative Access
                  </div>

                  <h2 className="text-2xl font-bold text-white">
                    Employee Portal
                  </h2>
                </div>

              </div>

              <p className="text-slate-400 text-sm leading-6 mb-6">
                Authorized welfare personnel can access personnel monitoring,
                predictive risk analytics, fatigue monitoring, alerts,
                interventions and welfare reports.
              </p>

              <div className="space-y-3 mb-7">

                {[
                  'Personnel Directory',
                  'AI Risk Prediction',
                  'Alerts & Interventions',
                  'Reports & Insights',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-violet-400" />
                    {item}
                  </div>
                ))}

              </div>

              <button
                onClick={() => selectPortal('employee')}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-white font-bold transition-all"
              >
                Continue as Employee
                <ArrowRight className="w-5 h-5" />
              </button>

            </div>

          </div>
        )}
        {/* REGISTRATION FORM */}
{selectedPortal && authMode === 'register' && (
  <RegisterView
    portal={selectedPortal}
    onBackToLogin={() => {
      setAuthMode('login');
      setError('');
    }}
    onRegisterSuccess={(user: UserProfile) => {
      onLoginSuccess(user);
    }}
  />
)}

        {/* LOGIN FORM */}
       {selectedPortal && authMode === 'login' && (
  <div className="max-w-md mx-auto">

            <div className={`rounded-3xl border ${
              selectedPortal === 'user'
                ? 'border-cyan-500/30'
                : 'border-violet-500/30'
            } bg-slate-900/80 backdrop-blur-xl p-7`}>

              <button
                onClick={goBack}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to portal selection
              </button>

              <div className="flex items-center gap-4 mb-7">

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  selectedPortal === 'user'
                    ? 'bg-cyan-500/10 border border-cyan-500/30'
                    : 'bg-violet-500/10 border border-violet-500/30'
                }`}>
                  {selectedPortal === 'user' ? (
                    <User className="w-7 h-7 text-cyan-400" />
                  ) : (
                    <BriefcaseBusiness className="w-7 h-7 text-violet-400" />
                  )}
                </div>

                <div>
                  <div className={`text-xs font-mono uppercase tracking-widest ${
                    selectedPortal === 'user'
                      ? 'text-cyan-400'
                      : 'text-violet-400'
                  }`}>
                    Secure Login
                  </div>

                  <h2 className="text-2xl font-bold text-white">
                    {selectedPortal === 'user'
                      ? 'User Portal'
                      : 'Employee Portal'}
                  </h2>
                </div>

              </div>

              <form onSubmit={handleLogin} className="space-y-5">

                {/* ID */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    {selectedPortal === 'user'
                      ? 'Personnel ID'
                      : 'Administrator ID'}
                  </label>

                  <input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder={
                      selectedPortal === 'user'
                        ? 'Example: PU-1001'
                        : 'Example: WA-9042'
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-500 transition"
                    autoComplete="username"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 pr-12 text-white outline-none focus:border-cyan-500 transition"
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>

                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold transition-all ${
                    selectedPortal === 'user'
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                      : 'bg-violet-500 hover:bg-violet-400 text-white'
                  }`}
                >
                  Secure Login
                  <ArrowRight className="w-5 h-5" />
                </button>

              </form>
              {/* REGISTER LINK */}

<div className="mt-5 text-center">

  <p className="text-sm text-slate-500">
    {selectedPortal === 'user'
      ? 'New user?'
      : 'New employee?'}
  </p>

  <button
    type="button"
    onClick={() => {
      setAuthMode('register');
      setError('');
    }}
    className={`mt-2 font-semibold transition ${
      selectedPortal === 'user'
        ? 'text-cyan-400 hover:text-cyan-300'
        : 'text-violet-400 hover:text-violet-300'
    }`}
  >
    Create a new account →
  </button>

</div>

              {/* DEMO CREDENTIALS */}
              <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/50 p-4">

                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                  Demo Credentials
                </div>

                {selectedPortal === 'user' ? (
                  <>
                    <div className="text-xs text-slate-300">
                      ID: <span className="text-cyan-400">PU-1001</span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      Password: <span className="text-cyan-400">user123</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-xs text-slate-300">
                      ID: <span className="text-violet-400">WA-9042</span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      Password: <span className="text-violet-400">admin123</span>
                    </div>
                  </>
                )}

              </div>

            </div>
          </div>
        )}
        

        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-500">
          <LockKeyhole className="w-4 h-4" />
          Authorized welfare access • Human-in-the-loop decision support
        </div>

      </div>
    </div>
  );
}