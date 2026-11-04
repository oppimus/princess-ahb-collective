export interface BraidingService {
  id: string;
  name: string;
  category: 'knotless' | 'twists' | 'french_curls' | 'cornrows' | 'locs' | 'specialty' | 'box_braids' | 'feeding' | 'hair_loss' | 'men' | 'individual' | string;
  price: number;
  durationHours: number;
  description: string;
  imageUrl: string;
  popular?: boolean;
  hairIncluded: boolean;
  lengthOptions: { name: string; addPrice: number }[];
  sizeOptions: { name: string; addPrice: number }[];
  recommendedMaintenanceWeeks: number;
}

export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  summary: string;
  keyTakeaways: string[];
  actionItem: string;
  isFreePreview?: boolean;
}

export interface StudentCertificate {
  studentName: string;
  courseTitle: string;
  completionDate: string;
  certificateNumber: string;
  instructorName: string;
  salonLocation: string;
}

export interface PaymentChecklistItem {
  id: string;
  title: string;
  category: 'bank' | 'acuity' | 'square' | 'stripe' | 'cashapp_zelle' | 'booth_rent';
  description: string;
  requiredInfo: string[];
  actionLinkText?: string;
  actionUrl?: string;
  completed: boolean;
}

export interface DigitalProduct {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: 'Guides & Ebooks' | 'Video Masterclasses' | 'Braider Business' | 'Scalp Health & Recipes' | 'Empty Chair Moneymakers' | 'Templates & Contracts';
  type: 'ebook' | 'course' | 'template' | 'audio' | 'toolkit' | 'bundle';
  downloadsCount: number;
  rating: number;
  ratingCount: number;
  coverImage: string;
  description: string;
  modules: { title: string; summary: string }[];
  bonuses: string[];
  isLeadMagnet?: boolean;
  downloadUrl?: string;
  badge?: string;
  targetAudienceType?: 'for-braiders' | 'for-clients' | 'all';
  passiveIncomeEstimate?: string;
  videoDuration?: string;
  lessonsCount?: number;
  certificateIncluded?: boolean;
  interactiveLessons?: CourseLesson[];
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredStyle: string;
  source: string;
  dateCreated: string;
  status: 'New Lead' | 'Nurtured' | 'Booked Client' | 'VIP';
  estimatedValue: number;
  lastMessageSent?: string;
}

export interface ReferralConversion {
  id: string;
  friendName: string;
  friendPhone?: string;
  serviceName: string;
  bookingDate: string;
  status: 'Completed' | 'Confirmed' | 'Deposit Paid';
  rewardAmount: number; // e.g. $25 salon credit
  loyaltyPointsAwarded: number; // e.g. 150 points
  creditedAt: string;
}

export interface ReferralStats {
  referralCode: string;
  referralLink: string;
  totalShares: number;
  clicks: number;
  conversionsCount: number;
  totalCreditsEarned: number;
  conversions: ReferralConversion[];
}

export interface CRMClient {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastVisitDate: string;
  weeksSinceVisit: number;
  lastStyle: string;
  totalSpent: number;
  appointmentsCount: number;
  vipTier: 'Bronze' | 'Silver' | 'Gold VIP' | 'Diamond Crown';
  hairNotes: string;
  status: 'Healthy Window' | 'Takedown Due' | 'Overdue (Retention Alert)' | 'Re-booked';
  lastOutreachDate?: string;
  loyaltyPoints: number;
  nextBookingCredit?: number;
  referralCode?: string;
  referralStats?: ReferralStats;
}

export interface BraiderProfile {
  id: string;
  name: string;
  handle: string;
  title: string;
  city: string;
  state: string;
  bio: string;
  specialties: string[];
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  chairType: 'Salon Chair Partner' | 'Independent Suite' | 'Mobile Master';
  commissionRate: number;
  experienceYears: number;
  portfolioImages: string[];
  weeklyBookings: number;
  digitalRoyaltiesEarned: number;
}

export interface BookingRequest {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceId: string;
  serviceName: string;
  stylistId: string;
  stylistName: string;
  location: string;
  date: string;
  timeSlot: string;
  lengthOption: string;
  sizeOption: string;
  addOns: string[];
  depositPaid: number;
  totalAmount: number;
  status: 'Confirmed' | 'Pending' | 'Completed';
  createdAt: string;
  referralCodeUsed?: string;
  referralDiscountApplied?: number;
}

export interface PhysicalProduct {
  id: string;
  name: string;
  category: 'Hairs' | 'Beauty Supplies' | 'African Clothes' | 'Scalp Oils' | 'Accessories' | string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  description: string;
  inStock: boolean;
  isComingSoon?: boolean;
  comingSoonDate?: string;
  upsellStyleId?: string; // Links to a specific braiding style for auto-upsell
  badge?: string;
  subcategory?: string;
  sizes?: string[];
  colors?: string[];
}

export interface StylistApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  locationPreference: 'Baton Rouge, LA' | 'Virginia' | 'Either / Traveling';
  roleInterest: 'Commission Stylist' | 'Booth Rental' | 'Braiding Assistant' | 'Master Stylist';
  experienceYears: number;
  specialties: string[];
  portfolioUrl?: string;
  instagramOrTiktok?: string;
  availability: 'Full-time' | 'Part-time' | 'Weekends only' | 'Flexible';
  whyJoin: string;
  appliedAt: string;
  status: 'Pending Review' | 'Interview Scheduled' | 'Approved';
}

export interface BoothRentalStation {
  id: string;
  title: string;
  location: string;
  type: 'Weekly Private Station' | 'Part-Time Weekend Chair' | 'Daily Drop-in Station';
  priceDisplay: string;
  pricePerPeriod: number;
  period: 'week' | 'day' | 'month';
  availableSpots: number;
  description: string;
  amenities: string[];
  features: string[];
  popular?: boolean;
}

export interface AdPromotion {
  id: string;
  title: string;
  headline: string;
  subtext: string;
  badge: string;
  ctaText: string;
  actionType: 'hire-stylist' | 'booth-rental' | 'boutique-hairs' | 'boutique-clothes' | 'booking' | 'lead-magnet';
  targetCategory?: string;
  discountCode?: string;
  imageUrl?: string;
  bgGradient: string;
}

export interface HealthyHairTip {
  id: string;
  title: string;
  category: 'Night Care' | 'Moisture & Oils' | 'Edge Defense' | 'Takedown & Wash' | 'Tension Relief';
  shortSummary: string;
  detailedAdvice: string;
  iconName: string;
  frequency: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualDiscountPrice: number;
  popular?: boolean;
  tagline: string;
  perks: string[];
  monthlyGift: string;
  estimatedYearlySavings: number;
}

export interface FlashSpecial {
  id: string;
  serviceId: string;
  serviceName: string;
  stylistId: string;
  stylistName: string;
  stylistAvatar: string;
  location: string;
  date: string;
  dateLabel: string;
  timeSlot: string;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  spotsLeft: number;
  reason: string;
  badge: string;
}

export interface SignatureLookbookStyle {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  startingPrice: number;
  durationHours: number;
  description: string;
  hairIncluded: boolean;
  popular?: boolean;
  badge?: string;
  imageUrl: string;
}

export interface CustomLookConfig {
  styleId: string;
  styleName: string;
  lengthName: string;
  lengthInches: number;
  sizeName: string;
  colorCode: string;
  colorName: string;
  curlFinish: string;
  isSpeedSquad: boolean;
  totalPrice: number;
  depositAmount: number;
  estimatedHours: number;
  imageUrl: string;
}

export interface TransformationStory {
  id: string;
  clientName: string;
  location: string;
  clientChallenge: string;
  styleAchieved: string;
  beforeImage: string;
  afterImage: string;
  rating: number;
  reviewQuote: string;
  hairLengthBefore: string;
  sessionTimeHours: number;
  braiderName: string;
  tensionLevel: string;
  date: string;
}

export interface SanctuaryAmenity {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface OfficialAppointmentType {
  id: string;
  category: string;
  name: string;
  durationString: string;
  durationMinutes: number;
  durationHours: number;
  price: number;
  description?: string;
  badge?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  verifiedBadge: string;
  avatarUrl?: string;
  location: string;
  category: 'all' | 'short_hair' | 'tender_scalp' | 'postpartum_edges' | 'speed_squad';
  categoryLabel: string;
  styleAchieved: string;
  clientChallenge: string;
  beforeImage: string;
  afterImage: string;
  beforeCaption: string;
  afterCaption: string;
  rating: number;
  reviewTitle: string;
  reviewQuote: string;
  sessionTimeHours: number;
  braiderName: string;
  tensionLevel: string;
  date: string;
  helpfulCount: number;
  perksExperienced: string[];
}

export interface ClientAppointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceId: string;
  serviceName: string;
  lengthOption: string;
  sizeOption: string;
  stylistId: string;
  stylistName: string;
  stylistAvatar?: string;
  location: string;
  date: string;
  timeSlot: string;
  status: 'Upcoming' | 'Completed' | 'Rescheduled' | 'Cancelled';
  totalAmount: number;
  depositPaid: number;
  remainingBalance: number;
  pointsEarned: number;
  hairNotes?: string;
  specialRequests?: string;
  addOns?: string[];
  reviewSubmitted?: boolean;
  reviewRating?: number;
  reviewText?: string;
}

export interface LoyaltyRewardOption {
  id: string;
  title: string;
  pointsCost: number;
  discountValue: number;
  description: string;
  category: 'Discount' | 'Free Service' | 'Exclusive Perk';
  badge?: string;
}
