import React, { useState } from 'react';
import { Sparkles, Calendar, Zap, Compass, ExternalLink, Star } from 'lucide-react';
import { OFFICIAL_BOOKING_URL } from '../data/mockData';

interface HomeFlowNavProps {
  onOpenBooking: () => void;
}

export const HomeFlowNav: React.FC<HomeFlowNavProps> = ({ onOpenBooking }) => {
  const [activeAnchor, setActiveAnchor] = useState<string>('lookbook-section');

  const links = [
    { id: 'virtual-braid-studio', label: 'Virtual Look Studio', icon: Sparkles, badge: 'Interactive' },
    { id: 'testimonials-section', label: 'Verified Reviews', icon: Star, badge: '4.98★' },
    { id: 'transformation-gallery', label: 'Before & After', icon: Compass, badge: 'Real Proof' },
    { id: 'crown-guarantee-section', label: '100% Guarantee', icon: Zap, badge: 'Zero Tension' },
    { id: 'lookbook-section', label: '12 Master Styles', icon: Sparkles },
    { id: 'styles-menu', label: 'Price Estimator', icon: Calendar },
    { id: 'flash-specials-section', label: 'Flash Squeeze-Ins', icon: Zap, badge: 'Save $45' },
  ];

  const scrollTo = (id: string) => {
    setActiveAnchor(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="sticky top-[73px] sm:top-[77px] z-30 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#edd8d5] shadow-xs hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 gap-2">
          {/* Section links */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = activeAnchor === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#faebea] text-[#8e273e] border border-[#f0c5cd] shadow-2xs font-bold'
                      : 'text-[#543b3f] hover:text-[#221417] hover:bg-[#faebea]/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#8e273e]' : 'text-[#856c70]'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#8e273e] text-white">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Book mini action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8e273e] hover:bg-[#faebea] border border-[#edd8d5] transition-colors cursor-pointer"
              title="Estimate custom price & style"
            >
              Estimator
            </button>
            <a
              href={OFFICIAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-[#8e273e] hover:bg-[#781e32] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <span>Book on Acuity</span>
              <ExternalLink className="w-3 h-3 text-[#fcd34d]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
