import React from 'react';
import { Gift, ArrowRight, Download } from 'lucide-react';

interface LeadMagnetSectionProps {
  onOpenModal: () => void;
}

export const LeadMagnetSection: React.FC<LeadMagnetSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="py-14 bg-[#fcf6f2] border-y border-[#edd8d5] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#8e273e]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-[#ffffff] via-[#fffdfd] to-[#fdf2f4] border border-[#edd8d5] rounded-2xl p-6 sm:p-10 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Column: Visual Book Mockup / Value Stack */}
          <div className="flex items-center gap-6 max-w-xl">
            <div className="hidden sm:block shrink-0 relative group">
              <div className="w-28 h-40 rounded-lg overflow-hidden border border-[#edd8d5] shadow-md bg-[#faf4f2] relative">
                <img
                  src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=400&q=80"
                  alt="30-Day Braid Care Blueprint"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-2.5">
                  <span className="text-[9px] text-[#fcd34d] font-bold tracking-wider uppercase">Free Guide</span>
                  <span className="text-[11px] font-serif font-bold text-white leading-tight">Crown Care Blueprint</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#fdf2f4] border border-[#f0c5cd] text-[#8e273e] text-[11px] font-bold uppercase tracking-wider">
                <Gift className="w-3 h-3 text-[#8e273e]" />
                <span>Instant Lead Magnet & VIP Gift</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#221417]">
                Protect Your Crown & Edges for 8+ Weeks
              </h3>
              <p className="text-sm text-[#705055] leading-relaxed">
                Download our free 30-Day Braid Care Blueprint. Learn the botanical regimen that prevents itchy scalp and locks in moisture without frizz—plus claim a complimentary <strong className="text-[#8e273e]">$25 Salon Booking Voucher</strong>!
              </p>
            </div>
          </div>

          {/* Right Column: Instant Action */}
          <div className="shrink-0 w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onOpenModal}
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] via-[#9e2d46] to-[#6e1c2e] hover:from-[#9e2d46] hover:to-[#581524] transition-all shadow-lg shadow-[#8e273e]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Claim Free Guide & $25 Voucher</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
