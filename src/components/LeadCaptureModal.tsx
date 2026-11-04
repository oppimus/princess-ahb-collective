import React, { useState } from 'react';
import { X, Gift, CheckCircle2, Download, ArrowRight, ShieldCheck, Sparkles, MessageSquare, ExternalLink, Calendar } from 'lucide-react';
import { Lead } from '../types';
import { OFFICIAL_BOOKING_URL } from '../data/mockData';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCaptured: (lead: Lead) => void;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  onLeadCaptured,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredStyle, setPreferredStyle] = useState('Boho Knotless Braids');
  const [submitted, setSubmitted] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'voucher'>('guide');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      fullName,
      email,
      phone,
      preferredStyle,
      source: 'Free Braid Care Blueprint',
      dateCreated: new Date().toISOString().split('T')[0],
      status: 'New Lead',
      estimatedValue: 240,
      lastMessageSent: 'Instant SMS sent: Welcome Voucher CROWN25 + PDF access link',
    };

    onLeadCaptured(newLead);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#ffffff] border border-[#edd8d5] rounded-2xl shadow-2xl overflow-hidden text-[#221417]">
        {/* Top Header Badge */}
        <div className="bg-gradient-to-r from-[#6e1c2e] via-[#8e273e] to-[#6e1c2e] px-6 py-3.5 border-b border-[#a02f48] flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#fcd34d]" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              Instant Lead Magnet & VIP Gift
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#fce7ea] hover:text-white hover:bg-black/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {!submitted ? (
            <div>
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#221417] mb-2">
                  The 30-Day Crown Retention & Tension-Free Braid Care Blueprint
                </h3>
                <p className="text-sm text-[#543b3f]">
                  Never lose your edges or suffer from itchy, tense braids again. Download our master guide (valued at $25) <strong className="text-[#8e273e]">100% FREE</strong>, plus receive an instant <strong className="text-[#8e273e]">$25 Salon Gift Card</strong> to Princess AHB!
                </p>
              </div>

              {/* What is inside bullets */}
              <div className="mb-6 p-4 rounded-xl bg-[#fcf5f1] border border-[#edd8d5] space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs text-[#221417]">
                  <CheckCircle2 className="w-4 h-4 text-[#8e273e] shrink-0 mt-0.5" />
                  <span><strong>The 48-Hour Tension Relief Recipe:</strong> Relieve scalp soreness without unravelling your fresh parts.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#221417]">
                  <CheckCircle2 className="w-4 h-4 text-[#8e273e] shrink-0 mt-0.5" />
                  <span><strong>Homemade Botanical Scalp Hydration Mist:</strong> The exact 3-ingredient formula Princess AHB braiders formulate.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#221417]">
                  <CheckCircle2 className="w-4 h-4 text-[#8e273e] shrink-0 mt-0.5" />
                  <span><strong>Zero-Breakage Takedown Map:</strong> Prevent 90% of shedding during unbraiding.</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Maya Robinson"
                    className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-sm text-[#221417] placeholder-[#a89599] focus:outline-none focus:border-[#8e273e]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider mb-1.5">
                      Email Address (To Receive PDF) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="maya@example.com"
                      className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-sm text-[#221417] placeholder-[#a89599] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider mb-1.5">
                      Phone Number (For $25 VIP SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(504) 555-0199"
                      className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-sm text-[#221417] placeholder-[#a89599] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider mb-1.5">
                    Your Next Desired Braid Style
                  </label>
                  <select
                    value={preferredStyle}
                    onChange={(e) => setPreferredStyle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-sm text-[#221417] focus:outline-none focus:border-[#8e273e]"
                  >
                    <option value="Boho Knotless Braids">Boho Knotless Braids</option>
                    <option value="Classic Knotless Braids">Knotless Braids</option>
                    <option value="Box Braids">Box Braids</option>
                    <option value="Shaved Sides Box Braids">Shaved Sides/Back Box Braids</option>
                    <option value="Feeding Braids">Feeding Braids</option>
                    <option value="Ghana Waves">Ghana Waves</option>
                    <option value="Hair Loss Service">Hair Loss Service & Coverup Tribal</option>
                    <option value="Individual Braids">Individual Braids</option>
                    <option value="Kinky Twist">Kinky Twist</option>
                    <option value="Senegalese Twist">Senegalese Twist</option>
                    <option value="Micro Braids">Micro Braids</option>
                    <option value="Ponytail">M/L Ponytail</option>
                    <option value="Men Style">Men Style</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 px-6 rounded-lg text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] via-[#781e32] to-[#6e1c2e] hover:from-[#a02f48] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Free Blueprint + Unlock $25 Credit</span>
                </button>
              </form>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#705055]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8e273e]" />
                <span>Zero spam. Instant access. We respect your crown and privacy.</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#faebea] border-2 border-[#8e273e] flex items-center justify-center text-[#8e273e]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-[#221417] mb-1">
                  Welcome to the Princess AHB Sisterhood!
                </h3>
                <p className="text-sm text-[#543b3f]">
                  Your guide has been unlocked and dispatched to <span className="text-[#221417] font-semibold">{email}</span>. We also simulated an instant SMS dispatch to <span className="text-[#221417] font-semibold">{phone}</span>!
                </p>
              </div>

              {/* Simulated SMS Voucher Card */}
              <div className="p-4 rounded-xl bg-[#fcf5f1] border border-[#edd8d5] text-left">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#8e273e]">
                  <MessageSquare className="w-4 h-4" />
                  <span>SIMULATED SMS SENT TO YOUR PHONE</span>
                </div>
                <div className="p-3 bg-[#ffffff] rounded-lg border border-[#edd8d5] font-mono text-xs text-[#221417] leading-relaxed">
                  "👑 Princess AHB: Welcome Queen {fullName || 'Beloved'}! Here is your $25 salon voucher code: <span className="text-[#8e273e] font-bold">CROWN25</span>. Valid for Louisiana & Virginia appointments. Book your chair at <a href={OFFICIAL_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-[#8e273e] underline font-bold">princessahb.as.me/schedule</a>"
                </div>
              </div>

              {/* Direct Booking & Download Actions */}
              <div className="space-y-3">
                <a
                  href={OFFICIAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 rounded-lg text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4 text-[#fcd34d]" />
                  <span>Book Chair Now With Voucher ($25 Off)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#fcd34d]" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const textContent = `PRINCESS AFRICAN HAIR BRAIDING
THE 30-DAY BRAID LONGEVITY & SCALP CARE BLUEPRINT
Voucher Code: CROWN25 ($25 Off Next Appointment)

Book online: ${OFFICIAL_BOOKING_URL}

KEY PRINCIPLES:
1. First 48 Hours: No high tight ponytails. Mist edges lightly with pure Rosewater & Batana Oil.
2. Night Routine: Always wrap with 100% mulberry silk or satin bonnet.
3. Weekly Hydration: Scalp oiling 2-3 times weekly with dropper direct to scalp lines.
4. Washing Braids: Diluted clarifying wash every 3-4 weeks. Dry completely under hooded dryer.
5. Maximum Duration: 6 to 8 weeks maximum to prevent root matting.
Locations: 12135 Florida Blvd, Baton Rouge, LA 70815 · Virginia Location (Text 225-288-2746 for confirmation, do not book online)`;
                    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'Princess-AHB-30Day-Crown-Care-Blueprint.txt';
                    link.click();
                    setDownloaded(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-[#ffffff] border border-[#edd8d5] text-[#8e273e] hover:bg-[#faebea] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Download className="w-4 h-4 text-[#8e273e]" />
                  <span>{downloaded ? '✓ Blueprint Downloaded' : 'Download Free Blueprint Guide'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2 text-xs font-semibold text-[#705055] hover:text-[#221417] transition-colors cursor-pointer"
                >
                  Return to Website & Styles Menu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
