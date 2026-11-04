import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HomeFlowNav } from './components/HomeFlowNav';
import { SignatureLookbook12 } from './components/SignatureLookbook12';
import { EmptyChairFlashSpecials } from './components/EmptyChairFlashSpecials';
import { LeadMagnetSection } from './components/LeadMagnetSection';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { StyleMenu } from './components/StyleMenu';
import { BookingModal } from './components/BookingModal';
import { DigitalShop } from './components/DigitalShop';
import { CrownCareBoutique } from './components/CrownCareBoutique';
import { VIPMembershipSection } from './components/VIPMembershipSection';
import { ScalpAndTakedownClinic } from './components/ScalpAndTakedownClinic';
import { AutonomousAgentsHub } from './components/AutonomousAgentsHub';
import { BraidersNetwork } from './components/BraidersNetwork';
import { StyleGallery } from './components/StyleGallery';
import { CollectiveDiscoveryHub } from './components/CollectiveDiscoveryHub';
import { Footer } from './components/Footer';
import { StylistHiringModal } from './components/StylistHiringModal';
import { BoothRentalModal } from './components/BoothRentalModal';
import { SiteAdBanner } from './components/SiteAdBanner';
import { PaymentSetupModal } from './components/PaymentSetupModal';
import { InteractiveCoursePlayerModal } from './components/InteractiveCoursePlayerModal';
import { MobileAppDock } from './components/MobileAppDock';
import { VirtualBraidStudio } from './components/VirtualBraidStudio';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { CrownGuaranteeAndSanctuary } from './components/CrownGuaranteeAndSanctuary';
import { LiveBookingRadar } from './components/LiveBookingRadar';
import { StylistChatConcierge } from './components/StylistChatConcierge';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CustomerProfileModal } from './components/CustomerProfileModal';
import { ClientPortal } from './components/ClientPortal';
import {
  INITIAL_SERVICES,
  INITIAL_DIGITAL_PRODUCTS,
  INITIAL_PHYSICAL_PRODUCTS,
  INITIAL_CRM_CLIENTS,
  INITIAL_BRAIDERS,
  INITIAL_LEADS,
  INITIAL_FLASH_SPECIALS,
  INITIAL_CLIENT_APPOINTMENTS,
} from './data/mockData';
import { BraidingService, DigitalProduct, PhysicalProduct, CRMClient, BraiderProfile, Lead, BookingRequest, FlashSpecial, ReferralConversion, ClientAppointment } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'services' | 'clinic' | 'boutique' | 'digital-shop' | 'vip-club' | 'agents-hub' | 'braiders-network' | 'gallery' | 'client-portal'>('services');
  
  // App State
  const [services, setServices] = useState<BraidingService[]>(INITIAL_SERVICES);
  const [digitalProducts, setDigitalProducts] = useState<DigitalProduct[]>(INITIAL_DIGITAL_PRODUCTS);
  const [physicalProducts, setPhysicalProducts] = useState<PhysicalProduct[]>(INITIAL_PHYSICAL_PRODUCTS);
  const [crmClients, setCrmClients] = useState<CRMClient[]>(INITIAL_CRM_CLIENTS);
  const [braiders, setBraiders] = useState<BraiderProfile[]>(INITIAL_BRAIDERS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [flashSpecials, setFlashSpecials] = useState<FlashSpecial[]>(INITIAL_FLASH_SPECIALS);
  const [appointments, setAppointments] = useState<ClientAppointment[]>(INITIAL_CLIENT_APPOINTMENTS);

  // Modals & Booking Parameters
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<BraidingService | null>(null);
  const [selectedLengthForBooking, setSelectedLengthForBooking] = useState<number>(0);
  const [selectedSizeForBooking, setSelectedSizeForBooking] = useState<number>(0);
  const [selectedBraiderForBooking, setSelectedBraiderForBooking] = useState<string>('');
  const [selectedDateForBooking, setSelectedDateForBooking] = useState<string>('');
  const [selectedTimeSlotForBooking, setSelectedTimeSlotForBooking] = useState<string>('');
  const [discountPromoAmountForBooking, setDiscountPromoAmountForBooking] = useState<number>(0);
  const [promoBadgeTextForBooking, setPromoBadgeTextForBooking] = useState<string>('');
  const [isLeadMagnetModalOpen, setIsLeadMagnetModalOpen] = useState(false);
  const [isHiringModalOpen, setIsHiringModalOpen] = useState(false);
  const [isBoothRentalModalOpen, setIsBoothRentalModalOpen] = useState(false);
  const [isPaymentSetupOpen, setIsPaymentSetupOpen] = useState(false);
  const [isCustomerProfileOpen, setIsCustomerProfileOpen] = useState(false);
  const [selectedCourseForPlayer, setSelectedCourseForPlayer] = useState<DigitalProduct | null>(null);
  const [isCoursePlayerOpen, setIsCoursePlayerOpen] = useState(false);
  const [boutiqueInitialCategory, setBoutiqueInitialCategory] = useState<string>('All');

  // Handlers
  const handleOpenCoursePlayer = (course: DigitalProduct) => {
    setSelectedCourseForPlayer(course);
    setIsCoursePlayerOpen(true);
  };

  const handleBookCustomLook = (
    service: BraidingService,
    lengthIdx: number,
    sizeIdx: number,
    braiderId?: string,
    notes?: string
  ) => {
    handleOpenBooking(
      service,
      lengthIdx,
      sizeIdx,
      braiderId,
      '',
      '',
      0,
      notes || 'Custom Virtual Studio Look'
    );
  };

  const handleReplicateTransformation = (styleName: string) => {
    const matched = services.find((s) => s.name.toLowerCase().includes(styleName.toLowerCase())) || services[0];
    handleOpenBooking(matched, 0, 0, '', '', '', 0, 'Replicating Verified Transformation');
  };

  const handleOpenPaymentSetup = () => {
    setIsPaymentSetupOpen(true);
  };
  const handleOpenBoutiqueHairs = () => {
    setBoutiqueInitialCategory('Hairs');
    setActiveTab('boutique');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBoutiqueClothes = () => {
    setBoutiqueInitialCategory('African Clothes');
    setActiveTab('boutique');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleOpenBooking = (
    service?: BraidingService,
    lengthIdx: number = 0,
    sizeIdx: number = 0,
    braiderId: string = '',
    date: string = '',
    timeSlot: string = '',
    discountPromo: number = 0,
    promoBadge: string = ''
  ) => {
    setSelectedServiceForBooking(service || services[0]);
    setSelectedLengthForBooking(lengthIdx);
    setSelectedSizeForBooking(sizeIdx);
    setSelectedBraiderForBooking(braiderId);
    setSelectedDateForBooking(date);
    setSelectedTimeSlotForBooking(timeSlot);
    setDiscountPromoAmountForBooking(discountPromo);
    setPromoBadgeTextForBooking(promoBadge);
    setIsBookingModalOpen(true);
  };

  const handleClaimFlashSpecial = (special: FlashSpecial) => {
    const matchingService = services.find((s) => s.id === special.serviceId) || services[0];
    handleOpenBooking(
      matchingService,
      0,
      0,
      special.stylistId,
      special.date,
      special.timeSlot,
      special.savings,
      special.badge
    );
  };

  const handleBookingConfirmed = (booking: BookingRequest) => {
    const existing = crmClients.find((c) => c.phone === booking.clientPhone);
    if (!existing) {
      const newClient: CRMClient = {
        id: `client-${Date.now()}`,
        name: booking.clientName,
        phone: booking.clientPhone,
        email: booking.clientEmail,
        lastVisitDate: booking.date,
        weeksSinceVisit: 0,
        lastStyle: `${booking.serviceName} (${booking.lengthOption})`,
        totalSpent: booking.totalAmount,
        appointmentsCount: 1,
        vipTier: 'Bronze',
        hairNotes: `Booked with ${booking.stylistName} at ${booking.location}`,
        status: 'Healthy Window',
        loyaltyPoints: Math.round(booking.totalAmount) + 100, // 100 bonus pts for first appointment
        nextBookingCredit: 25, // $25 Next-Time Booking Credit Incentive
      };
      setCrmClients((prev) => [newClient, ...prev]);
    } else {
      const updatedCount = existing.appointmentsCount + 1;
      const updatedTotalSpent = existing.totalSpent + booking.totalAmount;
      const updatedPoints = (existing.loyaltyPoints || 0) + Math.round(booking.totalAmount) + 50; // Points per dollar + 50 pts visit bonus
      const updatedTier: CRMClient['vipTier'] =
        updatedTotalSpent >= 1000
          ? 'Diamond Crown'
          : updatedTotalSpent >= 600
          ? 'Gold VIP'
          : updatedTotalSpent >= 300
          ? 'Silver'
          : 'Bronze';

      const updatedClient: CRMClient = {
        ...existing,
        lastVisitDate: booking.date,
        weeksSinceVisit: 0,
        lastStyle: `${booking.serviceName} (${booking.lengthOption})`,
        totalSpent: updatedTotalSpent,
        appointmentsCount: updatedCount,
        vipTier: updatedTier,
        status: 'Re-booked',
        loyaltyPoints: updatedPoints,
        nextBookingCredit: 25,
      };
      handleUpdateCRMClient(updatedClient);
    }

    // Add to live client appointments state
    const newAppointmentRecord: ClientAppointment = {
      id: booking.id || `appt-${Date.now()}`,
      clientId: existing ? existing.id : `client-${Date.now()}`,
      clientName: booking.clientName,
      clientPhone: booking.clientPhone,
      clientEmail: booking.clientEmail,
      serviceId: booking.serviceId,
      serviceName: booking.serviceName,
      lengthOption: booking.lengthOption,
      sizeOption: booking.sizeOption,
      stylistId: booking.stylistId,
      stylistName: booking.stylistName,
      location: booking.location,
      date: booking.date,
      timeSlot: booking.timeSlot,
      status: 'Upcoming',
      totalAmount: booking.totalAmount,
      depositPaid: booking.depositPaid,
      remainingBalance: booking.totalAmount - booking.depositPaid,
      pointsEarned: Math.round(booking.totalAmount),
      addOns: booking.addOns,
    };
    setAppointments((prev) => [newAppointmentRecord, ...prev]);

    // Automatically reconcile & track referral conversions in the CRM
    if (booking.referralCodeUsed) {
      const cleanRef = booking.referralCodeUsed.trim().toUpperCase();
      const referrer = crmClients.find(
        (c) =>
          c.referralCode?.toUpperCase() === cleanRef ||
          c.referralStats?.referralCode?.toUpperCase() === cleanRef
      );

      if (referrer) {
        const refStats = referrer.referralStats || {
          referralCode: cleanRef,
          referralLink: `https://princessahb.com/book?ref=${cleanRef}`,
          totalShares: 4,
          clicks: 12,
          conversionsCount: 0,
          totalCreditsEarned: 0,
          conversions: [],
        };

        const newConversion: ReferralConversion = {
          id: `ref-conv-${Date.now()}`,
          friendName: booking.clientName,
          friendPhone: booking.clientPhone,
          serviceName: booking.serviceName,
          bookingDate: booking.date,
          status: 'Confirmed',
          rewardAmount: 25,
          loyaltyPointsAwarded: 150,
          creditedAt: new Date().toISOString().split('T')[0],
        };

        const updatedReferrer: CRMClient = {
          ...referrer,
          nextBookingCredit: (referrer.nextBookingCredit || 0) + 25,
          loyaltyPoints: (referrer.loyaltyPoints || 0) + 150,
          referralStats: {
            ...refStats,
            conversionsCount: (refStats.conversionsCount || 0) + 1,
            totalCreditsEarned: (refStats.totalCreditsEarned || 0) + 25,
            conversions: [newConversion, ...(refStats.conversions || [])],
          },
        };

        handleUpdateCRMClient(updatedReferrer);
      }
    }
  };

  const handleLeadCaptured = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleUpdateCRMClient = (updated: CRMClient) => {
    setCrmClients((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const handlePublishDigitalProduct = (product: DigitalProduct) => {
    setDigitalProducts((prev) => [product, ...prev]);
  };

  const handleAddBraider = (newBraider: BraiderProfile) => {
    setBraiders((prev) => [newBraider, ...prev]);
  };

  const handleSelectForEstimator = (styleName: string) => {
    const matched = services.find((s) => s.name.toLowerCase().includes(styleName.toLowerCase())) || services[0];
    handleOpenBooking(matched);
  };

  return (
    <div className="min-h-screen bg-[#fcf6f2] text-[#221417] flex flex-col font-sans selection:bg-[#8e273e] selection:text-[#ffffff]">
      {/* Skip to main content accessibility link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#8e273e] focus:text-white focus:rounded-lg focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#fcd34d] font-bold text-xs uppercase tracking-wider transition-all"
      >
        Skip to main content
      </a>

      {/* Top Header - Uncluttered with animated hair tips */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
        onOpenLeadMagnet={() => setIsLeadMagnetModalOpen(true)}
        onOpenHiringModal={() => setIsHiringModalOpen(true)}
        onOpenBoothRentalModal={() => setIsBoothRentalModalOpen(true)}
        onOpenPaymentSetup={handleOpenPaymentSetup}
        onOpenCustomerProfile={() => setIsCustomerProfileOpen(true)}
        digitalCartCount={0}
      />

      {/* Main Content Area - Mobile friendly with padding for persistent dock */}
      <main id="main-content" className="flex-1 pb-20 md:pb-0">
        {/* Flawless Sub-Page Breadcrumb Navigation */}
        {activeTab !== 'services' && (
          <div className="bg-[#ffffff] border-b border-[#edd8d5] py-3 px-4 sm:px-8 shadow-2xs">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <button
                onClick={() => setActiveTab('services')}
                className="text-xs font-semibold text-[#8e273e] hover:text-[#221417] flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>← Return to Salon Home</span>
              </button>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#705055] uppercase tracking-wider font-semibold hidden sm:inline">
                  Active Section:
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#faebea] border border-[#f0c5cd] text-xs font-serif font-bold text-[#8e273e] capitalize">
                  {activeTab.replace('-', ' ')}
                </span>
                <button
                  onClick={() => handleOpenBooking()}
                  className="px-3 py-1 bg-[#8e273e] text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-[#781e32] transition-colors"
                >
                  Book Chair
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <>
            {/* Live Chair Urgency & Real-Time Booking Pulse Ticker */}
            <LiveBookingRadar
              onOpenBooking={() => handleOpenBooking()}
              onOpenLeadMagnet={() => setIsLeadMagnetModalOpen(true)}
            />

            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onOpenLeadMagnet={() => setIsLeadMagnetModalOpen(true)}
              onExploreAgents={() => setActiveTab('agents-hub')}
              onExploreDigitalShop={() => setActiveTab('digital-shop')}
              onOpenBoutique={() => setActiveTab('boutique')}
              onOpenVIP={() => setActiveTab('vip-club')}
              onExploreStudio={() => {
                const el = document.getElementById('virtual-braid-studio');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Featured Advertisements & Recruitment Ribbon (Ads on site) */}
            <SiteAdBanner
              onHireStylist={() => setIsHiringModalOpen(true)}
              onBoothRental={() => setIsBoothRentalModalOpen(true)}
              onOpenBoutiqueHairs={handleOpenBoutiqueHairs}
              onOpenBoutiqueClothes={handleOpenBoutiqueClothes}
              onOpenBooking={() => handleOpenBooking()}
              onOpenLeadMagnet={() => setIsLeadMagnetModalOpen(true)}
            />

            {/* Sticky Flow Navigation for smooth in-page jumping */}
            <HomeFlowNav onOpenBooking={() => handleOpenBooking()} />

            {/* WOW FACTOR 1: Interactive Virtual Braid Studio & 360° Custom Crown Builder */}
            <VirtualBraidStudio
              services={services}
              onBookCustomLook={handleBookCustomLook}
              onOpenLeadMagnet={() => setIsLeadMagnetModalOpen(true)}
            />

            {/* 12 Signature Master Styles Portfolio (User Reference Lookbook) */}
            <SignatureLookbook12
              onSelectForEstimator={handleSelectForEstimator}
              onOpenBookingModal={handleOpenBooking}
            />

            {/* Testimonials Carousel: Verified Client Success Stories & Before-and-After Photo Highlights */}
            <TestimonialsSection
              onOpenBooking={() => handleOpenBooking()}
              onReplicateLook={handleReplicateTransformation}
            />

            {/* WOW FACTOR 2: Interactive Before & After Transformation Proof */}
            <BeforeAfterSlider
              onReplicateTransformation={handleReplicateTransformation}
              onOpenBooking={() => handleOpenBooking()}
            />

            {/* WOW FACTOR 3: 100% Zero-Tension Crown Guarantee & VIP Sanctuary Amenities */}
            <CrownGuaranteeAndSanctuary
              onOpenBooking={() => handleOpenBooking()}
              onOpenVIP={() => setActiveTab('vip-club')}
            />

            {/* Style Menu Showcase & Interactive Pricing Estimator */}
            <StyleMenu
              services={services}
              onSelectServiceForBooking={(svc, lenIdx, szIdx) => handleOpenBooking(svc, lenIdx, szIdx)}
            />

            {/* Empty Chair Recovery: Squeeze-In Flash Specials */}
            <EmptyChairFlashSpecials
              specials={flashSpecials}
              services={services}
              onClaimChair={handleClaimFlashSpecial}
              onJoinAlertList={() => setIsLeadMagnetModalOpen(true)}
            />

            {/* Princess AHB Collective Suites (Replaces duplicate components on homepage) */}
            <CollectiveDiscoveryHub
              onSelectTab={setActiveTab}
              digitalProductsCount={digitalProducts.length}
            />
          </>
        )}

        {activeTab === 'clinic' && (
          <ScalpAndTakedownClinic
            onOpenBooking={() => handleOpenBooking()}
            onSelectService={(name, price) => {
              const tempSvc: BraidingService = {
                id: `rescue-${Date.now()}`,
                name,
                category: 'specialty',
                price,
                durationHours: 1,
                description: 'Dedicated scalp and follicle recovery treatment.',
                imageUrl: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80',
                hairIncluded: false,
                lengthOptions: [{ name: 'Standard Session', addPrice: 0 }],
                sizeOptions: [{ name: 'Standard Treatment', addPrice: 0 }],
                recommendedMaintenanceWeeks: 4,
              };
              handleOpenBooking(tempSvc);
            }}
          />
        )}

        {activeTab === 'boutique' && (
          <CrownCareBoutique
            products={physicalProducts}
            onOpenBooking={() => handleOpenBooking()}
            onOpenHiringModal={() => setIsHiringModalOpen(true)}
            onOpenBoothRentalModal={() => setIsBoothRentalModalOpen(true)}
            initialCategory={boutiqueInitialCategory}
          />
        )}

        {activeTab === 'digital-shop' && (
          <DigitalShop
            products={digitalProducts}
            onOpenProductForge={() => setActiveTab('agents-hub')}
            onOpenLeadMagnet={() => setIsLeadMagnetModalOpen(true)}
            onOpenPaymentSetup={handleOpenPaymentSetup}
            onOpenCoursePlayer={handleOpenCoursePlayer}
          />
        )}

        {activeTab === 'vip-club' && (
          <VIPMembershipSection onOpenBooking={() => handleOpenBooking()} />
        )}

        {activeTab === 'agents-hub' && (
          <AutonomousAgentsHub
            crmClients={crmClients}
            onUpdateClient={handleUpdateCRMClient}
            onPublishProduct={handlePublishDigitalProduct}
            leads={leads}
            onAddOutreachResult={(notes) => console.log('Outreach logged:', notes)}
            onOpenPaymentSetup={handleOpenPaymentSetup}
          />
        )}

        {activeTab === 'braiders-network' && (
          <BraidersNetwork
            braiders={braiders}
            onAddBraider={handleAddBraider}
            onOpenBooking={() => handleOpenBooking()}
            onOpenHiringModal={() => setIsHiringModalOpen(true)}
            onOpenBoothRentalModal={() => setIsBoothRentalModalOpen(true)}
          />
        )}

        {activeTab === 'gallery' && (
          <StyleGallery onOpenBooking={() => handleOpenBooking()} />
        )}

        {activeTab === 'client-portal' && (
          <ClientPortal
            crmClients={crmClients}
            appointments={appointments}
            onUpdateClient={handleUpdateCRMClient}
            onUpdateAppointments={setAppointments}
            onOpenBooking={handleOpenBooking}
            services={services}
            braiders={braiders}
            onOpenLeadMagnet={() => setIsLeadMagnetModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenLeadMagnet={() => setIsLeadMagnetModalOpen(true)}
        setActiveTab={setActiveTab}
        onOpenHiringModal={() => setIsHiringModalOpen(true)}
        onOpenBoothRentalModal={() => setIsBoothRentalModalOpen(true)}
        onOpenPaymentSetup={handleOpenPaymentSetup}
      />

      {/* Booking Modal with Connected Estimator & Squeeze-In Parameters */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        services={services}
        braiders={braiders}
        crmClients={crmClients}
        initialService={selectedServiceForBooking}
        initialLengthIdx={selectedLengthForBooking}
        initialSizeIdx={selectedSizeForBooking}
        initialBraiderId={selectedBraiderForBooking}
        initialDate={selectedDateForBooking}
        initialTimeSlot={selectedTimeSlotForBooking}
        discountPromoAmount={discountPromoAmountForBooking}
        promoBadgeText={promoBadgeTextForBooking}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* Customer Profile & Refer-a-Friend Modal */}
      <CustomerProfileModal
        isOpen={isCustomerProfileOpen}
        onClose={() => setIsCustomerProfileOpen(false)}
        crmClients={crmClients}
        onUpdateClient={handleUpdateCRMClient}
        onOpenBookingWithCredit={(credit, promoText) =>
          handleOpenBooking(services[0], 0, 0, '', '', '', credit, promoText)
        }
      />

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isLeadMagnetModalOpen}
        onClose={() => setIsLeadMagnetModalOpen(false)}
        onLeadCaptured={handleLeadCaptured}
      />

      {/* Stylist Hiring Application Modal */}
      <StylistHiringModal
        isOpen={isHiringModalOpen}
        onClose={() => setIsHiringModalOpen(false)}
        onApplicationSubmitted={(newApp) => {
          console.log('Stylist application received:', newApp);
        }}
      />

      {/* Booth Rental Opportunities Modal */}
      <BoothRentalModal
        isOpen={isBoothRentalModalOpen}
        onClose={() => setIsBoothRentalModalOpen(false)}
        onOpenStylistApplication={() => setIsHiringModalOpen(true)}
      />

      {/* Payment & Merchant Setup Modal ("What do I need to get paid?") */}
      <PaymentSetupModal
        isOpen={isPaymentSetupOpen}
        onClose={() => setIsPaymentSetupOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
        onOpenCourses={() => {
          setActiveTab('digital-shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Interactive Course Player & Classroom Modal ("Make sure courses are ready") */}
      <InteractiveCoursePlayerModal
        isOpen={isCoursePlayerOpen}
        onClose={() => setIsCoursePlayerOpen(false)}
        course={selectedCourseForPlayer}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating 'Chat with Stylist' AI Concierge Component */}
      <StylistChatConcierge
        onOpenBooking={handleOpenBooking}
        services={services}
      />

      {/* Persistent Mobile Bottom Navigation Dock ("Improve more the mobile app") */}
      <MobileAppDock
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPaymentSetup={handleOpenPaymentSetup}
        onOpenHiringModal={() => setIsHiringModalOpen(true)}
        onOpenBoothRentalModal={() => setIsBoothRentalModalOpen(true)}
        onOpenLeadMagnet={() => setIsLeadMagnetModalOpen(true)}
        onOpenCustomerProfile={() => setIsCustomerProfileOpen(true)}
      />
    </div>
  );
}
