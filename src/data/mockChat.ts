export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  metrics?: {
    label: string;
    value: string;
    badge?: string;
    color?: string;
  }[];
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
  };
  recommendations?: string[];
}

export const cannedPromptSuggestions = [
  'Which units show increasing fatigue trends?',
  'What are the major risk patterns this week?',
  'Show personnel groups requiring attention.',
  'Compare this month’s wellness trend with last month.',
  'What interventions have shown improvement?',
  'Summarize today’s welfare alerts.'
];

export const mockChatKnowledgeBase: Record<string, {
  summary: string;
  metrics?: { label: string; value: string; badge?: string; color?: string }[];
  tableData?: { headers: string[]; rows: (string | number)[][] };
  recommendations?: string[];
}> = {
  'Which units show increasing fatigue trends?': {
    summary: 'Based on the past 7 days of aggregated biometric and shift analytics, **Unit Charlie** and **Unit Bravo** exhibit the steepest upward fatigue trajectory. Unit Charlie is currently tracking a 14.8% increase in cumulative fatigue velocity, primarily correlated with continuous tactical command exercises.',
    metrics: [
      { label: 'Unit Charlie Avg Fatigue', value: '69.2 / 100', badge: 'High Risk', color: 'text-amber-400' },
      { label: 'Unit Bravo Fatigue Trend', value: '+9.4% velocity', badge: 'Elevated', color: 'text-amber-400' },
      { label: 'Personnel at Risk', value: '18 members', badge: 'Welfare Review', color: 'text-cyan-400' }
    ],
    tableData: {
      headers: ['Unit', 'Personnel Count', 'Avg Fatigue', 'Recovery Deficit', 'Status'],
      rows: [
        ['Unit Charlie', '310', '69.2', '-28%', 'Elevated Attention'],
        ['Unit Bravo', '295', '58.7', '-16%', 'Moderate Watch'],
        ['Unit Delta', '203', '53.4', '-6%', 'Stable'],
        ['Unit Alpha', '340', '41.2', '+12%', 'Optimal Recovery']
      ]
    },
    recommendations: [
      'Implement 12-hour mandatory rest buffers for Unit Charlie leadership echelons.',
      'Authorize rotational support from Unit Alpha to balance emergency watch coverage.',
      'Deploy voluntary sleep recovery guidance packs to Unit Bravo operations quarters.'
    ]
  },
  'What are the major risk patterns this week?': {
    summary: 'The primary risk pattern this week centers around **consecutive nighttime on-call rotations** coupled with reduced post-shift recovery intervals. The AI model identified that personnel with less than 6 hours of sleep over 3 continuous shifts showed a 3.4x spike in acute fatigue indicators.',
    metrics: [
      { label: 'Primary Contributor', value: 'Shift Density (>55h/wk)', badge: 'Dominant Factor', color: 'text-amber-400' },
      { label: 'Affected Subgroups', value: 'Medics & Comms Analysts', badge: '2 Critical', color: 'text-rose-400' },
      { label: 'Overall Welfare Index', value: '82.6%', badge: 'Stable Baseline', color: 'text-emerald-400' }
    ],
    recommendations: [
      'Limit continuous on-call readiness to 14 consecutive hours before required relief.',
      'Conduct confidential check-ins for personnel logging >55 weekly duty hours.',
      'Ensure warm meal availability and quiet sleep pods during night operations.'
    ]
  },
  'Show personnel groups requiring attention.': {
    summary: 'Currently, **6 personnel records** have triggered priority welfare indicators requiring proactive supervisor review. All indicators are non-punitive decision-support markers aimed at early rest and wellness intervention.',
    tableData: {
      headers: ['Personnel ID', 'Unit', 'Role', 'Stress', 'Fatigue', 'Recommended Action'],
      rows: [
        ['P-1205', 'Unit Charlie', 'Field Medic', '89', '86', 'Immediate Rest Stand-Down'],
        ['P-0834', 'Unit Charlie', 'Officer', '82', '79', 'Workload Delegation & Debrief'],
        ['P-0921', 'Unit Delta', 'Logistics Lead', '71', '75', 'Physical Therapy & Shift Balancing'],
        ['P-1042', 'Unit Alpha', 'Field Officer', '68', '72', 'Confidential 1-on-1 Check-In'],
        ['P-0671', 'Unit Bravo', 'Comms Analyst', '59', '62', 'Ergonomic Micro-Breaks'],
        ['P-1178', 'Unit Bravo', 'Technician', '52', '58', 'Rotational Evening Shift Relief']
      ]
    },
    recommendations: [
      'Prioritize P-1205 and P-0834 for immediate command welfare authorization.',
      'Ensure supervisory discussions remain strictly supportive and confidential.'
    ]
  },
  'Compare this month’s wellness trend with last month.': {
    summary: 'Overall personnel wellness index increased by **+4.2%** from 78.4% last month to **82.6%** this month. The improvement is attributed to the deployment of the automated 12-hour recovery buffer protocol and early shift rotation adjustments.',
    metrics: [
      { label: 'Current Wellness Index', value: '82.6%', badge: '+4.2% Delta', color: 'text-emerald-400' },
      { label: 'Burnout Warnings', value: '-31% reduction', badge: 'Positive Impact', color: 'text-emerald-400' },
      { label: 'Check-In Completion', value: '94.8%', badge: 'Compliant', color: 'text-cyan-400' }
    ],
    recommendations: [
      'Sustain early warning threshold sensitivity without relaxation.',
      'Share cross-unit recovery best practices from Unit Alpha to Unit Charlie.'
    ]
  },
  'What interventions have shown improvement?': {
    summary: 'Analysis of completed welfare interventions reveals that **12-Hour Rest Buffer Adjustments** and **Confidential Peer Support Debriefs** achieved the highest recovery velocity, resulting in an average 24-point reduction in acute fatigue indicators within 72 hours.',
    tableData: {
      headers: ['Intervention Type', 'Cases', 'Efficacy Rate', 'Avg Time to Normalization'],
      rows: [
        ['12-Hour Rest Buffers', '24 cohorts', '94.2%', '48 - 72 Hours'],
        ['Confidential Welfare Check-Ins', '38 personnel', '89.5%', '3 - 5 Days'],
        ['Workload Redistribution', '14 teams', '86.1%', '5 - 7 Days'],
        ['Ergonomic & Light Spectrum Protocol', '8 stations', '82.0%', 'Instant relief']
      ]
    },
    recommendations: [
      'Formalize the 12-Hour Rest Buffer as standard operating procedure across all night watches.',
      'Expand peer-support facilitator training to logistics and medical detachments.'
    ]
  },
  'Summarize today’s welfare alerts.': {
    summary: 'Today there are **7 active early warnings**: 2 Critical, 2 High, 2 Moderate, and 1 Info notification. The critical alerts involve Field Medic P-1205 and Lead Officer P-0834 in Unit Charlie due to acute duty tempo.',
    metrics: [
      { label: 'Critical Alerts', value: '2 Active', badge: 'Immediate Review', color: 'text-rose-400' },
      { label: 'High Priority', value: '2 Pending', badge: 'Action Required', color: 'text-amber-400' },
      { label: 'Avg Triage Response', value: '14.2 minutes', badge: 'Target Met', color: 'text-cyan-400' }
    ],
    recommendations: [
      'Open the Alert Center to acknowledge ALT-8841 and ALT-8804.',
      'Ensure psychological support team is placed on standby for the Unit Charlie stand-down.'
    ]
  }
};
