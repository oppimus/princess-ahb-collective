import React, { useState } from 'react';
import { Crown, CheckCircle2, X } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data/mockData';

interface VIPMembershipSectionProps {
  onOpenBooking: () => void;
}

export const VIPMembershipSection: React.FC<VIPMembershipSectionProps> = ({ onOpenBooking }) => {
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  const [joinedSuccess, setJoinedSuccess] = useState(false);

  const handleJoinClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberEmail || !memberPhone) return;
    setJoinedSuccess(true);
  };

  return (
    <section className="py-20 bg-[#fcf6f2] text-[#221417] border-t border-[#edd8d5] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#8e273e]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f4] border border-[#f0c5cd] text-[#8e273e] text-xs font-semibold tracking-wider uppercase shadow-xs">
            <Crown className="w-3.5 h-3.5 text-[#8e273e]" />
            <span>Monthly Recurring Crown Memberships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#221417]">
            Join the Royal Crown Club. <br />
            <span className="italic text-[#8e273e] font-serif">Year-Round Luxury. Maximum Savings.</span>
          </h2>
          <p className="text-sm text-[#705055] leading-relaxed">
            Never wait in line for holiday braid appointments or neglect your scalp. Members receive monthly herbal detox steams, up to 25% off all salon services, free Batana oil shipped monthly, and private suite access.
          </p>
        </div>

        {/* 2 Tier Membership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 flex flex-col justify-between relative transition-all shadow-xs ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#ffffff] via-[#fffcfd] to-[#fdf2f4] border-2 border-[#8e273e] shadow-xl shadow-[#8e273e]/10'
                  : 'bg-[#ffffff] border border-[#edd8d5]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] text-white text-[10px] font-bold uppercase tracking-widest shadow-md">
                  Most Popular VIP Pass
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <div className="text-xs uppercase font-bold tracking-widest text-[#8e273e] mb-1">
                    {plan.name}
                  </div>
                  <p className="text-xs text-[#705055]">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-serif font-bold text-[#221417]">
                    ${plan.monthlyPrice}
                  </span>
                  <span className="text-xs text-[#9d7d83]">/ month (Cancel anytime)</span>
                </div>

                <div className="p-3 rounded-xl bg-[#faf4f2] border border-[#edd8d5] text-xs">
                  <span className="text-[#8e273e] font-semibold block mb-0.5">Estimated Member Value:</span>
                  <span className="text-[#705055]">Saves ~${plan.estimatedYearlySavings} / year across styling & care</span>
                </div>

                {/* Perks list */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#221417]">
                    Included VIP Benefits:
                  </div>
                  {plan.perks.map((perk: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#503a40]">
                      <CheckCircle2 className="w-4 h-4 text-[#8e273e] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#edd8d5] mt-6">
                <button
                  onClick={() => {
                    setSelectedPlan(plan);
                    setJoinedSuccess(false);
                  }}
                  className={`w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#9e2d46] text-white shadow-lg shadow-[#8e273e]/20'
                      : 'bg-[#faf4f2] hover:bg-[#fdf2f4] text-[#8e273e] border border-[#edd8d5]'
                  }`}
                >
                  <Crown className="w-4 h-4" />
                  <span>Activate {plan.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Membership Join Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#ffffff] border border-[#edd8d5] rounded-2xl shadow-2xl overflow-hidden text-[#221417]">
            <div className="bg-gradient-to-r from-[#6e1c2e] via-[#8e273e] to-[#6e1c2e] px-6 py-4 border-b border-[#a02f48] flex items-center justify-between text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Princess AHB VIP Membership Activation
              </span>
              <button
                onClick={() => setSelectedPlan(null)}
                className="p-1 rounded text-[#fce7ea] hover:text-white hover:bg-black/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {!joinedSuccess ? (
                <form onSubmit={handleJoinClub} className="space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#221417] mb-1">
                      {selectedPlan.name}
                    </h3>
                    <div className="text-2xl font-serif font-bold text-[#8e273e] mb-2">
                      ${selectedPlan.monthlyPrice} / month
                    </div>
                    <p className="text-xs text-[#705055]">
                      Enter your details to generate your VIP Crown Pass and link your 25% discount to your salon appointments.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                      VIP Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={memberEmail}
                      onChange={(e) => setMemberEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                      Mobile Phone (For Priority Booking Code) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={memberPhone}
                      onChange={(e) => setMemberPhone(e.target.value)}
                      placeholder="(301) 555-0199"
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] via-[#9e2d46] to-[#6e1c2e] hover:from-[#9e2d46] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Activate Membership Pass (${selectedPlan.monthlyPrice}/mo)</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#fdf2f4] border-2 border-[#8e273e] flex items-center justify-center text-[#8e273e]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#221417]">
                    Welcome to Royal VIP, Queen!
                  </h3>
                  <p className="text-xs text-[#705055]">
                    Your VIP Crown Pass is active. Your personal member discount code <span className="font-mono text-[#8e273e] font-bold">ROYALVIP25</span> is now linked to <strong className="text-[#221417]">{memberEmail}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedPlan(null);
                      setJoinedSuccess(false);
                      onOpenBooking();
                    }}
                    className="w-full py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#9e2d46] transition-all cursor-pointer shadow-md"
                  >
                    Book Next Appointment with 25% VIP Discount
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
