import React, { useState } from 'react';
import { Star, ShieldCheck, Heart, Sparkles, CheckCircle2, Calendar, ExternalLink } from 'lucide-react';
import { OFFICIAL_BOOKING_URL } from '../data/mockData';

interface StyleGalleryProps {
  onOpenBooking: () => void;
}

export const StyleGallery: React.FC<StyleGalleryProps> = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const galleryItems = [
    {
      id: 1,
      title: 'Boho Knotless Braids',
      category: 'Boho Knotless',
      image: '/src/assets/images/boho_knotless_luxury_1791272062825.jpg',
      stylist: 'Princess Amara',
      location: 'New Orleans LA',
      review: 'No headache, zero pulling on baby hairs. The human hair curls lasted 8 weeks with no frizz!',
      author: 'Keisha M.',
    },
    {
      id: 2,
      title: 'Precision Box Braids',
      category: 'Box Braids',
      image: '/src/assets/images/box_braids_luxury_1791876267104.jpg',
      stylist: 'Fatima Diallo',
      location: 'Richmond VA',
      review: 'Cleanest geometric parts in Virginia. Featherlight and scalp felt nourished the whole appointment.',
      author: 'Brianna T.',
    },
    {
      id: 3,
      title: 'Shaved Sides Box Braids',
      category: 'Box Braids',
      image: '/src/assets/images/shaved_sides_braids_1791876281291.jpg',
      stylist: 'Princess Amara',
      location: 'New Orleans LA',
      review: 'Fierce look! Tailored so well around my undercut. Lightweight and dry time after swimming was super quick.',
      author: 'Maya J.',
    },
    {
      id: 4,
      title: 'Ghana Wave Artistry',
      category: 'Ghana Waves',
      image: '/src/assets/images/ghana_waves_tribal_1791876296010.jpg',
      stylist: 'Chantel Mensah',
      location: 'Virginia Beach VA',
      review: 'Architectural precision. Chantel has gentle hands and honors scalp circulation with zero tension.',
      author: 'Tamara S.',
    },
    {
      id: 5,
      title: 'Hair Loss Tribal Coverup',
      category: 'Hair Loss & Coverup',
      image: '/src/assets/images/hair_loss_coverup_1791876312275.jpg',
      stylist: 'Princess Amara',
      location: 'Alexandria VA',
      review: 'Compassionate, discrete and truly magical. Covered my postpartum thinning edges completely without pulling.',
      author: 'Imani W.',
    },
    {
      id: 6,
      title: 'Gentlemen Stitch Cornrows',
      category: 'Men Style',
      image: '/src/assets/images/men_stitch_braids_1791873905435.jpg',
      stylist: 'Chantel Mensah',
      location: 'Baton Rouge LA',
      review: 'Razor clean lines, neat edges, and organic peppermint scalp prep. Best braiding studio in Louisiana.',
      author: 'Marcus D.',
    },
    {
      id: 7,
      title: 'French Curl Glamour Knotless',
      category: 'Signature Styles',
      image: '/src/assets/images/french_curl_glamour_1791272082696.jpg',
      stylist: 'Princess Collective Master Artisan',
      location: 'New Orleans & Richmond',
      review: 'Featherlight bouncy French curls. Zero scalp pulling, sleek geometric partings, and silky curls that stay defined.',
      author: 'Jasmine R.',
    },
    {
      id: 8,
      title: 'Royal Senegalese Rope Twists',
      category: 'Signature Styles',
      image: '/src/assets/images/senegalese_twists_queen_1791272130687.jpg',
      stylist: 'Master Artisan Collective',
      location: 'Baton Rouge Flagship',
      review: 'Silky smooth twists with zero scalp strain. My edges were totally protected and hair grew noticeably during wear.',
      author: 'Ebony K.',
    },
    {
      id: 9,
      title: 'Ancestral Braided Updo Crown',
      category: 'Signature Styles',
      image: '/src/assets/images/braided_updo_crown_1791873904399.jpg',
      stylist: 'Princess Collective Artisan',
      location: 'Richmond & Alexandria Studios',
      review: 'Three generations of West African braiding lineage honored in every geometrical part and feed-in line.',
      author: 'Ayanna M.',
    },
  ];

  const filtered =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeFilter);

  return (
    <section className="py-20 bg-[#fcf6f2] text-[#221417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faebea] border border-[#f0c5cd] text-[#8e273e] text-xs font-semibold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8e273e]" />
            <span>Artistry & Client Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#221417]">
            Real Crowns. Real Protection. <br />
            <span className="italic text-[#8e273e] font-serif">Zero-Tension Excellence.</span>
          </h2>
          <p className="text-sm text-[#543b3f] leading-relaxed">
            Every hairstyle is an intentional blend of African heritage braiding speed and modern follicular care across Louisiana & Virginia studios.
          </p>
        </div>

        {/* Filter tags */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {['All', 'Signature Styles', 'Boho Knotless', 'Box Braids', 'Ghana Waves', 'Hair Loss & Coverup', 'Men Style'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] text-white font-bold shadow-md shadow-[#8e273e]/20'
                  : 'bg-[#ffffff] text-[#543b3f] hover:text-[#221417] hover:bg-[#faebea] border border-[#edd8d5]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#ffffff] border border-[#edd8d5] rounded-2xl overflow-hidden hover:border-[#8e273e] transition-all group flex flex-col justify-between shadow-xs hover:shadow-lg"
            >
              <div className="relative h-72 overflow-hidden bg-[#faebea]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-white/95 backdrop-blur-sm border border-[#edd8d5] text-[#8e273e] text-[10px] font-bold uppercase shadow-xs">
                  {item.category}
                </span>
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded border border-white/20">
                  {item.stylist} · {item.location}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-1 text-[#d4af37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
                  ))}
                </div>
                <p className="text-xs text-[#543b3f] italic leading-relaxed">
                  "{item.review}"
                </p>
                <div className="text-[11px] text-[#705055] font-semibold flex items-center justify-between">
                  <span>Verified Client · {item.author}</span>
                  <a
                    href={OFFICIAL_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8e273e] hover:underline flex items-center gap-0.5 text-[10px]"
                  >
                    <span>Book</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tension-Free Charter Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#ffffff] border border-[#edd8d5] flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8e273e]">
              <ShieldCheck className="w-4 h-4" />
              <span>The Princess AHB Edge Protection Pledge</span>
            </div>
            <h3 className="font-serif font-bold text-2xl text-[#221417]">
              Tension-Free or We Re-part it on the Spot
            </h3>
            <p className="text-xs text-[#543b3f] leading-relaxed">
              We never braid tight hairline baby hairs or over-pull delicate edges. If you feel any pinch or discomfort during your appointment, our artisans adjust tension immediately.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={onOpenBooking}
              className="px-5 py-3 rounded-lg text-xs font-bold text-[#8e273e] bg-[#faebea] hover:bg-[#f0c5cd] border border-[#f0c5cd] transition-all cursor-pointer"
            >
              Style Estimator
            </button>
            <a
              href={OFFICIAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#8e273e] to-[#6e1c2e] hover:from-[#a02f48] transition-all flex items-center gap-2 shadow-md cursor-pointer active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-[#fcd34d]" />
              <span>Reserve Chair (as.me)</span>
              <ExternalLink className="w-3 h-3 text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
