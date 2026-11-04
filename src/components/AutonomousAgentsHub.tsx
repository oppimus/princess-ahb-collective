import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Users,
  TrendingUp,
  DollarSign,
  MessageSquare,
  Copy,
  Check,
  Plus,
  ExternalLink,
  Zap,
  HelpCircle,
  ArrowRight,
  Share2,
  Play,
  Sliders,
  Smartphone,
  Mail,
  Calendar,
  Key,
  Crown,
  Award,
  Star,
  Gift,
  Coins,
  ShieldCheck,
  Phone,
  UserCheck,
  MessageCircle,
} from 'lucide-react';
import { CRMClient, DigitalProduct, Lead, ReferralConversion } from '../types';
import { CONTACT_INFO, OFFICIAL_BOOKING_URL } from '../data/mockData';

interface AutonomousAgentsHubProps {
  crmClients: CRMClient[];
  onUpdateClient: (updated: CRMClient) => void;
  onPublishProduct: (product: DigitalProduct) => void;
  leads: Lead[];
  onAddOutreachResult: (notes: string) => void;
  onOpenPaymentSetup?: () => void;
}

export const AutonomousAgentsHub: React.FC<AutonomousAgentsHubProps> = ({
  crmClients,
  onUpdateClient,
  onPublishProduct,
  leads,
  onOpenPaymentSetup,
}) => {
  const [activeAgentTab, setActiveAgentTab] = useState<'guide' | 'crm' | 'forge' | 'outreach' | 'concierge'>('guide');

  // ==========================================
  // AGENT 1: CROWNKEEPER CRM & LOYALTY TRACKING STATE
  // ==========================================
  const [selectedClientId, setSelectedClientId] = useState<string>(crmClients[0]?.id || '');
  const [isScanningCRM, setIsScanningCRM] = useState(false);
  const [crmAnalysisResult, setCrmAnalysisResult] = useState<any | null>(null);
  const [deployedOutreach, setDeployedOutreach] = useState(false);
  const [copiedOutreach, setCopiedOutreach] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'profile' | 'referrals' | 'outreach'>('profile');
  const [crmClientFilter, setCrmClientFilter] = useState<'all' | 'referrers'>('all');
  const [customPointsInput, setCustomPointsInput] = useState<string>('50');
  const [pointsReason, setPointsReason] = useState<string>('Scalp Treatment Bonus');
  const [loyaltyFeedback, setLoyaltyFeedback] = useState<string | null>(null);

  // Referral Link & Conversion State
  const [copiedReferralLink, setCopiedReferralLink] = useState(false);
  const [copiedReferralCode, setCopiedReferralCode] = useState(false);
  const [copiedReferralMsg, setCopiedReferralMsg] = useState(false);
  const [isCustomizingCode, setIsCustomizingCode] = useState(false);
  const [customCodeInput, setCustomCodeInput] = useState('');
  const [isLoggingInSalonConversion, setIsLoggingInSalonConversion] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendPhone, setNewFriendPhone] = useState('');
  const [newFriendService, setNewFriendService] = useState('Bohemian Goddess Knotless Braids');
  const [newFriendDate, setNewFriendDate] = useState('2026-10-18');
  const [referralFeedback, setReferralFeedback] = useState<string | null>(null);

  const selectedClient = crmClients.find((c) => c.id === selectedClientId) || crmClients[0];

  const clientReferralCode =
    selectedClient?.referralCode ||
    selectedClient?.referralStats?.referralCode ||
    `CROWN-${selectedClient?.name ? selectedClient.name.split(' ')[0].toUpperCase() : 'QUEEN'}-${selectedClient?.id?.slice(-3) || '01'}`;

  const clientReferralLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}?ref=${clientReferralCode}`
      : `https://princessahb.com/book?ref=${clientReferralCode}`;

  const clientReferralStats = selectedClient?.referralStats || {
    referralCode: clientReferralCode,
    referralLink: clientReferralLink,
    totalShares: 4,
    clicks: 12,
    conversionsCount: 0,
    totalCreditsEarned: 0,
    conversions: [],
  };

  const referralShareText = `Hey Queen! 💕 Princess AHB Salon is offering $25 OFF your first knotless braid or protective styling appointment with my referral link: ${clientReferralLink}`;

  const handleCopyRefLink = () => {
    navigator.clipboard.writeText(clientReferralLink);
    setCopiedReferralLink(true);
    setReferralFeedback(`👑 Unique referral link copied for ${selectedClient?.name}!`);
    setTimeout(() => {
      setCopiedReferralLink(false);
      setReferralFeedback(null);
    }, 4000);
  };

  const handleCopyRefCode = () => {
    navigator.clipboard.writeText(clientReferralCode);
    setCopiedReferralCode(true);
    setReferralFeedback(`👑 Referral code "${clientReferralCode}" copied!`);
    setTimeout(() => {
      setCopiedReferralCode(false);
      setReferralFeedback(null);
    }, 4000);
  };

  const handleCopyRefMsg = () => {
    navigator.clipboard.writeText(referralShareText);
    setCopiedReferralMsg(true);
    setReferralFeedback('👑 Pre-written referral message copied to clipboard!');
    setTimeout(() => {
      setCopiedReferralMsg(false);
      setReferralFeedback(null);
    }, 4000);
  };

  const handleSaveCustomReferralCode = () => {
    if (!selectedClient || !customCodeInput.trim()) return;
    const cleanCode = customCodeInput.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
    const newLink = typeof window !== 'undefined'
      ? `${window.location.origin}?ref=${cleanCode}`
      : `https://princessahb.com/book?ref=${cleanCode}`;

    const updated: CRMClient = {
      ...selectedClient,
      referralCode: cleanCode,
      referralStats: {
        ...clientReferralStats,
        referralCode: cleanCode,
        referralLink: newLink,
      },
    };
    onUpdateClient(updated);
    setIsCustomizingCode(false);
    setReferralFeedback(`👑 Referral code updated to "${cleanCode}"! Link regenerated.`);
    setTimeout(() => setReferralFeedback(null), 4500);
  };

  const handleRecordReferralConversion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !newFriendName.trim()) return;

    const newConversion: ReferralConversion = {
      id: `ref-conv-${Date.now()}`,
      friendName: newFriendName.trim(),
      friendPhone: newFriendPhone.trim() || '(504) 555-0188',
      serviceName: newFriendService,
      bookingDate: newFriendDate || new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      rewardAmount: 25,
      loyaltyPointsAwarded: 150,
      creditedAt: new Date().toISOString().split('T')[0],
    };

    const updatedStats = {
      ...clientReferralStats,
      conversionsCount: (clientReferralStats.conversionsCount || 0) + 1,
      totalCreditsEarned: (clientReferralStats.totalCreditsEarned || 0) + 25,
      conversions: [newConversion, ...(clientReferralStats.conversions || [])],
    };

    const updatedClient: CRMClient = {
      ...selectedClient,
      referralCode: clientReferralCode,
      referralStats: updatedStats,
      nextBookingCredit: (selectedClient.nextBookingCredit || 0) + 25,
      loyaltyPoints: (selectedClient.loyaltyPoints || 0) + 150,
    };

    onUpdateClient(updatedClient);
    setNewFriendName('');
    setNewFriendPhone('');
    setIsLoggingInSalonConversion(false);
    setReferralFeedback(`🎉 Conversion tracked in CRM! ${newConversion.friendName} attributed to ${selectedClient.name}. +$25 Next-Booking Credit & +150 Points added!`);
    setTimeout(() => setReferralFeedback(null), 6000);
  };

  const handleAdjustLoyaltyPoints = (delta: number, reason: string) => {
    if (!selectedClient) return;
    const currentPoints = selectedClient.loyaltyPoints ?? 0;
    const newPoints = Math.max(0, currentPoints + delta);

    // Recalculate tier based on total points or total spent
    let newTier = selectedClient.vipTier;
    if (newPoints >= 1000 || selectedClient.totalSpent >= 1000) {
      newTier = 'Diamond Crown';
    } else if (newPoints >= 600 || selectedClient.totalSpent >= 600) {
      newTier = 'Gold VIP';
    } else if (newPoints >= 300 || selectedClient.totalSpent >= 300) {
      newTier = 'Silver';
    }

    const updated: CRMClient = {
      ...selectedClient,
      loyaltyPoints: newPoints,
      vipTier: newTier,
    };

    onUpdateClient(updated);
    setLoyaltyFeedback(
      `${delta > 0 ? `+${delta}` : delta} Loyalty Points ${delta > 0 ? 'awarded' : 'redeemed'} for ${selectedClient.name} (${reason})! New Balance: ${newPoints} pts`
    );
    setTimeout(() => setLoyaltyFeedback(null), 4500);
  };

  const handleRunCRMAnalysis = async () => {
    if (!selectedClient) return;
    setIsScanningCRM(true);
    setDeployedOutreach(false);

    try {
      const res = await fetch('/api/agents/crm-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: selectedClient.name,
          lastStyle: selectedClient.lastStyle,
          weeksSinceVisit: selectedClient.weeksSinceVisit,
          hairNeeds: selectedClient.hairNotes,
          vipStatus: selectedClient.vipTier,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setCrmAnalysisResult(json.data);
      }
    } catch (err) {
      console.error('Error running CRM action:', err);
    } finally {
      setIsScanningCRM(false);
    }
  };

  const handleDeployCRMOutreach = () => {
    if (!selectedClient) return;
    setDeployedOutreach(true);
    const updated: CRMClient = {
      ...selectedClient,
      status: 'Re-booked',
      lastOutreachDate: new Date().toISOString().split('T')[0],
    };
    onUpdateClient(updated);
  };

  // ==========================================
  // AGENT 2: STUDIOCREATIONS PRODUCT FORGE STATE
  // ==========================================
  const [forgeTopic, setForgeTopic] = useState('French Curl Maintenance & Humidity Resistance');
  const [forgeFormat, setForgeFormat] = useState('Comprehensive E-Book & Video Protocol');
  const [forgePrice, setForgePrice] = useState(39);
  const [isForgingProduct, setIsForgingProduct] = useState(false);
  const [generatedProduct, setGeneratedProduct] = useState<any | null>(null);
  const [productPublishedNotice, setProductPublishedNotice] = useState(false);

  const handleForgeProduct = async () => {
    setIsForgingProduct(true);
    setProductPublishedNotice(false);

    try {
      const res = await fetch('/api/agents/create-digital-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: forgeTopic,
          format: forgeFormat,
          priceTier: forgePrice,
          targetAudience: 'Salon clients wearing protective styles & aspiring braiders',
        }),
      });

      const json = await res.json();
      if (json.success) {
        setGeneratedProduct(json.data);
      }
    } catch (err) {
      console.error('Error forging product:', err);
    } finally {
      setIsForgingProduct(false);
    }
  };

  const handlePublishToStore = () => {
    if (!generatedProduct) return;
    const newDigitalProduct: DigitalProduct = {
      id: `prod-ai-${Date.now()}`,
      title: generatedProduct.title,
      subtitle: generatedProduct.subtitle,
      price: generatedProduct.suggestedPrice || forgePrice,
      originalPrice: (generatedProduct.suggestedPrice || forgePrice) + 20,
      category: 'Guides & Ebooks',
      type: 'ebook',
      downloadsCount: 1,
      rating: 5.0,
      ratingCount: 1,
      coverImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
      description: generatedProduct.overview || 'AI-Forged digital masterclass produced by Princess AHB artisans.',
      modules: generatedProduct.modules || [],
      bonuses: generatedProduct.bonuses || [],
      isLeadMagnet: false,
    };

    onPublishProduct(newDigitalProduct);
    setProductPublishedNotice(true);
  };

  // ==========================================
  // AGENT 3: STYLESCOUT OUTREACH STATE
  // ==========================================
  const [outreachCampaign, setOutreachCampaign] = useState('Summer Boho Knotless Vacation Rush');
  const [outreachLocation, setOutreachLocation] = useState('Louisiana & Virginia Luxury Studios');
  const [outreachSeason, setOutreachSeason] = useState('Upcoming Summer Vacation & Festivals');
  const [outreachDiscount, setOutreachDiscount] = useState('$25 off any Knotless or Twist style');
  const [isGeneratingOutreach, setIsGeneratingOutreach] = useState(false);
  const [outreachResult, setOutreachResult] = useState<any | null>(null);
  const [campaignDeployedSuccess, setCampaignDeployedSuccess] = useState(false);

  const handleGenerateOutreach = async () => {
    setIsGeneratingOutreach(true);
    setCampaignDeployedSuccess(false);

    try {
      const res = await fetch('/api/agents/lead-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignName: outreachCampaign,
          targetLocation: outreachLocation,
          seasonOrEvent: outreachSeason,
          offerDiscount: outreachDiscount,
          targetAudience: 'Active leads and previous clients overdue for styling',
        }),
      });

      const json = await res.json();
      if (json.success) {
        setOutreachResult(json.data);
      }
    } catch (err) {
      console.error('Error generating outreach:', err);
    } finally {
      setIsGeneratingOutreach(false);
    }
  };

  // ==========================================
  // AGENT 4: CROWN CONCIERGE CHAT STATE
  // ==========================================
  const [userQuery, setUserQuery] = useState('');
  const [isAskingConsultant, setIsAskingConsultant] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'agent'; text: string }>>([
    {
      sender: 'agent',
      text: 'Greetings Queen 👑 I am the Princess AHB Crown Concierge. Ask me anything about braid care, length vs. duration estimates, tension-free techniques, or scaling your braider chair business.',
    },
  ]);

  const handleAskConsultant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim() || isAskingConsultant) return;

    const q = userQuery;
    setUserQuery('');
    setChatHistory((prev) => [...prev, { sender: 'user', text: q }]);
    setIsAskingConsultant(true);

    try {
      const res = await fetch('/api/agents/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: data.answer || 'Thank you for consulting Princess AHB. We are honored to care for your crown!',
        },
      ]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: 'Our master stylists recommend keeping knotless braids for 6 to 8 weeks maximum to protect the hairline. Book an appointment or browse our Crown Maintenance Vault for exact guidelines!',
        },
      ]);
    } finally {
      setIsAskingConsultant(false);
    }
  };

  return (
    <section className="py-20 bg-[#fcf6f2] text-[#221417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hub Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f4] border border-[#edd8d5] text-[#8e273e] text-xs font-semibold tracking-wider uppercase shadow-xs">
            <Bot className="w-3.5 h-3.5 text-[#8e273e]" />
            <span>Autonomous AI Revenue & Operations Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold font-medium text-[#221417]">
            Autonomous Selling & CRM Agents. <br />
            <span className="italic text-[#8e273e] font-serif">Making Money 24/7 on Autopilot.</span>
          </h2>
          <p className="text-sm text-[#705055] leading-relaxed">
            Eliminate empty chairs and manual follow-ups. Our intelligent agent triad analyzes client retention windows, forges high-margin digital products, and runs outbound outreach to book appointments automatically.
          </p>
        </div>

        {/* Real-time Agent Stats Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-4 rounded-xl bg-[#ffffff] border border-[#edd8d5] shadow-xs">
            <div className="text-[11px] text-[#705055] uppercase tracking-wider mb-1 flex items-center justify-between font-semibold">
              <span>Auto-CRM Recoveries</span>
              <Users className="w-3.5 h-3.5 text-[#8e273e]" />
            </div>
            <div className="text-2xl font-serif font-bold text-[#221417]">$4,860</div>
            <div className="text-[10px] text-emerald-700 flex items-center gap-1 mt-1 font-semibold">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>18 re-booked crowns this month</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#ffffff] border border-[#edd8d5] shadow-xs">
            <div className="text-[11px] text-[#705055] uppercase tracking-wider mb-1 flex items-center justify-between font-semibold">
              <span>Passive Digital Sales</span>
              <DollarSign className="w-3.5 h-3.5 text-[#8e273e]" />
            </div>
            <div className="text-2xl font-serif font-bold text-[#8e273e]">$2,340</div>
            <div className="text-[10px] text-[#705055] mt-1">
              <span>98 digital guides sold autonomously</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#ffffff] border border-[#edd8d5] shadow-xs">
            <div className="text-[11px] text-[#705055] uppercase tracking-wider mb-1 flex items-center justify-between font-semibold">
              <span>Lead Outreach Conversion</span>
              <Send className="w-3.5 h-3.5 text-[#8e273e]" />
            </div>
            <div className="text-2xl font-serif font-bold text-[#221417]">24.8%</div>
            <div className="text-[10px] text-emerald-700 flex items-center gap-1 mt-1 font-semibold">
              <span>+6.2% vs manual texting</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#ffffff] border border-[#edd8d5] shadow-xs">
            <div className="text-[11px] text-[#705055] uppercase tracking-wider mb-1 flex items-center justify-between font-semibold">
              <span>Agent Health</span>
              <Zap className="w-3.5 h-3.5 text-[#8e273e]" />
            </div>
            <div className="text-2xl font-serif font-bold text-emerald-700">Active 24/7</div>
            <div className="text-[10px] text-[#705055] mt-1">
              <span>Gemini 3.8 Flash Engine connected</span>
            </div>
          </div>
        </div>

        {/* Agent Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-[#edd8d5]">
          <button
            onClick={() => setActiveAgentTab('guide')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              activeAgentTab === 'guide'
                ? 'bg-gradient-to-r from-[#8e273e] to-[#8e273e] text-[#ffffff] font-bold shadow-md shadow-[#8e273e]/20'
                : 'bg-[#ffffff] text-[#705055] hover:text-[#221417] hover:bg-[#faf4f2] border border-[#edd8d5]'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-[#fcd34d]" />
            <span>Setup Guide: Automations & Socials</span>
            <span className="text-[10px] bg-amber-400/20 text-[#8e273e] font-bold px-1.5 py-0.5 rounded border border-amber-300">Step-by-Step</span>
          </button>

          <button
            onClick={() => setActiveAgentTab('crm')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              activeAgentTab === 'crm'
                ? 'bg-gradient-to-r from-[#8e273e] to-[#8e273e] text-[#ffffff] font-bold shadow-md shadow-[#8e273e]/20'
                : 'bg-[#ffffff] text-[#705055] hover:text-[#221417] hover:bg-[#faf4f2] border border-[#edd8d5]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>CrownKeeper AI (Retention & CRM)</span>
            <span className="text-[10px] bg-white/30 px-1.5 py-0.5 rounded">Client Rebooking</span>
          </button>

          <button
            onClick={() => setActiveAgentTab('forge')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              activeAgentTab === 'forge'
                ? 'bg-gradient-to-r from-[#8e273e] to-[#8e273e] text-[#ffffff] font-bold shadow-md shadow-[#8e273e]/20'
                : 'bg-[#ffffff] text-[#705055] hover:text-[#221417] hover:bg-[#faf4f2] border border-[#edd8d5]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>StudioCreations AI (Product Forge)</span>
            <span className="text-[10px] bg-white/30 px-1.5 py-0.5 rounded">Passive Revenue</span>
          </button>

          <button
            onClick={() => setActiveAgentTab('outreach')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              activeAgentTab === 'outreach'
                ? 'bg-gradient-to-r from-[#8e273e] to-[#8e273e] text-[#ffffff] font-bold shadow-md shadow-[#8e273e]/20'
                : 'bg-[#ffffff] text-[#705055] hover:text-[#221417] hover:bg-[#faf4f2] border border-[#edd8d5]'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>StyleScout AI (Lead Hunter)</span>
            <span className="text-[10px] bg-white/30 px-1.5 py-0.5 rounded">Outbound Sales</span>
          </button>

          <button
            onClick={() => setActiveAgentTab('concierge')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              activeAgentTab === 'concierge'
                ? 'bg-gradient-to-r from-[#8e273e] to-[#8e273e] text-[#ffffff] font-bold shadow-md shadow-[#8e273e]/20'
                : 'bg-[#ffffff] text-[#705055] hover:text-[#221417] hover:bg-[#faf4f2] border border-[#edd8d5]'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Crown Concierge (Live Stylist AI)</span>
          </button>
        </div>

        {/* TAB 0: STEP-BY-STEP AUTOMATION SETUP GUIDE */}
        {activeAgentTab === 'guide' && (
          <div className="space-y-8">
            {/* Banner Overview */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#ffffff] via-[#fff9f6] to-[#fcf4f2] border border-[#edd8d5] shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf2f4] border border-[#f0c5cd] text-[#8e273e] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Princess AHB Automation Blueprint</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#221417]">
                    How to Set Up 24/7 Salon Automations & Social Pipelines
                  </h3>
                  <p className="text-xs sm:text-sm text-[#705055] max-w-2xl leading-relaxed">
                    Follow this blueprint to connect your booking system, social channels (TikTok, Facebook, YouTube), automated SMS text reminders, and autonomous client rebooking without manual effort.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                  {onOpenPaymentSetup && (
                    <button
                      onClick={onOpenPaymentSetup}
                      className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#8e273e] hover:bg-[#721e31] flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all"
                    >
                      <DollarSign className="w-3.5 h-3.5 text-[#fcd34d]" />
                      <span>What Do I Need to Get Paid?</span>
                    </button>
                  )}

                  <a
                    href={OFFICIAL_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#fcd34d]" />
                    <span>Open Acuity Schedule</span>
                    <ExternalLink className="w-3 h-3 text-[#fcd34d]" />
                  </a>

                  <button
                    onClick={() => setActiveAgentTab('crm')}
                    className="px-4 py-2 rounded-lg text-xs font-bold text-[#8e273e] bg-white border border-[#edd8d5] hover:bg-[#faf4f2] flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Play className="w-3.5 h-3.5 text-[#8e273e]" />
                    <span>Test Rebooking Engine</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Social Channels Integration Box */}
            <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#8e273e]" />
                  <h4 className="font-serif font-bold text-base text-[#221417]">
                    Active Connected Social Channels
                  </h4>
                </div>
                <span className="text-[11px] text-[#705055]">
                  Add your booking link to all bio profiles: <strong className="text-[#8e273e]">princessahb.as.me/schedule</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <a
                  href={CONTACT_INFO.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-[#edd8d5] bg-[#fffbf9] hover:border-[#8e273e] hover:shadow-xs transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                      🎵
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#221417] group-hover:text-[#8e273e] transition-colors">TikTok Profile</div>
                      <div className="text-[11px] text-[#705055]">@princessahb2</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#705055] group-hover:text-[#8e273e]" />
                </a>

                <a
                  href={CONTACT_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-[#edd8d5] bg-[#fffbf9] hover:border-[#8e273e] hover:shadow-xs transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#1877f2] text-white flex items-center justify-center font-bold text-base">
                      f
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#221417] group-hover:text-[#8e273e] transition-colors">Facebook Page</div>
                      <div className="text-[11px] text-[#705055]">Princess AHB Salon</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#705055] group-hover:text-[#8e273e]" />
                </a>

                <a
                  href={CONTACT_INFO.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-[#edd8d5] bg-[#fffbf9] hover:border-[#8e273e] hover:shadow-xs transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#ff0000] text-white flex items-center justify-center font-bold text-sm">
                      ▶
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#221417] group-hover:text-[#8e273e] transition-colors">YouTube Channel</div>
                      <div className="text-[11px] text-[#705055]">Theprincessahb</div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#705055] group-hover:text-[#8e273e]" />
                </a>
              </div>
            </div>

            {/* 5-Step Automation Walkthrough Cards */}
            <div className="space-y-4">
              <h4 className="text-lg font-serif font-bold text-[#221417]">
                The 5 Core Automations Every Braiding Salon Must Run
              </h4>

              {/* Step 1 */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#8e273e] text-white flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <div>
                      <h5 className="font-bold text-sm text-[#221417]">
                        Acuity Scheduling Direct Booking & Virginia Location Rules
                      </h5>
                      <span className="text-[11px] text-[#705055]">Platform: Acuity Scheduling / Squarespace</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Step 1 of 5
                  </span>
                </div>

                <div className="text-xs text-[#543b3f] space-y-2 leading-relaxed bg-[#fdfaf8] p-3.5 rounded-xl border border-[#edd8d5]">
                  <p>
                    <strong>Action:</strong> Set up your schedule at Acuity (<code className="text-[#8e273e] bg-white px-1 py-0.5 rounded border border-[#edd8d5]">princessahb.as.me/schedule</code>) with the following automatic rules:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[#705055] pl-1">
                    <li>
                      <strong>Louisiana Studio:</strong> Point address to <strong className="text-[#221417]">12135 Florida Blvd, Baton Rouge, LA 70815</strong> with $50 automated non-refundable deposits via Stripe/Square.
                    </li>
                    <li>
                      <strong>Virginia Studio Guardrail:</strong> In the booking intake form or appointment instructions, explicitly add: <em className="text-[#8e273e] font-semibold">"For Virginia location please text (225) 288-2746 for confirmation. Do not book on the website."</em>
                    </li>
                    <li>
                      <strong>Buffer Times:</strong> Set a 30-minute automated turnaround buffer between appointments for braider rest and station sterilization.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#8e273e] text-white flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <div>
                      <h5 className="font-bold text-sm text-[#221417]">
                        Social Media Bio Traffic Funnels (TikTok, Facebook & YouTube)
                      </h5>
                      <span className="text-[11px] text-[#705055]">Platform: Linktree, Stan Store, or Direct Domain</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Step 2 of 5
                  </span>
                </div>

                <div className="text-xs text-[#543b3f] space-y-2 leading-relaxed bg-[#fdfaf8] p-3.5 rounded-xl border border-[#edd8d5]">
                  <p>
                    <strong>Action:</strong> Place your booking link in your high-traffic social media bios:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                    <div className="p-2.5 bg-white rounded-lg border border-[#edd8d5]">
                      <strong className="block text-[#221417]">TikTok (@princessahb2)</strong>
                      <span>Add direct website link in bio. Pin a video showcasing French Curl or Boho Knotless results with clear text overlay "Click link in bio to book chair".</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-[#edd8d5]">
                      <strong className="block text-[#221417]">Facebook Page</strong>
                      <span>Set the primary Page Action Button to "Book Now", pointing straight to Acuity. Add auto-reply for Messenger: "Text 225-288-2746 for instant confirmation."</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-[#edd8d5]">
                      <strong className="block text-[#221417]">YouTube (@Theprincessahb)</strong>
                      <span>Include booking link & blueprint download link in video descriptions and pinned comments under hair transformation tutorials.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#8e273e] text-white flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <div>
                      <h5 className="font-bold text-sm text-[#221417]">
                        Automated SMS Appointment Reminders & Preparation Protocol
                      </h5>
                      <span className="text-[11px] text-[#705055]">Platform: Twilio, Acuity Built-in SMS, or Zapier</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Step 3 of 5
                  </span>
                </div>

                <div className="text-xs text-[#543b3f] space-y-2 leading-relaxed bg-[#fdfaf8] p-3.5 rounded-xl border border-[#edd8d5]">
                  <p>
                    <strong>Setup 3 automated SMS triggers:</strong>
                  </p>
                  <div className="space-y-1.5 font-mono text-[11px]">
                    <div className="p-2 bg-white rounded border border-[#edd8d5] text-[#221417]">
                      <strong className="text-[#8e273e] font-sans">Immediate Booking Confirmation:</strong> "👑 Princess AHB: Your appointment is locked! Hair is included. Please arrive with hair washed, blown out, and free of heavy oils. Baton Rouge: 12135 Florida Blvd. Questions? Call/Text (225) 288-2746."
                    </div>
                    <div className="p-2 bg-white rounded border border-[#edd8d5] text-[#221417]">
                      <strong className="text-[#8e273e] font-sans">48 Hours Before Appointment:</strong> "Friendly reminder from Princess AHB for your styling session on [Date] at [Time]. Reply 'CONFIRM' or text 225-288-2746 if you need to adjust."
                    </div>
                    <div className="p-2 bg-white rounded border border-[#edd8d5] text-[#221417]">
                      <strong className="text-[#8e273e] font-sans">24 Hours After Appointment:</strong> "Hope you are in love with your crown Queen! 👑 Remember: sleep in a silk bonnet and avoid high tight ponytails for 48 hours. Here is your Scalp Care Guide: info@princessahb.com"
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#8e273e] text-white flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    <div>
                      <h5 className="font-bold text-sm text-[#221417]">
                        Follicle Timeline Scan (CrownKeeper AI Rebooking Automation)
                      </h5>
                      <span className="text-[11px] text-[#705055]">Platform: Princess AHB AI Engine / Zapier / Make.com</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Step 4 of 5
                  </span>
                </div>

                <div className="text-xs text-[#543b3f] space-y-2 leading-relaxed bg-[#fdfaf8] p-3.5 rounded-xl border border-[#edd8d5]">
                  <p>
                    <strong>The Braid Retention Secret:</strong> Clients leave braids in too long (over 8 weeks), resulting in matting, traction alopecia, and lost salon revenue.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[#705055] pl-1">
                    <li>
                      <strong>Automated Timer at Week 6:</strong> System flags every client who hasn't scheduled a takedown or rebraid.
                    </li>
                    <li>
                      <strong>Automated VIP Offer:</strong> Client automatically receives: <em className="text-[#8e273e]">"Hey Maya, your Boho Knotless have been protecting your hair for 6 weeks! Time for a gentle scalp detox and fresh crown. Book this week and take $25 off!"</em>
                    </li>
                    <li>
                      You can test this right now on the <strong className="text-[#8e273e] cursor-pointer underline" onClick={() => setActiveAgentTab('crm')}>CrownKeeper AI tab</strong>.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 5 */}
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#edd8d5] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#8e273e] text-white flex items-center justify-center text-xs font-bold">
                      5
                    </span>
                    <div>
                      <h5 className="font-bold text-sm text-[#221417]">
                        Passive Revenue Automations (Digital Guides & Ebooks)
                      </h5>
                      <span className="text-[11px] text-[#705055]">Platform: Princess AHB Digital Shop / Stripe / Gumroad</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Step 5 of 5
                  </span>
                </div>

                <div className="text-xs text-[#543b3f] space-y-2 leading-relaxed bg-[#fdfaf8] p-3.5 rounded-xl border border-[#edd8d5]">
                  <p>
                    <strong>How to make money when hands are off clients:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[#705055] pl-1">
                    <li>
                      Use the <strong className="text-[#8e273e] cursor-pointer underline" onClick={() => setActiveAgentTab('forge')}>StudioCreations Product Forge</strong> to generate digital ebooks (e.g. French Curl Maintenance, Braid Business Pricing).
                    </li>
                    <li>
                      When clients enter their email on the website for the free 30-Day Blueprint, the autoresponder delivers the PDF instantly and presents an upsell to the full digital toolkit ($39).
                    </li>
                    <li>
                      100% automated delivery: No manual packing or shipping required.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="p-5 rounded-2xl bg-[#fdf2f4] border border-[#f0c5cd] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h5 className="font-serif font-bold text-sm text-[#221417]">
                  Ready to test the live AI agents?
                </h5>
                <p className="text-xs text-[#705055]">
                  Run automated client scans, forge digital moneymaker products, or dispatch lead outreach campaigns.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveAgentTab('crm')}
                  className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#8e273e] hover:bg-[#781e32] transition-colors"
                >
                  Go to CRM Agent →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: CROWNKEEPER CRM */}
        {activeAgentTab === 'crm' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: CRM Client Timeline List */}
            <div className="lg:col-span-5 bg-[#ffffff] border border-[#edd8d5] rounded-2xl p-5 space-y-4 shadow-md text-[#221417]">
              <div className="flex items-center justify-between pb-3 border-b border-[#edd8d5]">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#221417]">
                    Client Follicle Timeline & CRM
                  </h3>
                  <p className="text-[11px] text-[#705055]">
                    Automated scan detects 6-8 week braid takedown windows.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#8e273e] bg-[#fdf2f4] px-2 py-0.5 rounded border border-[#decab1]">
                  {crmClients.length} Monitored
                </span>
              </div>

              {/* Salon-Wide Referral Performance Summary */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#fdf2f4] to-[#fbf0ea] border border-[#edd8d5] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8e273e] flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-[#8e273e]" />
                    <span>Salon Referral Conversions Engine</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-lg bg-white border border-[#edd8d5]">
                    <span className="text-[9px] text-[#705055] uppercase font-semibold block">Conversions</span>
                    <span className="text-sm font-bold text-[#8e273e]">
                      {crmClients.reduce((acc, c) => acc + (c.referralStats?.conversionsCount || 0), 0)}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-[#edd8d5]">
                    <span className="text-[9px] text-[#705055] uppercase font-semibold block">Credits Issued</span>
                    <span className="text-sm font-bold text-emerald-700">
                      ${crmClients.reduce((acc, c) => acc + (c.referralStats?.totalCreditsEarned || 0), 0)}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-[#edd8d5]">
                    <span className="text-[9px] text-[#705055] uppercase font-semibold block">Est. Revenue</span>
                    <span className="text-sm font-bold text-[#221417]">
                      ${crmClients.reduce((acc, c) => acc + (c.referralStats?.conversionsCount || 0), 0) * 310}
                    </span>
                  </div>
                </div>
              </div>

              {/* Filter Pills: All Clients vs Top Referrers */}
              <div className="flex items-center gap-1.5 p-1 bg-[#faf4f2] rounded-lg border border-[#edd8d5] text-xs">
                <button
                  type="button"
                  onClick={() => setCrmClientFilter('all')}
                  className={`flex-1 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    crmClientFilter === 'all'
                      ? 'bg-[#8e273e] text-white shadow-2xs'
                      : 'text-[#705055] hover:text-[#221417]'
                  }`}
                >
                  All Queens ({crmClients.length})
                </button>
                <button
                  type="button"
                  onClick={() => setCrmClientFilter('referrers')}
                  className={`flex-1 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    crmClientFilter === 'referrers'
                      ? 'bg-[#8e273e] text-white shadow-2xs'
                      : 'text-[#705055] hover:text-[#221417]'
                  }`}
                >
                  <Award className="w-3 h-3" />
                  <span>Top Referrers ({crmClients.filter((c) => (c.referralStats?.conversionsCount || 0) > 0).length})</span>
                </button>
              </div>

              <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                {(crmClientFilter === 'referrers'
                  ? crmClients.filter((c) => (c.referralStats?.conversionsCount || 0) > 0)
                  : crmClients
                ).map((client) => {
                  const isSelected = selectedClientId === client.id;
                  const isAlert = client.weeksSinceVisit >= 7;
                  const isReturning = client.appointmentsCount > 1;
                  const refCount = client.referralStats?.conversionsCount || 0;
                  return (
                    <div
                      key={client.id}
                      onClick={() => {
                        setSelectedClientId(client.id);
                        setCrmAnalysisResult(null);
                        setDeployedOutreach(false);
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#fdf2f4] border-[#8e273e] shadow-xs ring-1 ring-[#8e273e]/20'
                          : 'bg-[#ffffff] border-[#edd8d5] hover:border-[#8e273e]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-xs text-[#221417]">{client.name}</span>
                          {isReturning ? (
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-0.5 shadow-xs"
                              title="Verified Returning Client"
                            >
                              <Crown className="w-2.5 h-2.5 text-amber-700" />
                              <span>Returning ({client.appointmentsCount}x)</span>
                            </span>
                          ) : (
                            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                              1st Visit
                            </span>
                          )}
                          {refCount > 0 && (
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-0.5"
                              title={`${refCount} friends successfully converted`}
                            >
                              <Gift className="w-2.5 h-2.5 text-emerald-700" />
                              <span>{refCount} Refs</span>
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            client.status === 'Re-booked'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : isAlert
                              ? 'bg-rose-50 text-rose-800 border border-rose-200'
                              : 'bg-[#faf4f2] text-[#8e273e] border border-[#edd8d5]'
                          }`}
                        >
                          {client.status} ({client.weeksSinceVisit} wks)
                        </span>
                      </div>
                      <div className="text-[11px] text-[#705055] truncate">
                        Last Style: {client.lastStyle}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#705055] mt-1.5 pt-1.5 border-t border-[#edd8d5]">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span>{client.vipTier}</span>
                        </span>
                        <span className="flex items-center gap-1 font-bold text-[#8e273e]">
                          <Coins className="w-3 h-3 text-amber-600" />
                          <span>{client.loyaltyPoints ?? 0} pts</span>
                        </span>
                        <span>Credit: <strong className="text-emerald-700">${client.nextBookingCredit || 25}</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleRunCRMAnalysis}
                disabled={isScanningCRM}
                className="w-full py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-[#ffffff] bg-gradient-to-r from-[#8e273e] to-[#8e273e] hover:from-[#9e2d46] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isScanningCRM ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Scalp Cycle via Gemini...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    <span>Run AI Retention Scan on {selectedClient?.name}</span>
                  </>
                )}
              </button>
            </div>

            {/* Right: Customer Profile View & Agent Console */}
            <div className="lg:col-span-7 bg-[#ffffff] border border-[#edd8d5] rounded-2xl p-6 space-y-6 shadow-md text-[#221417]">
              {/* Header with Sub-Nav Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#edd8d5] gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#8e273e] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CrownKeeper CRM & Customer Profile</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#221417] mt-0.5">
                    {selectedClient?.name}
                  </h3>
                </div>

                {/* Sub-view switcher */}
                <div className="flex items-center bg-[#faf4f2] p-1 rounded-xl border border-[#edd8d5] shrink-0 flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveProfileTab('profile')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeProfileTab === 'profile'
                        ? 'bg-[#8e273e] text-white shadow-xs'
                        : 'text-[#705055] hover:text-[#221417]'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Profile & Loyalty</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveProfileTab('referrals')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeProfileTab === 'referrals'
                        ? 'bg-[#8e273e] text-white shadow-xs'
                        : 'text-[#705055] hover:text-[#221417]'
                    }`}
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Refer-a-Friend & CRM</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      activeProfileTab === 'referrals'
                        ? 'bg-amber-400 text-amber-950'
                        : 'bg-[#8e273e]/15 text-[#8e273e]'
                    }`}>
                      {clientReferralStats.conversionsCount || 0}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveProfileTab('outreach')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeProfileTab === 'outreach'
                        ? 'bg-[#8e273e] text-white shadow-xs'
                        : 'text-[#705055] hover:text-[#221417]'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>AI Outreach</span>
                    {crmAnalysisResult && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </button>
                </div>
              </div>

              {/* VIEW 1: CUSTOMER PROFILE & LOYALTY DOSSIER */}
              {activeProfileTab === 'profile' && selectedClient && (
                <div className="space-y-6">
                  {/* Client Identity Summary */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#faf4f2] border border-[#edd8d5]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-13 h-13 rounded-full bg-gradient-to-br from-[#8e273e] to-[#5a1424] text-white flex items-center justify-center font-serif text-lg font-bold shadow-md ring-2 ring-amber-400/80 shrink-0">
                        {selectedClient.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-base text-[#221417]">
                            {selectedClient.name}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fdf2f4] text-[#8e273e] border border-[#decab1]">
                            ID: {selectedClient.id}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#705055] mt-1">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#8e273e]" />
                            {selectedClient.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-[#8e273e]" />
                            {selectedClient.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right text-xs">
                      <span className="text-[10px] text-[#705055] uppercase block">Scalp Status</span>
                      <span
                        className={`inline-block font-bold px-2.5 py-1 rounded-md text-xs mt-0.5 ${
                          selectedClient.status === 'Re-booked'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : selectedClient.weeksSinceVisit >= 7
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {selectedClient.status} ({selectedClient.weeksSinceVisit} wks)
                      </span>
                    </div>
                  </div>

                  {/* LOYALTY STATUS BADGE FOR RETURNING CLIENTS */}
                  {selectedClient.appointmentsCount > 1 ? (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-[#8e273e]/10 to-amber-500/15 border-2 border-amber-400/80 shadow-sm space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
                        <Crown className="w-32 h-32 text-amber-600" />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-[#8e273e] text-white flex items-center justify-center shadow-md ring-2 ring-white">
                            <Crown className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#8e273e] flex items-center gap-1">
                                <span>Verified Returning Queen</span>
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 flex items-center gap-1">
                                <Award className="w-3 h-3 text-amber-700" />
                                {selectedClient.vipTier} Loyalty Status
                              </span>
                            </div>
                            <p className="text-[11px] text-[#705055] mt-0.5">
                              Loyal Customer · <strong>{selectedClient.appointmentsCount} Completed Salon Appointments</strong>
                            </p>
                          </div>
                        </div>

                        {/* Next-Time Booking Credit Incentive Tag */}
                        <div className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs">
                          <Gift className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>${selectedClient.nextBookingCredit || 25} Re-booking Credit Ready</span>
                        </div>
                      </div>

                      {/* Unlocked Returning Perks */}
                      <div className="pt-2.5 border-t border-amber-200/90 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] relative z-10">
                        <div className="flex items-center gap-1.5 text-[#543b3f]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>VIP Priority Saturday Chairs</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#543b3f]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Complimentary Scalp Steam & Oil</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#543b3f]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>1 pt / $1 + 50 pt Visit Bonus</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* First-Time Client Badge */
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-stone-600" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                              First-Time Client (1st Appointment)
                            </span>
                            <span className="text-[11px] text-[#705055]">
                              100 Welcome Points Credited to Account
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-[#8e273e] bg-[#fdf2f4] px-2.5 py-1 rounded-full border border-[#decab1]">
                          👑 Returning Loyalty Status Unlocks After Next Visit
                        </span>
                      </div>
                    </div>
                  )}

                  {/* LOYALTYPOINTS TRACKING STATE PANEL */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#faf4f2] border border-[#edd8d5] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-amber-600" />
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#221417]">
                          LoyaltyPoints Tracking State & Crown Balance
                        </h4>
                      </div>
                      <span className="text-[11px] text-[#705055] font-medium">
                        Conversion: 20 pts = $1.00 Credit
                      </span>
                    </div>

                    {/* KPI Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div className="p-3 rounded-lg bg-white border border-[#edd8d5] shadow-xs">
                        <span className="text-[10px] text-[#705055] uppercase block font-semibold">Points Balance</span>
                        <div className="text-lg sm:text-xl font-bold text-[#8e273e] flex items-center gap-1 mt-0.5">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                          <span>{selectedClient.loyaltyPoints ?? 0}</span>
                        </div>
                        <span className="text-[10px] text-stone-500 block">
                          ≈ ${(((selectedClient.loyaltyPoints ?? 0) * 0.05)).toFixed(2)} value
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-white border border-[#edd8d5] shadow-xs">
                        <span className="text-[10px] text-[#705055] uppercase block font-semibold">VIP Tier</span>
                        <div className="text-sm sm:text-base font-bold text-[#221417] flex items-center gap-1 mt-0.5">
                          <Crown className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="truncate">{selectedClient.vipTier}</span>
                        </div>
                        <span className="text-[10px] text-stone-500 block">
                          {selectedClient.vipTier === 'Diamond Crown' ? 'Highest Honor' : 'Next level at 1000 pts'}
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-white border border-[#edd8d5] shadow-xs">
                        <span className="text-[10px] text-[#705055] uppercase block font-semibold">Next Credit</span>
                        <div className="text-lg sm:text-xl font-bold text-emerald-700 mt-0.5">
                          ${selectedClient.nextBookingCredit || 25}
                        </div>
                        <span className="text-[10px] text-emerald-600 block">
                          Active for next visit
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-white border border-[#edd8d5] shadow-xs">
                        <span className="text-[10px] text-[#705055] uppercase block font-semibold">Lifetime Spend</span>
                        <div className="text-lg sm:text-xl font-bold text-[#221417] mt-0.5">
                          ${selectedClient.totalSpent}
                        </div>
                        <span className="text-[10px] text-stone-500 block">
                          {selectedClient.appointmentsCount} visits total
                        </span>
                      </div>
                    </div>

                    {/* Tier Progress Bar */}
                    <div className="space-y-1 bg-white p-3 rounded-lg border border-[#edd8d5]">
                      <div className="flex justify-between text-[11px] text-[#705055]">
                        <span className="font-semibold text-[#221417]">Tier Progression: {selectedClient.vipTier}</span>
                        <span>{selectedClient.loyaltyPoints ?? 0} / 1,000 pts (Diamond Crown)</span>
                      </div>
                      <div className="w-full bg-[#f0e4df] h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-400 via-amber-500 to-[#8e273e] h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, Math.round(((selectedClient.loyaltyPoints ?? 0) / 1000) * 100))}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Interactive Point Management Controls */}
                    <div className="pt-2 border-t border-[#ebd8c1] space-y-2.5">
                      <span className="text-[11px] font-bold text-[#705055] uppercase tracking-wider block">
                        Adjust Loyalty Points & Issue Perks:
                      </span>

                      {/* Quick-Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleAdjustLoyaltyPoints(50, 'Scalp Care & Edge Health Check')}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50 transition-colors flex items-center gap-1 cursor-pointer shadow-xs active:scale-98"
                        >
                          <Plus className="w-3 h-3 text-emerald-600" />
                          <span>+50 Pts (Scalp Care)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAdjustLoyaltyPoints(100, '5-Star Style Photo Review')}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-amber-300 text-amber-900 hover:bg-amber-50 transition-colors flex items-center gap-1 cursor-pointer shadow-xs active:scale-98"
                        >
                          <Plus className="w-3 h-3 text-amber-600" />
                          <span>+100 Pts (Photo Review)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAdjustLoyaltyPoints(150, 'Friend / Family Referral')}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-blue-300 text-blue-900 hover:bg-blue-50 transition-colors flex items-center gap-1 cursor-pointer shadow-xs active:scale-98"
                        >
                          <Plus className="w-3 h-3 text-blue-600" />
                          <span>+150 Pts (Referral)</span>
                        </button>

                        <button
                          type="button"
                          disabled={(selectedClient.loyaltyPoints ?? 0) < 100}
                          onClick={() => handleAdjustLoyaltyPoints(-100, 'Redeemed for $5 Salon Voucher')}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-rose-300 text-rose-800 hover:bg-rose-50 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-40 shadow-xs active:scale-98"
                        >
                          <Gift className="w-3 h-3 text-rose-600" />
                          <span>Redeem 100 Pts (-$5)</span>
                        </button>
                      </div>

                      {/* Custom Point Adjustment Form */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-[#705055] font-semibold">Custom:</span>
                          <input
                            type="number"
                            value={customPointsInput}
                            onChange={(e) => setCustomPointsInput(e.target.value)}
                            placeholder="Pts"
                            className="w-20 px-2.5 py-1.5 text-xs bg-white border border-[#edd8d5] rounded-lg text-[#221417] focus:outline-none focus:border-[#8e273e]"
                          />
                        </div>
                        <input
                          type="text"
                          value={pointsReason}
                          onChange={(e) => setPointsReason(e.target.value)}
                          placeholder="Reason (e.g. Birthday gift, steam upgrade)"
                          className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-[#edd8d5] rounded-lg text-[#221417] placeholder-stone-400 focus:outline-none focus:border-[#8e273e]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const val = parseInt(customPointsInput, 10);
                            if (!isNaN(val) && val !== 0) {
                              handleAdjustLoyaltyPoints(val, pointsReason || 'Manual loyalty adjustment');
                            }
                          }}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#8e273e] hover:bg-[#9e2d46] text-white transition-colors cursor-pointer shrink-0 shadow-xs"
                        >
                          Update Points
                        </button>
                      </div>

                      {/* Live Feedback Toast */}
                      {loyaltyFeedback && (
                        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{loyaltyFeedback}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Client Hair Dossier & History */}
                  <div className="p-4 rounded-xl bg-white border border-[#edd8d5] space-y-3 text-xs shadow-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#edd8d5]">
                      <span className="font-bold uppercase tracking-wider text-[#705055] flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#8e273e]" />
                        <span>Client Follicle Dossier & History</span>
                      </span>
                      <span className="text-[11px] text-[#8e273e] font-semibold">
                        Last Visit: {selectedClient.lastVisitDate} ({selectedClient.weeksSinceVisit} weeks ago)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#221417]">
                      <div>
                        <span className="text-[10px] text-[#705055] uppercase block font-semibold">
                          Last Protective Style Received
                        </span>
                        <p className="font-semibold text-xs mt-0.5 text-[#221417]">
                          {selectedClient.lastStyle}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#705055] uppercase block font-semibold">
                          Scalp Sensitivity & Styling Notes
                        </span>
                        <p className="text-xs text-[#543b3f] mt-0.5 leading-relaxed">
                          {selectedClient.hairNotes}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#edd8d5]">
                      <span className="text-[11px] text-[#705055]">
                        Need to generate re-booking outreach or analyze edge protection?
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveProfileTab('outreach');
                          handleRunCRMAnalysis();
                        }}
                        className="text-xs font-bold text-[#8e273e] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Launch AI Retention Scan →</span>
                      </button>
                    </div>
                  </div>

                  {/* ROYAL REFERRAL PROGRAM QUICK PASS */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#fdf2f4] via-[#faf4f2] to-[#fbf0ea] border-2 border-[#8e273e]/30 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#edd8d5]">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-[#8e273e]" />
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#8e273e]">
                          Royal Refer-a-Friend Pass (Give $25, Get $25)
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        {clientReferralStats.conversionsCount || 0} Successful Conversions (${clientReferralStats.totalCreditsEarned || 0} Earned)
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#edd8d5]">
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] text-[#705055] uppercase font-bold block">
                          Unique Referral Link:
                        </span>
                        <p className="font-mono text-xs font-bold text-[#8e273e] truncate">
                          {clientReferralLink}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={handleCopyRefLink}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#8e273e] hover:bg-[#a02f48] text-white transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                        >
                          {copiedReferralLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedReferralLink ? 'Copied' : 'Copy Link'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveProfileTab('referrals')}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#8e273e] bg-[#fdf2f4] hover:bg-[#faebea] border border-[#f0c5cd] transition-colors cursor-pointer"
                        >
                          Manage Referrals →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: REFER-A-FRIEND CRM & CONVERSIONS TRACKER */}
              {activeProfileTab === 'referrals' && selectedClient && (
                <div className="space-y-6">
                  {/* Feedback Toast */}
                  {referralFeedback && (
                    <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold flex items-center gap-2 shadow-md animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
                      <span>{referralFeedback}</span>
                    </div>
                  )}

                  {/* Top Referral Value Card */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#8e273e] via-[#781e32] to-[#591323] text-white shadow-xl relative overflow-hidden space-y-4">
                    <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
                      <Crown className="w-40 h-40 text-[#fcd34d]" />
                    </div>

                    <div className="relative z-10 space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[10px] font-bold uppercase tracking-wider text-[#fcd34d] border border-white/20">
                        <Gift className="w-3.5 h-3.5 text-[#fcd34d]" />
                        <span>Give $25, Get $25 · Royal Referral Circle</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">
                        {selectedClient.name}'s Unique Referral Portal
                      </h4>
                      <p className="text-xs text-white/85 max-w-lg leading-relaxed">
                        Whenever a friend books their first protective styling service with {selectedClient.name}'s unique referral link, they receive <strong>$25 OFF</strong> and {selectedClient.name} automatically receives <strong>$25 in salon booking credit + 150 VIP loyalty points</strong> tracked directly here in the CRM.
                      </p>
                    </div>

                    {/* Unique Referral Link & Code Generator Bar */}
                    <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/25 space-y-3">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-white/70 block mb-1">
                            Generated Referral Link:
                          </span>
                          <div className="text-xs font-mono font-bold text-[#fcd34d] truncate bg-black/30 px-3 py-2 rounded-lg border border-white/15">
                            {clientReferralLink}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                          <button
                            type="button"
                            onClick={handleCopyRefLink}
                            className="px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#fcd34d] hover:bg-[#ffe066] text-[#221417] transition-all flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                          >
                            {copiedReferralLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedReferralLink ? 'Copied' : 'Copy Link'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleCopyRefCode}
                            className="px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-white/20 hover:bg-white/30 text-white transition-all flex items-center gap-1.5 cursor-pointer border border-white/30"
                            title="Copy Code"
                          >
                            {copiedReferralCode ? <Check className="w-3.5 h-3.5 text-[#fcd34d]" /> : <Award className="w-3.5 h-3.5" />}
                            <span>Code: {clientReferralCode}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setIsCustomizingCode(!isCustomizingCode);
                              setCustomCodeInput(clientReferralCode);
                            }}
                            className="px-2.5 py-2 rounded-lg text-xs font-medium text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                            title="Customize Vanity Code"
                          >
                            <span>Edit Code</span>
                          </button>
                        </div>
                      </div>

                      {/* Custom Vanity Code Editor Form */}
                      {isCustomizingCode && (
                        <div className="pt-2 border-t border-white/15 flex items-center gap-2 animate-in fade-in">
                          <span className="text-[11px] text-white/80 shrink-0">Custom Code:</span>
                          <input
                            type="text"
                            value={customCodeInput}
                            onChange={(e) => setCustomCodeInput(e.target.value)}
                            placeholder="e.g. QUEEN-MAYA-VIP"
                            className="px-2.5 py-1 text-xs font-mono uppercase bg-black/40 text-[#fcd34d] border border-white/30 rounded-md focus:outline-none focus:border-[#fcd34d]"
                          />
                          <button
                            type="button"
                            onClick={handleSaveCustomReferralCode}
                            className="px-3 py-1 rounded-md text-xs font-bold bg-[#fcd34d] text-[#221417] hover:bg-[#ffe066] cursor-pointer"
                          >
                            Save & Regenerate
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsCustomizingCode(false)}
                            className="text-xs text-white/60 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>
                      )}

                      {/* Instant Share Links */}
                      <div className="pt-2 border-t border-white/15 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold text-white/80 mr-1">Share Channels:</span>
                        <a
                          href={`sms:?&body=${encodeURIComponent(referralShareText)}`}
                          className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/20 hover:bg-white/30 text-white transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <MessageCircle className="w-3 h-3 text-[#fcd34d]" />
                          <span>SMS Invite</span>
                        </a>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(referralShareText)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-600/80 hover:bg-emerald-600 text-white transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Share2 className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyRefMsg}
                          className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/15 hover:bg-white/25 text-white transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {copiedReferralMsg ? <Check className="w-3 h-3 text-[#fcd34d]" /> : <Copy className="w-3 h-3" />}
                          <span>Copy Caption</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Referral KPIs & Performance Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-3.5 rounded-xl bg-[#faf4f2] border border-[#edd8d5]">
                      <span className="text-[10px] text-[#705055] uppercase font-bold block">Total Shares</span>
                      <div className="text-xl font-bold text-[#221417] mt-0.5">
                        {clientReferralStats.totalShares || 4}
                      </div>
                      <span className="text-[10px] text-stone-500 block">Outbound links sent</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#faf4f2] border border-[#edd8d5]">
                      <span className="text-[10px] text-[#705055] uppercase font-bold block">Link Clicks</span>
                      <div className="text-xl font-bold text-[#8e273e] mt-0.5">
                        {clientReferralStats.clicks || 12}
                      </div>
                      <span className="text-[10px] text-stone-500 block">Unique visitors</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-300">
                      <span className="text-[10px] text-emerald-900 uppercase font-bold block">Conversions</span>
                      <div className="text-xl font-bold text-emerald-800 flex items-center gap-1 mt-0.5">
                        <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{clientReferralStats.conversionsCount || 0}</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 block font-semibold">Booked clients</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-300">
                      <span className="text-[10px] text-amber-900 uppercase font-bold block">Credits Earned</span>
                      <div className="text-xl font-bold text-amber-900 mt-0.5">
                        ${clientReferralStats.totalCreditsEarned || (clientReferralStats.conversionsCount || 0) * 25}
                      </div>
                      <span className="text-[10px] text-amber-800 block font-semibold">+$25 per friend</span>
                    </div>
                  </div>

                  {/* Milestone Rewards Ladder */}
                  <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#edd8d5] space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-600" />
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#221417]">
                          Referral Milestone Ladder
                        </h4>
                      </div>
                      <span className="text-xs text-[#705055]">
                        Level: <strong>{(clientReferralStats.conversionsCount || 0) >= 5 ? 'Ambassador' : (clientReferralStats.conversionsCount || 0) >= 3 ? 'Advocate' : 'Rising Queen'}</strong>
                      </span>
                    </div>

                    <div className="w-full bg-[#f0e4df] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-400 via-amber-500 to-[#8e273e] h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.round(((clientReferralStats.conversionsCount || 0) / 5) * 100))}%`,
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                      <div className={`p-2.5 rounded-lg border flex flex-col justify-between ${
                        (clientReferralStats.conversionsCount || 0) >= 1 ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-[#faf4f2] border-[#edd8d5] text-[#705055]'
                      }`}>
                        <div className="font-bold flex items-center justify-between">
                          <span>1 Referral</span>
                          {(clientReferralStats.conversionsCount || 0) >= 1 && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                        </div>
                        <span className="text-[10px] mt-1">$25 Salon Credit + 150 Pts</span>
                      </div>

                      <div className={`p-2.5 rounded-lg border flex flex-col justify-between ${
                        (clientReferralStats.conversionsCount || 0) >= 3 ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-[#faf4f2] border-[#edd8d5] text-[#705055]'
                      }`}>
                        <div className="font-bold flex items-center justify-between">
                          <span>3 Referrals</span>
                          {(clientReferralStats.conversionsCount || 0) >= 3 && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                        </div>
                        <span className="text-[10px] mt-1">Free Herbal Scalp Steam ($45 val)</span>
                      </div>

                      <div className={`p-2.5 rounded-lg border flex flex-col justify-between ${
                        (clientReferralStats.conversionsCount || 0) >= 5 ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-[#faf4f2] border-[#edd8d5] text-[#705055]'
                      }`}>
                        <div className="font-bold flex items-center justify-between">
                          <span>5 Referrals</span>
                          {(clientReferralStats.conversionsCount || 0) >= 5 && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                        </div>
                        <span className="text-[10px] mt-1">Free Edge Refresh ($95 val)</span>
                      </div>
                    </div>
                  </div>

                  {/* Log / Simulate In-Salon Referral Conversion Form */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#faf4f2] border border-[#edd8d5] space-y-3.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#221417] flex items-center gap-1.5">
                          <Plus className="w-4 h-4 text-[#8e273e]" />
                          <span>Log In-Salon Referral Conversion (CRM Attribution)</span>
                        </h4>
                        <p className="text-[11px] text-[#705055]">
                          Friend booked in person, via phone, or quoted this code? Record it here to credit {selectedClient.name}.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsLoggingInSalonConversion(!isLoggingInSalonConversion)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#8e273e] hover:bg-[#a02f48] text-white transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
                      >
                        {isLoggingInSalonConversion ? 'Close Form' : '+ Record Conversion'}
                      </button>
                    </div>

                    {isLoggingInSalonConversion && (
                      <form
                        onSubmit={handleRecordReferralConversion}
                        className="bg-white p-4 rounded-xl border border-[#edd8d5] space-y-3 animate-in fade-in"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-[#705055] mb-1">
                              Friend's Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={newFriendName}
                              onChange={(e) => setNewFriendName(e.target.value)}
                              placeholder="e.g. Jazmine Washington"
                              className="w-full px-3 py-1.5 text-xs bg-[#faf4f2] border border-[#edd8d5] rounded-lg text-[#221417] focus:outline-none focus:border-[#8e273e]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-[#705055] mb-1">
                              Friend's Phone
                            </label>
                            <input
                              type="tel"
                              value={newFriendPhone}
                              onChange={(e) => setNewFriendPhone(e.target.value)}
                              placeholder="(504) 555-0199"
                              className="w-full px-3 py-1.5 text-xs bg-[#faf4f2] border border-[#edd8d5] rounded-lg text-[#221417] focus:outline-none focus:border-[#8e273e]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-[#705055] mb-1">
                              Style Booked
                            </label>
                            <select
                              value={newFriendService}
                              onChange={(e) => setNewFriendService(e.target.value)}
                              className="w-full px-3 py-1.5 text-xs bg-[#faf4f2] border border-[#edd8d5] rounded-lg text-[#221417] focus:outline-none focus:border-[#8e273e]"
                            >
                              <option value="Bohemian Goddess Knotless Braids">Bohemian Goddess Knotless Braids</option>
                              <option value="French Curl Braids (Color 1B/30)">French Curl Braids (Color 1B/30)</option>
                              <option value="Classic Smedium Knotless Braids">Classic Smedium Knotless Braids</option>
                              <option value="Senegalese Rope Twists">Senegalese Rope Twists</option>
                              <option value="Tribal Stitch Braids & Boho Curls">Tribal Stitch Braids & Boho Curls</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-[#705055] mb-1">
                              Appointment Date
                            </label>
                            <input
                              type="date"
                              value={newFriendDate}
                              onChange={(e) => setNewFriendDate(e.target.value)}
                              className="w-full px-3 py-1.5 text-xs bg-[#faf4f2] border border-[#edd8d5] rounded-lg text-[#221417] focus:outline-none focus:border-[#8e273e]"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#edd8d5]">
                          <button
                            type="button"
                            onClick={() => setIsLoggingInSalonConversion(false)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#705055] hover:bg-stone-100"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#8e273e] hover:bg-[#a02f48] transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#fcd34d]" />
                            <span>Save Conversion (+ $25 Credit to {selectedClient.name.split(' ')[0]})</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Successful Referral Conversions Activity Log */}
                  <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#edd8d5] space-y-3 shadow-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#edd8d5]">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#221417] flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-[#8e273e]" />
                        <span>Referral Conversions Log ({clientReferralStats.conversions?.length || 0})</span>
                      </h4>
                      <span className="text-[11px] text-[#705055]">
                        Live CRM Audit Trail
                      </span>
                    </div>

                    {clientReferralStats.conversions && clientReferralStats.conversions.length > 0 ? (
                      <div className="divide-y divide-[#edd8d5]">
                        {clientReferralStats.conversions.map((conv) => (
                          <div key={conv.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#fdf2f4] text-[#8e273e] font-bold text-xs flex items-center justify-center border border-[#decab1] shrink-0">
                                {conv.friendName
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-xs text-[#221417]">{conv.friendName}</span>
                                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                                    {conv.status}
                                  </span>
                                </div>
                                <div className="text-[11px] text-[#705055]">
                                  {conv.serviceName} · Booked {conv.bookingDate} {conv.friendPhone ? `· ${conv.friendPhone}` : ''}
                                </div>
                              </div>
                            </div>

                            <div className="text-left sm:text-right shrink-0">
                              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                                +${conv.rewardAmount} Credit & +{conv.loyaltyPointsAwarded} Pts Credited
                              </span>
                              <span className="block text-[10px] text-stone-400 mt-0.5">
                                Verified {conv.creditedAt}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-xs text-[#705055] space-y-2">
                        <Users className="w-8 h-8 text-stone-300 mx-auto" />
                        <p>No referral conversions logged yet for this client.</p>
                        <p className="text-[11px] text-stone-400">
                          Share their unique link or click <strong>+ Record Conversion</strong> above to log a walk-in referral.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* VIEW 3: CROWNKEEPER AI RETENTION OUTREACH CONSOLE */}
              {activeProfileTab === 'outreach' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-[#edd8d5]">
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#221417]">
                        Targeted Retention Strategy: {selectedClient?.name}
                      </h4>
                      <p className="text-xs text-[#705055]">
                        Gemini analyzes scalp history, weeks elapsed ({selectedClient?.weeksSinceVisit} wks), and generates high-converting outreach.
                      </p>
                    </div>
                    {crmAnalysisResult && (
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        {crmAnalysisResult.retentionProbability} Retention Score
                      </span>
                    )}
                  </div>

                  {!crmAnalysisResult ? (
                    <div className="py-10 text-center space-y-3 bg-[#faf4f2] rounded-xl p-6 border border-[#edd8d5]">
                      <div className="w-12 h-12 rounded-full bg-white border border-[#edd8d5] mx-auto flex items-center justify-center text-[#8e273e] shadow-xs">
                        <Bot className="w-6 h-6" />
                      </div>
                      <p className="text-xs text-[#705055] max-w-sm mx-auto leading-relaxed">
                        Click <strong>"Run AI Retention Scan"</strong> to activate CrownKeeper AI. It will analyze {selectedClient?.name}'s scalp notes, edge protection window, and generate personalized communication.
                      </p>
                      <button
                        onClick={handleRunCRMAnalysis}
                        disabled={isScanningCRM}
                        className="py-2.5 px-5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#8e273e] hover:bg-[#9e2d46] transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
                      >
                        {isScanningCRM ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        <span>Analyze Scalp & Generate Outreach</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {/* Analysis Box */}
                      <div className="p-4 rounded-xl bg-[#faf4f2] border border-[#edd8d5] text-xs space-y-2">
                        <div className="font-semibold text-[#221417] flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-[#8e273e]" />
                          <span>Follicular & Edge Retention Diagnostic:</span>
                        </div>
                        <p className="text-[#705055] leading-relaxed">
                          {crmAnalysisResult.analysis}
                        </p>
                        <div className="pt-2 border-t border-[#ebd8c1] flex flex-wrap gap-4 text-[11px]">
                          <span>Recommended Style: <strong className="text-[#8e273e]">{crmAnalysisResult.recommendedStyle}</strong></span>
                          <span>Promo Incentive: <strong className="text-[#8e273e]">{crmAnalysisResult.incentiveCode} ({crmAnalysisResult.discount})</strong></span>
                        </div>
                      </div>

                      {/* Generated SMS */}
                      <div className="space-y-1.5">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#8e273e] flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Personalized SMS Text Message (Ready to Send)</span>
                        </div>
                        <div className="p-3.5 rounded-lg bg-[#ffffff] border border-[#edd8d5] font-mono text-xs text-[#221417] leading-relaxed shadow-xs">
                          {crmAnalysisResult.smsMessage}
                        </div>
                      </div>

                      {/* Generated WhatsApp / Email */}
                      <div className="space-y-1.5">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#705055] flex items-center gap-1.5">
                          <span>WhatsApp VIP Voice:</span>
                        </div>
                        <div className="p-3.5 rounded-lg bg-[#ffffff] border border-[#edd8d5] text-xs text-[#705055] leading-relaxed shadow-xs">
                          {crmAnalysisResult.whatsappMessage}
                        </div>
                      </div>

                      {/* One-click Action Buttons */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                        <button
                          onClick={handleDeployCRMOutreach}
                          disabled={deployedOutreach}
                          className={`w-full sm:w-auto flex-1 py-3 px-5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            deployedOutreach
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                              : 'bg-gradient-to-r from-[#8e273e] to-[#8e273e] hover:from-[#9e2d46] text-[#ffffff] shadow-md'
                          }`}
                        >
                          {deployedOutreach ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Outreach Dispatched to {selectedClient?.name}!</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Deploy Automated Outreach Now</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            const messageToCopy = crmAnalysisResult?.outreachMessage || `Hi ${selectedClient?.name}! Time to refresh your braids with Princess AHB: https://princessahb.as.me/schedule/cf057a54`;
                            navigator.clipboard?.writeText?.(messageToCopy);
                            setCopiedOutreach(true);
                            setTimeout(() => setCopiedOutreach(false), 3000);
                          }}
                          className="w-full sm:w-auto py-3 px-4 rounded-lg text-xs font-semibold bg-[#faf4f2] hover:bg-[#f3eadc] text-[#8e273e] border border-[#edd8d5] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedOutreach ? '✓ Copied Outreach Text' : 'Copy Text'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: STUDIOCREATIONS DIGITAL PRODUCT FORGE */}
        {activeAgentTab === 'forge' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Forge Parameters */}
            <div className="lg:col-span-5 bg-[#ffffff] border border-[#edd8d5] rounded-2xl p-6 space-y-5 shadow-md text-[#221417]">
              <div className="pb-3 border-b border-[#edd8d5]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8e273e] flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Autonomous Product Synthesizer</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#221417]">
                  Forge New Digital Asset
                </h3>
                <p className="text-xs text-[#705055] mt-1">
                  Gemini analyzes trending salon inquiries to craft complete digital products that generate passive sales.
                </p>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-xs font-semibold text-[#6e5e4e] uppercase tracking-wider mb-1.5">
                  Product Focus / Topic
                </label>
                <input
                  type="text"
                  value={forgeTopic}
                  onChange={(e) => setForgeTopic(e.target.value)}
                  placeholder="e.g. French Curl Longevity, Scalp Detox..."
                  className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                />
              </div>

              {/* Presets */}
              <div className="space-y-1">
                <span className="text-[10px] text-[#705055] uppercase font-semibold">Quick Inspiration Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'French Curl Humidity Resistance',
                    'Braider Ergonomics & Speed Parting',
                    '4C Scalp Detox & Braid Wash Routine',
                    'Tension-Free Parting for Thin Hair',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setForgeTopic(preset)}
                      className="px-2 py-1 rounded bg-[#faf4f2] border border-[#edd8d5] text-[10px] text-[#8e273e] hover:bg-[#f3eadc] transition-colors cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format & Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#6e5e4e] uppercase tracking-wider mb-1">
                    Format
                  </label>
                  <select
                    value={forgeFormat}
                    onChange={(e) => setForgeFormat(e.target.value)}
                    className="w-full px-2.5 py-2 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                  >
                    <option value="E-Book & Video Protocol">E-Book & Video Protocol</option>
                    <option value="Video Masterclass Series">Video Masterclass Series</option>
                    <option value="Braider Business Template Pack">Business Template Pack</option>
                    <option value="Audio Affirmations & Scalp Guide">Audio & Routine Guide</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6e5e4e] uppercase tracking-wider mb-1">
                    Target Price ($)
                  </label>
                  <input
                    type="number"
                    value={forgePrice}
                    onChange={(e) => setForgePrice(Number(e.target.value))}
                    className="w-full px-2.5 py-2 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                  />
                </div>
              </div>

              <button
                onClick={handleForgeProduct}
                disabled={isForgingProduct}
                className="w-full py-3.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-[#ffffff] bg-gradient-to-r from-[#8e273e] via-[#9e2d46] to-[#8e273e] hover:from-[#9e2d46] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isForgingProduct ? (
                  <>
                    <RefreshCw className="w-4 h-4 " />
                    <span>Synthesizing Curriculum & Assets...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Forge Digital Product via AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Product Output */}
            <div className="lg:col-span-7 bg-[#ffffff] border border-[#edd8d5] rounded-2xl p-6 space-y-6 shadow-md text-[#221417]">
              {!generatedProduct ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#faf4f2] border border-[#edd8d5] mx-auto flex items-center justify-center text-[#8e273e]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#221417]">
                    StudioCreations Product Forge Ready
                  </h4>
                  <p className="text-xs text-[#705055] max-w-sm mx-auto">
                    Select a topic and price point on the left. The agent will craft curriculum chapters, bonus templates, revenue projections, and high-converting marketing copy!
                  </p>
                </div>
              ) : (
                <div className="space-y-5 ">
                  <div className="flex items-center justify-between pb-3 border-b border-[#edd8d5]">
                    <div>
                      <span className="text-[10px] text-[#8e273e] uppercase font-bold tracking-wider">
                        {generatedProduct.category || 'Digital Masterpiece'}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-[#221417] mt-0.5">
                        {generatedProduct.title}
                      </h3>
                      <p className="text-xs text-[#705055]">{generatedProduct.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-serif font-bold text-[#8e273e]">
                        ${generatedProduct.suggestedPrice || forgePrice}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold">
                        Est. {generatedProduct.estimatedMonthlyRevenue || '$3,200/mo'}
                      </span>
                    </div>
                  </div>

                  {/* Modules Outline */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#8e273e] mb-2">
                      Structured Modules ({generatedProduct.modules?.length || 4})
                    </h5>
                    <div className="space-y-2">
                      {generatedProduct.modules?.map((m: any, idx: number) => (
                        <div key={idx} className="p-3 rounded-lg bg-[#faf4f2] border border-[#edd8d5] text-xs">
                          <strong className="text-[#221417] block">{m.title}</strong>
                          <span className="text-[11px] text-[#705055]">{m.summary}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Included Bonuses */}
                  {generatedProduct.bonuses?.length > 0 && (
                    <div className="p-3 rounded-lg bg-[#faf4f2] border border-[#edd8d5] text-xs">
                      <span className="font-bold text-[#8e273e] block mb-1">
                        Action Bonuses Included:
                      </span>
                      <ul className="list-disc list-inside text-[11px] text-[#705055] space-y-0.5">
                        {generatedProduct.bonuses.map((b: string, idx: number) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Publishing Button to Live Store */}
                  <div className="pt-2">
                    <button
                      onClick={handlePublishToStore}
                      className="w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-[#ffffff] bg-gradient-to-r from-[#8e273e] to-[#8e273e] hover:from-[#9e2d46] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Publish Directly to Live Digital Store Catalog</span>
                    </button>
                    {productPublishedNotice && (
                      <div className="mt-2 text-center text-xs text-emerald-700 font-medium flex items-center justify-center gap-1.5 ">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Product is now live in the Digital Products tab for customers to buy!</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: STYLESCOUT OUTREACH ENGINE */}
        {activeAgentTab === 'outreach' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Outreach Campaign Setup */}
            <div className="lg:col-span-5 bg-[#ffffff] border border-[#edd8d5] rounded-2xl p-6 space-y-4 shadow-md text-[#221417]">
              <div className="pb-3 border-b border-[#edd8d5]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8e273e] flex items-center gap-1.5 mb-1">
                  <Send className="w-3.5 h-3.5" />
                  <span>Outbound Lead Prospector</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#221417]">
                  Launch Client Acquisition Blitz
                </h3>
                <p className="text-xs text-[#705055] mt-1">
                  Generates omni-channel campaigns (SMS, Instagram DM, Email, TikTok Hook) to turn cold leads into booked salon appointments.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6e5e4e] uppercase tracking-wider mb-1">
                  Campaign Angle
                </label>
                <input
                  type="text"
                  value={outreachCampaign}
                  onChange={(e) => setOutreachCampaign(e.target.value)}
                  className="w-full px-3 py-2 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6e5e4e] uppercase tracking-wider mb-1">
                  Target Location / Metro
                </label>
                <input
                  type="text"
                  value={outreachLocation}
                  onChange={(e) => setOutreachLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6e5e4e] uppercase tracking-wider mb-1">
                  Promotional Incentive Code
                </label>
                <input
                  type="text"
                  value={outreachDiscount}
                  onChange={(e) => setOutreachDiscount(e.target.value)}
                  className="w-full px-3 py-2 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] focus:outline-none focus:border-[#8e273e]"
                />
              </div>

              <button
                onClick={handleGenerateOutreach}
                disabled={isGeneratingOutreach}
                className="w-full py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-[#ffffff] bg-gradient-to-r from-[#8e273e] to-[#8e273e] hover:from-[#9e2d46] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isGeneratingOutreach ? (
                  <>
                    <RefreshCw className="w-4 h-4 " />
                    <span>Generating Outreach Copy Kit...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Generate Multi-Channel Campaign</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Campaign Output & Simulated Send */}
            <div className="lg:col-span-7 bg-[#ffffff] border border-[#edd8d5] rounded-2xl p-6 space-y-5 shadow-md text-[#221417]">
              {!outreachResult ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#faf4f2] border border-[#edd8d5] mx-auto flex items-center justify-center text-[#8e273e]">
                    <Send className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#221417]">
                    StyleScout Lead Hunter Ready
                  </h4>
                  <p className="text-xs text-[#705055] max-w-sm mx-auto">
                    Click <strong>"Generate Multi-Channel Campaign"</strong> to activate StyleScout. It will output ready-to-dispatch SMS blasts, Instagram DMs, email newsletters, and TikTok hooks!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 ">
                  <div className="p-3 rounded-xl bg-[#faf4f2] border border-[#edd8d5] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#705055] block text-[10px] uppercase font-semibold">Strategy Forecast</span>
                      <span className="font-semibold text-[#221417]">{outreachResult.projectedBookings} Projected</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#705055] block text-[10px] uppercase font-semibold">Estimated Volume</span>
                      <span className="font-bold text-[#8e273e]">{outreachResult.projectedRevenue}</span>
                    </div>
                  </div>

                  {/* SMS Channel */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8e273e] block mb-1">
                      Direct SMS Blast Copy
                    </span>
                    <div className="p-3 bg-[#ffffff] rounded-lg border border-[#edd8d5] font-mono text-xs text-[#221417] leading-relaxed shadow-xs">
                      {outreachResult.channels?.sms}
                    </div>
                  </div>

                  {/* Instagram DM Sequence */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#705055] block mb-1">
                      Instagram & TikTok Direct Message Script
                    </span>
                    <div className="p-3 bg-[#ffffff] rounded-lg border border-[#edd8d5] text-xs text-[#705055] leading-relaxed shadow-xs">
                      {outreachResult.channels?.instagramDm}
                    </div>
                  </div>

                  {/* Viral TikTok / Reel Hook */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#705055] block mb-1">
                      Viral Video Hook Script
                    </span>
                    <div className="p-3 bg-[#ffffff] rounded-lg border border-[#edd8d5] text-xs text-[#705055] italic leading-relaxed shadow-xs">
                      "{outreachResult.channels?.reelsHookScript}"
                    </div>
                  </div>

                  {/* Execute Campaign Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => setCampaignDeployedSuccess(true)}
                      className={`w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        campaignDeployedSuccess
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'bg-gradient-to-r from-[#8e273e] to-[#8e273e] hover:from-[#9e2d46] text-[#ffffff] shadow-md'
                      }`}
                    >
                      {campaignDeployedSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Campaign Broadcasted to {leads.length + 80} Local Prospects!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Simulate Launch Campaign to Active Leads Pool</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: CROWN CONCIERGE LIVE AI */}
        {activeAgentTab === 'concierge' && (
          <div className="max-w-3xl mx-auto bg-[#ffffff] border border-[#edd8d5] rounded-2xl p-6 space-y-4 shadow-xl text-[#221417]">
            <div className="pb-3 border-b border-[#edd8d5] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#faf4f2] border border-[#8e273e] flex items-center justify-center text-[#8e273e]">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#221417]">
                    Princess AHB Crown Concierge
                  </h3>
                  <p className="text-[11px] text-[#705055]">
                    Live salon consultation & braider mentor powered by Gemini.
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Box */}
            <div className="h-80 overflow-y-auto space-y-3 p-3.5 rounded-xl bg-[#faf4f2] border border-[#edd8d5]">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-[#8e273e] to-[#8e273e] text-[#ffffff] font-medium shadow-sm'
                        : 'bg-[#ffffff] text-[#221417] border border-[#edd8d5] shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAskingConsultant && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-xl bg-[#ffffff] border border-[#edd8d5] text-xs text-[#705055] flex items-center gap-2 shadow-xs">
                    <RefreshCw className="w-3.5 h-3.5  text-[#8e273e]" />
                    <span>Artisan styling consultation in progress...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleAskConsultant} className="flex gap-2">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Ask about length timing, boho curls, edge care, or braider membership..."
                className="flex-1 px-4 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
              />
              <button
                type="submit"
                disabled={isAskingConsultant}
                className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#ffffff] bg-gradient-to-r from-[#8e273e] to-[#8e273e] hover:from-[#9e2d46] transition-all flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
