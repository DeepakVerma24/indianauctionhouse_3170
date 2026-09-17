'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';
import { useCurrencyLanguage } from '@/context/CurrencyLanguageContext';

const categories = [
'All Lots',
'Contemporary Canvases',
'Nathdwara Pichwais',
'Classical Bronzes',
'Heritage Textiles',
'Vintage Horology',
'Tribal & Indigenous',
'Classical Antiquities'];


interface Lot {
  id: string;
  lotNumber: number;
  title: string;
  artist: string;
  school: string;
  medium: string;
  dimensions: string;
  category: string;
  currentBid: number;
  estimateLow: number;
  estimateHigh: number;
  reserveMet: boolean;
  status: string;
  statutory: string;
  image: string;
  imageAlt: string;
  nfcUid: string;
  bidCount: number;
}

const lots: Lot[] = [
{
  id: 'lot-01', lotNumber: 1, title: 'Echoes of Monsoon over Pichola',
  artist: 'Aarav Mehta', school: 'Udaipur Residency Cohort',
  medium: 'Oil & 24K Gold on Belgian Linen', dimensions: '48 × 60 in',
  category: 'Contemporary Canvases', currentBid: 380000,
  estimateLow: 400000, estimateHigh: 650000, reserveMet: true, status: 'active',
  statutory: 'Exportable Modern',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_139f883b4-1781359359601.png",
  imageAlt: 'Vibrant contemporary Indian painting with monsoon blues and golden sunburst on dark canvas',
  nfcUid: 'NFC-IAH-8849-XK', bidCount: 7
},
{
  id: 'lot-02', lotNumber: 2, title: 'Shri Nathji Kamal Talai',
  artist: 'Master Kalyan Sharma', school: 'Nathdwara Guild',
  medium: 'Natural Stone Pigment on Cotton', dimensions: '54 × 72 in',
  category: 'Nathdwara Pichwais', currentBid: 215000,
  estimateLow: 220000, estimateHigh: 380000, reserveMet: true, status: 'active',
  statutory: 'Certified GI-Tagged Craft',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_46f323789-1789092314096.png",
  imageAlt: 'Traditional Indian folk painting with rich jewel tones on warm earthy background',
  nfcUid: 'NFC-IAH-9012-PZ', bidCount: 4
},
{
  id: 'lot-03', lotNumber: 3, title: 'Cosmic Tandava Nataraja',
  artist: 'Swaminathan Sthapati', school: 'Swamimalai Guild',
  medium: 'Panchaloha Lost-Wax Bronze', dimensions: '32 in H, 24.5 kg',
  category: 'Classical Bronzes', currentBid: 275000,
  estimateLow: 300000, estimateHigh: 500000, reserveMet: true, status: 'active',
  statutory: 'Exportable Modern',
  image: "https://images.unsplash.com/photo-1593895648907-820e948a94d7",
  imageAlt: 'Classical bronze sculpture with dark patina against neutral studio background',
  nfcUid: 'NFC-IAH-7734-BR', bidCount: 5
},
{
  id: 'lot-04', lotNumber: 4, title: 'Geometric Meditations',
  artist: 'Devendra Varma', school: 'Baroda School',
  medium: 'Raw Earth Pigments on Canvas', dimensions: '42 × 54 in',
  category: 'Contemporary Canvases', currentBid: 500000,
  estimateLow: 550000, estimateHigh: 800000, reserveMet: true, status: 'active',
  statutory: 'Exportable Modern',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_139f883b4-1781359359601.png",
  imageAlt: 'Abstract geometric Indian painting with earth tones and ochre pigments on textured canvas',
  nfcUid: 'NFC-IAH-5541-DV', bidCount: 9
},
{
  id: 'lot-05', lotNumber: 5, title: 'Royal Shikargah Patola',
  artist: 'Salvi Master Weavers', school: 'Patan, Gujarat',
  medium: 'Double Ikat Silk with Zari', dimensions: '46 × 210 in',
  category: 'Heritage Textiles', currentBid: 310000,
  estimateLow: 350000, estimateHigh: 550000, reserveMet: true, status: 'active',
  statutory: 'Certified GI-Tagged Craft',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15ae9cd1a-1772847531314.png",
  imageAlt: 'Intricate Indian silk textile with deep burgundy and gold ikat patterns on dark background',
  nfcUid: 'NFC-IAH-3390-PT', bidCount: 6
},
{
  id: 'lot-06', lotNumber: 6, title: '1969 JLC Memovox Snowdrop',
  artist: 'Jaeger-LeCoultre', school: 'Indian Royal Estate',
  medium: '18K Solid Gold Monocoque', dimensions: '43mm Automatic Calibre',
  category: 'Vintage Horology', currentBid: 675000,
  estimateLow: 700000, estimateHigh: 1050000, reserveMet: true, status: 'extended',
  statutory: 'Exportable Modern',
  image: "https://images.unsplash.com/photo-1658973071321-da9445c620c3",
  imageAlt: 'Vintage 18K gold mechanical watch with cream dial on dark velvet background',
  nfcUid: 'NFC-IAH-1182-JLC', bidCount: 14
},
{
  id: 'lot-07', lotNumber: 7, title: 'Muria Ancestral Tree of Life',
  artist: 'Jaidev Baghel Tradition', school: 'Bastar, Chhattisgarh',
  medium: 'Lost-Wax Bell Metal (Dhokra)', dimensions: '26 × 38 in, 14 kg',
  category: 'Tribal & Indigenous', currentBid: 140000,
  estimateLow: 150000, estimateHigh: 250000, reserveMet: true, status: 'active',
  statutory: 'Exportable Modern',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1863fc26b-1777570876339.png",
  imageAlt: 'Traditional Dhokra bell metal tribal sculpture with intricate tree motifs on dark background',
  nfcUid: 'NFC-IAH-6629-DK', bidCount: 3
},
{
  id: 'lot-08', lotNumber: 8, title: 'Pahari Miniature (c. 1820)',
  artist: 'Kangra Royal Workshop', school: 'Kangra Valley',
  medium: 'Gouache & Gold on Sialkoti Paper', dimensions: '9.5 × 13.5 in Folio',
  category: 'Classical Antiquities', currentBid: 580000,
  estimateLow: 600000, estimateHigh: 900000, reserveMet: true, status: 'active',
  statutory: 'Antiquities Act 1972 Non-Exportable',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10f1fd9b5-1772225092310.png",
  imageAlt: 'Delicate Indian miniature painting with fine gold detailing on aged paper background',
  nfcUid: 'NFC-IAH-4491-ASI', bidCount: 11
},
{
  id: 'lot-09', lotNumber: 9, title: 'Carved Jharokha Balcony',
  artist: 'Sompura Master Carvers', school: 'Jodhpur, Rajasthan',
  medium: 'Pink Bansi Sandstone', dimensions: '48 × 36 × 12 in, 68 kg',
  category: 'Contemporary Canvases', currentBid: 220000,
  estimateLow: 250000, estimateHigh: 400000, reserveMet: true, status: 'active',
  statutory: 'Exportable Modern',
  image: "https://images.unsplash.com/photo-1671477859074-a1faedc90a4a",
  imageAlt: 'Intricately carved pink sandstone architectural element with geometric jali patterns on dark backdrop',
  nfcUid: 'NFC-IAH-8821-ST', bidCount: 2
},
{
  id: 'lot-10', lotNumber: 10, title: 'Royal Basra Pearl Choker',
  artist: 'Bikaner Aristocratic Estate', school: 'Royal Provenance',
  medium: '22K Gold, Basra Pearls, Polki; 142g Gross, IGI/GIA',
  dimensions: 'N/A',
  category: 'Vintage Horology', currentBid: 750000,
  estimateLow: 800000, estimateHigh: 1200000, reserveMet: true, status: 'active',
  statutory: 'Exportable Modern',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_117d44ed3-1777552218955.png",
  imageAlt: 'Magnificent royal pearl and gold choker necklace with polki diamonds on dark velvet background',
  nfcUid: 'NFC-IAH-9904-JW', bidCount: 17
},
{
  id: 'lot-11', lotNumber: 11, title: 'Mughal Jade Dagger (c. 1680)',
  artist: 'Imperial Mughal Atelier', school: 'Agra Royal Workshop',
  medium: 'Nephrite Jade, Gold Koftgari, Ruby Inlay', dimensions: '14 in L, 320g',
  category: 'Classical Antiquities', currentBid: 920000,
  estimateLow: 950000, estimateHigh: 1400000, reserveMet: true, status: 'active',
  statutory: 'Antiquities Act 1972 Non-Exportable',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_119232cd0-1779099278705.png",
  imageAlt: 'Ornate Mughal jade dagger with gold koftgari work and ruby inlay on dark velvet background',
  nfcUid: 'NFC-IAH-2271-JD', bidCount: 8
},
{
  id: 'lot-12', lotNumber: 12, title: 'Tanjore Mahalakshmi Panel',
  artist: 'Thanjavur Hereditary Guild', school: 'Thanjavur, Tamil Nadu',
  medium: '24K Gold Foil, Precious Stones on Teak', dimensions: '36 × 48 in',
  category: 'Classical Bronzes', currentBid: 430000,
  estimateLow: 450000, estimateHigh: 700000, reserveMet: true, status: 'active',
  statutory: 'Exportable Modern',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b42f5544-1779099279397.png",
  imageAlt: 'Resplendent Tanjore gold foil painting of Mahalakshmi with gemstone embellishments on dark background',
  nfcUid: 'NFC-IAH-5563-TJ', bidCount: 6
}];


const artistAvatars: Record<string, {href: string;avatar: string;avatarAlt: string;}> = {
  'Aarav Mehta': {
    href: '/artists/aarav-mehta',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17a79548f-1772101802405.png",
    avatarAlt: 'Portrait of artist Aarav Mehta'
  },
  'Master Kalyan Sharma': {
    href: '/artists/master-kalyan-sharma',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16c69937a-1769073789490.png",
    avatarAlt: 'Portrait of Master Kalyan Sharma'
  },
  'Swaminathan Sthapati': {
    href: '/artists/swaminathan-sthapati',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_171e3bf4b-1763296052508.png",
    avatarAlt: 'Portrait of Swaminathan Sthapati'
  },
  'Salvi Master Weavers': {
    href: '/artists/salvi-master-weavers',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_4339e0382-1789076769093.png",
    avatarAlt: 'Portrait of Salvi master weaver'
  },
  'Devendra Varma': {
    href: '/artists/aarav-mehta',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e30c8f5e-1763292997540.png",
    avatarAlt: 'Portrait of artist Devendra Varma'
  }
};

function StatusBadge({ status }: {status: string;}) {
  if (status === 'extended') {
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A34828] bg-[#FAF9F7] border border-[#E2DDD5] rounded-full px-2.5 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A34828] animate-ping" />
        Soft-Close
      </span>);

  }
  if (status === 'active') {
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3A6B4A] bg-[#FAF9F7] border border-[#E2DDD5] rounded-full px-2.5 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3A6B4A]" />
        Live
      </span>);

  }
  return (
    <span className="text-xs font-semibold uppercase tracking-wider text-[#645E59] bg-[#FAF9F7] border border-[#E2DDD5] rounded-full px-2.5 py-1">
      {status}
    </span>);

}

function ComplianceBadge({ statutory }: {statutory: string;}) {
  const isRestricted = statutory.includes('Antiquities Act');
  const isGI = statutory.includes('GI-Tagged');
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
    isRestricted ?
    'text-[#A34828] bg-[#FAF9F7] border-[#E2DDD5]' :
    isGI ?
    'text-[#3A6B4A] bg-[#FAF9F7] border-[#E2DDD5]' :
    'text-[#645E59] bg-[#FAF9F7] border-[#E2DDD5]'}`
    }>
      {isRestricted ? '🏛 Domestic Only' : isGI ? '🌿 GI-Tagged' : '✈ Exportable'}
    </span>);

}

export default function CategoryTabsSection() {
  const [activeCategory, setActiveCategory] = useState('All Lots');
  const router = useRouter();
  const { formatPrice } = useCurrencyLanguage();

  const filtered = activeCategory === 'All Lots' ?
  lots :
  lots.filter((l) => l.category === activeCategory);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <p className="text-xs text-[#A34828] font-semibold uppercase tracking-widest mb-3">Drop 001</p>
          <h2 className="font-display text-hero-md text-[#231F20]" style={{ letterSpacing: '-0.01em' }}>The Inaugural Collection</h2>
        </div>
        <p className="text-[#645E59] text-sm">{filtered.length} lots · Auction closes in 48 hours</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-12">
        {categories.map((cat) =>
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`text-sm font-medium px-4 py-2 rounded-[4px] border transition-all duration-200 ${
          activeCategory === cat ?
          'bg-[#A34828] text-[#FAF9F7] border-[#A34828]' :
          'text-[#645E59] border-[#E2DDD5] hover:border-[#A34828] hover:text-[#231F20] bg-transparent'}`
          }>
          
            {cat}
          </button>
        )}
      </div>

      {/* Lot grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((lot) =>
        <div key={lot.id} className="block group cursor-pointer" onClick={() => router.push('/lot-detail')}>
            <article className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] overflow-hidden card-hover h-full flex flex-col">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <AppImage
                src={lot.image}
                alt={lot.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              
                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-[#FAF9F7]/90 backdrop-blur-sm text-[#231F20] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#E2DDD5]">
                    Lot {String(lot.lotNumber).padStart(2, '0')}
                  </span>
                  <StatusBadge status={lot.status} />
                </div>
                {/* NFC tag */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-xs text-[#FAF9F7]/80 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded font-mono">
                    {lot.nfcUid}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3">
                  <ComplianceBadge statutory={lot.statutory} />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#231F20] leading-tight mb-1" style={{ letterSpacing: '0.01em' }}>
                  {lot.title}
                </h3>
                {/* Artist with avatar deep-link */}
                {artistAvatars[lot.artist] ?
              <Link
                href={artistAvatars[lot.artist].href}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 mb-1 group/artist w-fit">
                
                    <div className="w-5 h-5 rounded-full overflow-hidden border border-[#E2DDD5] shrink-0">
                      <AppImage
                    src={artistAvatars[lot.artist].avatar}
                    alt={artistAvatars[lot.artist].avatarAlt}
                    width={20}
                    height={20}
                    className="object-cover w-full h-full" />
                  
                    </div>
                    <span className="text-sm text-[#645E59] group-hover/artist:text-[#A34828] transition-colors">{lot.artist}</span>
                  </Link> :

              <p className="text-sm text-[#645E59] mb-1">{lot.artist}</p>
              }
                <p className="text-xs text-[#645E59] mb-5">{lot.medium} · {lot.dimensions}</p>

                <div className="mt-auto space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-[#645E59] mb-0.5">Estimate</p>
                      <p className="text-sm text-[#645E59] font-medium">
                        {formatPrice(lot.estimateLow, true)} – {formatPrice(lot.estimateHigh, true)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#645E59] mb-0.5">Current Bid</p>
                      <p className="font-display text-2xl font-semibold text-[#A34828]">{formatPrice(lot.currentBid, true)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#645E59]">
                    <span>{lot.bidCount} bids placed</span>
                    {lot.reserveMet && <span className="text-[#3A6B4A] font-semibold">✓ Reserve Met</span>}
                  </div>
                  <button className="w-full py-3 bg-[#A34828] text-[#FAF9F7] font-semibold text-sm rounded-[4px] hover:bg-[#873B20] transition-colors tracking-wide">
                    Place Bid
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>);

}