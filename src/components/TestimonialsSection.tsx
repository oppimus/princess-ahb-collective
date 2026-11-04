import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Heart,
  Calendar,
  Clock,
  CheckCircle2,
  ThumbsUp,
  Camera,
  Crown,
  Quote,
  Maximize2,
  X,
  ExternalLink,
  Award,
  Filter,
} from 'lucide-react';
import { TestimonialItem } from '../types';
import { VERIFIED_TESTIMONIALS, OFFICIAL_BOOKING_URL } from '../data/mockData';

interface TestimonialsSectionProps {
  onOpenBooking: () => void;
  onReplicateLook?: (styleName: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenBooking,
  onReplicateLook,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activePhotoView, setActivePhotoView] = useState<'split' | 'before' | 'after'>('split');
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; subtitle: string } | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    style: '',
    rating: 5,
    challenge: '',
    review: '',
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter testimonials based on category
  const filteredStories = selectedCategory === 'all'
    ? VERIFIED_TESTIMONIALS
    : VERIFIED_TESTIMONIALS.filter((t) => t.category === selectedCategory);

  // Reset current index if it exceeds filtered length
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Autoplay carousel
  useEffect(() => {
    if (!isAutoplay || filteredStories.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoplay, filteredStories.length]);

  const activeTestimonial: TestimonialItem = filteredStories[currentIndex] || VERIFIED_TESTIMONIALS[0];

  const handlePrev = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length);
  };

  const handleNext = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
  };

  const handleHelpful = (id: string, defaultCount: number) => {
    if (likedMap[id]) return;
    setLikedMap((prev) => ({ ...prev, [id]: true }));
    setHelpfulMap((prev) => ({
      ...prev,
      [id]: (prev[id] ?? defaultCount) + 1,
    }));
  };

  const categories = [
    { id: 'all', label: 'All Stories', count: VERIFIED_TESTIMONIALS.length },
    { id: 'short_hair', label: 'Short Hair / 4C', count: VERIFIED_TESTIMONIALS.filter((t) => t.category === 'short_hair').length },
    { id: 'tender_scalp', label: 'Tender Scalp & Zero Tension', count: VERIFIED_TESTIMONIALS.filter((t) => t.category === 'tender_scalp').length },
    { id: 'postpartum_edges', label: 'Postpartum & Edges', count: VERIFIED_TESTIMONIALS.filter((t) => t.category === 'postpartum_edges').length },
    { id: 'speed_squad', label: 'Speed Squad (Express)', count: VERIFIED_TESTIMONIALS.filter((t) => t.category === 'speed_squad').length },
  ];

  const handleReplicate = (style: string) => {
    if (onReplicateLook) {
      onReplicateLook(style);
    } else {
      onOpenBooking();
    }
  };

  return (
    <section id="testimonials-section" className="py-16 sm:py-24 bg-[#ffffff] text-[#221417] border-b border-[#edd8d5] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8e273e]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Verified Trust Proof */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faebea] border border-[#f0c5cd] text-[#8e273e] text-xs font-serif font-bold uppercase tracking-widest shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8e273e]" />
              <span>Verified Client Social Proof</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#221417] tracking-tight">
              Real Client Crowns, <br />
              <span className="italic text-[#8e273e]">Real Transformations.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#543b3f] leading-relaxed">
              Every story below represents a real client who trusted us with their scalp health, short 4C natural hair, or fragile edges. Zero tension, zero migraines, 100% royal confidence.
            </p>
          </div>

          {/* Social Proof Trust Statistics */}
          <div className="bg-[#faf4f2] border border-[#edd8d5] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center gap-4 sm:gap-6 shadow-sm shrink-0">
            <div>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-base font-bold text-[#221417] ml-1">4.98</span>
              </div>
              <p className="text-[11px] text-[#705055] font-semibold mt-0.5">
                Over 1,840+ Verified Reviews
              </p>
            </div>
            <div className="h-8 w-px bg-[#ebd8c1] hidden sm:block" />
            <div>
              <span className="text-base font-bold text-emerald-700 block">
                99.4%
              </span>
              <p className="text-[11px] text-[#705055] font-semibold">
                Pain-Free Sleep Night 1
              </p>
            </div>
            <div className="h-8 w-px bg-[#ebd8c1] hidden sm:block" />
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#8e273e] bg-white border border-[#decab1] hover:bg-[#fdf2f4] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
            >
              <Camera className="w-3.5 h-3.5 text-[#8e273e]" />
              <span>Add Your Review</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          <div className="flex items-center gap-1.5 text-xs text-[#705055] font-semibold mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#8e273e]" />
            <span>Filter By:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setIsAutoplay(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-[#8e273e] text-white shadow-md'
                  : 'bg-[#faf4f2] text-[#543b3f] hover:bg-[#f3eadc] border border-[#edd8d5]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id
                    ? 'bg-white/20 text-white'
                    : 'bg-[#ebd8c1] text-[#705055]'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Testimonial Spotlight Card */}
        {activeTestimonial && (
          <div
            className="bg-[#faf4f2] border-2 border-[#edd8d5] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden transition-all duration-300"
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Interactive Before & After Photo Spotlight */}
              <div className="lg:col-span-6 space-y-4">
                {/* Photo Mode Switcher */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#edd8d5] shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setActivePhotoView('split')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activePhotoView === 'split'
                          ? 'bg-[#8e273e] text-white shadow-xs'
                          : 'text-[#705055] hover:text-[#221417]'
                      }`}
                    >
                      Side-by-Side Proof
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePhotoView('before')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activePhotoView === 'before'
                          ? 'bg-[#8e273e] text-white shadow-xs'
                          : 'text-[#705055] hover:text-[#221417]'
                      }`}
                    >
                      Before Hair
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePhotoView('after')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activePhotoView === 'after'
                          ? 'bg-[#8e273e] text-white shadow-xs'
                          : 'text-[#705055] hover:text-[#221417]'
                      }`}
                    >
                      After Crown
                    </button>
                  </div>

                  <span className="text-[11px] font-bold text-[#8e273e] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Unfiltered Client Result</span>
                  </span>
                </div>

                {/* Photo Display Window */}
                <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-[#edd8d5] shadow-md aspect-[4/3] sm:aspect-[16/10] group">
                  {/* SPLIT VIEW */}
                  {activePhotoView === 'split' && (
                    <div className="grid grid-cols-2 h-full w-full">
                      {/* Before Half */}
                      <div
                        className="relative h-full overflow-hidden border-r-2 border-white/60 cursor-pointer"
                        onClick={() =>
                          setLightboxImage({
                            url: activeTestimonial.beforeImage,
                            title: `Before: ${activeTestimonial.clientName}`,
                            subtitle: activeTestimonial.beforeCaption,
                          })
                        }
                      >
                        <img
                          src={activeTestimonial.beforeImage}
                          alt="Before Transformation"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-300/40 shadow-xs">
                          BEFORE
                        </span>
                        <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-medium leading-tight line-clamp-2">
                          {activeTestimonial.beforeCaption}
                        </div>
                      </div>

                      {/* After Half */}
                      <div
                        className="relative h-full overflow-hidden cursor-pointer"
                        onClick={() =>
                          setLightboxImage({
                            url: activeTestimonial.afterImage,
                            title: `After: ${activeTestimonial.styleAchieved}`,
                            subtitle: activeTestimonial.afterCaption,
                          })
                        }
                      >
                        <img
                          src={activeTestimonial.afterImage}
                          alt="After Transformation"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#8e273e] text-white border border-white/40 shadow-xs flex items-center gap-1">
                          <Crown className="w-2.5 h-2.5 text-amber-300" />
                          <span>AFTER CROWN</span>
                        </span>
                        <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-medium leading-tight line-clamp-2">
                          {activeTestimonial.afterCaption}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BEFORE ONLY VIEW */}
                  {activePhotoView === 'before' && (
                    <div
                      className="relative h-full w-full cursor-pointer"
                      onClick={() =>
                        setLightboxImage({
                          url: activeTestimonial.beforeImage,
                          title: `Before: ${activeTestimonial.clientName}`,
                          subtitle: activeTestimonial.beforeCaption,
                        })
                      }
                    >
                      <img
                        src={activeTestimonial.beforeImage}
                        alt="Before Transformation Full"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-black/80 text-amber-300 border border-amber-300/40">
                        BEFORE STATE: {activeTestimonial.clientChallenge}
                      </span>
                      <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium">
                        {activeTestimonial.beforeCaption}
                      </div>
                    </div>
                  )}

                  {/* AFTER ONLY VIEW */}
                  {activePhotoView === 'after' && (
                    <div
                      className="relative h-full w-full cursor-pointer"
                      onClick={() =>
                        setLightboxImage({
                          url: activeTestimonial.afterImage,
                          title: `After: ${activeTestimonial.styleAchieved}`,
                          subtitle: activeTestimonial.afterCaption,
                        })
                      }
                    >
                      <img
                        src={activeTestimonial.afterImage}
                        alt="After Transformation Full"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#8e273e] text-white border border-white/40 flex items-center gap-1.5 shadow-md">
                        <Crown className="w-3 h-3 text-amber-300" />
                        <span>TRANSFORMED CROWN</span>
                      </span>
                      <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium">
                        {activeTestimonial.afterCaption}
                      </div>
                    </div>
                  )}

                  {/* Expand Image Hint */}
                  <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1 text-[10px]">
                    <Maximize2 className="w-3 h-3" />
                    <span>Click to zoom</span>
                  </div>
                </div>

                {/* Metric Strip for this Client's session */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-[#edd8d5]">
                    <span className="text-[10px] text-[#705055] uppercase block font-semibold">Chair Time</span>
                    <span className="font-bold text-[#221417] flex items-center justify-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-[#8e273e]" />
                      {activeTestimonial.sessionTimeHours} Hours
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-[#edd8d5]">
                    <span className="text-[10px] text-[#705055] uppercase block font-semibold">Tension Score</span>
                    <span className="font-bold text-emerald-700 flex items-center justify-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {activeTestimonial.tensionLevel}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-[#edd8d5]">
                    <span className="text-[10px] text-[#705055] uppercase block font-semibold">Master Artisan</span>
                    <span className="font-bold text-[#8e273e] truncate block mt-0.5">
                      {activeTestimonial.braiderName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Client Review & Social Proof Details */}
              <div className="lg:col-span-6 space-y-5">
                {/* Client Profile Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#edd8d5]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8e273e] to-[#541220] text-white flex items-center justify-center font-serif text-lg font-bold shadow-md ring-2 ring-amber-400">
                      {activeTestimonial.clientName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif font-bold text-lg text-[#221417]">
                          {activeTestimonial.clientName}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{activeTestimonial.verifiedBadge}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#705055] mt-0.5">
                        <span>{activeTestimonial.location}</span>
                        <span>•</span>
                        <span>{activeTestimonial.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stars Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Challenge & Style Match Pills */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-700 font-bold uppercase text-[10px] shrink-0 mt-0.5">
                      Hair Concern:
                    </span>
                    <span className="text-[#543b3f] font-semibold">
                      {activeTestimonial.clientChallenge}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-[#8e273e] text-white font-bold uppercase text-[10px] shrink-0 mt-0.5">
                      Protective Style:
                    </span>
                    <span className="text-[#8e273e] font-bold">
                      {activeTestimonial.styleAchieved}
                    </span>
                  </div>
                </div>

                {/* Review Headline & Quote */}
                <div className="relative p-5 rounded-2xl bg-white border border-[#edd8d5] shadow-xs space-y-2.5">
                  <Quote className="w-8 h-8 text-[#8e273e]/15 absolute top-3 right-4 pointer-events-none" />
                  <h4 className="font-serif font-bold text-base text-[#221417] leading-snug">
                    "{activeTestimonial.reviewTitle}"
                  </h4>
                  <p className="text-sm text-[#543b3f] leading-relaxed italic">
                    "{activeTestimonial.reviewQuote}"
                  </p>
                </div>

                {/* Perks Experienced Checklist */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#705055] uppercase tracking-wider block">
                    Luxury Salon Perks Included in Her Visit:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeTestimonial.perksExperienced.map((perk, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold text-[#543b3f] bg-white px-2.5 py-1 rounded-lg border border-[#ebd8c1] flex items-center gap-1 shadow-2xs"
                      >
                        <CheckCircle2 className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{perk}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Replicate Look, Helpful vote */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleReplicate(activeTestimonial.styleAchieved)}
                      className="flex-1 sm:flex-none py-3 px-5 rounded-xl text-xs font-serif font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#781e32] hover:from-[#9e2d46] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <Crown className="w-4 h-4 text-amber-300" />
                      <span>Replicate This Crown Look</span>
                    </button>
                    <a
                      href={OFFICIAL_BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-3.5 rounded-xl text-xs font-semibold bg-white border border-[#decab1] text-[#8e273e] hover:bg-[#fdf2f4] transition-colors flex items-center justify-center gap-1 shadow-2xs"
                      title="View on booking schedule"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleHelpful(activeTestimonial.id, activeTestimonial.helpfulCount)}
                    className={`py-2 px-3.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                      likedMap[activeTestimonial.id]
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-white text-[#705055] border-[#edd8d5] hover:text-[#221417]'
                    }`}
                  >
                    <ThumbsUp
                      className={`w-3.5 h-3.5 ${
                        likedMap[activeTestimonial.id] ? 'fill-emerald-600 text-emerald-600' : ''
                      }`}
                    />
                    <span>
                      Helpful ({helpfulMap[activeTestimonial.id] ?? activeTestimonial.helpfulCount})
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Arrows & Slide Indicators */}
            <div className="mt-8 pt-6 border-t border-[#edd8d5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-white border border-[#edd8d5] hover:bg-[#f3eadc] text-[#221417] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-white border border-[#edd8d5] hover:bg-[#f3eadc] text-[#221417] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="text-xs text-[#705055] ml-2 font-medium">
                  Story {currentIndex + 1} of {filteredStories.length}
                </span>
              </div>

              {/* Dots Indicators */}
              <div className="flex items-center gap-1.5">
                {filteredStories.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setIsAutoplay(false);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-6 bg-[#8e273e]'
                        : 'w-2 bg-[#decab1] hover:bg-[#bba68d]'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Thumbnail Carousel Strip for Quick Story Switching */}
        <div className="mt-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#705055] flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-[#8e273e]" />
              <span>Browse All Verified Transformation Stories:</span>
            </span>
            <span className="text-[11px] text-[#705055]">Click any card to view detailed results</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {VERIFIED_TESTIMONIALS.map((item, idx) => {
              const isActive = activeTestimonial?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    // Find index in current filter or switch to all
                    const inFiltered = filteredStories.findIndex((s) => s.id === item.id);
                    if (inFiltered !== -1) {
                      setCurrentIndex(inFiltered);
                    } else {
                      setSelectedCategory('all');
                      const inAll = VERIFIED_TESTIMONIALS.findIndex((s) => s.id === item.id);
                      setCurrentIndex(inAll);
                    }
                    setIsAutoplay(false);
                  }}
                  className={`p-2 rounded-2xl border transition-all cursor-pointer bg-white group text-left ${
                    isActive
                      ? 'border-[#8e273e] ring-2 ring-[#8e273e]/20 shadow-md bg-[#fdf2f4]'
                      : 'border-[#edd8d5] hover:border-[#8e273e] shadow-2xs'
                  }`}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                    <img
                      src={item.afterImage}
                      alt={item.clientName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-black/70 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                      {item.tensionLevel}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs text-[#221417] truncate block">
                      {item.clientName}
                    </span>
                    <span className="text-[10px] text-[#8e273e] font-semibold truncate block">
                      {item.styleAchieved.split(' ')[0]} {item.styleAchieved.split(' ')[1]}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>
            <div className="p-4 bg-stone-900 border-t border-stone-800">
              <h4 className="font-serif font-bold text-base text-amber-300">{lightboxImage.title}</h4>
              <p className="text-xs text-stone-300 mt-0.5">{lightboxImage.subtitle}</p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Review & Earn 100 Points Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-white border border-[#edd8d5] rounded-3xl p-6 sm:p-8 shadow-2xl text-[#221417]">
            <button
              type="button"
              onClick={() => {
                setIsSubmitModalOpen(false);
                setSubmitSuccess(false);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#faf4f2] text-[#705055] hover:text-[#221417] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!submitSuccess ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitSuccess(true);
                }}
                className="space-y-4"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold mb-2">
                    <Award className="w-3.5 h-3.5 text-amber-700" />
                    <span>Earn 100 Crown Loyalty Points</span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#221417]">
                    Share Your Salon Experience
                  </h3>
                  <p className="text-xs text-[#705055] mt-1">
                    Your verified review helps fellow queens find the courage to protect their edges and embrace zero-tension braiding.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-[#705055] uppercase block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      placeholder="e.g. Maya J."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#edd8d5] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#705055] uppercase block mb-1">Protective Style Installed</label>
                    <input
                      type="text"
                      required
                      value={reviewForm.style}
                      onChange={(e) => setReviewForm({ ...reviewForm, style: e.target.value })}
                      placeholder="e.g. Smedium French Curl Goddess"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#edd8d5] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#705055] uppercase block mb-1">Initial Hair Challenge or Concern</label>
                    <input
                      type="text"
                      value={reviewForm.challenge}
                      onChange={(e) => setReviewForm({ ...reviewForm, challenge: e.target.value })}
                      placeholder="e.g. Tender scalp, short 4C natural hair, delicate edges..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#edd8d5] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#705055] uppercase block mb-1">Your Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= reviewForm.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="font-bold text-xs text-[#8e273e] ml-2">
                        {reviewForm.rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#705055] uppercase block mb-1">Your Testimonial Story</label>
                    <textarea
                      required
                      rows={3}
                      value={reviewForm.review}
                      onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                      placeholder="How did your scalp feel? How was your stylist's gentle technique? How long have your braids lasted?"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#edd8d5] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#705055] hover:bg-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#8e273e] hover:bg-[#9e2d46] transition-colors cursor-pointer shadow-md"
                  >
                    Submit Review (+100 Pts)
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#221417]">
                  Review Submitted Successfully!
                </h3>
                <p className="text-xs text-[#705055] max-w-sm mx-auto leading-relaxed">
                  Thank you, Queen! <strong>100 Loyalty Points</strong> have been credited to your Princess AHB account. Your verified review will appear after our salon concierge validation.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitModalOpen(false);
                    setSubmitSuccess(false);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8e273e] hover:bg-[#9e2d46] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
