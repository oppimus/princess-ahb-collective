import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Tv,
  Coffee,
  Zap,
  Armchair,
  Calendar,
  ExternalLink,
  ChevronRight,
  Crown,
  HeartHandshake,
  Clock,
} from 'lucide-react';
import { CROWN_GUARANTEE_ITEMS, SANCTUARY_AMENITIES, OFFICIAL_BOOKING_URL } from '../data/mockData';

interface CrownGuaranteeAndSanctuaryProps {
  onOpenBooking: () => void;
  onOpenVIP?: () => void;
}

export const CrownGuaranteeAndSanctuary: React.FC<CrownGuaranteeAndSanctuaryProps> = ({
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'guarantee' | 'sanctuary'>('guarantee');

  const getAmenityIcon = (name: string) => {
    switch (name) {
      case 'Armchair':
        return <Armchair className="w-5 h-5 text-[#8e273e]" />;
      case 'Tablet':
        return <Tv className="w-5 h-5 text-[#8e273e]" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-[#8e273e]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#8e273e]" />;
    }
  };

  return (
    <section id="crown-guarantee-section" className="py-16 sm:py-20 bg-gradient-to-b from-[#fcf6f2] via-[#fff9f7] to-[#ffffff] text-[#221417] border-b border-[#edd8d5] relative overflow-hidden">
      {/* Decorative luxury gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#8e273e]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Toggle Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faebea] border border-[#f0c5cd] text-[#8e273e] text-xs font-serif font-bold uppercase tracking-widest shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8e273e]" />
              <span>Unmatched Salon Confidence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#221417] tracking-tight">
              Why You Can Book With <span className="italic text-[#8e273e]">Absolute Peace</span>
            </h2>
            <p className="text-sm text-[#543b3f]">
              We take the fear out of hair braiding. No headaches, no damaged edges, and no sitting all day in an uncomfortable chair.
            </p>
          </div>

          {/* Luxury Switch Buttons */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-sm shrink-0">
            <button
              onClick={() => setActiveTab('guarantee')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'guarantee'
                  ? 'bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] text-white shadow-md'
                  : 'text-[#543b3f] hover:text-[#221417]'
              }`}
            >
              <Award className="w-4 h-4 text-[#fcd34d]" />
              <span>100% Crown Guarantee</span>
            </button>
            <button
              onClick={() => setActiveTab('sanctuary')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'sanctuary'
                  ? 'bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] text-white shadow-md'
                  : 'text-[#543b3f] hover:text-[#221417]'
              }`}
            >
              <Armchair className="w-4 h-4 text-[#fcd34d]" />
              <span>VIP Sanctuary Amenities</span>
            </button>
          </div>
        </div>

        {/* TAB 1: 100% CROWN GUARANTEE */}
        {activeTab === 'guarantee' && (
          <div className="space-y-8">
            {/* Guarantee Highlight Banner with Gold Wax Seal Aesthetic */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a0b0e] via-[#2d1219] to-[#14080a] text-white p-6 sm:p-10 border border-[#8e273e]/50 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fcd34d] via-[#f59e0b] to-[#b45309] text-stone-900 flex items-center justify-center shrink-0 shadow-lg font-serif font-black text-xl">
                      👑
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-widest uppercase text-[#fcd34d]">
                        Official Princess AHB Warranty
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                        The Zero-Tension & Pain-Free Crown Guarantee
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
                    Every queen deserves a regal experience. We guarantee that your protective style will never pull tight on baby hairs, never cause sleepless nights, and stay immaculate. If anything isn't 100% right, we make it right for free.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-300">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Zero-Tension Certified</span>
                    </span>
                    <span className="text-white/30">·</span>
                    <span className="flex items-center gap-1.5 text-[#fcd34d] font-bold">
                      <CheckCircle2 className="w-4 h-4 text-[#fcd34d]" />
                      <span>7-Day Free Touch-Up</span>
                    </span>
                    <span className="text-white/30">·</span>
                    <span className="flex items-center gap-1.5 text-amber-200 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-amber-300" />
                      <span>Hypoallergenic Hair Provided</span>
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col items-stretch gap-3">
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="py-4 px-6 rounded-xl text-sm font-serif font-bold uppercase tracking-wider text-[#221417] bg-gradient-to-r from-[#fcd34d] via-[#fde047] to-[#fbbf24] hover:from-[#fef08a] transition-all shadow-xl shadow-[#fcd34d]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Calendar className="w-4 h-4 text-[#8e273e]" />
                    <span>Book Your Guaranteed Chair</span>
                  </button>

                  <a
                    href={OFFICIAL_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Direct Acuity Schedule (as.me)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* 4 Pillars of the Guarantee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {CROWN_GUARANTEE_ITEMS.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-3 hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#faebea] text-[#8e273e] flex items-center justify-center text-xs font-bold font-serif">
                    0{idx + 1}
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#faebea] text-[#8e273e] uppercase tracking-wider inline-block">
                    {item.tag}
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#221417]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#543b3f] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* SALON CRAFTSMANSHIP & ZERO-TENSION PHILOSOPHY */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#ffffff] border-2 border-[#edd8d5] shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#edd8d5] gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8e273e]">
                    <Crown className="w-3.5 h-3.5 text-[#fcd34d]" />
                    <span>The Princess Collective Standard</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#221417]">
                    Generational Artistry & Scalp Preservation
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#faebea] text-[#8e273e] border border-[#f0c5cd] self-start sm:self-auto">
                  Master Craftsmanship Pillars
                </span>
              </div>

              {/* Triad Craftsmanship Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {/* Pillar 1: Signature Master Braids */}
                <div className="rounded-2xl overflow-hidden border border-[#edd8d5] bg-[#faf4f2] flex flex-col group hover:shadow-md transition-all">
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-stone-900">
                    <img
                      src="/src/assets/images/boho_knotless_luxury_1791272062825.jpg"
                      alt="Signature Master Braided Crown"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#fcd34d] border border-[#fcd34d]/40">
                      👑 Master Braided Crown
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">
                      Waist-length signature knotless precision
                    </div>
                  </div>
                  <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#221417]">
                        "The Best Service. The Best Styles."
                      </h4>
                      <p className="text-xs text-[#543b3f] leading-relaxed mt-1">
                        When you sit in our chair, you are crowned in royalty. We believe luxury protective braiding should be effortless, featherlight, and completely pain-free from start to finish.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#ebd8c1] flex items-center justify-between text-[11px] text-[#8e273e] font-semibold">
                      <span>✓ Featherlight Weight</span>
                      <span>✓ Clean Geometric Parts</span>
                    </div>
                  </div>
                </div>

                {/* Pillar 2: Natural Hair & Scalp Health */}
                <div className="rounded-2xl overflow-hidden border border-[#edd8d5] bg-[#faf4f2] flex flex-col group hover:shadow-md transition-all">
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-stone-900">
                    <img
                      src="/src/assets/images/human_braiding_macro_1791668764830.jpg"
                      alt="Zero-Tension Root Grip & Follicle Care"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#fcd34d] border border-[#fcd34d]/40">
                      🌿 Natural Roots & Scalp Care
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">
                      Zero-tension parting that preserves hairline & edges
                    </div>
                  </div>
                  <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#221417]">
                        "Healthy Follicles & Thriving Natural Hair"
                      </h4>
                      <p className="text-xs text-[#543b3f] leading-relaxed mt-1">
                        We refuse to accept that protective styling must mean scalp pain or sacrificing your edges. Every zero-tension technique we use is engineered to nurture your follicles so your natural curls thrive underneath.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#ebd8c1] flex items-center justify-between text-[11px] text-[#8e273e] font-semibold">
                      <span>✓ 100% Gentle Root Grip</span>
                      <span>✓ Edge Preservation Certified</span>
                    </div>
                  </div>
                </div>

                {/* Pillar 3: African Cultural Heritage */}
                <div className="rounded-2xl overflow-hidden border border-[#edd8d5] bg-[#faf4f2] flex flex-col group hover:shadow-md transition-all">
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-stone-900">
                    <img
                      src="/src/assets/images/stitch_tribal_crown_1791272115286.jpg"
                      alt="West African Ancestral Braiding Artistry"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/40">
                      ✨ Generational Heritage
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">
                      West African braiding culture & architectural artistry
                    </div>
                  </div>
                  <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#221417]">
                        "Generational Mastery & Regal Artistry"
                      </h4>
                      <p className="text-xs text-[#543b3f] leading-relaxed mt-1">
                        African hair braiding is an ancestral birthright and cultural pride. Passed down through three generations of master braiders, we blend centuries of West African precision and speed with modern salon comfort.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#ebd8c1] flex items-center justify-between text-[11px] text-[#8e273e] font-semibold">
                      <span>✓ 3 Generations of Mastery</span>
                      <span>✓ Authentic African Craftsmanship</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VIP SANCTUARY AMENITIES */}
        {activeTab === 'sanctuary' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SANCTUARY_AMENITIES.map((amenity) => (
                <div
                  key={amenity.id}
                  className="p-6 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-3 hover:border-[#8e273e] hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#faebea] group-hover:bg-[#8e273e]/10 flex items-center justify-center transition-colors">
                    {getAmenityIcon(amenity.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#8e273e] uppercase tracking-wider block">
                      {amenity.tagline}
                    </span>
                    <h4 className="font-serif font-bold text-lg text-[#221417] mt-0.5">
                      {amenity.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#543b3f] leading-relaxed">
                    {amenity.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Sanctuary Retreat Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#faebea] via-[#fdf2f4] to-[#fcf6f2] border border-[#f0c5cd] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#221417]">
                  Ready to be pampered like royalty?
                </h3>
                <p className="text-xs sm:text-sm text-[#543b3f]">
                  Complimentary iced tea, Netflix tablets, and ergonomic chairs included with every service in Baton Rouge & Richmond.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenBooking}
                className="py-3 px-6 rounded-xl text-xs sm:text-sm font-serif font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] transition-all shadow-md shrink-0 cursor-pointer"
              >
                <span>Reserve Your Pampering Session</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
