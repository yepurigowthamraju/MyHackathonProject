import { WelfareIntervention } from '../types';

export const mockInterventionsList: WelfareIntervention[] = [
  {
    id: 'INT-401',
    personnelOrGroup: 'P-1205 (Medic)',
    unit: 'Unit Charlie',
    riskLevel: 'Critical',
    title: 'Mandatory Rest Stand-Down & Psychological Decompression',
    recommendation: 'Authorize 48h emergency duty stand-down and schedule confidential psychological check-in.',
    assignedTo: 'Dr. Katherine Vance (Welfare Directorate)',
    status: 'In Progress',
    date: 'Today, 18:30',
    notes: 'Relief medic stationed. Initial rest period commenced.',
    type: 'Welfare Check-In'
  },
  {
    id: 'INT-402',
    personnelOrGroup: 'P-0834 (Lead Officer)',
    unit: 'Unit Charlie',
    riskLevel: 'High',
    title: 'Workload Delegation & Command Workload Rebalance',
    recommendation: 'Reassign operational oversight of Taskforce Phoenix to secondary watch officer.',
    assignedTo: 'Maj. Marcus Chen (Executive Officer)',
    status: 'Scheduled',
    date: 'Tomorrow, 09:00',
    notes: 'Briefing prepared for handover meeting.',
    type: 'Workload Review'
  },
  {
    id: 'INT-403',
    personnelOrGroup: 'Unit Bravo Comms Team',
    unit: 'Unit Bravo',
    riskLevel: 'Moderate',
    title: 'Rotational Shift Optimization & Sleep Buffer Window',
    recommendation: 'Implement staggered 8-hour shift cycles with 16-hour mandatory reset window.',
    assignedTo: 'Capt. Elena Rostova (Watch Chief)',
    status: 'In Progress',
    date: 'Today, 14:15',
    notes: 'Shift pattern modified in roster management system.',
    type: 'Recovery Optimization'
  },
  {
    id: 'INT-404',
    personnelOrGroup: 'P-1042 (Field Officer)',
    unit: 'Unit Alpha',
    riskLevel: 'Moderate',
    title: 'Confidential Welfare Check-In',
    recommendation: 'Conduct confidential welfare interview focusing on recent workload and recovery patterns.',
    assignedTo: 'Lt. Sarah Jenkins (Welfare Liaison)',
    status: 'Recommended',
    date: 'Pending Approval',
    notes: 'Triggered by 5-day continuous upward stress trajectory.',
    type: 'Welfare Check-In'
  },
  {
    id: 'INT-405',
    personnelOrGroup: 'P-0921 (Logistics Lead)',
    unit: 'Unit Delta',
    riskLevel: 'High',
    title: 'Nutritional & Physical Recovery Consultation',
    recommendation: 'Schedule voluntary physical therapy evaluation and meal schedule stabilization.',
    assignedTo: 'Staff Sgt. David Ross (Support Services)',
    status: 'Scheduled',
    date: 'Sep 13, 11:30',
    notes: 'Physical therapy slot confirmed at Base Wellness Wing.',
    type: 'Recovery Optimization'
  },
  {
    id: 'INT-406',
    personnelOrGroup: 'Unit Alpha Squad 1',
    unit: 'Unit Alpha',
    riskLevel: 'Low',
    title: 'Peer Support & Group Debrief Session',
    recommendation: 'Facilitate post-exercise group debrief and resilience reflection circle.',
    assignedTo: 'Sgt. Thomas Miller (Peer Facilitator)',
    status: 'Completed',
    date: 'Yesterday, 16:00',
    notes: 'Session conducted with 94% positive reception. Stress markers lowered.',
    type: 'Peer Support'
  },
  {
    id: 'INT-407',
    personnelOrGroup: 'Unit Bravo Techs (3)',
    unit: 'Unit Bravo',
    riskLevel: 'Moderate',
    title: 'Ergonomic Station Assessment & Eye Strain Protocol',
    recommendation: 'Upgrade lighting and provide 20-20-20 visual break reminders during diagnostic shifts.',
    assignedTo: 'Human Factors Advisory Team',
    status: 'Completed',
    date: 'Sep 09, 10:00',
    notes: 'Station filters installed. Technicians reported noticeable fatigue reduction.',
    type: 'Recovery Optimization'
  }
];
