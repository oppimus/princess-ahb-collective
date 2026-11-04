import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, X, ArrowRight, Gift, Key, Users, ShoppingBag } from 'lucide-react';
import { AD_PROMOTIONS } from '../data/mockData';
import { AdPromotion } from '../types';

interface SiteAdBannerProps {
  onHireStylist: () => void;
  onBoothRental: () => void;
  onOpenBoutiqueHairs: () => void;
  onOpenBoutiqueClothes: () => void;
  onOpenBooking: () => void;
  onOpenLeadMagnet: () => void;
}

export const SiteAdBanner: React.FC<SiteAdBannerProps> = ({
  onHireStylist,
  onBoothRental,
  onOpenBoutiqueHairs,
  onOpenBoutiqueClothes,
  onOpenBooking,
  onOpenLeadMagnet,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate || isDismissed) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AD_PROMOTIONS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [autoRotate, isDismissed]);

  if (isDismissed) return null;

  const currentAd = AD_PROMOTIONS[currentIndex];

  const handleAction = (ad: AdPromotion) => {
    switch (ad.actionType) {
      case 'hire-stylist':
        onHireStylist();
        break;
      case 'booth-rental':
        onBoothRental();
        break;
      case 'boutique-hairs':
        onOpenBoutiqueHairs();
        break;
      case 'boutique-clothes':
        onOpenBoutiqueClothes();
        break;
      case 'booking':
        onOpenBooking();
        break;
      case 'lead-magnet':
        onOpenLeadMagnet();
        break;
      default:
        break;
    }
  };

  const getAdIcon = (actionType: string) => {
    switch (actionType) {
      case 'hire-stylist':
        return <Users className="w-4 h-4 text-[#fcd34d]" />;
      case 'booth-rental':
        return <Key className="w-4 h-4 text-[#fcd34d]" />;
      case 'boutique-hairs':
      case 'boutique-clothes':
        return <ShoppingBag className="w-4 h-4 text-[#fcd34d]" />;
      default:
        return <Gift className="w-4 h-4 text-[#fcd34d]" />;
    }
  };

  return (
    <div
      className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 select-none"
      onMouseEnter={() => setAutoRotate(false)}
      onMouseLeave={() => setAutoRotate(true)}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${currentAd.bgGradient} text-white p-4 sm:p-5 shadow-lg border border-white/15 transition-all duration-500`}
      >
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#fcd34d]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Ad content */}
          <div className="space-y-1.5 flex-1 pr-8 md:pr-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-extrabold uppercase tracking-wider text-[#fcd34d] border border-white/20 flex items-center gap-1.5">
                {getAdIcon(currentAd.actionType)}
                <span>{currentAd.badge}</span>
              </span>
              <span className="text-[10px] text-white/60 uppercase tracking-widest hidden sm:inline">
                · Featured Salon Announcement
              </span>
            </div>

            <div className="pt-0.5">
              <h4 className="font-serif font-bold text-base sm:text-lg text-white leading-snug">
                {currentAd.headline}
              </h4>
              <p className="text-xs text-white/85 max-w-2xl leading-relaxed mt-0.5">
                {currentAd.subtext}
              </p>
            </div>
          </div>

          {/* Action CTA & Navigation */}
          <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
            <button
              onClick={() => handleAction(currentAd)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#fcd34d] to-[#fbbf24] hover:from-[#fef08a] text-[#5a1222] text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
            >
              <span>{currentAd.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-1 bg-black/25 backdrop-blur-sm rounded-lg p-1 border border-white/15">
              <button
                onClick={() =>
                  setCurrentIndex((prev) => (prev - 1 + AD_PROMOTIONS.length) % AD_PROMOTIONS.length)
                }
                className="p-1 rounded hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Previous ad"
                aria-label="Previous ad"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <span className="text-[10px] font-mono px-1.5 text-[#fcd34d]">
                {currentIndex + 1}/{AD_PROMOTIONS.length}
              </span>

              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % AD_PROMOTIONS.length)}
                className="p-1 rounded hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Next ad"
                aria-label="Next ad"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dismiss button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Dismiss announcement"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Small dots indicator */}
        <div className="flex items-center gap-1.5 mt-2.5">
          {AD_PROMOTIONS.map((ad, idx) => (
            <button
              key={ad.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? 'w-6 bg-[#fcd34d]' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
