'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { useCurrencyLanguage } from '@/context/CurrencyLanguageContext';

// ── Auction Lots (3 featured) ──────────────────────────────────────────────
const featuredLots = [
{
  id: 'lot-06',
  lotNumber: 6,
  title: '1969 JLC Memovox Snowdrop',
  artist: 'Jaeger-LeCoultre',
  currentBid: 675000,
  estimateHigh: 1050000,
  status: 'extended',
  image: 'https://images.unsplash.com/photo-1658973071321-da9445c620c3',
  imageAlt: 'Vintage 18K gold mechanical watch with cream dial on dark velvet background'
},
{
  id: 'lot-10',
  lotNumber: 10,
  title: 'Royal Basra Pearl Choker',
  artist: 'Bikaner Aristocratic Estate',
  currentBid: 750000,
  estimateHigh: 1200000,
  status: 'active',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_117d44ed3-1777552218955.png',
  imageAlt: 'Magnificent royal pearl and gold choker necklace with polki diamonds on dark velvet background'
},
{
  id: 'lot-08',
  lotNumber: 8,
  title: 'Pahari Miniature (c. 1820)',
  artist: 'Kangra Royal Workshop',
  currentBid: 580000,
  estimateHigh: 900000,
  status: 'active',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_119232cd0-1779099278705.png',
  imageAlt: 'Delicate Indian miniature painting with fine gold detailing on aged paper background'
}];


// ── Marketplace Buy-Now (3 featured) ──────────────────────────────────────
const featuredListings = [
{
  id: 'mkt-001',
  title: 'Monsoon Geometry — Study IV',
  artist: 'Aarav Mehta',
  price: 285000,
  badge: 'NFC Chipped',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_40b0dbd9c-1789078227059.png',
  imageAlt: 'Contemporary Indian painting with monsoon blues and gold leaf geometry on Belgian linen'
},
{
  id: 'mkt-002',
  title: 'Shri Nathji Sharad Purnima',
  artist: 'Master Kalyan Sharma',
  price: 48500,
  badge: 'GI Tagged',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1231eb508-1779111272428.png',
  imageAlt: 'Traditional Pichwai-style serigraphy print with jewel tones and intricate floral borders'
},
{
  id: 'mkt-004',
  title: 'Kanjivaram Silk Sari',
  artist: 'Salvi Master Weavers',
  price: 185000,
  badge: 'GI Tagged',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a7ca6a09-1764679826771.png',
  imageAlt: 'Luxurious deep crimson Kanjivaram silk sari with intricate 22K gold zari peacock border'
}];


// ── Artists (4 featured) ───────────────────────────────────────────────────
const featuredArtists = [
{
  id: 'aarav-mehta',
  name: 'Aarav Mehta',
  note: 'Contemporary Canvases',
  avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e94368a9-1785832789097.png',
  avatarAlt: 'Portrait of artist Aarav Mehta in his Udaipur studio',
  followerCount: 412
},
{
  id: 'master-kalyan-sharma',
  name: 'Master Kalyan Sharma',
  note: 'Nathdwara Pichwais',
  avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_16c69937a-1769073789490.png',
  avatarAlt: 'Portrait of Master Kalyan Sharma',
  followerCount: 289
},
{
  id: 'swaminathan-sthapati',
  name: 'Swaminathan Sthapati',
  note: 'Classical Bronzes',
  avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_171e3bf4b-1763296052508.png',
  avatarAlt: 'Portrait of Swaminathan Sthapati',
  followerCount: 341
},
{
  id: 'salvi-master-weavers',
  name: 'Salvi Master Weavers',
  note: 'Heritage Textiles',
  avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_4339e0382-1789076769093.png',
  avatarAlt: 'Portrait of Salvi master weaver',
  followerCount: 198
}];


// ── Cultural Spaces (3 featured) ──────────────────────────────────────────
const culturalSpaces = [
{
  type: 'Virtual Exhibition',
  title: 'Chromatic Dialogues',
  subtitle: 'New Indian Abstraction · 360° Tour',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d24463ec-1777534821048.png",
  imageAlt: 'Modern art gallery interior with large abstract paintings on white walls',
  badge: '360° Live'
},
{
  type: 'Heritage Landmark',
  title: 'CSMVS Mumbai',
  subtitle: 'Indo-Saracenic · 50,000+ artefacts',
  image: "https://images.unsplash.com/photo-1654951410020-c4d80c43a0d4",
  imageAlt: 'Grand museum hall with classical Indian sculptures and high vaulted ceilings',
  badge: 'UNESCO'
},
{
  type: 'Art Walk',
  title: 'Kala Ghoda Corridor',
  subtitle: '3 Galleries · 1.8 km self-guided',
  image: "https://images.unsplash.com/photo-1544143484-970b065aa9a0",
  imageAlt: 'Vibrant street art and gallery facades in Kala Ghoda cultural district Mumbai',
  badge: 'Self-Guided'
}];


// ── Sub-components ─────────────────────────────────────────────────────────

function SectionLabel({ label, href }: {label: string;href: string;}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span
        className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A34828]"
        style={{ fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
        
        {label}
      </span>
      <Link
        href={href}
        className="text-[11px] font-semibold text-[#645E59] hover:text-[#231F20] transition-colors duration-200 flex items-center gap-1"
        style={{ fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
        
        View all
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>);

}

// ── Auction Lots Panel ─────────────────────────────────────────────────────
function AuctionPanel({ formatPrice }: { formatPrice: (amount: number, compact?: boolean) => string }) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: '#FAF9F7', border: '1px solid #E8E2D9' }}>
      
      <div className="px-5 pt-5 pb-0">
        <SectionLabel label="Live Auctions" href="/lot-detail" />
      </div>
      <div className="flex flex-col divide-y divide-[#EDE8E0]">
        {featuredLots.map((lot) =>
        <Link
          key={lot.id}
          href="/lot-detail"
          className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#F3EFE8] transition-colors duration-150 group">
          
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#EDE8E0]">
              <AppImage
              src={lot.image}
              alt={lot.imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300" />
            
            </div>
            <div className="flex-1 min-w-0">
              <p
              className="text-[13px] font-semibold text-[#231F20] truncate leading-tight"
              style={{ fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
              
                {lot.title}
              </p>
              <p className="text-[11px] text-[#8A8078] truncate mt-0.5">{lot.artist}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[12px] font-bold text-[#231F20]">{formatPrice(lot.currentBid, true)}</p>
              <span
              className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide mt-0.5 ${
              lot.status === 'extended' ? 'text-[#A34828]' : 'text-[#3A6B4A]'}`
              }>
              
                <span
                className={`w-1.5 h-1.5 rounded-full ${
                lot.status === 'extended' ? 'bg-[#A34828] animate-ping' : 'bg-[#3A6B4A]'}`
                } />
              
                {lot.status === 'extended' ? 'Soft-Close' : 'Live'}
              </span>
            </div>
          </Link>
        )}
      </div>
      <div className="px-5 py-4">
        <Link
          href="/lot-detail"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-wider text-[#FAF9F7] transition-all duration-200 hover:opacity-90"
          style={{ background: '#231F20', fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
          
          Browse All Lots
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6h7M6.5 3L9.5 6l-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>);

}

// ── Marketplace Panel ──────────────────────────────────────────────────────
function MarketplacePanel({ formatPrice }: { formatPrice: (amount: number, compact?: boolean) => string }) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: '#FAF9F7', border: '1px solid #E8E2D9' }}>
      
      <div className="px-5 pt-5 pb-0">
        <SectionLabel label="Buy Now · Marketplace" href="/marketplace" />
      </div>
      <div className="grid grid-cols-3 gap-3 px-5 pb-4">
        {featuredListings.map((item) =>
        <Link
          key={item.id}
          href={`/marketplace/${item.id}`}
          className="group flex flex-col">
          
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#EDE8E0] mb-2">
              <AppImage
              src={item.image}
              alt={item.imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300" />
            
              <span
              className="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full"
              style={{ background: 'rgba(250,249,247,0.92)', color: '#A34828', border: '1px solid #E2DDD5' }}>
              
                {item.badge}
              </span>
            </div>
            <p
            className="text-[11px] font-semibold text-[#231F20] leading-tight line-clamp-2"
            style={{ fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
            
              {item.title}
            </p>
            <p className="text-[11px] font-bold text-[#A34828] mt-1">{formatPrice(item.price, true)}</p>
          </Link>
        )}
      </div>
      <div className="px-5 pb-4 mt-auto">
        <Link
          href="/marketplace"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all duration-200 hover:bg-[#EDE8E0]"
          style={{
            background: 'transparent',
            color: '#231F20',
            border: '1.5px solid #D4CEC5',
            fontFamily: 'var(--font-sans, DM Sans, sans-serif)'
          }}>
          
          Explore Marketplace
        </Link>
      </div>
    </div>);

}

// ── Artists Panel ──────────────────────────────────────────────────────────
function ArtistsPanel() {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: '#FAF9F7', border: '1px solid #E8E2D9' }}>
      
      <div className="px-5 pt-5 pb-0">
        <SectionLabel label="Artist Hub" href="/artists" />
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 pb-4">
        {featuredArtists.map((artist) =>
        <Link
          key={artist.id}
          href={`/artists/${artist.id}`}
          className="group flex items-center gap-3 p-3 rounded-xl hover:bg-[#F0EBE3] transition-colors duration-150"
          style={{ border: '1px solid #EDE8E0' }}>
          
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#EDE8E0]">
              <AppImage
              src={artist.avatar}
              alt={artist.avatarAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300" />
            
            </div>
            <div className="min-w-0">
              <p
              className="text-[12px] font-semibold text-[#231F20] truncate leading-tight"
              style={{ fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
              
                {artist.name}
              </p>
              <p className="text-[10px] text-[#8A8078] truncate mt-0.5">{artist.note}</p>
              <p className="text-[10px] text-[#A34828] font-semibold mt-0.5">{artist.followerCount} followers</p>
            </div>
          </Link>
        )}
      </div>
      <div className="px-5 pb-4 mt-auto">
        <Link
          href="/artists"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all duration-200 hover:bg-[#EDE8E0]"
          style={{
            background: 'transparent',
            color: '#231F20',
            border: '1.5px solid #D4CEC5',
            fontFamily: 'var(--font-sans, DM Sans, sans-serif)'
          }}>
          
          Meet All Artists
        </Link>
      </div>
    </div>);

}

// ── Cultural Discovery Panel ───────────────────────────────────────────────
function CulturalPanel() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: '#FAF9F7', border: '1px solid #E8E2D9' }}>
      
      <div className="px-5 pt-5 pb-0">
        <SectionLabel label="Cultural Discovery & Virtual Spaces" href="/explore" />
      </div>
      <div className="flex gap-2.5 px-5 pb-4">
        {culturalSpaces.map((space, i) =>
        <Link
          key={i}
          href="/explore"
          className="relative flex-1 rounded-xl overflow-hidden group cursor-pointer"
          style={{ minHeight: '160px' }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}>
          
            <AppImage
            src={space.image}
            alt={space.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105" />
          
            {/* Dark gradient overlay */}
            <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to top, rgba(15,12,8,0.88) 0%, rgba(15,12,8,0.3) 55%, transparent 100%)',
              opacity: hovered === i ? 1 : 0.85
            }} />
          
            {/* Badge */}
            <span
            className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full"
            style={{ background: 'rgba(250,249,247,0.92)', color: '#A34828', border: '1px solid #E2DDD5' }}>
            
              {space.badge}
            </span>
            {/* Text */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p
              className="text-[9px] font-semibold uppercase tracking-widest text-[#C9A96E] mb-0.5"
              style={{ fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
              
                {space.type}
              </p>
              <p
              className="text-[12px] font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-display, Cormorant Garamond, serif)' }}>
              
                {space.title}
              </p>
              <p className="text-[10px] text-[#C4BAB0] mt-0.5 leading-tight">{space.subtitle}</p>
            </div>
          </Link>
        )}
      </div>
      <div className="px-5 pb-4 mt-auto">
        <Link
          href="/explore"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all duration-200 hover:bg-[#EDE8E0]"
          style={{
            background: 'transparent',
            color: '#231F20',
            border: '1.5px solid #D4CEC5',
            fontFamily: 'var(--font-sans, DM Sans, sans-serif)'
          }}>
          
          Explore Cultural Spaces
        </Link>
      </div>
    </div>);

}

// ── Main Export ────────────────────────────────────────────────────────────
export default function HomepageOverviewSection() {
  const { formatPrice } = useCurrencyLanguage();

  return (
    <section
      className="w-full py-12 px-4 sm:px-6 lg:px-8"
      style={{ background: '#F5F0E8' }}>
      
      <div className="max-w-7xl mx-auto">
        {/* Section intro */}
        <div className="text-center mb-8">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A34828] mb-2"
            style={{ fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
            
            Everything on one platform
          </p>
          <h2
            className="text-2xl sm:text-3xl text-[#231F20] leading-tight"
            style={{
              fontFamily: 'var(--font-display, Cormorant Garamond, serif)',
              fontWeight: 600,
              letterSpacing: '-0.01em'
            }}>
            
            India's most complete art destination
          </h2>
        </div>

        {/* Bento grid — 2 cols top, 2 cols bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Row 1 */}
          <AuctionPanel formatPrice={formatPrice} />
          <MarketplacePanel formatPrice={formatPrice} />
          {/* Row 2 */}
          <ArtistsPanel />
          <CulturalPanel />
        </div>
      </div>
    </section>);

}