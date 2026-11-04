import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Phone,
  Calendar,
  Clock,
  ShieldCheck,
  Crown,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import { CONTACT_INFO, OFFICIAL_BOOKING_URL } from '../data/mockData';
import { BraidingService } from '../types';

interface Message {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'book' | 'call' | 'acuity';
    label: string;
    payload?: string;
  };
}

interface StylistChatConciergeProps {
  onOpenBooking: (service?: BraidingService) => void;
  services?: BraidingService[];
}

const QUICK_QUESTIONS = [
  'How should I prep my hair before arriving?',
  'Do you provide the hair or do I bring it?',
  'Will knotless braids hurt or pull my edges?',
  'How long does waist-length knotless take?',
  'Can you braid short 2-3 inch 4C hair?',
  'What is the deposit and how do I book?',
];

export const StylistChatConcierge: React.FC<StylistChatConciergeProps> = ({
  onOpenBooking,
  services = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'concierge',
      text: "Hello Queen! 👑 I'm Amina, your Princess AHB Stylist Concierge. Have questions about our zero-tension technique, hair prep, or which style fits your hair density? Ask me anything!",
      timestamp: 'Just now',
      suggestedAction: {
        type: 'book',
        label: 'Book Appointment ($50 Deposit)',
      },
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/agents/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          clientContext: {
            salon: 'Princess African Hair Braiding',
            locations: ['Baton Rouge, LA', 'Richmond, VA'],
            flagshipPhone: CONTACT_INFO.phone,
            guarantee: '100% Zero-Tension & 7-Day Free Touchup Guarantee',
            speedSquad: '2-Braider Express Service available',
          },
        }),
      });

      const data = await response.json();
      const answer = data.answer || getDefaultFallbackAnswer(query);

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'concierge',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: getActionForQuery(query),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'concierge',
        text: getDefaultFallbackAnswer(query),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: {
          type: 'book',
          label: 'Reserve My Chair Now',
        },
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionForQuery = (q: string): Message['suggestedAction'] => {
    const lower = q.toLowerCase();
    if (lower.includes('book') || lower.includes('deposit') || lower.includes('appointment') || lower.includes('schedule')) {
      return { type: 'book', label: 'Open Booking Calendar' };
    }
    if (lower.includes('call') || lower.includes('phone') || lower.includes('talk') || lower.includes('speak')) {
      return { type: 'call', label: `Call Stylist (${CONTACT_INFO.phone})` };
    }
    return { type: 'book', label: 'Lock In My Style ($50 Deposit)' };
  };

  const getDefaultFallbackAnswer = (q: string) => {
    const lower = q.toLowerCase();
    if (lower.includes('prep') || lower.includes('wash') || lower.includes('blow')) {
      return "For the best, longest-lasting install: please arrive with your natural hair washed, detangled, and thoroughly blown out straight from root to tip with zero heavy grease or oils. We provide our own pre-stretched, ACV-rinsed hypoallergenic hair in the salon!";
    }
    if (lower.includes('provide') || lower.includes('bring') || lower.includes('hair')) {
      return "Good news! High-quality pre-stretched hypoallergenic braiding hair is 100% included in all our braiding services at no extra charge. If you are doing Bohemian knotless and desire 100% raw virgin human hair curls for 8-week zero tangles, we have those in stock or you can bring your favorite bundles!";
    }
    if (lower.includes('hurt') || lower.includes('pain') || lower.includes('tension') || lower.includes('edge')) {
      return "We are famous across Louisiana & Virginia for our 'Zero-Tension Root Technique'! We never pull your baby hairs or braid tightly against your scalp. In fact, if you feel even slight tension during the first 3 braids, we adjust immediately. We also back your style with a 7-Day Free Touch-Up Guarantee!";
    }
    if (lower.includes('short') || lower.includes('4c') || lower.includes('length')) {
      return "Yes! Our master braiders have over 20+ years of generational African braiding expertise. We can safely grip natural 4C hair as short as 2 to 2.5 inches without slipping or pulling on your follicles.";
    }
    if (lower.includes('hour') || lower.includes('how long') || lower.includes('time')) {
      return "Waist-length knotless typically takes 4.5 to 6 hours with a solo stylist. However, if you are short on time, select our 'Speed Squad' 2-Braider Express option — two master braiders work in synchrony to finish waist-length braids in just 3 to 3.5 hours!";
    }
    return `Welcome to Princess AHB! All appointments require a $50 deposit to secure your chair. We offer Knotless, Bohemian, Box Braids, French Curls, Cornrows, and Twists with hair included. You can call or text us anytime at ${CONTACT_INFO.phone} or book online directly!`;
  };

  const handleActionClick = (action?: Message['suggestedAction']) => {
    if (!action) return;
    if (action.type === 'book') {
      onOpenBooking();
      setIsOpen(false);
    } else if (action.type === 'call') {
      window.location.href = `tel:${CONTACT_INFO.phoneRaw}`;
    } else if (action.type === 'acuity') {
      window.open(OFFICIAL_BOOKING_URL, '_blank');
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'concierge',
        text: "Chat refreshed! How can I assist you with your hair goals today, Queen?",
        timestamp: 'Just now',
        suggestedAction: {
          type: 'book',
          label: 'Book Appointment',
        },
      },
    ]);
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-6 left-4 z-40 px-4 py-3 rounded-full bg-[#1a0b0e] hover:bg-[#8e273e] text-white text-xs font-serif font-bold uppercase tracking-wider shadow-2xl border-2 border-[#8e273e] hover:border-[#fcd34d] flex items-center gap-2.5 transition-all cursor-pointer group active:scale-95"
          aria-label="Chat with Stylist AI Concierge"
        >
          {/* Pulsing online indicator */}
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </div>

          <MessageSquare className="w-4 h-4 text-[#fcd34d] group-hover:scale-110 transition-transform" />
          <span>Chat with Stylist</span>

          {hasUnread && (
            <span className="px-1.5 py-0.2 rounded-full bg-[#8e273e] text-white text-[9px] font-bold border border-white/40">
              1
            </span>
          )}
        </button>
      )}

      {/* CHAT WINDOW COMPONENT */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 left-4 z-50 w-[calc(100vw-32px)] sm:w-[380px] max-h-[580px] h-[82vh] sm:h-[540px] bg-[#ffffff] rounded-3xl border-2 border-[#edd8d5] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1a0b0e] via-[#2d1219] to-[#14080a] text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8e273e] to-[#fcd34d] p-0.5 shadow-md">
                  <div className="w-full h-full rounded-full bg-[#1a0b0e] flex items-center justify-center text-amber-300 font-serif font-black text-sm">
                    👑
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1a0b0e]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-sm text-white">
                    Princess Stylist Concierge
                  </h3>
                  <Sparkles className="w-3 h-3 text-[#fcd34d]" />
                </div>
                <p className="text-[10px] text-stone-300 flex items-center gap-1">
                  <span>AI Powered</span>
                  <span>·</span>
                  <span className="text-emerald-400">Replies instantly</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="w-7 h-7 rounded-lg hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Guarantee Sub-Banner */}
          <div className="px-3.5 py-1.5 bg-[#faebea] border-b border-[#f0c5cd] text-[11px] text-[#8e273e] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5 font-medium truncate">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Zero-Tension Root Technique Guaranteed</span>
            </div>
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="text-[10px] font-bold text-[#8e273e] underline shrink-0 ml-2"
            >
              Call Us
            </a>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-[#fcf9f7] to-[#ffffff]">
            {messages.map((msg) => {
              const isBot = msg.sender === 'concierge';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 shadow-xs ${
                      isBot
                        ? 'bg-[#ffffff] border border-[#edd8d5] text-[#221417] rounded-tl-xs'
                        : 'bg-[#8e273e] text-white rounded-tr-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Inline Action Button */}
                    {isBot && msg.suggestedAction && (
                      <div className="pt-1 border-t border-[#edd8d5]/60 mt-1.5">
                        <button
                          type="button"
                          onClick={() => handleActionClick(msg.suggestedAction)}
                          className="w-full py-1.5 px-3 rounded-lg bg-[#faebea] hover:bg-[#8e273e] text-[#8e273e] hover:text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Crown className="w-3 h-3 text-[#fcd34d]" />
                          <span>{msg.suggestedAction.label}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] text-[#705055] mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-[#edd8d5] text-xs text-[#705055] max-w-[140px] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8e273e] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#8e273e] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#8e273e] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] ml-1">Stylist replying...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips to Reduce Friction */}
          <div className="p-2 bg-[#fcf6f2] border-t border-[#edd8d5] shrink-0">
            <div className="text-[10px] font-bold text-[#705055] uppercase tracking-wider mb-1 px-1">
              Frequent Questions:
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {QUICK_QUESTIONS.map((question, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(question)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white hover:bg-[#faebea] text-[#543b3f] hover:text-[#8e273e] border border-[#edd8d5] whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#ffffff] border-t border-[#edd8d5] flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about styles, timing, or prep..."
              disabled={isLoading}
              className="flex-1 py-2.5 px-3.5 bg-[#fcf6f2] border border-[#edd8d5] rounded-xl text-xs text-[#221417] placeholder:text-[#856c70] focus:outline-none focus:border-[#8e273e] focus:bg-white transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="w-9 h-9 rounded-xl bg-[#8e273e] hover:bg-[#781e32] disabled:bg-[#d9b8be] text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm"
              aria-label="Send query to stylist"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
