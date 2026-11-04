import React, { useState } from 'react';
import {
  BookOpen,
  Star,
  Download,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  X,
  ShieldCheck,
  DollarSign,
  Calculator,
  Lock,
  Eye,
  ArrowRight,
  TrendingUp,
  Play,
  Award,
  Clock,
  CreditCard,
  Smartphone,
  Check,
  Zap,
  ShoppingBag,
  Heart,
  BadgeCheck,
} from 'lucide-react';
import { DigitalProduct } from '../types';

interface DigitalShopProps {
  products: DigitalProduct[];
  onOpenProductForge: () => void;
  onOpenLeadMagnet: () => void;
  onOpenPaymentSetup?: () => void;
  onOpenCoursePlayer?: (course: DigitalProduct) => void;
}

export const DigitalShop: React.FC<DigitalShopProps> = ({
  products,
  onOpenProductForge,
  onOpenLeadMagnet,
  onOpenPaymentSetup,
  onOpenCoursePlayer,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'courses' | 'for-clients' | 'for-braiders' | 'templates'>('all');
  const [activeProductModal, setActiveProductModal] = useState<DigitalProduct | null>(null);
  const [quickBuyProduct, setQuickBuyProduct] = useState<DigitalProduct | null>(null);
  const [previewTab, setPreviewTab] = useState<'overview' | 'modules' | 'bonuses' | 'sample' | 'affiliate'>('overview');
  
  // Quick Checkout state
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'apple-pay' | 'card' | 'cashapp'>('apple-pay');
  const [isProcessingBuy, setIsProcessingBuy] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [purchasedProduct, setPurchasedProduct] = useState<DigitalProduct | null>(null);
  
  // Interactive tools
  const [calculatorGuidesSold, setCalculatorGuidesSold] = useState(3);
  const [calculatorPrice, setCalculatorPrice] = useState(35);
  const [copiedAffiliate, setCopiedAffiliate] = useState(false);
  const [downloadedSample, setDownloadedSample] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  // Filter products cleanly
  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'courses') return p.type === 'course' || p.category === 'Video Masterclasses';
    if (selectedFilter === 'for-clients') return p.targetAudienceType === 'for-clients' || p.category === 'Guides & Ebooks' || p.category === 'Scalp Health & Recipes';
    if (selectedFilter === 'for-braiders') return p.targetAudienceType === 'for-braiders' || p.category === 'Empty Chair Moneymakers';
    if (selectedFilter === 'templates') return p.category === 'Templates & Contracts' || p.type === 'template';
    return true;
  });

  // Featured flagship course (Bestseller for braiders & clients)
  const featuredCourse = products.find((p) => p.id === 'prod-braider-accelerator') || products[0];

  const handleStartQuickBuy = (product: DigitalProduct) => {
    setQuickBuyProduct(product);
    setCheckoutSuccess(false);
    setIsProcessingBuy(false);
  };

  const handleCompleteQuickBuy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerEmail || !quickBuyProduct) return;
    setIsProcessingBuy(true);
    setTimeout(() => {
      setIsProcessingBuy(false);
      setCheckoutSuccess(true);
      setPurchasedProduct(quickBuyProduct);
    }, 800);
  };

  const calculateMonthlyPassive = () => {
    return (calculatorGuidesSold * calculatorPrice * 30).toLocaleString();
  };

  return (
    <section className="bg-[#fcf6f2] text-[#221417] min-h-screen">
      {/* =========================================================================
          HERO COVER SHOWCASE: THE ACADEMY & DIGITAL CROWN VAULT
          Attractive editorial cover billboard making purchasing immediate & effortless
      ========================================================================= */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#250d13] via-[#3d111c] to-[#1c080d] text-white pt-12 pb-20 sm:pt-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#5a1a29]">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8e273e]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#fcd34d]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top Breadcrumb & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-rose-200">
              <span className="w-2 h-2 rounded-full bg-[#fcd34d] animate-pulse" />
              <span className="font-semibold tracking-wider uppercase text-[11px] text-[#fcd34d]">
                Princess AHB Hair Academy & Digital Crown Vault
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLeadMagnet}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-rose-100 hover:text-white border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#fcd34d]" />
                <span>Free 30-Day Crown Care Blueprint</span>
              </button>
              <button
                onClick={onOpenProductForge}
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#8e273e] to-[#b33955] text-white font-semibold transition-all hover:brightness-110 flex items-center gap-1.5 cursor-pointer shadow-md shadow-black/40"
              >
                <span>AI Course Generator</span>
              </button>
            </div>
          </div>

          {/* Billboard Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Compelling Sales Pitch & Instant CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8e273e]/60 border border-[#fcd34d]/40 text-[#fcd34d] text-xs font-bold tracking-wide">
                <Award className="w-3.5 h-3.5 text-[#fcd34d]" />
                <span>Accredited Masterclasses · Lifetime Access · Instant Download</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5.5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                Master Luxury Braiding & <br />
                <span className="bg-gradient-to-r from-[#fcd34d] via-[#fde68a] to-[#fcd34d] bg-clip-text text-transparent">
                  Crown Care at Home
                </span>
              </h1>

              <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed max-w-2xl">
                Whether you are a client looking to protect delicate edges and safely untangle braids with zero breakage, or an aspiring braider aiming to cut 2 hours off your knotless sets and build a 6-figure business—our instant masterclasses give you salon-tested techniques directly from master African braiders.
              </p>

              {/* Quick Perks Pill Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#fcd34d] shrink-0" />
                  <span className="text-xs text-rose-100 font-medium">1-Click Instant Access</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#fcd34d] shrink-0" />
                  <span className="text-xs text-rose-100 font-medium">Mobile & Tablet Ready</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#fcd34d] shrink-0" />
                  <span className="text-xs text-rose-100 font-medium">Official Certificate</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#fcd34d] shrink-0" />
                  <span className="text-xs text-rose-100 font-medium">Money-Back Guarantee</span>
                </div>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {featuredCourse && (
                  <button
                    onClick={() => handleStartQuickBuy(featuredCourse)}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#fcd34d] via-[#fbc726] to-[#f59e0b] hover:from-[#fde047] hover:to-[#d97706] text-[#250d13] text-sm font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-[#fcd34d]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-[#250d13] fill-[#250d13]" />
                    <span>Instant Buy Featured Masterclass · ${featuredCourse.price}</span>
                  </button>
                )}

                {featuredCourse && onOpenCoursePlayer && (
                  <button
                    onClick={() => onOpenCoursePlayer(featuredCourse)}
                    className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 text-[#fcd34d] fill-[#fcd34d]" />
                    <span>Watch Free Lesson Preview</span>
                  </button>
                )}
              </div>

              {/* Social Proof Trust Bar */}
              <div className="flex items-center gap-4 pt-2 text-xs text-rose-200/80">
                <div className="flex items-center -space-x-1.5">
                  <span className="w-6 h-6 rounded-full bg-[#8e273e] border border-white/40 flex items-center justify-center font-bold text-[10px] text-white">M</span>
                  <span className="w-6 h-6 rounded-full bg-[#fcd34d] border border-white/40 flex items-center justify-center font-bold text-[10px] text-black">A</span>
                  <span className="w-6 h-6 rounded-full bg-[#10b981] border border-white/40 flex items-center justify-center font-bold text-[10px] text-white">K</span>
                  <span className="w-6 h-6 rounded-full bg-[#3b82f6] border border-white/40 flex items-center justify-center font-bold text-[10px] text-white">D</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#fcd34d]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-white">5.0 / 5.0</span>
                  <span>· 3,420+ salon clients & stylists enrolled</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D High-Gloss Course Cover Showcase */}
            {featuredCourse && (
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group max-w-sm w-full">
                  {/* Decorative glowing card halo */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#fcd34d]/40 via-[#8e273e]/60 to-[#fcd34d]/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000" />

                  {/* 3D Course Cover Book Container */}
                  <div className="relative rounded-2xl overflow-hidden bg-[#2d1118] border-2 border-[#fcd34d]/60 shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">
                    {/* Cover Header Banner */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={featuredCourse.coverImage}
                        alt={featuredCourse.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2d1118] via-transparent to-black/30" />

                      {/* Official Certificate Ribbon */}
                      <div className="absolute top-3 left-3 bg-[#fcd34d] text-[#250d13] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                        <Award className="w-3 h-3 text-[#250d13]" />
                        <span>#1 Bestseller Course</span>
                      </div>

                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#fcd34d]" />
                        <span>{featuredCourse.videoDuration || '4h 20m HD'}</span>
                      </div>

                      {/* Bottom Image Overlay Strip */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                        <span className="bg-black/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/10 font-medium">
                          🎓 4 Core Modules + Video
                        </span>
                        <span className="bg-[#8e273e] text-[#fcd34d] font-bold px-2.5 py-1 rounded-md border border-[#fcd34d]/40">
                          Save ${featuredCourse.originalPrice ? featuredCourse.originalPrice - featuredCourse.price : 90}
                        </span>
                      </div>
                    </div>

                    {/* Cover Body */}
                    <div className="p-5 space-y-4">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#fcd34d] mb-1">
                          Official Video Masterclass
                        </div>
                        <h3 className="font-serif font-bold text-xl text-white leading-snug">
                          {featuredCourse.title}
                        </h3>
                        <p className="text-xs text-rose-200/80 mt-1 line-clamp-2">
                          {featuredCourse.subtitle}
                        </p>
                      </div>

                      {/* Curriculum Highlights */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-black/30 border border-white/10 text-xs">
                        <div className="font-semibold text-rose-200 text-[11px] uppercase tracking-wider">
                          What You Get Inside:
                        </div>
                        {featuredCourse.modules.slice(0, 3).map((mod, i) => (
                          <div key={i} className="flex items-center gap-2 text-rose-100/90 text-[11px]">
                            <Check className="w-3.5 h-3.5 text-[#fcd34d] shrink-0" />
                            <span className="truncate">{mod.title}</span>
                          </div>
                        ))}
                      </div>

                      {/* Pricing Row & 1-Click Buy CTA */}
                      <div className="pt-2 border-t border-white/15 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[10px] text-rose-300 uppercase tracking-wider">Full Instant Access</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-serif font-black text-[#fcd34d]">
                              ${featuredCourse.price}
                            </span>
                            {featuredCourse.originalPrice && (
                              <span className="text-sm text-rose-300/60 line-through">
                                ${featuredCourse.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleStartQuickBuy(featuredCourse)}
                          className="px-4 py-2.5 rounded-lg bg-[#fcd34d] hover:bg-[#fde047] text-[#250d13] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5 fill-[#250d13]" />
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          COURSE BROWSER & AUDIENCE SEGMENTATION
          Easy navigation tailored to both salon clients & aspiring braiders
      ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8e273e] mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Available Digital Playbooks & Masterclasses</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#221417]">
              Select Your Crown Guide or Masterclass
            </h2>
            <p className="text-xs sm:text-sm text-[#705055] mt-1">
              Choose from client protection protocols, emergency at-home untangling guides, and braider certifications.
            </p>
          </div>

          {/* Toggle Audience Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#edd8d5]/50 rounded-xl overflow-x-auto no-scrollbar">
            {[
              { id: 'all' as const, label: '✨ All Guides & Courses' },
              { id: 'for-clients' as const, label: '👑 For Clients (Hair Care & SOS)' },
              { id: 'for-braiders' as const, label: '✂️ For Braiders (Speed & Business)' },
              { id: 'courses' as const, label: '🎓 Video Masterclasses' },
              { id: 'templates' as const, label: '📋 Contracts & Kits' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-[#8e273e] text-white shadow-xs'
                    : 'text-[#705055] hover:text-[#221417] hover:bg-white/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            COURSE CARDS GRID: LUXURY COVER PRESENTATION WITH 1-CLICK PURCHASE
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredProducts.map((prod) => {
            const isClientFocus = prod.targetAudienceType === 'for-clients' || prod.id.includes('takedown') || prod.id.includes('vault') || prod.id.includes('recipe');
            
            return (
              <div
                key={prod.id}
                className="bg-white border border-[#edd8d5] rounded-2xl overflow-hidden hover:border-[#8e273e] transition-all flex flex-col group shadow-xs hover:shadow-xl hover:-translate-y-1 duration-300"
              >
                {/* Visual Cover Banner with Depth */}
                <div className="relative h-56 overflow-hidden bg-[#faf4f2]">
                  <img
                    src={prod.coverImage}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {prod.badge && (
                      <span className="px-2.5 py-0.5 rounded-md bg-white/95 backdrop-blur-sm border border-[#edd8d5] text-[#8e273e] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                        {prod.badge}
                      </span>
                    )}
                    {isClientFocus ? (
                      <span className="px-2 py-0.5 rounded-md bg-[#250d13]/90 text-[#fcd34d] text-[9px] font-bold uppercase tracking-wider border border-[#fcd34d]/40">
                        👑 For Salon Clients
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-[#8e273e]/90 text-white text-[9px] font-bold uppercase tracking-wider">
                        ✂️ Braider Certification
                      </span>
                    )}
                  </div>

                  {prod.certificateIncluded && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#fcd34d] text-[#250d13] text-[10px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1">
                      <Award className="w-3 h-3 text-[#250d13]" />
                      <span>Certificate</span>
                    </span>
                  )}

                  {/* Rating & Enrolled count bottom bar */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded text-[11px]">
                      <Download className="w-3 h-3 text-[#fcd34d]" />
                      {prod.downloadsCount.toLocaleString()} happy students
                    </span>
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[11px] font-semibold text-[#fcd34d]">
                      <Star className="w-3 h-3 fill-[#fcd34d] text-[#fcd34d]" />
                      {prod.rating} ({prod.ratingCount})
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold text-[#8e273e] uppercase tracking-wider">
                        {prod.type === 'course' ? '🎓 Video Masterclass' : '📖 Instant Download Guide'}
                      </span>
                      {prod.videoDuration && (
                        <span className="text-[10px] text-[#705055] font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {prod.videoDuration}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#221417] group-hover:text-[#8e273e] transition-colors leading-snug">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-[#705055] line-clamp-2 mt-1 leading-relaxed">
                      {prod.subtitle}
                    </p>
                  </div>

                  {/* Key Highlights / Curriculum Preview */}
                  <div className="p-3 rounded-xl bg-[#faf4f2] border border-[#edd8d5] space-y-1.5 text-[11px]">
                    <div className="font-bold text-[#221417] text-[10px] uppercase tracking-wider flex items-center justify-between">
                      <span>Course Modules Included:</span>
                      <span className="text-[#8e273e]">{prod.modules.length} parts</span>
                    </div>
                    {prod.modules.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[#503a40] truncate">
                        <Check className="w-3 h-3 text-[#8e273e] shrink-0" />
                        <span className="truncate">{m.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Row & 1-Click Buy Buttons */}
                  <div className="pt-3 border-t border-[#edd8d5] flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-serif font-black text-[#8e273e]">
                          ${prod.price}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-xs text-[#9d7d83] line-through">
                            ${prod.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold block">
                        Instant Delivery
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveProductModal(prod);
                          setPreviewTab('overview');
                        }}
                        className="px-2.5 py-2 text-xs font-semibold text-[#503a40] hover:text-[#8e273e] hover:bg-[#faf4f2] rounded-lg border border-[#edd8d5] transition-colors cursor-pointer"
                        title="View Full Curriculum"
                      >
                        Preview
                      </button>

                      {prod.type === 'course' && onOpenCoursePlayer && (
                        <button
                          onClick={() => onOpenCoursePlayer(prod)}
                          className="px-2.5 py-2 text-xs font-bold text-[#8e273e] bg-[#fdf2f4] hover:bg-[#f0c5cd] rounded-lg transition-colors cursor-pointer border border-[#f0c5cd] flex items-center gap-1"
                          title="Open Interactive Student Classroom"
                        >
                          <Play className="w-3 h-3 fill-[#8e273e]" />
                          <span>Watch</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleStartQuickBuy(prod)}
                        className="px-3.5 py-2 rounded-lg bg-[#8e273e] hover:bg-[#721e31] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 text-[#fcd34d] fill-[#fcd34d]" />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            SOCIAL PROOF & REVIEWS SECTION
        ========================================================================= */}
        <div className="mb-16 bg-white border border-[#edd8d5] rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8e273e]">
              Student & Client Love Stories
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#221417] mt-1">
              Loved by Salon Clients & Braiders Nationwide
            </h3>
            <p className="text-xs sm:text-sm text-[#705055] mt-1.5">
              See how our digital guides and courses save hair edges, eliminate takedown pain, and empower braiders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#faf4f2] border border-[#edd8d5] space-y-3">
              <div className="flex text-[#fcd34d]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#503a40] italic leading-relaxed">
                &ldquo;The Emergency At-Home Takedown Guide literally saved my edges when I had to unbraid at midnight for work. The buildup melt recipe worked in 10 minutes with zero pain and zero shedding!&rdquo;
              </p>
              <div className="pt-2 border-t border-[#edd8d5] flex items-center justify-between text-xs">
                <div>
                  <strong className="text-[#221417] block font-serif">Maya Jenkins</strong>
                  <span className="text-[11px] text-[#705055]">Client · Baton Rouge, LA</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Buyer
                </span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#faf4f2] border border-[#edd8d5] space-y-3">
              <div className="flex text-[#fcd34d]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#503a40] italic leading-relaxed">
                &ldquo;The Speed Mechanics Masterclass transformed my braiding career. I cut 1 hour and 45 minutes off my waist-length knotless sets, stopped having wrist pain, and gained 6 new repeat clients!&rdquo;
              </p>
              <div className="pt-2 border-t border-[#edd8d5] flex items-center justify-between text-xs">
                <div>
                  <strong className="text-[#221417] block font-serif">Dominique Reynolds</strong>
                  <span className="text-[11px] text-[#705055]">Stylist · Richmond, VA</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Graduate
                </span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#faf4f2] border border-[#edd8d5] space-y-3">
              <div className="flex text-[#fcd34d]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#503a40] italic leading-relaxed">
                &ldquo;I bought the Botanical Crown Elixirs manual and started bottling my own rosemary-batana edge drops. My clients purchase a bottle at almost every single takedown appointment!&rdquo;
              </p>
              <div className="pt-2 border-t border-[#edd8d5] flex items-center justify-between text-xs">
                <div>
                  <strong className="text-[#221417] block font-serif">Keisha Washington</strong>
                  <span className="text-[11px] text-[#705055]">Salon Suite Owner · Atlanta, GA</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Buyer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECONDARY: BRAIDER PASSIVE REVENUE SIMULATOR (EXPANDABLE)
        ========================================================================= */}
        <div className="mb-12 bg-white border border-[#edd8d5] rounded-2xl overflow-hidden shadow-xs">
          <div
            onClick={() => setShowCalculator(!showCalculator)}
            className="p-6 flex items-center justify-between cursor-pointer hover:bg-[#faf4f2]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fdf2f4] text-[#8e273e] flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5 text-[#8e273e]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#221417]">
                  Are You a Braider? Calculate How Much You Can Earn Selling Digital Guides
                </h3>
                <p className="text-xs text-[#705055]">
                  Make money when chairs are empty by recommending hair maintenance playbooks and vendor lists.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="px-3 py-1.5 rounded-lg border border-[#edd8d5] text-xs font-semibold text-[#8e273e] hover:bg-[#fdf2f4]"
            >
              {showCalculator ? 'Hide Calculator' : 'Open Calculator'}
            </button>
          </div>

          {showCalculator && (
            <div className="p-6 sm:p-8 border-t border-[#edd8d5] bg-[#faf4f2]/40">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-xs sm:text-sm text-[#705055] leading-relaxed">
                    By sharing your digital guide or vendor list link on your Instagram bio, TikTok, or client WhatsApp group, you make money around the clock without physical hand fatigue.
                  </p>

                  {/* Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[#221417] mb-1.5">
                        <span>Digital Downloads Per Day:</span>
                        <span className="text-[#8e273e] font-bold">{calculatorGuidesSold} sales/day</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="15"
                        value={calculatorGuidesSold}
                        onChange={(e) => setCalculatorGuidesSold(parseInt(e.target.value, 10))}
                        className="w-full accent-[#8e273e] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-[#9d7d83] mt-1">
                        <span>1/day</span>
                        <span>15/day</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[#221417] mb-1.5">
                        <span>Average Product Price:</span>
                        <span className="text-[#8e273e] font-bold">${calculatorPrice}</span>
                      </div>
                      <input
                        type="range"
                        min="17"
                        max="129"
                        step="2"
                        value={calculatorPrice}
                        onChange={(e) => setCalculatorPrice(parseInt(e.target.value, 10))}
                        className="w-full accent-[#8e273e] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-[#9d7d83] mt-1">
                        <span>$17</span>
                        <span>$129</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Projected Revenue Card */}
                <div className="lg:col-span-5 bg-gradient-to-br from-white via-white to-[#fdf2f4] rounded-xl p-6 border border-[#edd8d5] text-center flex flex-col items-center justify-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8e273e] mb-1">
                    Projected Monthly Passive Profit
                  </span>
                  <div className="text-4xl sm:text-5xl font-serif font-bold text-[#221417] my-2">
                    ${calculateMonthlyPassive()}
                    <span className="text-sm font-sans font-normal text-[#705055]">/mo</span>
                  </div>
                  <p className="text-xs text-[#705055] max-w-xs mt-1">
                    Zero hair braiding required. Pure profit deposited into your bank account while your chair sits empty.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Merchant Payout & Automation Banner */}
        {onOpenPaymentSetup && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#fff9f6] via-[#fdf2f4] to-[#faf4f2] border border-[#f0c5cd] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8e273e] text-white flex items-center justify-center shrink-0 shadow-sm">
                <DollarSign className="w-5 h-5 text-[#fcd34d]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#221417]">
                  What Do I Need to Get Paid for Courses & Salon Appointments?
                </h4>
                <p className="text-xs text-[#705055]">
                  Step-by-step checklist for bank direct deposit, Acuity $50 deposits & Virginia text payments
                </p>
              </div>
            </div>
            <button
              onClick={onOpenPaymentSetup}
              className="px-4 py-2 bg-[#8e273e] hover:bg-[#721e31] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>View Get Paid Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          FAST 1-CLICK QUICK BUY CHECKOUT MODAL
          Makes it frictionless for clients to complete purchase in under 30 seconds
      ========================================================================= */}
      {quickBuyProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-[#edd8d5] shadow-2xl relative">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#250d13] to-[#45101c] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#fcd34d] fill-[#fcd34d]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#fcd34d]">
                  1-Click Express Checkout
                </span>
              </div>
              <button
                onClick={() => setQuickBuyProduct(null)}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {checkoutSuccess ? (
                /* Successful Purchase State */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif font-bold text-[#221417]">
                      Access Successfully Unlocked!
                    </h4>
                    <p className="text-xs sm:text-sm text-[#705055] mt-1.5">
                      Your purchase of <strong>{quickBuyProduct.title}</strong> is complete. A receipt and lifetime access link were sent to <strong>{buyerEmail}</strong>.
                    </p>
                  </div>

                  {/* Immediate Download & Interactive Classroom Launchers */}
                  <div className="p-4 rounded-xl bg-[#faf4f2] border border-[#edd8d5] space-y-3">
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href =
                          'data:text/plain;charset=utf-8,' +
                          encodeURIComponent(
                            `PRINCESS AHB LUXURY ACADEMY - OFFICIAL PRODUCT LICENSE\n=======================================================\nProduct: ${quickBuyProduct.title}\nLicensed To: ${buyerName || 'Valued Student'}\nEmail: ${buyerEmail}\nOrder Ref: PAHB-${Date.now().toString().slice(-6)}\nAccess URL: https://princessahb.com/vault/${quickBuyProduct.id}\n\nThank you for choosing Princess AHB. Keep your crown healthy and protected!`
                          );
                        link.download = `${quickBuyProduct.id}-access-license.txt`;
                        link.click();
                      }}
                      className="w-full py-3 rounded-xl bg-[#8e273e] hover:bg-[#721e31] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Study Guide & Canva Assets (PDF)</span>
                    </button>

                    {quickBuyProduct.type === 'course' && onOpenCoursePlayer && (
                      <button
                        onClick={() => {
                          const course = quickBuyProduct;
                          setQuickBuyProduct(null);
                          onOpenCoursePlayer(course);
                        }}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#fcd34d] to-[#f59e0b] hover:from-[#fde047] text-[#250d13] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-[#250d13]" />
                        <span>Launch Interactive Classroom Now</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setQuickBuyProduct(null)}
                    className="text-xs font-semibold text-[#705055] hover:text-[#221417] underline cursor-pointer"
                  >
                    Done & Return to Academy
                  </button>
                </div>
              ) : (
                /* Checkout Form */
                <form onSubmit={handleCompleteQuickBuy} className="space-y-4">
                  {/* Selected Product Summary Box */}
                  <div className="flex gap-4 p-3.5 rounded-xl bg-[#faf4f2] border border-[#edd8d5]">
                    <img
                      src={quickBuyProduct.coverImage}
                      alt={quickBuyProduct.title}
                      className="w-20 h-20 rounded-lg object-cover border border-[#edd8d5] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#8e273e] uppercase tracking-wider">
                        {quickBuyProduct.category}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-[#221417] truncate">
                        {quickBuyProduct.title}
                      </h4>
                      <p className="text-[11px] text-[#705055] line-clamp-1 mt-0.5">
                        {quickBuyProduct.subtitle}
                      </p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-lg font-serif font-bold text-[#8e273e]">
                          ${quickBuyProduct.price}
                        </span>
                        {quickBuyProduct.originalPrice && (
                          <span className="text-xs text-[#9d7d83] line-through">
                            ${quickBuyProduct.originalPrice}
                          </span>
                        )}
                        <span className="text-[10px] text-emerald-700 font-bold ml-auto">
                          100% Instant Delivery
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-xs font-bold text-[#221417] mb-1.5">
                      Select Payment Method:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('apple-pay')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                          paymentMethod === 'apple-pay'
                            ? 'border-[#8e273e] bg-[#fdf2f4] text-[#8e273e] ring-1 ring-[#8e273e]'
                            : 'border-[#edd8d5] bg-white text-[#503a40] hover:bg-[#faf4f2]'
                        }`}
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Apple Pay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                          paymentMethod === 'card'
                            ? 'border-[#8e273e] bg-[#fdf2f4] text-[#8e273e] ring-1 ring-[#8e273e]'
                            : 'border-[#edd8d5] bg-white text-[#503a40] hover:bg-[#faf4f2]'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Card / Google</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cashapp')}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                          paymentMethod === 'cashapp'
                            ? 'border-[#8e273e] bg-[#fdf2f4] text-[#8e273e] ring-1 ring-[#8e273e]'
                            : 'border-[#edd8d5] bg-white text-[#503a40] hover:bg-[#faf4f2]'
                        }`}
                      >
                        <DollarSign className="w-4 h-4" />
                        <span>Cash App Pay</span>
                      </button>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#221417] mb-1">
                        Email Address <span className="text-rose-600">*</span> (For instant download & receipts)
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. client@example.com"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#edd8d5] text-xs bg-white text-[#221417] focus:outline-none focus:ring-2 focus:ring-[#8e273e]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#221417] mb-1">
                        Student / Client Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Maya Jenkins"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#edd8d5] text-xs bg-white text-[#221417] focus:outline-none focus:ring-2 focus:ring-[#8e273e]"
                      />
                    </div>
                  </div>

                  {/* Trust Guarantee Box */}
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#faf4f2] text-[11px] text-[#705055]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>256-bit encrypted checkout. Instant digital delivery with 14-day refund guarantee.</span>
                  </div>

                  {/* Final Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessingBuy}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#9e2d46] hover:to-[#7f2036] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98 disabled:opacity-50"
                  >
                    {isProcessingBuy ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Authorizing Digital Vault...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Pay ${quickBuyProduct.price} & Unlock Instant Access</span>
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DETAILED COURSE PREVIEW & LOOK-INSIDE MODAL
      ========================================================================= */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#edd8d5] shadow-2xl relative">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-5 border-b border-[#edd8d5] flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#fdf2f4] text-[#8e273e] text-[10px] font-bold uppercase tracking-wider border border-[#f0c5cd]">
                  {activeProductModal.category}
                </span>
                <span className="text-xs text-[#705055]">Instant Digital Access</span>
              </div>
              <button
                onClick={() => setActiveProductModal(null)}
                className="p-1.5 rounded-full hover:bg-[#faf4f2] text-[#705055] hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="flex gap-4">
                <img
                  src={activeProductModal.coverImage}
                  alt={activeProductModal.title}
                  className="w-24 h-24 rounded-xl object-cover border border-[#edd8d5] shrink-0"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#221417]">
                    {activeProductModal.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#705055] mt-1 leading-relaxed">
                    {activeProductModal.subtitle}
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#edd8d5] text-xs font-semibold overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setPreviewTab('overview')}
                  className={`pb-2.5 px-3 whitespace-nowrap cursor-pointer ${
                    previewTab === 'overview'
                      ? 'border-b-2 border-[#8e273e] text-[#8e273e]'
                      : 'text-[#503a40] hover:text-black'
                  }`}
                >
                  Overview & Value
                </button>
                <button
                  onClick={() => setPreviewTab('sample')}
                  className={`pb-2.5 px-3 whitespace-nowrap cursor-pointer ${
                    previewTab === 'sample'
                      ? 'border-b-2 border-[#8e273e] text-[#8e273e]'
                      : 'text-[#503a40] hover:text-black'
                  }`}
                >
                  📖 Look Inside (Sample)
                </button>
                <button
                  onClick={() => setPreviewTab('modules')}
                  className={`pb-2.5 px-3 whitespace-nowrap cursor-pointer ${
                    previewTab === 'modules'
                      ? 'border-b-2 border-[#8e273e] text-[#8e273e]'
                      : 'text-[#503a40] hover:text-black'
                  }`}
                >
                  Curriculum ({activeProductModal.modules.length} Modules)
                </button>
                <button
                  onClick={() => setPreviewTab('bonuses')}
                  className={`pb-2.5 px-3 whitespace-nowrap cursor-pointer ${
                    previewTab === 'bonuses'
                      ? 'border-b-2 border-[#8e273e] text-[#8e273e]'
                      : 'text-[#503a40] hover:text-black'
                  }`}
                >
                  Bonuses ({activeProductModal.bonuses.length})
                </button>
                <button
                  onClick={() => setPreviewTab('affiliate')}
                  className={`pb-2.5 px-3 whitespace-nowrap cursor-pointer ${
                    previewTab === 'affiliate'
                      ? 'border-b-2 border-[#8e273e] text-[#8e273e]'
                      : 'text-[#503a40] hover:text-black'
                  }`}
                >
                  💸 Earn 30% Royalty
                </button>
              </div>

              {/* Tab Contents */}
              {previewTab === 'overview' && (
                <div className="space-y-4 text-xs sm:text-sm text-[#705055] leading-relaxed">
                  <p>{activeProductModal.description}</p>
                  {activeProductModal.passiveIncomeEstimate && (
                    <div className="p-4 rounded-xl bg-[#fdf2f4] border border-[#f0c5cd]">
                      <div className="font-bold text-[#221417] mb-1">
                        💰 Projected Revenue for Stylists
                      </div>
                      <p className="text-xs text-[#705055]">
                        This resource is engineered to generate <strong className="text-[#8e273e]">{activeProductModal.passiveIncomeEstimate}</strong> when deployed to your social media or client base on days when you do not have salon appointments.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {previewTab === 'sample' && (
                <div className="space-y-3.5">
                  <div className="p-4 rounded-xl bg-[#faf4f2] border border-[#edd8d5] text-xs text-[#221417] space-y-2.5 leading-relaxed font-serif">
                    <div className="text-[10px] font-sans uppercase font-bold tracking-wider text-[#8e273e]">
                      Verified Excerpt from Chapter 1
                    </div>
                    <h5 className="font-bold text-sm text-[#221417]">
                      &ldquo;The Crown Preservation Method: Safe Detangling Before Water Hits the Scalp&rdquo;
                    </h5>
                    <p className="italic text-[#705055]">
                      &ldquo;When hair sits inside protective styles for 6 to 8 weeks, the daily 50 to 100 shed strands remain safely wrapped around the braid anchor point. If water is sprayed onto dry shed knots, the keratin contracts and forms stubborn microscopic matting. The secret is the slip melt protocol: saturate each base with organic coconut and marshmallow root cream, finger-slide the extension out, and pre-finger-detangle completely before shampooing...&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#9d7d83]">Includes full protocol + editable Canva files</span>
                    <button
                      type="button"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(
                          `PRINCESS AHB - SAMPLE EXCERPT: ${activeProductModal.title}\n\nChapter 1 Summary: The Crown Preservation Formula.\nDownload full guide at https://princessahb.com/shop`
                        );
                        link.download = `${activeProductModal.id}-sample-excerpt.txt`;
                        link.click();
                        setDownloadedSample(true);
                      }}
                      className="px-3 py-1.5 rounded-md bg-white border border-[#edd8d5] text-xs font-semibold text-[#8e273e] hover:bg-[#faf4f2] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{downloadedSample ? '✓ Sample Saved' : 'Download Free Sample'}</span>
                    </button>
                  </div>
                </div>
              )}

              {previewTab === 'affiliate' && (
                <div className="p-4 rounded-xl bg-[#fdf2f4] border border-[#f0c5cd] space-y-3 text-xs text-[#705055]">
                  <div className="font-bold text-sm text-[#221417]">
                    Stylist & Client Affiliate Partner Program
                  </div>
                  <p>
                    Share this guide with your braiding peers or clients. Every time someone buys through your unique link, you receive <strong className="text-[#8e273e]">30% commission (${Math.round(activeProductModal.price * 0.30)}/sale)</strong> directly to your Cash App, Zelle, or PayPal!
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      readOnly
                      value={`https://princessahb.com/shop?ref=vip_braider&product=${activeProductModal.id}`}
                      className="flex-1 px-3 py-2 bg-white border border-[#edd8d5] rounded-md text-[11px] font-mono text-[#503a40]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText?.(`https://princessahb.com/shop?ref=vip_braider&product=${activeProductModal.id}`);
                        setCopiedAffiliate(true);
                        setTimeout(() => setCopiedAffiliate(false), 3000);
                      }}
                      className="px-3.5 py-2 bg-[#8e273e] text-white rounded-md font-bold text-xs hover:bg-[#721e31] transition-colors cursor-pointer shrink-0"
                    >
                      {copiedAffiliate ? '✓ Copied Link' : 'Copy My Link'}
                    </button>
                  </div>
                </div>
              )}

              {previewTab === 'modules' && (
                <div className="space-y-3">
                  {activeProductModal.modules.map((m, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#faf4f2] border border-[#edd8d5]">
                      <div className="font-bold text-xs text-[#221417]">{m.title}</div>
                      <div className="text-xs text-[#705055] mt-1">{m.summary}</div>
                    </div>
                  ))}
                </div>
              )}

              {previewTab === 'bonuses' && (
                <div className="space-y-2.5">
                  {activeProductModal.bonuses.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#221417] p-2.5 rounded-lg bg-[#faf4f2] border border-[#edd8d5]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons in Modal Footer */}
              <div className="pt-4 border-t border-[#edd8d5] flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-serif font-bold text-[#8e273e]">
                    ${activeProductModal.price}
                  </span>
                  {activeProductModal.originalPrice && (
                    <span className="text-xs text-[#9d7d83] line-through">
                      ${activeProductModal.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {activeProductModal.type === 'course' && onOpenCoursePlayer && (
                    <button
                      type="button"
                      onClick={() => {
                        const course = activeProductModal;
                        setActiveProductModal(null);
                        onOpenCoursePlayer(course);
                      }}
                      className="px-3 py-2 bg-[#faebea] hover:bg-[#f0c5cd] text-[#8e273e] rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#8e273e]" />
                      <span>Launch Player</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const prod = activeProductModal;
                      setActiveProductModal(null);
                      handleStartQuickBuy(prod);
                    }}
                    className="px-5 py-2 rounded-lg bg-[#8e273e] hover:bg-[#721e31] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#fcd34d] fill-[#fcd34d]" />
                    <span>Proceed to 1-Click Buy (${activeProductModal.price})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
