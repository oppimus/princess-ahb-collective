import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  Check,
  Zap,
  Sliders,
  ExternalLink,
  Heart,
  Share2,
  Crown,
  Flame,
  Info,
  Camera,
} from 'lucide-react';
import { BraidingService } from '../types';
import { COLOR_SWATCHES, OFFICIAL_BOOKING_URL } from '../data/mockData';
import { CameraBraidAROverlay } from './CameraBraidAROverlay';

interface VirtualBraidStudioProps {
  services: BraidingService[];
  onBookCustomLook: (
    service: BraidingService,
    lengthIdx: number,
    sizeIdx: number,
    braiderId?: string,
    notes?: string
  ) => void;
  onOpenLeadMagnet?: () => void;
}

interface LengthChoice {
  id: string;
  name: string;
  inches: number;
  addPrice: number;
  bodyMarker: string; // e.g. "Falls right at natural waistline"
  tag?: string;
}

const LENGTH_TIERS: LengthChoice[] = [
  { id: 'len-shoulder', name: 'Shoulder Length', inches: 16, addPrice: 0, bodyMarker: 'Rests gracefully at shoulder collarbone', tag: 'Lightweight' },
  { id: 'len-midback', name: 'Mid-Back Length', inches: 24, addPrice: 30, bodyMarker: 'Falls at bra-strap line, easy styling', tag: 'Versatile' },
  { id: 'len-waist', name: 'Waist Length', inches: 30, addPrice: 60, bodyMarker: 'Falls right at narrowest part of waist', tag: '🔥 Most Popular' },
  { id: 'len-butt', name: 'Butt Length', inches: 36, addPrice: 90, bodyMarker: 'Dramatic length passing hip curve', tag: 'Showstopper' },
  { id: 'len-knee', name: 'Knee / Thigh Skimming', inches: 48, addPrice: 140, bodyMarker: 'Ultra-luxury floor length statement', tag: 'VIP Crown' },
];

const FINISH_UPGRADES = [
  {
    id: 'up-raw-curls',
    name: '100% Raw Virgin Human Hair Boho Curls',
    price: 55,
    tag: 'Zero Tangles for 8 Weeks',
    desc: 'Pure human hair curls that never matt or tangle in water/humidity.',
  },
  {
    id: 'up-french-ends',
    name: 'Bouncy French Curl Spiral Ends',
    price: 35,
    tag: 'Ultra Glamour',
    desc: 'Silky roller-set spiral ends with high bounce and movement.',
  },
  {
    id: 'up-gold-cuffs',
    name: 'Royal Gold Cuffs & Cowrie Shell Accents',
    price: 20,
    tag: 'Afro-Centric Royalty',
    desc: 'Hand-placed gold filigree cuffs and natural cowrie shell charms.',
  },
  {
    id: 'up-scalp-steam',
    name: 'Tea Tree & Wild Batana Scalp Pre-Mist',
    price: 25,
    tag: 'Edge Preservation',
    desc: 'Soothing organic follicle hydration before parting starts.',
  },
];

export const VirtualBraidStudio: React.FC<VirtualBraidStudioProps> = ({
  services,
  onBookCustomLook,
}) => {
  // Selectable states
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || 'boho-knotless');
  const [selectedLengthIdx, setSelectedLengthIdx] = useState<number>(2); // Default to Waist Length (popular)
  const [selectedSizeIdx, setSelectedSizeIdx] = useState<number>(1); // Default to Smedium
  const [selectedColorCode, setSelectedColorCode] = useState<string>('#1B');
  const [isSpeedSquad, setIsSpeedSquad] = useState<boolean>(true); // Speed squad 2-braider toggle default true for WOW factor
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>(['up-raw-curls']);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isHearted, setIsHearted] = useState(false);
  const [viewMode, setViewMode] = useState<'studio' | 'ar-camera'>('studio');

  const activeService = services.find((s) => s.id === selectedServiceId) || services[0];
  const activeLength = LENGTH_TIERS[selectedLengthIdx] || LENGTH_TIERS[2];
  const activeColor = COLOR_SWATCHES.find((c) => c.code === selectedColorCode) || COLOR_SWATCHES[1];

  const sizeOptions = activeService.sizeOptions && activeService.sizeOptions.length > 0
    ? activeService.sizeOptions
    : [
        { name: 'Micro / Fine', addPrice: 60 },
        { name: 'Smedium (High Density)', addPrice: 40 },
        { name: 'Medium Standard', addPrice: 0 },
        { name: 'Jumbo Statement', addPrice: -20 },
      ];

  const activeSize = sizeOptions[selectedSizeIdx] || sizeOptions[0];

  const toggleUpgrade = (id: string) => {
    setSelectedUpgrades((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  // Price calculations
  const basePrice = activeService.price;
  const lengthAdd = activeLength.addPrice;
  const sizeAdd = activeSize.addPrice || 0;
  const upgradesAdd = selectedUpgrades.reduce((sum, id) => {
    const item = FINISH_UPGRADES.find((u) => u.id === id);
    return sum + (item ? item.price : 0);
  }, 0);
  const speedSquadAdd = isSpeedSquad ? 35 : 0; // Speed squad express fee

  const calculatedTotal = basePrice + lengthAdd + sizeAdd + upgradesAdd + speedSquadAdd;
  const depositAmount = 50;

  // Time calculations
  const standardHours = activeService.durationHours + (selectedLengthIdx >= 3 ? 1.5 : 0.5);
  const estimatedHours = isSpeedSquad ? Math.max(2.5, Math.round((standardHours * 0.55) * 10) / 10) : standardHours;

  const handleShareLook = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleLockInLook = () => {
    const customNotes = `Custom Look: ${activeService.name} | Length: ${activeLength.name} (${activeLength.inches}") | Size: ${activeSize.name} | Color: ${activeColor.name} | Upgrades: ${selectedUpgrades.join(', ') || 'None'} | ${isSpeedSquad ? 'Speed Squad (2 Braiders)' : 'Solo Stylist'}`;
    onBookCustomLook(
      activeService,
      selectedLengthIdx,
      selectedSizeIdx,
      undefined,
      customNotes
    );
  };

  return (
    <section id="virtual-braid-studio" className="py-16 sm:py-20 bg-gradient-to-b from-[#ffffff] via-[#fff9f6] to-[#fcf6f2] text-[#221417] border-y border-[#edd8d5] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#8e273e]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#fcd34d]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faebea] border border-[#f0c5cd] text-[#8e273e] text-xs font-serif font-bold uppercase tracking-widest shadow-2xs">
            <Crown className="w-3.5 h-3.5 text-[#8e273e]" />
            <span>Interactive Virtual Crown Studio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#221417] tracking-tight">
            Design Your <span className="italic text-[#8e273e]">Dream Crown</span>
          </h2>
          <p className="text-sm sm:text-base text-[#543b3f] leading-relaxed max-w-2xl mx-auto">
            Customize your style, target body length, shade blend, and parting density in real-time. See exact pricing, duration, and lock in your chair before spots vanish.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 360° Visualizer Card & Live Spec Model / Camera AR Try-On */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            {/* Viewport Mode Switcher: Studio Model vs Live AR Camera */}
            <div className="flex items-center gap-1.5 p-1 bg-white border border-[#edd8d5] rounded-2xl shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode('studio')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  viewMode === 'studio'
                    ? 'bg-[#8e273e] text-white shadow-xs'
                    : 'text-[#543b3f] hover:bg-[#faebea]'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>3D Studio Model</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('ar-camera')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  viewMode === 'ar-camera'
                    ? 'bg-gradient-to-r from-[#fcd34d] via-[#f59e0b] to-[#d97706] text-stone-900 shadow-xs'
                    : 'text-[#8e273e] hover:bg-[#faebea]'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-stone-900" />
                <span>Live AR Mirror</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              </button>
            </div>

            {/* CONDITIONAL RENDER: Camera AR Try-On Mirror vs Studio Lookbook Card */}
            {viewMode === 'ar-camera' ? (
              <CameraBraidAROverlay
                selectedLengthInches={activeLength.inches}
                selectedLengthName={activeLength.name}
                selectedColorCode={activeColor.code}
                selectedColorName={activeColor.name}
                selectedStyleName={activeService.name}
                hasBohoCurls={selectedUpgrades.includes('up-raw-curls')}
                hasFrenchEnds={selectedUpgrades.includes('up-french-ends')}
                isSpeedSquad={isSpeedSquad}
                onCloseAR={() => setViewMode('studio')}
                onLockInLook={handleLockInLook}
              />
            ) : (
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#edd8d5] bg-[#1a0b0e] shadow-2xl group">
                {/* Dynamic Style Image */}
                <div className="relative h-[440px] sm:h-[500px] w-full overflow-hidden">
                  <img
                    src={activeService.imageUrl}
                    alt={activeService.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                  />

                  {/* Gradient vignette for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14080a] via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8e273e]/90 text-white backdrop-blur-md shadow-md border border-white/20 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#fcd34d]" />
                        <span>{activeService.name}</span>
                      </span>
                      {isSpeedSquad && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-stone-900 shadow-md flex items-center gap-1 animate-pulse">
                          <Zap className="w-3 h-3 fill-current" />
                          <span>Speed Squad (3.5h)</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setIsHearted(!isHearted)}
                      className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-rose-400 transition-colors cursor-pointer"
                      aria-label="Save style"
                    >
                      <Heart className={`w-4 h-4 ${isHearted ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Prominent Floating "Try On in Live AR" Quick Button */}
                  <div className="absolute top-16 left-4 z-20">
                    <button
                      type="button"
                      onClick={() => setViewMode('ar-camera')}
                      className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-[#8e273e] text-white border border-[#fcd34d]/60 backdrop-blur-md text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer group/ar"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#fcd34d] group-hover/ar:rotate-12 transition-transform" />
                      <span>Try On with Camera</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </button>
                  </div>

                  {/* Interactive Visual Body Length Line Indicator */}
                  <div className="absolute right-4 top-20 bottom-24 flex flex-col justify-between items-end pointer-events-none">
                    {LENGTH_TIERS.map((len, idx) => {
                      const isSelected = selectedLengthIdx === idx;
                      return (
                        <div
                          key={len.id}
                          className={`flex items-center gap-1.5 text-[10px] font-bold uppercase transition-all ${
                            isSelected
                              ? 'text-[#fcd34d] scale-105 translate-x-0'
                              : 'text-white/40 translate-x-1'
                          }`}
                        >
                          <span className={`px-2 py-0.5 rounded backdrop-blur-md ${isSelected ? 'bg-[#8e273e]/90 text-white border border-[#fcd34d]' : 'bg-black/30'}`}>
                            {len.inches}" {len.name.split(' ')[0]}
                          </span>
                          <div className={`h-0.5 transition-all ${isSelected ? 'w-6 bg-[#fcd34d]' : 'w-2 bg-white/30'}`} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Model Overlay Info */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-200">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full ring-2 ring-white/60 shrink-0" style={{
                          background: activeColor.code === '#1' ? '#0a0a0a' :
                                      activeColor.code === '#1B' ? '#1c1917' :
                                      activeColor.code === '#27' ? '#d97706' :
                                      activeColor.code === '#30' ? '#9a3412' :
                                      activeColor.code === '#613' ? '#fde047' :
                                      activeColor.code === '#99J' ? '#831843' :
                                      'linear-gradient(135deg, #1c1917, #d97706)'
                        }} />
                        <span className="font-semibold text-white drop-shadow-md">
                          {activeColor.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#fcd34d] font-bold">
                        {activeLength.inches}" ({activeLength.name})
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-300 italic line-clamp-1">
                      "{activeLength.bodyMarker}"
                    </p>
                  </div>
                </div>

                {/* Bottom Quick Spec Bar inside Visualizer */}
                <div className="p-4 bg-gradient-to-r from-[#221417] via-[#2d181c] to-[#1a0b0e] border-t border-white/10 grid grid-cols-3 gap-2 text-center text-white">
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase font-semibold">Tension Score</div>
                    <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>0/10 Pain-Free</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase font-semibold">Sitting Time</div>
                    <div className="text-xs font-bold text-[#fcd34d] flex items-center justify-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{estimatedHours} hrs</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase font-semibold">Extensions</div>
                    <div className="text-xs font-bold text-amber-200 flex items-center justify-center gap-1 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-amber-300" />
                      <span>Included Free</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Share / Guarantee reassurance */}
            <div className="p-3.5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2 text-xs text-[#543b3f]">
                <ShieldCheck className="w-4 h-4 text-[#8e273e] shrink-0" />
                <span>Protected by the <strong>100% Crown & 7-Day Tune-Up Guarantee</strong></span>
              </div>
              <button
                onClick={handleShareLook}
                className="text-xs font-bold text-[#8e273e] hover:text-[#221417] flex items-center gap-1 cursor-pointer transition-colors"
                title="Share this configured look"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Custom Look Controls & Live Investment Calculator */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Protective Style */}
            <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#edd8d5] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#8e273e] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#faebea] text-[#8e273e] flex items-center justify-center text-[10px] font-bold">1</span>
                  <span>Select Protective Base Style</span>
                </label>
                <span className="text-[11px] text-[#705055] font-medium">{services.length} signature styles</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {services.slice(0, 6).map((svc) => {
                  const isSelected = selectedServiceId === svc.id;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => setSelectedServiceId(svc.id)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[72px] ${
                        isSelected
                          ? 'bg-[#faebea] text-[#221417] border-[#8e273e] font-bold shadow-xs ring-1 ring-[#8e273e]'
                          : 'bg-[#faf4f2]/60 text-[#543b3f] border-[#edd8d5] hover:border-[#8e273e] hover:bg-white'
                      }`}
                    >
                      <span className="text-xs font-serif line-clamp-1">{svc.name}</span>
                      <div className="flex items-center justify-between mt-1 text-[11px]">
                        <span className="text-[#8e273e] font-bold">From ${svc.price}</span>
                        <span className="text-[#856c70]">{svc.durationHours}h</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Target Length with Real Body Guide */}
            <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#edd8d5] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#8e273e] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#faebea] text-[#8e273e] flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>Target Length & Body Fall</span>
                </label>
                <span className="text-[11px] font-semibold text-[#8e273e]">
                  {activeLength.name} ({activeLength.inches}")
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {LENGTH_TIERS.map((len, idx) => {
                  const isSelected = selectedLengthIdx === idx;
                  return (
                    <button
                      key={len.id}
                      type="button"
                      onClick={() => setSelectedLengthIdx(idx)}
                      className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center relative ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#faebea] to-[#fff6f7] text-[#221417] border-[#8e273e] ring-2 ring-[#8e273e]/20 shadow-xs'
                          : 'bg-[#faf4f2]/60 text-[#543b3f] border-[#edd8d5] hover:border-[#8e273e] hover:bg-white'
                      }`}
                    >
                      {len.tag && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-[#8e273e] text-white absolute -top-2">
                          {len.tag}
                        </span>
                      )}
                      <span className="text-sm font-bold font-serif">{len.inches}"</span>
                      <span className="text-[10px] font-medium truncate max-w-full">{len.name.split(' ')[0]}</span>
                      <span className="text-[10px] text-[#8e273e] font-semibold mt-1">
                        {len.addPrice > 0 ? `+$${len.addPrice}` : 'Base'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Parting Size & Hair Color Swatches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Parting Size */}
              <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#edd8d5] shadow-xs space-y-3">
                <label className="text-xs font-bold text-[#8e273e] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#faebea] text-[#8e273e] flex items-center justify-center text-[10px] font-bold">3</span>
                  <span>Parting Density</span>
                </label>
                <div className="space-y-1.5">
                  {sizeOptions.map((sz, idx) => {
                    const isSelected = selectedSizeIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSizeIdx(idx)}
                        className={`w-full px-3 py-2 rounded-xl text-xs flex items-center justify-between border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#faebea] text-[#221417] border-[#8e273e] font-bold shadow-2xs'
                            : 'bg-[#faf4f2]/40 text-[#543b3f] border-[#edd8d5] hover:border-[#8e273e]'
                        }`}
                      >
                        <span>{sz.name}</span>
                        <span className="text-[11px] font-semibold text-[#8e273e]">
                          {sz.addPrice !== 0 ? `${sz.addPrice > 0 ? '+' : ''}$${sz.addPrice}` : 'Standard'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Swatches */}
              <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#edd8d5] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#8e273e] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#faebea] text-[#8e273e] flex items-center justify-center text-[10px] font-bold">4</span>
                    <span>Hair Color Blend</span>
                  </label>
                  <span className="text-[11px] font-bold text-[#8e273e] truncate max-w-[120px]">
                    {activeColor.name.split(' ')[0]}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 pt-1">
                  {COLOR_SWATCHES.map((color) => {
                    const isSelected = selectedColorCode === color.code;
                    return (
                      <button
                        key={color.code}
                        type="button"
                        onClick={() => setSelectedColorCode(color.code)}
                        className={`group relative flex flex-col items-center gap-1 cursor-pointer focus:outline-none`}
                        title={color.name}
                      >
                        <div
                          className={`w-9 h-9 rounded-full bg-gradient-to-br ${color.bgGradient} transition-transform shadow-sm flex items-center justify-center ${
                            isSelected
                              ? 'scale-110 ring-3 ring-[#8e273e] ring-offset-2 ring-offset-white'
                              : 'hover:scale-105'
                          }`}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                        </div>
                        <span className="text-[9px] font-bold text-[#543b3f] truncate max-w-full">
                          {color.code}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="text-[10px] text-[#705055] italic bg-[#faf4f2] p-2 rounded-lg">
                  ✨ <strong>Hair provided free in salon</strong>. Any color blend can be pre-mixed at no extra charge!
                </div>
              </div>
            </div>

            {/* Step 4: Speed Squad 2-Braider Option (WOW FACTOR: Cuts sitting time in half!) */}
            <div className={`rounded-2xl p-5 border transition-all ${
              isSpeedSquad
                ? 'bg-gradient-to-r from-[#faebea] via-[#fef3f4] to-[#fcf6f2] border-[#8e273e] shadow-sm'
                : 'bg-[#ffffff] border-[#edd8d5]'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8e273e] to-[#591423] text-amber-300 flex items-center justify-center shrink-0 shadow-md">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-base text-[#221417]">
                        Speed Squad Double-Crown Duo (2 Braiders)
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8e273e] text-white uppercase tracking-wider">
                        Cut Time 50%
                      </span>
                    </div>
                    <p className="text-xs text-[#543b3f] mt-0.5">
                      Two master braiders work in synchronized harmony on your hair. Sit for <strong>{estimatedHours} hours</strong> instead of {standardHours} hours!
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSpeedSquad(!isSpeedSquad)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isSpeedSquad
                      ? 'bg-[#8e273e] text-white shadow-md'
                      : 'bg-[#faf4f2] text-[#8e273e] border border-[#edd8d5] hover:bg-[#faebea]'
                  }`}
                >
                  {isSpeedSquad ? '✓ Speed Squad Active (+$35)' : '+ Add 2nd Braider (+$35)'}
                </button>
              </div>
            </div>

            {/* Step 5: Finish & Upgrades */}
            <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#edd8d5] shadow-xs space-y-3">
              <label className="text-xs font-bold text-[#8e273e] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#faebea] text-[#8e273e] flex items-center justify-center text-[10px] font-bold">5</span>
                <span>Crown Upgrades & Longevity Enhancements</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FINISH_UPGRADES.map((up) => {
                  const isChecked = selectedUpgrades.includes(up.id);
                  return (
                    <button
                      key={up.id}
                      type="button"
                      onClick={() => toggleUpgrade(up.id)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-2.5 ${
                        isChecked
                          ? 'bg-[#faebea] text-[#221417] border-[#8e273e] shadow-2xs'
                          : 'bg-[#faf4f2]/40 text-[#543b3f] border-[#edd8d5] hover:border-[#8e273e]'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                        isChecked ? 'bg-[#8e273e] border-[#8e273e] text-white' : 'border-[#d9b8be] bg-white'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold">{up.name}</span>
                          <span className="text-xs font-bold text-[#8e273e] shrink-0">+${up.price}</span>
                        </div>
                        <p className="text-[10px] text-[#705055] line-clamp-1">{up.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* IRRESISTIBLE INVESTMENT CARD & INSTANT LOCK-IN CTA */}
            <div className="bg-gradient-to-br from-[#221417] via-[#2d181c] to-[#1a0b0e] text-white rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden border border-[#8e273e]/40">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8e273e]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#fcd34d] font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Your Configured Investment</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {activeService.name}
                  </h3>
                  <p className="text-xs text-stone-300">
                    {activeLength.name} ({activeLength.inches}") · {activeSize.name} · {activeColor.name}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-[#fcd34d] tracking-tight">
                    ${calculatedTotal}
                  </div>
                  <div className="text-[11px] text-stone-300">
                    Only <strong className="text-white">${depositAmount} deposit</strong> to lock chair
                  </div>
                </div>
              </div>

              {/* Guarantees Summary */}
              <div className="py-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-stone-300">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Hair Included Free</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>0/10 Root Tension</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>7-Day Free Touch-Up</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{estimatedHours}h Total Sitting</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={handleLockInLook}
                  className="flex-1 py-4 px-6 rounded-xl text-sm font-serif font-bold uppercase tracking-widest text-[#221417] bg-gradient-to-r from-[#fcd34d] via-[#fde047] to-[#fbbf24] hover:from-[#fef08a] hover:to-[#f59e0b] transition-all shadow-xl shadow-[#fcd34d]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98 group"
                >
                  <Crown className="w-4 h-4 text-[#8e273e] group-hover:scale-110 transition-transform" />
                  <span>Lock In This Exact Look Now (${depositAmount} Deposit)</span>
                </button>

                <a
                  href={OFFICIAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <span>Acuity Schedule</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
