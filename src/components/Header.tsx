import React, { useState } from 'react';
import { Calendar, BookOpen, Bot, Users, Gift, Menu, X, Crown, ShoppingBag, ShieldAlert, Sparkles, ExternalLink, Key, DollarSign, UserCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { OFFICIAL_BOOKING_URL, CONTACT_INFO } from '../data/mockData';
import { HeaderHairTipsTicker } from './HeaderHairTipsTicker';

interface HeaderProps {
  activeTab: 'services' | 'clinic' | 'boutique' | 'digital-shop' | 'vip-club' | 'agents-hub' | 'braiders-network' | 'gallery' | 'client-portal';
  setActiveTab: (tab: any) => void;
  onOpenBooking: () => void;
  onOpenLeadMagnet: () => void;
  onOpenHiringModal?: () => void;
  onOpenBoothRentalModal?: () => void;
  onOpenPaymentSetup?: () => void;
  onOpenCustomerProfile?: () => void;
  digitalCartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenLeadMagnet,
  onOpenHiringModal,
  onOpenBoothRentalModal,
  onOpenPaymentSetup,
  onOpenCustomerProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Streamlined, uncluttered navigation with Client Portal
  const navItems = [
    { id: 'services' as const, label: 'Braiding Styles', icon: Calendar },
    { id: 'client-portal' as const, label: 'Client Portal', icon: UserCheck, featured: true },
    { id: 'digital-shop' as const, label: 'Courses & Academy', icon: BookOpen },
    { id: 'clinic' as const, label: 'Scalp & Takedown', icon: ShieldAlert },
    { id: 'boutique' as const, label: 'Boutiques', icon: ShoppingBag },
    { id: 'vip-club' as const, label: 'VIP Club', icon: Crown },
    { id: 'braiders-network' as const, label: 'Braiders Network', icon: Users },
    { id: 'agents-hub' as const, label: 'Automations & AI Suite', icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#ffffff]/98 backdrop-blur-md border-b border-[#edd8d5] shadow-xs">
      {/* Top Banner - Clean, slim, uncluttered */}
      <div className="bg-[#781e32] text-[#ffffff] py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="text-[#fcd34d]">👑</span>
              <span>Princess AHB</span>
            </span>
            <span className="text-[#fcd34d]/60">·</span>
            <span>12135 Florida Blvd, Baton Rouge, LA 70815</span>
            <span className="text-[#fcd34d]/60 hidden md:inline">·</span>
            <a href="tel:2252882746" className="text-[#fcd34d] hover:underline font-bold hidden md:inline">
              📞 (225) 288-2746
            </a>
            <span className="text-[#fcd34d]/60 hidden lg:inline">·</span>
            <a href="mailto:info@princessahb.com" className="text-[#fce7ea] hover:underline hidden lg:inline">
              ✉️ info@princessahb.com
            </a>
            <span className="hidden xl:inline text-[#fcd34d] font-semibold">
              (VA: Text for confirmation · Do not book on website)
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="hidden md:flex items-center gap-2 pr-2 border-r border-white/20 text-[11px]">
              <span className="text-white/70">Follow:</span>
              <a
                href={CONTACT_INFO.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#fcd34d] transition-colors"
                title="TikTok"
              >
                TikTok
              </a>
              <span className="text-white/40">·</span>
              <a
                href={CONTACT_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#fcd34d] transition-colors"
                title="Facebook"
              >
                Facebook
              </a>
              <span className="text-white/40">·</span>
              <a
                href={CONTACT_INFO.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#fcd34d] transition-colors"
                title="YouTube"
              >
                YouTube
              </a>
            </div>
            <button
              onClick={onOpenLeadMagnet}
              className="hidden sm:flex items-center gap-1.5 text-[#fce7ea] hover:text-white transition-colors cursor-pointer text-[11px] sm:text-xs font-semibold shrink-0"
            >
              <Gift className="w-3.5 h-3.5 text-[#fcd34d]" />
              <span className="underline underline-offset-2">
                Claim $25 Salon Credit
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Free Healthy Hair Tips Animated Ribbon on the Header */}
      <HeaderHairTipsTicker />

      {/* Main Navigation Bar - Spacious, breathable layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 lg:h-20 gap-4">
          {/* Logo & Brand Identity */}
          <div
            onClick={() => setActiveTab('services')}
            className="cursor-pointer shrink-0 group select-none"
          >
            <BrandLogo size="md" />
          </div>

          {/* Desktop Navigation Links - Clean, uncluttered, no stacked badges */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs lg:text-[13px] font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'text-[#8e273e] bg-[#faebea] border border-[#f0c5cd] shadow-xs font-bold'
                      : item.featured
                      ? 'text-[#8e273e] hover:text-[#221417] hover:bg-[#faebea]/40'
                      : 'text-[#543b3f] hover:text-[#221417] hover:bg-[#faebea]/40'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-[#8e273e]' : item.featured ? 'text-[#b84256]' : 'text-[#856c70]'
                    }`}
                  />
                  <span>{item.label}</span>
                  {item.featured && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8e273e]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Secondary screen size nav (1024px to 1279px) - streamlined */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1">
            {navItems.slice(0, 5).map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#8e273e] bg-[#faebea] border border-[#f0c5cd] font-bold'
                      : 'text-[#543b3f] hover:text-[#221417] hover:bg-[#faebea]/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => setActiveTab('agents-hub')}
              className="px-2.5 py-1.5 rounded-md text-xs font-semibold text-[#8e273e] hover:bg-[#faebea]/40 cursor-pointer"
            >
              More...
            </button>
          </nav>

          {/* Right Header CTAs - Purposeful and accessible */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {onOpenHiringModal && (
              <button
                onClick={onOpenHiringModal}
                className="px-2.5 py-1.5 text-xs font-semibold text-[#8e273e] hover:text-[#221417] hover:bg-[#faebea] rounded-md transition-colors flex items-center gap-1 cursor-pointer border border-[#edd8d5]"
                title="Hiring braiders and stylists with $500 bonus"
              >
                <Users className="w-3.5 h-3.5 text-[#8e273e]" />
                <span className="hidden xl:inline">We're Hiring</span>
                <span className="xl:hidden">Hiring</span>
              </button>
            )}

            {onOpenPaymentSetup && (
              <button
                onClick={onOpenPaymentSetup}
                className="px-2.5 py-1.5 text-xs font-bold text-[#8e273e] hover:bg-[#faebea] rounded-md transition-colors flex items-center gap-1 cursor-pointer border border-[#f0c5cd] bg-[#fffbf9]"
                title="What do I need to get paid? Merchant and bank setup guide"
              >
                <DollarSign className="w-3.5 h-3.5 text-[#8e273e]" />
                <span className="hidden xl:inline">Get Paid</span>
              </button>
            )}

            {onOpenBoothRentalModal && (
              <button
                onClick={onOpenBoothRentalModal}
                className="px-2.5 py-1.5 text-xs font-semibold text-[#781e32] hover:bg-[#faebea] rounded-md transition-colors flex items-center gap-1 cursor-pointer border border-[#edd8d5]"
                title="Booth rental opportunities in Baton Rouge & Virginia"
              >
                <Key className="w-3.5 h-3.5 text-[#8e273e]" />
                <span className="hidden xl:inline">Booth Rental</span>
                <span className="xl:hidden">Booths</span>
              </button>
            )}

            {/* Returning Client Portal Button */}
            <button
              onClick={() => setActiveTab('client-portal')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer border ${
                activeTab === 'client-portal'
                  ? 'bg-[#8e273e] text-white border-[#8e273e] shadow-xs'
                  : 'text-[#8e273e] hover:bg-[#faebea] border-[#f0c5cd] bg-white shadow-2xs'
              }`}
              title="Client Portal: View appointments & accumulated loyalty points"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Client Portal</span>
              <span className="xl:hidden">Portal</span>
            </button>

            {onOpenCustomerProfile && (
              <button
                onClick={onOpenCustomerProfile}
                className="px-2.5 py-1.5 text-xs font-bold text-[#8e273e] hover:bg-[#faebea] rounded-md transition-colors flex items-center gap-1 cursor-pointer border border-[#f0c5cd] bg-white shadow-2xs"
                title="Customer Profile & Refer-a-Friend Rewards"
              >
                <Crown className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden xl:inline">Refer & Earn $25</span>
                <span className="xl:hidden">Refer $25</span>
              </button>
            )}

            <button
              onClick={onOpenLeadMagnet}
              className="px-2.5 py-1.5 text-xs font-semibold text-[#8e273e] hover:text-[#221417] hover:bg-[#faebea] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 text-[#8e273e]" />
              <span className="hidden 2xl:inline">Free Guide</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="px-3 py-2 text-xs font-semibold text-[#8e273e] hover:bg-[#faebea] border border-[#edd8d5] rounded-md transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Interactive braid pricing calculator & customizer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8e273e]" />
              <span className="hidden lg:inline">Estimator</span>
            </button>

            <a
              href={OFFICIAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-bold tracking-wider uppercase text-[#ffffff] bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] rounded-md transition-all shadow-md shadow-[#8e273e]/20 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Chair</span>
              <ExternalLink className="w-3 h-3 text-[#fcd34d]" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={OFFICIAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-bold uppercase text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] rounded-md shadow-2xs flex items-center gap-1"
            >
              <span>Book</span>
              <ExternalLink className="w-3 h-3 text-[#fcd34d]" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#503a40] hover:text-[#221417] rounded-md bg-[#faf4f2] border border-[#edd8d5] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#ffffff] border-b border-[#edd8d5] px-4 pt-3 pb-6 space-y-1.5 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-[#fdf2f4] text-[#8e273e] border border-[#edd8d5]'
                    : 'text-[#503a40] hover:bg-[#faf4f2]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#8e273e]' : 'text-[#705055]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.featured && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#fce7ea] text-[#8e273e]">
                    Passive Income
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#edd8d5] flex flex-col gap-2">
            {onOpenHiringModal && (
              <button
                onClick={() => {
                  onOpenHiringModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#8e273e] to-[#781e32] rounded-md flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Users className="w-4 h-4 text-[#fcd34d]" />
                <span>Now Hiring Stylists ($500 Bonus)</span>
              </button>
            )}

            {onOpenPaymentSetup && (
              <button
                onClick={() => {
                  onOpenPaymentSetup();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-xs font-bold text-[#8e273e] bg-[#fdf2f4] border border-[#f0c5cd] rounded-md flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <DollarSign className="w-4 h-4 text-[#8e273e]" />
                <span>What Do I Need to Get Paid? (Setup Guide)</span>
              </button>
            )}

            {onOpenBoothRentalModal && (
              <button
                onClick={() => {
                  onOpenBoothRentalModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-xs font-bold text-[#2e1065] bg-purple-50 border border-purple-200 rounded-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Key className="w-4 h-4 text-purple-700" />
                <span>Booth Rental Opportunities ($175/wk)</span>
              </button>
            )}

            <button
              onClick={() => {
                onOpenLeadMagnet();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-xs font-semibold text-[#8e273e] bg-[#faebea] border border-[#f0c5cd] rounded-md flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4 text-[#8e273e]" />
              <span>Download Free Braid Care Blueprint</span>
            </button>
            <a
              href={OFFICIAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-xs font-bold uppercase text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] rounded-md flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book on Acuity Schedule (princessahb.as.me)</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#fcd34d]" />
            </a>

            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-xs font-semibold text-[#8e273e] bg-[#ffffff] border border-[#edd8d5] rounded-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Style Price Estimator & Customizer</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
