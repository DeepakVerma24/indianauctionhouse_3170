'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import { listings, categories, priceRanges, ListingCategory, MarketplaceListing } from './data/listings';
import { useCurrencyLanguage } from '@/context/CurrencyLanguageContext';

const conditionColors: Record<string, string> = {
  Mint: 'text-[#3A6B4A] border-[#E2DDD5] bg-[#FAF9F7]',
  Excellent: 'text-[#231F20] border-[#E2DDD5] bg-[#FAF9F7]',
  'Very Good': 'text-[#A34828] border-[#E2DDD5] bg-[#FAF9F7]',
  Good: 'text-[#645E59] border-[#E2DDD5] bg-[#FAF9F7]',
};

function BadgePill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#A34828] border border-[#E2DDD5] bg-[#FAF9F7] px-2 py-0.5 rounded-full">
      {label === 'NFC Chipped' && (
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <path d="M9 9h6v6H9z" />
        </svg>
      )}
      {label}
    </span>
  );
}

function ListingCard({ listing }: { listing: MarketplaceListing }) {
  const { formatPrice, country } = useCurrencyLanguage();
  return (
    <Link href={`/marketplace/${listing.id}`} className="block group">
      <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] overflow-hidden card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <AppImage
            src={listing.image}
            alt={listing.imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {listing.isNew && (
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#A34828] text-[#FAF9F7] px-2 py-0.5 rounded-full">
                New
              </span>
            )}
            {listing.isFeatured && !listing.isNew && (
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#FAF9F7]/90 backdrop-blur-sm text-[#231F20] border border-[#E2DDD5] px-2 py-0.5 rounded-full">
                Featured
              </span>
            )}
          </div>
          {/* Condition */}
          <div className="absolute top-3 right-3">
            <span className={`text-[10px] font-semibold uppercase tracking-wider border px-2 py-0.5 rounded-full backdrop-blur-sm ${conditionColors[listing.condition]}`}>
              {listing.condition}
            </span>
          </div>
          {/* Category */}
          <div className="absolute bottom-3 left-3">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FAF9F7]/90 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
              {listing.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex-1">
            <p className="text-xs text-[#A34828] font-semibold mb-0.5 truncate">{listing.artist}</p>
            <h3 className="font-display text-base font-semibold text-[#231F20] leading-tight mb-1 line-clamp-2">{listing.title}</h3>
            <p className="text-xs text-[#645E59] mb-3 line-clamp-1">{listing.medium} · {listing.year}{listing.edition ? ` · ${listing.edition}` : ''}</p>
            {/* Badges */}
            <div className="flex flex-wrap gap-1 mb-3">
              {listing.badges.slice(0, 3).map((b) => (
                <BadgePill key={b} label={b} />
              ))}
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-end justify-between pt-3 border-t border-[#E2DDD5]">
            <div>
              {listing.originalPrice && (
                <p className="text-xs text-[#645E59] line-through">{formatPrice(listing.originalPrice)}</p>
              )}
              <p className="font-display text-xl font-semibold text-[#231F20]">{formatPrice(listing.price)}</p>
              <p className="text-[10px] text-[#645E59]">Fixed Price · Buy Now</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A34828] group-hover:gap-2.5 transition-all">
              View
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function FeaturedBanner({ listing }: { listing: MarketplaceListing }) {
  const { formatPrice } = useCurrencyLanguage();
  return (
    <Link href={`/marketplace/${listing.id}`} className="block group">
      <div className="relative rounded-[5px] overflow-hidden border border-[#E2DDD5] card-hover h-72 sm:h-80">
        <AppImage
          src={listing.image}
          alt={listing.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FAF9F7]/70 mb-2">{listing.category} · Featured</span>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#FAF9F7] mb-1 max-w-xs">{listing.title}</h3>
          <p className="text-sm text-[#FAF9F7]/70 mb-4">{listing.artist} · {listing.medium}</p>
          <div className="flex items-center gap-4">
            <div>
              <p className="font-display text-2xl font-semibold text-[#FAF9F7]">{formatPrice(listing.price)}</p>
              <p className="text-xs text-[#FAF9F7]/60">Fixed Price</p>
            </div>
            <span className="flex items-center gap-2 bg-[#A34828] text-[#FAF9F7] text-xs font-semibold px-4 py-2 rounded-[4px] group-hover:bg-[#873B20] transition-colors">
              Buy Now
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState<ListingCategory | 'All'>('All');
  const [activePriceRange, setActivePriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = listings.filter((l) => l.isFeatured).slice(0, 2);

  const filtered = useMemo(() => {
    let result = [...listings];
    if (activeCategory !== 'All') result = result.filter((l) => l.category === activeCategory);
    if (activePriceRange !== null) {
      const range = priceRanges[activePriceRange];
      result = result.filter((l) => l.price >= range.min && l.price <= range.max);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.artist.toLowerCase().includes(q) ||
          l.medium.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'newest') result.sort((a, b) => b.listedAt.localeCompare(a.listedAt));
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    return result;
  }, [activeCategory, activePriceRange, sortBy, searchQuery]);

  return (
    <main className="min-h-screen bg-[#F5F3EF] overflow-x-hidden">
      <Header />
      <div className="pt-20">
        {/* Hero header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-3">
            <div>
              <p className="text-xs text-[#A34828] font-semibold uppercase tracking-widest mb-3">IAH Marketplace</p>
              <h1 className="font-display text-hero-md text-[#231F20]" style={{ letterSpacing: '-0.01em' }}>Digital Showroom</h1>
            </div>
            <p className="text-sm text-[#645E59]">{listings.length} verified listings · Fixed-price instant buy</p>
          </div>
          <p className="text-[#645E59] text-base max-w-2xl mt-3">
            Contemporary art, serigraphs, luxury objects, and certified estate items — each piece verified, documented, and available for immediate purchase.
          </p>
        </div>

        {/* Featured banners */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {featured.map((l) => (
              <FeaturedBanner key={l.id} listing={l} />
            ))}
          </div>
        </div>

        {/* Filters bar */}
        <div className="sticky top-16 z-30 bg-[#FAF9F7]/95 backdrop-blur-md border-b border-[#E2DDD5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#645E59]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search works, artists…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF9F7] border border-[#E2DDD5] rounded-full pl-8 pr-4 py-1.5 text-sm text-[#231F20] placeholder:text-[#645E59]/60 focus:outline-none focus:border-[#A34828] transition-colors"
              />
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['All', ...categories] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-[4px] border transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#A34828] text-[#FAF9F7] border-[#A34828]'
                      : 'border-[#E2DDD5] text-[#645E59] hover:text-[#231F20] hover:border-[#A34828]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Price filter */}
            <div className="flex items-center gap-1.5">
              {priceRanges.map((range, i) => (
                <button
                  key={range.label}
                  onClick={() => setActivePriceRange(activePriceRange === i ? null : i)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-[4px] border transition-colors ${
                    activePriceRange === i
                      ? 'bg-[#A34828]/10 text-[#A34828] border-[#A34828]/50'
                      : 'border-[#E2DDD5] text-[#645E59] hover:text-[#231F20] hover:border-[#A34828]'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] px-3 py-1.5 text-xs text-[#645E59] focus:outline-none focus:border-[#A34828] transition-colors cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Listings grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-2xl text-[#231F20] mb-2">No listings found</p>
              <p className="text-[#645E59] text-sm">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-[#645E59] mb-6">{filtered.length} listing{filtered.length !== 1 ? 's' : ''}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Trust strip */}
        <div className="border-t border-[#E2DDD5] bg-[#FAF9F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { icon: '🔐', label: 'IAH Certified', desc: 'Every item verified by our curatorial team' },
                { icon: '📦', label: 'Insured Shipping', desc: 'White-glove delivery across India & internationally' },
                { icon: '🔄', label: '7-Day Returns', desc: 'Full refund if item differs from description' },
                { icon: '📜', label: 'Provenance Docs', desc: 'Complete documentation with every purchase' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-sm font-semibold text-[#231F20]">{item.label}</p>
                  <p className="text-xs text-[#645E59]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
