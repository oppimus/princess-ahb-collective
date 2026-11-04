import React, { useState } from 'react';
import {
  X,
  Crown,
  Gift,
  Share2,
  Copy,
  Check,
  Sparkles,
  Award,
  Star,
  Users,
  CheckCircle2,
  TrendingUp,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { CRMClient, ReferralConversion } from '../types';

interface CustomerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  crmClients: CRMClient[];
  onUpdateClient: (updated: CRMClient) => void;
  onOpenBookingWithCredit?: (credit: number, promoText: string) => void;
}

export const CustomerProfileModal: React.FC<CustomerProfileModalProps> = ({
  isOpen,
  onClose,
  crmClients,
  onUpdateClient,
  onOpenBookingWithCredit,
}) => {
  const [selectedClientId, setSelectedClientId] = useState<string>(crmClients[0]?.id || 'client-1');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [showSimulateConversion, setShowSimulateConversion] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
  const [friendService, setFriendService] = useState('Bohemian Goddess Knotless Braids');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentClient = crmClients.find((c) => c.id === selectedClientId) || crmClients[0];

  const referralCode =
    currentClient.referralCode ||
    currentClient.referralStats?.referralCode ||
    `CROWN-${currentClient.name.split(' ')[0].toUpperCase()}-${currentClient.id.slice(-3)}`;

  const referralLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}?ref=${referralCode}`
      : `https://princessahb.com/book?ref=${referralCode}`;

  const referralStats = currentClient.referralStats || {
    referralCode,
    referralLink,
    totalShares: 4,
    clicks: 12,
    conversionsCount: 0,
    totalCreditsEarned: 0,
    conversions: [],
  };

  const shareText = `Hey Queen! 💕 I get my braids done at Princess AHB Salon (zero tension & follicular care). Use my VIP referral link to get $25 OFF your first appointment: ${referralLink}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setToastMessage('👑 Unique Referral Link copied to clipboard!');
    setTimeout(() => {
      setCopiedLink(false);
      setToastMessage(null);
    }, 3500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setToastMessage(`👑 Referral Code "${referralCode}" copied!`);
    setTimeout(() => {
      setCopiedCode(false);
      setToastMessage(null);
    }, 3500);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(shareText);
    setCopiedMsg(true);
    setToastMessage('👑 Ready-to-send invite message copied!');
    setTimeout(() => {
      setCopiedMsg(false);
      setToastMessage(null);
    }, 3500);
  };

  const handleSimulateConversion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName.trim()) return;

    const newConversion: ReferralConversion = {
      id: `ref-conv-${Date.now()}`,
      friendName: friendName.trim(),
      friendPhone: friendPhone.trim() || '(555) 234-5678',
      serviceName: friendService,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      rewardAmount: 25,
      loyaltyPointsAwarded: 150,
      creditedAt: new Date().toISOString().split('T')[0],
    };

    const updatedStats = {
      ...referralStats,
      conversionsCount: (referralStats.conversionsCount || 0) + 1,
      totalCreditsEarned: (referralStats.totalCreditsEarned || 0) + 25,
      conversions: [newConversion, ...(referralStats.conversions || [])],
    };

    const updatedClient: CRMClient = {
      ...currentClient,
      referralCode,
      referralStats: updatedStats,
      nextBookingCredit: (currentClient.nextBookingCredit || 0) + 25,
      loyaltyPoints: (currentClient.loyaltyPoints || 0) + 150,
    };

    onUpdateClient(updatedClient);
    setFriendName('');
    setFriendPhone('');
    setShowSimulateConversion(false);
    setToastMessage(`🎉 Congratulations! ${newConversion.friendName} booked! You earned +$25 Salon Credit & +150 VIP Points!`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Milestone Progress:
  // 1 referral = $25 credit (achieved at >= 1)
  // 3 referrals = Free Herbal Scalp Steam Detox ($45 value)
  // 5 referrals = Free Edge Refresh / Nape Touch-Up ($95 value)
  const conversions = referralStats.conversionsCount || 0;
  const nextMilestone =
    conversions < 1
      ? { target: 1, reward: '$25 Salon Credit + 150 Pts', needed: 1 - conversions }
      : conversions < 3
      ? { target: 3, reward: 'Free Herbal Scalp Steam & Detox ($45 value)', needed: 3 - conversions }
      : conversions < 5
      ? { target: 5, reward: 'Free Edge Refresh & Touch-Up ($95 value)', needed: 5 - conversions }
      : { target: 10, reward: 'Princess AHB VIP Black Card (10% Off All Year)', needed: 10 - conversions };

  const milestoneProgress = Math.min(100, Math.round((conversions / nextMilestone.target) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#ffffff] border border-[#edd8d5] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#221417]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#edd8d5] bg-gradient-to-r from-[#fdf2f4] via-[#faf4f2] to-[#fbf0ea]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8e273e] to-[#5a1424] text-white flex items-center justify-center shadow-md ring-2 ring-amber-400">
              <Crown className="w-6 h-6 text-[#fcd34d]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-[#8e273e]">
                  Customer Profile & VIP Club
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  Refer-a-Friend Circle
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#221417]">
                {currentClient.name}'s Royal Rewards
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#705055] hover:text-[#221417] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Client Switcher (Allows testing different customer profiles) */}
        <div className="px-5 py-2.5 bg-[#f5edea] border-b border-[#edd8d5] flex items-center justify-between text-xs flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#705055] font-semibold">Viewing Customer:</span>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="bg-white border border-[#edd8d5] rounded-lg px-2.5 py-1 text-xs font-bold text-[#221417] focus:outline-none focus:border-[#8e273e]"
            >
              {crmClients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.vipTier} · {c.referralStats?.conversionsCount || 0} Referrals)
                </option>
              ))}
            </select>
          </div>
          <div className="text-[11px] text-[#705055] flex items-center gap-2">
            <span>Verified Phone: <strong>{currentClient.phone}</strong></span>
            <span>·</span>
            <span>ID: <strong>{currentClient.id}</strong></span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* KPI Dashboard Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* 1. Next Booking Credit */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#8e273e]/10 to-[#8e273e]/5 border border-[#edd8d5] flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#705055] uppercase font-bold block">
                  Active Booking Credit
                </span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#8e273e] mt-1">
                  ${currentClient.nextBookingCredit || 25}
                </div>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold mt-2 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                Valid on any service
              </span>
            </div>

            {/* 2. VIP Loyalty Points */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-amber-900 uppercase font-bold block">
                  Loyalty Points
                </span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-900 mt-1 flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span>{currentClient.loyaltyPoints || 0}</span>
                </div>
              </div>
              <span className="text-[10px] text-amber-800 font-semibold mt-2">
                Tier: {currentClient.vipTier}
              </span>
            </div>

            {/* 3. Successful Conversions */}
            <div className="p-4 rounded-2xl bg-[#faf4f2] border border-[#edd8d5] flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#705055] uppercase font-bold block">
                  Referred Queens
                </span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#221417] mt-1 flex items-center gap-1">
                  <Users className="w-5 h-5 text-[#8e273e]" />
                  <span>{conversions}</span>
                </div>
              </div>
              <span className="text-[10px] text-[#705055] mt-2">
                {referralStats.clicks} Link Clicks
              </span>
            </div>

            {/* 4. Total Referral Rewards Earned */}
            <div className="p-4 rounded-2xl bg-[#faf4f2] border border-[#edd8d5] flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#705055] uppercase font-bold block">
                  Total Referral Earned
                </span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800 mt-1">
                  ${referralStats.totalCreditsEarned || conversions * 25}
                </div>
              </div>
              <span className="text-[10px] text-[#705055] mt-2">
                $25 credit per friend
              </span>
            </div>
          </div>

          {/* MAIN REFERRAL HERO CARD: "Give $25, Get $25" */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#8e273e] via-[#781e32] to-[#591323] text-white shadow-xl relative overflow-hidden space-y-5">
            {/* Ambient crown watermark */}
            <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
              <Crown className="w-48 h-48 text-[#fcd34d]" />
            </div>

            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#fcd34d] border border-white/20">
                <Gift className="w-3.5 h-3.5 text-[#fcd34d]" />
                <span>Give $25, Get $25 · Queen Referral Circle</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
                Share Your Unique Referral Link
              </h4>
              <p className="text-xs sm:text-sm text-white/85 max-w-xl leading-relaxed">
                When your sister, friend, or coworker books their first appointment using your unique link, they get <strong>$25 OFF</strong> and you automatically receive <strong>$25 in salon booking credit + 150 VIP points</strong>!
              </p>
            </div>

            {/* Referral Link & Code Input Box */}
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/25 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/70 block mb-1">
                    Your Personalized Referral Link:
                  </span>
                  <div className="text-xs sm:text-sm font-mono font-bold text-[#fcd34d] truncate bg-black/30 px-3 py-2 rounded-xl border border-white/15">
                    {referralLink}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#fcd34d] hover:bg-[#ffe066] text-[#221417] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-4 h-4 text-[#221417]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#221417]" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/20 hover:bg-white/30 text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/30"
                    title="Copy Referral Code Only"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-[#fcd34d]" /> : <Award className="w-4 h-4" />}
                    <span>{referralCode}</span>
                  </button>
                </div>
              </div>

              {/* Multi-channel Share Buttons */}
              <div className="pt-2 border-t border-white/15 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-white/80 mr-1">Instant Share:</span>

                {/* SMS Link */}
                <a
                  href={`sms:?&body=${encodeURIComponent(shareText)}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/20 hover:bg-white/30 text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#fcd34d]" />
                  <span>Text to Friends</span>
                </a>

                {/* WhatsApp Link */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/80 hover:bg-emerald-600 text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                {/* Copy Ready-to-send Message */}
                <button
                  onClick={handleCopyMessage}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/15 hover:bg-white/25 text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedMsg ? <Check className="w-3.5 h-3.5 text-[#fcd34d]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Ready Invite</span>
                </button>
              </div>
            </div>

            {/* Value comparison pill */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-black/20 border border-white/15 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#fcd34d]/20 text-[#fcd34d] flex items-center justify-center font-bold shrink-0">
                  🎁
                </div>
                <div>
                  <span className="font-bold text-[#fcd34d] block">Your Friend Gets:</span>
                  <span className="text-white/80 text-[11px]">$25 Off their 1st protective style</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/20 border border-white/15 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold shrink-0">
                  👑
                </div>
                <div>
                  <span className="font-bold text-emerald-300 block">You Receive:</span>
                  <span className="text-white/80 text-[11px]">$25 Salon Credit + 150 VIP Points</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gamified Milestone Rewards Ladder */}
          <div className="p-5 rounded-2xl bg-[#faf4f2] border border-[#edd8d5] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-sm text-[#221417]">
                  Referral Milestone Rewards Tracker
                </h4>
              </div>
              <span className="text-xs font-bold text-[#8e273e] bg-[#fdf2f4] px-2.5 py-1 rounded-full border border-[#decab1]">
                {conversions} Total Successful Conversions
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#705055]">
                <span>Progress to Next Milestone ({nextMilestone.reward})</span>
                <span className="font-bold text-[#8e273e]">
                  {nextMilestone.needed === 0 ? 'Max Milestone Unlocked!' : `${nextMilestone.needed} more friend${nextMilestone.needed > 1 ? 's' : ''} needed`}
                </span>
              </div>
              <div className="w-full bg-[#ebd8c1] h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 via-amber-500 to-[#8e273e] h-full rounded-full transition-all duration-500"
                  style={{ width: `${milestoneProgress}%` }}
                />
              </div>
            </div>

            {/* Milestones Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div
                className={`p-3 rounded-xl border text-xs flex flex-col justify-between ${
                  conversions >= 1
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-white border-[#edd8d5] text-[#705055]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs uppercase">1st Queen</span>
                    {conversions >= 1 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <span className="text-[10px] text-stone-400">Locked</span>
                    )}
                  </div>
                  <p className="font-semibold text-xs text-[#221417]">
                    $25 Salon Credit + 150 Pts
                  </p>
                </div>
                <span className="text-[10px] mt-2 block text-stone-500">
                  {conversions >= 1 ? '✓ Unlocked & Credited' : 'Refer 1 friend'}
                </span>
              </div>

              <div
                className={`p-3 rounded-xl border text-xs flex flex-col justify-between ${
                  conversions >= 3
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-white border-[#edd8d5] text-[#705055]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs uppercase">3 Queens</span>
                    {conversions >= 3 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <span className="text-[10px] text-stone-400">Locked</span>
                    )}
                  </div>
                  <p className="font-semibold text-xs text-[#221417]">
                    Free Herbal Scalp Steam Detox ($45 value)
                  </p>
                </div>
                <span className="text-[10px] mt-2 block text-stone-500">
                  {conversions >= 3 ? '✓ Unlocked' : `${Math.max(0, 3 - conversions)} more referrals needed`}
                </span>
              </div>

              <div
                className={`p-3 rounded-xl border text-xs flex flex-col justify-between ${
                  conversions >= 5
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-white border-[#edd8d5] text-[#705055]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs uppercase">5 Queens</span>
                    {conversions >= 5 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <span className="text-[10px] text-stone-400">Locked</span>
                    )}
                  </div>
                  <p className="font-semibold text-xs text-[#221417]">
                    Free Edge Refresh & Touch-Up ($95 value)
                  </p>
                </div>
                <span className="text-[10px] mt-2 block text-stone-500">
                  {conversions >= 5 ? '✓ Unlocked' : `${Math.max(0, 5 - conversions)} more referrals needed`}
                </span>
              </div>
            </div>
          </div>

          {/* Successful Conversions Tracking Log */}
          <div className="p-5 rounded-2xl bg-white border border-[#edd8d5] space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#edd8d5]">
              <div>
                <h4 className="font-bold text-sm text-[#221417] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#8e273e]" />
                  <span>Successful Referral Conversions History</span>
                </h4>
                <p className="text-[11px] text-[#705055]">
                  Tracked and reconciled automatically when friends book using your code.
                </p>
              </div>

              {/* Action to simulate/test a referral booking */}
              <button
                type="button"
                onClick={() => setShowSimulateConversion(!showSimulateConversion)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#8e273e] bg-[#fdf2f4] hover:bg-[#faebea] border border-[#f0c5cd] transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showSimulateConversion ? 'Close Simulator' : 'Test Referral Conversion'}</span>
              </button>
            </div>

            {/* Test Simulation Form */}
            {showSimulateConversion && (
              <form
                onSubmit={handleSimulateConversion}
                className="p-4 rounded-xl bg-[#faf4f2] border border-[#edd8d5] space-y-3 animate-in fade-in slide-in-from-top-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8e273e]">
                    Simulate a Friend's Successful Booking:
                  </span>
                  <span className="text-[10px] text-stone-500">Instant CRM Verification</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#705055] mb-1">
                      Friend's Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jazmine Washington"
                      value={friendName}
                      onChange={(e) => setFriendName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#edd8d5] rounded-lg text-[#221417] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#705055] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="(504) 555-0199"
                      value={friendPhone}
                      onChange={(e) => setFriendPhone(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#edd8d5] rounded-lg text-[#221417] focus:outline-none focus:border-[#8e273e]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#705055] mb-1">
                      Service Booked
                    </label>
                    <select
                      value={friendService}
                      onChange={(e) => setFriendService(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#edd8d5] rounded-lg text-[#221417] focus:outline-none focus:border-[#8e273e]"
                    >
                      <option value="Bohemian Goddess Knotless Braids">Bohemian Goddess Knotless Braids</option>
                      <option value="French Curl Braids">French Curl Braids</option>
                      <option value="Classic Smedium Knotless Braids">Classic Smedium Knotless Braids</option>
                      <option value="Senegalese Rope Twists">Senegalese Rope Twists</option>
                      <option value="Tribal Stitch Cornrows">Tribal Stitch Cornrows</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowSimulateConversion(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#705055] hover:bg-stone-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#8e273e] hover:bg-[#a02f48] transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#fcd34d]" />
                    <span>Confirm Friend Conversion & Credit $25</span>
                  </button>
                </div>
              </form>
            )}

            {/* List of Converted Friends */}
            {referralStats.conversions && referralStats.conversions.length > 0 ? (
              <div className="divide-y divide-[#edd8d5]">
                {referralStats.conversions.map((conv) => (
                  <div key={conv.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#fdf2f4] text-[#8e273e] font-bold text-xs flex items-center justify-center border border-[#decab1] shrink-0">
                        {conv.friendName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#221417]">{conv.friendName}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {conv.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#705055] mt-0.5">
                          Booked: <strong>{conv.serviceName}</strong> · Date: {conv.bookingDate}
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        +${conv.rewardAmount} Credit & +{conv.loyaltyPointsAwarded} Pts Awarded
                      </span>
                      <span className="block text-[10px] text-stone-400 mt-0.5">
                        Credited on {conv.creditedAt}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-stone-50 border border-dashed border-stone-300 text-center space-y-2">
                <Users className="w-8 h-8 text-stone-400 mx-auto" />
                <h5 className="font-bold text-xs text-stone-700 uppercase">
                  No Referral Conversions Yet
                </h5>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Copy your link above and text it to a friend! As soon as they book, they get $25 off and your $25 credit will show up right here.
                </p>
                <button
                  onClick={handleCopyLink}
                  className="mt-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#8e273e] text-white hover:bg-[#a02f48] cursor-pointer inline-flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Your Referral Link</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#edd8d5] bg-[#faf4f2] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#705055] text-center sm:text-left">
            Have <strong>${currentClient.nextBookingCredit || 25}</strong> ready to apply toward your next royal protective style?
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold text-[#705055] hover:bg-stone-200 transition-colors"
            >
              Close
            </button>
            {onOpenBookingWithCredit && (
              <button
                onClick={() => {
                  onClose();
                  onOpenBookingWithCredit(
                    currentClient.nextBookingCredit || 25,
                    `Client Referral Credit: $${currentClient.nextBookingCredit || 25} Off`
                  );
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#8e273e] hover:bg-[#a02f48] transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#fcd34d]" />
                <span>Book Chair With My ${currentClient.nextBookingCredit || 25} Credit</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
