import React, { useState } from 'react';
import { Sparkles, CheckCircle2, X, MapPin, Phone, Mail, ShieldCheck, Clock, Key, Wifi, Coffee, Layers } from 'lucide-react';
import { BOOTH_RENTAL_STATIONS, CONTACT_INFO } from '../data/mockData';
import { BoothRentalStation } from '../types';

interface BoothRentalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStylistApplication?: () => void;
}

export const BoothRentalModal: React.FC<BoothRentalModalProps> = ({
  isOpen,
  onClose,
  onOpenStylistApplication,
}) => {
  const [selectedStation, setSelectedStation] = useState<BoothRentalStation>(BOOTH_RENTAL_STATIONS[0]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [notes, setNotes] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setInquirySubmitted(true);
  };

  const handleReset = () => {
    setInquirySubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#ffffff] border border-[#edd8d5] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-[#221417] my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2e1065] via-[#4c1d95] to-[#7c2d12] px-6 py-4.5 border-b border-[#6b21a8] flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#fcd34d]/20 border border-[#fcd34d]/40 flex items-center justify-center text-[#fcd34d]">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-white">
                  Booth Rental & Salon Chair Opportunities
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#fcd34d] text-[#2e1065] text-[10px] font-black uppercase tracking-wider">
                  Turnkey Suites
                </span>
              </div>
              <p className="text-[11px] text-purple-200">
                Be your own boss · Keep 100% of your earnings · Baton Rouge, LA & Virginia studios
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!inquirySubmitted ? (
            <>
              {/* Introduction Callout */}
              <div className="bg-[#faf5ff] border border-[#e9d5ff] rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-xs text-[#581c87]">
                  <h4 className="font-serif font-bold text-sm text-[#3b0764] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#9333ea]" />
                    <span>Run Your Independent Braiding Business in a Luxury Setting</span>
                  </h4>
                  <p className="leading-relaxed">
                    Tired of working from home or paying high salon commission splits? Rent a fully equipped station at Princess AHB with 24/7 access, wash bowls, towel service, and steady client traffic.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`tel:${CONTACT_INFO.phoneRaw}`}
                    className="px-4 py-2 rounded-lg bg-[#581c87] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3b0764] transition-colors"
                  >
                    📞 Call Studio: {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Station Selection Cards */}
              <div>
                <h4 className="font-serif font-bold text-base text-[#221417] mb-3">
                  1. Select a Station Tier
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BOOTH_RENTAL_STATIONS.map((station) => {
                    const isSelected = selectedStation.id === station.id;
                    return (
                      <div
                        key={station.id}
                        onClick={() => setSelectedStation(station)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#ffffff] border-[#7c2d12] ring-2 ring-[#7c2d12]/20 shadow-md'
                            : 'bg-[#faf4f2] border-[#edd8d5] hover:border-[#8e273e]/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8e273e]">
                                {station.type}
                              </div>
                              <h5 className="font-serif font-bold text-sm text-[#221417]">
                                {station.title}
                              </h5>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-serif font-bold text-lg text-[#8e273e]">
                                {station.priceDisplay}
                              </span>
                              <span className="block text-[10px] text-emerald-700 font-semibold">
                                {station.availableSpots} Station{station.availableSpots > 1 ? 's' : ''} Open
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-[#705055] leading-relaxed mb-3">
                            {station.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {station.features.map((feat, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-white text-[10px] font-semibold text-[#8e273e] border border-[#edd8d5]"
                              >
                                ✓ {feat}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#edd8d5] flex items-center justify-between text-xs">
                          <span className="text-[#9d7d83] flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#8e273e]" />
                            <span className="truncate max-w-[190px]">{station.location}</span>
                          </span>
                          <span
                            className={`font-bold text-xs uppercase ${
                              isSelected ? 'text-[#8e273e]' : 'text-[#705055]'
                            }`}
                          >
                            {isSelected ? '● Selected' : '○ Select'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Station Amenities Included */}
              <div className="p-4 rounded-xl bg-[#faf4f2] border border-[#edd8d5]">
                <h4 className="font-serif font-bold text-sm text-[#221417] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8e273e]" />
                  <span>All Station Amenities Included with Every Rental</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-[#543b3f]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Hydraulic styling chair & mirror</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Shampoo wash bowls & hooded dryers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Lockable storage cabinet & cart</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Retail shelf space to sell your hair</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Complimentary high-speed Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Clean towel service & all utilities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Client reception & lounge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>24/7 keycard security access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Optional booking platform listing</span>
                  </div>
                </div>
              </div>

              {/* Application / Tour Request Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <h4 className="font-serif font-bold text-base text-[#221417]">
                  2. Apply for Booth Rental or Schedule a Studio Walkthrough
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Fatima Diallo"
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                      Cell Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(225) 555-0199"
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                      Target Move-In Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                    Questions or Tour Availability Preferences
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Would love to tour the Baton Rouge studio tomorrow morning..."
                    className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2e1065] via-[#4c1d95] to-[#7c2d12] hover:from-[#3b0764] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Key className="w-4 h-4 text-[#fcd34d]" />
                    <span>Submit Booth Rental Inquiry for {selectedStation.title.split('—')[0]}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenStylistApplication?.();
                    }}
                    className="w-full sm:w-auto px-4 py-3 rounded-lg border border-[#edd8d5] text-xs font-bold text-[#8e273e] hover:bg-[#faebea] transition-colors"
                  >
                    Prefer Commission / Hiring? Apply Here
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 border-2 border-purple-600 flex items-center justify-center text-purple-700">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#221417]">
                Station Inquiry Received!
              </h3>
              <p className="text-xs text-[#705055] max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#221417]">{fullName}</strong>. Your inquiry for <strong className="text-[#221417]">{selectedStation.title}</strong> ({selectedStation.priceDisplay}) has been logged.
              </p>
              <div className="p-4 rounded-xl bg-[#faf5ff] border border-[#e9d5ff] max-w-md mx-auto text-left text-xs space-y-1.5 text-[#581c87]">
                <strong className="block text-[#3b0764]">Next Steps:</strong>
                <p>
                  To schedule an in-person station walkthrough today at <strong>12135 Florida Blvd, Baton Rouge, LA 70815</strong> or our <strong>Virginia Location</strong>, call or text directly:
                </p>
                <div className="pt-1">
                  <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="font-bold underline text-sm">
                    📞 (225) 288-2746
                  </a>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="w-full max-w-md py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-purple-900 hover:bg-purple-950 transition-colors cursor-pointer shadow-md"
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
