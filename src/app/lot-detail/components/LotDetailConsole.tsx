'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import LandedCostCalculator from './LandedCostCalculator';
import DPPModal from './DPPModal';
import BidConsole from './BidConsole';

const lot = {
  id: 'lot-06',
  lotNumber: 6,
  title: '1969 JLC Memovox Snowdrop',
  artist: 'Jaeger-LeCoultre',
  school: 'Indian Royal Estate',
  medium: '18K Solid Gold Monocoque',
  dimensions: '43mm Automatic Calibre',
  creationYear: '1969',
  category: 'Vintage Horology',
  currentBid: 675000,
  estimateLow: 700000,
  estimateHigh: 1050000,
  reserveMet: true,
  status: 'extended',
  statutory: 'Exportable Modern',
  nfcUid: 'NFC-IAH-1182-JLC',
  dppHash: '0x8f2d9c4b1e7a9821d3f0a5e2c7b4f9a1e8d3c5b7',
  bidCount: 14,
  provenance: 'From the private collection of the Maharaja of Jaipur, acquired 1971. Swiss service records 1984 & 2009. Includes original box, papers, and purchase receipt from Gübelin Geneva.',
  conditionScorecard: {
    uv_inspection: 'Pristine • No inpainting / retouching detected',
    pigment_stability: 'Conservation Grade • Pure Mineral Pigments',
    stretcher_tag: 'Tamper-Evident NFC Encapsulated in Wood Bar',
    escrow_protection: 'Bank-Grade Settlement (Funds Released Post-Delivery)',
    title_guarantee: '100% Guaranteed Clear Title (Indisputable Origin)',
    statutory_compliance: 'Standard GST • Globally Exportable'
  }
};

const images = [
{
  src: "https://images.unsplash.com/photo-1659307371040-4472b1abb76a",
  alt: 'Vintage 18K gold watch front dial view, cream face with Roman numerals, dark velvet background',
  label: 'Front'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_110ddc26f-1784568041282.png",
  alt: 'Watch caseback with engraved hallmarks and calibre markings on dark surface',
  label: 'Caseback'
},
{
  src: "https://images.unsplash.com/photo-1633451238042-85d93d267866",
  alt: 'Watch movement macro detail showing gold gears and jewels under studio lighting',
  label: 'Macro'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_4eeac145d-1789076194192.png",
  alt: 'UV forensic light examination showing clean dial with no restoration marks',
  label: 'UV Forensic'
}];


export default function LotDetailConsole() {
  const [activeImage, setActiveImage] = useState(0);
  const [showDPP, setShowDPP] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 7, seconds: 42 });
  const [isSnipeWindow, setIsSnipeWindow] = useState(true);
  const [snipeExtended, setSnipeExtended] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSecs = prev.hours * 3600 + prev.minutes * 60 + prev.seconds + 1;
        return {
          hours: Math.floor(totalSecs / 3600),
          minutes: Math.floor(totalSecs % 3600 / 60),
          seconds: totalSecs % 60
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <div className="pt-20 pb-16">
      {/* Anti-sniping banner */}
      {isSnipeWindow && (
        <div className="mx-4 sm:mx-6 lg:mx-8 mt-6 rounded-[5px] px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FAF9F7] border border-[#E2DDD5]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-sm font-semibold text-[#A34828]">Soft-Close Active</p>
              <p className="text-xs text-[#645E59]">
                Any bid in the final 120 seconds extends bidding by +2 minutes. This lot is currently in soft-close.
                {snipeExtended && <span className="text-[#A34828] font-semibold ml-2">⏱ Clock extended by 2 min!</span>}
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-[#645E59]">Time Remaining</p>
            <p className="font-display text-xl font-semibold text-[#231F20] tabular-nums">
              {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#645E59] mb-8">
          <Link href="/" className="hover:text-[#A34828] transition-colors">Saleroom</Link>
          <span>/</span>
          <span className="text-[#A34828]">Lot {String(lot.lotNumber).padStart(2, '0')}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — Studio Viewer */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative rounded-[5px] overflow-hidden bg-[#FAF9F7] border border-[#E2DDD5] aspect-square">
              <AppImage
                src={images[activeImage].src}
                alt={images[activeImage].alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#FAF9F7]/90 backdrop-blur-sm text-[#231F20] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#E2DDD5]">
                  4K Studio View — {images[activeImage].label}
                </span>
              </div>
              {lot.status === 'extended' && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1.5 bg-[#FAF9F7]/90 backdrop-blur-sm text-[#A34828] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#E2DDD5]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A34828] animate-ping" />
                    Soft-Close
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative rounded-[4px] overflow-hidden aspect-square border-2 transition-all ${
                    activeImage === i ? 'border-[#A34828]' : 'border-[#E2DDD5] hover:border-[#A34828]/40'
                  }`}
                >
                  <AppImage src={img.src} alt={img.alt} fill className="object-cover" sizes="120px" />
                  <div className="absolute inset-0 bg-black/10" />
                  <span className="absolute bottom-1 left-0 right-0 text-center text-xs text-white font-semibold">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>

            {/* DPP Button */}
            <button
              onClick={() => setShowDPP(true)}
              className="w-full py-4 border border-[#231F20] rounded-[4px] text-[#231F20] font-semibold text-sm flex items-center justify-center gap-3 hover:bg-[#231F20] hover:text-[#FAF9F7] transition-all"
            >
              <span>🔐</span>
              View Digital Product Passport
              <span className="text-xs text-[#645E59] font-normal group-hover:text-[#FAF9F7]">Immutable Ledger</span>
            </button>
          </div>

          {/* Right — Info + Bid Console */}
          <div className="space-y-8">
            {/* Lot header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-[#A34828] uppercase tracking-widest border border-[#E2DDD5] rounded-full px-3 py-1">
                  Lot {String(lot.lotNumber).padStart(2, '0')}
                </span>
                <span className="text-xs text-[#645E59] bg-[#FAF9F7] border border-[#E2DDD5] rounded-full px-3 py-1 font-semibold">
                  ✈ Globally Exportable
                </span>
              </div>
              <h1 className="font-display text-hero-md text-[#231F20] mb-2" style={{ letterSpacing: '-0.01em' }}>{lot.title}</h1>
              <p className="text-[#645E59] text-base">
                <Link href="/artists/jaeger-lecoultre" className="hover:text-[#A34828] transition-colors">{lot.artist}</Link>
                {' · '}{lot.school}
              </p>
            </div>

            {/* Lot metadata */}
            <div className="grid grid-cols-2 gap-4 bg-[#FAF9F7] rounded-[5px] p-5 border border-[#E2DDD5]">
              {[
                { label: 'Medium', value: lot.medium },
                { label: 'Dimensions', value: lot.dimensions },
                { label: 'Year', value: lot.creationYear },
                { label: 'NFC UID', value: lot.nfcUid }
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-[#645E59] uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm text-[#231F20] font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Provenance */}
            <div className="bg-[#FAF9F7] rounded-[5px] p-5 border border-[#E2DDD5]">
              <p className="text-xs text-[#A34828] uppercase tracking-widest font-semibold mb-2">Provenance</p>
              <p className="text-sm text-[#645E59] leading-relaxed">{lot.provenance}</p>
            </div>

            {/* Bid console */}
            <BidConsole
              currentBid={lot.currentBid}
              estimateLow={lot.estimateLow}
              estimateHigh={lot.estimateHigh}
              bidCount={lot.bidCount}
              reserveMet={lot.reserveMet}
              onBidPlaced={() => setSnipeExtended(true)}
            />

            {/* Landed cost calculator */}
            <LandedCostCalculator defaultHammer={lot.currentBid} />
          </div>
        </div>
      </div>

      {showDPP && <DPPModal lot={lot} onClose={() => setShowDPP(false)} />}
    </div>
  );
}