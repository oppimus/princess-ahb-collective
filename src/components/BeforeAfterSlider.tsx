import React, { useState, useRef, useCallback } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Star,
  Clock,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Calendar,
  Check,
  Crown,
} from 'lucide-react';
import { TRANSFORMATION_STORIES } from '../data/mockData';
import { TransformationStory, BraidingService } from '../types';

interface BeforeAfterSliderProps {
  onReplicateTransformation: (styleName: string) => void;
  onOpenBooking: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  onReplicateTransformation,
  onOpenBooking,
}) => {
  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeStory: TransformationStory = TRANSFORMATION_STORIES[activeStoryIdx] || TRANSFORMATION_STORIES[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(5, Math.min(95, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="transformation-gallery" className="py-16 sm:py-20 bg-[#ffffff] text-[#221417] border-b border-[#edd8d5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faebea] border border-[#f0c5cd] text-[#8e273e] text-xs font-serif font-bold uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8e273e]" />
              <span>Real Client Proof</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#221417] tracking-tight">
              Before & After <span className="italic text-[#8e273e]">Transformations</span>
            </h2>
            <p className="text-sm text-[#543b3f] leading-relaxed">
              Drag the interactive slider to see how our zero-tension technique transforms short natural hair, postpartum edges, and tender scalps into runway-ready crowns.
            </p>
          </div>

          {/* Quick Case Study Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 shrink-0">
            {TRANSFORMATION_STORIES.map((story, idx) => (
              <button
                key={story.id}
                type="button"
                onClick={() => {
                  setActiveStoryIdx(idx);
                  setSliderPosition(50);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeStoryIdx === idx
                    ? 'bg-[#8e273e] text-white shadow-md'
                    : 'bg-[#faf4f2] text-[#543b3f] hover:bg-[#faebea] border border-[#edd8d5]'
                }`}
              >
                <span>Case #{idx + 1}: {story.clientName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#fcf6f2] p-6 sm:p-8 rounded-3xl border border-[#edd8d5] shadow-lg">
          {/* LEFT: Split Image Interactive Slider */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative h-[380px] sm:h-[480px] rounded-2xl overflow-hidden select-none cursor-ew-resize border-2 border-white shadow-xl bg-stone-900"
            >
              {/* AFTER Image (Full background) */}
              <img
                src={activeStory.afterImage}
                alt={`After: ${activeStory.styleAchieved}`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />

              {/* AFTER Tag */}
              <div className="absolute top-4 right-4 z-20">
                <span className="px-3 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-wider bg-[#8e273e] text-white shadow-lg border border-white/20">
                  After · Slayed
                </span>
              </div>

              {/* BEFORE Image (Clipped by slider position) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeStory.beforeImage}
                  alt={`Before: ${activeStory.clientChallenge}`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                    maxWidth: 'none',
                  }}
                />
                {/* BEFORE Tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-wider bg-black/70 text-white backdrop-blur-md shadow-lg border border-white/20">
                    Before · Challenge
                  </span>
                </div>
              </div>

              {/* Divider Line & Circular Drag Handle */}
              <div
                className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Line */}
                <div className="w-1 h-full bg-white shadow-lg" />
                {/* Drag Handle Button */}
                <div className="absolute w-10 h-10 rounded-full bg-white text-[#8e273e] border-2 border-[#8e273e] shadow-2xl flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                  <div className="flex items-center -space-x-1">
                    <ChevronLeft className="w-4 h-4 stroke-[3]" />
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* Hint badge at bottom */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20 pointer-events-none">
                ↔ Drag slider left or right to compare
              </div>
            </div>
          </div>

          {/* RIGHT: Client Story & Verified Proof Card */}
          <div className="lg:col-span-5 space-y-5">
            {/* Rating & Verified Crown Stamp */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(activeStory.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-[#8e273e] ml-1.5">5.0 Verified Crown</span>
              </div>
              <span className="text-[11px] text-[#705055] font-medium">{activeStory.date}</span>
            </div>

            {/* Client Headline */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8e273e] block">
                Hair Challenge Solved:
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#221417]">
                "{activeStory.clientChallenge}"
              </h3>
            </div>

            {/* Review Quote */}
            <blockquote className="text-sm text-[#543b3f] leading-relaxed italic bg-white p-4 rounded-2xl border border-[#edd8d5] shadow-xs relative">
              <span className="text-2xl text-[#8e273e] font-serif leading-none absolute -top-2 left-3">“</span>
              <p className="pt-2">{activeStory.reviewQuote}</p>
            </blockquote>

            {/* Transformation Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-white p-4 rounded-2xl border border-[#edd8d5]">
              <div>
                <span className="text-[10px] text-[#705055] uppercase font-semibold block">Client Starting State</span>
                <strong className="text-[#221417]">{activeStory.hairLengthBefore}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#705055] uppercase font-semibold block">Style Created</span>
                <strong className="text-[#8e273e]">{activeStory.styleAchieved}</strong>
              </div>
              <div className="pt-2 border-t border-[#edd8d5]">
                <span className="text-[10px] text-[#705055] uppercase font-semibold block">Root Tension Level</span>
                <strong className="text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activeStory.tensionLevel}</span>
                </strong>
              </div>
              <div className="pt-2 border-t border-[#edd8d5]">
                <span className="text-[10px] text-[#705055] uppercase font-semibold block">Chair Duration</span>
                <strong className="text-[#221417] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8e273e]" />
                  <span>{activeStory.sessionTimeHours} Hours Total</span>
                </strong>
              </div>
            </div>

            {/* Irresistible Booking Action */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => onReplicateTransformation(activeStory.styleAchieved)}
                className="w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-serif font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] via-[#781e32] to-[#591423] hover:from-[#a02f48] hover:to-[#6e1c2e] transition-all shadow-md shadow-[#8e273e]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Crown className="w-4 h-4 text-[#fcd34d]" />
                <span>Replicate This Exact Transformation</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#fcd34d]" />
              </button>

              <p className="text-[11px] text-center text-[#705055]">
                ✓ Pre-stretched hypoallergenic extensions included free with every install
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
