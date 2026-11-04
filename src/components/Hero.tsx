import React, { useState } from 'react';
import { Crown, Sparkles, ShieldCheck, Star, Clock, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import { OFFICIAL_BOOKING_URL } from '../data/mockData';
import heroLookBeautifulImg from '../assets/images/hero_look_beautiful_1791871544212.jpg';
import frenchCurlGlamourImg from '../assets/images/french_curl_glamour_1791272082696.jpg';
import braidedUpdoCrownImg from '../assets/images/braided_updo_crown_1791873904399.jpg';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenLeadMagnet: () => void;
  onExploreAgents?: () => void;
  onExploreDigitalShop: () => void;
  onOpenBoutique?: () => void;
  onOpenVIP?: () => void;
  onExploreStudio?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenLeadMagnet,
  onExploreDigitalShop,
  onExploreStudio,
}) => {
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);

  const signatureCrowns = [
    {
      id: 'boho-knotless',
      label: 'Bohemian Knotless Crown',
      tag: 'Signature Knotless',
      url: heroLookBeautifulImg,
      fallbackUrl: '/assets/images/hero_look_beautiful_1791871544212.jpg',
      headline: 'Look & Feel Beautiful.',
      desc: 'The Best Service. The Best Styles. Painless precision crafted by generational master braiders.',
      alt: 'Luxury Bohemian Goddess Knotless Braids with Flowing Curls',
    },
    {
      id: 'french-curls',
      label: 'French Curl Glamour',
      tag: 'Silky Bouncy Curls',
      url: frenchCurlGlamourImg,
      fallbackUrl: '/assets/images/french_curl_glamour_1791272082696.jpg',
      headline: 'Healthy Roots First.',
      desc: 'Zero-tension protective styling so your natural hair thrives underneath with maximum volume and shine.',
      alt: 'French Curl Braids with Defined Bouncy Ends',
    },
    {
      id: 'braided-updo',
      label: 'Regal Sculpted Updo',
      tag: 'Generational Craft',
      url: braidedUpdoCrownImg,
      fallbackUrl: '/assets/images/braided_updo_crown_1791873904399.jpg',
      headline: 'Regal Cultural Artistry.',
      desc: 'Centuries of West African braiding tradition brought to modern luxury salon comfort in Louisiana and Virginia.',
      alt: 'Regal Sculpted Braided Crown Updo',
    },
  ];

  const currentPhoto = signatureCrowns[activeSlideIdx];

  return (
    <section className="relative overflow-hidden pt-6 pb-14 sm:py-16 bg-gradient-to-b from-[#fcf5f1] via-[#fffaf6] to-[#fbf0ea] border-b border-[#edd8d5]">
      {/* Warm atmospheric berry-gold radiant glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#8e273e]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Image 2 Inspired Headlines & Themed Booking CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faebea] border border-[#f0c5cd] text-[#8e273e] text-xs font-semibold tracking-wider uppercase">
              <Crown className="w-3.5 h-3.5 text-[#8e273e]" />
              <span>Princess African Hair Braiding & Collective</span>
            </div>

            {/* Main Headline from User Image 2 */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#221417] tracking-tight leading-[1.1]">
                Look & Feel <br />
                <span className="italic font-serif text-[#8e273e]">Beautiful.</span>
              </h1>
              <p className="text-xl sm:text-2xl font-serif text-[#543b3f] font-medium tracking-wide">
                The Best Service. The Best Styles.
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#543b3f] max-w-xl font-normal leading-relaxed">
              Experience generational braiding mastery with our signature zero-tension technique. Every protective style honors your crown with scalp health, clean geometric parting, and premium hair included.
            </p>

            {/* Signature Framed BOOK NOW Button (Inspired directly by User Image 2) + Supporting CTAs */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Signature Framed BOOK NOW button matching Image 2 style */}
              <a
                href={OFFICIAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 text-xs sm:text-sm font-serif font-bold tracking-widest uppercase text-white bg-[#1a0b0e] hover:bg-[#8e273e] border-2 border-white/90 sm:border-[#1a0b0e] hover:border-[#8e273e] rounded-lg transition-all shadow-lg shadow-black/20 flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 group"
              >
                <span>BOOK NOW</span>
                <ExternalLink className="w-4 h-4 text-[#fcd34d] group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Virtual Look Studio Customizer Button (WOW FACTOR) */}
              <a
                href="#virtual-braid-studio"
                onClick={(e) => {
                  e.preventDefault();
                  if (onExploreStudio) {
                    onExploreStudio();
                  } else {
                    const el = document.getElementById('virtual-braid-studio');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#8e273e] bg-[#ffffff] hover:bg-[#faebea] border-2 border-[#8e273e]/30 hover:border-[#8e273e] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#8e273e]" />
                <span>Virtual Braid Studio</span>
              </a>

              {/* Style & Price Estimator Button */}
              <button
                onClick={onOpenBooking}
                className="px-4 py-3 text-xs sm:text-sm font-semibold text-[#543b3f] bg-[#ffffff] hover:bg-[#faebea] border border-[#edd8d5] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Clock className="w-4 h-4 text-[#8e273e]" />
                <span>Quick Book</span>
              </button>
            </div>

            {/* Micro Trust Proof */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#705055]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8e273e]" />
                <span>Zero-Tension Edge Guarantee</span>
              </div>
              <span className="text-[#d9b8be]">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8e273e]" />
                <span>Premium Extensions Included</span>
              </div>
              <span className="text-[#d9b8be]">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8e273e]" />
                <span>Fast Multi-Hand Braiding</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="pt-4 border-t border-[#edd8d5] grid grid-cols-3 gap-3 max-w-md">
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#221417]">18,500+</div>
                <div className="text-[10px] text-[#705055] uppercase tracking-wider font-semibold">Crowns Braided</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#8e273e] flex items-center gap-1">
                  4.95 <Star className="w-3.5 h-3.5 fill-[#8e273e] text-[#8e273e]" />
                </div>
                <div className="text-[10px] text-[#705055] uppercase tracking-wider font-semibold">Client Rating</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#8e273e]">LA & VA</div>
                <div className="text-[10px] text-[#705055] uppercase tracking-wider font-semibold">Louisiana & Virginia Studios</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Banner Showcase Featuring Signature Salon Crowns with Interactive Switcher */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#edd8d5] shadow-2xl group bg-[#221417]">
              {/* Salon Signature Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-[#fcd34d] border border-[#fcd34d]/40 shadow-sm flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-[#fcd34d]" />
                  <span>Signature Salon Masterpieces</span>
                </span>
              </div>

              {/* Interactive Style Switcher */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                {signatureCrowns.map((photo, idx) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setActiveSlideIdx(idx)}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all cursor-pointer shadow-md ${
                      activeSlideIdx === idx
                        ? 'border-[#fcd34d] ring-2 ring-[#fcd34d]/60 scale-110 opacity-100'
                        : 'border-white/70 opacity-70 hover:opacity-100 hover:border-white'
                    }`}
                    title={photo.tag}
                  >
                    <img
                      src={photo.url}
                      alt={photo.label}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (photo.fallbackUrl && target.src !== photo.fallbackUrl) {
                          target.src = photo.fallbackUrl;
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Showcase Photo Display */}
              <img
                src={currentPhoto.url}
                alt={currentPhoto.alt}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (currentPhoto.fallbackUrl && target.src !== currentPhoto.fallbackUrl) {
                    target.src = currentPhoto.fallbackUrl;
                  }
                }}
                className="w-full h-[460px] sm:h-[510px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />

              {/* Gradient Overlay in Warm Berry, Wine & Rose Tones */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#221417]/95 via-[#221417]/35 to-black/20 pointer-events-none" />

              {/* In-Frame Headline, Description & Booking overlay */}
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-2.5 z-20">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-serif italic text-[#fcd34d] tracking-wider uppercase font-semibold">
                    {currentPhoto.tag}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-[11px] text-[#f5e6e8]">
                    {currentPhoto.label}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold leading-tight drop-shadow-md">
                  {currentPhoto.headline}
                </h3>

                <p className="text-xs text-[#f5e6e8] leading-relaxed line-clamp-2">
                  {currentPhoto.desc}
                </p>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <a
                    href={OFFICIAL_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-2.5 px-6 rounded-md text-xs font-serif font-bold uppercase tracking-widest text-white border-2 border-white/90 bg-black/40 backdrop-blur-sm hover:bg-white hover:text-[#221417] transition-all cursor-pointer shadow-md"
                  >
                    <span>BOOK YOUR APPOINTMENT</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* Photo selector indicator dots */}
                  <div className="flex items-center gap-1.5">
                    {signatureCrowns.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveSlideIdx(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          activeSlideIdx === idx ? 'w-5 bg-[#fcd34d]' : 'w-1.5 bg-white/40'
                        }`}
                        aria-label={`Switch to signature crown ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
