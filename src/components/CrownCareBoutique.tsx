import React, { useState } from 'react';
import {
  ShoppingBag,
  Star,
  Plus,
  CheckCircle2,
  X,
  Truck,
  ShieldCheck,
  Heart,
  Search,
  Filter,
  Sparkles,
  Key,
  Users,
  ArrowRight,
  Clock,
  Bell,
  Mail,
  Check,
} from 'lucide-react';
import { PhysicalProduct } from '../types';
import { INITIAL_PHYSICAL_PRODUCTS, CONTACT_INFO } from '../data/mockData';

export interface CrownCareBoutiqueProps {
  products?: PhysicalProduct[];
  onOpenBooking?: () => void;
  onOpenHiringModal?: () => void;
  onOpenBoothRentalModal?: () => void;
  initialCategory?: string;
}

export const CrownCareBoutique: React.FC<CrownCareBoutiqueProps> = ({
  products: propProducts,
  onOpenBooking,
  onOpenHiringModal,
  onOpenBoothRentalModal,
  initialCategory = 'All',
}) => {
  const allProducts = propProducts && propProducts.length > 0 ? propProducts : INITIAL_PHYSICAL_PRODUCTS;
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'ship' | 'pickup-baton-rouge' | 'pickup-va'>('ship');
  const [selectedSizes, setSelectedSizes] = useState<{ [id: string]: string }>({});
  const [selectedColors, setSelectedColors] = useState<{ [id: string]: string }>({});

  // Coming Soon Waitlist modal state
  const [waitlistProduct, setWaitlistProduct] = useState<PhysicalProduct | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistPhone, setWaitlistPhone] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const categories = [
    'All',
    'Hairs',
    'Beauty Supplies',
    'African Clothes',
    'Scalp Oils',
    'Accessories',
  ];

  // Helper to test if product is coming soon
  const isProductComingSoon = (p: PhysicalProduct): boolean => {
    if (p.isComingSoon) return true;
    const cat = p.category.toLowerCase();
    return cat === 'beauty supplies' || cat === 'scalp oils' || cat.includes('oil');
  };

  // Helper to test if category is coming soon
  const isCategoryComingSoon = (cat: string): boolean => {
    const c = cat.toLowerCase();
    return c === 'beauty supplies' || c === 'scalp oils' || c === 'hair and scalp oil';
  };

  // Filtering
  const filtered = allProducts.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: string) => {
    const product = allProducts.find((p) => p.id === productId);
    if (product && isProductComingSoon(product)) {
      setWaitlistProduct(product);
      setWaitlistSubmitted(false);
      return;
    }
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[productId] > 1) {
        next[productId] -= 1;
      } else {
        delete next[productId];
      }
      return next;
    });
  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalCartAmount = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = allProducts.find((p) => p.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingEmail) return;
    if (deliveryMethod === 'ship' && !shippingAddress) return;
    setOrderConfirmed(true);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistSubmitted(true);
  };

  return (
    <section id="boutiques" className="py-16 sm:py-20 bg-[#fcf6f2] text-[#221417] border-t border-[#edd8d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f4] border border-[#f0c5cd] text-[#8e273e] text-xs font-semibold tracking-wider uppercase shadow-xs">
              <ShoppingBag className="w-3.5 h-3.5 text-[#8e273e]" />
              <span>Princess AHB Boutiques</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#221417]">
              The Boutiques. <br />
              <span className="italic text-[#8e273e] font-serif">
                Hairs, Beauty Supplies & African Clothes.
              </span>
            </h2>
            <p className="text-sm text-[#705055] leading-relaxed">
              Shop salon-grade human hair bundles for knotless & boho styles, pro beauty supplies & edge waxes, authentic hand-tailored African wax dresses, and ancestral Honduran Batana hair & scalp oils.
            </p>
          </div>

          {/* Cart & Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onOpenBoothRentalModal && (
              <button
                onClick={onOpenBoothRentalModal}
                className="px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#781e32] bg-[#ffffff] border border-[#edd8d5] hover:border-[#8e273e] hover:bg-[#faebea] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Key className="w-3.5 h-3.5 text-[#8e273e]" />
                <span className="hidden sm:inline">Booth Rental</span>
              </button>
            )}

            {onOpenHiringModal && (
              <button
                onClick={onOpenHiringModal}
                className="px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#781e32] bg-[#ffffff] border border-[#edd8d5] hover:border-[#8e273e] hover:bg-[#faebea] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Users className="w-3.5 h-3.5 text-[#8e273e]" />
                <span className="hidden sm:inline">We're Hiring</span>
              </button>
            )}

            <button
              onClick={() => setIsCartModalOpen(true)}
              className="px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#9e2d46] transition-all flex items-center gap-2 shadow-lg shadow-[#8e273e]/20 cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag ({totalCartCount})</span>
              {totalCartAmount > 0 && (
                <span className="ml-1 font-mono text-[#fcd34d]">${totalCartAmount}</span>
              )}
            </button>
          </div>
        </div>

        {/* =========================================================================
            COMING SOON BOUTIQUE HIGHLIGHT BANNER
            Clearly announces the upcoming official drop for Beauty Supplies and Hair & Scalp Oils
        ========================================================================= */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2a0e14] via-[#42131d] to-[#1c080d] text-white border border-[#fcd34d]/40 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#fcd34d]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#fcd34d] text-[#221417] flex items-center justify-center shrink-0 shadow-md">
                <Clock className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#fcd34d] text-[#221417] font-black uppercase tracking-wider">
                    Coming Soon
                  </span>
                  <span className="text-xs font-bold text-[#fcd34d]">
                    Official Boutique Drop · Launching Soon
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                  Beauty Supplies & Hair & Scalp Oils Collection
                </h3>
                <p className="text-xs text-rose-100/80 leading-relaxed max-w-2xl mt-0.5">
                  Our salon-grade 48-hour glass edge controls, carbon parting combs, anti-frizz tension mousses, and raw wildcrafted Honduran Batana oils are currently in production. Sign up for first-access VIP notifications & a 15% launch voucher.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const sampleProduct = allProducts.find(
                  (p) => p.category === 'Beauty Supplies' || p.category === 'Scalp Oils'
                ) || allProducts[0];
                setWaitlistProduct(sampleProduct);
                setWaitlistSubmitted(false);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#fcd34d] to-[#f59e0b] hover:from-[#fde047] text-[#221417] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer shrink-0 transition-transform active:scale-95"
            >
              <Bell className="w-3.5 h-3.5 fill-[#221417]" />
              <span>Get Launch VIP Alert</span>
            </button>
          </div>
        </div>

        {/* Studio Opportunities Banner (Recruitment & Booth Rental Inside Boutiques) */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#faebea] via-[#ffffff] to-[#faebea] border border-[#f0c5cd] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8e273e] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5 text-[#fcd34d]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8e273e]">
                  Stylist Opportunities
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#8e273e] text-white font-bold">
                  Baton Rouge & VA
                </span>
              </div>
              <p className="text-xs text-[#543b3f] mt-0.5">
                Join our team with a <strong>$500 signing bonus</strong> or rent your own hydraulic booth station from <strong>$175/week</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            {onOpenHiringModal && (
              <button
                onClick={onOpenHiringModal}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[#8e273e] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#781e32] transition-colors cursor-pointer"
              >
                Apply as Stylist
              </button>
            )}
            {onOpenBoothRentalModal && (
              <button
                onClick={onOpenBoothRentalModal}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[#ffffff] border border-[#edd8d5] text-[#8e273e] text-xs font-bold uppercase tracking-wider hover:bg-[#faebea] transition-colors cursor-pointer"
              >
                Booth Rental Info
              </button>
            )}
          </div>
        </div>

        {/* Search & Categories Bar */}
        <div className="space-y-4 mb-10 pb-6 border-b border-[#edd8d5]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#9d7d83] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hairs, combs, edge control, dresses, batana..."
                className="w-full pl-10 pr-8 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-xl text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e] shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9d7d83] hover:text-[#221417]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs text-[#705055] font-semibold text-right">
              Showing <strong className="text-[#8e273e]">{filtered.length}</strong> items in Boutiques
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const isCatComingSoon = isCategoryComingSoon(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] text-white font-bold shadow-md shadow-[#8e273e]/20'
                      : 'bg-[#ffffff] text-[#705055] hover:text-[#221417] hover:bg-[#faf4f2] border border-[#edd8d5]'
                  }`}
                >
                  {cat === 'Hairs' && '💇‍♀️ '}
                  {cat === 'Beauty Supplies' && '✨ '}
                  {cat === 'African Clothes' && '👗 '}
                  {cat === 'Scalp Oils' && '🌿 '}
                  {cat === 'Accessories' && '👑 '}
                  <span>{cat}</span>
                  {isCatComingSoon && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider ${
                        isSelected
                          ? 'bg-[#fcd34d] text-[#221417]'
                          : 'bg-[#fdf2f4] text-[#8e273e] border border-[#f0c5cd]'
                      }`}
                    >
                      Coming Soon
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-[#ffffff] rounded-2xl border border-[#edd8d5] space-y-3">
            <ShoppingBag className="w-12 h-12 text-[#9d7d83] mx-auto opacity-50" />
            <h3 className="font-serif font-bold text-lg text-[#221417]">
              No boutique products found
            </h3>
            <p className="text-xs text-[#705055]">
              Try adjusting your search terms or select another boutique category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#8e273e] text-white text-xs font-bold uppercase rounded-lg"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
            {filtered.map((prod) => {
              const isComingSoon = isProductComingSoon(prod);

              return (
                <div
                  key={prod.id}
                  className={`bg-[#ffffff] border rounded-2xl overflow-hidden transition-all flex flex-col justify-between group shadow-xs hover:shadow-md ${
                    isComingSoon
                      ? 'border-[#f0c5cd] hover:border-[#8e273e]'
                      : 'border-[#edd8d5] hover:border-[#8e273e]'
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-stone-100">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                    {/* Badge top-left */}
                    <div className="absolute top-3 left-3 flex flex-col items-start gap-1">
                      {isComingSoon ? (
                        <span className="px-2.5 py-1 rounded bg-[#fcd34d] text-[#221417] text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Coming Soon</span>
                        </span>
                      ) : prod.badge ? (
                        <span className="px-2.5 py-1 rounded bg-[#8e273e] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                          {prod.badge}
                        </span>
                      ) : null}
                    </div>

                    {/* Stock / Availability Indicator bottom */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded border border-white/20">
                        <Star className="w-3 h-3 fill-[#fcd34d] text-[#fcd34d]" />
                        {prod.rating} ({prod.reviewsCount})
                      </span>
                      {isComingSoon ? (
                        <span className="text-[10px] bg-amber-950/80 text-amber-300 border border-amber-500/40 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Coming Soon · Drops Soon</span>
                        </span>
                      ) : (
                        <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-bold px-2 py-0.5 rounded">
                          In Stock · Ships Same Day
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-[#8e273e] uppercase font-bold tracking-wider mb-1">
                        <span className="flex items-center gap-1">
                          <span>{prod.category}</span>
                          {isComingSoon && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#fdf2f4] text-[#8e273e] border border-[#f0c5cd] font-black">
                              Coming Soon
                            </span>
                          )}
                        </span>
                        {prod.subcategory && (
                          <span className="text-[#9d7d83] lowercase font-normal italic">
                            ({prod.subcategory})
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif font-bold text-lg text-[#221417] group-hover:text-[#8e273e] transition-colors leading-snug mb-2">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-[#705055] leading-relaxed line-clamp-3">
                        {prod.description}
                      </p>

                      {/* Sizes selection for Clothes */}
                      {prod.sizes && prod.sizes.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-[#edd8d5]/60">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#503a40] block mb-1.5">
                            Available Size:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {prod.sizes.map((sz) => {
                              const isChosen = (selectedSizes[prod.id] || prod.sizes![0]) === sz;
                              return (
                                <button
                                  type="button"
                                  key={sz}
                                  onClick={() =>
                                    setSelectedSizes((prev) => ({ ...prev, [prod.id]: sz }))
                                  }
                                  className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition-all cursor-pointer ${
                                    isChosen
                                      ? 'bg-[#8e273e] text-white border-[#8e273e]'
                                      : 'bg-[#faf4f2] text-[#705055] border-[#edd8d5] hover:border-[#8e273e]'
                                  }`}
                                >
                                  {sz}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Colors selection for Hair products */}
                      {prod.colors && prod.colors.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-[#edd8d5]/60">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#503a40] block mb-1.5">
                            Color Blend:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {prod.colors.map((col) => {
                              const isChosen = (selectedColors[prod.id] || prod.colors![0]) === col;
                              return (
                                <button
                                  type="button"
                                  key={col}
                                  onClick={() =>
                                    setSelectedColors((prev) => ({ ...prev, [prod.id]: col }))
                                  }
                                  className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition-all cursor-pointer ${
                                    isChosen
                                      ? 'bg-[#8e273e] text-white border-[#8e273e]'
                                      : 'bg-[#faf4f2] text-[#705055] border-[#edd8d5] hover:border-[#8e273e]'
                                  }`}
                                >
                                  {col}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#edd8d5] flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-serif font-bold text-[#8e273e]">
                            ${prod.price}
                          </span>
                          {prod.originalPrice && (
                            <span className="text-xs text-[#9d7d83] line-through">
                              ${prod.originalPrice}
                            </span>
                          )}
                        </div>
                        {isComingSoon && (
                          <span className="text-[10px] text-amber-700 font-bold block">
                            Reserve Pre-Order Spot
                          </span>
                        )}
                      </div>

                      {isComingSoon ? (
                        <button
                          onClick={() => {
                            setWaitlistProduct(prod);
                            setWaitlistSubmitted(false);
                          }}
                          className="py-2.5 px-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#221417] bg-[#fcd34d] hover:bg-[#fde047] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                        >
                          <Bell className="w-3.5 h-3.5 fill-[#221417]" />
                          <span>Coming Soon · Notify Me</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => addToCart(prod.id)}
                          className="py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#9e2d46] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Free Shipping & Quality Guarantee Bar */}
        <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#edd8d5] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#705055]">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-[#8e273e] shrink-0" />
            <div>
              <strong className="text-[#221417] block font-serif text-sm">
                Complimentary Shipping over $75
              </strong>
              <span>Fast 2-3 day delivery across Louisiana & Virginia, or free studio pickup.</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#8e273e] shrink-0" />
            <div>
              <strong className="text-[#221417] block font-serif text-sm">
                100% Virgin Cuticle Aligned
              </strong>
              <span>Guaranteed raw human hair with zero synthetic filler in our bulk curls.</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#8e273e] shrink-0" />
            <div>
              <strong className="text-[#221417] block font-serif text-sm">
                Authentic African Wax Prints
              </strong>
              <span>Ethically tailored African clothes and traditional matching headwraps.</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMING SOON / VIP NOTIFY MODAL
      ========================================================================= */}
      {waitlistProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white border border-[#edd8d5] rounded-2xl shadow-2xl overflow-hidden text-[#221417]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#220d13] via-[#3a101b] to-[#1c080d] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#fcd34d]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#fcd34d]">
                  Boutique Coming Soon · VIP Priority List
                </span>
              </div>
              <button
                onClick={() => setWaitlistProduct(null)}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {waitlistSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold text-[#221417]">
                      You're on the VIP Priority List!
                    </h4>
                    <p className="text-xs text-[#705055] mt-1.5 leading-relaxed">
                      We'll alert <strong>{waitlistEmail}</strong> the instant{' '}
                      <strong>{waitlistProduct.name}</strong> arrives in our Baton Rouge and Virginia studio boutiques. You'll receive an exclusive 15% launch code.
                    </p>
                  </div>
                  <button
                    onClick={() => setWaitlistProduct(null)}
                    className="w-full py-3 rounded-xl bg-[#8e273e] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#721e31] transition-colors cursor-pointer shadow-md"
                  >
                    Done & Return to Boutiques
                  </button>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  {/* Product card summary */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#faf4f2] border border-[#edd8d5]">
                    <img
                      src={waitlistProduct.imageUrl}
                      alt={waitlistProduct.name}
                      className="w-16 h-16 rounded-lg object-cover border border-[#edd8d5] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#8e273e] uppercase tracking-wider flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#8e273e]" />
                        <span>Coming Soon · {waitlistProduct.category}</span>
                      </span>
                      <h4 className="font-serif font-bold text-sm text-[#221417] truncate">
                        {waitlistProduct.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#8e273e] mt-0.5">
                        ${waitlistProduct.price}{' '}
                        {waitlistProduct.originalPrice && (
                          <span className="text-[11px] text-[#9d7d83] line-through ml-1">
                            ${waitlistProduct.originalPrice}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#705055] leading-relaxed">
                    Be the very first to get notified when this product is stocked in our boutiques. VIP waitlist members receive guaranteed reservation and 15% off at launch!
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#221417] mb-1">
                        Email Address <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#edd8d5] text-xs bg-white text-[#221417] focus:outline-none focus:ring-2 focus:ring-[#8e273e]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#221417] mb-1">
                        Mobile Phone (Optional for SMS drop alerts)
                      </label>
                      <input
                        type="tel"
                        placeholder="(225) 555-0192"
                        value={waitlistPhone}
                        onChange={(e) => setWaitlistPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#edd8d5] text-xs bg-white text-[#221417] focus:outline-none focus:ring-2 focus:ring-[#8e273e]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8e273e] via-[#a02f48] to-[#6e1c2e] hover:from-[#9e2d46] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
                  >
                    <Bell className="w-4 h-4 text-[#fcd34d]" />
                    <span>Notify Me When In Stock</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart & Checkout Modal */}
      {isCartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#ffffff] border border-[#edd8d5] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-[#221417]">
            <div className="bg-gradient-to-r from-[#6e1c2e] via-[#8e273e] to-[#6e1c2e] px-6 py-4 border-b border-[#a02f48] flex items-center justify-between shrink-0 text-white">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-[#fcd34d]" />
                <span>Your Boutiques Bag ({totalCartCount} Items)</span>
              </span>
              <button
                onClick={() => {
                  setIsCartModalOpen(false);
                  setOrderConfirmed(false);
                }}
                className="p-1 rounded text-[#fce7ea] hover:text-white hover:bg-black/20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {!orderConfirmed ? (
                totalCartCount === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <ShoppingBag className="w-12 h-12 text-[#baa1a5] mx-auto opacity-50" />
                    <p className="text-xs text-[#705055]">Your bag is currently empty.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCompleteOrder} className="space-y-5">
                    {/* Items List */}
                    <div className="space-y-3 max-h-56 overflow-y-auto">
                      {Object.entries(cart).map(([id, qty]) => {
                        const item = allProducts.find((p) => p.id === id);
                        if (!item) return null;
                        const chosenSize = selectedSizes[id];
                        const chosenColor = selectedColors[id];
                        return (
                          <div
                            key={id}
                            className="p-3 rounded-lg bg-[#faf4f2] border border-[#edd8d5] flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-12 h-12 rounded object-cover border border-[#edd8d5]"
                              />
                              <div>
                                <div className="font-semibold text-[#221417] line-clamp-1">
                                  {item.name}
                                </div>
                                <div className="text-[11px] text-[#705055]">
                                  {chosenSize && <span>Size: {chosenSize} · </span>}
                                  {chosenColor && <span>Color: {chosenColor} · </span>}
                                  <span className="text-[#8e273e] font-bold">${item.price} each</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => removeFromCart(id)}
                                className="w-6 h-6 rounded bg-[#ffffff] border border-[#edd8d5] text-[#705055] flex items-center justify-center font-bold hover:bg-[#fdf2f4] cursor-pointer"
                              >
                                -
                              </button>
                              <span className="text-xs font-mono font-bold text-[#221417]">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => addToCart(id)}
                                className="w-6 h-6 rounded bg-[#ffffff] border border-[#edd8d5] text-[#705055] flex items-center justify-center font-bold hover:bg-[#fdf2f4] cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 rounded-lg bg-[#faf4f2] border border-[#edd8d5] flex justify-between items-center text-sm font-semibold">
                      <span className="text-[#705055]">Order Subtotal:</span>
                      <span className="text-[#8e273e] font-serif font-bold text-xl">
                        ${totalCartAmount}
                      </span>
                    </div>

                    {/* Delivery Method */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider">
                        Delivery Method
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('ship')}
                          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                            deliveryMethod === 'ship'
                              ? 'bg-[#faebea] text-[#8e273e] border-[#8e273e] font-bold'
                              : 'bg-white text-[#705055] border-[#edd8d5]'
                          }`}
                        >
                          📦 Standard Shipping {totalCartAmount >= 75 ? '(Free)' : '($7.95)'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('pickup-baton-rouge')}
                          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                            deliveryMethod === 'pickup-baton-rouge'
                              ? 'bg-[#faebea] text-[#8e273e] border-[#8e273e] font-bold'
                              : 'bg-white text-[#705055] border-[#edd8d5]'
                          }`}
                        >
                          📍 Baton Rouge Studio Pickup (Free)
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('pickup-va')}
                          className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                            deliveryMethod === 'pickup-va'
                              ? 'bg-[#faebea] text-[#8e273e] border-[#8e273e] font-bold'
                              : 'bg-white text-[#705055] border-[#edd8d5]'
                          }`}
                        >
                          📍 Virginia Studio Pickup (Free)
                        </button>
                      </div>
                    </div>

                    {/* Contact & Shipping Inputs */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                          Email Address (for order tracking) *
                        </label>
                        <input
                          type="email"
                          required
                          value={shippingEmail}
                          onChange={(e) => setShippingEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                        />
                      </div>

                      {deliveryMethod === 'ship' && (
                        <div>
                          <label className="block text-xs font-semibold text-[#503a40] uppercase tracking-wider mb-1">
                            Shipping Address (Street, City, Zip) *
                          </label>
                          <input
                            type="text"
                            required
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            placeholder="e.g. 12135 Florida Blvd, Baton Rouge, LA 70815"
                            className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#edd8d5] rounded-lg text-xs text-[#221417] placeholder-[#9d7d83] focus:outline-none focus:border-[#8e273e]"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] via-[#9e2d46] to-[#6e1c2e] hover:from-[#9e2d46] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Place Boutiques Order (${totalCartAmount})</span>
                    </button>
                  </form>
                )
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#fdf2f4] border-2 border-[#8e273e] flex items-center justify-center text-[#8e273e]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#221417]">
                    Order Dispatched!
                  </h3>
                  <p className="text-xs text-[#705055]">
                    Order tracking and receipt confirmation sent to{' '}
                    <strong className="text-[#221417]">{shippingEmail}</strong>.
                    {deliveryMethod === 'ship'
                      ? ' Your items are being packaged for fast delivery.'
                      : deliveryMethod === 'pickup-baton-rouge'
                      ? ` Ready for pickup at ${CONTACT_INFO.batonRougeAddress}.`
                      : ' Ready for pickup at Virginia Location (text for confirmation).'}
                  </p>
                  <button
                    onClick={() => {
                      setIsCartModalOpen(false);
                      setOrderConfirmed(false);
                      setCart({});
                    }}
                    className="w-full py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#9e2d46] transition-all cursor-pointer shadow-md"
                  >
                    Done & Return to Boutiques
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
