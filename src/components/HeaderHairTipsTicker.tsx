import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Pause, Play, BookOpen, X, ShieldCheck, Droplets, Moon, Clock, HeartHandshake } from 'lucide-react';
import { HEALTHY_HAIR_TIPS } from '../data/mockData';
import { HealthyHairTip } from '../types';

interface HeaderHairTipsTickerProps {
  onOpenTipDetails?: (tip: HealthyHairTip) => void;
}

export const HeaderHairTipsTicker: React.FC<HeaderHairTipsTickerProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTip, setSelectedTip] = useState<HealthyHairTip | null>(null);

  // Auto-advance tips every 6 seconds when not paused
  useEffect(() => {
    if (isPaused || isModalOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HEALTHY_HAIR_TIPS.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, isModalOpen]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + HEALTHY_HAIR_TIPS.length) % HEALTHY_HAIR_TIPS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % HEALTHY_HAIR_TIPS.length);
  };

  const getTipIcon = (iconName: string) => {
    switch (iconName) {
      case 'Moon':
        return <Moon className="w-3.5 h-3.5 text-[#fcd34d]" />;
      case 'Droplets':
        return <Droplets className="w-3.5 h-3.5 text-[#67e8f9]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-3.5 h-3.5 text-[#86efac]" />;
      case 'Clock':
        return <Clock className="w-3.5 h-3.5 text-[#fcd34d]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-3.5 h-3.5 text-[#f472b6]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#fcd34d]" />;
    }
  };

  const currentTip = HEALTHY_HAIR_TIPS[currentIndex];

  return (
    <>
      {/* Animated Header Ribbon */}
      <div
        className="bg-gradient-to-r from-[#5a1222] via-[#781e32] to-[#5a1222] text-white py-1.5 px-3 sm:px-6 border-b border-[#a02f48]/40 shadow-xs select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 text-xs">
          {/* Left badge */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fcd34d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fcd34d]"></span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#fcd34d] bg-black/30 px-2 py-0.5 rounded border border-[#fcd34d]/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#fcd34d]" />
              <span>Hair Care Tip #{currentIndex + 1}:</span>
            </span>
          </div>

          {/* Center Rotating Animated Message */}
          <div
            className="flex-1 overflow-hidden cursor-pointer group flex items-center justify-center text-center px-1 sm:px-4"
            onClick={() => {
              setSelectedTip(currentTip);
              setIsModalOpen(true);
            }}
            title="Click to view full hair care tip and instructions"
          >
            <div
              key={currentTip.id}
              className="animate-in fade-in slide-in-from-bottom-1 duration-500 flex items-center gap-2 max-w-3xl truncate"
            >
              <span className="shrink-0 hidden xs:inline">{getTipIcon(currentTip.iconName)}</span>
              <span className="font-semibold text-white/95 group-hover:text-[#fcd34d] transition-colors truncate text-[11px] sm:text-xs">
                <strong className="text-[#fce7ea] font-bold mr-1">{currentTip.title}:</strong>
                <span className="text-white/80 hidden sm:inline">{currentTip.shortSummary}</span>
              </span>
              <span className="text-[10px] text-[#fcd34d] underline underline-offset-2 shrink-0 hidden md:inline ml-1 font-semibold group-hover:text-white">
                Read Guide →
              </span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1 shrink-0 text-white/80">
            {/* Play/Pause indicator */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title={isPaused ? 'Resume auto-rotation' : 'Pause ticker'}
              aria-label={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? <Play className="w-3 h-3 text-[#fcd34d]" /> : <Pause className="w-3 h-3" />}
            </button>

            {/* Prev / Next controls */}
            <button
              onClick={handlePrev}
              className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title="Previous hair health tip"
              aria-label="Previous tip"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title="Next hair health tip"
              aria-label="Next tip"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* View All Tips modal trigger */}
            <button
              onClick={() => {
                setSelectedTip(currentTip);
                setIsModalOpen(true);
              }}
              className="hidden lg:flex items-center gap-1 ml-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[#fce7ea] hover:text-white text-[10px] font-semibold transition-colors cursor-pointer"
            >
              <BookOpen className="w-3 h-3 text-[#fcd34d]" />
              <span>All 6 Tips</span>
            </button>
          </div>
        </div>
      </div>

      {/* Healthy Hair Tips Modal Guide */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#ffffff] border border-[#edd8d5] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-[#221417] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#6e1c2e] via-[#8e273e] to-[#6e1c2e] px-6 py-4 border-b border-[#a02f48] flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#fcd34d]/20 border border-[#fcd34d]/40 flex items-center justify-center text-[#fcd34d]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white">
                    Free Hair & Scalp Health Academy
                  </h3>
                  <p className="text-[11px] text-[#fce7ea]">
                    Generational wisdom for maximum braid retention & zero hairline traction
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-[#fce7ea] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Tabbed or scrollable tip list */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="bg-[#fdf2f4] border border-[#f0c5cd] rounded-xl p-4 text-xs text-[#705055] leading-relaxed">
                <strong className="text-[#8e273e] block font-serif text-sm mb-1">
                  👑 Princess AHB Healthy Crown Protocol
                </strong>
                Protective styles should protect your natural hair, never compromise it. Follow our master stylist guidelines below to maintain hydrated scalp pores, resilient edges, and bounce for weeks.
              </div>

              <div className="space-y-3">
                {HEALTHY_HAIR_TIPS.map((tip, idx) => {
                  const isCurrent = (selectedTip?.id || currentTip.id) === tip.id;
                  return (
                    <div
                      key={tip.id}
                      onClick={() => setSelectedTip(tip)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#ffffff] border-[#8e273e] ring-2 ring-[#8e273e]/15 shadow-sm'
                          : 'bg-[#faf4f2] border-[#edd8d5] hover:border-[#8e273e]/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-[#fdf2f4] border border-[#f0c5cd] text-[#8e273e] text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <h4 className="font-serif font-bold text-sm text-[#221417]">
                            {tip.title}
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-[#faebea] text-[#8e273e] text-[10px] font-bold uppercase tracking-wider shrink-0 border border-[#f0c5cd]">
                          {tip.category}
                        </span>
                      </div>

                      <p className="text-xs text-[#543b3f] leading-relaxed mb-3">
                        {tip.detailedAdvice}
                      </p>

                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#edd8d5]/60 text-[#705055]">
                        <span className="flex items-center gap-1 font-semibold text-[#8e273e]">
                          {getTipIcon(tip.iconName)}
                          <span>Recommended Cadence: {tip.frequency}</span>
                        </span>
                        <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                          Verified Trichology Guideline
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#faf4f2] px-6 py-3.5 border-t border-[#edd8d5] flex items-center justify-between shrink-0">
              <span className="text-xs text-[#705055]">
                Have scalp concerns? Call or text <a href="tel:2252882746" className="text-[#8e273e] font-bold underline">(225) 288-2746</a>
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-[#8e273e] hover:bg-[#781e32] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
