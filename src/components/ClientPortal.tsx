import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Gift,
  Crown,
  Star,
  Sparkles,
  Share2,
  Copy,
  Check,
  FileText,
  RefreshCw,
  XCircle,
  Plus,
  MessageSquare,
  Phone,
  ShieldCheck,
  DollarSign,
  MapPin,
  TrendingUp,
  ChevronRight,
  Download,
  Search,
  ExternalLink,
  Award,
  Heart,
  Scissors,
  CheckCircle,
} from 'lucide-react';
import {
  CRMClient,
  ClientAppointment,
  LoyaltyRewardOption,
  BraidingService,
  BraiderProfile,
} from '../types';
import { CONTACT_INFO, OFFICIAL_BOOKING_URL, INITIAL_LOYALTY_REWARDS } from '../data/mockData';

interface ClientPortalProps {
  crmClients: CRMClient[];
  appointments: ClientAppointment[];
  onUpdateClient: (updated: CRMClient) => void;
  onUpdateAppointments: (updated: ClientAppointment[]) => void;
  onOpenBooking: (
    service?: BraidingService,
    lengthIdx?: number,
    sizeIdx?: number,
    braiderId?: string,
    date?: string,
    timeSlot?: string,
    discountPromo?: number,
    promoBadge?: string
  ) => void;
  services: BraidingService[];
  braiders: BraiderProfile[];
  onOpenLeadMagnet?: () => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  crmClients,
  appointments,
  onUpdateClient,
  onUpdateAppointments,
  onOpenBooking,
  services,
  braiders,
  onOpenLeadMagnet,
}) => {
  // Current logged-in client selection
  const [selectedClientId, setSelectedClientId] = useState<string>(crmClients[0]?.id || 'client-1');
  const [activePortalTab, setActivePortalTab] = useState<'upcoming' | 'history' | 'points' | 'takedown' | 'referrals'>('upcoming');

  // Client lookup by phone / email state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [showLookupModal, setShowLookupModal] = useState(false);

  // Interaction feedback toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Reschedule Modal State
  const [reschedulingAppt, setReschedulingAppt] = useState<ClientAppointment | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTimeSlot, setRescheduleTimeSlot] = useState('10:00 AM');

  // Cancel Modal State
  const [cancellingAppt, setCancellingAppt] = useState<ClientAppointment | null>(null);

  // Add-ons Modal State
  const [editingAddonsAppt, setEditingAddonsAppt] = useState<ClientAppointment | null>(null);
  const [selectedNewAddon, setSelectedNewAddon] = useState('');

  // Special Request / Note to Stylist State
  const [editingNotesAppt, setEditingNotesAppt] = useState<ClientAppointment | null>(null);
  const [stylistNoteText, setStylistNoteText] = useState('');

  // Review Modal State
  const [reviewingAppt, setReviewingAppt] = useState<ClientAppointment | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState('');

  // Receipt Modal State
  const [viewingReceiptAppt, setViewingReceiptAppt] = useState<ClientAppointment | null>(null);

  // Reward Redemption State
  const [redeemedVoucher, setRedeemedVoucher] = useState<{ code: string; title: string; discount: number } | null>(null);

  // Referral copy state
  const [copiedRef, setCopiedRef] = useState(false);

  const currentClient = crmClients.find((c) => c.id === selectedClientId) || crmClients[0];

  // Appointments for this specific client
  const clientAppointments = appointments.filter(
    (a) => a.clientId === currentClient.id || a.clientPhone === currentClient.phone
  );

  const upcomingAppointments = clientAppointments.filter(
    (a) => a.status === 'Upcoming' || a.status === 'Rescheduled'
  );

  const pastAppointments = clientAppointments.filter(
    (a) => a.status === 'Completed' || a.status === 'Cancelled'
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Quick lookup handler by phone or email
  const handleClientLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);
    const clean = lookupQuery.trim().toLowerCase();
    if (!clean) return;

    const found = crmClients.find(
      (c) =>
        c.phone.replace(/\D/g, '').includes(clean.replace(/\D/g, '')) ||
        c.email.toLowerCase().includes(clean) ||
        c.name.toLowerCase().includes(clean)
    );

    if (found) {
      setSelectedClientId(found.id);
      setShowLookupModal(false);
      setLookupQuery('');
      showToast(`👑 Welcome back, ${found.name}! Your account has been loaded.`);
    } else {
      setLookupError('No matching client record found. Check phone or email, or switch using the dropdown.');
    }
  };

  // Reschedule Appointment Action
  const handleConfirmReschedule = () => {
    if (!reschedulingAppt || !rescheduleDate) return;

    const updated = appointments.map((a) => {
      if (a.id === reschedulingAppt.id) {
        return {
          ...a,
          date: rescheduleDate,
          timeSlot: rescheduleTimeSlot,
          status: 'Rescheduled' as const,
        };
      }
      return a;
    });

    onUpdateAppointments(updated);
    setReschedulingAppt(null);
    showToast(`✨ Appointment rescheduled to ${rescheduleDate} at ${rescheduleTimeSlot}!`);
  };

  // Cancel Appointment Action (converts deposit to store credit)
  const handleConfirmCancellation = () => {
    if (!cancellingAppt) return;

    const updated = appointments.map((a) => {
      if (a.id === cancellingAppt.id) {
        return {
          ...a,
          status: 'Cancelled' as const,
        };
      }
      return a;
    });

    // Credit $50 deposit to nextBookingCredit
    const updatedClient: CRMClient = {
      ...currentClient,
      nextBookingCredit: (currentClient.nextBookingCredit || 0) + (cancellingAppt.depositPaid || 50),
    };
    onUpdateClient(updatedClient);
    onUpdateAppointments(updated);
    setCancellingAppt(null);
    showToast(`Appointment cancelled. Your $${cancellingAppt.depositPaid || 50} deposit is preserved as store credit.`);
  };

  // Add Service Add-On Action
  const handleAddServiceAddon = () => {
    if (!editingAddonsAppt || !selectedNewAddon) return;

    const addonPriceMap: Record<string, number> = {
      'Peppermint Botanical Scalp Detox (+$35)': 35,
      'Batana Oil Follicle & Edge Therapy (+$20)': 20,
      'Human Hair French Curls (+$45)': 45,
      'Zero-Breakage Takedown Prep (+$25)': 25,
      'Hot Towel Lavender Scalp Compress (+$15)': 15,
    };

    const addCost = addonPriceMap[selectedNewAddon] || 25;
    const currentAddons = editingAddonsAppt.addOns || [];

    const updated = appointments.map((a) => {
      if (a.id === editingAddonsAppt.id) {
        return {
          ...a,
          addOns: [...currentAddons, selectedNewAddon],
          totalAmount: a.totalAmount + addCost,
          remainingBalance: a.remainingBalance + addCost,
        };
      }
      return a;
    });

    onUpdateAppointments(updated);
    setEditingAddonsAppt(null);
    setSelectedNewAddon('');
    showToast(`✓ Added ${selectedNewAddon} to your upcoming appointment!`);
  };

  // Save Special Stylist Note
  const handleSaveStylistNote = () => {
    if (!editingNotesAppt) return;

    const updated = appointments.map((a) => {
      if (a.id === editingNotesAppt.id) {
        return {
          ...a,
          specialRequests: stylistNoteText,
        };
      }
      return a;
    });

    onUpdateAppointments(updated);
    setEditingNotesAppt(null);
    showToast('✓ Special instructions sent to your master braider!');
  };

  // Submit Review & Earn +50 Loyalty Points
  const handleSubmitReview = () => {
    if (!reviewingAppt) return;

    const updatedAppts = appointments.map((a) => {
      if (a.id === reviewingAppt.id) {
        return {
          ...a,
          reviewSubmitted: true,
          reviewRating,
          reviewText,
        };
      }
      return a;
    });

    // Award +50 points to client
    const updatedClient: CRMClient = {
      ...currentClient,
      loyaltyPoints: (currentClient.loyaltyPoints || 0) + 50,
    };

    onUpdateClient(updatedClient);
    onUpdateAppointments(updatedAppts);
    setReviewingAppt(null);
    setReviewText('');
    showToast('👑 Thank you for your review! +50 Loyalty Points added to your balance.');
  };

  // Redeem Loyalty Points for Reward Voucher
  const handleRedeemReward = (reward: LoyaltyRewardOption) => {
    if ((currentClient.loyaltyPoints || 0) < reward.pointsCost) {
      showToast(`You need ${reward.pointsCost - (currentClient.loyaltyPoints || 0)} more points for this reward.`);
      return;
    }

    const newPoints = currentClient.loyaltyPoints - reward.pointsCost;
    const voucherCode = `CROWN-REWARD-${Math.floor(1000 + Math.random() * 9000)}`;

    const updatedClient: CRMClient = {
      ...currentClient,
      loyaltyPoints: newPoints,
      nextBookingCredit: (currentClient.nextBookingCredit || 0) + reward.discountValue,
    };

    onUpdateClient(updatedClient);
    setRedeemedVoucher({
      code: voucherCode,
      title: reward.title,
      discount: reward.discountValue,
    });
    showToast(`🎉 Redeemed! $${reward.discountValue} salon credit applied to your profile.`);
  };

  // 1-Click Re-book Past Look
  const handleRebookPastLook = (appt: ClientAppointment) => {
    const matchedService = services.find((s) => s.id === appt.serviceId || s.name.includes(appt.serviceName.split(' ')[0])) || services[0];
    onOpenBooking(matchedService, 0, 0, appt.stylistId, '', '', currentClient.nextBookingCredit || 0, `Returning Client: $${currentClient.nextBookingCredit || 0} Credit Applied`);
  };

  // Calculate tier progression
  const tierProgress = {
    Bronze: { current: 'Bronze', next: 'Silver', threshold: 300, min: 0 },
    Silver: { current: 'Silver', next: 'Gold VIP', threshold: 600, min: 300 },
    'Gold VIP': { current: 'Gold VIP', next: 'Diamond Crown', threshold: 1000, min: 600 },
    'Diamond Crown': { current: 'Diamond Crown', next: 'Diamond Crown Elite', threshold: 1500, min: 1000 },
  }[currentClient.vipTier || 'Bronze'];

  const pointsTowardsNext = Math.min(
    100,
    Math.max(
      15,
      Math.round(
        ((currentClient.loyaltyPoints - tierProgress.min) / (tierProgress.threshold - tierProgress.min)) * 100
      )
    )
  );

  const referralCode =
    currentClient.referralCode ||
    currentClient.referralStats?.referralCode ||
    `CROWN-${currentClient.name.split(' ')[0].toUpperCase()}-${currentClient.id.slice(-3)}`;

  const referralLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}?ref=${referralCode}`
      : `https://princessahb.com/book?ref=${referralCode}`;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedRef(true);
    showToast('👑 Unique referral link copied! Share with friends to give $25 & earn $25.');
    setTimeout(() => setCopiedRef(false), 3000);
  };

  // Google Calendar Link generator
  const getGoogleCalendarUrl = (appt: ClientAppointment) => {
    const title = encodeURIComponent(`Princess AHB: ${appt.serviceName}`);
    const details = encodeURIComponent(
      `Appointment with ${appt.stylistName} at Princess African Hair Braiding.\nLocation: ${appt.location}\nRemaining Balance: $${appt.remainingBalance}\nNotes: ${appt.specialRequests || 'Zero-tension protective styling'}`
    );
    const loc = encodeURIComponent(appt.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${loc}`;
  };

  // Download .ics file
  const handleDownloadICS = (appt: ClientAppointment) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Princess AHB//Client Portal//EN
BEGIN:VEVENT
SUMMARY:Princess AHB: ${appt.serviceName}
DESCRIPTION:Stylist: ${appt.stylistName} | Balance: $${appt.remainingBalance}
LOCATION:${appt.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `PrincessAHB-${appt.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📅 Calendar event (.ics) downloaded!');
  };

  return (
    <div className="min-h-screen bg-[#fcf6f2] text-[#221417] pb-24">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-md bg-[#221417] text-white p-4 rounded-2xl shadow-2xl border border-[#fcd34d]/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-5 h-5 text-[#fcd34d] shrink-0" />
          <p className="text-xs sm:text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Hero Welcome Bar */}
      <section className="bg-gradient-to-r from-[#781e32] via-[#8e273e] to-[#591323] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-[#a8334a] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#fcd34d] text-xs font-semibold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 fill-current" />
                <span>Princess AHB VIP Client Portal</span>
                <span className="text-white/40">•</span>
                <span>Returning Customer Hub</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
                Welcome Back, <span className="text-[#fcd34d]">{currentClient.name}</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#fce7ea] max-w-2xl leading-relaxed">
                Manage your upcoming appointments, track accumulated loyalty rewards, review past crowns, and enjoy exclusive VIP perks tailored to your scalp care.
              </p>
            </div>

            {/* Client Profile Switcher & Fast Phone/Email Lookup */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-black/30 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#fcd34d] uppercase tracking-wider block">
                  Select Customer Account:
                </label>
                <select
                  value={selectedClientId}
                  onChange={(e) => {
                    setSelectedClientId(e.target.value);
                    showToast(`Switched account to ${crmClients.find((c) => c.id === e.target.value)?.name}`);
                  }}
                  className="bg-white text-[#221417] text-xs font-bold py-2 px-3 rounded-lg border-2 border-[#fcd34d] cursor-pointer focus:outline-none shadow-xs"
                >
                  {crmClients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} ({client.vipTier} · {client.loyaltyPoints} pts)
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowLookupModal(true)}
                className="px-3.5 py-2 text-xs font-semibold bg-white/15 hover:bg-white/25 text-white rounded-lg border border-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 self-end sm:self-auto"
                title="Lookup customer by phone or email"
              >
                <Search className="w-3.5 h-3.5 text-[#fcd34d]" />
                <span>Lookup Phone/Email</span>
              </button>
            </div>
          </div>

          {/* Key Stat Cards Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-2">
            {/* 1. Loyalty Points */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="flex items-center justify-between text-xs text-[#fce7ea]">
                <span>Loyalty Points</span>
                <Sparkles className="w-4 h-4 text-[#fcd34d]" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-[#fcd34d]">
                {currentClient.loyaltyPoints} <span className="text-xs font-sans font-normal text-white/80">pts</span>
              </div>
              <p className="text-[11px] text-[#fce7ea]/80">
                Worth ${(currentClient.loyaltyPoints / 10).toFixed(2)} in salon rewards
              </p>
            </div>

            {/* 2. VIP Tier */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="flex items-center justify-between text-xs text-[#fce7ea]">
                <span>Membership Tier</span>
                <Award className="w-4 h-4 text-[#fcd34d]" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-white">
                {currentClient.vipTier}
              </div>
              <p className="text-[11px] text-[#fce7ea]/80">
                {tierProgress.next !== tierProgress.current
                  ? `${tierProgress.threshold - currentClient.loyaltyPoints} pts to ${tierProgress.next}`
                  : 'Highest Royal Tier Achieved'}
              </p>
            </div>

            {/* 3. Upcoming Appointments */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="flex items-center justify-between text-xs text-[#fce7ea]">
                <span>Active Bookings</span>
                <Calendar className="w-4 h-4 text-[#fcd34d]" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-white">
                {upcomingAppointments.length} <span className="text-xs font-sans font-normal text-white/80">scheduled</span>
              </div>
              <p className="text-[11px] text-[#fce7ea]/80">
                {upcomingAppointments[0] ? `Next: ${upcomingAppointments[0].date}` : 'No active sessions'}
              </p>
            </div>

            {/* 4. Next-Booking Credit */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="flex items-center justify-between text-xs text-[#fce7ea]">
                <span>Available Credits</span>
                <Gift className="w-4 h-4 text-[#fcd34d]" />
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-[#fcd34d]">
                ${currentClient.nextBookingCredit || 25}.00
              </div>
              <p className="text-[11px] text-[#fce7ea]/80">
                Applies automatically at checkout
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Navigation Tabs Bar within Client Portal */}
        <div className="flex items-center gap-2 border-b border-[#edd8d5] pb-2 overflow-x-auto">
          <button
            onClick={() => setActivePortalTab('upcoming')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activePortalTab === 'upcoming'
                ? 'bg-[#8e273e] text-white font-bold shadow-md shadow-[#8e273e]/20'
                : 'bg-white text-[#543b3f] hover:text-[#221417] hover:bg-[#faebea] border border-[#edd8d5]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Upcoming Appointments ({upcomingAppointments.length})</span>
          </button>

          <button
            onClick={() => setActivePortalTab('history')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activePortalTab === 'history'
                ? 'bg-[#8e273e] text-white font-bold shadow-md shadow-[#8e273e]/20'
                : 'bg-white text-[#543b3f] hover:text-[#221417] hover:bg-[#faebea] border border-[#edd8d5]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Appointment History ({pastAppointments.length})</span>
          </button>

          <button
            onClick={() => setActivePortalTab('points')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activePortalTab === 'points'
                ? 'bg-[#8e273e] text-white font-bold shadow-md shadow-[#8e273e]/20'
                : 'bg-white text-[#543b3f] hover:text-[#221417] hover:bg-[#faebea] border border-[#edd8d5]'
            }`}
          >
            <Gift className="w-4 h-4 text-amber-500" />
            <span>Loyalty Points & Rewards ({currentClient.loyaltyPoints} pts)</span>
          </button>

          <button
            onClick={() => setActivePortalTab('takedown')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activePortalTab === 'takedown'
                ? 'bg-[#8e273e] text-white font-bold shadow-md shadow-[#8e273e]/20'
                : 'bg-white text-[#543b3f] hover:text-[#221417] hover:bg-[#faebea] border border-[#edd8d5]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Follicle Care & Takedown Tracker</span>
            {currentClient.status === 'Takedown Due' && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActivePortalTab('referrals')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activePortalTab === 'referrals'
                ? 'bg-[#8e273e] text-white font-bold shadow-md shadow-[#8e273e]/20'
                : 'bg-white text-[#543b3f] hover:text-[#221417] hover:bg-[#faebea] border border-[#edd8d5]'
            }`}
          >
            <Share2 className="w-4 h-4 text-emerald-600" />
            <span>Refer a Queen ($25 Bonus)</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: UPCOMING APPOINTMENTS */}
        {/* ========================================================================= */}
        {activePortalTab === 'upcoming' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#221417]">
                  Your Upcoming Braiding Appointments
                </h3>
                <p className="text-xs sm:text-sm text-[#705055]">
                  Manage session dates, add scalp care extras, send requests to your master braider, or reschedule anytime.
                </p>
              </div>

              <button
                onClick={() => onOpenBooking()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#8e273e]/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4 text-[#fcd34d]" />
                <span>Book Another Chair</span>
              </button>
            </div>

            {upcomingAppointments.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border-2 border-dashed border-[#edd8d5] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#faebea] text-[#8e273e] flex items-center justify-center mx-auto">
                  <Calendar className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-xl text-[#221417]">No Upcoming Appointments Scheduled</h4>
                  <p className="text-xs sm:text-sm text-[#705055] max-w-md mx-auto">
                    You currently have no pending chair reservations. Book your next zero-tension crown today with your available ${(currentClient.nextBookingCredit || 25)} loyalty credit!
                  </p>
                </div>
                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-3 rounded-xl bg-[#8e273e] text-white text-xs font-serif font-bold uppercase tracking-wider hover:bg-[#781e32] transition-colors"
                >
                  Book My Next Crown Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {upcomingAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="bg-white rounded-3xl border-2 border-[#edd8d5] shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* Header Strip with Date & Status */}
                    <div className="bg-[#faf4f2] px-6 py-4 border-b border-[#edd8d5] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#8e273e] text-white shadow-xs">
                          {appt.status}
                        </span>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#221417]">
                          <Calendar className="w-4 h-4 text-[#8e273e]" />
                          <span>{appt.date}</span>
                          <span className="text-[#8e273e]">•</span>
                          <Clock className="w-4 h-4 text-[#8e273e]" />
                          <span>{appt.timeSlot}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#705055]">
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          ✓ Deposit Paid: ${appt.depositPaid}.00
                        </span>
                        <span className="text-[#8e273e] font-bold">
                          Balance Due: ${appt.remainingBalance}.00
                        </span>
                      </div>
                    </div>

                    {/* Body Details */}
                    <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left: Style & Specs */}
                      <div className="lg:col-span-7 space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-[#8e273e] tracking-wider block">
                            Reserved Protective Style
                          </span>
                          <h4 className="font-serif font-bold text-2xl text-[#221417]">
                            {appt.serviceName}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#543b3f]">
                            <span className="px-2.5 py-1 rounded-lg bg-[#faebea] text-[#8e273e] font-semibold">
                              📏 {appt.lengthOption}
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-[#faebea] text-[#8e273e] font-semibold">
                              ✨ {appt.sizeOption}
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                              ✓ Premium Hair Included
                            </span>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-2.5 text-xs text-[#543b3f] bg-[#faf4f2] p-3 rounded-xl border border-[#edd8d5]">
                          <MapPin className="w-4 h-4 text-[#8e273e] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#221417] block">Studio Location:</span>
                            <span>{appt.location}</span>
                          </div>
                        </div>

                        {/* Special Requests or Addons */}
                        {(appt.addOns?.length || appt.specialRequests) && (
                          <div className="space-y-2 pt-1">
                            <span className="text-[11px] font-bold text-[#705055] uppercase tracking-wider block">
                              Active Add-Ons & Stylist Instructions:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {appt.addOns?.map((addon, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 rounded-lg bg-[#faebea] text-[#8e273e] text-xs font-semibold border border-[#f0c5cd]"
                                >
                                  + {addon}
                                </span>
                              ))}
                            </div>
                            {appt.specialRequests && (
                              <p className="text-xs text-[#543b3f] italic bg-white p-2 rounded-lg border border-[#edd8d5]">
                                "{appt.specialRequests}"
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right: Stylist Card & Financial Summary */}
                      <div className="lg:col-span-5 bg-[#faf4f2] p-5 rounded-2xl border border-[#edd8d5] space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="text-[10px] uppercase font-bold text-[#705055] tracking-wider block">
                            Assigned Master Braider
                          </span>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#8e273e] shadow-xs shrink-0">
                              <img
                                src={
                                  appt.stylistAvatar ||
                                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
                                }
                                alt={appt.stylistName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-serif font-bold text-base text-[#221417]">
                                {appt.stylistName}
                              </div>
                              <div className="text-xs text-[#8e273e] font-semibold">
                                Certified Zero-Tension Master
                              </div>
                              <div className="flex items-center gap-1 text-[11px] text-[#705055]">
                                <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                                <span>5.0 (400+ Verified Crowns)</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="border-t border-[#edd8d5] pt-3 space-y-1.5 text-xs">
                          <div className="flex justify-between text-[#705055]">
                            <span>Service Total:</span>
                            <span className="font-bold text-[#221417]">${appt.totalAmount}.00</span>
                          </div>
                          <div className="flex justify-between text-emerald-800">
                            <span>Online Deposit Secured:</span>
                            <span className="font-bold">-${appt.depositPaid}.00</span>
                          </div>
                          <div className="flex justify-between text-sm font-bold text-[#8e273e] pt-1 border-t border-[#edd8d5]">
                            <span>Balance Due at Appointment:</span>
                            <span>${appt.remainingBalance}.00</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Toolbar for Upcoming Appointment */}
                    <div className="bg-[#faf4f2] px-6 py-3.5 border-t border-[#edd8d5] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Reschedule Button */}
                        <button
                          onClick={() => {
                            setReschedulingAppt(appt);
                            setRescheduleDate(appt.date);
                            setRescheduleTimeSlot(appt.timeSlot);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#faebea] text-[#8e273e] border border-[#edd8d5] hover:border-[#8e273e] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-[#8e273e]" />
                          <span>Reschedule</span>
                        </button>

                        {/* Add-on Extras Button */}
                        <button
                          onClick={() => setEditingAddonsAppt(appt)}
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#faebea] text-[#221417] border border-[#edd8d5] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#8e273e]" />
                          <span>Add Scalp Care Extra</span>
                        </button>

                        {/* Note to Stylist */}
                        <button
                          onClick={() => {
                            setEditingNotesAppt(appt);
                            setStylistNoteText(appt.specialRequests || '');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#faebea] text-[#221417] border border-[#edd8d5] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#8e273e]" />
                          <span>Note to Stylist</span>
                        </button>

                        {/* Add to Calendar */}
                        <a
                          href={getGoogleCalendarUrl(appt)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#faebea] text-[#221417] border border-[#edd8d5] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                        >
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          <span>Google Cal</span>
                        </a>

                        <button
                          onClick={() => handleDownloadICS(appt)}
                          className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#faebea] text-[#705055] border border-[#edd8d5] text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                          title="Download iCal file"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>.ICS</span>
                        </button>
                      </div>

                      {/* Cancel Appointment Button */}
                      <button
                        onClick={() => setCancellingAppt(appt)}
                        className="px-3 py-1.5 rounded-lg text-rose-700 hover:bg-rose-50 border border-rose-200 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel Booking</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: APPOINTMENT HISTORY & PAST CROWNS */}
        {/* ========================================================================= */}
        {activePortalTab === 'history' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#221417]">
                  Your Crown Heritage & Past Appointments
                </h3>
                <p className="text-xs sm:text-sm text-[#705055]">
                  Review your protective styling timeline, re-book favorite looks in 1 click, leave verified reviews (+50 pts bonus), and view receipts.
                </p>
              </div>

              <div className="text-xs text-[#8e273e] font-bold bg-[#faebea] px-3.5 py-2 rounded-xl border border-[#f0c5cd]">
                Total Crowns Styled: {pastAppointments.length}
              </div>
            </div>

            {pastAppointments.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border-2 border-dashed border-[#edd8d5] space-y-3">
                <Clock className="w-10 h-10 text-[#8e273e] mx-auto" />
                <h4 className="font-serif font-bold text-lg text-[#221417]">No Past Appointments Yet</h4>
                <p className="text-xs text-[#705055]">Once your first appointment is completed, full history, receipts, and re-booking options appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="bg-white rounded-3xl border border-[#edd8d5] shadow-xs hover:shadow-md transition-all p-6 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          appt.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          {appt.status}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-[#705055] font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-[#8e273e]" />
                          <span>{appt.date}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-lg text-[#221417]">
                          {appt.serviceName}
                        </h4>
                        <p className="text-xs text-[#705055]">
                          Stylist: <strong>{appt.stylistName}</strong> · {appt.location.split('(')[0]}
                        </p>
                      </div>

                      {/* Specs pills */}
                      <div className="flex flex-wrap gap-1.5 text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-[#faebea] text-[#8e273e] font-semibold">
                          {appt.lengthOption}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#faebea] text-[#8e273e] font-semibold">
                          {appt.sizeOption}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-semibold">
                          +{appt.pointsEarned} Loyalty Pts
                        </span>
                      </div>

                      {/* Hair Notes */}
                      {appt.hairNotes && (
                        <p className="text-xs text-[#543b3f] bg-[#faf4f2] p-2.5 rounded-xl border border-[#edd8d5]">
                          💡 <strong>Stylist Notes:</strong> {appt.hairNotes}
                        </p>
                      )}

                      {/* Review State */}
                      {appt.reviewSubmitted ? (
                        <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200 space-y-1">
                          <div className="flex items-center gap-1 text-[#d4af37]">
                            {[...Array(appt.reviewRating || 5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-[#d4af37]" />
                            ))}
                            <span className="text-[10px] text-emerald-800 font-bold ml-1">Verified Review Submitted (+50 pts)</span>
                          </div>
                          {appt.reviewText && (
                            <p className="text-xs text-[#221417] italic">"{appt.reviewText}"</p>
                          )}
                        </div>
                      ) : (
                        <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200 flex items-center justify-between gap-2">
                          <span className="text-xs text-amber-900 font-semibold">
                            Leave a review to earn <strong className="text-[#8e273e]">+50 bonus points</strong>!
                          </span>
                          <button
                            onClick={() => {
                              setReviewingAppt(appt);
                              setReviewRating(5);
                              setReviewText('');
                            }}
                            className="px-2.5 py-1 rounded bg-[#8e273e] text-white text-[11px] font-bold hover:bg-[#781e32] transition-colors shrink-0 cursor-pointer"
                          >
                            Review Style
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-[#edd8d5] flex items-center justify-between gap-2">
                      <div className="text-xs">
                        <span className="text-[#705055]">Paid: </span>
                        <strong className="text-[#221417]">${appt.totalAmount}.00</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Digital Receipt */}
                        <button
                          onClick={() => setViewingReceiptAppt(appt)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#faf4f2] hover:bg-[#edd8d5] text-[#543b3f] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          title="View Digital Receipt"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#8e273e]" />
                          <span>Receipt</span>
                        </button>

                        {/* Re-book Look */}
                        <button
                          onClick={() => handleRebookPastLook(appt)}
                          className="px-3 py-1.5 rounded-lg bg-[#8e273e] hover:bg-[#781e32] text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs active:scale-95"
                        >
                          <RefreshCw className="w-3 h-3 text-[#fcd34d]" />
                          <span>Re-Book Look</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: LOYALTY POINTS & REWARDS DASHBOARD */}
        {/* ========================================================================= */}
        {activePortalTab === 'points' && (
          <div className="space-y-8">
            {/* VIP Tier Progression Card */}
            <div className="bg-gradient-to-br from-[#221417] via-[#381a22] to-[#1a0b0e] text-white p-6 sm:p-8 rounded-3xl border border-[#fcd34d]/30 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#fcd34d] font-bold uppercase tracking-wider">
                    <Crown className="w-4 h-4 fill-current" />
                    <span>Queen Loyalty Rewards Program</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                    You have <span className="text-[#fcd34d]">{currentClient.loyaltyPoints}</span> Accumulated Points
                  </h3>
                  <p className="text-xs sm:text-sm text-[#f5e6e8]">
                    Every dollar spent earns loyalty points that unlock instant discounts, free takedowns, and botanical scalp detox therapies.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center sm:text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-[#fcd34d] block">Redemption Value</span>
                  <div className="text-3xl font-serif font-black text-white">
                    ${(currentClient.loyaltyPoints / 10).toFixed(2)}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold">10 pts = $1 Salon Credit</span>
                </div>
              </div>

              {/* Tier Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#fce7ea]">
                  <span>Current Tier: <strong className="text-[#fcd34d]">{tierProgress.current}</strong></span>
                  <span>Next Tier: <strong>{tierProgress.next}</strong> ({tierProgress.threshold} pts)</span>
                </div>
                <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-[#fcd34d] to-amber-500 h-full rounded-full transition-all duration-700 shadow-sm"
                    style={{ width: `${pointsTowardsNext}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-white/60">
                  <span>{currentClient.loyaltyPoints} points earned</span>
                  <span>{tierProgress.threshold - currentClient.loyaltyPoints > 0 ? `${tierProgress.threshold - currentClient.loyaltyPoints} points needed` : 'Maximum Tier Unlocked'}</span>
                </div>
              </div>

              {/* Tier Perks Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-[#fcd34d] block">Bronze (0-299)</span>
                  <p className="text-[11px] text-[#fce7ea]/80">1 pt per $1 · Free herbal welcome tea & scalp consult.</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-[#fcd34d] block">Silver (300-599)</span>
                  <p className="text-[11px] text-[#fce7ea]/80">1.25x pts · Priority squeeze-in booking notification.</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-[#fcd34d] block">Gold VIP (600-999)</span>
                  <p className="text-[11px] text-[#fcd34d]">1.5x pts · $50 Birthday reward credit · Free scalp mist.</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-[#fcd34d] block">Diamond (1,000+)</span>
                  <p className="text-[11px] text-[#fce7ea]/80">2x pts · Free bi-annual takedown session · Zero deposit.</p>
                </div>
              </div>
            </div>

            {/* Redeemed Voucher Banner (if just redeemed) */}
            {redeemedVoucher && (
              <div className="bg-emerald-50 border-2 border-emerald-300 p-6 rounded-3xl space-y-3 animate-in zoom-in-95">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>Reward Voucher Successfully Generated!</span>
                  </div>
                  <button
                    onClick={() => setRedeemedVoucher(null)}
                    className="text-emerald-700 hover:text-emerald-900 text-xs"
                  >
                    Dismiss
                  </button>
                </div>
                <p className="text-xs text-emerald-900">
                  Your <strong>{redeemedVoucher.title}</strong> has been credited to your profile. Use code below during checkout or book now to apply automatically:
                </p>
                <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-xl border border-emerald-200">
                  <code className="text-sm font-mono font-bold text-[#8e273e]">{redeemedVoucher.code}</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(redeemedVoucher.code);
                      showToast('Voucher code copied!');
                    }}
                    className="px-2.5 py-1 text-xs rounded bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200"
                  >
                    Copy Code
                  </button>
                  <button
                    onClick={() => onOpenBooking(services[0], 0, 0, '', '', '', redeemedVoucher.discount, `Reward: ${redeemedVoucher.code}`)}
                    className="px-4 py-1 text-xs rounded bg-[#8e273e] text-white font-bold hover:bg-[#781e32]"
                  >
                    Book with Credit Now
                  </button>
                </div>
              </div>
            )}

            {/* Reward Catalog Cards */}
            <div className="space-y-4">
              <div>
                <h4 className="font-serif font-bold text-xl text-[#221417]">
                  Redeem Points for Exclusive Salon Perks
                </h4>
                <p className="text-xs text-[#705055]">
                  Click "Redeem Now" to instantly convert accumulated loyalty points into service credits or treatments.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {INITIAL_LOYALTY_REWARDS.map((reward) => {
                  const canRedeem = currentClient.loyaltyPoints >= reward.pointsCost;
                  return (
                    <div
                      key={reward.id}
                      className={`bg-white rounded-2xl border-2 p-5 space-y-3.5 flex flex-col justify-between transition-all ${
                        canRedeem
                          ? 'border-[#edd8d5] hover:border-[#8e273e] hover:shadow-md'
                          : 'border-stone-200 opacity-75'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#faebea] text-[#8e273e]">
                            {reward.category}
                          </span>
                          {reward.badge && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#fcd34d] text-stone-900">
                              {reward.badge}
                            </span>
                          )}
                        </div>

                        <h5 className="font-serif font-bold text-base text-[#221417]">
                          {reward.title}
                        </h5>

                        <p className="text-xs text-[#705055] leading-relaxed">
                          {reward.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#edd8d5] flex items-center justify-between">
                        <div>
                          <div className="text-base font-black text-[#8e273e]">
                            {reward.pointsCost} <span className="text-xs font-sans font-normal text-[#705055]">pts</span>
                          </div>
                          <span className="text-[10px] text-emerald-800 font-semibold">
                            ${reward.discountValue} Value
                          </span>
                        </div>

                        <button
                          onClick={() => handleRedeemReward(reward)}
                          disabled={!canRedeem}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            canRedeem
                              ? 'bg-[#8e273e] text-white hover:bg-[#781e32] cursor-pointer shadow-xs active:scale-95'
                              : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                          }`}
                        >
                          {canRedeem ? 'Redeem Now' : 'Need More Pts'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Points Earning Activity Ledger */}
            <div className="bg-white rounded-3xl border border-[#edd8d5] p-6 space-y-4">
              <h4 className="font-serif font-bold text-lg text-[#221417]">
                Recent Points Activity Ledger
              </h4>
              <div className="divide-y divide-[#edd8d5] text-xs">
                <div className="py-2.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <strong className="text-[#221417]">Bohemian Goddess Knotless Braids Completed</strong>
                    <p className="text-[11px] text-[#705055]">Baton Rouge Studio · Master Princess Amara</p>
                  </div>
                  <span className="text-emerald-700 font-bold font-mono">+240 pts</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <strong className="text-[#221417]">Referral Conversion Bonus (Friend: Aaliyah Brooks)</strong>
                    <p className="text-[11px] text-[#705055]">Aaliyah completed first appointment</p>
                  </div>
                  <span className="text-emerald-700 font-bold font-mono">+150 pts</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <strong className="text-[#221417]">Scalp Steam Detox Session Completed</strong>
                    <p className="text-[11px] text-[#705055]">Follicle restoration bar treatment</p>
                  </div>
                  <span className="text-emerald-700 font-bold font-mono">+95 pts</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <strong className="text-[#221417]">Verified Style Review Submission</strong>
                    <p className="text-[11px] text-[#705055]">Client feedback reward</p>
                  </div>
                  <span className="text-emerald-700 font-bold font-mono">+50 pts</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: FOLLICLE CARE & TAKEDOWN TRACKER */}
        {/* ========================================================================= */}
        {activePortalTab === 'takedown' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border-2 border-[#edd8d5] p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#edd8d5] gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8e273e]">
                    Scalp & Follicle Sanctuary Radar
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-[#221417]">
                    Hair Retention & Takedown Health Timeline
                  </h3>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${
                  currentClient.weeksSinceVisit >= 8
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : currentClient.weeksSinceVisit >= 6
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  Current Status: {currentClient.status}
                </span>
              </div>

              {/* Progress gauge */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Installation Age: <strong>{currentClient.weeksSinceVisit} Weeks</strong></span>
                  <span className="text-[#705055]">Maximum Safe Protective Window: 8 Weeks</span>
                </div>

                <div className="w-full bg-[#faebea] h-4 rounded-full overflow-hidden p-0.5 border border-[#edd8d5]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      currentClient.weeksSinceVisit >= 8
                        ? 'bg-rose-600'
                        : currentClient.weeksSinceVisit >= 6
                        ? 'bg-amber-500'
                        : 'bg-emerald-600'
                    }`}
                    style={{ width: `${Math.min(100, (currentClient.weeksSinceVisit / 8) * 100)}%` }}
                  />
                </div>

                <p className="text-xs text-[#543b3f] leading-relaxed">
                  {currentClient.weeksSinceVisit >= 8 ? (
                    <span className="text-rose-800 font-semibold">
                      ⚠️ <strong>Retention Alert:</strong> Your braids have been installed for {currentClient.weeksSinceVisit} weeks. Over-carrying protective styles increases perimeter shedding and root matting. We strongly recommend scheduling a painless multi-hand takedown this week.
                    </span>
                  ) : (
                    <span>
                      ✓ Your braids are currently in a healthy window. Remember to hydrate roots weekly with lightweight Batana oil mist to maintain scalp elasticity.
                    </span>
                  )}
                </p>
              </div>

              {/* Clinic Service CTAs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#edd8d5]">
                <div className="p-4 rounded-2xl bg-[#faf4f2] border border-[#edd8d5] space-y-2">
                  <h5 className="font-bold text-sm text-[#221417]">Painless Multi-Hand Takedown Bar</h5>
                  <p className="text-xs text-[#705055]">
                    Save your edges and eliminate 6 hours of exhaustion at home. Two stylists gently unbraid, organic detangle, and wash your hair with zero breakage.
                  </p>
                  <button
                    onClick={() => onOpenBooking(services[0], 0, 0, '', '', '', 0, 'Scalp & Takedown Clinic')}
                    className="px-3.5 py-2 rounded-lg bg-[#8e273e] text-white text-xs font-bold hover:bg-[#781e32] transition-colors"
                  >
                    Schedule Takedown Session
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf4f2] border border-[#edd8d5] space-y-2">
                  <h5 className="font-bold text-sm text-[#221417]">Botanical Ozone Steam & Detox</h5>
                  <p className="text-xs text-[#705055]">
                    Open follicles, melt build-up, and stimulate dormant edges with our organic peppermint, rosemary, and eucalyptus hydrotherapy steam.
                  </p>
                  <button
                    onClick={() => onOpenBooking(services[0], 0, 0, '', '', '', 0, 'Scalp Steam Treatment')}
                    className="px-3.5 py-2 rounded-lg bg-white border border-[#edd8d5] text-[#8e273e] text-xs font-bold hover:bg-[#faebea] transition-colors"
                  >
                    Add Scalp Steam to Next Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: REFERRAL PROGRAM LINK */}
        {/* ========================================================================= */}
        {activePortalTab === 'referrals' && (
          <div className="bg-white rounded-3xl border-2 border-[#edd8d5] p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8e273e]">
                Queen-to-Queen Loyalty Circle
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#221417]">
                Give $25 · Earn $25 Salon Credit
              </h3>
              <p className="text-xs sm:text-sm text-[#705055]">
                Share your unique VIP referral link with friends, sisters, and colleagues. When they complete their first protective styling session, they save $25 and you automatically receive $25 salon credit!
              </p>
            </div>

            {/* Unique Link & Code Card */}
            <div className="p-5 rounded-2xl bg-[#faf4f2] border border-[#edd8d5] space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-[#705055] uppercase tracking-wider block">
                    Your Personal Referral Code:
                  </span>
                  <div className="text-xl font-mono font-black text-[#8e273e] mt-1">
                    {referralCode}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-[#705055] uppercase tracking-wider block">
                    Your Direct Invite URL:
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      readOnly
                      value={referralLink}
                      className="bg-white px-3 py-1.5 text-xs font-mono rounded border border-[#edd8d5] flex-1 text-[#543b3f]"
                    />
                    <button
                      onClick={handleCopyRef}
                      className="px-3.5 py-1.5 rounded-lg bg-[#8e273e] text-white text-xs font-bold hover:bg-[#781e32] flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      {copiedRef ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedRef ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Share via SMS or WhatsApp */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <a
                  href={`sms:?&body=Hey Queen! 💕 I get my braids done at Princess AHB Salon. Use my VIP referral link to get $25 OFF your first appointment: ${referralLink}`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold flex items-center gap-1.5 hover:bg-emerald-700"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Share on Text Message</span>
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Hey Queen! 💕 I get my braids done at Princess AHB Salon (zero tension & scalp health). Use my VIP referral link to get $25 OFF your first appointment: ${referralLink}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-semibold flex items-center gap-1.5 hover:opacity-90"
                >
                  <span>Share on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Successful Referral Conversions */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-base text-[#221417]">
                Your Successful Referral Conversions ({currentClient.referralStats?.conversionsCount || 0})
              </h4>
              {(currentClient.referralStats?.conversions || []).length === 0 ? (
                <p className="text-xs text-[#705055] italic">No referrals converted yet. Send your link to a friend to earn your next $25 reward!</p>
              ) : (
                <div className="divide-y divide-[#edd8d5] border border-[#edd8d5] rounded-xl overflow-hidden bg-white text-xs">
                  {currentClient.referralStats?.conversions.map((conv) => (
                    <div key={conv.id} className="p-3 flex items-center justify-between">
                      <div>
                        <strong className="text-[#221417] block">{conv.friendName}</strong>
                        <span className="text-[11px] text-[#705055]">{conv.serviceName} · Booked {conv.bookingDate}</span>
                      </div>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        +${conv.rewardAmount} Credited
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL: RESCHEDULE APPOINTMENT */}
      {/* ========================================================================= */}
      {reschedulingAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-[#edd8d5] shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#edd8d5]">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#8e273e]" />
                <h4 className="font-serif font-bold text-xl text-[#221417]">Reschedule Appointment</h4>
              </div>
              <button
                onClick={() => setReschedulingAppt(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-[#705055]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[#705055]">Current Style:</span>
              <p className="font-bold text-sm text-[#221417]">{reschedulingAppt.serviceName}</p>
              <p className="text-[#705055]">Stylist: {reschedulingAppt.stylistName} · {reschedulingAppt.location}</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#221417] block mb-1">
                  Select New Date:
                </label>
                <input
                  type="date"
                  value={rescheduleDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full bg-[#faf4f2] border border-[#edd8d5] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#8e273e]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#221417] block mb-1">
                  Select Time Slot:
                </label>
                <select
                  value={rescheduleTimeSlot}
                  onChange={(e) => setRescheduleTimeSlot(e.target.value)}
                  className="w-full bg-[#faf4f2] border border-[#edd8d5] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#8e273e]"
                >
                  <option value="9:00 AM">9:00 AM (Morning Opening)</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="1:30 PM">1:30 PM (Afternoon Prime)</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:30 PM">4:30 PM (Evening Squad)</option>
                </select>
              </div>
            </div>

            <p className="text-[11px] text-[#705055] bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              ✓ Zero rescheduling fees! Your existing ${reschedulingAppt.depositPaid} deposit transfers automatically.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#edd8d5]">
              <button
                onClick={() => setReschedulingAppt(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#543b3f] hover:bg-[#faf4f2]"
              >
                Back
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="px-5 py-2.5 rounded-xl bg-[#8e273e] text-white text-xs font-bold hover:bg-[#781e32]"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CANCEL APPOINTMENT */}
      {/* ========================================================================= */}
      {cancellingAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#edd8d5] shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-rose-700">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <h4 className="font-serif font-bold text-lg">Cancel This Appointment?</h4>
            </div>

            <p className="text-xs text-[#543b3f] leading-relaxed">
              Are you sure you want to cancel your booking for <strong>{cancellingAppt.serviceName}</strong> on <strong>{cancellingAppt.date}</strong> at <strong>{cancellingAppt.timeSlot}</strong>?
            </p>

            <div className="bg-[#faebea] p-3 rounded-xl border border-[#f0c5cd] text-xs text-[#8e273e] space-y-1">
              <strong>👑 Princess AHB Friendly Deposit Guarantee:</strong>
              <p>Your <strong>${cancellingAppt.depositPaid}.00</strong> deposit is never lost. It will remain on your account as an instant store credit towards your next appointment.</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setCancellingAppt(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#543b3f] hover:bg-[#faf4f2]"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancellation}
                className="px-4 py-2 rounded-xl bg-rose-700 text-white text-xs font-bold hover:bg-rose-800"
              >
                Yes, Cancel & Save Credit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD SERVICE ADD-ON */}
      {/* ========================================================================= */}
      {editingAddonsAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#edd8d5] shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-[#edd8d5]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8e273e]" />
                <h4 className="font-serif font-bold text-lg text-[#221417]">Add Scalp Care & Extras</h4>
              </div>
              <button onClick={() => setEditingAddonsAppt(null)} className="text-[#705055]">✕</button>
            </div>

            <p className="text-xs text-[#705055]">
              Enhance your upcoming appointment with certified follicle care treatments:
            </p>

            <div className="space-y-2">
              {[
                { name: 'Peppermint Botanical Scalp Detox (+$35)', desc: 'Clarifying wash and ozone steam to clear follicle congestion' },
                { name: 'Batana Oil Follicle & Edge Therapy (+$20)', desc: 'Warm authentic Honduran Batana infusion for perimeter growth' },
                { name: 'Human Hair French Curls (+$45)', desc: 'Upgrade silky curls to 100% human hair for 8+ week bouncy definition' },
                { name: 'Zero-Breakage Takedown Prep (+$25)', desc: 'Organic slip conditioning detangle before installation' },
                { name: 'Hot Towel Lavender Scalp Compress (+$15)', desc: 'Relaxing lavender steam towel during appointment' },
              ].map((item) => (
                <div
                  key={item.name}
                  onClick={() => setSelectedNewAddon(item.name)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedNewAddon === item.name
                      ? 'border-[#8e273e] bg-[#faebea] text-[#8e273e] font-bold'
                      : 'border-[#edd8d5] hover:bg-[#faf4f2] text-[#221417]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    {selectedNewAddon === item.name && <Check className="w-4 h-4 text-[#8e273e]" />}
                  </div>
                  <p className="text-[11px] text-[#705055] font-normal mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingAddonsAppt(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#543b3f]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddServiceAddon}
                disabled={!selectedNewAddon}
                className="px-5 py-2.5 rounded-xl bg-[#8e273e] text-white text-xs font-bold hover:bg-[#781e32] disabled:opacity-50"
              >
                Add to Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SPECIAL INSTRUCTIONS / NOTE TO STYLIST */}
      {/* ========================================================================= */}
      {editingNotesAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#edd8d5] shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-[#edd8d5]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#8e273e]" />
                <h4 className="font-serif font-bold text-lg text-[#221417]">Note to Master Stylist</h4>
              </div>
              <button onClick={() => setEditingNotesAppt(null)} className="text-[#705055]">✕</button>
            </div>

            <p className="text-xs text-[#705055]">
              Communicate tender scalp concerns, preferred color blend (e.g. 1B/30, 27 blonde), or parting placement directly to {editingNotesAppt.stylistName}.
            </p>

            <textarea
              rows={4}
              value={stylistNoteText}
              onChange={(e) => setStylistNoteText(e.target.value)}
              placeholder="e.g. Please bring honey blonde curls, sensitive edges on left temple, extra light tension please..."
              className="w-full p-3 rounded-xl border border-[#edd8d5] text-xs focus:outline-none focus:border-[#8e273e] bg-[#faf4f2]"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingNotesAppt(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#543b3f]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStylistNote}
                className="px-5 py-2.5 rounded-xl bg-[#8e273e] text-white text-xs font-bold hover:bg-[#781e32]"
              >
                Send Instructions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: LEAVE REVIEW (+50 PTS) */}
      {/* ========================================================================= */}
      {reviewingAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#edd8d5] shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-[#edd8d5]">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#fcd34d] fill-current" />
                <h4 className="font-serif font-bold text-lg text-[#221417]">Review Past Crown</h4>
              </div>
              <button onClick={() => setReviewingAppt(null)} className="text-[#705055]">✕</button>
            </div>

            <div className="space-y-1">
              <h5 className="font-bold text-sm text-[#221417]">{reviewingAppt.serviceName}</h5>
              <p className="text-xs text-[#705055]">Completed by {reviewingAppt.stylistName} on {reviewingAppt.date}</p>
            </div>

            {/* Star Rating Selector */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#705055] block">Rating:</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setReviewRating(s)}
                    className="p-1 cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        s <= reviewRating ? 'text-[#fcd34d] fill-[#fcd34d]' : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-[#8e273e] ml-2">{reviewRating} / 5 Stars</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#705055] block mb-1">
                Your Experience (Tension level, longevity, stylist care):
              </label>
              <textarea
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Zero pain, featherlight weight, curls lasted 8 weeks with no frizz..."
                className="w-full p-3 rounded-xl border border-[#edd8d5] text-xs focus:outline-none focus:border-[#8e273e] bg-[#faf4f2]"
              />
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8e273e] shrink-0" />
              <span>Submitting this verified review instantly credits <strong>+50 Loyalty Points</strong> to your profile!</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setReviewingAppt(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#543b3f]"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-5 py-2.5 rounded-xl bg-[#8e273e] text-white text-xs font-bold hover:bg-[#781e32]"
              >
                Submit Review (+50 Pts)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VIEW DIGITAL RECEIPT */}
      {/* ========================================================================= */}
      {viewingReceiptAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#edd8d5] shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#edd8d5]">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#8e273e]" />
                <h4 className="font-serif font-bold text-lg text-[#221417]">Official Salon Receipt</h4>
              </div>
              <button onClick={() => setViewingReceiptAppt(null)} className="text-[#705055]">✕</button>
            </div>

            <div className="text-center space-y-1">
              <div className="font-serif font-bold text-xl text-[#221417]">Princess AHB Salon Collective</div>
              <p className="text-[11px] text-[#705055]">12135 Florida Blvd, Baton Rouge, LA 70815 · (225) 288-2746</p>
              <p className="text-[10px] text-stone-400">Transaction ID: {viewingReceiptAppt.id}</p>
            </div>

            <div className="bg-[#faf4f2] p-4 rounded-2xl border border-[#edd8d5] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#705055]">Client Name:</span>
                <span className="font-bold text-[#221417]">{viewingReceiptAppt.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#705055]">Date of Service:</span>
                <span className="font-bold text-[#221417]">{viewingReceiptAppt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#705055]">Service:</span>
                <span className="font-bold text-[#221417]">{viewingReceiptAppt.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#705055]">Stylist:</span>
                <span className="font-bold text-[#221417]">{viewingReceiptAppt.stylistName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#705055]">Specifications:</span>
                <span className="text-[#221417]">{viewingReceiptAppt.lengthOption} / {viewingReceiptAppt.sizeOption}</span>
              </div>
              <div className="border-t border-[#edd8d5] pt-2 flex justify-between font-bold text-sm text-[#8e273e]">
                <span>Total Amount Paid:</span>
                <span>${viewingReceiptAppt.totalAmount}.00</span>
              </div>
            </div>

            <p className="text-[11px] text-center text-[#705055]">
              Thank you for trusting us with your crown! All styles backed by our 7-day zero-tension satisfaction guarantee.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setViewingReceiptAppt(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#543b3f]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-[#8e273e] text-white text-xs font-bold hover:bg-[#781e32] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: LOOKUP BY PHONE OR EMAIL */}
      {/* ========================================================================= */}
      {showLookupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleClientLookup}
            className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#edd8d5] shadow-2xl animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#edd8d5]">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-[#8e273e]" />
                <h4 className="font-serif font-bold text-lg text-[#221417]">Returning Customer Sign-In</h4>
              </div>
              <button type="button" onClick={() => setShowLookupModal(false)} className="text-[#705055]">✕</button>
            </div>

            <p className="text-xs text-[#705055]">
              Enter your phone number or email address used during previous bookings to pull up your appointment history and accumulated points:
            </p>

            <div>
              <label className="text-xs font-bold text-[#221417] block mb-1">
                Phone Number or Email:
              </label>
              <input
                type="text"
                required
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                placeholder="e.g. (301) 555-0192 or maya.jenkins@gmail.com"
                className="w-full p-3 rounded-xl border border-[#edd8d5] text-xs focus:outline-none focus:border-[#8e273e] bg-[#faf4f2]"
              />
              {lookupError && (
                <p className="text-xs text-rose-600 mt-1 font-medium">{lookupError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLookupModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#543b3f]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#8e273e] text-white text-xs font-bold hover:bg-[#781e32]"
              >
                Access My Portal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
