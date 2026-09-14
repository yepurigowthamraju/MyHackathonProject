import { PersonnelRecord, UserProfile } from '../types';

export const mockPersonnelList: PersonnelRecord[] = [
  {
    id: 'P-1042',
    unit: 'Unit Alpha',
    role: 'Field Officer',
    wellnessScore: 61,
    stressIndicator: 68,
    fatigueIndicator: 72,
    recoveryScore: 54,
    stressRisk: 'Moderate',
    fatigueRisk: 'High',
    overallRisk: 'Moderate',
    trend: 'up',
    aiConfidence: 93,
    lastCheckIn: '12 min ago',
    dutyType: 'Active Field',
    weeklyDutyHours: 58,
    sleepAverageHours: 5.2,
    potentialFactors: [
      'Increased operational workload over the past 5 consecutive shifts',
      'Reduced post-shift recovery interval (< 7 hours resting window)',
      'Irregular nighttime duty transition patterns'
    ],
    recommendedActions: [
      'Schedule a confidential 1-on-1 welfare check-in with the unit welfare officer',
      'Institute mandatory 12-hour recovery schedule adjustment',
      'Provide voluntary access to sleep hygiene and peer support resources'
    ],
    forecast: {
      next24h: 'Moderate',
      next72h: 'High',
      next7d: 'Moderate'
    },
    historicalTrend: [
      { timestamp: 'Day -6', stress: 44, fatigue: 48, recovery: 78, workload: 40 },
      { timestamp: 'Day -5', stress: 52, fatigue: 55, recovery: 70, workload: 48 },
      { timestamp: 'Day -4', stress: 58, fatigue: 60, recovery: 64, workload: 52 },
      { timestamp: 'Day -3', stress: 62, fatigue: 66, recovery: 58, workload: 56 },
      { timestamp: 'Day -2', stress: 65, fatigue: 69, recovery: 55, workload: 58 },
      { timestamp: 'Yesterday', stress: 67, fatigue: 70, recovery: 54, workload: 60 },
      { timestamp: 'Today', stress: 68, fatigue: 72, recovery: 54, workload: 58 }
    ]
  },
  {
    id: 'P-1178',
    unit: 'Unit Bravo',
    role: 'Technician',
    wellnessScore: 74,
    stressIndicator: 52,
    fatigueIndicator: 58,
    recoveryScore: 68,
    stressRisk: 'Moderate',
    fatigueRisk: 'Moderate',
    overallRisk: 'Moderate',
    trend: 'stable',
    aiConfidence: 91,
    lastCheckIn: '27 min ago',
    dutyType: 'Technical / Ops',
    weeklyDutyHours: 46,
    sleepAverageHours: 6.4,
    potentialFactors: [
      'Extended diagnostic bench shifts during equipment turnaround',
      'Mild shift in sleep regularity detected over last 4 days'
    ],
    recommendedActions: [
      'Rotational duty reassignment for evening shifts',
      'Offer ergonomic station review and recovery guidance'
    ],
    forecast: {
      next24h: 'Moderate',
      next72h: 'Moderate',
      next7d: 'Low'
    },
    historicalTrend: [
      { timestamp: 'Day -6', stress: 50, fatigue: 52, recovery: 72, workload: 44 },
      { timestamp: 'Day -5', stress: 51, fatigue: 54, recovery: 70, workload: 45 },
      { timestamp: 'Day -4', stress: 54, fatigue: 56, recovery: 69, workload: 47 },
      { timestamp: 'Day -3', stress: 53, fatigue: 57, recovery: 68, workload: 46 },
      { timestamp: 'Day -2', stress: 52, fatigue: 59, recovery: 67, workload: 48 },
      { timestamp: 'Yesterday', stress: 52, fatigue: 58, recovery: 68, workload: 46 },
      { timestamp: 'Today', stress: 52, fatigue: 58, recovery: 68, workload: 46 }
    ]
  },
  {
    id: 'P-0834',
    unit: 'Unit Charlie',
    role: 'Officer',
    wellnessScore: 48,
    stressIndicator: 82,
    fatigueIndicator: 79,
    recoveryScore: 42,
    stressRisk: 'High',
    fatigueRisk: 'High',
    overallRisk: 'High',
    trend: 'up',
    aiConfidence: 96,
    lastCheckIn: '8 min ago',
    dutyType: 'Command & Comms',
    weeklyDutyHours: 64,
    sleepAverageHours: 4.8,
    potentialFactors: [
      'High-tempo coordination responsibility with multiple overlapping deadlines',
      'Severe deficit in consecutive resting periods (< 5 hours average rest)',
      'Sustained cognitive workload across last 10 days'
    ],
    recommendedActions: [
      'Immediate supervisor briefing to facilitate secondary officer delegation',
      'Confidential welfare check-in with certified military wellness counselor',
      'Mandatory 36-hour decompression stand-down'
    ],
    forecast: {
      next24h: 'High',
      next72h: 'Critical',
      next7d: 'High'
    },
    historicalTrend: [
      { timestamp: 'Day -6', stress: 62, fatigue: 60, recovery: 60, workload: 50 },
      { timestamp: 'Day -5', stress: 68, fatigue: 66, recovery: 55, workload: 56 },
      { timestamp: 'Day -4', stress: 72, fatigue: 70, recovery: 50, workload: 60 },
      { timestamp: 'Day -3', stress: 76, fatigue: 74, recovery: 47, workload: 62 },
      { timestamp: 'Day -2', stress: 79, fatigue: 77, recovery: 44, workload: 63 },
      { timestamp: 'Yesterday', stress: 81, fatigue: 78, recovery: 43, workload: 64 },
      { timestamp: 'Today', stress: 82, fatigue: 79, recovery: 42, workload: 64 }
    ]
  },
  {
    id: 'P-0921',
    unit: 'Unit Delta',
    role: 'Logistics Lead',
    wellnessScore: 53,
    stressIndicator: 71,
    fatigueIndicator: 75,
    recoveryScore: 49,
    stressRisk: 'High',
    fatigueRisk: 'High',
    overallRisk: 'High',
    trend: 'up',
    aiConfidence: 94,
    lastCheckIn: '35 min ago',
    dutyType: 'Logistics & Support',
    weeklyDutyHours: 61,
    sleepAverageHours: 5.0,
    potentialFactors: [
      'Continuous supply chain re-routing during multi-echelon deployment drill',
      'Cumulative physical fatigue and irregular nutritional intake intervals'
    ],
    recommendedActions: [
      'Workload rebalancing with logistics secondary tier',
      'Recommend scheduled nutritional and physical therapy check-in'
    ],
    forecast: {
      next24h: 'High',
      next72h: 'High',
      next7d: 'Moderate'
    },
    historicalTrend: [
      { timestamp: 'Day -6', stress: 55, fatigue: 58, recovery: 66, workload: 48 },
      { timestamp: 'Day -5', stress: 60, fatigue: 63, recovery: 61, workload: 52 },
      { timestamp: 'Day -4', stress: 65, fatigue: 68, recovery: 57, workload: 55 },
      { timestamp: 'Day -3', stress: 68, fatigue: 71, recovery: 53, workload: 58 },
      { timestamp: 'Day -2', stress: 70, fatigue: 73, recovery: 51, workload: 60 },
      { timestamp: 'Yesterday', stress: 70, fatigue: 74, recovery: 50, workload: 61 },
      { timestamp: 'Today', stress: 71, fatigue: 75, recovery: 49, workload: 61 }
    ]
  },
  {
    id: 'P-0452',
    unit: 'Unit Alpha',
    role: 'Tactical Specialist',
    wellnessScore: 88,
    stressIndicator: 28,
    fatigueIndicator: 32,
    recoveryScore: 89,
    stressRisk: 'Low',
    fatigueRisk: 'Low',
    overallRisk: 'Low',
    trend: 'down',
    aiConfidence: 97,
    lastCheckIn: '1 hour ago',
    dutyType: 'Active Field',
    weeklyDutyHours: 39,
    sleepAverageHours: 7.8,
    potentialFactors: [
      'Optimal recovery cycle following completed leave rotation',
      'Consistent physical baseline and balanced workload distribution'
    ],
    recommendedActions: [
      'Maintain current rotational schedule and recovery protocol'
    ],
    forecast: {
      next24h: 'Low',
      next72h: 'Low',
      next7d: 'Low'
    },
    historicalTrend: [
      { timestamp: 'Day -6', stress: 36, fatigue: 40, recovery: 82, workload: 40 },
      { timestamp: 'Day -5', stress: 34, fatigue: 38, recovery: 84, workload: 40 },
      { timestamp: 'Day -4', stress: 32, fatigue: 36, recovery: 86, workload: 39 },
      { timestamp: 'Day -3', stress: 30, fatigue: 34, recovery: 87, workload: 39 },
      { timestamp: 'Day -2', stress: 29, fatigue: 33, recovery: 88, workload: 39 },
      { timestamp: 'Yesterday', stress: 28, fatigue: 32, recovery: 89, workload: 39 },
      { timestamp: 'Today', stress: 28, fatigue: 32, recovery: 89, workload: 39 }
    ]
  },
  {
    id: 'P-0671',
    unit: 'Unit Bravo',
    role: 'Comms Analyst',
    wellnessScore: 66,
    stressIndicator: 59,
    fatigueIndicator: 62,
    recoveryScore: 61,
    stressRisk: 'Moderate',
    fatigueRisk: 'Moderate',
    overallRisk: 'Moderate',
    trend: 'stable',
    aiConfidence: 92,
    lastCheckIn: '18 min ago',
    dutyType: 'Command & Comms',
    weeklyDutyHours: 49,
    sleepAverageHours: 6.1,
    potentialFactors: [
      'Prolonged visual monitoring and sedentary night posture',
      'Elevated task switching frequency during operational changeovers'
    ],
    recommendedActions: [
      'Implement scheduled 10-minute micro-breaks during watch periods',
      'Supervisor check on watch rotation balance'
    ],
    forecast: {
      next24h: 'Moderate',
      next72h: 'Moderate',
      next7d: 'Low'
    },
    historicalTrend: [
      { timestamp: 'Day -6', stress: 58, fatigue: 60, recovery: 63, workload: 48 },
      { timestamp: 'Day -5', stress: 59, fatigue: 61, recovery: 62, workload: 49 },
      { timestamp: 'Day -4', stress: 60, fatigue: 63, recovery: 60, workload: 50 },
      { timestamp: 'Day -3', stress: 58, fatigue: 62, recovery: 62, workload: 49 },
      { timestamp: 'Day -2', stress: 59, fatigue: 61, recovery: 61, workload: 49 },
      { timestamp: 'Yesterday', stress: 60, fatigue: 62, recovery: 61, workload: 50 },
      { timestamp: 'Today', stress: 59, fatigue: 62, recovery: 61, workload: 49 }
    ]
  },
  {
    id: 'P-1205',
    unit: 'Unit Charlie',
    role: 'Field Medic',
    wellnessScore: 39,
    stressIndicator: 89,
    fatigueIndicator: 86,
    recoveryScore: 35,
    stressRisk: 'Critical',
    fatigueRisk: 'Critical',
    overallRisk: 'Critical',
    trend: 'up',
    aiConfidence: 98,
    lastCheckIn: '3 min ago',
    dutyType: 'Active Field',
    weeklyDutyHours: 72,
    sleepAverageHours: 4.1,
    potentialFactors: [
      'High emotional and emergency trauma response load over 7 consecutive days',
      'Severe sleep disruption and extended 24-hour on-call readiness',
      'Significant acute fatigue accumulation with sharp recovery drop'
    ],
    recommendedActions: [
      'Mandatory medical relief and immediate rotation to rest quarters',
      'Urgent confidential debriefing with psychological support team',
      'Command-level welfare monitoring authorization'
    ],
    forecast: {
      next24h: 'Critical',
      next72h: 'Critical',
      next7d: 'High'
    },
    historicalTrend: [
      { timestamp: 'Day -6', stress: 70, fatigue: 68, recovery: 52, workload: 60 },
      { timestamp: 'Day -5', stress: 75, fatigue: 72, recovery: 48, workload: 64 },
      { timestamp: 'Day -4', stress: 80, fatigue: 78, recovery: 42, workload: 68 },
      { timestamp: 'Day -3', stress: 84, fatigue: 82, recovery: 38, workload: 70 },
      { timestamp: 'Day -2', stress: 87, fatigue: 84, recovery: 36, workload: 72 },
      { timestamp: 'Yesterday', stress: 88, fatigue: 85, recovery: 35, workload: 72 },
      { timestamp: 'Today', stress: 89, fatigue: 86, recovery: 35, workload: 72 }
    ]
  },
  {
    id: 'P-0319',
    unit: 'Unit Delta',
    role: 'Cyber Operations',
    wellnessScore: 84,
    stressIndicator: 34,
    fatigueIndicator: 38,
    recoveryScore: 82,
    stressRisk: 'Low',
    fatigueRisk: 'Low',
    overallRisk: 'Low',
    trend: 'down',
    aiConfidence: 95,
    lastCheckIn: '42 min ago',
    dutyType: 'Technical / Ops',
    weeklyDutyHours: 41,
    sleepAverageHours: 7.2,
    potentialFactors: [
      'Predictable shift cycles with consistent weekend recovery',
      'High engagement index and favorable work-life boundary scores'
    ],
    recommendedActions: [
      'Standard weekly check-in schedule'
    ],
    forecast: {
      next24h: 'Low',
      next72h: 'Low',
      next7d: 'Low'
    },
    historicalTrend: [
      { timestamp: 'Day -6', stress: 42, fatigue: 45, recovery: 76, workload: 44 },
      { timestamp: 'Day -5', stress: 40, fatigue: 43, recovery: 78, workload: 43 },
      { timestamp: 'Day -4', stress: 38, fatigue: 41, recovery: 80, workload: 42 },
      { timestamp: 'Day -3', stress: 36, fatigue: 39, recovery: 81, workload: 41 },
      { timestamp: 'Day -2', stress: 35, fatigue: 38, recovery: 82, workload: 41 },
      { timestamp: 'Yesterday', stress: 34, fatigue: 38, recovery: 82, workload: 41 },
      { timestamp: 'Today', stress: 34, fatigue: 38, recovery: 82, workload: 41 }
    ]
  },
  {
    id: 'P-0782',
    unit: 'Unit Alpha',
    role: 'Squad Leader',
    wellnessScore: 69,
    stressIndicator: 58,
    fatigueIndicator: 64,
    recoveryScore: 63,
    stressRisk: 'Moderate',
    fatigueRisk: 'Moderate',
    overallRisk: 'Moderate',
    trend: 'stable',
    aiConfidence: 92,
    lastCheckIn: '15 min ago',
    dutyType: 'Active Field',
    weeklyDutyHours: 51,
    sleepAverageHours: 6.0,
    potentialFactors: [
      'Supervisory responsibility for multiple high-intensity training drills',
      'Slight cumulative fatigue without critical sleep impairment'
    ],
    recommendedActions: [
      'Provide brief resilience coaching session',
      'Encourage post-drill recovery schedule adherence'
    ],
    forecast: {
      next24h: 'Moderate',
      next72h: 'Moderate',
      next7d: 'Low'
    },
    historicalTrend: [
      { timestamp: 'Day -6', stress: 54, fatigue: 58, recovery: 66, workload: 49 },
      { timestamp: 'Day -5', stress: 56, fatigue: 60, recovery: 65, workload: 50 },
      { timestamp: 'Day -4', stress: 57, fatigue: 62, recovery: 64, workload: 51 },
      { timestamp: 'Day -3', stress: 58, fatigue: 63, recovery: 63, workload: 51 },
      { timestamp: 'Day -2', stress: 58, fatigue: 64, recovery: 63, workload: 51 },
      { timestamp: 'Yesterday', stress: 58, fatigue: 64, recovery: 63, workload: 51 },
      { timestamp: 'Today', stress: 58, fatigue: 64, recovery: 63, workload: 51 }
    ]
  },
  {
    id: 'P-1104',
    unit: 'Unit Charlie',
    role: 'Reconnaissance Scout',
    wellnessScore: 78,
    stressIndicator: 45,
    fatigueIndicator: 50,
    recoveryScore: 74,
    stressRisk: 'Low',
    fatigueRisk: 'Moderate',
    overallRisk: 'Low',
    trend: 'down',
    aiConfidence: 94,
    lastCheckIn: '55 min ago',
    dutyType: 'Active Field',
    weeklyDutyHours: 44,
    sleepAverageHours: 6.8,
    potentialFactors: [
      'High physical output during field reconnaissance',
      'Good baseline recovery capacity buffered by recent 48-hour rest cycle'
    ],
    recommendedActions: [
      'Continue standard hydration and biometric monitoring'
    ],
    forecast: {
      next24h: 'Low',
      next72h: 'Low',
      next7d: 'Low'
    },
    historicalTrend: [
      { timestamp: 'Day -6', stress: 52, fatigue: 62, recovery: 66, workload: 50 },
      { timestamp: 'Day -5', stress: 50, fatigue: 58, recovery: 69, workload: 48 },
      { timestamp: 'Day -4', stress: 48, fatigue: 55, recovery: 71, workload: 46 },
      { timestamp: 'Day -3', stress: 46, fatigue: 52, recovery: 73, workload: 45 },
      { timestamp: 'Day -2', stress: 45, fatigue: 51, recovery: 74, workload: 44 },
      { timestamp: 'Yesterday', stress: 45, fatigue: 50, recovery: 74, workload: 44 },
      { timestamp: 'Today', stress: 45, fatigue: 50, recovery: 74, workload: 44 }
    ]
  }
];

export const createPersonnelRecordFromUser = (user: UserProfile): PersonnelRecord => {
  return {
    id: user.id || 'WO-REGISTERED',
    unit: user.unit || 'Joint Command Directorate',
    role: `${user.rankTitle ? user.rankTitle + ' / ' : ''}${user.role || 'Welfare Supervisor'}`,
    wellnessScore: 92,
    stressIndicator: 28,
    fatigueIndicator: 32,
    recoveryScore: 88,
    stressRisk: 'Low',
    fatigueRisk: 'Low',
    overallRisk: 'Low',
    trend: 'stable',
    aiConfidence: 97,
    lastCheckIn: 'Active Now (Registered Officer)',
    dutyType: 'Command & Comms',
    weeklyDutyHours: 42,
    sleepAverageHours: 7.6,
    potentialFactors: [
      'Newly enrolled authorized welfare supervisor account',
      'Optimal baseline recovery and disciplined shift rotation',
      'Authorized biometric hardware enclave key verified'
    ],
    recommendedActions: [
      'Maintain standard baseline self-care protocol',
      'Oversee unit welfare telemetry and early warnings'
    ],
    forecast: {
      next24h: 'Low',
      next72h: 'Low',
      next7d: 'Low'
    },
    historicalTrend: [
      { timestamp: 'Day -6', stress: 30, fatigue: 32, recovery: 86, workload: 40 },
      { timestamp: 'Day -5', stress: 28, fatigue: 31, recovery: 87, workload: 40 },
      { timestamp: 'Day -4', stress: 29, fatigue: 33, recovery: 88, workload: 42 },
      { timestamp: 'Day -3', stress: 27, fatigue: 30, recovery: 89, workload: 38 },
      { timestamp: 'Day -2', stress: 28, fatigue: 32, recovery: 88, workload: 40 },
      { timestamp: 'Yesterday', stress: 26, fatigue: 29, recovery: 90, workload: 40 },
      { timestamp: 'Today', stress: 28, fatigue: 32, recovery: 88, workload: 42 }
    ]
  };
};
