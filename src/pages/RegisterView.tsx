import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';
import {
  User,
  BriefcaseBusiness,
  ArrowRight,
  ArrowLeft,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

import { UserProfile } from '../types';

interface RegisterViewProps {
  portal: 'user' | 'employee';
  onRegisterSuccess: (user: UserProfile) => void;
  onBackToLogin: () => void;
}

export function RegisterView({
  portal,
  onRegisterSuccess,
  onBackToLogin,
}: RegisterViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [unit, setUnit] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isUser = portal === 'user';

 const handleRegister = async (event: React.FormEvent) => {
  event.preventDefault();

  setError('');
  setSuccess('');

  if (!name.trim() || !email.trim() || !unit.trim()) {
    setError('Please fill in all required fields.');
    return;
  }

  if (password.length < 6) {
    setError('Password must contain at least 6 characters.');
    return;
  }

  if (password !== confirmPassword) {
    setError('Passwords do not match.');
    return;
  }

  try {
    const response = await fetch(
  `${API_BASE_URL}/api/auth/register`,
  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          unit,
          password,
          role: isUser
            ? 'Personnel User'
            : 'Welfare Administrator',
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || 'Registration failed.'
      );
    }

    setSuccess(
      `Registration successful! Your Personnel ID is ${data.user.personnelId}.`
    );

    setName('');
    setEmail('');
    setUnit('');
    setPassword('');
    setConfirmPassword('');

    setTimeout(() => {
      onBackToLogin();
    }, 2000);
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : 'Registration failed. Please try again.'
    );
  }
};

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">

      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

      <div
        className={`absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] blur-[120px] rounded-full pointer-events-none ${
          isUser
            ? 'bg-cyan-500/10'
            : 'bg-violet-500/10'
        }`}
      />

      <div className="relative w-full max-w-md">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl border mb-5 ${
              isUser
                ? 'border-cyan-500/30 bg-cyan-500/10'
                : 'border-violet-500/30 bg-violet-500/10'
            }`}
          >
            <ShieldCheck
              className={`w-9 h-9 ${
                isUser
                  ? 'text-cyan-400'
                  : 'text-violet-400'
              }`}
            />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p
            className={`font-semibold mt-3 ${
              isUser
                ? 'text-cyan-400'
                : 'text-violet-400'
            }`}
          >
            {isUser
              ? 'New User Registration'
              : 'New Employee Registration'}
          </p>

          <p className="text-slate-500 text-sm mt-2">
            Create your Welfare Intelligence access account
          </p>

        </div>

        {/* REGISTER CARD */}

        <div
          className={`rounded-3xl border ${
            isUser
              ? 'border-cyan-500/30'
              : 'border-violet-500/30'
          } bg-slate-900/80 backdrop-blur-xl p-7`}
        >

          {/* BACK BUTTON */}

          <button
            onClick={onBackToLogin}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>

          {/* PORTAL TITLE */}

          <div className="flex items-center gap-4 mb-7">

            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                isUser
                  ? 'bg-cyan-500/10 border border-cyan-500/30'
                  : 'bg-violet-500/10 border border-violet-500/30'
              }`}
            >
              {isUser ? (
                <User className="w-7 h-7 text-cyan-400" />
              ) : (
                <BriefcaseBusiness className="w-7 h-7 text-violet-400" />
              )}
            </div>

            <div>
              <div
                className={`text-xs font-mono uppercase tracking-widest ${
                  isUser
                    ? 'text-cyan-400'
                    : 'text-violet-400'
                }`}
              >
                Registration
              </div>

              <h2 className="text-2xl font-bold text-white">
                {isUser
                  ? 'User Account'
                  : 'Employee Account'}
              </h2>
            </div>

          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-4"
          >

            {/* NAME */}

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-500 transition"
              />
            </div>

            {/* EMAIL */}

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-500 transition"
              />
            </div>

            {/* UNIT */}

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Unit / Department
              </label>

              <input
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Example: Unit Alpha"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-500 transition"
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
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Minimum 6 characters"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 pr-12 text-white outline-none focus:border-cyan-500 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
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

            {/* CONFIRM PASSWORD */}

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Confirm Password
              </label>

              <div className="relative">

                <input
                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Re-enter your password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 pr-12 text-white outline-none focus:border-cyan-500 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showConfirmPassword ? (
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

            {/* SUCCESS */}

            {success && (
              <div className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">

                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />

                <span>{success}</span>

              </div>
            )}

            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold transition-all ${
                isUser
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                  : 'bg-violet-500 hover:bg-violet-400 text-white'
              }`}
            >
              Create Account
              <ArrowRight className="w-5 h-5" />
            </button>

          </form>

        </div>

        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-500">
          <LockKeyhole className="w-4 h-4" />
          Secure Welfare Access
        </div>

      </div>
    </div>
  );
}