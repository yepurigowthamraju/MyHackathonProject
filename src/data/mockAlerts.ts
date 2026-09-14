import { EarlyWarningAlert } from '../types';

export const mockAlertsList: EarlyWarningAlert[] = [
  {
    id: 'ALT-8841',
    severity: 'High',
    title: 'Elevated Stress Pattern',
    description: 'Unit Bravo shows a 17% increase in stress indicators over the previous 7 days.',
    affectedGroup: 'Unit Bravo • Operational Watch',
    timestamp: '14 minutes ago',
    status: 'Active',
    aiConfidence: 94,
    recommendedAction: 'Review unit workload distribution and initiate voluntary group wellness check-in.',
    riskType: 'Elevated Stress Pattern'
  },
  {
    id: 'ALT-8839',
    severity: 'Critical',
    title: 'Fatigue Accumulation',
    description: 'Several personnel show reduced recovery trends.',
    affectedGroup: 'Unit Charlie • 12 Personnel Cohort',
    timestamp: '28 minutes ago',
    status: 'Active',
    aiConfidence: 96,
    recommendedAction: 'Authorize immediate 12-hour recovery buffers and review night-shift rotations.',
    riskType: 'Fatigue Accumulation'
  },
  {
    id: 'ALT-8819',
    severity: 'Info',
    title: 'Recovery Improvement',
    description: 'Unit Alpha wellness indicators improved by 8% after schedule adjustment.',
    affectedGroup: 'Unit Alpha • Main Company',
    timestamp: '2 hours ago',
    status: 'Resolved',
    aiConfidence: 98,
    recommendedAction: 'Maintain current shift turnaround standards and record protocol success.',
    riskType: 'Recovery Improvement'
  },
  {
    id: 'ALT-8835',
    severity: 'Critical',
    title: 'Acute Fatigue & Sleep Debt Warning',
    description: 'Field Medic (P-1205) indicates sharp drop in recovery score over 72h coupled with consecutive 18h shifts.',
    affectedGroup: 'Unit Charlie • 1 Critical Personnel',
    timestamp: '3 hours ago',
    status: 'Acknowledged',
    aiConfidence: 98,
    recommendedAction: 'Immediate duty relief, rest protocol authorization, and supervisor welfare briefing.',
    riskType: 'Fatigue Accumulation'
  },
  {
    id: 'ALT-8828',
    severity: 'Moderate',
    title: 'Shift Overload Warning',
    description: 'Unit Alpha field patrol group shows elevated 24h fatigue velocity. Workload indicators exceed median threshold by 22%.',
    affectedGroup: 'Unit Alpha • Alpha Squad 2',
    timestamp: '3 hours ago',
    status: 'Under Investigation',
    aiConfidence: 89,
    recommendedAction: 'Offer recovery optimization and micro-break distribution intervals.',
    riskType: 'Shift Overload'
  },
  {
    id: 'ALT-8819',
    severity: 'Info',
    title: 'Positive Recovery Stabilization Noted',
    description: 'Unit Alpha wellness indicators improved by 8% following the implementation of the new 12-hour rest buffer protocol.',
    affectedGroup: 'Unit Alpha • Main Base Company',
    timestamp: '5 hours ago',
    status: 'Resolved',
    aiConfidence: 96,
    recommendedAction: 'Document protocol efficacy in weekly welfare review.',
    riskType: 'Elevated Stress Pattern'
  },
  {
    id: 'ALT-8812',
    severity: 'Moderate',
    title: 'Night Shift Transition Latency',
    description: 'Unit Bravo radar operators showing delayed circadian synchronization after rotating from day to graveyard watch.',
    affectedGroup: 'Unit Bravo • Night Watch (6 Personnel)',
    timestamp: '7 hours ago',
    status: 'Acknowledged',
    aiConfidence: 87,
    recommendedAction: 'Distribute sleep hygiene checklists and adjust illumination protocol.',
    riskType: 'Fatigue Accumulation'
  },
  {
    id: 'ALT-8804',
    severity: 'Critical',
    title: 'Multi-Factor Stress Confluence',
    description: 'Unit Charlie lead officer (P-0834) displaying high stress (82/100) and elevated fatigue (79/100) across 64 weekly duty hours.',
    affectedGroup: 'Unit Charlie • Command Staff',
    timestamp: '9 hours ago',
    status: 'Under Investigation',
    aiConfidence: 96,
    recommendedAction: 'Facilitate secondary officer delegation and confidential counseling referral.',
    riskType: 'Elevated Stress Pattern'
  }
];
