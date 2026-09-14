import React, { useState } from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Lock, 
  LifeBuoy, 
  Users, 
  BookOpen, 
  PhoneCall, 
  Moon, 
  AlertOctagon, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';

interface WelfareSupportPageProps {
  onOpenDirectCheckIn?: () => void;
}

export const WelfareSupportPage: React.FC<WelfareSupportPageProps> = ({ onOpenDirectCheckIn }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const supportCards = [
    {
      id: 'check-in',
      title: 'Confidential Check-In',
      description: 'Facilitate a 1-on-1 private welfare check-in with a designated wellness officer. Strict medical privacy upheld.',
      icon: HeartHandshake,
      color: 'text-cyan-400',
      actionText: 'Initiate Confidential Check-In',
      modalTitle: 'Confidential Welfare Check-In System',
      modalContent: 'This channel enables commanders and welfare liaisons to arrange voluntary, private dialogues with personnel showing elevated stress indicators. Conversations are completely non-disciplinary.'
    },
    {
      id: 'mental-health',
      title: 'Mental Wellbeing Resources',
      description: 'Digital self-guided cognitive behavioral tools, resilience modules, and decompression protocols tailored for operational stress.',
      icon: BookOpen,
      color: 'text-violet-400',
      actionText: 'Access Resource Library',
      modalTitle: 'Mental Wellbeing Portal',
      modalContent: 'Includes 18 audio-guided mindfulness and tactical breathing exercises, combat stress reset guides, and family reintegration literature.'
    },
    {
      id: 'peer-support',
      title: 'Peer Support Network',
      description: 'Connect personnel with trained unit peer supporters who provide non-judgmental guidance and active listening.',
      icon: Users,
      color: 'text-emerald-400',
      actionText: 'Connect with Peer Facilitator',
      modalTitle: 'Uniformed Forces Peer Support Registry',
      modalContent: 'Over 40 certified peer facilitators are on active duty across Alpha, Bravo, Charlie, and Delta units, accessible 24/7 on secure radio and encrypted messaging.'
    },
    {
      id: 'counseling',
      title: 'Counselling Referral',
      description: 'Formal referral to licensed military clinical psychologists, family counselors, and behavioral specialists.',
      icon: LifeBuoy,
      color: 'text-indigo-400',
      actionText: 'Request Professional Referral',
      modalTitle: 'Clinical Psychology Referral',
      modalContent: 'Expedited appointments are scheduled within 24 hours through the Military Medical & Psychological Health Directorate. All records sealed from service files.'
    },
    {
      id: 'rest-recovery',
      title: 'Rest & Recovery Guidance',
      description: 'Sleep hygiene protocols, circadian adjustment blueprints for night patrols, and nutritional recovery strategies.',
      icon: Moon,
      color: 'text-amber-400',
      actionText: 'View Recovery Blueprint',
      modalTitle: 'Sleep & Circadian Optimization Guide',
      modalContent: 'Scientific shift-work guidelines: 12-hour recovery turnaround, blue-light reduction filters, sleep pod booking, and caffeine regulation schedules.'
    },
    {
      id: 'emergency',
      title: 'Emergency Welfare Support',
      description: 'Immediate 24/7 crisis hotline and tactical chaplaincy response for critical acute distress situations.',
      icon: AlertOctagon,
      color: 'text-rose-400',
      actionText: 'Call Urgent Welfare Line',
      modalTitle: '24/7 Emergency Crisis Support',
      modalContent: 'Emergency Hotline: 1-800-WELFARE-FORCES (Ext 9). Immediate dispatch of rapid response welfare intervention team and on-call psychologist.'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <HeartHandshake className="w-6 h-6 text-cyan-400" />
            Welfare & Support Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Human-centered welfare pathways, mental health resources, and voluntary confidential support.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Strict Confidentiality Guaranteed</span>
        </div>
      </div>

      {/* Confidentiality Notice (Prompt requirement) */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-start gap-3.5">
        <Lock className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
        <div>
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Confidentiality Notice
          </div>
          <p className="text-xs text-slate-200 mt-1 leading-relaxed">
            “Personal wellbeing information should only be accessed by authorized personnel and used for welfare and preventive support. All data is protected under Armed Forces Welfare Privacy Directives and is never disclosed for punitive or disciplinary evaluations.”
          </p>
        </div>
      </div>

      {/* 6 Support Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {supportCards.map((card) => {
          const Icon = card.icon;
          return (
            <GlassCard key={card.id} className="p-5 flex flex-col justify-between" hoverEffect>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Welfare Channel</span>
                </div>

                <h3 className="text-sm font-bold text-white mb-2">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.description}</p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    if (card.id === 'check-in' && onOpenDirectCheckIn) {
                      onOpenDirectCheckIn();
                    } else {
                      setActiveModal(card.id);
                    }
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 text-xs font-semibold font-mono transition-all flex items-center justify-center gap-2 border border-slate-700 hover:border-cyan-400"
                >
                  <span>{card.actionText}</span>
                  <span>→</span>
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Active Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0b1222] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 space-y-4">
            {(() => {
              const current = supportCards.find(c => c.id === activeModal);
              if (!current) return null;
              return (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-sm font-bold text-white">{current.modalTitle}</h3>
                    <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">✕</button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{current.modalContent}</p>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Access Granted • Verified Welfare Tier</span>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono"
                    >
                      Acknowledge & Close
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
