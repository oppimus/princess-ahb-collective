import React from 'react';
import { ShieldAlert, ShoppingBag, Crown, BookOpen, Users, Star, ArrowRight, Sparkles, Heart } from 'lucide-react';

interface CollectiveDiscoveryHubProps {
  onSelectTab: (tab: 'clinic' | 'boutique' | 'digital-shop' | 'vip-club' | 'braiders-network' | 'gallery') => void;
  digitalProductsCount: number;
}

export const CollectiveDiscoveryHub: React.FC<CollectiveDiscoveryHubProps> = ({
  onSelectTab,
  digitalProductsCount,
}) => {
  const suites = [
    {
      id: 'clinic' as const,
      title: 'Scalp SOS & Takedown Clinic',
      subtitle: 'Follicle recovery, pain-free takedowns & botanical steam therapy',
      badge: 'Scalp Health',
      icon: ShieldAlert,
      accentColor: 'from-[#8e273e] to-[#781e32]',
      features: ['Gentle matting recovery', 'Herbal steam & detox infusion', 'Edges & alopecia protective styling'],
      cta: 'Explore Clinic Suite',
    },
    {
      id: 'boutique' as const,
      title: 'Princess AHB Boutiques',
      subtitle: 'Hairs, beauty supplies, authentic African clothes & Batana oils',
      badge: 'Boutiques & Emporium',
      icon: ShoppingBag,
      accentColor: 'from-[#8e273e] to-[#781e32]',
      features: ['100% Raw human hair bulk curls', 'Pro beauty supplies & edge control', 'Authentic African wax print fashion'],
      cta: 'Explore Boutiques',
    },
    {
      id: 'digital-shop' as const,
      title: 'Courses & Braiding Academy',
      subtitle: 'Interactive video masterclasses, braider business acceleration & student certification',
      badge: `${digitalProductsCount} Courses & Guides`,
      icon: BookOpen,
      accentColor: 'from-[#8e273e] to-[#781e32]',
      features: ['Knotless speed mechanics masterclass', 'Interactive student classroom & video player', 'Printable gold-seal certificate of completion'],
      cta: 'Explore Courses & Academy',
    },
    {
      id: 'vip-club' as const,
      title: 'VIP Crown Club Membership',
      subtitle: 'Exclusive perks, instant $25 credit & priority squeeze-in access',
      badge: 'VIP Savings',
      icon: Crown,
      accentColor: 'from-[#8e273e] to-[#781e32]',
      features: ['$25 Instant salon voucher', 'Priority booking window', '10% off all boutique products'],
      cta: 'Join VIP Crown Club',
    },
    {
      id: 'braiders-network' as const,
      title: 'Braiders Collective & Booth Rental',
      subtitle: 'Now hiring stylists ($500 bonus) & turnkey booth rentals from $175/wk',
      badge: 'Now Hiring & Renting',
      icon: Users,
      accentColor: 'from-[#8e273e] to-[#781e32]',
      features: ['Stylist hiring ($500 signing bonus)', 'Turnkey hydraulic booth rental ($175/wk)', 'Baton Rouge & Virginia studios'],
      cta: 'Apply to Hire or Rent Booth',
    },
    {
      id: 'gallery' as const,
      title: 'Client Transformations & Reviews',
      subtitle: 'Real crowns, real protection, zero-tension verified testimonials',
      badge: 'Verified Proof',
      icon: Star,
      accentColor: 'from-[#8e273e] to-[#781e32]',
      features: ['5-Star client experiences', 'Edge preservation documentation', 'Zero headache guarantee'],
      cta: 'View All Transformations',
    },
  ];

  return (
    <section id="collective-hub-section" className="py-16 bg-[#ffffff] border-y border-[#edd8d5] text-[#221417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faebea] text-[#8e273e] text-xs font-semibold uppercase tracking-wider border border-[#f0c5cd]">
              <Sparkles className="w-3.5 h-3.5 text-[#8e273e]" />
              <span>Full-Spectrum Hair & Business Ecosystem</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#221417] tracking-tight">
              The Princess AHB Collective Suites
            </h3>
            <p className="text-sm text-[#543b3f] leading-relaxed">
              Beyond master braiding, we empower your crown with holistic scalp treatments, organic follicle nourishment, client VIP clubs, and business blueprints.
            </p>
          </div>
        </div>

        {/* 6 Suites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suites.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className="bg-[#fcf5f1] border border-[#edd8d5] rounded-2xl p-6 flex flex-col justify-between hover:border-[#8e273e] hover:shadow-md transition-all cursor-pointer group select-none"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#faebea] border border-[#f0c5cd] flex items-center justify-center text-[#8e273e] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-[#8e273e]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#ffffff] text-[#8e273e] border border-[#edd8d5]">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-lg text-[#221417] group-hover:text-[#8e273e] transition-colors leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-[#543b3f] leading-relaxed">
                    {item.subtitle}
                  </p>

                  <div className="pt-2 border-t border-[#edd8d5]/60 space-y-1.5">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#705055]">
                        <span className="w-1 h-1 rounded-full bg-[#8e273e]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#edd8d5] flex items-center justify-between text-xs font-bold text-[#8e273e]">
                  <span>{item.cta}</span>
                  <ArrowRight className="w-4 h-4 text-[#8e273e] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
