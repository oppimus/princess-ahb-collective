import React from 'react';
import { Zap, Clock, ShieldCheck, ArrowRight, Bell, Sparkles, MapPin, User, Calendar, ExternalLink } from 'lucide-react';
import { FlashSpecial, BraidingService } from '../types';
import { OFFICIAL_BOOKING_URL } from '../data/mockData';

interface EmptyChairFlashSpecialsProps {
  specials: FlashSpecial[];
  services: BraidingService[];
  onClaimChair: (special: FlashSpecial) => void;
  onJoinAlertList: () => void;
}

export const EmptyChairFlashSpecials: React.FC<EmptyChairFlashSpecialsProps> = ({
  specials,
  onClaimChair,
  onJoinAlertList,
}) => {
  return (
    <section id="flash-specials-section" className="py-14 bg-gradient-to-b from-[#fcf5f1] via-[#fffaf6] to-[#fbf0ea] border-y border-[#edd8d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faebea] text-[#8e273e] text-xs font-semibold uppercase tracking-wider border border-[#f0c5cd]">
              <Zap className="w-3.5 h-3.5 text-[#8e273e] fill-[#8e273e]" />
              <span>Empty-Chair Recovery & Squeeze-In Board</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#221417] tracking-tight">
              Last-Minute Chair Openings & Flash Savings
            </h3>
            <p className="text-xs sm:text-sm text-[#543b3f] leading-relaxed">
              When appointments reschedule, we pass the savings directly to you. Claim these verified master braider slots for today and tomorrow with exclusive $35–$45 discounts.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <a
              href={OFFICIAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#ffffff] hover:bg-[#faebea] border border-[#edd8d5] text-xs font-bold text-[#8e273e] transition-colors shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#8e273e]" />
              <span>Full Acuity Schedule (as.me)</span>
              <ExternalLink className="w-3 h-3 text-[#8e273e]" />
            </a>

            <button
              onClick={onJoinAlertList}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#8e273e] hover:bg-[#781e32] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-[#fcd34d]" />
              <span>Join VIP Squeeze-In SMS Alerts</span>
            </button>
          </div>
        </div>

        {/* Specials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specials.map((spec) => (
            <div
              key={spec.id}
              className="bg-[#ffffff] border border-[#edd8d5] rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-[#8e273e] transition-all flex flex-col justify-between group"
            >
              {/* Card Header with Badges */}
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#faebea] text-[#8e273e] text-[10px] font-bold uppercase tracking-wider border border-[#f0c5cd]">
                    {spec.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-[#8e273e] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8e273e]" />
                    {spec.spotsLeft} Chair Open
                  </span>
                </div>

                {/* Stylist & Location Info */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={spec.stylistAvatar}
                    alt={spec.stylistName}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#edd8d5]"
                  />
                  <div>
                    <div className="text-sm font-serif font-bold text-[#221417]">
                      {spec.stylistName}
                    </div>
                    <div className="text-[11px] text-[#705055] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8e273e]" />
                      <span>{spec.location}</span>
                    </div>
                  </div>
                </div>

                {/* Service Name */}
                <h4 className="text-base font-serif font-bold text-[#221417] group-hover:text-[#8e273e] transition-colors leading-snug mb-1">
                  {spec.serviceName}
                </h4>

                {/* Date & Time Slot */}
                <div className="p-2.5 rounded-lg bg-[#fcf5f1] border border-[#edd8d5] my-3 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[#221417] font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#8e273e]" />
                      {spec.dateLabel}
                    </span>
                    <span className="flex items-center gap-1.5 text-[#8e273e] font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      {spec.timeSlot}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#705055] italic">
                    {spec.reason}
                  </div>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-3 border-t border-[#edd8d5]">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-xs text-[#705055] line-through mr-1.5">
                      ${spec.originalPrice}
                    </span>
                    <span className="text-2xl font-serif font-bold text-[#8e273e]">
                      ${spec.discountedPrice}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Save ${spec.savings}
                  </span>
                </div>

                <button
                  onClick={() => onClaimChair(spec)}
                  className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 text-[#fcd34d]" />
                  <span>Claim Squeeze-In Chair</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#fcd34d]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
