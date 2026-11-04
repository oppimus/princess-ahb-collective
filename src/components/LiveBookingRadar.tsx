import React, { useState, useEffect } from 'react';
import {
  Flame,
  Calendar,
  Bell,
  CheckCircle2,
  X,
  Crown,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { LIVE_BOOKING_PULSES } from '../data/mockData';

interface LiveBookingRadarProps {
  onOpenBooking: () => void;
  onOpenLeadMagnet: () => void;
}

export const LiveBookingRadar: React.FC<LiveBookingRadarProps> = ({
  onOpenBooking,
}) => {
  const [pulseIdx, setPulseIdx] = useState<number>(0);
  const [fade, setFade] = useState(true);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertPhone, setAlertPhone] = useState('');
  const [alertLocation, setAlertLocation] = useState('Baton Rouge Flagship');
  const [alertSubmitted, setAlertSubmitted] = useState(false);

  // Cycle through recent live pulses with a gentle fade transition
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setPulseIdx((prev) => (prev + 1) % LIVE_BOOKING_PULSES.length);
        setFade(true);
      }, 300);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activePulse = LIVE_BOOKING_PULSES[pulseIdx] || LIVE_BOOKING_PULSES[0];

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertPhone) return;
    setAlertSubmitted(true);
    setTimeout(() => {
      setIsAlertModalOpen(false);
      setAlertSubmitted(false);
      setAlertPhone('');
    }, 3000);
  };

  return (
    <div className="relative bg-gradient-to-r from-[#220a10] via-[#350f18] to-[#220a10] text-white border-y border-[#5e1c2b]/70 py-2 sm:py-2.5 px-3 sm:px-6 shadow-md overflow-hidden">
      {/* Subtle luxury ambient shimmer glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#8e273e]/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4 relative z-10">
        {/* Left: Live Chair Urgency & Real-Time Booking Pulse */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center md:justify-start text-center md:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8e273e]/40 border border-[#fcd34d]/30 text-[#fcd34d] text-[10px] font-serif font-bold uppercase tracking-widest shadow-xs shrink-0">
            <Flame className="w-3.5 h-3.5 text-[#fcd34d] fill-[#fcd34d]" />
            <span>Live Chair Radar</span>
          </div>

          {/* Pulse text with smooth fade */}
          <div className="flex items-center gap-2 text-xs sm:text-[13px] text-stone-200">
            {/* Pulsing emerald live beacon */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            </span>

            <div
              className={`transition-opacity duration-300 ${
                fade ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="font-bold text-white">{activePulse.client}</span>{' '}
              <span className="text-stone-300">({activePulse.location})</span>{' '}
              <span className="text-stone-400 hidden xs:inline">just booked</span>{' '}
              <span className="font-semibold text-[#fcd34d]">
                {activePulse.style}
              </span>{' '}
              <span className="text-stone-400 text-[11px] whitespace-nowrap">
                · {activePulse.timeAgo}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Remaining Weekend Chairs + Clean Action Pills */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap justify-center">
          <span className="text-stone-300 text-xs hidden xl:inline">
            ⚡ <strong className="text-white">Only 2 chairs remaining</strong> this Saturday
          </span>

          {/* Elegant Frosted Alert Pill (Replaces awkward text link) */}
          <button
            onClick={() => setIsAlertModalOpen(true)}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#fcd34d]/50 text-stone-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-sm shadow-xs group"
          >
            <Bell className="w-3.5 h-3.5 text-[#fcd34d] group-hover:rotate-12 transition-transform" />
            <span>VIP Cancellation Alerts</span>
          </button>

          {/* Luminous Gold Pill Button */}
          <button
            onClick={onOpenBooking}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#fcd34d] via-[#f59e0b] to-[#d97706] hover:from-[#fef08a] hover:to-[#f59e0b] text-[#221417] text-xs font-serif font-bold uppercase tracking-wider transition-all shadow-md shadow-[#fcd34d]/20 flex items-center gap-1.5 cursor-pointer active:scale-95 group"
          >
            <Crown className="w-3.5 h-3.5 text-[#8e273e] group-hover:scale-110 transition-transform" />
            <span>Lock Chair</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8e273e]" />
          </button>
        </div>
      </div>

      {/* Squeeze-In Cancellation Alert Modal */}
      {isAlertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#ffffff] text-[#221417] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#edd8d5] shadow-2xl relative">
            <button
              onClick={() => setIsAlertModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#faebea] text-[#8e273e] flex items-center justify-center hover:bg-[#edd8d5] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8e273e] to-[#6e1c2e] text-white flex items-center justify-center shadow-md">
                <Bell className="w-6 h-6 text-[#fcd34d]" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8e273e] block">
                  VIP Priority Waitlist
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#221417]">
                  Instant Cancellation SMS Radar
                </h3>
                <p className="text-xs text-[#543b3f] mt-1 leading-relaxed">
                  Our master braiders book out weeks ahead. When a client reschedules or a prime Friday/Saturday chair opens up, get an instant SMS ping to lock it in first!
                </p>
              </div>

              {alertSubmitted ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                  <div className="text-xs font-bold text-emerald-900">You're on the VIP Radar!</div>
                  <p className="text-[11px] text-emerald-700">We'll text your phone the instant a chair is released.</p>
                </div>
              ) : (
                <form onSubmit={handleAlertSubmit} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-[#8e273e] uppercase tracking-wider mb-1">
                      Target Studio Location
                    </label>
                    <select
                      value={alertLocation}
                      onChange={(e) => setAlertLocation(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#edd8d5] bg-[#faf4f2] text-xs font-semibold focus:outline-none focus:border-[#8e273e]"
                    >
                      <option value="Baton Rouge Flagship">Baton Rouge Flagship (12135 Florida Blvd)</option>
                      <option value="Richmond VIP Studio">Richmond / Virginia VIP Studio</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#8e273e] uppercase tracking-wider mb-1">
                      Your Mobile Phone (SMS)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(225) 555-0199"
                      value={alertPhone}
                      onChange={(e) => setAlertPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#edd8d5] bg-white text-xs font-medium focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8e273e] via-[#a02f48] to-[#6e1c2e] hover:from-[#a02f48] text-white text-xs font-serif font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Sparkles className="w-4 h-4 text-[#fcd34d]" />
                    <span>Activate My SMS Cancellation Radar</span>
                  </button>

                  <p className="text-[10px] text-center text-[#705055] flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zero spam. Only notified when real chairs open up.</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
