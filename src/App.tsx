import React, { useState, useEffect, useRef } from 'react';
import { Sidebar, NavItem } from './components/layout/Sidebar';
import { TopNavbar } from './components/layout/TopNavbar';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { NeuralCanvas } from './components/common/NeuralCanvas';
import { JudgePitchModal } from './components/common/JudgePitchModal';

import { LoginView } from './pages/LoginView';
import { OverviewPage } from './pages/OverviewPage';
import { PersonnelPage } from './pages/PersonnelPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AIRiskPage } from './pages/AIRiskPage';
import { StressAnalyticsPage } from './pages/StressAnalyticsPage';
import { FatigueMonitoringPage } from './pages/FatigueMonitoringPage';
import { WelfareSupportPage } from './pages/WelfareSupportPage';
import { AlertCenterPage } from './pages/AlertCenterPage';
import { InterventionCenterPage } from './pages/InterventionCenterPage';
import { ReportsInsightsPage } from './pages/ReportsInsightsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { SettingsPage } from './pages/SettingsPage';

import { PersonnelModal } from './components/modals/PersonnelModal';
import { ScheduleCheckInModal } from './components/modals/ScheduleCheckInModal';
import { ExportReportModal } from './components/modals/ExportReportModal';
import { AlertInvestigateModal } from './components/modals/AlertInvestigateModal';

import { mockPersonnelList, createPersonnelRecordFromUser } from './data/mockPersonnel';
import { mockAlertsList } from './data/mockAlerts';
import { mockInterventionsList } from './data/mockInterventions';
import { PersonnelRecord, EarlyWarningAlert, WelfareIntervention, WelfareReport, UserProfile, WellnessUpdate } from './types';
import { soundFx } from './utils/soundEffects';
import { API_BASE_URL } from './config/api';

import { 
  CheckCircle2, 
  Sparkles, 
  X, 
  Minimize2, 
  Award, 
  Radio, 
  LayoutDashboard, 
  Users, 
  BrainCircuit, 
  Activity, 
  BatteryCharging, 
  HeartHandshake, 
  AlertTriangle, 
  LifeBuoy, 
  FileText, 
  Bot, 
  Settings 
} from 'lucide-react';
const EMPLOYEE_THEME_STYLES = `
  /* =================================
     EMPLOYEE LIGHT THEME
     WHITE + ORANGE
  ================================= */

  .employee-dashboard.theme-light {
    background: #fffaf5 !important;
    color: #3b2a20 !important;
  }

  /* Main background */
  .employee-dashboard.theme-light .bg-slate-950,
  .employee-dashboard.theme-light .bg-slate-900 {
    background: #fffaf5 !important;
  }

  /* Sidebar */
  .employee-dashboard.theme-light aside {
    background: #ffffff !important;
    border-color: #fed7aa !important;
  }

  .employee-dashboard.theme-light aside button {
    color: #7c2d12 !important;
  }

  /* Selected sidebar item */
  .employee-dashboard.theme-light aside button[class*="bg-cyan-500"] {
    background: #f97316 !important;
    color: #ffffff !important;
    border-color: #f97316 !important;
    box-shadow: 0 4px 14px rgba(249, 115, 22, 0.20);
  }

  .employee-dashboard.theme-light aside button[class*="bg-cyan-500"] svg {
    color: #ffffff !important;
  }

  /* Sidebar hover */
  .employee-dashboard.theme-light aside button:hover {
    background: #fff1e6 !important;
    color: #c2410c !important;
  }

  /* Headings */
  .employee-dashboard.theme-light h1,
  .employee-dashboard.theme-light h2,
  .employee-dashboard.theme-light h3,
  .employee-dashboard.theme-light h4 {
    color: #9a3412 !important;
  }

  /* Normal text */
  .employee-dashboard.theme-light .text-slate-100,
  .employee-dashboard.theme-light .text-slate-200,
  .employee-dashboard.theme-light .text-slate-300 {
    color: #4a382f !important;
  }

  .employee-dashboard.theme-light .text-slate-400,
  .employee-dashboard.theme-light .text-slate-500 {
    color: #806b5d !important;
  }

  /* Orange highlights */
  .employee-dashboard.theme-light .text-cyan-300,
  .employee-dashboard.theme-light .text-cyan-400,
  .employee-dashboard.theme-light .text-emerald-300,
  .employee-dashboard.theme-light .text-emerald-400 {
    color: #ea580c !important;
  }

  /* Orange backgrounds */
  .employee-dashboard.theme-light .bg-cyan-500,
  .employee-dashboard.theme-light .bg-emerald-500 {
    background: #f97316 !important;
  }

  /* Orange borders */
  .employee-dashboard.theme-light .border-cyan-400,
  .employee-dashboard.theme-light .border-cyan-500,
  .employee-dashboard.theme-light .border-emerald-500 {
    border-color: #f97316 !important;
  }

  /* Cards */
  .employee-dashboard.theme-light .rounded-2xl {
    background: #ffffff !important;
    border-color: #fed7aa !important;
    box-shadow: 0 4px 18px rgba(124, 45, 18, 0.06);
  }

  /* Inputs */
  .employee-dashboard.theme-light input,
  .employee-dashboard.theme-light textarea,
  .employee-dashboard.theme-light select {
    background: #ffffff !important;
    color: #3b2a20 !important;
    border-color: #fdba74 !important;
  }

  .employee-dashboard.theme-light input:focus,
  .employee-dashboard.theme-light textarea:focus,
  .employee-dashboard.theme-light select:focus {
    border-color: #f97316 !important;
    outline-color: #f97316 !important;
    box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.12);
  }

  /* General borders */
  .employee-dashboard.theme-light .border-slate-800,
  .employee-dashboard.theme-light .border-slate-700 {
    border-color: #fed7aa !important;
  }

  /* Soft orange areas */
  .employee-dashboard.theme-light .bg-cyan-500\\/10,
  .employee-dashboard.theme-light .bg-cyan-500\\/20,
  .employee-dashboard.theme-light .bg-emerald-500\\/5 {
    background: #fff7ed !important;
  }

  /* Primary orange buttons */
  .employee-dashboard.theme-light button.bg-cyan-500 {
    background: #f97316 !important;
    color: #ffffff !important;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.20);
  }

  .employee-dashboard.theme-light button.bg-cyan-500:hover {
    background: #ea580c !important;
  }

  /* Links */
  .employee-dashboard.theme-light a {
    color: #c2410c !important;
  }

  .employee-dashboard.theme-light a:hover {
    color: #ea580c !important;
  }

  /* Orange icons */
  .employee-dashboard.theme-light svg.text-cyan-400,
  .employee-dashboard.theme-light svg.text-emerald-400 {
    color: #f97316 !important;
  }
`;
export function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Authenticated User Profile State (Registered / Logged-in details)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('Overview');
  // Employee dashboard theme
type Theme = 'dark' | 'light';

const [theme, setTheme] = useState<Theme>(() => {
  const savedTheme = localStorage.getItem('welfare_theme');
  return savedTheme === 'light' ? 'light' : 'dark';
});

useEffect(() => {
  const syncTheme = () => {
    const savedTheme = localStorage.getItem('welfare_theme');
    setTheme(savedTheme === 'light' ? 'light' : 'dark');
  };

  window.addEventListener('welfare-theme-change', syncTheme);
  window.addEventListener('storage', syncTheme);

  return () => {
    window.removeEventListener('welfare-theme-change', syncTheme);
    window.removeEventListener('storage', syncTheme);
  };
}, []);

  // Hackathon Presentation Mode (Judge-friendly expanded view)
  const [presentationMode, setPresentationMode] = useState<boolean>(false);

  // Mobile Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Judge Pitch & Architecture Modal
  const [showJudgePitch, setShowJudgePitch] = useState<boolean>(false);

  // Live Telemetry Simulator
  const [isSimulatingLive, setIsSimulatingLive] = useState<boolean>(false);

  // Core Data State (allows live interactions)
  const [personnelList, setPersonnelList] = useState<PersonnelRecord[]>(mockPersonnelList);
  const [alerts, setAlerts] = useState<EarlyWarningAlert[]>([]);
  const [interventions, setInterventions] = useState<WelfareIntervention[]>(mockInterventionsList);

  // Personnel wellness submissions
const [wellnessUpdates, setWellnessUpdates] = useState<import('./types').WellnessUpdate[]>([]);
  // Modal states
  const [selectedPersonnel, setSelectedPersonnel] = useState<PersonnelRecord | null>(null);
  const [scheduleCheckInTarget, setScheduleCheckInTarget] = useState<PersonnelRecord | null>(null);
  const [exportModalReport, setExportModalReport] = useState<WelfareReport | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [investigatingAlert, setInvestigatingAlert] = useState<EarlyWarningAlert | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<{ text: string; type?: 'info' | 'alert' | 'success' } | null>(null);

  const showToast = (text: string, type: 'info' | 'alert' | 'success' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Automated live telemetry simulation effect
  useEffect(() => {
    if (!isSimulatingLive) return;

    const interval = setInterval(() => {
      // Simulate subtle telemetry shifts in random personnel record
      setPersonnelList(prev => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const target = prev[randomIndex];
        const stressDelta = (Math.random() - 0.5) * 4;
        const newStress = Math.min(95, Math.max(20, Math.round(target.stressIndicator + stressDelta)));
        
        const updated = [...prev];
        updated[randomIndex] = {
          ...target,
          stressIndicator: newStress,
          lastCheckIn: 'Just now'
        };
        return updated;
      });

      // 30% chance to simulate a live early warning ping or recovery stabilization
      if (Math.random() < 0.35) {
        soundFx.playAlert();
        showToast('Live Telemetry: Circadian fatigue velocity stabilization noted in Unit Bravo detachment', 'alert');
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [isSimulatingLive]);

  // Near-real-time alert polling for Welfare Administrators.
  // The backend is queried every 5 seconds so newly submitted high/moderate
  // wellness records can appear in the Alerts feed without refreshing the page.
  const knownRealAlertIds = useRef<Set<string>>(new Set());
  const initialRealAlertsLoaded = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || currentUser?.role !== 'Welfare Administrator') return;

    let cancelled = false;

    const loadLiveAlerts = async () => {
      const token = localStorage.getItem('welfare_token');
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/wellness/alerts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) return;

        const liveAlerts = await response.json();
        if (cancelled || !Array.isArray(liveAlerts)) return;

        const isInitialLoad = !initialRealAlertsLoaded.current;
        const newAlerts = liveAlerts.filter((item: any) => !knownRealAlertIds.current.has(String(item.id)));
        liveAlerts.forEach((item: any) => knownRealAlertIds.current.add(String(item.id)));

        const normalized = liveAlerts.map((item: any): EarlyWarningAlert => ({
          id: String(item.id),
          severity: item.severity === 'High' ? 'Critical' : item.severity === 'Moderate' ? 'Moderate' : 'Info',
          title: item.title || 'Wellness Risk Detected',
          description: item.description || 'A new wellness risk was detected.',
          affectedGroup: item.affectedGroup || item.personnelId || 'Personnel',
          timestamp: item.timestamp || 'Just now',
          status: item.status || 'Active',
          aiConfidence: item.aiConfidence ?? 80,
          recommendedAction: item.recommendedAction || 'Review the personnel wellness record and initiate appropriate support.',
          riskType:
            item.riskType === 'Fatigue Accumulation'
              ? 'Fatigue Accumulation'
              : item.riskType === 'Recovery Depletion'
                ? 'Recovery Depletion'
                : item.riskType === 'Shift Overload'
                  ? 'Shift Overload'
                  : item.riskType === 'Recovery Improvement'
                    ? 'Recovery Improvement'
                    : 'Elevated Stress Pattern',
          isNew: !isInitialLoad && newAlerts.some((newItem: any) => String(newItem.id) === String(item.id)),
        }));

        setAlerts(normalized);

        if (!isInitialLoad && newAlerts.length > 0) {
          soundFx.playAlert();
          showToast(`Real-time alert: ${newAlerts[0].title}`, 'alert');
        }
        initialRealAlertsLoaded.current = true;
      } catch {
        // Keep the existing dashboard data if the backend is temporarily unavailable.
      }
    };

    loadLiveAlerts();
    const interval = window.setInterval(loadLiveAlerts, 5000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [isAuthenticated, currentUser?.role]);

  // Handler: Update Alert Status
  const handleUpdateAlertStatus = (alertId: string, newStatus: EarlyWarningAlert['status']) => {
    soundFx.playSuccess();
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: newStatus } : a));
    showToast(`Alert ${alertId} updated to "${newStatus}"`, 'success');
  };

  // Handler: Confirm Check-in Scheduling
  const handleConfirmScheduleCheckIn = (data: {
    personnelId: string;
    unit: string;
    counselor: string;
    dateTime: string;
    type: string;
    notes: string;
  }) => {
    soundFx.playSuccess();
    const newIntervention: WelfareIntervention = {
      id: `INT-${Math.floor(100 + Math.random() * 900)}`,
      personnelOrGroup: `${data.personnelId} (${data.type})`,
      unit: data.unit,
      riskLevel: 'Moderate',
      title: `${data.type} with ${data.personnelId}`,
      recommendation: data.notes,
      assignedTo: data.counselor,
      status: 'Scheduled',
      date: data.dateTime.replace('T', ' at '),
      notes: data.notes,
      type: 'Welfare Check-In'
    };

    setInterventions(prev => [newIntervention, ...prev]);
    showToast(`Confidential check-in scheduled for ${data.personnelId} and registered in Intervention Center`, 'success');
  };

  // Handler: Update Intervention Status
  const handleUpdateInterventionStatus = (id: string, newStatus: WelfareIntervention['status']) => {
    soundFx.playSuccess();
    setInterventions(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    showToast(`Intervention ${id} marked as "${newStatus}"`, 'success');
  };

  // Titles mapping
  const pageDetails: Record<string, { title: string; subtitle: string }> = {
    Overview: {
      title: 'Personnel Welfare Intelligence',
      subtitle: 'Real-time wellbeing insights • Predictive analytics • Early intervention'
    },
    Personnel: {
      title: 'Personnel Welfare Directory',
      subtitle: 'Individual wellness profiles, duty telemetry, and confidential support records'
    },
    AIRisk: {
      title: 'AI Predictive Risk Intelligence',
      subtitle: '7-Day & 30-Day predictive horizons, SHAP-derived factors, and risk migration'
    },
    StressAnalytics: {
      title: 'Personnel Stress & Workload Analytics',
      subtitle: 'Longitudinal telemetry, workload-to-stress regression, and unit benchmarks'
    },
    FatigueMonitoring: {
      title: 'Circadian Fatigue & Sleep Deficit Monitoring',
      subtitle: 'Sleep window analysis, recovery replenishment, and 72-hour risk horizon'
    },
    WelfareSupport: {
      title: 'Welfare & Psychological Support Center',
      subtitle: 'Confidential 1-on-1 check-ins, peer facilitators, and clinical referrals'
    },
    Alerts: {
      title: 'Early Warning Alert Dispatch',
      subtitle: 'Near-real-time triage and escalation feed • auto-refreshes every 5 seconds'
    },
    InterventionCenter: {
      title: 'Welfare Intervention Management',
      subtitle: 'Proactive rest buffer authorization and support workflow tracking'
    },
    ReportsInsights: {
      title: 'Intelligence Reports & Executive Dossiers',
      subtitle: 'Compliant welfare summaries, period audits, and exportable documentation'
    },
    AIAssistant: {
      title: 'Welfare Intelligence Assistant',
      subtitle: 'Natural language queries for aggregated personnel wellbeing trends'
    },
    Settings: {
      title: 'System Governance & Privacy Controls',
      subtitle: 'Ethical safeguards, role-based access segregation, and audit ledgers'
    }
  };

  const unackAlerts = alerts.filter(a => a.status === 'Active' && a.isNew).length;
  const pendingInterventions = interventions.filter(i => i.status === 'Recommended' || i.status === 'Scheduled').length;

  // Reusable NavItems array
  const sharedNavItems: NavItem[] = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'Personnel', label: 'Personnel', icon: Users },
    { id: 'AIRisk', label: 'AI Risk Prediction', icon: BrainCircuit, badge: 'Horizon 7d', badgeColor: 'bg-violet-500/20 text-violet-300' },
    { id: 'StressAnalytics', label: 'Stress Analytics', icon: Activity },
    { id: 'FatigueMonitoring', label: 'Fatigue Monitoring', icon: BatteryCharging },
    { id: 'WelfareSupport', label: 'Welfare & Support', icon: HeartHandshake },
    { 
      id: 'Alerts', 
      label: 'Alerts', 
      icon: AlertTriangle, 
      badge: unackAlerts > 0 ? unackAlerts : undefined, 
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30' 
    },
    { 
      id: 'InterventionCenter', 
      label: 'Intervention Center', 
      icon: LifeBuoy,
      badge: pendingInterventions > 0 ? pendingInterventions : undefined,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    },
    { id: 'ReportsInsights', label: 'Reports & Insights', icon: FileText },
    { id: 'AIAssistant', label: 'AI Assistant', icon: Bot, badge: 'Active', badgeColor: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'Settings', label: 'Settings', icon: Settings }
  ];

  // If not authenticated, show futuristic login gateway
  if (!isAuthenticated || !currentUser) {
  return (
    <LoginView
      initialUser={currentUser}
      onLoginSuccess={(user) => {
        setCurrentUser(user);
        setIsAuthenticated(true);
        setActiveTab('Overview');
        showToast(`Welcome, ${user.name} (${user.role})`, 'success');
      }}
    />
  );
}
if (currentUser.role === 'Personnel User') {
  return (
    <UserDashboardPage
      currentUser={currentUser}
      wellnessUpdates={wellnessUpdates}
      onSubmitWellnessUpdate={(update: WellnessUpdate) => {
        setWellnessUpdates((prev) => [update, ...prev]);

        showToast(
          'Daily wellness update submitted. AI analysis is now pending employee review.',
          'success'
        );
      }}
      onLogout={() => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setActiveTab('Overview');
      }}
    />
  );
}

  const currentDetails = pageDetails[activeTab] || pageDetails.Overview;

  return (
    <div
  className={`employee-dashboard min-h-screen flex relative cyber-grid antialiased ${
    theme === 'light' ? 'theme-light' : 'theme-dark'
  }`}
>
  <style>{EMPLOYEE_THEME_STYLES}</style>
      {/* Ambient neural canvas background */}
      <NeuralCanvas />

      {/* Ambient background glow layers */}
      <div className="ambient-glow" />

      {/* Mobile Drawer (Visible on small screens when triggered) */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={sharedNavItems}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        currentUser={currentUser}
        onLogout={() => setIsAuthenticated(false)}
      />

      {/* Desktop Sidebar (Hidden in Hackathon Presentation Mode) */}
      {!presentationMode && (
        <div className="hidden md:flex flex-shrink-0">
          <Sidebar
            activeTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
            currentUser={currentUser}
            unacknowledgedAlertsCount={unackAlerts}
            pendingInterventionsCount={pendingInterventions}
            onLogout={() => {
  setIsAuthenticated(false);
  setCurrentUser(null);
  setActiveTab('Overview');
}}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen z-10">
        {/* Presentation Mode Top Bar (When Active) */}
        {presentationMode && (
          <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-b border-cyan-500/40 px-6 py-2.5 flex items-center justify-between z-30">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-cyan-300 tracking-wider uppercase">
                HACKATHON PRESENTATION MODE • FULLSCREEN JUDGE VIEW
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* Quick Tab switcher for presentation */}
              <div className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                {['Overview', 'Personnel', 'AIRisk', 'StressAnalytics', 'FatigueMonitoring', 'InterventionCenter', 'AIAssistant'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveTab(tab);
                    }}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeTab === tab ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowJudgePitch(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-600/30 border border-violet-500/50 text-violet-200 text-xs font-mono hover:text-white"
              >
                <Award className="w-3.5 h-3.5 text-violet-400" />
                <span>Judge Brief</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setPresentationMode(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono shadow-md shadow-cyan-500/30"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Presentation</span>
              </button>
            </div>
          </div>
        )}

        {/* Top Navbar */}
        <TopNavbar
          pageTitle={currentDetails.title}
          pageSubtitle={currentDetails.subtitle}
          presentationMode={presentationMode}
          onTogglePresentationMode={() => setPresentationMode(!presentationMode)}
          alerts={alerts}
          currentUser={currentUser}
          onLogout={() => {
            setIsAuthenticated(false);
            setCurrentUser(null);
            setActiveTab('Overview');
          }}
          onSelectAlert={(a) => setInvestigatingAlert(a)}
          onNavigate={(p) => setActiveTab(p)}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenJudgePitch={() => setShowJudgePitch(true)}
          isSimulatingLive={isSimulatingLive}
          onToggleSimulateLive={() => {
            const next = !isSimulatingLive;
            setIsSimulatingLive(next);
            showToast(next ? 'Live telemetry stream simulation started' : 'Live simulation paused', 'info');
          }}
        />

        {/* Dynamic Page Routing */}
        <main className={`flex-1 px-4 lg:px-8 py-6 transition-all ${presentationMode ? 'max-w-[1600px] mx-auto w-full' : ''}`}>
          {activeTab === 'Overview' && (
            <OverviewPage
              personnelList={personnelList}
              alerts={alerts}
              onSelectPersonnel={(p) => setSelectedPersonnel(p)}
              onSelectAlert={(a) => setInvestigatingAlert(a)}
              onOpenExportModal={() => {
                setExportModalReport(null);
                setShowExportModal(true);
              }}
              onNavigate={(page) => setActiveTab(page)}
              onOpenScheduleModal={(p) => setScheduleCheckInTarget(p)}
            />
          )}

          {activeTab === 'Personnel' && (
            <PersonnelPage
              personnelList={personnelList}
              onSelectPersonnel={(p) => setSelectedPersonnel(p)}
              onOpenScheduleModal={(p) => setScheduleCheckInTarget(p)}
            />
          )}

          {activeTab === 'AIRisk' && <AIRiskPage />}

          {activeTab === 'StressAnalytics' && <StressAnalyticsPage />}

          {activeTab === 'FatigueMonitoring' && (
            <FatigueMonitoringPage
              personnelList={personnelList}
              onSelectPersonnel={(p) => setSelectedPersonnel(p)}
              onOpenScheduleModal={(p) => setScheduleCheckInTarget(p)}
            />
          )}

          {activeTab === 'WelfareSupport' && (
            <WelfareSupportPage
              onOpenDirectCheckIn={() => setScheduleCheckInTarget(personnelList[0])}
            />
          )}

          {activeTab === 'Alerts' && (
            <AlertCenterPage
              alerts={alerts}
              onSelectAlert={(a) => setInvestigatingAlert(a)}
              onUpdateAlertStatus={handleUpdateAlertStatus}
            />
          )}

          {activeTab === 'InterventionCenter' && (
            <InterventionCenterPage
              interventions={interventions}
              onUpdateStatus={handleUpdateInterventionStatus}
              personnelList={personnelList}
              onSelectPersonnel={(p) => setSelectedPersonnel(p)}
            />
          )}

          {activeTab === 'ReportsInsights' && (
            <ReportsInsightsPage
              onOpenExportModal={(rep) => {
                setExportModalReport(rep || null);
                setShowExportModal(true);
              }}
            />
          )}

          {activeTab === 'AIAssistant' && <AIAssistantPage />}

          {activeTab === 'Settings' && (
            <SettingsPage
              currentUser={currentUser}
              onUpdateUser={(updated) => {
                setCurrentUser(updated);
                showToast('Profile updated across platform', 'success');
              }}
            />
          )}
        </main>
      </div>

      {/* Personnel Wellness Profile Modal */}
      {selectedPersonnel && (
        <PersonnelModal
          personnel={selectedPersonnel}
          onClose={() => setSelectedPersonnel(null)}
          onScheduleCheckIn={(p) => {
            setSelectedPersonnel(null);
            setScheduleCheckInTarget(p);
          }}
        />
      )}

      {/* Schedule Check-In Modal */}
      {scheduleCheckInTarget && (
        <ScheduleCheckInModal
          personnel={scheduleCheckInTarget}
          onClose={() => setScheduleCheckInTarget(null)}
          onConfirm={handleConfirmScheduleCheckIn}
        />
      )}

      {/* Export Report Modal */}
      {showExportModal && (
        <ExportReportModal
          report={exportModalReport}
          onClose={() => {
            setShowExportModal(false);
            setExportModalReport(null);
          }}
        />
      )}

      {/* Alert Investigation Modal */}
      {investigatingAlert && (
        <AlertInvestigateModal
          alert={investigatingAlert}
          onClose={() => setInvestigatingAlert(null)}
          onUpdateStatus={handleUpdateAlertStatus}
        />
      )}

      {/* Judge Pitch & Architecture Modal */}
      {showJudgePitch && (
        <JudgePitchModal
          onClose={() => setShowJudgePitch(false)}
          onNavigateToTab={(t) => setActiveTab(t)}
        />
      )}

      {/* Global Interactive Action Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-xl border shadow-2xl text-xs font-mono animate-in fade-in slide-in-from-bottom-3 duration-200 ${
          toastMessage.type === 'alert'
            ? 'bg-amber-950/90 border-amber-500/50 text-amber-200 shadow-amber-950'
            : toastMessage.type === 'success'
            ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200 shadow-emerald-950'
            : 'bg-slate-900/95 border-cyan-500/50 text-cyan-200 shadow-cyan-950'
        }`}>
          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${
            toastMessage.type === 'alert' ? 'text-amber-400' :
            toastMessage.type === 'success' ? 'text-emerald-400' : 'text-cyan-400'
          }`} />
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
