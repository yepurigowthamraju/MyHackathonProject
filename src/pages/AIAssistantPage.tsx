import React, { useState, useRef, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import { 
  Bot, 
  Sparkles, 
  Send, 
  User, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { cannedPromptSuggestions, mockChatKnowledgeBase, ChatMessage } from '../data/mockChat';

export const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      timestamp: 'Just now',
      text: 'Greetings, Welfare Administrator. I am the Welfare Intelligence Neural Assistant. You can query me regarding aggregated personnel stress trends, fatigue escalation patterns, unit recovery comparisons, or early intervention status across all monitored formations.',
      recommendations: [
        'Select a suggested query below or type your custom natural language inquiry.',
        'All data is processed strictly under non-punitive welfare guidelines.'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

const handleSend = async (text: string) => {
  const question = text.trim();

  if (!question || isTyping) {
    return;
  }

  const userMsg: ChatMessage = {
    id: `user-${Date.now()}`,
    sender: 'user',
    timestamp: 'Just now',
    text: question,
  };

  setMessages((previous) => [
    ...previous,
    userMsg,
  ]);

  setInputValue('');
  setIsTyping(true);

  try {
    const token = localStorage.getItem('welfare_token');

    if (!token) {
      throw new Error(
        'Your login session has expired. Please log in again.'
      );
    }

    const response = await fetch(
  `${API_BASE_URL}/api/ai/chat`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: question,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || 'AI assistant failed to respond.'
      );
    }

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'assistant',
      timestamp: 'Just now',
      text: data.response,
    };

    setMessages((previous) => [
      ...previous,
      botMsg,
    ]);
  } catch (error) {
    const errorMsg: ChatMessage = {
      id: `bot-error-${Date.now()}`,
      sender: 'assistant',
      timestamp: 'Just now',
      text:
        error instanceof Error
          ? error.message
          : 'Sorry, I could not connect to the AI assistant.',
    };

    setMessages((previous) => [
      ...previous,
      errorMsg,
    ]);
  } finally {
    setIsTyping(false);
  }
};

  return (
    <div className="space-y-6 pb-12 flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Bot className="w-6 h-6 text-cyan-400" />
            Welfare Intelligence Assistant
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ask questions about aggregated personnel wellbeing trends, stress velocity, and intervention compliance.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>LLM Telemetry Engine Active</span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <GlassCard className="flex-1 flex flex-col overflow-hidden p-0">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold shadow-md ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white'
                  : 'bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-500/40 text-cyan-300'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-2xl rounded-2xl p-4 text-xs space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-100 rounded-tr-none'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-xl'
              }`}>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-1 border-b border-slate-800/80">
                  <span className="font-bold text-slate-300">
                    {msg.sender === 'user' ? 'Welfare Administrator' : 'AI Welfare Intelligence'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>

                {/* Supporting Metrics if available */}
                {msg.metrics && msg.metrics.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono">
                    {msg.metrics.map((m, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">{m.label}</span>
                        <strong className={`text-sm ${m.color || 'text-white'}`}>{m.value}</strong>
                        {m.badge && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 block mt-1">
                            {m.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Table Data if available */}
                {msg.tableData && (
                  <div className="overflow-x-auto rounded-lg border border-slate-800 mt-2">
                    <table className="w-full text-left font-mono text-[11px]">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                        <tr>
                          {msg.tableData.headers.map((h, i) => (
                            <th key={i} className="p-2">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                        {msg.tableData.rows.map((r, ri) => (
                          <tr key={ri}>
                            {r.map((c, ci) => (
                              <td key={ci} className="p-2 text-slate-200">{c}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Recommendations */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                      Recommended Next Steps
                    </span>
                    {msg.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Aggregating longitudinal wellbeing telemetry...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Canned Prompt Chips */}
        <div className="p-3 bg-slate-950/60 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Prompts:
          </span>
          {cannedPromptSuggestions.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 text-[11px] font-mono whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputValue);
          }}
          className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-3"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your welfare query (e.g., 'Compare Unit Alpha and Unit Charlie recovery')..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-mono"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs font-mono transition-colors shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Ethical Disclaimer (Prompt requirement) */}
        <div className="px-4 py-2 bg-[#080d19] border-t border-slate-800/80 text-center text-[10px] text-slate-400 font-mono">
          “AI-generated insights are decision-support information and should be reviewed by authorized personnel.”
        </div>
      </GlassCard>
    </div>
  );
};
