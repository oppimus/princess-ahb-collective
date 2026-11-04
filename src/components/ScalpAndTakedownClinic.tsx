import React, { useState } from 'react';
import { ShieldAlert, Sparkles, CheckCircle2, Scissors, Heart, Gift, Clock, DollarSign, ArrowRight, AlertCircle, Droplets, Zap } from 'lucide-react';

interface ScalpAndTakedownClinicProps {
  onOpenBooking: () => void;
  onSelectService: (serviceName: string, price: number) => void;
}

export const ScalpAndTakedownClinic: React.FC<ScalpAndTakedownClinicProps> = ({
  onOpenBooking,
  onSelectService,
}) => {
  // AI Diagnostic State
  const [symptoms, setSymptoms] = useState('Severe itchy scalp and burning along my temples since getting braids 3 days ago');
  const [weeksWearing, setWeeksWearing] = useState(1);
  const [currentStyle, setCurrentStyle] = useState('Knotless Box Braids');
  const [painLevel, setPainLevel] = useState(6);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any | null>(null);

  // Gift Card State
  const [giftAmount, setGiftAmount] = useState(100);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [giftPurchased, setGiftPurchased] = useState(false);
  const [orderedKit, setOrderedKit] = useState<string | null>(null);

  // Active Sub-tab
  const [activeClinicTab, setActiveClinicTab] = useState<'takedown-bar' | 'ai-diagnostic' | 'gift-cards'>('takedown-bar');

  const nonBraidingServices = [
    {
      id: 'srv-painless-takedown',
      name: 'Express Painless Braid Takedown & Detangle',
      duration: '45 - 60 Mins',
      price: 65,
      tag: 'Pain Point: 8-Hour Takedown Dread',
      description: 'Two artisans gently unbraid your hair using our high-slip organic marshmallow root melt. Zero edge pulling, zero shedding clumps, and zero stress.',
      cta: 'Book Takedown Only',
    },
    {
      id: 'srv-scalp-detox-steam',
      name: 'Herbal ACV Scalp Detox & Botanical Steaming',
      duration: '40 Mins',
      price: 45,
      tag: 'Pain Point: Chemical Itch & Flakes',
      description: 'Neutralizes alkaline synthetic coatings, unclogs congested hair follicles with warm rosemary steam, and restores the scalp acid mantle.',
      cta: 'Book Scalp Detox',
    },
    {
      id: 'srv-perimeter-refresh',
      name: 'The 30-Minute Perimeter & Edge Restitch',
      duration: '30 Mins',
      price: 55,
      tag: 'Pain Point: Need Fresh Look for Weekend',
      description: 'Do not spend full set price! We gently re-braid only the front 2 rows / hairline perimeter and re-dip your ends in hot water mousse. Looks brand new.',
      cta: 'Book Edge Refresh',
    },
    {
      id: 'srv-silk-press-recovery',
      name: 'Between-the-Braids Deep Conditioning & Silk Press',
      duration: '60 Mins',
      price: 85,
      tag: 'Pain Point: Natural Hair Neglect in Off-Weeks',
      description: 'Targeted hydration treatment and featherlight silk press designed to strengthen natural coils during your 3-4 week rest period between protective styles.',
      cta: 'Book Rest Treatment',
    },
  ];

  const handleRunDiagnostic = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDiagnosing(true);

    try {
      const res = await fetch('/api/agents/scalp-diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms,
          weeksWearing,
          currentStyle,
          painLevel,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setDiagnosticResult(json.data);
      }
    } catch (err) {
      console.error('Error running scalp diagnostic:', err);
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleBuyGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail || !recipientName || !senderName) return;
    setGiftPurchased(true);
  };

  return (
    <section id="clinic" className="py-20 bg-[#fcf6f2] text-[#221417] border-t border-[#edd8d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f4] border border-[#f0c5cd] text-[#8e273e] text-xs font-semibold tracking-wider uppercase shadow-xs">
            <Droplets className="w-3.5 h-3.5 text-[#8e273e]" />
            <span>Beyond the Braid · Non-Braiding Revenue Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#221417]">
            The Scalp & Follicle Rescue Bar. <br />
            <span className="italic text-[#8e273e] font-serif">Care for Your Hair, Even When Not Braiding.</span>
          </h2>
          <p className="text-sm text-[#705055] leading-relaxed">
            Over 68% of hair complaints stem from tight tension, synthetic chemical itch, and 8-hour takedown exhaustion. We engineered dedicated solutions that provide relief and restorative care—even during your hair's rest cycle.
          </p>
        </div>

        {/* Salon Natural Hair Health & Scalp Philosophy Banner */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-white border border-[#edd8d5] shadow-xs flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#8e273e] shrink-0 shadow-md ring-4 ring-[#faebea]">
            <img
              src="/assets/images/hair_loss_coverup_1791876312275.jpg"
              alt="Scalp & Follicle Restoration Care"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8e273e]">
                Salon Natural Hair & Follicle Standard
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                ✓ 100% 4C Friendly
              </span>
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#221417]">
              "We Treat Your Natural Coils Like Sacred Royalty."
            </h3>
            <p className="text-xs text-[#543b3f] leading-relaxed">
              We created our dedicated Scalp & Takedown Clinic so you never feel ashamed or stressed about taking your braids down. Our gentle multi-hand unbraiding, organic clarifying, and botanical peppermint steam treatments ensure zero edge breakage and maximum retention. — <strong>The Princess Sanctuary Standard</strong>
            </p>
          </div>
        </div>

        {/* Navigation Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 border-b border-[#edd8d5]">
          <button
            onClick={() => setActiveClinicTab('takedown-bar')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              activeClinicTab === 'takedown-bar'
                ? 'bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] text-white font-bold shadow-md shadow-[#8e273e]/20'
                : 'bg-[#ffffff] text-[#705055] hover:text-[#221417] hover:bg-[#faf4f2] border border-[#edd8d5]'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Express Takedown & Wash Bar</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">$45 - $85</span>
          </button>

          <button
            onClick={() => setActiveClinicTab('ai-diagnostic')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              activeClinicTab === 'ai-diagnostic'
                ? 'bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] text-white font-bold shadow-md shadow-[#8e273e]/20'
                : 'bg-[#ffffff] text-[#705055] hover:text-[#221417] hover:bg-[#faf4f2] border border-[#edd8d5]'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>AI Trichology Scalp SOS</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Instant Relief</span>
          </button>

          <button
            onClick={() => setActiveClinicTab('gift-cards')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              activeClinicTab === 'gift-cards'
                ? 'bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] text-white font-bold shadow-md shadow-[#8e273e]/20'
                : 'bg-[#ffffff] text-[#705055] hover:text-[#221417] hover:bg-[#faf4f2] border border-[#edd8d5]'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>"Sponsor Her Crown" Digital Gift Cards</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">$50 - $250</span>
          </button>
        </div>

        {/* TAB 1: TAKEDOWN & RESTING HAIR CARE BAR */}
        {activeClinicTab === 'takedown-bar' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {nonBraidingServices.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-2xl bg-[#ffffff] border border-[#edd8d5] hover:border-[#8e273e] transition-all flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-[#8e273e] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#fdf2f4] border border-[#f0c5cd]">
                      {srv.tag}
                    </span>
                    <span className="text-xs text-[#705055] flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-[#8e273e]" /> {srv.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#221417] mb-1">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-[#705055] leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#edd8d5] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#9d7d83] uppercase block font-semibold">Service Investment</span>
                    <span className="text-2xl font-serif font-bold text-[#8e273e]">${srv.price}</span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectService(srv.name, srv.price);
                      onOpenBooking();
                    }}
                    className="py-2.5 px-5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#9e2d46] transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    {srv.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: AI TRICHOLOGY SCALP SOS DIAGNOSTIC */}
        {activeClinicTab === 'ai-diagnostic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Input Form */}
            <form onSubmit={handleRunDiagnostic} className="lg:col-span-5 bg-[#ffffff] border border-[#edd8d5] rounded-2xl p-6 space-y-4 shadow-sm text-[#221417]">
              <div className="pb-3 border-b border-[#edd8d5]">
                <div className="text-xs font-bold text-[#8e273e] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <ShieldAlert className="w-4 h-4" />
                  <span>AI Scalp & Edge Diagnostic</span>
                </div>
                <p className="text-xs text-[#705055]">
                  Instant trichology triage for clients experiencing tightness, irritation, or itching.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                  Describe What Your Scalp Feels Like *
                </label>
                <textarea
                  rows={3}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                  placeholder="e.g. Red bumps along my hairline, unbearable throbbing itch..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                    Weeks Wearing Style
                  </label>
                  <select
                    value={weeksWearing}
                    onChange={(e) => setWeeksWearing(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                  >
                    <option value={1}>Week 1 (Fresh install)</option>
                    <option value={2}>Week 2</option>
                    <option value={4}>Week 4</option>
                    <option value={6}>Week 6</option>
                    <option value={8}>Week 8+ (Overdue takedown)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                    Pain / Itch Level (1-10)
                  </label>
                  <select
                    value={painLevel}
                    onChange={(e) => setPainLevel(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} {n >= 8 ? '(Severe Emergency)' : n >= 5 ? '(Moderate Discomfort)' : '(Mild)'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                  Current Hairstyle
                </label>
                <input
                  type="text"
                  value={currentStyle}
                  onChange={(e) => setCurrentStyle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                />
              </div>

              <button
                type="submit"
                disabled={isDiagnosing}
                className="w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] via-[#9e2d46] to-[#6e1c2e] hover:from-[#9e2d46] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isDiagnosing ? (
                  <>
                    <Droplets className="w-4 h-4 text-[#fcd34d]" />
                    <span>Analyzing Scalp Pathology...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-[#fcd34d]" />
                    <span>Generate Instant Scalp Solution</span>
                  </>
                )}
              </button>
            </form>

            {/* Diagnostic Result & Purchase Link */}
            <div className="lg:col-span-7 bg-[#ffffff] border border-[#edd8d5] rounded-2xl p-6 space-y-5 shadow-sm text-[#221417]">
              {!diagnosticResult ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#fdf2f4] border border-[#f0c5cd] mx-auto flex items-center justify-center text-[#8e273e]">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#221417]">
                    Trichology Engine Awaiting Symptoms
                  </h4>
                  <p className="text-xs text-[#705055] max-w-sm mx-auto">
                    Submit your symptoms on the left. The AI will pinpoint whether you have chemical alkaline reaction, follicle traction inflammation, or sebum blockage, and tell you how to resolve it in 5 minutes.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#edd8d5]">
                    <div>
                      <span className="text-[10px] text-[#8e273e] uppercase font-bold tracking-wider">
                        Diagnosis Identified
                      </span>
                      <h4 className="font-serif font-bold text-xl text-[#221417]">
                        {diagnosticResult.condition}
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
                      {diagnosticResult.severity}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#faf4f2] border border-[#edd8d5] text-xs space-y-1">
                    <strong className="text-[#221417] block">Biological Root Cause:</strong>
                    <p className="text-[#705055] leading-relaxed">{diagnosticResult.rootCause}</p>
                  </div>

                  {/* Immediate 5-min Home Action */}
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                    <strong className="text-emerald-900 flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Immediate 5-Minute Relief Action at Home:
                    </strong>
                    <p className="text-emerald-800 leading-relaxed">{diagnosticResult.immediateRelief}</p>
                  </div>

                  {/* Recommendations */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#faf4f2] border border-[#edd8d5]">
                      <span className="text-[10px] text-[#8e273e] uppercase font-bold block mb-1">
                        Recommended At-Home Kit:
                      </span>
                      <div className="font-semibold text-[#221417] mb-1">{diagnosticResult.recommendedHomeKit}</div>
                      <button
                        onClick={() => {
                          setOrderedKit(diagnosticResult.recommendedHomeKit);
                          setTimeout(() => setOrderedKit(null), 4000);
                        }}
                        className="text-[11px] text-[#8e273e] font-semibold underline hover:text-[#221417] cursor-pointer"
                      >
                        {orderedKit === diagnosticResult.recommendedHomeKit ? '✓ Added to Express Checkout' : 'Order Home Delivery →'}
                      </button>
                    </div>

                    <div className="p-3 rounded-lg bg-[#faf4f2] border border-[#edd8d5]">
                      <span className="text-[10px] text-[#8e273e] uppercase font-bold block mb-1">
                        Recommended Salon Treatment:
                      </span>
                      <div className="font-semibold text-[#221417] mb-1">{diagnosticResult.recommendedSalonService}</div>
                      <button
                        onClick={onOpenBooking}
                        className="text-[11px] text-[#8e273e] font-semibold underline hover:text-[#221417] cursor-pointer"
                      >
                        Book Relief Chair ($35 - $65) →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SPONSOR HER CROWN DIGITAL GIFT CARDS */}
        {activeClinicTab === 'gift-cards' && (
          <div className="max-w-2xl mx-auto bg-[#ffffff] border border-[#edd8d5] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-[#221417]">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf2f4] border border-[#f0c5cd] text-[#8e273e] text-xs font-semibold uppercase">
                <Gift className="w-3.5 h-3.5 text-[#8e273e]" />
                <span>Instant Digital Revenue · 0 Stylist Hours</span>
              </div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#221417]">
                "Sponsor Her Crown" Digital Gift Registry
              </h3>
              <p className="text-xs sm:text-sm text-[#705055]">
                Gift cards make salon money effortlessly 24/7. Perfect for birthdays, anniversaries, graduations, or showing appreciation to the queen in your life.
              </p>
            </div>

            {!giftPurchased ? (
              <form onSubmit={handleBuyGiftCard} className="space-y-4">
                {/* Amount Selectors */}
                <div>
                  <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-2 text-center">
                    Select Gift Amount
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[50, 100, 150, 250].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setGiftAmount(amt)}
                        className={`py-3 rounded-xl text-center text-sm font-serif font-bold border transition-all cursor-pointer ${
                          giftAmount === amt
                            ? 'bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] text-white border-[#8e273e] shadow-md'
                            : 'bg-[#faf4f2] text-[#221417] border-[#edd8d5] hover:border-[#8e273e]'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                      Recipient's Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Jasmine Taylor"
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                      Recipient's Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="jasmine@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                    Your Name (Sender) *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Marcus (With Love)"
                    className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] via-[#9e2d46] to-[#6e1c2e] hover:from-[#9e2d46] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Gift className="w-4 h-4" />
                  <span>Dispatch Digital Crown Card (${giftAmount})</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#fdf2f4] border-2 border-[#8e273e] flex items-center justify-center text-[#8e273e]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="font-serif font-bold text-2xl text-[#221417]">
                  Crown Gift Card Dispatched!
                </h4>
                <p className="text-xs text-[#705055]">
                  A luxury digital voucher worth <strong className="text-[#8e273e]">${giftAmount}</strong> has been emailed to <strong className="text-[#221417]">{recipientEmail}</strong> with code <span className="font-mono text-[#8e273e] font-bold">CROWN-{Math.floor(1000 + Math.random() * 9000)}</span>.
                </p>
                <button
                  onClick={() => {
                    setGiftPurchased(false);
                    setRecipientName('');
                    setRecipientEmail('');
                  }}
                  className="w-full py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#9e2d46] transition-all cursor-pointer shadow-md"
                >
                  Buy Another Gift Card
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
