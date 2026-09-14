import { StressTrendPoint, UnitComparisonMetric, WelfareReport } from '../types';

export const trendData24h: StressTrendPoint[] = [
  { time: '00:00', avgStress: 38, fatigue: 45, recovery: 82 },
  { time: '03:00', avgStress: 36, fatigue: 48, recovery: 80 },
  { time: '06:00', avgStress: 42, fatigue: 52, recovery: 76 },
  { time: '09:00', avgStress: 54, fatigue: 58, recovery: 71 },
  { time: '12:00', avgStress: 62, fatigue: 64, recovery: 65 },
  { time: '15:00', avgStress: 66, fatigue: 69, recovery: 62 },
  { time: '18:00', avgStress: 64, fatigue: 71, recovery: 64 },
  { time: '21:00', avgStress: 58, fatigue: 67, recovery: 69 },
  { time: '23:59', avgStress: 52, fatigue: 62, recovery: 74 }
];

export const trendData7d: StressTrendPoint[] = [
  { time: 'Mon', avgStress: 46, fatigue: 51, recovery: 79 },
  { time: 'Tue', avgStress: 49, fatigue: 54, recovery: 76 },
  { time: 'Wed', avgStress: 55, fatigue: 60, recovery: 71 },
  { time: 'Thu', avgStress: 61, fatigue: 66, recovery: 65 },
  { time: 'Fri', avgStress: 67, fatigue: 72, recovery: 60 },
  { time: 'Sat', avgStress: 58, fatigue: 65, recovery: 69 },
  { time: 'Sun', avgStress: 52, fatigue: 59, recovery: 75 }
];

export const trendData30d: StressTrendPoint[] = [
  { time: 'Week 1', avgStress: 48, fatigue: 52, recovery: 77 },
  { time: 'Week 2', avgStress: 52, fatigue: 57, recovery: 74 },
  { time: 'Week 3', avgStress: 63, fatigue: 68, recovery: 64 },
  { time: 'Week 4', avgStress: 54, fatigue: 60, recovery: 73 }
];

export const unitComparisonData: UnitComparisonMetric[] = [
  {
    unit: 'Unit Alpha',
    personnelCount: 340,
    avgWellness: 85.2,
    avgStress: 36.4,
    avgFatigue: 41.2,
    highRiskCount: 2,
    recoveryIndex: 82.5
  },
  {
    unit: 'Unit Bravo',
    personnelCount: 295,
    avgWellness: 78.4,
    avgStress: 54.1,
    avgFatigue: 58.7,
    highRiskCount: 6,
    recoveryIndex: 72.8
  },
  {
    unit: 'Unit Charlie',
    personnelCount: 310,
    avgWellness: 72.1,
    avgStress: 66.8,
    avgFatigue: 69.2,
    highRiskCount: 12,
    recoveryIndex: 64.1
  },
  {
    unit: 'Unit Delta',
    personnelCount: 203,
    avgWellness: 79.5,
    avgStress: 48.9,
    avgFatigue: 53.4,
    highRiskCount: 4,
    recoveryIndex: 76.3
  },
  {
    unit: 'Support Wing',
    personnelCount: 100,
    avgWellness: 88.0,
    avgStress: 31.2,
    avgFatigue: 36.5,
    highRiskCount: 0,
    recoveryIndex: 86.4
  }
];

export const workloadVsStressData = [
  { hours: 35, stress: 30, personnel: 180, label: 'Optimal Load' },
  { hours: 40, stress: 38, personnel: 420, label: 'Standard Shift' },
  { hours: 48, stress: 54, personnel: 310, label: 'Elevated Tempo' },
  { hours: 55, stress: 69, personnel: 220, label: 'High Demand' },
  { hours: 64, stress: 82, personnel: 86, label: 'Overload Critical' },
  { hours: 72, stress: 91, personnel: 32, label: 'Acute Risk' }
];

export const mockReportsList: WelfareReport[] = [
  {
    id: 'REP-2026-W37',
    title: 'Weekly Welfare Report',
    period: 'Sep 04 - Sep 11, 2026',
    generatedDate: 'Today, 18:45',
    summary: 'Aggregated personnel stress indicators displayed an upward variance of +4.2% across mid-week tactical drills, with primary recovery pressure localized in Unit Charlie and Unit Bravo comms elements.',
    wellnessIndex: 82.6,
    riskBreakdown: { low: 74.8, moderate: 18.3, high: 5.9, critical: 1.0 },
    keyFindings: [
      '74.8% of personnel maintain optimal physiological recovery and sustainable duty limits.',
      'Unit Charlie experienced the highest workload density (avg 61.2 hrs/wk) correlating with elevated fatigue in 12 personnel.',
      'Unit Alpha rest buffer trial yielded an 8% increase in recovery indicators, demonstrating efficacy of 12-hour turnarounds.',
      '14 active early warnings triaged; zero unacknowledged critical alerts exceeding 30-minute target.'
    ],
    recommendedInterventions: [
      'Approve secondary officer rotational support for Unit Charlie command tier.',
      'Expand 12-hour recovery buffer protocol to Unit Bravo night shift.',
      'Continue voluntary confidential counseling access across field units.'
    ]
  },
  {
    id: 'REP-2026-STR-AUG',
    title: 'Monthly Stress Analysis',
    period: 'August 2026',
    generatedDate: 'Sep 01, 2026',
    summary: 'Comprehensive 30-day evaluation of cognitive load velocity, physiological stress baseline variance, and duty tempo impacts across all 1,248 active uniformed personnel.',
    wellnessIndex: 81.4,
    riskBreakdown: { low: 73.2, moderate: 19.5, high: 6.1, critical: 1.2 },
    keyFindings: [
      'Strong correlation (r = 0.84) observed between duty shifts exceeding 50 hours and elevated stress spikes.',
      'Technical and communications personnel experienced the fastest stress normalization following duty rotation.',
      'Early alert triage reduced average acute stress duration from 96 hours to under 36 hours.'
    ],
    recommendedInterventions: [
      'Cap consecutive extended operational watch shifts at 4 continuous days.',
      'Encourage peer debrief sessions following multi-echelon readiness drills.'
    ]
  },
  {
    id: 'REP-2026-FAT-09',
    title: 'Fatigue Risk Report',
    period: 'Last 14 Days (Rolling Horizon)',
    generatedDate: 'Today, 08:30',
    summary: 'Circadian rhythm analysis, sleep debt calculations, and 72-hour predictive exhaustion modeling across active operational echelons.',
    wellnessIndex: 79.8,
    riskBreakdown: { low: 68.0, moderate: 21.0, high: 8.0, critical: 3.0 },
    keyFindings: [
      '112 personnel currently operate with reduced recovery windows (< 6 hours continuous rest).',
      '37 personnel projected to enter elevated fatigue risk within 72 hours without schedule intervention.',
      'Night-to-day watch inversion is the single largest predictor of cognitive latency.'
    ],
    recommendedInterventions: [
      'Enforce mandatory 12-hour post-shift quiet buffers for nocturnal duty personnel.',
      'Distribute circadian recovery guidance packs and optimize bunk lighting conditions.'
    ]
  },
  {
    id: 'REP-2026-UWC-01',
    title: 'Unit Wellness Comparison',
    period: 'Current Operational Quarter',
    generatedDate: 'Yesterday, 17:00',
    summary: 'Cross-echelon comparative benchmarking evaluating stress, fatigue velocity, and recovery index across Unit Alpha, Unit Bravo, Unit Charlie, and Unit Delta.',
    wellnessIndex: 83.5,
    riskBreakdown: { low: 75.6, moderate: 17.8, high: 5.4, critical: 1.2 },
    keyFindings: [
      'Unit Alpha achieved the highest average wellness index (88.4%) supported by regular 12-hour turnaround buffers.',
      'Unit Charlie exhibited elevated fatigue due to intense emergency response standby cycles.',
      'Support Wing and Unit Delta maintain balanced workloads with minimal critical incidents.'
    ],
    recommendedInterventions: [
      'Export Unit Alpha schedule management template as benchmark for Unit Charlie.',
      'Authorize inter-unit relief rotations during peak drill cycles.'
    ]
  },
  {
    id: 'REP-2026-INT-EVAL',
    title: 'Intervention Effectiveness',
    period: 'Q2 2026 (Post-Action Audit)',
    generatedDate: 'Aug 15, 2026',
    summary: 'Statistical assessment evaluating the impact of proactive welfare check-ins, sleep buffers, and workload rebalancing on personnel operational readiness.',
    wellnessIndex: 85.9,
    riskBreakdown: { low: 79.1, moderate: 15.4, high: 4.5, critical: 1.0 },
    keyFindings: [
      '89% of personnel who underwent confidential welfare check-ins showed risk stabilization within 10 days.',
      'Proactive workload adjustments reduced critical burnout indicators by 41% compared to historic non-AI baselines.',
      'Zero disciplinary interventions initiated; all positive adaptations achieved through support pathways.'
    ],
    recommendedInterventions: [
      'Sustain AI-driven proactive trigger thresholds without modification.',
      'Commend unit welfare liaisons for rapid response compliance.'
    ]
  }
];
