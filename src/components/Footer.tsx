import React from 'react';
import { Crown, MapPin, Phone, Mail, ShieldCheck, Sparkles, ExternalLink, Calendar, MessageSquare, UserCheck } from 'lucide-react';
import { LOCATIONS, OFFICIAL_BOOKING_URL, CONTACT_INFO } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenLeadMagnet: () => void;
  setActiveTab: (tab: any) => void;
  onOpenHiringModal?: () => void;
  onOpenBoothRentalModal?: () => void;
  onOpenPaymentSetup?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenLeadMagnet,
  setActiveTab,
  onOpenHiringModal,
  onOpenBoothRentalModal,
  onOpenPaymentSetup,
}) => {
  return (
    <footer className="bg-[#fbf2ec] border-t border-[#edd8d5] text-[#543b3f] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Col 1: Brand & Direct Contact */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="lg" />

            <p className="text-xs text-[#543b3f] leading-relaxed">
              Honoring African hair artistry through tension-free technique, follicle-safe protective styling, and empowering braiders to scale luxury salon businesses.
            </p>

            {/* Direct Contact Pill Cards */}
            <div className="space-y-2 pt-1 text-xs">
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="flex items-center gap-2 text-[#8e273e] hover:text-[#221417] transition-colors font-semibold"
              >
                <Phone className="w-4 h-4 text-[#8e273e] shrink-0" />
                <span>Call / Text: {CONTACT_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 text-[#8e273e] hover:text-[#221417] transition-colors font-semibold"
              >
                <Mail className="w-4 h-4 text-[#8e273e] shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#8e273e] font-semibold pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8e273e]" /> Tension-Free
              </span>
              <span>·</span>
              <span>Hair Included</span>
              <span>·</span>
              <span>Human Hair Curls</span>
            </div>

            {/* Official Social Media Channels */}
            <div className="pt-3 border-t border-[#edd8d5]/80 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#705055]">
                Follow Princess AHB:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={CONTACT_INFO.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] border border-[#edd8d5] text-[#221417] hover:border-[#8e273e] hover:text-[#8e273e] text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                  title="Princess AHB on TikTok"
                >
                  <span className="font-bold">🎵 TikTok</span>
                  <ExternalLink className="w-3 h-3 text-[#705055]" />
                </a>

                <a
                  href={CONTACT_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] border border-[#edd8d5] text-[#221417] hover:border-[#8e273e] hover:text-[#8e273e] text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                  title="Princess AHB on Facebook"
                >
                  <span className="font-bold text-[#1877f2]">f</span>
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3 text-[#705055]" />
                </a>

                <a
                  href={CONTACT_INFO.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] border border-[#edd8d5] text-[#221417] hover:border-[#8e273e] hover:text-[#8e273e] text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                  title="Theprincessahb on YouTube"
                >
                  <span className="font-bold text-[#ff0000]">▶</span>
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3 text-[#705055]" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Locations Directory (Baton Rouge, LA & Virginia) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8e273e]">
              Salon Locations
            </h4>

            <div className="space-y-4 text-xs">
              {/* Louisiana Studio */}
              <div className="bg-[#ffffff] p-3.5 rounded-xl border border-[#edd8d5] shadow-2xs space-y-1">
                <div className="font-bold text-[#221417] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8e273e]" />
                  <span>Baton Rouge Studio (Louisiana)</span>
                </div>
                <div className="text-[11px] text-[#543b3f]">12135 Florida Blvd, Baton Rouge, LA 70815</div>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="text-[#8e273e] font-mono font-bold hover:underline">
                    {CONTACT_INFO.phone}
                  </a>
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
                    Online Booking
                  </span>
                </div>
              </div>

              {/* Virginia Studio Notice */}
              <div className="bg-[#fff9f6] p-3.5 rounded-xl border border-[#f0c5cd] shadow-2xs space-y-1.5">
                <div className="font-bold text-[#221417] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8e273e]" />
                  <span>Virginia Location</span>
                </div>
                <div className="text-[11px] text-[#8e273e] font-semibold bg-[#faebea] p-2 rounded-lg border border-[#f0c5cd] leading-relaxed">
                  ⚠️ <strong>Please text for confirmation.</strong> Do not book on the website.
                </div>
                <div className="flex items-center justify-between pt-0.5 text-[11px]">
                  <a
                    href={`sms:${CONTACT_INFO.phoneRaw}`}
                    className="inline-flex items-center gap-1 text-[#8e273e] font-bold hover:underline"
                  >
                    <MessageSquare className="w-3 h-3 text-[#8e273e]" />
                    <span>Text {CONTACT_INFO.phone}</span>
                  </a>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-[#705055] hover:text-[#8e273e]"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8e273e]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-[#543b3f]">
              <li>
                <a
                  href={OFFICIAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#8e273e] hover:text-[#221417] transition-colors flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Acuity Booking Schedule</span>
                  <ExternalLink className="w-3 h-3 text-[#8e273e]" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="hover:text-[#8e273e] transition-colors cursor-pointer"
                >
                  Protective Styles Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('client-portal')}
                  className="hover:text-[#8e273e] transition-colors cursor-pointer font-bold text-[#8e273e] flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#8e273e]" />
                  <span>Client Portal (Appointments & Loyalty)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('clinic')}
                  className="hover:text-[#8e273e] transition-colors cursor-pointer"
                >
                  Scalp SOS & Takedown
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('boutique')}
                  className="hover:text-[#8e273e] transition-colors cursor-pointer font-semibold text-[#8e273e]"
                >
                  Princess AHB Boutiques (Hairs & Supplies)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('digital-shop')}
                  className="hover:text-[#8e273e] transition-colors cursor-pointer"
                >
                  Courses & Braiding Academy
                </button>
              </li>
              {onOpenPaymentSetup && (
                <li>
                  <button
                    onClick={onOpenPaymentSetup}
                    className="hover:text-[#8e273e] transition-colors cursor-pointer font-bold text-[#8e273e]"
                  >
                    💳 What Do I Need to Get Paid? (Setup Guide)
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => setActiveTab('vip-club')}
                  className="hover:text-[#8e273e] transition-colors cursor-pointer"
                >
                  VIP Crown Club
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('braiders-network')}
                  className="hover:text-[#8e273e] transition-colors cursor-pointer"
                >
                  Braiders Collective Platform
                </button>
              </li>
              {onOpenHiringModal && (
                <li>
                  <button
                    onClick={onOpenHiringModal}
                    className="hover:text-[#8e273e] transition-colors cursor-pointer font-semibold text-[#8e273e]"
                  >
                    💼 Stylist Hiring ($500 Bonus)
                  </button>
                </li>
              )}
              {onOpenBoothRentalModal && (
                <li>
                  <button
                    onClick={onOpenBoothRentalModal}
                    className="hover:text-[#8e273e] transition-colors cursor-pointer font-semibold text-purple-900"
                  >
                    🔑 Booth Rental Opportunities ($175/wk)
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => setActiveTab('agents-hub')}
                  className="hover:text-[#8e273e] transition-colors cursor-pointer"
                >
                  Autonomous AI Agents
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="hover:text-[#8e273e] transition-colors cursor-pointer"
                >
                  Client Transformations
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Lead Generation & Contact Box */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8e273e]">
              Join the Crown VIP Club
            </h4>
            <p className="text-xs text-[#543b3f]">
              Get the free 30-Day Braid Care Blueprint plus $25 off your next appointment.
            </p>
            <button
              onClick={onOpenLeadMagnet}
              className="w-full py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-[#ffffff] bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#fcd34d]" />
              <span>Claim Free Blueprint & $25 Off</span>
            </button>
            <a
              href={OFFICIAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-[#8e273e] bg-[#ffffff] hover:bg-[#faebea] border border-[#edd8d5] flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#8e273e]" />
              <span>Direct Acuity Schedule (princessahb.as.me)</span>
              <ExternalLink className="w-3 h-3 text-[#8e273e]" />
            </a>

            <div className="p-3 bg-[#ffffff] rounded-xl border border-[#edd8d5] text-[11px] space-y-1">
              <div className="font-bold text-[#221417]">Studio Operating Hours:</div>
              <div className="text-[#705055]">Mon - Sat: 8:00 AM - 8:00 PM | Sun: 9:00 AM - 6:00 PM</div>
              <div className="text-[#8e273e] font-semibold pt-1">
                Support: <a href={`mailto:${CONTACT_INFO.email}`} className="underline">{CONTACT_INFO.email}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer Footnote */}
        <div className="pt-8 border-t border-[#edd8d5] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#705055] gap-4">
          <div>
            © {new Date().getFullYear()} Princess AHB (princessahb.as.me) · 12135 Florida Blvd, Baton Rouge, LA 70815 · Phone: (225) 288-2746 · Email: info@princessahb.com
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#8e273e] font-medium">Baton Rouge, Louisiana</span>
            <span>·</span>
            <span className="text-[#8e273e] font-medium">Virginia (Text Only)</span>
            <span>·</span>
            <span>Tension-Free Hair Craft</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
