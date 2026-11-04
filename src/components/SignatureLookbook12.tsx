import React, { useState } from 'react';
import { Sparkles, Calendar, ExternalLink, Clock, ShieldCheck, Check, ArrowRight, Eye, ChevronRight } from 'lucide-react';
import { SIGNATURE_12_STYLES, OFFICIAL_BOOKING_URL } from '../data/mockData';
import { SignatureLookbookStyle, BraidingService } from '../types';

interface SignatureLookbook12Props {
  onSelectForEstimator: (styleName: string) => void;
  onOpenBookingModal: (service?: BraidingService) => void;
}

export const SignatureLookbook12: React.FC<SignatureLookbook12Props> = ({
  onSelectForEstimator,
  onOpenBookingModal,
}) => {
  const [selectedStyle, setSelectedStyle] = useState<SignatureLookbookStyle>(SIGNATURE_12_STYLES[0]);
  const [showPosterModal, setShowPosterModal] = useState(false);

  return (
    <section id="lookbook-section" className="py-16 bg-[#ffffff] border-y border-[#edd8d5] text-[#221417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faebea] text-[#8e273e] text-xs font-semibold uppercase tracking-wider border border-[#f0c5cd]">
              <Sparkles className="w-3.5 h-3.5 text-[#8e273e]" />
              <span>Official Princess AHB Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#221417] tracking-tight">
              12 Signature Master Styles
            </h2>
            <p className="text-sm text-[#543b3f] leading-relaxed">
              Explore our core catalog of client favorites. Every style is installed with our zero-scalp-tension technique, premium extensions included, and expert parting lines.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => setShowPosterModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#faebea] hover:bg-[#f6dadf] text-[#8e273e] text-xs font-bold transition-all border border-[#edd8d5] cursor-pointer shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Full Lookbook Sheet</span>
            </button>

            <a
              href={OFFICIAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#8e273e]/20"
            >
              <Calendar className="w-3.5 h-3.5 text-[#fcd34d]" />
              <span>Book Any Style (as.me)</span>
              <ExternalLink className="w-3 h-3 text-[#fcd34d]" />
            </a>
          </div>
        </div>

        {/* 12 Circular Styles Showcase Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mb-12">
          {SIGNATURE_12_STYLES.map((style, idx) => {
            const isSelected = selectedStyle.id === style.id;
            return (
              <div
                key={style.id}
                onClick={() => setSelectedStyle(style)}
                className={`group flex flex-col items-center text-center p-3.5 rounded-2xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#fcf3f2] border-[#8e273e] shadow-md shadow-[#8e273e]/10 scale-102'
                    : 'bg-[#fffaf9] border-[#edd8d5] hover:border-[#8e273e]/50 hover:bg-[#faebea]/40 shadow-xs'
                }`}
              >
                {/* Circular Style Thumbnail Frame with Real Hairstyle Photo */}
                <div className="relative mb-3">
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 transition-all ${
                      isSelected
                        ? 'ring-3 ring-[#8e273e] ring-offset-2 ring-offset-[#fcf3f2]'
                        : 'ring-2 ring-[#edd8d5] group-hover:ring-[#8e273e]'
                    }`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-[#faebea]">
                      <img
                        src={style.imageUrl}
                        alt={`${style.name} - ${style.subtitle}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded-full bg-black/60 backdrop-blur-xs text-[9px] font-bold text-white shadow-xs">
                        #{idx + 1}
                      </span>
                    </div>
                  </div>

                  {style.badge && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#8e273e] text-white whitespace-nowrap shadow-xs">
                      {style.badge.split(' ')[0]}
                    </span>
                  )}
                </div>

                {/* Style Title & Price */}
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#221417] leading-tight mb-1 group-hover:text-[#8e273e] transition-colors">
                  {style.name}
                </h3>
                <span className="text-[11px] text-[#705055] line-clamp-1 mb-2">
                  {style.subtitle}
                </span>

                <div className="mt-auto pt-2 border-t border-[#edd8d5]/80 w-full flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[#8e273e]">
                    From ${style.startingPrice}
                  </span>
                  <span className="text-[10px] text-[#856c70] flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    {style.durationHours}h
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Style Spotlight Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#2a0e14] via-[#45121e] to-[#6e1c2e] text-white p-6 sm:p-8 shadow-xl border border-[#7d1f35] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 max-w-3xl text-left">
            {/* Spotlight Hairstyle Photo */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 ring-2 ring-[#fcd34d]/60 shadow-xl relative bg-black/30">
              <img
                src={selectedStyle.imageUrl}
                alt={selectedStyle.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[9px] font-bold text-[#fcd34d]">
                {selectedStyle.badge || 'Signature'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#8e273e] text-[10px] font-bold uppercase tracking-wider text-white border border-[#b84256]/50">
                  Selected Style Spotlight
                </span>
                <span className="text-xs text-[#edd8d5]">
                  {selectedStyle.category}
                </span>
              </div>

              <div className="flex items-baseline gap-4">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
                  {selectedStyle.name}
                </h3>
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#fcd34d]">
                  ${selectedStyle.startingPrice}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#f5e6e8] leading-relaxed">
                {selectedStyle.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#edd8d5] pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#fcd34d]" />
                  <span>Zero Tension Guarantee</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#fcd34d]" />
                  <span>{selectedStyle.hairIncluded ? 'Premium Hair Included' : 'Clean Parting & Oiling'}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#fcd34d]" />
                  <span>Est. Duration: {selectedStyle.durationHours} Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <a
              href={OFFICIAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#b84256] via-[#8e273e] to-[#6e1c2e] hover:from-[#c24b61] transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/30 border border-[#fcd34d]/30"
            >
              <Calendar className="w-4 h-4 text-[#fcd34d]" />
              <span>Book {selectedStyle.name} on Acuity</span>
              <ExternalLink className="w-3 h-3 text-[#fcd34d]" />
            </a>

            <button
              onClick={() => onSelectForEstimator(selectedStyle.name)}
              className="py-2.5 px-5 rounded-lg text-xs font-bold tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 border border-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#fcd34d]" />
              <span>Customize Length & Price</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lookbook Poster Sheet Modal */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#ffffff] border border-[#edd8d5] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#221417]">
            <div className="bg-gradient-to-r from-[#6e1c2e] to-[#8e273e] px-6 py-4 border-b border-[#edd8d5] flex items-center justify-between text-white shrink-0">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold tracking-wider">
                  PRINCESS AHB · OFFICIAL 12-STYLE PORTFOLIO SHEET
                </h3>
                <p className="text-[10px] text-[#f5e6e8] uppercase tracking-wider">
                  High-Resolution Salon Lookbook
                </p>
              </div>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1 rounded-md text-[#edd8d5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col items-center">
              {/* High-Resolution 12 Styles Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 w-full mb-6">
                {SIGNATURE_12_STYLES.map((style, idx) => (
                  <div
                    key={style.id}
                    className="bg-[#fcf6f2] border border-[#edd8d5] rounded-xl p-3 flex flex-col items-center text-center hover:border-[#8e273e] hover:shadow-sm transition-all"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-2 ring-2 ring-[#8e273e]/40 shadow-sm relative">
                      <img
                        src={style.imageUrl}
                        alt={style.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded-full bg-black/60 text-[9px] font-bold text-white">
                        #{idx + 1}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#8e273e]">
                      {style.name}
                    </span>
                    <span className="text-[10px] text-[#705055] line-clamp-1 mb-1">
                      {style.subtitle}
                    </span>
                    <span className="text-xs font-serif font-bold text-[#221417]">
                      From ${style.startingPrice} · {style.durationHours}h
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full">
                <a
                  href={OFFICIAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] transition-all flex items-center gap-2 shadow-md"
                >
                  <Calendar className="w-4 h-4 text-[#fcd34d]" />
                  <span>Reserve Any Style on Acuity Schedule</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setShowPosterModal(false)}
                  className="py-2.5 px-5 rounded-lg text-xs font-semibold bg-[#faebea] text-[#8e273e] hover:bg-[#f6dadf] border border-[#edd8d5] cursor-pointer"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
