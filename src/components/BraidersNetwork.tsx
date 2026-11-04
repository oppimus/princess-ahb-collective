import React, { useState } from 'react';
import { Users, Sparkles, CheckCircle2, DollarSign, Calendar, Share2, Plus, X, Star, MapPin, Key, ShieldCheck } from 'lucide-react';
import { BraiderProfile } from '../types';
import { BOOTH_RENTAL_STATIONS } from '../data/mockData';

interface BraidersNetworkProps {
  braiders: BraiderProfile[];
  onAddBraider: (newBraider: BraiderProfile) => void;
  onOpenBooking: () => void;
  onOpenHiringModal?: () => void;
  onOpenBoothRentalModal?: () => void;
}

export const BraidersNetwork: React.FC<BraidersNetworkProps> = ({
  braiders,
  onAddBraider,
  onOpenBooking,
  onOpenHiringModal,
  onOpenBoothRentalModal,
}) => {
  const [onboardingModalOpen, setOnboardingModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [city, setCity] = useState('New Orleans');
  const [state, setState] = useState('LA');
  const [specialty, setSpecialty] = useState('Knotless & French Curls');
  const [experienceYears, setExperienceYears] = useState(5);
  const [chairType, setChairType] = useState<'Salon Chair Partner' | 'Independent Suite' | 'Mobile Master'>('Salon Chair Partner');
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [copiedStylistId, setCopiedStylistId] = useState<string | null>(null);

  const handleRegisterBraider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !handle) return;

    const newBraider: BraiderProfile = {
      id: `braider-${Date.now()}`,
      name,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      title: 'Artisan Braider Partner',
      city,
      state,
      bio: `Master stylist specializing in ${specialty}. Dedicated to follicular preservation and luxury client hospitality.`,
      specialties: specialty.split(',').map((s) => s.trim()),
      rating: 5.0,
      reviewsCount: 1,
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      chairType,
      commissionRate: 15,
      experienceYears: Number(experienceYears),
      portfolioImages: ['https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=600&q=80'],
      weeklyBookings: 12,
      digitalRoyaltiesEarned: 240,
    };

    onAddBraider(newBraider);
    setRegisteredSuccess(true);
  };

  return (
    <section className="py-20 bg-[#fcf6f2] text-[#221417] border-t border-[#edd8d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f4] border border-[#f0c5cd] text-[#8e273e] text-xs font-semibold tracking-wider uppercase shadow-xs">
              <Users className="w-3.5 h-3.5 text-[#8e273e]" />
              <span>The Braiders Collective SaaS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#221417]">
              The Modern Salon Platform. <br />
              <span className="italic text-[#8e273e] font-serif">Built for Elite Hair Braiders.</span>
            </h2>
            <p className="text-sm text-[#705055] leading-relaxed">
              Stop chasing clients in Instagram DMs. Join Princess AHB to access automated booking pipelines, autonomous client retention bots, and passive digital product royalties across Louisiana & Virginia.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                if (onOpenHiringModal) {
                  onOpenHiringModal();
                } else {
                  setOnboardingModalOpen(true);
                  setRegisteredSuccess(false);
                }
              }}
              className="px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] via-[#9e2d46] to-[#6e1c2e] hover:from-[#9e2d46] transition-all shadow-md shadow-[#8e273e]/20 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Users className="w-4 h-4 text-[#fcd34d]" />
              <span>Apply as Stylist ($500 Bonus)</span>
            </button>

            {onOpenBoothRentalModal && (
              <button
                onClick={onOpenBoothRentalModal}
                className="px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#2e1065] bg-purple-100 hover:bg-purple-200 border border-purple-300 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Key className="w-4 h-4 text-purple-700" />
                <span>Booth Rental Stations</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Value Pillars for Braiders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#edd8d5] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#fdf2f4] border border-[#f0c5cd] flex items-center justify-center text-[#8e273e]">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#221417]">
              Automated Bookings & Upfront Deposits
            </h3>
            <p className="text-xs text-[#705055] leading-relaxed">
              No-shows are eliminated forever. Clients pay their $50 deposit upfront, pick precise braid lengths, and receive automated prep reminders 48 hours prior.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#edd8d5] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#fdf2f4] border border-[#f0c5cd] flex items-center justify-center text-[#8e273e]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#221417]">
              Autonomous Retention Bots
            </h3>
            <p className="text-xs text-[#705055] leading-relaxed">
              Our CrownKeeper AI monitors your clients' timelines and sends personalized re-booking offers right as their braids reach 6 to 8 weeks, keeping your chairs 100% full.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#edd8d5] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#fdf2f4] border border-[#f0c5cd] flex items-center justify-center text-[#8e273e]">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#221417]">
              Passive Digital Product Royalties
            </h3>
            <p className="text-xs text-[#705055] leading-relaxed">
              Every collective stylist receives a personalized link to our digital guides. Earn 30% passive revenue whenever your clients buy aftercare products or masterclasses.
            </p>
          </div>
        </div>

        {/* Booth Rental Opportunities Showcase */}
        <div className="mb-20 p-8 rounded-3xl bg-gradient-to-br from-[#2e1065]/5 via-[#ffffff] to-[#7c2d12]/5 border-2 border-purple-200/80 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#581c87] text-xs font-bold uppercase tracking-wider border border-purple-200">
                <Key className="w-3.5 h-3.5 text-purple-700" />
                <span>Salon Suites & Station Rentals</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#221417]">
                Booth Rental Opportunities in Baton Rouge & Virginia
              </h3>
              <p className="text-xs sm:text-sm text-[#705055] leading-relaxed">
                Take control of your salon business. Enjoy 24/7 keycard access, wash bowls, dryers, retail product shelf space, clean towels, and utilities with zero hidden fees.
              </p>
            </div>

            {onOpenBoothRentalModal && (
              <button
                onClick={onOpenBoothRentalModal}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#2e1065] to-[#4c1d95] hover:from-[#3b0764] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Key className="w-4 h-4 text-[#fcd34d]" />
                <span>Apply for Booth Rental</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {BOOTH_RENTAL_STATIONS.map((station) => (
              <div
                key={station.id}
                className="bg-[#ffffff] border border-purple-100 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-purple-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700 px-2 py-0.5 rounded bg-purple-50 border border-purple-100">
                      {station.type}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">
                      {station.availableSpots} Open
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#221417] mb-1">
                    {station.title.split('—')[0]}
                  </h4>
                  <div className="text-xl font-serif font-bold text-[#8e273e] mb-2">
                    {station.priceDisplay}
                  </div>
                  <p className="text-xs text-[#705055] line-clamp-3 mb-3">
                    {station.description}
                  </p>
                  <div className="space-y-1 text-[11px] text-[#543b3f] mb-4">
                    {station.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenBoothRentalModal}
                  className="w-full py-2 px-3 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Reserve Chair
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stylist Directory Showcase */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#edd8d5]">
            <h3 className="font-serif font-bold text-2xl text-[#221417]">
              Verified Collective Artisans ({braiders.length})
            </h3>
            <span className="text-xs text-[#8e273e] font-semibold">All stylists tension-free certified</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {braiders.map((b) => (
              <div
                key={b.id}
                className="bg-[#ffffff] border border-[#edd8d5] rounded-2xl p-6 space-y-5 hover:border-[#8e273e] transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={b.avatarUrl}
                      alt={b.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#8e273e]"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#221417]">{b.name}</h4>
                      <div className="text-xs text-[#8e273e] font-semibold">{b.title}</div>
                      <div className="text-[11px] text-[#705055] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#8e273e]" />
                        <span>{b.city}, {b.state}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#705055] leading-relaxed mb-4">
                    {b.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {b.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#faf4f2] border border-[#edd8d5] text-[10px] text-[#8e273e]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Operational stats */}
                  <div className="p-3 rounded-xl bg-[#faf4f2] border border-[#edd8d5] grid grid-cols-2 gap-2 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-[#9d7d83] block uppercase font-semibold">Rating</span>
                      <span className="font-bold text-[#221417] flex items-center justify-center gap-1">
                        <Star className="w-3 h-3 fill-[#fcd34d] text-[#fcd34d]" />
                        {b.rating} ({b.reviewsCount})
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#9d7d83] block uppercase font-semibold">Digital Passive</span>
                      <span className="font-bold text-[#8e273e]">${b.digitalRoyaltiesEarned}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#edd8d5] flex items-center gap-2">
                  <button
                    onClick={onOpenBooking}
                    className="flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#9e2d46] transition-all cursor-pointer shadow-sm"
                  >
                    Book with {b.name.split(' ')[0]}
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText?.(`https://princessahb.as.me/schedule/cf057a54?stylist=${b.handle.replace('@', '')}`);
                      setCopiedStylistId(b.id);
                      setTimeout(() => setCopiedStylistId(null), 3000);
                    }}
                    className="p-2.5 rounded-lg bg-[#faf4f2] hover:bg-[#fdf2f4] text-[#705055] border border-[#edd8d5] transition-colors cursor-pointer"
                    title="Share Stylist Acuity Link"
                  >
                    {copiedStylistId === b.id ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Share2 className="w-4 h-4 text-[#8e273e]" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stylist Registration Modal */}
      {onboardingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#ffffff] border border-[#edd8d5] rounded-2xl shadow-2xl overflow-hidden text-[#221417]">
            <div className="bg-gradient-to-r from-[#6e1c2e] via-[#8e273e] to-[#6e1c2e] px-6 py-4 border-b border-[#a02f48] flex items-center justify-between text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Braiders Collective Onboarding
              </span>
              <button
                onClick={() => setOnboardingModalOpen(false)}
                className="p-1 rounded text-[#fce7ea] hover:text-white hover:bg-black/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {!registeredSuccess ? (
                <form onSubmit={handleRegisterBraider} className="space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#221417] mb-1">
                      Scale Your Hair Braiding Business
                    </h3>
                    <p className="text-xs text-[#705055]">
                      Join our collective to unlock automated appointments, AI client follow-ups, and chair spaces across Louisiana & Virginia.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                      Your Name / Brand *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aaliyah Diallo"
                      className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                        Instagram / TikTok Handle *
                      </label>
                      <input
                        type="text"
                        required
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        placeholder="@aaliyah_braids"
                        className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                      Top Braiding Specialties
                    </label>
                    <input
                      type="text"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      placeholder="e.g. Boho Knotless, French Curls, Stitch Braids"
                      className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                      Preferred Working Setup
                    </label>
                    <select
                      value={chairType}
                      onChange={(e) => setChairType(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                    >
                      <option value="Salon Chair Partner">Salon Chair Partner (Louisiana / Virginia Studios)</option>
                      <option value="Independent Suite">Independent Suite Partner (Own space)</option>
                      <option value="Mobile Master">Mobile VIP Master (House calls)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] via-[#9e2d46] to-[#6e1c2e] hover:from-[#9e2d46] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Application & Activate Stylist Portal</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#fdf2f4] border-2 border-[#8e273e] flex items-center justify-center text-[#8e273e]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#221417]">
                    Welcome to the Collective, {name}!
                  </h3>
                  <p className="text-xs text-[#705055]">
                    Your profile has been approved and added to the Princess AHB directory across Louisiana & Virginia. Your personal booking calendar link is active.
                  </p>
                  <button
                    onClick={() => setOnboardingModalOpen(false)}
                    className="w-full py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#9e2d46] transition-all cursor-pointer shadow-md"
                  >
                    View Your Collective Profile
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
