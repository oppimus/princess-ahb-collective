import React, { useState } from 'react';
import { Users, Sparkles, CheckCircle2, X, DollarSign, Calendar, MapPin, Phone, Mail, Award, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../data/mockData';
import { StylistApplication } from '../types';

interface StylistHiringModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplicationSubmitted?: (app: StylistApplication) => void;
  initialRoleInterest?: 'Commission Stylist' | 'Booth Rental' | 'Braiding Assistant' | 'Master Stylist';
}

export const StylistHiringModal: React.FC<StylistHiringModalProps> = ({
  isOpen,
  onClose,
  onApplicationSubmitted,
  initialRoleInterest = 'Commission Stylist',
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [locationPreference, setLocationPreference] = useState<'Baton Rouge, LA' | 'Virginia' | 'Either / Traveling'>('Baton Rouge, LA');
  const [roleInterest, setRoleInterest] = useState<'Commission Stylist' | 'Booth Rental' | 'Braiding Assistant' | 'Master Stylist'>(initialRoleInterest);
  const [experienceYears, setExperienceYears] = useState(3);
  const [specialties, setSpecialties] = useState<string[]>([
    'Knotless Braids',
    'Boho Curls',
  ]);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [instagramOrTiktok, setInstagramOrTiktok] = useState('');
  const [availability, setAvailability] = useState<'Full-time' | 'Part-time' | 'Weekends only' | 'Flexible'>('Full-time');
  const [whyJoin, setWhyJoin] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const availableSpecialties = [
    'Knotless Braids',
    'Boho Goddess Curls',
    'Box Braids',
    'Stitch / Ghana Cornrows',
    'Senegalese & Rope Twists',
    'Loc Maintenance & Styling',
    'Micro Braids',
    'Men Braid Designs',
    'Kids Gentle Braiding',
    'Scalp & Follicle Care',
  ];

  const toggleSpecialty = (item: string) => {
    setSpecialties((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    const newApp: StylistApplication = {
      id: `stylist-app-${Date.now()}`,
      fullName,
      phone,
      email,
      locationPreference,
      roleInterest,
      experienceYears: Number(experienceYears),
      specialties,
      portfolioUrl,
      instagramOrTiktok,
      availability,
      whyJoin,
      appliedAt: new Date().toISOString(),
      status: 'Pending Review',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('princess_stylist_applications') || '[]');
      localStorage.setItem('princess_stylist_applications', JSON.stringify([newApp, ...existing]));
    } catch {
      // Ignore localStorage quotas
    }

    onApplicationSubmitted?.(newApp);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#ffffff] border border-[#edd8d5] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-[#221417] my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6e1c2e] via-[#8e273e] to-[#6e1c2e] px-6 py-4.5 border-b border-[#a02f48] flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#fcd34d]/20 border border-[#fcd34d]/40 flex items-center justify-center text-[#fcd34d]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-white">
                  Join Princess AHB Master Stylists
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#fcd34d] text-[#6e1c2e] text-[10px] font-black uppercase tracking-wider">
                  $500 Bonus
                </span>
              </div>
              <p className="text-[11px] text-[#fce7ea]">
                Now hiring talented hair braiders & offering booth rental in Baton Rouge, LA & Virginia
              </p>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="p-1.5 rounded-lg text-[#fce7ea] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Hiring Banner Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-[#fdf2f4] border border-[#f0c5cd] rounded-xl text-xs text-[#705055]">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#8e273e] shrink-0" />
                  <span><strong>High Earning Potential</strong> · Top commission or booth rental</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#8e273e] shrink-0" />
                  <span><strong>Full Bookings</strong> · Automatic client appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#8e273e] shrink-0" />
                  <span><strong>Supportive Culture</strong> · Sisterhood & clean studios</span>
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Maya Robinson"
                    className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                    Phone Number (Cell for SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(225) 555-0123"
                    className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="stylist@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                    Instagram or TikTok Handle
                  </label>
                  <input
                    type="text"
                    value={instagramOrTiktok}
                    onChange={(e) => setInstagramOrTiktok(e.target.value)}
                    placeholder="@maya_braids_pro"
                    className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                  />
                </div>
              </div>

              {/* Location & Opportunity Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                    Preferred Studio Location *
                  </label>
                  <select
                    value={locationPreference}
                    onChange={(e) => setLocationPreference(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                  >
                    <option value="Baton Rouge, LA">Baton Rouge Studio (12135 Florida Blvd)</option>
                    <option value="Virginia">Virginia Location</option>
                    <option value="Either / Traveling">Either Location / Traveling Guest Stylist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                    Role or Station Interest *
                  </label>
                  <select
                    value={roleInterest}
                    onChange={(e) => setRoleInterest(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                  >
                    <option value="Commission Stylist">Commission Stylist (Supplies & booking provided)</option>
                    <option value="Booth Rental">Booth Rental (Keep 100% of service earnings)</option>
                    <option value="Master Stylist">Master Stylist / Team Lead</option>
                    <option value="Braiding Assistant">Braiding Assistant / Takedown Specialist</option>
                  </select>
                </div>
              </div>

              {/* Experience & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                    Years of Braiding Experience
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="35"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                    Schedule Availability *
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                  >
                    <option value="Full-time">Full-Time (4-6 days / week)</option>
                    <option value="Part-time">Part-Time (2-3 days / week)</option>
                    <option value="Weekends only">Weekends Only (Fri - Sun)</option>
                    <option value="Flexible">Flexible / On-Call Squeeze-Ins</option>
                  </select>
                </div>
              </div>

              {/* Specialties Checkboxes */}
              <div>
                <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-2">
                  Select Your Top Braiding & Styling Specialties *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableSpecialties.map((spec) => {
                    const selected = specialties.includes(spec);
                    return (
                      <button
                        type="button"
                        key={spec}
                        onClick={() => toggleSpecialty(spec)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all border cursor-pointer ${
                          selected
                            ? 'bg-[#faebea] text-[#8e273e] border-[#8e273e] font-bold shadow-2xs'
                            : 'bg-[#faf4f2] text-[#705055] border-[#edd8d5] hover:border-[#8e273e]/50'
                        }`}
                      >
                        <span className="mr-1.5">{selected ? '✓' : '+'}</span>
                        <span>{spec}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Portfolio Link & Bio */}
              <div>
                <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                  Portfolio Link (Google Drive / Website / Photos)
                </label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://instagram.com/yourhandle or portfolio link"
                  className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                  Tell Us About Your Braiding Background & Goals
                </label>
                <textarea
                  rows={3}
                  value={whyJoin}
                  onChange={(e) => setWhyJoin(e.target.value)}
                  placeholder="Tell us what styles you love doing, your braiding speed, and what you are looking for in a salon home..."
                  className="w-full px-3.5 py-2 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] via-[#9e2d46] to-[#6e1c2e] hover:from-[#9e2d46] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#fcd34d]" />
                <span>Submit Stylist Application & Schedule Audition</span>
              </button>
            </form>
          ) : (
            /* Success confirmation */
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#fdf2f4] border-2 border-[#8e273e] flex items-center justify-center text-[#8e273e]">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider inline-block mb-2 border border-emerald-200">
                  Application Received!
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#221417]">
                  Thank You, {fullName}!
                </h3>
                <p className="text-xs text-[#705055] max-w-md mx-auto mt-2 leading-relaxed">
                  We are excited to review your background for <strong className="text-[#221417]">{locationPreference}</strong> ({roleInterest}). Our recruitment team will review your details and reach out within 24 to 48 hours.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf4f2] border border-[#edd8d5] max-w-md mx-auto text-left text-xs space-y-2">
                <div className="font-bold text-[#221417] flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#8e273e]" />
                  <span>Expedite Your Application:</span>
                </div>
                <p className="text-[#705055]">
                  Want to fast-track your chair audition or station walkthrough? Text or call us directly at:
                </p>
                <div className="flex items-center justify-between pt-1">
                  <a
                    href={`tel:${CONTACT_INFO.phoneRaw}`}
                    className="text-[#8e273e] font-bold font-mono text-sm hover:underline"
                  >
                    📞 {CONTACT_INFO.phone}
                  </a>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-[#543b3f] hover:text-[#8e273e]"
                  >
                    ✉️ {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={resetForm}
                className="w-full max-w-md py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#9e2d46] transition-all cursor-pointer shadow-md"
              >
                Done & Return to Salon
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
