import React, { useEffect, useRef, useState } from 'react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';

interface UserAIAssistantPageProps {
  currentUserName?: string;
  onBack: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

export const UserAIAssistantPage: React.FC<
  UserAIAssistantPageProps
> = ({ currentUserName, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello${currentUserName ? ` ${currentUserName}` : ''}. I'm your Welfare AI Assistant. You can ask me questions about stress, fatigue, sleep, recovery, wellbeing, or welfare support when an employee is not immediately available.`,
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, isTyping]);

  

 const handleSend = async () => {
  const question = input.trim();

  if (!question || isTyping) {
    return;
  }

  const userMessage: ChatMessage = {
    id: `user-${Date.now()}`,
    sender: 'user',
    text: question,
  };

  setMessages((previous) => [
    ...previous,
    userMessage,
  ]);

  setInput('');
  setIsTyping(true);

  try {
    const token = localStorage.getItem('welfare_token');

    if (!token) {
      throw new Error('Your login session has expired. Please log in again.');
    }

   const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/ai/chat`,
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

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      sender: 'assistant',
      text: data.response,
    };

    setMessages((previous) => [
      ...previous,
      assistantMessage,
    ]);
  } catch (err) {
    const assistantMessage: ChatMessage = {
      id: `assistant-error-${Date.now()}`,
      sender: 'assistant',
      text:
        err instanceof Error
          ? err.message
          : 'Sorry, I could not connect to the AI assistant.',
    };

    setMessages((previous) => [
      ...previous,
      assistantMessage,
    ]);
  } finally {
    setIsTyping(false);
  }
};

  const suggestions = [
    'How can I reduce stress?',
    'I am feeling very tired. What should I do?',
    'How can I improve my sleep?',
    'How can I contact welfare support?',
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-8">

      {/* HEADER */}

      <div className="max-w-5xl mx-auto">

        <div className="flex items-center gap-4 mb-6">

          <button
            type="button"
            onClick={onBack}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:border-cyan-500/50 hover:text-cyan-300 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Bot className="w-6 h-6 text-cyan-400" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Welfare AI Assistant
            </h1>

            <p className="text-xs text-slate-400 mt-1">
              Immediate general welfare guidance when an employee is unavailable
            </p>
          </div>

        </div>

        {/* CHAT CARD */}

        <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 overflow-hidden">

          {/* STATUS */}

          <div className="px-5 py-3 border-b border-slate-800 flex items-center gap-2">

            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

            <span className="text-xs font-mono text-emerald-400">
              AI ASSISTANT AVAILABLE
            </span>

            <Sparkles className="w-4 h-4 text-cyan-400 ml-auto" />

          </div>

          {/* MESSAGES */}

          <div className="h-[55vh] overflow-y-auto p-5 space-y-5">

            {messages.map((message) => (

              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >

                {message.sender === 'assistant' && (
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                )}

                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.sender === 'user'
                      ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-100'
                      : 'bg-slate-950/80 border border-slate-800 text-slate-200'
                  }`}
                >
                  {message.text}
                </div>

                {message.sender === 'user' && (
                  <div className="w-9 h-9 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-violet-300" />
                  </div>
                )}

              </div>

            ))}

            {isTyping && (
              <div className="flex gap-3">

                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>

                <div className="rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-xs text-slate-400">
                  AI is preparing a response...
                </div>

              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          {/* SUGGESTIONS */}

          <div className="px-5 pb-4 flex flex-wrap gap-2">

            {suggestions.map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="text-xs px-3 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition"
              >
                {suggestion}
              </button>
            ))}

          </div>

          {/* INPUT */}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
            className="p-4 border-t border-slate-800 flex gap-3"
          >

            <input
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="Ask your welfare question..."
              disabled={isTyping}
              className="flex-1 rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
            />

            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold transition"
            >
              <Send className="w-5 h-5" />
            </button>

          </form>

        </div>

        {/* NOTICE */}

        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/40 p-4 flex items-start gap-3">

          <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />

          <p className="text-xs text-slate-500 leading-5">
            This AI assistant provides general welfare information
            and does not replace confidential human support,
            professional care, or emergency assistance. Contact
            the Welfare & Support team when human intervention
            is required.
          </p>

        </div>

      </div>

    </div>
  );
};

export default UserAIAssistantPage;