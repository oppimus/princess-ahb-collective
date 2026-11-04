import React, { useState } from 'react';
import {
  Calendar,
  ShoppingBag,
  BookOpen,
  Menu,
  Phone,
  MessageSquare,
  DollarSign,
  Bot,
  MapPin,
  X,
  Share2,
  Sparkles,
  Download,
  Users,
  Key,
  ShieldCheck,
  Crown,
  Gift,
  UserCheck,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/mockData';

interface MobileAppDockProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onOpenBooking: () => void;
  onOpenPaymentSetup: () => void;
  onOpenHiringModal?: () => void;
  onOpenBoothRentalModal?: () => void;
  onOpenLeadMagnet?: () => void;
  onOpenCustomerProfile?: () => void;
}

export const MobileAppDock: React.FC<MobileAppDockProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenPaymentSetup,
  onOpenHiringModal,
  onOpenBoothRentalModal,
  onOpenLeadMagnet,
  onOpenCustomerProfile,
}) => {
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [showPwaInstallGuide, setShowPwaInstallGuide] = useState(false);

  return (
    <>
      {/* Persistent Mobile Bottom Navigation Bar (md:hidden) */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#ffffff]/98 backdrop-blur-lg border-t border-[#edd8d5] shadow-2xl safe-area-bottom"
      >
        <div className="grid grid-cols-5 items-center h-16 px-1 max-w-lg mx-auto">
          {/* 1. Home / Styles */}
          <button
            onClick={() => {
              setActiveTab('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center h-full w-full py-1 transition-colors cursor-pointer ${
              activeTab === 'services'
                ? 'text-[#8e273e] font-bold'
                : 'text-[#705055] hover:text-[#221417]'
            }`}
          >
            <div className={`p-1 rounded-full ${activeTab === 'services' ? 'bg-[#faebea]' : ''}`}>
              <span className="text-lg">👑</span>
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Styles</span>
          </button>

          {/* 2. Book Chair */}
          <button
            onClick={onOpenBooking}
            className="flex flex-col items-center justify-center h-full w-full py-1 text-[#8e273e] font-bold cursor-pointer group"
          >
            <div className="p-1 rounded-full bg-[#8e273e] text-white shadow-sm group-active:scale-90 transition-transform">
              <Calendar className="w-4 h-4 text-[#fcd34d]" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 text-[#8e273e] font-bold">Book</span>
          </button>

          {/* 3. Boutiques */}
          <button
            onClick={() => {
              setActiveTab('boutique');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center h-full w-full py-1 transition-colors cursor-pointer ${
              activeTab === 'boutique'
                ? 'text-[#8e273e] font-bold'
                : 'text-[#705055] hover:text-[#221417]'
            }`}
          >
            <div className={`p-1 rounded-full ${activeTab === 'boutique' ? 'bg-[#faebea]' : ''}`}>
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Boutiques</span>
          </button>

          {/* 4. Courses & Academy */}
          <button
            onClick={() => {
              setActiveTab('digital-shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center h-full w-full py-1 transition-colors cursor-pointer relative ${
              activeTab === 'digital-shop'
                ? 'text-[#8e273e] font-bold'
                : 'text-[#705055] hover:text-[#221417]'
            }`}
          >
            <div className={`p-1 rounded-full ${activeTab === 'digital-shop' ? 'bg-[#faebea]' : ''}`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Courses</span>
            <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-[#8e273e]" />
          </button>

          {/* 5. More Actions */}
          <button
            onClick={() => setIsQuickActionsOpen(true)}
            className="flex flex-col items-center justify-center h-full w-full py-1 text-[#705055] hover:text-[#221417] cursor-pointer"
          >
            <div className="p-1 rounded-full hover:bg-[#faf4f2]">
              <Menu className="w-4 h-4" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile Quick Action Bottom Sheet Modal */}
      {isQuickActionsOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs md:hidden">
          <div className="bg-[#ffffff] rounded-t-3xl w-full max-h-[85vh] overflow-y-auto border-t border-[#edd8d5] shadow-2xl p-5 space-y-5 animate-in slide-in-from-bottom duration-300">
            {/* Grab Bar & Header */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-1.5 bg-[#edd8d5] rounded-full mb-3" />
              <div className="w-full flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#221417]">
                    Princess AHB Quick Actions
                  </h4>
                  <p className="text-xs text-[#705055]">
                    12135 Florida Blvd · Baton Rouge, LA 70815
                  </p>
                </div>
                <button
                  onClick={() => setIsQuickActionsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#faf4f2] text-[#705055]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:2252882746"
                className="p-3 rounded-xl bg-gradient-to-br from-[#8e273e] to-[#6e1c2e] text-white flex items-center gap-2 shadow-md active:scale-95 transition-transform"
              >
                <Phone className="w-4 h-4 text-[#fcd34d]" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#fcd34d] block">Call Salon</span>
                  <span className="text-xs font-bold font-mono">(225) 288-2746</span>
                </div>
              </a>

              <a
                href="sms:2252882746?body=Hello%20Princess%20AHB%2C%20I%20would%20like%20to%20confirm%20an%20appointment%20for%20the%20Virginia%20location."
                className="p-3 rounded-xl bg-[#faebea] border border-[#f0c5cd] text-[#8e273e] flex items-center gap-2 active:scale-95 transition-transform"
              >
                <MessageSquare className="w-4 h-4 text-[#8e273e]" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8e273e] block">Virginia Text</span>
                  <span className="text-xs font-bold">Text to Confirm</span>
                </div>
              </a>
            </div>

            {/* Client Portal Mobile Card */}
            <button
              onClick={() => {
                setIsQuickActionsOpen(false);
                setActiveTab('client-portal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#221417] via-[#381a22] to-[#1a0b0e] text-white flex items-center justify-between text-left shadow-md cursor-pointer active:scale-98 transition-transform border border-[#fcd34d]/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-[#fcd34d] flex items-center justify-center border border-white/20">
                  <UserCheck className="w-5 h-5 text-[#fcd34d]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-bold text-xs text-white">Client Portal & Rewards</h5>
                    <span className="px-1.5 py-0.2 rounded bg-[#fcd34d] text-stone-900 text-[9px] font-black uppercase">
                      VIP Hub
                    </span>
                  </div>
                  <p className="text-[11px] text-white/80">Manage upcoming sessions & loyalty points</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#fcd34d] bg-white/15 px-2.5 py-1 rounded-lg border border-white/20">
                View Portal →
              </span>
            </button>

            {/* Customer Profile & Refer-a-Friend Mobile Card */}
            {onOpenCustomerProfile && (
              <button
                onClick={() => {
                  setIsQuickActionsOpen(false);
                  onOpenCustomerProfile();
                }}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#8e273e] via-[#781e32] to-[#591323] text-white flex items-center justify-between text-left shadow-md cursor-pointer active:scale-98 transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 text-[#fcd34d] flex items-center justify-center border border-white/20">
                    <Gift className="w-5 h-5 text-[#fcd34d]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-bold text-xs text-white">Refer a Queen & Get $25</h5>
                      <span className="px-1.5 py-0.2 rounded bg-[#fcd34d] text-stone-900 text-[9px] font-black uppercase">
                        Give $25
                      </span>
                    </div>
                    <p className="text-[11px] text-white/80">Unique referral link & rewards tracker</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#fcd34d] bg-white/15 px-2.5 py-1 rounded-lg border border-white/20">
                  Open Pass →
                </span>
              </button>
            )}

            {/* Crucial Owner Actions: Payment Setup & Automations */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#705055] tracking-wider block">
                Salon & Merchant Tools
              </span>

              {/* Get Paid Guide Button */}
              <button
                onClick={() => {
                  setIsQuickActionsOpen(false);
                  onOpenPaymentSetup();
                }}
                className="w-full p-3.5 rounded-xl bg-gradient-to-r from-[#fff9f6] to-[#fdf2f4] border border-[#f0c5cd] flex items-center justify-between text-left hover:border-[#8e273e] transition-all cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#8e273e] text-white flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-[#fcd34d]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#221417]">What Do I Need to Get Paid?</h5>
                    <p className="text-[11px] text-[#705055]">Bank setup, Acuity $50 deposits & Cash App/Zelle</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#8e273e] bg-white px-2 py-0.5 rounded border border-[#f0c5cd]">
                  View Guide
                </span>
              </button>

              {/* Automations Button */}
              <button
                onClick={() => {
                  setIsQuickActionsOpen(false);
                  setActiveTab('agents-hub');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full p-3.5 rounded-xl bg-white border border-[#edd8d5] flex items-center justify-between text-left hover:border-[#8e273e] transition-all cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#faf4f2] text-[#8e273e] flex items-center justify-center border border-[#edd8d5]">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#221417]">Automations & AI Suite</h5>
                    <p className="text-[11px] text-[#705055]">SMS reminders, 6-week retention & lead hunter</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#705055]">Open Hub →</span>
              </button>

              {/* Stylist Hiring */}
              {onOpenHiringModal && (
                <button
                  onClick={() => {
                    setIsQuickActionsOpen(false);
                    onOpenHiringModal();
                  }}
                  className="w-full p-3.5 rounded-xl bg-white border border-[#edd8d5] flex items-center justify-between text-left hover:border-[#8e273e] transition-all cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#faf4f2] text-[#8e273e] flex items-center justify-center border border-[#edd8d5]">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-[#221417]">We're Hiring Stylists & Braiders</h5>
                      <p className="text-[11px] text-[#705055]">$500 Sign-on bonus · Baton Rouge & Virginia</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Apply Now
                  </span>
                </button>
              )}

              {/* Booth Rental */}
              {onOpenBoothRentalModal && (
                <button
                  onClick={() => {
                    setIsQuickActionsOpen(false);
                    onOpenBoothRentalModal();
                  }}
                  className="w-full p-3.5 rounded-xl bg-white border border-[#edd8d5] flex items-center justify-between text-left hover:border-[#8e273e] transition-all cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#faf4f2] text-[#8e273e] flex items-center justify-center border border-[#edd8d5]">
                      <Key className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-[#221417]">Booth Rental Opportunities</h5>
                      <p className="text-[11px] text-[#705055]">$175/week · All utilities & equipment included</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#8e273e]">View Chairs</span>
                </button>
              )}

              {/* Install PWA Prompt */}
              <button
                onClick={() => setShowPwaInstallGuide(!showPwaInstallGuide)}
                className="w-full p-3 rounded-xl bg-[#faf4f2] border border-[#edd8d5] flex items-center justify-between text-left text-xs font-semibold text-[#8e273e]"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>How to Add App to Phone Home Screen</span>
                </div>
                <span>{showPwaInstallGuide ? '▲' : '▼'}</span>
              </button>

              {showPwaInstallGuide && (
                <div className="p-3.5 bg-white rounded-xl border border-[#edd8d5] text-xs text-[#543b3f] space-y-2">
                  <div className="space-y-1">
                    <strong className="text-[#221417] block">iPhone (Safari):</strong>
                    <p className="text-[11px] text-[#705055]">1. Tap the Share button (square with arrow) at the bottom of Safari.<br />2. Scroll down and tap <strong>"Add to Home Screen"</strong>.<br />3. Tap "Add" to install Princess AHB as a standalone app!</p>
                  </div>
                  <div className="space-y-1 pt-1 border-t border-[#edd8d5]">
                    <strong className="text-[#221417] block">Android (Chrome):</strong>
                    <p className="text-[11px] text-[#705055]">1. Tap the three dots (⋮) in the top-right corner of Chrome.<br />2. Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.<br />3. Open Princess AHB with one tap anytime!</p>
                  </div>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsQuickActionsOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#faf4f2] text-xs font-semibold text-[#705055] hover:bg-[#edd8d5] transition-colors"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </>
  );
};
