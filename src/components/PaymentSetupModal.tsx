import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  CheckCircle2,
  X,
  CreditCard,
  Building,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  ShoppingBag,
  BookOpen,
  Key,
  Users,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { CONTACT_INFO, INITIAL_PAYMENT_CHECKLIST } from '../data/mockData';
import { PaymentChecklistItem } from '../types';

interface PaymentSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: () => void;
  onOpenCourses?: () => void;
}

export const PaymentSetupModal: React.FC<PaymentSetupModalProps> = ({
  isOpen,
  onClose,
  onOpenCourses,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'checklist' | 'salon' | 'virginia' | 'courses' | 'boutique' | 'booth'>('overview');
  const [checklist, setChecklist] = useState<PaymentChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('princess_ahb_payment_checklist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_PAYMENT_CHECKLIST;
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('princess_ahb_payment_checklist', JSON.stringify(checklist));
    } catch (e) {
      // ignore
    }
  }, [checklist]);

  if (!isOpen) return null;

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = checklist.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText?.(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#ffffff] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#edd8d5] shadow-2xl relative my-auto">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#ffffff]/98 backdrop-blur-md p-4 sm:p-5 border-b border-[#edd8d5] flex items-center justify-between z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8e273e] to-[#6e1c2e] text-white flex items-center justify-center shadow-md">
              <DollarSign className="w-5 h-5 text-[#fcd34d]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#221417]">
                  What You Need to Get Paid
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                  Merchant Setup Guide
                </span>
              </div>
              <p className="text-xs text-[#705055]">
                Exact accounts, documents & steps to receive money for appointments, courses, boutique & rent
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#faf4f2] text-[#705055] hover:text-black transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar & Quick Stats */}
        <div className="bg-[#fff9f6] border-b border-[#edd8d5] px-5 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs mb-1.5">
            <span className="font-semibold text-[#221417] flex items-center gap-1.5">
              <span>Merchant Readiness Progress:</span>
              <strong className="text-[#8e273e] font-serif text-sm">{completedCount} of {checklist.length} Completed</strong>
            </span>
            <span className="text-[11px] font-bold text-[#8e273e]">{progressPercent}% Ready to Payout</span>
          </div>
          <div className="w-full h-2 bg-[#faebea] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8e273e] to-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-4 pt-3 border-b border-[#edd8d5] overflow-x-auto no-scrollbar bg-[#ffffff]">
          {[
            { id: 'overview' as const, label: '📋 Master Summary', icon: ShieldCheck },
            { id: 'checklist' as const, label: '✅ Action Checklist', icon: CheckCircle2, badge: `${completedCount}/${checklist.length}` },
            { id: 'salon' as const, label: '👑 Baton Rouge ($50 Deposits)', icon: Calendar },
            { id: 'virginia' as const, label: '💬 Virginia (Text Confirmation)', icon: Smartphone },
            { id: 'courses' as const, label: '🎓 Digital Courses ($79-$129)', icon: BookOpen },
            { id: 'boutique' as const, label: '🛍️ Boutiques (Hairs/Clothes)', icon: ShoppingBag },
            { id: 'booth' as const, label: '💺 Booth Rent ($175/wk)', icon: Users },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === t.id
                  ? 'border-[#8e273e] text-[#8e273e] font-bold bg-[#fdf2f4]/50 rounded-t-md'
                  : 'border-transparent text-[#705055] hover:text-[#221417]'
              }`}
            >
              <span>{t.label}</span>
              {t.badge && (
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#faebea] text-[#8e273e] font-bold">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* TAB 1: OVERVIEW & MASTER SUMMARY */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Highlight Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#8e273e] to-[#6e1c2e] text-white shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#fcd34d] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The 5 Things You Must Have Before Taking Payments</span>
                </div>
                <h4 className="font-serif font-bold text-xl sm:text-2xl mb-2">
                  What You Need Ready to Connect Direct Payouts
                </h4>
                <p className="text-xs sm:text-sm text-[#fce7ea] leading-relaxed max-w-2xl">
                  To receive daily or weekly bank transfers for hair appointments, online courses, boutique sales, and booth rentals, processors require standard KYC (Know Your Customer) business verification:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4 text-xs">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                    <strong className="block text-[#fcd34d] font-sans mb-1">1. Bank Account Details</strong>
                    <span className="text-[11px] text-white/90">Routing number & account number for direct ACH bank deposits.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                    <strong className="block text-[#fcd34d] font-sans mb-1">2. Tax ID (EIN or SSN)</strong>
                    <span className="text-[11px] text-white/90">Federal EIN or SSN for official 1099-K payment processing.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                    <strong className="block text-[#fcd34d] font-sans mb-1">3. Official Salon Address</strong>
                    <span className="text-[11px] text-white/90">12135 Florida Blvd, Baton Rouge, LA 70815.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                    <strong className="block text-[#fcd34d] font-sans mb-1">4. Contact Phone & Email</strong>
                    <span className="text-[11px] text-white/90">(225) 288-2746 & info@princessahb.com.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                    <strong className="block text-[#fcd34d] font-sans mb-1">5. Acuity / Stripe Gateway</strong>
                    <span className="text-[11px] text-white/90">Linked to collect $50 non-refundable deposits automatically.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                    <strong className="block text-[#fcd34d] font-sans mb-1">6. Cash App / Zelle Handles</strong>
                    <span className="text-[11px] text-white/90">For Virginia text confirmations & quick mobile transfers.</span>
                  </div>
                </div>
              </div>

              {/* Ready-to-Copy Salon Credentials */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs">
                <h4 className="font-serif font-bold text-base text-[#221417] mb-3 flex items-center justify-between">
                  <span>Your Verified Business Information (Copy & Paste Into Stripe / Square)</span>
                  <span className="text-[10px] text-[#705055] font-sans font-normal">Use this exact info to pass verification instantly</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#faf4f2] border border-[#edd8d5] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#705055] block">Business Name</span>
                      <strong className="text-[#221417]">Princess AHB Braiding Salon</strong>
                    </div>
                    <button
                      onClick={() => handleCopy('Princess AHB Braiding Salon', 'name')}
                      className="p-1.5 rounded-lg bg-white border border-[#edd8d5] hover:bg-[#faf4f2] text-[#8e273e]"
                    >
                      {copiedKey === 'name' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#faf4f2] border border-[#edd8d5] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#705055] block">Salon Physical Address</span>
                      <strong className="text-[#221417] line-clamp-1">12135 Florida Blvd, Baton Rouge, LA 70815</strong>
                    </div>
                    <button
                      onClick={() => handleCopy('12135 Florida Blvd, Baton Rouge, LA 70815', 'address')}
                      className="p-1.5 rounded-lg bg-white border border-[#edd8d5] hover:bg-[#faf4f2] text-[#8e273e]"
                    >
                      {copiedKey === 'address' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#faf4f2] border border-[#edd8d5] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#705055] block">Business Phone</span>
                      <strong className="text-[#221417]">(225) 288-2746</strong>
                    </div>
                    <button
                      onClick={() => handleCopy('225-288-2746', 'phone')}
                      className="p-1.5 rounded-lg bg-white border border-[#edd8d5] hover:bg-[#faf4f2] text-[#8e273e]"
                    >
                      {copiedKey === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#faf4f2] border border-[#edd8d5] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#705055] block">Contact Email</span>
                      <strong className="text-[#221417]">info@princessahb.com</strong>
                    </div>
                    <button
                      onClick={() => handleCopy('info@princessahb.com', 'email')}
                      className="p-1.5 rounded-lg bg-white border border-[#edd8d5] hover:bg-[#faf4f2] text-[#8e273e]"
                    >
                      {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#faf4f2] border border-[#edd8d5] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#705055] block">Official Booking URL</span>
                      <strong className="text-[#221417] line-clamp-1">princessahb.as.me/schedule</strong>
                    </div>
                    <button
                      onClick={() => handleCopy('https://princessahb.as.me/schedule/cf057a54', 'booking')}
                      className="p-1.5 rounded-lg bg-white border border-[#edd8d5] hover:bg-[#faf4f2] text-[#8e273e]"
                    >
                      {copiedKey === 'booking' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#faf4f2] border border-[#edd8d5] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#705055] block">Industry Category (MCC)</span>
                      <strong className="text-[#221417]">7230 - Beauty & Barber Shops</strong>
                    </div>
                    <button
                      onClick={() => handleCopy('7230 - Beauty and Barber Shops', 'mcc')}
                      className="p-1.5 rounded-lg bg-white border border-[#edd8d5] hover:bg-[#faf4f2] text-[#8e273e]"
                    >
                      {copiedKey === 'mcc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* The 5 Revenue Streams Breakdown */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-base text-[#221417]">
                  How Each Revenue Stream Pays You Directly:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#ffffff] border border-[#edd8d5] shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#8e273e]" />
                        <h5 className="font-bold text-sm text-[#221417]">1. In-Salon Braiding Appointments</h5>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Acuity + Stripe/Square
                      </span>
                    </div>
                    <p className="text-xs text-[#705055] leading-relaxed">
                      Client selects knotless or boho braids on Acuity. System charges a mandatory <strong className="text-[#221417]">$50 non-refundable deposit</strong> upfront. That $50 is sent directly to your bank in 1-2 business days. The remaining balance (e.g. $250) is swiped in the salon chair upon style completion.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#ffffff] border border-[#edd8d5] shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-[#8e273e]" />
                        <h5 className="font-bold text-sm text-[#221417]">2. Virginia Text Confirmations</h5>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Cash App / Zelle / Invoice
                      </span>
                    </div>
                    <p className="text-xs text-[#705055] leading-relaxed">
                      Virginia clients text <strong className="text-[#221417]">(225) 288-2746</strong> for confirmation. You reply with your Cash App handle (<code className="text-[#8e273e] font-bold">$PrincessAHB</code>) or Zelle to collect the deposit before putting them on the calendar. Instant funds availability!
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#ffffff] border border-[#edd8d5] shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#8e273e]" />
                        <h5 className="font-bold text-sm text-[#221417]">3. Online Courses & E-Books</h5>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Stripe / Stan / Gumroad
                      </span>
                    </div>
                    <p className="text-xs text-[#705055] leading-relaxed">
                      Stylists purchase your $79 Knotless Accelerator or $129 Academy in a Box. Stripe handles the checkout, delivers the video player & certificate download automatically, and deposits profits into your checking account daily.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#ffffff] border border-[#edd8d5] shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-[#8e273e]" />
                        <h5 className="font-bold text-sm text-[#221417]">4. Boutiques (Hairs & African Clothes)</h5>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Square / Shopify / Stripe
                      </span>
                    </div>
                    <p className="text-xs text-[#705055] leading-relaxed">
                      Customers order Raw Virgin Bulk Curls ($85), Ankara wrap dresses ($75), or Batana Scalp drops ($24). Payments deposit directly into your bank; orders are fulfilled by shipping or local salon pickup.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#221417]">
                    Merchant Payout Setup Checklist
                  </h4>
                  <p className="text-xs text-[#705055]">
                    Tick off each step as you complete it. Your progress is saved automatically.
                  </p>
                </div>
                <div className="text-xs font-bold text-[#8e273e]">
                  {completedCount} of {checklist.length} Completed
                </div>
              </div>

              <div className="space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      item.completed
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : 'bg-[#ffffff] border-[#edd8d5] hover:border-[#8e273e]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {item.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <div className="w-5 h-5 rounded-md border-2 border-[#8e273e]/40 hover:border-[#8e273e]" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h5 className={`font-bold text-sm ${item.completed ? 'text-emerald-950 line-through' : 'text-[#221417]'}`}>
                            {item.title}
                          </h5>
                          {item.completed ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                              ✓ Completed
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-[#8e273e] bg-[#fdf2f4] px-2 py-0.5 rounded border border-[#f0c5cd]">
                              Action Required
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#705055]">{item.description}</p>
                        <div className="p-3 bg-white/80 rounded-lg border border-[#edd8d5]/80 text-[11px] space-y-1">
                          <strong className="text-[#221417] block">Required Details:</strong>
                          <ul className="list-disc list-inside text-[#543b3f] space-y-0.5 pl-1">
                            {item.requiredInfo.map((req, idx) => (
                              <li key={idx}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        {item.actionUrl && (
                          <div className="pt-1">
                            <a
                              href={item.actionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8e273e] hover:underline"
                            >
                              <span>{item.actionLinkText || 'Open Configuration Link'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SALON DEPOSITS */}
          {activeTab === 'salon' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#8e273e]" />
                  <h4 className="font-serif font-bold text-lg text-[#221417]">
                    Baton Rouge Flagship: Acuity Scheduling & $50 Deposits
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#705055] leading-relaxed">
                  To eliminate client no-shows, Acuity Scheduling should require a <strong className="text-[#221417]">$50 non-refundable booking deposit</strong> for every braiding appointment. Here is how to configure it:
                </p>
                <div className="bg-[#fdfaf8] p-4 rounded-xl border border-[#edd8d5] space-y-3 text-xs">
                  <div className="space-y-1">
                    <strong className="text-[#8e273e] block font-sans">Step 1: Connect Payment Processor in Acuity</strong>
                    <p className="text-[#543b3f]">Go to Acuity Scheduling &gt; Payment Settings. Click "Connect Square" or "Connect Stripe". Log in with your bank details.</p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-[#8e273e] block font-sans">Step 2: Set Deposit Rule</strong>
                    <p className="text-[#543b3f]">Under "Payment Options", select: <em>"Require a deposit: Fixed amount of $50.00"</em>. Check the box for "Clients can choose to pay the full amount or just the deposit".</p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-[#8e273e] block font-sans">Step 3: Insert Policy Terms</strong>
                    <p className="text-[#543b3f]">Paste this exact legal disclaimer into Acuity Intake: <em>"Deposits are non-refundable and will be credited toward your hairstyle. Rescheduling requires 48 hours notice. Arrive with hair washed, blown out, and un-oiled. Address: 12135 Florida Blvd, Baton Rouge, LA 70815. Phone: (225) 288-2746."</em></p>
                  </div>
                </div>
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href="https://secure.acuityscheduling.com/preferences.php?action=payments"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#8e273e] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Open Acuity Payment Settings</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleCopy(
                      "Deposits are non-refundable and credited toward your hairstyle. Rescheduling requires 48 hours notice. Arrive with hair washed, blown out, and un-oiled. Address: 12135 Florida Blvd, Baton Rouge, LA 70815. Phone: (225) 288-2746.",
                      'acuity-terms'
                    )}
                    className="px-4 py-2 bg-white border border-[#edd8d5] hover:bg-[#faf4f2] text-[#8e273e] rounded-lg text-xs font-bold flex items-center gap-1.5"
                  >
                    {copiedKey === 'acuity-terms' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Acuity Disclaimer Text</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VIRGINIA LOCATION */}
          {activeTab === 'virginia' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#8e273e]" />
                  <h4 className="font-serif font-bold text-lg text-[#221417]">
                    Virginia Location: Text-to-Confirm & Direct Mobile Payments
                  </h4>
                </div>
                <div className="p-3 bg-[#faebea] border border-[#f0c5cd] rounded-xl text-xs text-[#8e273e]">
                  <strong>Important Salon Rule:</strong> "For Virginia location please text (225) 288-2746 for confirmation. Do not book on the website."
                </div>
                <p className="text-xs sm:text-sm text-[#705055] leading-relaxed">
                  Because Virginia appointments are coordinated via text, here is how you collect deposits securely before locking in chair time:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-[#fdfaf8] rounded-xl border border-[#edd8d5] space-y-2">
                    <strong className="text-[#221417] block font-sans">Method A: Cash App Business ($PrincessAHB)</strong>
                    <p className="text-[#705055]">Set up Cash App for Business linked to your bank account. Clients can send $50 directly from their phone in seconds.</p>
                    <button
                      onClick={() => handleCopy('$PrincessAHB', 'cashapp')}
                      className="px-3 py-1 bg-white border border-[#edd8d5] rounded text-xs font-bold text-[#8e273e] flex items-center gap-1"
                    >
                      {copiedKey === 'cashapp' ? '✓ Copied $PrincessAHB' : 'Copy Cash App Tag ($PrincessAHB)'}
                    </button>
                  </div>

                  <div className="p-3.5 bg-[#fdfaf8] rounded-xl border border-[#edd8d5] space-y-2">
                    <strong className="text-[#221417] block font-sans">Method B: Zelle to Phone / Email</strong>
                    <p className="text-[#705055]">Enable Zelle inside your bank mobile app. Point it to <strong className="text-[#221417]">225-288-2746</strong> or <strong className="text-[#221417]">info@princessahb.com</strong>. Zero fees, instant bank-to-bank transfer.</p>
                    <button
                      onClick={() => handleCopy('225-288-2746', 'zelle')}
                      className="px-3 py-1 bg-white border border-[#edd8d5] rounded text-xs font-bold text-[#8e273e] flex items-center gap-1"
                    >
                      {copiedKey === 'zelle' ? '✓ Copied Phone' : 'Copy Zelle Phone (225-288-2746)'}
                    </button>
                  </div>
                </div>

                {/* Ready-to-use SMS Autoresponder */}
                <div className="p-4 bg-[#fffbf9] rounded-xl border border-[#edd8d5] space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs font-bold text-[#221417]">
                      Copyable SMS Auto-Reply for Virginia Inquiries:
                    </strong>
                    <button
                      onClick={() => handleCopy(
                        "👑 Thank you for contacting Princess AHB Virginia! To reserve your chair, please text your preferred Date, Time & Style. A $50 deposit is required to lock your spot via Cash App ($PrincessAHB) or Zelle (225-288-2746). Deposits are credited toward your balance. See you soon Queen!",
                        'va-sms'
                      )}
                      className="text-xs font-bold text-[#8e273e] hover:underline flex items-center gap-1"
                    >
                      {copiedKey === 'va-sms' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy SMS Text</span>
                    </button>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#edd8d5] text-xs font-mono text-[#543b3f]">
                    "👑 Thank you for contacting Princess AHB Virginia! To reserve your chair, please text your preferred Date, Time & Style. A $50 deposit is required to lock your spot via Cash App ($PrincessAHB) or Zelle (225-288-2746). Deposits are credited toward your balance. See you soon Queen!"
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DIGITAL COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#8e273e]" />
                  <h4 className="font-serif font-bold text-lg text-[#221417]">
                    Digital Courses & Academy Passive Income Payouts
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#705055] leading-relaxed">
                  Your courses ($79 Knotless Accelerator, $129 Academy in a Box) and ebooks ($17-$34) sell 24/7 without you being in the salon chair. Here is how payouts work:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 bg-[#fdfaf8] rounded-xl border border-[#edd8d5] space-y-1.5">
                    <strong className="text-[#8e273e] block">1. Stripe Connect</strong>
                    <p className="text-[#543b3f]">Customers pay via Apple Pay, Google Pay, or Credit Card on your website. Stripe deposits payouts to your checking account daily.</p>
                  </div>
                  <div className="p-3.5 bg-[#fdfaf8] rounded-xl border border-[#edd8d5] space-y-1.5">
                    <strong className="text-[#8e273e] block">2. Automatic Delivery</strong>
                    <p className="text-[#543b3f]">Upon payment, the student immediately unlocks video masterclasses, curriculum modules, Canva templates, and official certificates.</p>
                  </div>
                  <div className="p-3.5 bg-[#fdfaf8] rounded-xl border border-[#edd8d5] space-y-1.5">
                    <strong className="text-[#8e273e] block">3. Zero Inventory</strong>
                    <p className="text-[#543b3f]">Digital products have 95%+ profit margins with no shipping or product packaging costs. Pure passive revenue for your business.</p>
                  </div>
                </div>
                <div className="pt-2 flex gap-2">
                  <a
                    href="https://dashboard.stripe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#8e273e] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Open Stripe Dashboard</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  {onOpenCourses && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenCourses();
                      }}
                      className="px-4 py-2 bg-white border border-[#edd8d5] hover:bg-[#faf4f2] text-[#8e273e] rounded-lg text-xs font-bold"
                    >
                      View Live Courses & Academy
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BOUTIQUES */}
          {activeTab === 'boutique' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#8e273e]" />
                  <h4 className="font-serif font-bold text-lg text-[#221417]">
                    Princess AHB Boutiques (Hairs, African Clothes & Beauty Supplies)
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#705055] leading-relaxed">
                  Selling physical inventory like 100% Raw Virgin Human Hair Bulk Curls ($85), authentic African Ankara dresses ($75), and Batana oils ($24):
                </p>
                <div className="bg-[#fdfaf8] p-4 rounded-xl border border-[#edd8d5] space-y-2 text-xs">
                  <ul className="list-disc list-inside space-y-1 text-[#543b3f]">
                    <li><strong>Checkout:</strong> Integrated with Square Retail or Stripe.</li>
                    <li><strong>Shipping vs Salon Pickup:</strong> Baton Rouge clients can choose "Local Salon Pickup at 12135 Florida Blvd" at checkout to save on shipping.</li>
                    <li><strong>Payouts:</strong> Deposited directly into your checking account in 1-2 business days.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: BOOTH RENT */}
          {activeTab === 'booth' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#8e273e]" />
                  <h4 className="font-serif font-bold text-lg text-[#221417]">
                    Booth Rental Payout Automation ($175/Week or $35/Day)
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#705055] leading-relaxed">
                  Collecting booth rent from independent braiders at the Baton Rouge flagship:
                </p>
                <div className="bg-[#fdfaf8] p-4 rounded-xl border border-[#edd8d5] space-y-2 text-xs">
                  <div className="space-y-1">
                    <strong className="text-[#8e273e] block">Square Invoices Recurring Auto-Debit:</strong>
                    <p className="text-[#543b3f]">Create a recurring weekly invoice for $175 set to charge every Sunday night at 8:00 PM. Stylists save their debit card once, and rent is collected automatically every week without awkward conversations.</p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-[#8e273e] block">ACH Bank Draft Option:</strong>
                    <p className="text-[#543b3f]">Stylists can set up a weekly bank transfer or Zelle to avoid the 2.9% credit card processing fee.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#faf4f2] border-t border-[#edd8d5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#705055] text-center sm:text-left">
            <span>Questions regarding merchant setup? Email </span>
            <strong className="text-[#8e273e]">info@princessahb.com</strong>
            <span> or call </span>
            <strong className="text-[#8e273e]">(225) 288-2746</strong>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#8e273e] hover:bg-[#721e31] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
};
