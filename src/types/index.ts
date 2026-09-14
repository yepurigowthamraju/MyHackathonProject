// Common TypeScript interfaces for the Welfare Intelligence Platform

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';
export type TrendDirection = 'up' | 'down' | 'stable';

export interface PersonnelRecord {
  id: string; // e.g. P-1042
  unit: string; // e.g. Unit Alpha
  role: string; // e.g. Field Officer
  wellnessScore: number; // 0-100
  stressIndicator: number; // 0-100
  fatigueIndicator: number; // 0-100
  recoveryScore: number; // 0-100
  stressRisk: RiskLevel;
  fatigueRisk: RiskLevel;
  overallRisk: RiskLevel;
  trend: TrendDirection;
  aiConfidence: number; // e.g. 93%
  lastCheckIn: string; // e.g. "12 min ago"
  dutyType: 'Active Field' | 'Technical / Ops' | 'Command & Comms' | 'Logistics & Support';
  weeklyDutyHours: number;
  sleepAverageHours: number;
  potentialFactors: string[];
  recommendedActions: string[];
  forecast: {
    next24h: RiskLevel;
    next72h: RiskLevel;
    next7d: RiskLevel;
  };
  historicalTrend: {
    timestamp: string;
    stress: number;
    fatigue: number;
    recovery: number;
    workload: number;
  }[];
}

export interface EarlyWarningAlert {
  id: string;
  severity: 'Critical' | 'High' | 'Moderate' | 'Info';
  title: string;
  description: string;
  affectedGroup: string; // e.g. "Unit Bravo - 14 Personnel"
  timestamp: string;
  status: 'Active' | 'Acknowledged' | 'Under Investigation' | 'Resolved';
  aiConfidence: number;
  recommendedAction: string;
  riskType: 'Elevated Stress Pattern' | 'Fatigue Accumulation' | 'Recovery Depletion' | 'Shift Overload' | 'Recovery Improvement';
}

export interface WelfareIntervention {
  id: string;
  personnelOrGroup: string;
  unit: string;
  riskLevel: RiskLevel;
  title: string;
  recommendation: string;
  assignedTo: string;
  status: 'Recommended' | 'Scheduled' | 'In Progress' | 'Completed';
  date: string;
  notes?: string;
  type: 'Welfare Check-In' | 'Recovery Optimization' | 'Workload Review' | 'Peer Support' | 'Counseling Referral';
}

export interface StressTrendPoint {
  time: string;
  avgStress: number;
  fatigue: number;
  recovery: number;
}

export interface UnitComparisonMetric {
  unit: string;
  personnelCount: number;
  avgWellness: number;
  avgStress: number;
  avgFatigue: number;
  highRiskCount: number;
  recoveryIndex: number;
}

export interface WelfareReport {
  id: string;
  title: string;
  period: string;
  generatedDate: string;
  summary: string;
  wellnessIndex: number;
  riskBreakdown: {
    low: number;
    moderate: number;
    high: number;
    critical: number;
  };
  keyFindings: string[];
  recommendedInterventions: string[];
}

export interface UserProfile {
  id: string; // e.g. WA-9042
  name: string; // e.g. "Capt. Alex Vance"
  email: string; // e.g. "alex.vance@welfare.mil"
  unit: string; // e.g. "Joint Command Directorate"
  role: string; // e.g. "Welfare Administrator"
  rankTitle: string; // e.g. "Captain" / "Major" / "Civilian Specialist"
  securityClearance: string; // e.g. "Tier 3 - Welfare Confidential"
  lastLogin: string;
  avatarInitials: string;
}
export type WellnessMood =
  | 'Excellent'
  | 'Good'
  | 'Okay'
  | 'Low';

export type WellnessVerificationStatus =
  | 'Pending'
  | 'Verified'
  | 'Dismissed';

export type NotificationStatus =
  | 'Not Sent'
  | 'Sent';

export interface WellnessUpdate {
  id: string;
  personnelId: string;
  date: string;

  bodyWeight?: number;
  waterIntake?: number;
  meals: string;

  sleepHours: number;
  sleepQuality: 'Poor' | 'Fair' | 'Good' | 'Excellent';

  exercise: string;

  stressLevel: number;
  fatigueLevel: number;

  mood: WellnessMood;
  energyLevel: number;

  restRecovery: string;
  notes: string;

  aiRisk: RiskLevel;
  aiConfidence: number;

  humanVerification: WellnessVerificationStatus;
  notificationStatus: NotificationStatus;
}
