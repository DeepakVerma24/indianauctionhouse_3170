'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import { listings } from '@/app/marketplace/data/listings';

function formatPrice(price: number): string {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)}Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
  if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K`;
  return `₹${price.toLocaleString('en-IN')}`;
}

interface CartItem {
  id: string;
  title: string;
  artist: string;
  image: string;
  imageAlt: string;
  price: number;
  category: string;
  medium: string;
  condition: string;
  badges: string[];
  type: 'marketplace' | 'watchlist';
  lotNumber?: string;
  estimateLow?: number;
  estimateHigh?: number;
  currentBid?: number;
  saleDate?: string;
  saleSession?: string;
}

const initialMarketplaceItems: CartItem[] = [
  {
    id: listings[0].id,
    title: listings[0].title,
    artist: listings[0].artist,
    image: listings[0].image,
    imageAlt: listings[0].imageAlt,
    price: listings[0].price,
    category: listings[0].category,
    medium: listings[0].medium,
    condition: listings[0].condition,
    badges: listings[0].badges,
    type: 'marketplace',
  },
  {
    id: listings[2].id,
    title: listings[2].title,
    artist: listings[2].artist,
    image: listings[2].image,
    imageAlt: listings[2].imageAlt,
    price: listings[2].price,
    category: listings[2].category,
    medium: listings[2].medium,
    condition: listings[2].condition,
    badges: listings[2].badges,
    type: 'marketplace',
  },
  {
    id: listings[4].id,
    title: listings[4].title,
    artist: listings[4].artist,
    image: listings[4].image,
    imageAlt: listings[4].imageAlt,
    price: listings[4].price,
    category: listings[4].category,
    medium: listings[4].medium,
    condition: listings[4].condition,
    badges: listings[4].badges,
    type: 'marketplace',
  },
];

const initialWatchlistItems: CartItem[] = [
  {
    id: 'lot-01',
    title: 'Monsoon Geometry — Drop 001, Lot 1',
    artist: 'Aarav Mehta',
    image: listings[0].image,
    imageAlt: listings[0].imageAlt,
    price: 0,
    category: 'Contemporary Art',
    medium: 'Oil & Gold Leaf on Belgian Linen',
    condition: 'Mint',
    badges: ['IAH Certified', 'NFC Chipped'],
    type: 'watchlist',
    lotNumber: 'Lot 001',
    estimateLow: 250000,
    estimateHigh: 350000,
    currentBid: 285000,
    saleDate: '18 Sep 2026',
    saleSession: 'Drop 001 — Live Auction',
  },
  {
    id: 'lot-02',
    title: 'Shri Nathji Kamal Talai — Drop 001, Lot 2',
    artist: 'Master Kalyan Sharma',
    image: listings[1].image,
    imageAlt: listings[1].imageAlt,
    price: 0,
    category: 'Serigraphs',
    medium: 'Natural Stone Pigment on Cotton',
    condition: 'Mint',
    badges: ['GI Tagged', 'IAH Certified'],
    type: 'watchlist',
    lotNumber: 'Lot 002',
    estimateLow: 180000,
    estimateHigh: 260000,
    currentBid: 195000,
    saleDate: '18 Sep 2026',
    saleSession: 'Drop 001 — Live Auction',
  },
  {
    id: 'lot-03',
    title: 'Cosmic Tandava — Drop 001, Lot 3',
    artist: 'Swaminathan Sthapati',
    image: listings[2].image,
    imageAlt: listings[2].imageAlt,
    price: 0,
    category: 'Contemporary Art',
    medium: 'Panchaloha Lost-Wax Bronze',
    condition: 'Mint',
    badges: ['IAH Certified', 'NFC Chipped'],
    type: 'watchlist',
    lotNumber: 'Lot 003',
    estimateLow: 550000,
    estimateHigh: 750000,
    currentBid: 620000,
    saleDate: '18 Sep 2026',
    saleSession: 'Drop 001 — Live Auction',
  },
];

function BadgePill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center text-[9px] font-semibold uppercase tracking-wider text-[#A34828] border border-[#E2DDD5] bg-[#FAF9F7] px-1.5 py-0.5 rounded-full">
      {label}
    </span>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-1.5 text-[#645E59] hover:text-[#A34828] transition-colors rounded"
      aria-label="Remove item"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  );
}

export default function CartPage() {
  const [marketplaceItems, setMarketplaceItems] = useState<CartItem[]>(initialMarketplaceItems);
  const [watchlistItems, setWatchlistItems] = useState<CartItem[]>(initialWatchlistItems);
  const [activeTab, setActiveTab] = useState<'all' | 'marketplace' | 'watchlist'>('all');

  const removeMarketplace = (id: string) =>
    setMarketplaceItems((prev) => prev.filter((i) => i.id !== id));
  const removeWatchlist = (id: string) =>
    setWatchlistItems((prev) => prev.filter((i) => i.id !== id));

  const marketplaceTotal = marketplaceItems.reduce((sum, i) => sum + i.price, 0);
  const watchlistEstimateHigh = watchlistItems.reduce((sum, i) => sum + (i.estimateHigh ?? 0), 0);
  const totalItems = marketplaceItems.length + watchlistItems.length;

  const showMarketplace = activeTab === 'all' || activeTab === 'marketplace';
  const showWatchlist = activeTab === 'all' || activeTab === 'watchlist';

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <Header />

      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="mb-10 border-b border-[#E2DDD5] pb-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A34828] mb-2">
              Indian Auction House
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#231F20] tracking-tight">
                  Your Selection
                </h1>
                <p className="mt-1.5 text-sm text-[#645E59]">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} — favourited works &amp; auction watchlist
                </p>
              </div>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#645E59] hover:text-[#231F20] transition-colors border border-[#E2DDD5] px-4 py-2 rounded-[5px] bg-[#FAF9F7] self-start sm:self-auto"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Continue Browsing
              </Link>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-1 mb-8 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] p-1 w-fit">
            {(['all', 'marketplace', 'watchlist'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-[4px] transition-all ${
                  activeTab === tab
                    ? 'bg-[#231F20] text-[#FAF9F7]'
                    : 'text-[#645E59] hover:text-[#231F20]'
                }`}
              >
                {tab === 'all' && `All (${totalItems})`}
                {tab === 'marketplace' && `Favourites (${marketplaceItems.length})`}
                {tab === 'watchlist' && `Watchlist (${watchlistItems.length})`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left — Items */}
            <div className="lg:col-span-2 space-y-10">

              {/* Marketplace Favourites */}
              {showMarketplace && (
                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A34828" strokeWidth="1.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </div>
                    <h2 className="font-display text-lg font-semibold text-[#231F20] tracking-wide">
                      Favourited Marketplace Items
                    </h2>
                    <span className="text-xs text-[#645E59] border border-[#E2DDD5] px-2 py-0.5 rounded-full bg-[#FAF9F7]">
                      {marketplaceItems.length}
                    </span>
                  </div>

                  {marketplaceItems.length === 0 ? (
                    <div className="border border-dashed border-[#E2DDD5] rounded-[5px] py-12 text-center">
                      <p className="text-sm text-[#645E59]">No favourited items.</p>
                      <Link href="/marketplace" className="mt-3 inline-block text-xs font-semibold text-[#A34828] hover:text-[#873B20] transition-colors">
                        Browse Marketplace →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {marketplaceItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] p-4 flex gap-4 group"
                        >
                          {/* Thumbnail */}
                          <Link href={`/marketplace/${item.id}`} className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-[4px] overflow-hidden">
                            <AppImage
                              src={item.image}
                              alt={item.imageAlt}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="96px"
                            />
                          </Link>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <Link href={`/marketplace/${item.id}`}>
                                  <h3 className="font-display text-sm font-semibold text-[#231F20] leading-snug hover:text-[#A34828] transition-colors truncate">
                                    {item.title}
                                  </h3>
                                </Link>
                                <p className="text-xs text-[#645E59] mt-0.5">{item.artist}</p>
                              </div>
                              <RemoveButton onClick={() => removeMarketplace(item.id)} />
                            </div>

                            <p className="text-[10px] text-[#645E59] mt-1.5 truncate">{item.medium}</p>

                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.badges.slice(0, 3).map((b) => (
                                <BadgePill key={b} label={b} />
                              ))}
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              <span className="font-display text-base font-semibold text-[#231F20]">
                                {formatPrice(item.price)}
                              </span>
                              <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#E2DDD5] ${
                                item.condition === 'Mint' ? 'text-[#3A6B4A]' : 'text-[#645E59]'
                              } bg-[#FAF9F7]`}>
                                {item.condition}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Divider between sections when showing all */}
              {activeTab === 'all' && marketplaceItems.length > 0 && watchlistItems.length > 0 && (
                <div className="border-t border-[#E2DDD5]" />
              )}

              {/* Auction Watchlist */}
              {showWatchlist && (
                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A34828" strokeWidth="1.5">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <h2 className="font-display text-lg font-semibold text-[#231F20] tracking-wide">
                      Auction Lot Watchlist
                    </h2>
                    <span className="text-xs text-[#645E59] border border-[#E2DDD5] px-2 py-0.5 rounded-full bg-[#FAF9F7]">
                      {watchlistItems.length}
                    </span>
                  </div>

                  {watchlistItems.length === 0 ? (
                    <div className="border border-dashed border-[#E2DDD5] rounded-[5px] py-12 text-center">
                      <p className="text-sm text-[#645E59]">No lots on your watchlist.</p>
                      <Link href="/lot-detail" className="mt-3 inline-block text-xs font-semibold text-[#A34828] hover:text-[#873B20] transition-colors">
                        View Live Lots →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {watchlistItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] p-4 flex gap-4 group"
                        >
                          {/* Thumbnail */}
                          <Link href="/lot-detail" className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-[4px] overflow-hidden">
                            <AppImage
                              src={item.image}
                              alt={item.imageAlt}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="96px"
                            />
                            {/* Live badge */}
                            <div className="absolute top-1.5 left-1.5">
                              <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider bg-[#231F20]/80 text-[#FAF9F7] px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3A6B4A] animate-pulse inline-block" />
                                Live
                              </span>
                            </div>
                          </Link>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-[9px] font-semibold uppercase tracking-wider text-[#A34828]">
                                    {item.lotNumber}
                                  </span>
                                  <span className="text-[9px] text-[#645E59]">·</span>
                                  <span className="text-[9px] text-[#645E59] truncate">{item.saleSession}</span>
                                </div>
                                <Link href="/lot-detail">
                                  <h3 className="font-display text-sm font-semibold text-[#231F20] leading-snug hover:text-[#A34828] transition-colors">
                                    {item.title}
                                  </h3>
                                </Link>
                                <p className="text-xs text-[#645E59] mt-0.5">{item.artist}</p>
                              </div>
                              <RemoveButton onClick={() => removeWatchlist(item.id)} />
                            </div>

                            <p className="text-[10px] text-[#645E59] mt-1.5 truncate">{item.medium}</p>

                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.badges.slice(0, 2).map((b) => (
                                <BadgePill key={b} label={b} />
                              ))}
                            </div>

                            {/* Bid info */}
                            <div className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-1">
                              <div>
                                <p className="text-[9px] uppercase tracking-wider text-[#645E59] mb-0.5">Current Bid</p>
                                <span className="font-display text-base font-semibold text-[#231F20]">
                                  {formatPrice(item.currentBid ?? 0)}
                                </span>
                              </div>
                              <div>
                                <p className="text-[9px] uppercase tracking-wider text-[#645E59] mb-0.5">Estimate</p>
                                <span className="text-xs text-[#645E59]">
                                  {formatPrice(item.estimateLow ?? 0)} – {formatPrice(item.estimateHigh ?? 0)}
                                </span>
                              </div>
                              <div className="ml-auto">
                                <Link
                                  href="/lot-detail"
                                  className="text-[10px] font-semibold uppercase tracking-wider text-[#A34828] hover:text-[#873B20] transition-colors border border-[#A34828]/30 px-2.5 py-1 rounded-[4px]"
                                >
                                  Bid Now
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Empty state */}
              {totalItems === 0 && (
                <div className="border border-dashed border-[#E2DDD5] rounded-[5px] py-20 text-center">
                  <svg className="mx-auto mb-4 text-[#E2DDD5]" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p className="font-display text-lg text-[#231F20] mb-1">Your selection is empty</p>
                  <p className="text-sm text-[#645E59] mb-6">Favourite marketplace items or add auction lots to your watchlist.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/marketplace" className="bg-[#A34828] text-[#FAF9F7] text-xs font-semibold px-5 py-2.5 rounded-[5px] hover:bg-[#873B20] transition-colors tracking-wide">
                      Browse Marketplace
                    </Link>
                    <Link href="/lot-detail" className="border border-[#231F20] text-[#231F20] text-xs font-semibold px-5 py-2.5 rounded-[5px] hover:bg-[#231F20] hover:text-[#FAF9F7] transition-colors tracking-wide">
                      View Live Lots
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right — Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] p-6 sticky top-24">
                <h2 className="font-display text-base font-semibold text-[#231F20] mb-5 pb-4 border-b border-[#E2DDD5]">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  {/* Marketplace subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-[#645E59]">Marketplace items ({marketplaceItems.length})</span>
                    <span className="font-medium text-[#231F20]">{formatPrice(marketplaceTotal)}</span>
                  </div>

                  {/* Watchlist note */}
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[#645E59]">Watchlist lots ({watchlistItems.length})</span>
                    <span className="text-xs text-[#645E59] text-right">Bid to acquire</span>
                  </div>

                  {watchlistItems.length > 0 && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#645E59]">Combined estimate (high)</span>
                      <span className="text-[#645E59]">≤ {formatPrice(watchlistEstimateHigh)}</span>
                    </div>
                  )}

                  <div className="border-t border-[#E2DDD5] pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#231F20]">Marketplace Total</span>
                      <span className="font-display text-lg font-semibold text-[#231F20]">{formatPrice(marketplaceTotal)}</span>
                    </div>
                    <p className="text-[10px] text-[#645E59] mt-1">Buyer's premium &amp; taxes calculated at checkout</p>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="mt-6 space-y-3">
                  {marketplaceItems.length > 0 ? (
                    <Link
                      href="/sign-up-login"
                      className="block w-full bg-[#A34828] text-[#FAF9F7] text-sm font-semibold text-center py-3 rounded-[5px] hover:bg-[#873B20] transition-colors tracking-wide"
                    >
                      Proceed to Checkout
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="block w-full bg-[#E2DDD5] text-[#645E59] text-sm font-semibold text-center py-3 rounded-[5px] cursor-not-allowed tracking-wide"
                    >
                      Proceed to Checkout
                    </button>
                  )}

                  {watchlistItems.length > 0 && (
                    <Link
                      href="/sign-up-login"
                      className="block w-full border border-[#231F20] text-[#231F20] text-sm font-semibold text-center py-3 rounded-[5px] hover:bg-[#231F20] hover:text-[#FAF9F7] transition-colors tracking-wide"
                    >
                      Register to Bid
                    </Link>
                  )}
                </div>

                {/* Trust signals */}
                <div className="mt-6 pt-5 border-t border-[#E2DDD5] space-y-2.5">
                  {[
                    { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label: 'Bank-Grade Escrow Protection' },
                    { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'IAH Curatorial Vetting' },
                    { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', label: 'White-Glove Insured Logistics' },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3A6B4A" strokeWidth="1.5" className="flex-shrink-0">
                        <path d={icon} />
                      </svg>
                      <span className="text-[10px] text-[#645E59]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
