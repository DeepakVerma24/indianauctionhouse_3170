'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import { listings } from '@/app/marketplace/data/listings';
import { useCurrencyLanguage } from '@/context/CurrencyLanguageContext';

interface AuctionLot {
  id: string;
  lotNumber: number;
  title: string;
  artist: string;
  medium: string;
  year: string;
  dimensions?: string;
  edition?: string;
  image: string;
  imageAlt: string;
  estimateLow: number;
  estimateHigh: number;
  currentBid: number;
  startingBid: number;
  bidCount: number;
  reserveMet: boolean;
  status: 'upcoming' | 'live' | 'sold' | 'passed';
  badges: string[];
  category: string;
  description: string;
  timeLeft?: number;
}

const auctionLots: AuctionLot[] = listings.map((l, i) => {
  const base = l.price;
  const estimateLow = Math.round(base * 0.8);
  const estimateHigh = Math.round(base * 1.2);
  const currentBid = Math.round(base * (0.65 + (i * 0.03)));
  const status: AuctionLot['status'] =
    i === 2 ? 'live' : i < 2 ? 'sold' : 'upcoming';
  return {
    id: l.id,
    lotNumber: i + 1,
    title: l.title,
    artist: l.artist,
    medium: l.medium,
    year: l.year,
    dimensions: l.dimensions,
    edition: l.edition,
    image: l.image,
    imageAlt: l.imageAlt,
    estimateLow,
    estimateHigh,
    currentBid,
    startingBid: Math.round(base * 0.5),
    bidCount: (i * 3 + 5),
    reserveMet: currentBid >= estimateLow * 0.9,
    status,
    badges: l.badges,
    category: l.category,
    description: l.description,
    timeLeft: status === 'live' ? 847 : undefined,
  };
});

const BID_INCREMENTS = [10000, 25000, 50000, 100000];

const mockBidHistory = [
  { paddle: 'IAH-042', amount: 0, time: '21:28:14', winning: true },
  { paddle: 'IAH-179', amount: 0, time: '21:27:33', winning: false },
  { paddle: 'IAH-042', amount: 0, time: '21:25:11', winning: false },
  { paddle: 'IAH-391', amount: 0, time: '21:22:45', winning: false },
  { paddle: 'IAH-179', amount: 0, time: '21:18:02', winning: false },
];

function StatusBadge({ status }: { status: AuctionLot['status'] }) {
  if (status === 'live')
    return (
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white bg-[#A34828] px-2.5 py-1 rounded-full shadow-sm">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
        </span>
        Live
      </span>
    );
  if (status === 'sold')
    return (
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white bg-[#3A6B4A] px-2.5 py-1 rounded-full">
        ✓ Sold
      </span>
    );
  if (status === 'passed')
    return (
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#645E59] bg-[#E2DDD5] px-2.5 py-1 rounded-full">
        Passed
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#645E59] border border-[#C4A882]/40 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
      Upcoming
    </span>
  );
}

function Countdown({ seconds }: { seconds: number }) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return (
    <span className="font-mono font-bold tabular-nums">
      {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
    </span>
  );
}

function BidConsoleInline({
  lot,
  onBidPlaced,
}: {
  lot: AuctionLot;
  onBidPlaced: (newBid: number) => void;
}) {
  const { formatPrice } = useCurrencyLanguage();
  const [selectedIncrement, setSelectedIncrement] = useState(25000);
  const [customBid, setCustomBid] = useState('');
  const [bidHistory, setBidHistory] = useState(() =>
    mockBidHistory.map((b, i) => ({
      ...b,
      amount: lot.currentBid - i * 25000,
    }))
  );
  const [currentBid, setCurrentBid] = useState(lot.currentBid);
  const [bidPlaced, setBidPlaced] = useState(false);
  const [isLoggedIn] = useState(false);

  const nextBid = currentBid + selectedIncrement;
  const effectiveBid = customBid
    ? parseInt(customBid.replace(/,/g, '')) || nextBid
    : nextBid;

  const handleBid = () => {
    if (!isLoggedIn) return;
    const newBid = effectiveBid;
    setBidHistory((prev) => [
      { paddle: 'IAH-408', amount: newBid, time: new Date().toLocaleTimeString('en-IN'), winning: true },
      ...prev.map((b) => ({ ...b, winning: false })),
    ]);
    setCurrentBid(newBid);
    setBidPlaced(true);
    onBidPlaced(newBid);
    setCustomBid('');
    setTimeout(() => setBidPlaced(false), 3000);
  };

  return (
    <div className="bg-white border border-[#E2DDD5] rounded-xl overflow-hidden shadow-sm">
      {/* Current bid header */}
      <div className="bg-gradient-to-r from-[#231F20] to-[#3A2E2A] p-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] text-[#C4A882] uppercase tracking-[0.15em] mb-1 font-semibold">Current Bid</p>
            <p className="font-display text-3xl font-bold text-white leading-none">{formatPrice(currentBid)}</p>
            <p className="text-[11px] text-white/50 mt-1.5">
              Est: {formatPrice(lot.estimateLow)} – {formatPrice(lot.estimateHigh)}
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white/10 rounded-lg px-3 py-2">
              <p className="text-lg font-bold text-white leading-none">{lot.bidCount}</p>
              <p className="text-[10px] text-white/50 mt-0.5">bids</p>
            </div>
            {lot.reserveMet && (
              <p className="text-[10px] text-[#6DBF8A] font-bold mt-2 flex items-center gap-1 justify-end">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                Reserve Met
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Increment selector */}
        <div>
          <p className="text-[10px] text-[#645E59] uppercase tracking-[0.15em] mb-2 font-semibold">Bid Increment</p>
          <div className="grid grid-cols-4 gap-2">
            {BID_INCREMENTS.map((inc) => (
              <button
                key={inc}
                onClick={() => setSelectedIncrement(inc)}
                className={`py-2 text-[11px] font-bold rounded-lg border-2 transition-all duration-150 ${
                  selectedIncrement === inc
                    ? 'bg-[#A34828] text-white border-[#A34828] shadow-sm'
                    : 'border-[#E2DDD5] text-[#645E59] hover:border-[#A34828]/50 hover:text-[#A34828] bg-[#FAF9F7]'
                }`}
              >
                +{inc >= 100000 ? `${inc / 100000}L` : `${inc / 1000}K`}
              </button>
            ))}
          </div>
        </div>

        {/* Next bid preview */}
        <div className="bg-[#FDF8F4] border-2 border-[#C4A882]/40 rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#645E59] font-semibold mb-0.5">Your Next Bid</p>
            <p className="font-display text-xl font-bold text-[#A34828]">{formatPrice(effectiveBid)}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-[#645E59]">+ Buyer&apos;s Premium</p>
            <p className="text-sm font-bold text-[#A34828]">+{formatPrice(Math.round(effectiveBid * 0.1))}</p>
            <p className="text-[10px] text-[#645E59]/60">10% + 18% GST</p>
          </div>
        </div>

        {/* Custom bid */}
        <div className="relative">
          <input
            type="text"
            placeholder="Enter custom amount…"
            value={customBid}
            onChange={(e) => setCustomBid(e.target.value)}
            className="w-full bg-[#FAF9F7] border-2 border-[#E2DDD5] rounded-xl px-4 py-2.5 text-[#231F20] text-sm placeholder:text-[#645E59]/40 focus:outline-none focus:border-[#A34828] transition-colors"
          />
        </div>

        {/* Submit */}
        {isLoggedIn ? (
          <button
            onClick={handleBid}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              bidPlaced
                ? 'bg-[#3A6B4A] text-white shadow-md'
                : 'bg-[#A34828] text-white hover:bg-[#873B20] shadow-md hover:shadow-lg active:scale-[0.98]'
            }`}
          >
            {bidPlaced ? '✓ Bid Placed Successfully' : `Place Bid — ${formatPrice(effectiveBid)}`}
          </button>
        ) : (
          <Link
            href="/sign-up-login"
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#A34828] text-white flex items-center justify-center gap-2 hover:bg-[#873B20] transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Register to Bid
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Bid history */}
      <div className="border-t border-[#E2DDD5] bg-[#FAF9F7]">
        <p className="text-[10px] text-[#645E59] uppercase tracking-[0.15em] font-bold px-4 py-2.5 border-b border-[#E2DDD5]">
          Bid History
        </p>
        <div className="divide-y divide-[#E2DDD5]">
          {bidHistory.slice(0, 4).map((bid, i) => (
            <div key={i} className={`flex items-center justify-between px-4 py-2.5 ${bid.winning ? 'bg-[#FDF8F4]' : ''}`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-2 h-2 rounded-full ${bid.winning ? 'bg-[#A34828]' : 'bg-[#E2DDD5]'}`} />
                <span className="text-[11px] font-mono text-[#645E59]">#{bid.paddle}</span>
                {bid.winning && <span className="text-[9px] font-bold text-[#A34828] uppercase tracking-wider">Leading</span>}
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[12px] font-bold ${bid.winning ? 'text-[#A34828]' : 'text-[#645E59]'}`}>
                  {formatPrice(bid.amount)}
                </span>
                <span className="text-[10px] text-[#645E59]/50 font-mono">{bid.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LotCard({
  lot,
  onSelect,
  isSelected,
}: {
  lot: AuctionLot;
  onSelect: (lot: AuctionLot) => void;
  isSelected: boolean;
}) {
  const { formatPrice } = useCurrencyLanguage();
  return (
    <div
      onClick={() => onSelect(lot)}
      className={`group cursor-pointer bg-white rounded-xl overflow-hidden transition-all duration-200 ${
        isSelected
          ? 'ring-2 ring-[#A34828] shadow-xl shadow-[#A34828]/10'
          : 'border border-[#E2DDD5] hover:border-[#C4A882] hover:shadow-lg hover:shadow-black/5'
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F3EF]">
        <AppImage
          src={lot.image}
          alt={lot.imageAlt}
          fill
          className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Top badges row */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <span className="text-[10px] font-bold font-mono text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
            LOT {String(lot.lotNumber).padStart(2, '0')}
          </span>
          <StatusBadge status={lot.status} />
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A882] mb-0.5">{lot.category}</p>
          <p className="text-xs font-semibold text-white leading-tight line-clamp-1">{lot.artist}</p>
        </div>

        {/* Live countdown overlay */}
        {lot.status === 'live' && lot.timeLeft !== undefined && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-[#A34828]/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
              <span className="text-white text-xs font-bold font-mono">
                <Countdown seconds={lot.timeLeft} />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5">
        <h3 className="font-display text-sm font-semibold text-[#231F20] leading-tight mb-2 line-clamp-2">
          {lot.title}
        </h3>
        <p className="text-[11px] text-[#645E59] mb-3 truncate">{lot.medium} · {lot.year}</p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9px] text-[#645E59] uppercase tracking-[0.12em] font-semibold mb-0.5">
              {lot.status === 'sold' ? 'Sold For' : lot.status === 'live' ? 'Current Bid' : 'Starting Bid'}
            </p>
            <p className="font-display text-base font-bold text-[#A34828]">
              {formatPrice(lot.status === 'upcoming' ? lot.startingBid : lot.currentBid)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-[#645E59] uppercase tracking-[0.12em] font-semibold mb-0.5">Est.</p>
            <p className="text-[11px] text-[#645E59]">
              {formatPrice(lot.estimateLow)}–{formatPrice(lot.estimateHigh)}
            </p>
          </div>
        </div>

        {lot.status === 'live' && (
          <div className="mt-3 pt-3 border-t border-[#E2DDD5] flex items-center justify-between">
            <span className="text-[11px] text-[#645E59]">{lot.bidCount} bids</span>
            {lot.timeLeft !== undefined && (
              <div className="flex items-center gap-1.5 text-[#A34828]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
                <span className="text-[11px] font-bold font-mono text-[#A34828]">
                  <Countdown seconds={lot.timeLeft} />
                </span>
              </div>
            )}
          </div>
        )}

        {isSelected && (
          <div className="mt-3 pt-3 border-t border-[#A34828]/20 flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#A34828] animate-pulse" />
            <p className="text-[10px] text-[#A34828] font-bold uppercase tracking-wider">Viewing in Console</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuctionsPage() {
  const { formatPrice } = useCurrencyLanguage();
  const [lots, setLots] = useState<AuctionLot[]>(auctionLots);
  const [selectedLot, setSelectedLot] = useState<AuctionLot>(
    lots.find((l) => l.status === 'live') ?? lots[0]
  );
  const [filterStatus, setFilterStatus] = useState<'all' | AuctionLot['status']>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [timeLeft, setTimeLeft] = useState(847);
  const [activeTab, setActiveTab] = useState<'details' | 'bid'>('bid');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (selectedLot.status !== 'live') return;
    const interval = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedLot.status]);

  const handleBidPlaced = useCallback(
    (newBid: number) => {
      setLots((prev) =>
        prev.map((l) =>
          l.id === selectedLot.id
            ? { ...l, currentBid: newBid, bidCount: l.bidCount + 1 }
            : l
        )
      );
      setSelectedLot((prev) => ({ ...prev, currentBid: newBid, bidCount: prev.bidCount + 1 }));
    },
    [selectedLot.id]
  );

  const handleSelectLot = (lot: AuctionLot) => {
    setSelectedLot(lot);
    setTimeLeft(lot.timeLeft ?? 0);
    setActiveTab('bid');
  };

  const filteredLots = lots.filter((l) => {
    const statusMatch = filterStatus === 'all' || l.status === filterStatus;
    const catMatch = filterCategory === 'all' || l.category === filterCategory;
    return statusMatch && catMatch;
  });

  const categories = ['all', ...Array.from(new Set(lots.map((l) => l.category)))];
  const statusOptions: { value: 'all' | AuctionLot['status']; label: string }[] = [
    { value: 'all', label: 'All Lots' },
    { value: 'live', label: 'Live' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'sold', label: 'Sold' },
  ];

  const liveLot = lots.find((l) => l.status === 'live');
  const soldCount = lots.filter((l) => l.status === 'sold').length;
  const upcomingCount = lots.filter((l) => l.status === 'upcoming').length;

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      <Header />

      {/* ── Cinematic Auction Room Header ── */}
      <div className="pt-16">
        <div className="relative bg-[#1A1614] overflow-hidden">
          {/* Background artwork blur */}
          {liveLot && (
            <div className="absolute inset-0 opacity-10">
              <AppImage
                src={liveLot.image}
                alt=""
                fill
                className="object-cover blur-2xl scale-110"
                sizes="100vw"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1614]/80 via-[#1A1614]/60 to-[#1A1614]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Top row: session info */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A34828] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A34828]" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A34828]">Live Auction</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-[#FAF9F7]/20" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#FAF9F7]/40">The Inaugural Collection · Session I</span>
              <span className="w-1 h-1 rounded-full bg-[#FAF9F7]/20" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#FAF9F7]/40">15 Sep 2026 · Mumbai</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#FAF9F7] tracking-tight leading-none mb-3">
                  Auction Room
                </h1>
                {liveLot && (
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[11px] text-[#FAF9F7]/50 uppercase tracking-wider">Now on the block:</span>
                    <span className="text-sm font-semibold text-[#C4A882]">{liveLot.title}</span>
                    <span className="text-[11px] text-[#FAF9F7]/40">by {liveLot.artist}</span>
                  </div>
                )}
              </div>

              {/* Stats strip */}
              <div className="flex items-stretch gap-px bg-[#FAF9F7]/10 rounded-xl overflow-hidden border border-[#FAF9F7]/10">
                <div className="bg-[#FAF9F7]/5 px-6 py-4 text-center min-w-[80px]">
                  <p className="font-display text-2xl font-bold text-[#FAF9F7]">{lots.length}</p>
                  <p className="text-[10px] text-[#FAF9F7]/40 uppercase tracking-wider mt-0.5">Total</p>
                </div>
                <div className="bg-[#FAF9F7]/5 px-6 py-4 text-center min-w-[80px]">
                  <p className="font-display text-2xl font-bold text-[#6DBF8A]">{soldCount}</p>
                  <p className="text-[10px] text-[#FAF9F7]/40 uppercase tracking-wider mt-0.5">Sold</p>
                </div>
                <div className="bg-[#FAF9F7]/5 px-6 py-4 text-center min-w-[80px]">
                  <p className="font-display text-2xl font-bold text-[#C4A882]">{upcomingCount}</p>
                  <p className="text-[10px] text-[#FAF9F7]/40 uppercase tracking-wider mt-0.5">Upcoming</p>
                </div>
                {liveLot && (
                  <div className="bg-[#A34828]/20 px-6 py-4 text-center min-w-[100px]">
                    <p className="font-display text-2xl font-bold text-[#A34828]">
                      <Countdown seconds={timeLeft} />
                    </p>
                    <p className="text-[10px] text-[#FAF9F7]/40 uppercase tracking-wider mt-0.5">On Clock</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">

          {/* ── Left: Lot Grid ── */}
          <div>
            {/* Filters bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center">
              {/* Status filter */}
              <div className="flex items-center gap-1 bg-white border border-[#E2DDD5] rounded-xl p-1 shadow-sm">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilterStatus(opt.value)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 ${
                      filterStatus === opt.value
                        ? 'bg-[#231F20] text-white shadow-sm'
                        : 'text-[#645E59] hover:text-[#231F20] hover:bg-[#F5F3EF]'
                    }`}
                  >
                    {opt.label}
                    {opt.value !== 'all' && (
                      <span className={`ml-1.5 text-[10px] ${filterStatus === opt.value ? 'opacity-60' : 'opacity-50'}`}>
                        {lots.filter((l) => l.status === opt.value).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Category filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-white border border-[#E2DDD5] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#645E59] focus:outline-none focus:border-[#A34828] transition-colors shadow-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>

              <div className="ml-auto flex items-center gap-3">
                <span className="text-xs text-[#645E59]">
                  {filteredLots.length} lot{filteredLots.length !== 1 ? 's' : ''}
                </span>
                {/* View toggle */}
                <div className="flex items-center gap-0.5 bg-white border border-[#E2DDD5] rounded-lg p-0.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-[#231F20] text-white' : 'text-[#645E59] hover:text-[#231F20]'}`}
                    title="Grid view"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-[#231F20] text-white' : 'text-[#645E59] hover:text-[#231F20]'}`}
                    title="List view"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Lot grid */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLots.map((lot) => (
                  <LotCard
                    key={lot.id}
                    lot={lot}
                    onSelect={handleSelectLot}
                    isSelected={selectedLot.id === lot.id}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredLots.map((lot) => (
                  <div
                    key={lot.id}
                    onClick={() => handleSelectLot(lot)}
                    className={`group cursor-pointer bg-white rounded-xl border overflow-hidden transition-all duration-200 flex items-stretch ${
                      selectedLot.id === lot.id
                        ? 'ring-2 ring-[#A34828] border-transparent shadow-lg'
                        : 'border-[#E2DDD5] hover:border-[#C4A882] hover:shadow-md'
                    }`}
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                      <AppImage
                        src={lot.image}
                        alt={lot.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 px-4 py-3 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-mono font-bold text-[#645E59]">LOT {String(lot.lotNumber).padStart(2, '0')}</span>
                          <StatusBadge status={lot.status} />
                        </div>
                        <p className="text-sm font-semibold text-[#231F20] truncate">{lot.title}</p>
                        <p className="text-[11px] text-[#645E59] truncate">{lot.artist} · {lot.medium}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[10px] text-[#645E59] uppercase tracking-wider mb-0.5">
                          {lot.status === 'sold' ? 'Sold' : lot.status === 'live' ? 'Current' : 'Starting'}
                        </p>
                        <p className="font-display text-base font-bold text-[#A34828]">
                          {formatPrice(lot.status === 'upcoming' ? lot.startingBid : lot.currentBid)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredLots.length === 0 && (
              <div className="text-center py-20 text-[#645E59]">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 opacity-30">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <p className="text-sm font-medium">No lots match the selected filters.</p>
              </div>
            )}
          </div>

          {/* ── Right: Auction Console ── */}
          <div className="xl:sticky xl:top-20 xl:self-start space-y-4">

            {/* Artwork viewer */}
            <div className="bg-white border border-[#E2DDD5] rounded-2xl overflow-hidden shadow-sm">
              {/* Large artwork image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1614]">
                <AppImage
                  src={selectedLot.image}
                  alt={selectedLot.imageAlt}
                  fill
                  className="object-contain p-2"
                  sizes="400px"
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Lot number chip */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold font-mono text-white/80 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
                    LOT {String(selectedLot.lotNumber).padStart(2, '0')}
                  </span>
                </div>

                {/* Status */}
                <div className="absolute top-3 right-3">
                  <StatusBadge status={selectedLot.status} />
                </div>

                {/* Artwork info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C4A882] mb-1">{selectedLot.artist}</p>
                  <h2 className="font-display text-lg font-semibold text-white leading-tight line-clamp-2 mb-1">
                    {selectedLot.title}
                  </h2>
                  <p className="text-[11px] text-white/60">{selectedLot.medium} · {selectedLot.year}</p>
                </div>
              </div>

              {/* Tab nav */}
              <div className="flex border-b border-[#E2DDD5] bg-[#FAF9F7]">
                {(['bid', 'details'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                      activeTab === tab
                        ? 'text-[#A34828] border-b-2 border-[#A34828] bg-white'
                        : 'text-[#645E59] hover:text-[#231F20] hover:bg-white/50'
                    }`}
                  >
                    {tab === 'bid' ? '🔨 Place Bid' : '📋 Lot Details'}
                  </button>
                ))}
              </div>

              {/* Lot Details tab */}
              {activeTab === 'details' && (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: 'Medium', value: selectedLot.medium },
                      { label: 'Year', value: selectedLot.year },
                      ...(selectedLot.dimensions ? [{ label: 'Dimensions', value: selectedLot.dimensions }] : []),
                      ...(selectedLot.edition ? [{ label: 'Edition', value: selectedLot.edition }] : []),
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-[#F5F3EF] rounded-xl p-3">
                        <p className="text-[10px] text-[#645E59] uppercase tracking-wider mb-1 font-semibold">{label}</p>
                        <p className="text-xs font-semibold text-[#231F20] leading-tight">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[10px] text-[#645E59] uppercase tracking-wider mb-2 font-semibold">Description</p>
                    <p className="text-xs text-[#645E59] leading-relaxed line-clamp-5">{selectedLot.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLot.badges.map((b) => (
                      <span key={b} className="text-[10px] font-semibold uppercase tracking-wider text-[#A34828] border border-[#C4A882]/40 bg-[#FDF8F4] px-2.5 py-1 rounded-full">
                        {b}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/marketplace/${selectedLot.id}`}
                    className="flex items-center justify-center gap-2 text-xs font-bold text-[#A34828] hover:text-[#873B20] transition-colors py-2.5 border-2 border-[#E2DDD5] rounded-xl hover:border-[#A34828] hover:bg-[#FDF8F4]"
                  >
                    View Full Lot Details
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              )}
            </div>

            {/* Bid console */}
            {activeTab === 'bid' && (
              <BidConsoleInline
                key={selectedLot.id}
                lot={selectedLot}
                onBidPlaced={handleBidPlaced}
              />
            )}

            {/* IAH Guarantee */}
            <div className="bg-[#1A1614] rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#A34828]/20 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#FAF9F7] mb-1">IAH Authenticity Guarantee</p>
                  <p className="text-[11px] text-[#FAF9F7]/40 leading-relaxed">
                    All lots are IAH-certified. Buyer&apos;s premium 10% + 18% GST. Payment due within 5 business days of sale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
