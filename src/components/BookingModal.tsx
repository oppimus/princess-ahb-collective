import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, User, Check, ShieldCheck, Sparkles, ChevronRight, ArrowLeft, Download, Share2, ExternalLink, Gift } from 'lucide-react';
import { BraidingService, BraiderProfile, BookingRequest, CRMClient } from '../types';
import { LOCATIONS, OFFICIAL_BOOKING_URL } from '../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: BraidingService[];
  braiders: BraiderProfile[];
  crmClients?: CRMClient[];
  initialService?: BraidingService | null;
  initialLengthIdx?: number;
  initialSizeIdx?: number;
  initialBraiderId?: string;
  initialDate?: string;
  initialTimeSlot?: string;
  discountPromoAmount?: number;
  promoBadgeText?: string;
  onBookingConfirmed: (booking: BookingRequest) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  braiders,
  crmClients,
  initialService,
  initialLengthIdx,
  initialSizeIdx,
  initialBraiderId,
  initialDate,
  initialTimeSlot,
  discountPromoAmount = 0,
  promoBadgeText,
  onBookingConfirmed,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedService, setSelectedService] = useState<BraidingService>(
    initialService || services[0]
  );
  const [selectedLengthIdx, setSelectedLengthIdx] = useState(initialLengthIdx || 0);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(initialSizeIdx || 0);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0].id);
  const [selectedBraiderId, setSelectedBraiderId] = useState<string>(initialBraiderId || braiders[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState(initialDate || '2026-10-12');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(initialTimeSlot || '9:00 AM');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [hairNotes, setHairNotes] = useState('');
  const [calendarDownloaded, setCalendarDownloaded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Refer-a-Friend Code & Discount State
  const [referralCodeInput, setReferralCodeInput] = useState('');
  const [appliedReferralDiscount, setAppliedReferralDiscount] = useState(0);
  const [referralFeedback, setReferralFeedback] = useState<{ valid: boolean; text: string } | null>(null);

  // Auto-detect referral link from URL query params (e.g. ?ref=CROWN-MAYA-192)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const refParam = params.get('ref');
      if (refParam) {
        setReferralCodeInput(refParam);
        validateReferralCode(refParam);
      }
    }
  }, [crmClients]);

  const validateReferralCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setAppliedReferralDiscount(0);
      setReferralFeedback(null);
      return;
    }

    const matchedClient = crmClients?.find(
      (c) => c.referralCode?.toUpperCase() === clean || c.referralStats?.referralCode?.toUpperCase() === clean
    );

    if (matchedClient) {
      setAppliedReferralDiscount(25);
      setReferralFeedback({
        valid: true,
        text: `👑 Valid Queen Referral from ${matchedClient.name}! $25 Welcome Discount Applied!`,
      });
    } else if (clean.startsWith('CROWN-') || clean.startsWith('QUEEN-')) {
      setAppliedReferralDiscount(25);
      setReferralFeedback({
        valid: true,
        text: `👑 Valid Referral Code "${clean}"! $25 Welcome Discount Applied!`,
      });
    } else {
      setAppliedReferralDiscount(0);
      setReferralFeedback({
        valid: false,
        text: 'Referral code not recognized. Check spelling or ask your friend for their code.',
      });
    }
  };

  // Sync state whenever props change
  useEffect(() => {
    if (initialService) setSelectedService(initialService);
    if (initialLengthIdx !== undefined) setSelectedLengthIdx(initialLengthIdx);
    if (initialSizeIdx !== undefined) setSelectedSizeIdx(initialSizeIdx);
    if (initialBraiderId) setSelectedBraiderId(initialBraiderId);
    if (initialDate) setSelectedDate(initialDate);
    if (initialTimeSlot) setSelectedTimeSlot(initialTimeSlot);
  }, [initialService, initialLengthIdx, initialSizeIdx, initialBraiderId, initialDate, initialTimeSlot]);

  // Add-ons state
  const [addOns, setAddOns] = useState<string[]>([]);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);

  if (!isOpen) return null;

  const toggleAddOn = (name: string) => {
    setAddOns((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const addOnOptions = [
    { name: 'Botanical Scalp Detox Steam & ACV Rinse', price: 35, desc: 'Pore-clearing herbal steam before braiding starts.' },
    { name: '100% Raw Human Hair Curls Upgrade (Boho)', price: 55, desc: 'Zero synthetic tangles; lasts entire 8 weeks.' },
    { name: 'CartCrown AI VIP Bundle: Raw Virgin Curls + Wild Batana Scalp Oil', price: 85, desc: 'Save $28! Recommended by AI for maximum 8-week edge protection & zero matting.' },
    { name: 'Tension-Free Nape Edge Tucking Method', price: 20, desc: 'Specialized parting to protect delicate baby hairs.' },
  ];

  const basePrice = selectedService.price;
  const lengthAdd = selectedService.lengthOptions[selectedLengthIdx]?.addPrice || 0;
  const sizeAdd = selectedService.sizeOptions[selectedSizeIdx]?.addPrice || 0;
  const addOnsTotal = addOns.reduce((acc, name) => {
    const found = addOnOptions.find((o) => o.name === name);
    return acc + (found ? found.price : 0);
  }, 0);
  const grossPrice = basePrice + lengthAdd + sizeAdd + addOnsTotal;
  const totalDiscount = discountPromoAmount + appliedReferralDiscount;
  const totalPrice = Math.max(50, grossPrice - totalDiscount);
  const depositAmount = 50;

  const handleFinalBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientEmail) return;

    const chosenStylist = braiders.find((b) => b.id === selectedBraiderId) || braiders[0];
    const chosenLoc = LOCATIONS.find((l) => l.id === selectedLocation) || LOCATIONS[0];

    const booking: BookingRequest = {
      id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      clientName,
      clientPhone,
      clientEmail,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      stylistId: chosenStylist.id,
      stylistName: chosenStylist.name,
      location: `${chosenLoc.name} (${chosenLoc.city}, ${chosenLoc.state})`,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      lengthOption: selectedService.lengthOptions[selectedLengthIdx]?.name || 'Standard',
      sizeOption: selectedService.sizeOptions[selectedSizeIdx]?.name || 'Standard',
      addOns,
      depositPaid: depositAmount,
      totalAmount: totalPrice,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      referralCodeUsed: appliedReferralDiscount > 0 ? referralCodeInput.trim().toUpperCase() : undefined,
      referralDiscountApplied: appliedReferralDiscount,
    };

    setConfirmedBooking(booking);
    onBookingConfirmed(booking);
    setStep(5);
  };

  const dates = [
    { label: 'Mon, Oct 12', val: '2026-10-12' },
    { label: 'Tue, Oct 13', val: '2026-10-13' },
    { label: 'Wed, Oct 14', val: '2026-10-14' },
    { label: 'Thu, Oct 15', val: '2026-10-15' },
    { label: 'Fri, Oct 16', val: '2026-10-16' },
    { label: 'Sat, Oct 17', val: '2026-10-17' },
  ];

  const timeSlots = ['8:30 AM', '9:30 AM', '11:00 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#ffffff] border border-[#edd8d5] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#221417]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6e1c2e] via-[#8e273e] to-[#6e1c2e] px-6 py-4 border-b border-[#a02f48] flex items-center justify-between shrink-0 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1.5 ring-white/80 shrink-0 shadow-sm">
              <img
                src="/src/assets/images/princess_official_logo_1791668953742.jpg"
                alt="Princess Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold tracking-wider text-[#ffffff]">
                PRINCESS AFRICAN HAIR BRAIDING
              </h3>
              <p className="text-[10px] text-[#fce7ea] uppercase tracking-wider">
                Step {step} of 4 · Guaranteed Chair Reservation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#fce7ea] hover:text-white hover:bg-black/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Acuity Direct Booking Fast-Track Banner */}
        <div className="bg-[#fcf5f1] border-b border-[#edd8d5] px-5 sm:px-6 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex items-center gap-2 text-[#543b3f]">
            <span className="text-[#8e273e] font-bold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Official Online Schedule:
            </span>
            <span className="text-[11px] text-[#705055] hidden sm:inline">
              Prefer direct Acuity scheduling?
            </span>
          </div>
          <a
            href={OFFICIAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#8e273e] hover:bg-[#781e32] text-white font-semibold text-[11px] uppercase tracking-wider transition-colors shadow-2xs"
          >
            <span>Book on princessahb.as.me</span>
            <ExternalLink className="w-3 h-3 text-[#fcd34d]" />
          </a>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-serif font-bold text-[#1c1815] mb-1">
                  1. Select Protective Style & Specifications
                </h4>
                <p className="text-xs text-[#5c5043]">
                  Choose your desired service, parting size, and target length.
                </p>
              </div>

              {/* Service Select */}
              <div>
                <label className="block text-xs font-semibold text-[#6e5e4e] uppercase tracking-wider mb-1.5">
                  Protective Style
                </label>
                <select
                  value={selectedService.id}
                  onChange={(e) => {
                    const found = services.find((s) => s.id === e.target.value);
                    if (found) {
                      setSelectedService(found);
                      setSelectedLengthIdx(0);
                      setSelectedSizeIdx(0);
                    }
                  }}
                  className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-sm text-[#221417] focus:outline-none focus:border-[#8e273e]"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (${s.price} · {s.durationHours} hrs)
                    </option>
                  ))}
                </select>
              </div>

              {/* Length & Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider mb-1.5">
                    Length Preference
                  </label>
                  <div className="space-y-1.5">
                    {selectedService.lengthOptions.map((len, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedLengthIdx(idx)}
                        className={`w-full p-2.5 rounded-lg text-xs font-medium text-left border flex items-center justify-between transition-colors cursor-pointer ${
                          selectedLengthIdx === idx
                            ? 'bg-[#faebea] border-[#8e273e] text-[#221417] font-semibold shadow-xs'
                            : 'bg-[#ffffff] border-[#edd8d5] text-[#543b3f] hover:border-[#8e273e]'
                        }`}
                      >
                        <span>{len.name}</span>
                        <span className="text-[11px] font-semibold text-[#8e273e]">
                          {len.addPrice > 0 ? `+$${len.addPrice}` : 'Included'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider mb-1.5">
                    Parting Size
                  </label>
                  <div className="space-y-1.5">
                    {selectedService.sizeOptions.map((sz, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSizeIdx(idx)}
                        className={`w-full p-2.5 rounded-lg text-xs font-medium text-left border flex items-center justify-between transition-colors cursor-pointer ${
                          selectedSizeIdx === idx
                            ? 'bg-[#faebea] border-[#8e273e] text-[#221417] font-semibold shadow-xs'
                            : 'bg-[#ffffff] border-[#edd8d5] text-[#543b3f] hover:border-[#8e273e]'
                        }`}
                      >
                        <span>{sz.name}</span>
                        <span className="text-[11px] font-semibold text-[#8e273e]">
                          {sz.addPrice !== 0 ? `${sz.addPrice > 0 ? '+' : ''}$${sz.addPrice}` : 'Standard'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price summary footer */}
              <div className="p-4 rounded-xl bg-[#fcf5f1] border border-[#edd8d5] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#705055] uppercase font-semibold">Estimated Style Total</span>
                  <div className="text-xl font-serif font-bold text-[#8e273e]">
                    ${basePrice + lengthAdd + sizeAdd}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Select Location & Stylist</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-serif font-bold text-[#221417] mb-1">
                    2. Select Studio Location & Master Braider
                  </h4>
                  <p className="text-xs text-[#543b3f]">
                    Choose the studio closest to you and your preferred artisan.
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#705055] hover:text-[#8e273e] flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              {/* Location Select */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider">
                  Salon Location
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {LOCATIONS.map((loc) => {
                    const isVirginia = loc.id === 'loc-virginia';
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setSelectedLocation(loc.id)}
                        className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                          selectedLocation === loc.id
                            ? 'bg-[#faebea] border-[#8e273e] text-[#221417] shadow-xs'
                            : 'bg-[#ffffff] border-[#edd8d5] text-[#543b3f] hover:border-[#8e273e]'
                        }`}
                      >
                        <div className="font-semibold text-xs text-[#221417] flex items-center justify-between gap-1.5 mb-1">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#8e273e]" />
                            <span>{loc.name}</span>
                          </span>
                          {loc.isFlagship ? (
                            <span className="text-[9px] bg-[#faebea] text-[#8e273e] px-1.5 py-0.5 rounded border border-[#f0c5cd] font-bold">Baton Rouge Flagship</span>
                          ) : (
                            <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded border border-amber-300 font-bold">Text Only</span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#705055]">{loc.address}</div>
                        <div className="text-[10px] text-[#8e273e] mt-1 font-mono font-semibold">
                          📞 {loc.phone}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedLocation === 'loc-virginia' && (
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                    <span className="text-base shrink-0">⚠️</span>
                    <div>
                      <strong className="block font-bold">Virginia Location Notice:</strong>
                      <span>For Virginia location please text <a href="sms:2252882746" className="underline font-bold text-[#8e273e]">(225) 288-2746</a> for confirmation. Do not book on the website.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Master Braider */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider">
                  Assigned Master Braider
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {braiders.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBraiderId(b.id)}
                      className={`p-3 rounded-lg text-left border transition-all flex flex-col items-center text-center cursor-pointer ${
                        selectedBraiderId === b.id
                          ? 'bg-[#faebea] border-[#8e273e] shadow-xs'
                          : 'bg-[#ffffff] border-[#edd8d5] hover:border-[#8e273e]'
                      }`}
                    >
                      <img
                        src={b.avatarUrl}
                        alt={b.name}
                        className="w-12 h-12 rounded-full object-cover mb-2 border border-[#edd8d5]"
                      />
                      <div className="font-serif font-bold text-sm text-[#221417]">{b.name}</div>
                      <div className="text-[10px] text-[#8e273e] font-semibold">{b.title}</div>
                      <div className="text-[10px] text-[#705055] mt-1">★ {b.rating} ({b.reviewsCount})</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#fcf5f1] border border-[#edd8d5] flex items-center justify-between">
                <span className="text-xs text-[#543b3f]">All braiders certified in zero-tension technique.</span>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Pick Date & Time</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-serif font-bold text-[#1c1815] mb-1">
                    3. Select Date, Time & Care Add-Ons
                  </h4>
                  <p className="text-xs text-[#543b3f]">
                    Reserve your private chair slot and enhance your crown experience.
                  </p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-[#705055] hover:text-[#8e273e] flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider mb-1.5">
                  Select Appointment Date
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d.val}
                      type="button"
                      onClick={() => setSelectedDate(d.val)}
                      className={`p-2.5 rounded-lg text-xs font-semibold text-center border transition-all cursor-pointer ${
                        selectedDate === d.val
                          ? 'bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] text-white border-[#8e273e] font-bold shadow-xs'
                          : 'bg-[#ffffff] text-[#543b3f] border-[#edd8d5] hover:border-[#8e273e]'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider mb-1.5">
                  Available Morning & Afternoon Slots
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTimeSlot(time)}
                      className={`py-2 px-1 rounded-lg text-xs text-center border transition-all cursor-pointer ${
                        selectedTimeSlot === time
                          ? 'bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] text-white border-[#8e273e] font-bold shadow-xs'
                          : 'bg-[#ffffff] text-[#543b3f] border-[#edd8d5] hover:border-[#8e273e]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider mb-1.5">
                  Holistic Scalp & Style Upgrades
                </label>
                <div className="space-y-2">
                  {addOnOptions.map((opt) => {
                    const isChecked = addOns.includes(opt.name);
                    return (
                      <div
                        key={opt.name}
                        onClick={() => toggleAddOn(opt.name)}
                        className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-[#faebea] border-[#8e273e]'
                            : 'bg-[#ffffff] border-[#edd8d5] hover:border-[#8e273e]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isChecked
                                ? 'bg-[#8e273e] border-[#8e273e] text-white'
                                : 'border-[#edd8d5]'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#221417]">{opt.name}</div>
                            <div className="text-[11px] text-[#705055]">{opt.desc}</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#8e273e] shrink-0 ml-2">
                          +${opt.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#fcf5f1] border border-[#edd8d5] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#705055] uppercase font-semibold">Total with Upgrades</span>
                  <div className="text-xl font-serif font-bold text-[#8e273e]">${totalPrice}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Review & Complete Info</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleFinalBooking} className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-serif font-bold text-[#221417] mb-1">
                    4. Client Information & Deposit Confirmation
                  </h4>
                  <p className="text-xs text-[#543b3f]">
                    We require a small $50 deposit to secure your chair, applied directly toward your service total.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs text-[#705055] hover:text-[#8e273e] flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 rounded-xl bg-[#fcf5f1] border border-[#edd8d5] space-y-2 text-xs">
                <div className="flex justify-between text-[#543b3f]">
                  <span>Service:</span>
                  <strong className="text-[#221417]">{selectedService.name}</strong>
                </div>
                <div className="flex justify-between text-[#543b3f]">
                  <span>Date & Slot:</span>
                  <strong className="text-[#221417]">{selectedDate} at {selectedTimeSlot}</strong>
                </div>
                <div className="flex justify-between text-[#543b3f]">
                  <span>Stylist & Location:</span>
                  <strong className="text-[#221417]">
                    {braiders.find((b) => b.id === selectedBraiderId)?.name} · {LOCATIONS.find((l) => l.id === selectedLocation)?.name}
                  </strong>
                </div>
                <div className="flex justify-between text-[#543b3f] pt-2 border-t border-[#edd8d5]">
                  <span>Standard Service Total:</span>
                  <span className={`${discountPromoAmount > 0 ? 'line-through text-[#705055]' : 'font-bold text-[#221417]'}`}>${grossPrice}</span>
                </div>
                {discountPromoAmount > 0 && (
                  <div className="flex justify-between text-[#8e273e] font-semibold bg-[#faebea] p-1.5 rounded border border-[#f0c5cd]">
                    <span>Flash Squeeze-In Savings ({promoBadgeText || 'Special Incentive'}):</span>
                    <span>-${discountPromoAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#221417] font-bold">
                  <span>Final Investment:</span>
                  <span className="text-base text-[#8e273e]">${totalPrice}</span>
                </div>
                <div className="flex justify-between text-[#8e273e] font-semibold">
                  <span>Deposit Due Today (Simulated):</span>
                  <span>${depositAmount}</span>
                </div>
                <div className="flex justify-between text-[#705055] text-[11px]">
                  <span>Remaining balance due at salon:</span>
                  <span>${totalPrice - depositAmount}</span>
                </div>
              </div>

              {/* Input fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Maya Robinson"
                    className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-sm text-[#221417] placeholder-[#a89599] focus:outline-none focus:border-[#8e273e]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider mb-1">
                      Phone (For SMS Confirmations) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="(504) 555-0199"
                      className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-sm text-[#221417] placeholder-[#a89599] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="maya@example.com"
                      className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-sm text-[#221417] placeholder-[#a89599] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#705055] uppercase tracking-wider mb-1">
                    Hair History / Scalp Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={hairNotes}
                    onChange={(e) => setHairNotes(e.target.value)}
                    placeholder="e.g. Sensitive hairline, tender scalp, bringing custom boho curls..."
                    className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-sm text-[#221417] placeholder-[#a89599] focus:outline-none focus:border-[#8e273e]"
                  />
                </div>

                {/* Refer-a-Friend Code Input */}
                <div className="p-3.5 rounded-xl bg-[#faf4f2] border border-[#edd8d5] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#8e273e] uppercase tracking-wider flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5" />
                      <span>Referred by a Queen? (Save $25)</span>
                    </label>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      Instant $25 Off First Visit
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={referralCodeInput}
                      onChange={(e) => {
                        setReferralCodeInput(e.target.value);
                        validateReferralCode(e.target.value);
                      }}
                      placeholder="e.g. CROWN-MAYA-192 or QUEEN-KEISHA-831"
                      className="flex-1 px-3 py-2 bg-white border border-[#edd8d5] rounded-lg text-xs font-mono font-bold text-[#221417] placeholder-stone-400 focus:outline-none focus:border-[#8e273e]"
                    />
                    {appliedReferralDiscount > 0 && (
                      <span className="px-2.5 py-1.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold shrink-0">
                        -$25 Applied
                      </span>
                    )}
                  </div>
                  {referralFeedback && (
                    <div
                      className={`text-[11px] font-semibold flex items-center gap-1.5 ${
                        referralFeedback.valid ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {referralFeedback.valid ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : null}
                      <span>{referralFeedback.text}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] via-[#781e32] to-[#6e1c2e] hover:from-[#a02f48] hover:to-[#591323] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#fcd34d]" />
                <span>Confirm Appointment ($50 Deposit Simulation)</span>
              </button>

              {/* Direct Acuity Alternate Option */}
              <div className="pt-1">
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-[#edd8d5]"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-[#705055] uppercase tracking-wider font-semibold">Or book directly on Acuity</span>
                  <div className="flex-grow border-t border-[#edd8d5]"></div>
                </div>
                <a
                  href={OFFICIAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-[#fcf5f1] border border-[#edd8d5] text-[#8e273e] hover:bg-[#faebea] transition-colors flex items-center justify-center gap-2 shadow-2xs"
                >
                  <span>Instant Schedule on Princess AHB Acuity (as.me)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#fcd34d]" />
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#705055]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8e273e]" />
                <span>Zero cancellation fee if rescheduled 48 hours prior. Hair included.</span>
              </div>
            </form>
          )}

          {step === 5 && confirmedBooking && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#faebea] border-2 border-[#8e273e] flex items-center justify-center text-[#8e273e]">
                <Check className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-[#221417] mb-1">
                  Your Crown Appointment is Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-[#543b3f]">
                  Booking Reference: <span className="font-mono text-[#8e273e] font-bold">{confirmedBooking.id}</span>
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="p-4 rounded-xl bg-[#fcf5f1] border border-[#edd8d5] text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#543b3f]">Client:</span>
                  <span className="text-[#221417] font-semibold">{confirmedBooking.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#543b3f]">Style & Length:</span>
                  <span className="text-[#221417] font-semibold">{confirmedBooking.serviceName} ({confirmedBooking.lengthOption})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#543b3f]">Time & Date:</span>
                  <span className="text-[#8e273e] font-bold">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#543b3f]">Stylist & Location:</span>
                  <span className="text-[#221417]">{confirmedBooking.stylistName} · {confirmedBooking.location}</span>
                </div>
                {confirmedBooking.referralCodeUsed && (
                  <div className="flex justify-between text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                    <span className="font-semibold flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Queen Referral Discount:</span>
                    </span>
                    <span className="font-bold">-$25.00 ({confirmedBooking.referralCodeUsed})</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-[#edd8d5]">
                  <span className="text-[#543b3f]">Deposit Paid:</span>
                  <span className="text-[#8e273e] font-bold">${confirmedBooking.depositPaid} (Simulated)</span>
                </div>
                <div className="flex justify-between text-[#705055]">
                  <span>Due in salon:</span>
                  <span>${confirmedBooking.totalAmount - confirmedBooking.depositPaid}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Princess AHB//Appointment//EN
BEGIN:VEVENT
SUMMARY:${confirmedBooking.serviceName} at Princess AHB
DESCRIPTION:Braiding with ${confirmedBooking.stylistName}. Ref: ${confirmedBooking.id}. Location: ${confirmedBooking.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
                    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `PrincessAHB-${confirmedBooking.id}.ics`;
                    link.click();
                    setCalendarDownloaded(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-[#ffffff] border border-[#edd8d5] text-[#221417] hover:bg-[#faebea] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#8e273e]" />
                  <span>
                    {calendarDownloaded ? '✓ Calendar Invite Downloaded (.ics)' : 'Add to Google / Apple Calendar (.ics)'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText?.(
                      `My Crown Appointment at Princess AHB is confirmed for ${confirmedBooking.date} at ${confirmedBooking.timeSlot}! Ref: ${confirmedBooking.id}`
                    );
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 3000);
                  }}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-[#ffffff] border border-[#edd8d5] text-[#543b3f] hover:text-[#221417] hover:bg-[#faebea] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#8e273e]" />
                  <span>{copiedLink ? '✓ Copied Details to Clipboard' : 'Share Booking Confirmation'}</span>
                </button>

                <a
                  href={OFFICIAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-[#faebea] border border-[#f0c5cd] text-[#8e273e] hover:bg-[#f6dadf] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#8e273e]" />
                  <span>View Live Schedule on Acuity (princessahb.as.me)</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] transition-all cursor-pointer shadow-md active:scale-95"
                >
                  Done & Return to Salon Experience
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
