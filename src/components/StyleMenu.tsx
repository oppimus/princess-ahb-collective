import React, { useState } from 'react';
import { Calendar, Scissors, ExternalLink } from 'lucide-react';
import { BraidingService } from '../types';
import { OFFICIAL_BOOKING_URL } from '../data/mockData';

interface StyleMenuProps {
  services: BraidingService[];
  onSelectServiceForBooking: (service: BraidingService, lengthIdx?: number, sizeIdx?: number) => void;
}

export const StyleMenu: React.FC<StyleMenuProps> = ({
  services,
  onSelectServiceForBooking,
}) => {
  // Interactive style visualizer simulator
  const [calcServiceId, setCalcServiceId] = useState<string>(services[0]?.id || 'boho-knotless');
  const [selectedLengthIdx, setSelectedLengthIdx] = useState<number>(0);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState<number>(0);

  const selectedService = services.find((s) => s.id === calcServiceId) || services[0];
  const calculatedPrice =
    selectedService.price +
    (selectedService.lengthOptions[selectedLengthIdx]?.addPrice || 0) +
    (selectedService.sizeOptions[selectedSizeIdx]?.addPrice || 0);

  return (
    <section id="styles-menu" className="py-16 bg-[#fcf6f2] text-[#221417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* INTERACTIVE STYLE & TIME LIVE ESTIMATOR */}
        <div className="bg-[#ffffff] border border-[#edd8d5] rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#faebea]/60 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faebea] border border-[#f0c5cd] text-[#8e273e] text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
              <Scissors className="w-3.5 h-3.5 text-[#8e273e]" />
              <span>Interactive Customizer & Live Price Estimator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#221417] tracking-tight">
              Calculate Your Custom Style Investment
            </h2>
            <p className="text-sm text-[#543b3f] leading-relaxed mt-2">
              Select your protective style, target length, and parting size below. See real-time pricing and estimated duration before booking your chair.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Style Selector & Photo Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#8e273e] uppercase tracking-wider mb-2">
                  1. Select Protective Style
                </label>
                <select
                  value={calcServiceId}
                  onChange={(e) => {
                    setCalcServiceId(e.target.value);
                    setSelectedLengthIdx(0);
                    setSelectedSizeIdx(0);
                  }}
                  className="w-full px-4 py-3 bg-[#fcf6f2] border border-[#edd8d5] rounded-xl text-sm font-semibold text-[#221417] focus:outline-none focus:border-[#8e273e] focus:bg-white transition-colors cursor-pointer shadow-xs"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (Base ${s.price} · {s.durationHours} hrs)
                    </option>
                  ))}
                </select>
              </div>

              {/* Style Card Snapshot */}
              <div className="bg-[#fcf6f2] border border-[#edd8d5] rounded-2xl p-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 ring-2 ring-[#edd8d5] shadow-xs">
                  <img
                    src={selectedService.imageUrl}
                    alt={selectedService.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-base text-[#221417]">
                    {selectedService.name}
                  </h4>
                  <p className="text-xs text-[#543b3f] line-clamp-2">
                    {selectedService.description}
                  </p>
                  <span className="text-[11px] font-semibold text-[#8e273e] block">
                    Hair Included · Zero Root Tension
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Configuration Options: Length & Parting Size */}
            <div className="lg:col-span-4 space-y-5">
              {/* Desired Length */}
              <div>
                <label className="block text-xs font-bold text-[#8e273e] uppercase tracking-wider mb-2">
                  2. Desired Length
                </label>
                <div className="space-y-2">
                  {selectedService.lengthOptions.map((len, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedLengthIdx(idx)}
                      className={`w-full p-2.5 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer flex items-center justify-between ${
                        selectedLengthIdx === idx
                          ? 'bg-[#faebea] text-[#221417] border-[#8e273e] font-bold shadow-2xs'
                          : 'bg-[#ffffff] text-[#543b3f] border-[#edd8d5] hover:border-[#8e273e]'
                      }`}
                    >
                      <span className="truncate">{len.name}</span>
                      <span className="text-[11px] font-semibold text-[#8e273e] shrink-0 ml-2">
                        {len.addPrice > 0 ? `+$${len.addPrice}` : 'Included'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Parting Size */}
              <div>
                <label className="block text-xs font-bold text-[#8e273e] uppercase tracking-wider mb-2">
                  3. Parting Size
                </label>
                <div className="space-y-2">
                  {selectedService.sizeOptions.map((sz, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSizeIdx(idx)}
                      className={`w-full p-2.5 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer flex items-center justify-between ${
                        selectedSizeIdx === idx
                          ? 'bg-[#faebea] text-[#221417] border-[#8e273e] font-bold shadow-2xs'
                          : 'bg-[#ffffff] text-[#543b3f] border-[#edd8d5] hover:border-[#8e273e]'
                      }`}
                    >
                      <span className="truncate">{sz.name}</span>
                      <span className="text-[11px] font-semibold text-[#8e273e] shrink-0 ml-2">
                        {sz.addPrice !== 0 ? `${sz.addPrice > 0 ? '+' : ''}$${sz.addPrice}` : 'Standard'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary Card with Live Calculated Price & Action CTAs */}
            <div className="lg:col-span-3 bg-gradient-to-br from-[#fcf5f1] via-[#fffaf7] to-[#faebea] border border-[#edd8d5] rounded-2xl p-6 text-center space-y-4 shadow-md">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8e273e] block">
                Estimated Total
              </span>
              <div className="text-4xl sm:text-5xl font-serif font-bold text-[#8e273e] tracking-tight">
                ${calculatedPrice}
              </div>

              <div className="text-xs text-[#543b3f] py-3 border-y border-[#edd8d5] space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <span>Est. Duration:</span>
                  <strong className="text-[#221417]">{selectedService.durationHours} hrs</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Scalp Health:</span>
                  <strong className="text-[#8e273e]">Zero Root Tension</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Extensions:</span>
                  <strong className="text-[#221417]">100% Included</strong>
                </div>
              </div>

              <button
                onClick={() => onSelectServiceForBooking(selectedService, selectedLengthIdx, selectedSizeIdx)}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Calendar className="w-3.5 h-3.5 text-[#fcd34d]" />
                <span>Book This Custom Look</span>
              </button>

              <a
                href={OFFICIAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#8e273e] hover:underline pt-1"
              >
                <span>Or direct Acuity schedule (as.me)</span>
                <ExternalLink className="w-3 h-3 text-[#8e273e]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
