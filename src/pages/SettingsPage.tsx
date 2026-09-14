import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Lock, 
  Bell, 
  Sliders, 
  Database, 
  FileText, 
  Activity, 
  CheckCircle2, 
  User, 
  KeyRound, 
  HardDrive, 
  Cpu, 
  RefreshCw,
  Clock,
  Download,
  AlertTriangle
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { UserProfile } from '../types';

interface SettingsPageProps {
  currentUser?: UserProfile;
  onUpdateUser?: (updated: UserProfile) => void;
  onLogout?: () => void;
  onResetRegistry?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ 
  currentUser, 
  onUpdateUser,
  onLogout,
  onResetRegistry 
}) => {
  const [activeSection, setActiveSection] = useState<
    'profile' | 'notifications' | 'prediction' | 'thresholds' | 'privacy' | 'retention' | 'audit' | 'status'
  >('profile');

  // Profile State
  const [profileName, setProfileName] = useState(currentUser?.name || 'Authorized Officer');
  const [profileId, setProfileId] = useState(currentUser?.id || 'WO-7701');
  const [profileRole, setProfileRole] = useState(currentUser?.role || 'Welfare Administrator');
  const [profileEmail, setProfileEmail] = useState(currentUser?.email || 'officer@welfare.mil');
  const [profileUnit, setProfileUnit] = useState(currentUser?.unit || 'Joint Command Directorate');
  const [profileRank, setProfileRank] = useState(currentUser?.rankTitle || 'Captain');
  const [profileClearance, setProfileClearance] = useState(currentUser?.securityClearance || 'Tier 3 - Welfare Confidential');
  const [profileSaved, setProfileSaved] = useState(false);

  // Sync state whenever currentUser changes
  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setProfileName(currentUser.name);
      if (currentUser.id) setProfileId(currentUser.id);
      if (currentUser.role) setProfileRole(currentUser.role);
      if (currentUser.email) setProfileEmail(currentUser.email);
      if (currentUser.unit) setProfileUnit(currentUser.unit);
      if (currentUser.rankTitle) setProfileRank(currentUser.rankTitle);
      if (currentUser.securityClearance) setProfileClearance(currentUser.securityClearance);
    }
  }, [currentUser]);

  // Prediction Sensitivity & Thresholds state
  const [stressThreshold, setStressThreshold] = useState(70);
  const [fatigueThreshold, setFatigueThreshold] = useState(65);
  const [recoveryTarget, setRecoveryTarget] = useState(70);
  const [predictionHorizonDays, setPredictionHorizonDays] = useState(7);
  const [predictionFrequency, setPredictionFrequency] = useState('Continuous Real-Time (1-minute telemetry)');
  const [anomalySensitivity, setAnomalySensitivity] = useState('High (Pre-Exhaustion Focus)');
  const [autoRetrain, setAutoRetrain] = useState(true);

  // Privacy & Access toggles
  const [anonymizeNames, setAnonymizeNames] = useState(true);
  const [roleBasedAccess, setRoleBasedAccess] = useState(true);
  const [nonPunitiveFirewall, setNonPunitiveFirewall] = useState(true);
  const [dataMinimization, setDataMinimization] = useState(true);
  const [consentTracking, setConsentTracking] = useState(true);
  const [keyRotation, setKeyRotation] = useState('30 Days');

  // Data Retention state
  const [retentionWindow, setRetentionWindow] = useState('90 Days (Military Welfare Directive)');
  const [pseudonymPurge, setPseudonymPurge] = useState('After 30 Days of Non-Active Monitored Status');
  const [archiveFormat, setArchiveFormat] = useState('Encrypted AES-256 Bundle');

  // Notifications toggles
  const [notifyCritical, setNotifyCritical] = useState(true);
  const [notifyShiftOverload, setNotifyShiftOverload] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);
  const [soundAlert, setSoundAlert] = useState('Subtle Cyber Pulse');

  // Audit Logs Data
  const auditLogs = [
    { id: 'LOG-9921', action: 'Welfare Profile Inspection', actor: 'Welfare Admin (WA-9042)', target: 'P-1042', timestamp: 'Today, 18:32', ip: '10.24.1.88 (Mil-Net)' },
    { id: 'LOG-9918', action: 'Rest Buffer Authorized', actor: 'Maj. Chen (XO)', target: 'Unit Charlie', timestamp: 'Today, 17:15', ip: '10.24.1.12 (Mil-Net)' },
    { id: 'LOG-9912', action: 'Threshold Calibration', actor: 'AI Directorate', target: 'Ensemble v4.2', timestamp: 'Today, 14:00', ip: '10.24.0.04 (Secure)' },
    { id: 'LOG-9904', action: 'Alert Triage: Resolved', actor: 'Welfare Liaison Jenkins', target: 'ALT-8819', timestamp: 'Today, 11:20', ip: '10.24.2.45 (Mil-Net)' },
    { id: 'LOG-9891', action: 'Confidential Check-In Completed', actor: 'Dr. Vance (Directorate)', target: 'P-0671', timestamp: 'Yesterday, 16:40', ip: '10.24.1.90 (Medical)' }
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    if (onUpdateUser) {
      const initials = profileName
        .split(' ')
        .map(n => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'WA';

      onUpdateUser({
        id: profileId,
        name: profileName,
        email: profileEmail,
        unit: profileUnit,
        role: profileRole,
        rankTitle: profileRank,
        securityClearance: profileClearance,
        lastLogin: currentUser?.lastLogin || 'Active Session',
        avatarInitials: initials
      });
    }
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const navModules = [
    { id: 'profile', label: 'Profile', icon: User, desc: 'Authorized admin identity & credentials' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Critical alert triggers & dispatches' },
    { id: 'prediction', label: 'AI Prediction Settings', icon: Cpu, desc: 'Model architecture & inference pacing' },
    { id: 'thresholds', label: 'Risk Thresholds', icon: Sliders, desc: 'Stress & fatigue alert cutoffs' },
    { id: 'privacy', label: 'Privacy & Access', icon: Lock, desc: 'Role-based access & ethical firewalls' },
    { id: 'retention', label: 'Data Retention', icon: HardDrive, desc: 'Lifecycle storage & auto-purge rules' },
    { id: 'audit', label: 'Audit Logs', icon: FileText, desc: 'Immutable cryptographic access log' },
    { id: 'status', label: 'System Status', icon: Activity, desc: 'Hardware enclave & pipeline diagnostics' },
  ] as const;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <SettingsIcon className="w-6 h-6 text-cyan-400" />
            System Governance & Platform Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Comprehensive control over administrative access, ethical firewalls, predictive machine learning thresholds, and audit logging.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>ISO/IEC 42001 & Privacy Directive Compliant</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Settings Navigation Menu - 8 Sections Required by Prompt */}
        <GlassCard className="lg:col-span-4 p-3 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-3 py-2">
            Governance & Configuration Sections
          </div>

          {navModules.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 shadow-md shadow-cyan-950'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <div>
                  <div className="text-xs font-mono">{item.label}</div>
                  <div className="text-[10px] text-slate-500 font-sans line-clamp-1">{item.desc}</div>
                </div>
              </button>
            );
          })}
        </GlassCard>

        {/* Settings Body */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Profile Section */}
          {activeSection === 'profile' && (
            <GlassCard className="p-6 space-y-5">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    Authorized Administrator Profile
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Credentials and welfare oversight credentials for this authenticated session.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Cleared: Level 4
                </span>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Administrative ID</label>
                    <input
                      type="text"
                      value={profileId}
                      readOnly
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Full Name / Callsign</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Designation / Role Title</label>
                    <input
                      type="text"
                      value={profileRole}
                      onChange={(e) => setProfileRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Assigned Formation / Unit</label>
                    <input
                      type="text"
                      value={profileUnit}
                      onChange={(e) => setProfileUnit(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Secure Welfare Liaison Email</label>
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Rank / Military Title</label>
                    <input
                      type="text"
                      value={profileRank}
                      onChange={(e) => setProfileRank(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-cyan-400" />
                    <div>
                      <span className="font-bold block">Biometric Welfare Key Token</span>
                      <span className="text-[10px] text-slate-500">Hardware token linked to physical terminal slot 02</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    VERIFIED ACTIVE
                  </span>
                </div>

                {profileSaved && (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Profile preferences updated successfully.</span>
                  </div>
                )}

                {/* Actions & Session Controls */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {onLogout && (
                      <button
                        type="button"
                        onClick={onLogout}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-rose-300 border border-slate-700 text-xs font-mono transition-colors"
                      >
                        Sign Out Session
                      </button>
                    )}
                    {onResetRegistry && (
                      <button
                        type="button"
                        onClick={onResetRegistry}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700 text-xs font-mono transition-colors"
                      >
                        Reset Officer Profile
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20 font-mono"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </GlassCard>
          )}

          {/* 2. Notifications Section */}
          {activeSection === 'notifications' && (
            <GlassCard className="p-6 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cyan-400" />
                  Welfare Alert Notification Dispatch
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure real-time push and encrypted channel dispatches for welfare supervisors.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white font-mono">Immediate Critical Early Warnings</div>
                    <p className="text-xs text-slate-400 mt-0.5">Instant audio-visual alert when personnel cross acute risk threshold.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyCritical}
                    onChange={(e) => setNotifyCritical(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white font-mono">Duty Shift Overload Advisories</div>
                    <p className="text-xs text-slate-400 mt-0.5">Notify when unit total weekly hours exceed 55h benchmark.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyShiftOverload}
                    onChange={(e) => setNotifyShiftOverload(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white font-mono">Daily Morning Wellness Digest</div>
                    <p className="text-xs text-slate-400 mt-0.5">Automated 07:00 summary dispatch of unit recovery readiness.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={dailyDigest}
                    onChange={(e) => setDailyDigest(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Notification Acoustic Profile</label>
                  <select
                    value={soundAlert}
                    onChange={(e) => setSoundAlert(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="Subtle Cyber Pulse">Subtle Cyber Pulse (Recommended)</option>
                    <option value="Standard Beep">Standard Beep</option>
                    <option value="Priority Audio Dispatch">Priority Audio Dispatch (Urgent)</option>
                    <option value="Silent (Visual Only)">Silent (Visual Telemetry Only)</option>
                  </select>
                </div>
              </div>
            </GlassCard>
          )}

          {/* 3. AI Prediction Settings Section */}
          {activeSection === 'prediction' && (
            <GlassCard className="p-6 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  AI Prediction Engine Settings
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Algorithmic inference parameters, model retraining schedules, and anomaly sensitivity.
                </p>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-300 mb-1.5">Inference Pacing & Refresh Frequency</label>
                  <select
                    value={predictionFrequency}
                    onChange={(e) => setPredictionFrequency(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Continuous Real-Time (1-minute telemetry)">Continuous Real-Time (1-minute telemetry)</option>
                    <option value="Every 15 Minutes (Low Bandwidth)">Every 15 Minutes (Low Bandwidth)</option>
                    <option value="Hourly Batch Inference">Hourly Batch Inference</option>
                    <option value="Shift Changeover Synchronization Only">Shift Changeover Synchronization Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1.5">Anomaly Detection Sensitivity Profile</label>
                  <select
                    value={anomalySensitivity}
                    onChange={(e) => setAnomalySensitivity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="High (Pre-Exhaustion Focus)">High (Pre-Exhaustion Focus - Early Warning Bias)</option>
                    <option value="Standard Operational Baseline">Standard Operational Baseline (Balanced Precision)</option>
                    <option value="Conservative (Confirmed Critical Only)">Conservative (Confirmed Critical Signals Only)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <div className="font-bold text-white">Dynamic Ensemble Weight Tuning (Auto-Calibration)</div>
                    <p className="text-slate-400 text-xs font-sans mt-0.5">
                      Continuously adjust SHAP weights using verified post-intervention recovery outcomes.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoRetrain}
                    onChange={(e) => setAutoRetrain(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-cyan-400 font-bold">Active Model Architecture: Temporal GBD + LSTM (v4.2.8)</div>
                  <div className="text-slate-400 text-[11px] font-sans">
                    Ensemble model trained exclusively on non-punitive occupational stress indicators and circadian rhythms.
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {/* 4. Risk Thresholds Section */}
          {activeSection === 'thresholds' && (
            <GlassCard className="p-6 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  Predictive Risk Thresholds & Horizon
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Calibrate the mathematical boundaries for stress, fatigue, and recovery intervention alerts.
                </p>
              </div>

              <div className="space-y-5 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-slate-300 mb-2">
                    <span>Stress Indicator Alert Trigger Threshold:</span>
                    <strong className="text-amber-400">{stressThreshold} / 100</strong>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="90"
                    value={stressThreshold}
                    onChange={(e) => setStressThreshold(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400">Triggers 'Attention Required' badge when 7-day average crosses {stressThreshold}.</span>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-2">
                    <span>Fatigue Velocity Trigger Threshold:</span>
                    <strong className="text-rose-400">{fatigueThreshold} / 100</strong>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="90"
                    value={fatigueThreshold}
                    onChange={(e) => setFatigueThreshold(Number(e.target.value))}
                    className="w-full accent-rose-400 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400">Triggers 'Fatigue Accumulation' alert when consecutive deficit crosses {fatigueThreshold}.</span>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-2">
                    <span>Minimum Recovery Score Target:</span>
                    <strong className="text-emerald-400">{recoveryTarget} / 100</strong>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="85"
                    value={recoveryTarget}
                    onChange={(e) => setRecoveryTarget(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400">Personnel falling below {recoveryTarget} receive rest buffer recommendations.</span>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-2">
                    <span>Predictive Horizon Window:</span>
                    <strong className="text-cyan-400">{predictionHorizonDays} Days</strong>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="30"
                    value={predictionHorizonDays}
                    onChange={(e) => setPredictionHorizonDays(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400">Forward forecasting window for operational fatigue and recovery deficits.</span>
                </div>
              </div>
            </GlassCard>
          )}

          {/* 5. Privacy & Access Section */}
          {activeSection === 'privacy' && (
            <GlassCard className="p-6 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  Privacy Governance & Role-Based Access Controls (RBAC)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Protective mechanisms ensuring personnel welfare information remains ethical, non-punitive, and segregated.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white font-mono">Data Minimization & Anonymization</div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Strip personal civilian identities; display only pseudonymous tactical IDs (e.g. P-1042).
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={anonymizeNames}
                    onChange={(e) => setAnonymizeNames(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white font-mono">Enforce Role-Based Welfare Segregation (RBAC)</div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Strictly isolate health and stress telemetry from commanding disciplinary rosters.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={roleBasedAccess}
                    onChange={(e) => setRoleBasedAccess(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white font-mono">Non-Punitive System Firewall</div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Hard block against querying welfare scores in promotion boards or punitive administrative actions.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={nonPunitiveFirewall}
                    onChange={(e) => setNonPunitiveFirewall(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white font-mono">Voluntary Participation Consent Tracking</div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Record informed consent for wearable biometric inputs and optional counselling pathways.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consentTracking}
                    onChange={(e) => setConsentTracking(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">Cryptographic Key Rotation Interval</label>
                  <select
                    value={keyRotation}
                    onChange={(e) => setKeyRotation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="30 Days">Every 30 Days (High Security)</option>
                    <option value="60 Days">Every 60 Days</option>
                    <option value="90 Days">Every 90 Days</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>All privacy toggles are actively verified by the Defense Welfare Ethics Commission.</span>
              </div>
            </GlassCard>
          )}

          {/* 6. Data Retention Section */}
          {activeSection === 'retention' && (
            <GlassCard className="p-6 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-cyan-400" />
                  Data Retention & Storage Lifecycle
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automated purging policies, compliant audit intervals, and local cryptographic clearing.
                </p>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-300 mb-1.5">Telemetry Retention Window</label>
                  <select
                    value={retentionWindow}
                    onChange={(e) => setRetentionWindow(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="90 Days (Military Welfare Directive)">90 Days (Military Welfare Directive - Recommended)</option>
                    <option value="30 Days (Minimal History)">30 Days (Minimal History)</option>
                    <option value="180 Days (Longitudinal Study)">180 Days (Longitudinal Research Study)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1.5">Pseudonym Purge Protocol</label>
                  <select
                    value={pseudonymPurge}
                    onChange={(e) => setPseudonymPurge(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="After 30 Days of Non-Active Monitored Status">After 30 Days of Non-Active Monitored Status</option>
                    <option value="Immediately Upon Unit Reassignment">Immediately Upon Unit Reassignment</option>
                    <option value="Annual Directorate Purge Cycle">Annual Directorate Purge Cycle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1.5">Long-Term Archive Encryption Format</label>
                  <select
                    value={archiveFormat}
                    onChange={(e) => setArchiveFormat(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Encrypted AES-256 Bundle">Encrypted AES-256 Bundle</option>
                    <option value="Hardware Security Module HSM Seal">Hardware Security Module (HSM) Seal</option>
                    <option value="Zero-Knowledge Sanitized CSV">Zero-Knowledge Sanitized CSV</option>
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">Local Telemetry Cache Purge</span>
                    <span className="text-slate-500 text-[10px] font-sans">Clear in-memory indexed caches for this terminal session</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Local cache cleared successfully. Telemetry refreshed from secured ledger.')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs"
                  >
                    Purge Local Cache
                  </button>
                </div>
              </div>
            </GlassCard>
          )}

          {/* 7. Audit Logs Section */}
          {activeSection === 'audit' && (
            <GlassCard className="p-6 space-y-4">
              <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    Immutable Welfare Access Audit Log
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Cryptographic log of all supervisor lookups and intervention authorizations.</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Exporting cryptographic audit ledger as verified CSV...')}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Audit Ledger</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="border-b border-slate-800 text-[11px] text-slate-400 uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Log ID</th>
                      <th className="py-2.5 px-3">Action</th>
                      <th className="py-2.5 px-3">Authorized User</th>
                      <th className="py-2.5 px-3">Target Ref</th>
                      <th className="py-2.5 px-3">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 text-cyan-400 font-bold">{log.id}</td>
                        <td className="py-2.5 px-3 text-slate-200">{log.action}</td>
                        <td className="py-2.5 px-3 text-slate-300 font-sans">{log.actor}</td>
                        <td className="py-2.5 px-3 text-amber-300">{log.target}</td>
                        <td className="py-2.5 px-3 text-slate-400">{log.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          )}

          {/* 8. System Status Section */}
          {activeSection === 'status' && (
            <GlassCard className="p-6 space-y-5">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    System Diagnostics & Pipeline Health
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Real-time status of AI inference nodes and encrypted data collectors.</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Diagnostic ping broadcast to all 4 unit telemetric gateways: ALL NODES RESPONDING IN 8ms.')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-mono flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Run Live Ping</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">INFERENCE PIPELINE</div>
                  <div className="text-emerald-400 text-lg font-bold mt-1">ONLINE • 12ms</div>
                  <p className="text-slate-500 text-[10px] mt-1">Zero dropped frames across 1,248 streams</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">SECURITY ENCLAVE</div>
                  <div className="text-cyan-400 text-lg font-bold mt-1">FIPS 140-3</div>
                  <p className="text-slate-500 text-[10px] mt-1">Hardware encrypted HSM cluster</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">SYNC ACCURACY</div>
                  <div className="text-violet-300 text-lg font-bold mt-1">99.98%</div>
                  <p className="text-slate-500 text-[10px] mt-1">Telemetry synced across Alpha, Bravo, Charlie, Delta</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-white font-bold">Subsystem Heartbeat Matrix:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">REST Stream</span>
                    <span className="text-emerald-400">99.9%</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">SHAP Explainer</span>
                    <span className="text-emerald-400">READY</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Anonymizer</span>
                    <span className="text-emerald-400">ACTIVE</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Audit Ledger</span>
                    <span className="text-emerald-400">LOCKED</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};
