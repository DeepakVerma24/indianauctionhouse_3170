'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import { listings } from '../data/listings';

function formatPrice(price: number): string {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Crore`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakh`;
  return `₹${price.toLocaleString('en-IN')}`;
}

type BuyStep = 'idle' | 'confirm' | 'details' | 'success';

function BuyModal({ listing, onClose }: { listing: typeof listings[number]; onClose: () => void }) {
  const [step, setStep] = useState<BuyStep>('confirm');
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/50 backdrop-blur-sm">
        <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#F5F3EF] border border-[#E2DDD5] flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3A6B4A" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <p className="text-xs text-[#A34828] font-semibold uppercase tracking-widest mb-2">Order Confirmed</p>
          <h2 className="font-display text-2xl font-semibold text-[#231F20] mb-3">Purchase Successful</h2>
          <p className="text-sm text-[#645E59] mb-2">
            Your order for <span className="text-[#231F20] font-semibold">{listing.title}</span> has been placed.
          </p>
          <p className="text-sm text-[#645E59] mb-6">
            A confirmation and provenance documentation will be sent to <span className="text-[#231F20]">{form.email || 'your email'}</span>. Our team will contact you within 24 hours to arrange white-glove delivery.
          </p>
          <div className="bg-[#F5F3EF] border border-[#E2DDD5] rounded-[4px] p-4 mb-6 text-left">
            <p className="text-xs text-[#645E59] mb-1">Order Reference</p>
            <p className="font-mono text-sm text-[#A34828] font-semibold">IAH-MKT-{Math.floor(Math.random() * 99999999).toString().padStart(8, '0')}</p>
          </div>
          <button onClick={onClose} className="w-full bg-[#A34828] text-[#FAF9F7] font-semibold py-3 rounded-[4px] hover:bg-[#873B20] transition-colors">
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  if (step === 'details') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/50 backdrop-blur-sm">
        <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] p-6 max-w-md w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-[#231F20]">Delivery Details</h2>
            <button onClick={onClose} className="text-[#645E59] hover:text-[#231F20] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-4 mb-6">
            {[
              { key: 'name', label: 'Full Name', placeholder: 'As on government ID', type: 'text' },
              { key: 'email', label: 'Email Address', placeholder: 'For order confirmation', type: 'email' },
              { key: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', type: 'tel' },
              { key: 'address', label: 'Delivery Address', placeholder: 'Full address with PIN code', type: 'text' },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-[#645E59] mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                  className="w-full bg-[#F5F3EF] border border-[#E2DDD5] rounded-[4px] px-4 py-2.5 text-sm text-[#231F20] placeholder:text-[#645E59]/50 focus:outline-none focus:border-[#A34828] transition-colors"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-[#E2DDD5] mb-4">
            <span className="text-sm text-[#645E59]">Total</span>
            <span className="font-display text-xl font-semibold text-[#231F20]">{formatPrice(listing.price)}</span>
          </div>
          <p className="text-xs text-[#645E59] mb-4 text-center">This is a simulated purchase. No real payment will be processed.</p>
          <div className="flex gap-3">
            <button onClick={() => setStep('confirm')} className="flex-1 border border-[#231F20] text-[#231F20] font-semibold py-3 rounded-[4px] hover:bg-[#231F20] hover:text-[#FAF9F7] transition-colors text-sm">
              Back
            </button>
            <button onClick={() => setStep('success')} className="flex-1 bg-[#A34828] text-[#FAF9F7] font-semibold py-3 rounded-[4px] hover:bg-[#873B20] transition-colors text-sm">
              Confirm Purchase
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/50 backdrop-blur-sm">
      <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold text-[#231F20]">Confirm Purchase</h2>
          <button onClick={onClose} className="text-[#645E59] hover:text-[#231F20] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex gap-4 mb-6 p-4 bg-[#F5F3EF] rounded-[4px] border border-[#E2DDD5]">
          <div className="relative w-20 h-20 rounded-[4px] overflow-hidden shrink-0">
            <AppImage src={listing.image} alt={listing.imageAlt} fill className="object-cover" sizes="80px" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[#A34828] font-semibold mb-0.5">{listing.artist}</p>
            <p className="font-display text-sm font-semibold text-[#231F20] line-clamp-2">{listing.title}</p>
            <p className="text-xs text-[#645E59] mt-0.5">{listing.medium} · {listing.year}</p>
          </div>
        </div>
        <div className="space-y-2 mb-6">
          {[
            { label: 'Item Price', value: formatPrice(listing.price) },
            { label: 'IAH Buyer Premium (0%)', value: '₹0' },
            { label: 'Insured Shipping', value: 'Calculated at delivery' },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between text-sm">
              <span className="text-[#645E59]">{row.label}</span>
              <span className="text-[#231F20] font-medium">{row.value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-3 border-t border-[#E2DDD5]">
            <span className="font-semibold text-[#231F20]">Total Due Now</span>
            <span className="font-display text-xl font-semibold text-[#A34828]">{formatPrice(listing.price)}</span>
          </div>
        </div>
        <div className="flex items-start gap-2 p-3 bg-[#F5F3EF] border border-[#E2DDD5] rounded-[4px] mb-5">
          <svg className="text-[#A34828] shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
          </svg>
          <p className="text-xs text-[#645E59]">
            This is a <span className="text-[#A34828] font-semibold">simulated purchase</span>. No real payment will be processed.
          </p>
        </div>
        <button onClick={() => setStep('details')} className="w-full bg-[#A34828] text-[#FAF9F7] font-semibold py-3 rounded-[4px] hover:bg-[#873B20] transition-colors">
          Proceed to Delivery Details
        </button>
      </div>
    </div>
  );
}

export default function MarketplaceDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const listing = listings.find((l) => l.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  if (!listing) {
    return (
      <main className="min-h-screen bg-[#F5F3EF]">
        <Header />
        <div className="pt-32 text-center">
          <p className="font-display text-2xl text-[#231F20] mb-4">Listing not found</p>
          <Link href="/marketplace" className="text-[#A34828] hover:underline text-sm">← Back to Marketplace</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const relatedListings = listings.filter((l) => l.id !== listing.id && l.category === listing.category).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <Header />
      {showBuyModal && <BuyModal listing={listing} onClose={() => setShowBuyModal(false)} />}

      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <nav className="flex items-center gap-2 text-xs text-[#645E59]">
            <Link href="/" className="hover:text-[#231F20] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/marketplace" className="hover:text-[#231F20] transition-colors">Marketplace</Link>
            <span>/</span>
            <span className="text-[#231F20] truncate max-w-[200px]">{listing.title}</span>
          </nav>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
            {/* Left: Gallery */}
            <div>
              <div className="relative aspect-square rounded-[5px] overflow-hidden border border-[#E2DDD5] mb-3">
                <AppImage
                  src={listing.galleryImages[activeImage]?.src || listing.image}
                  alt={listing.galleryImages[activeImage]?.alt || listing.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-semibold uppercase tracking-wider border border-[#E2DDD5] bg-[#FAF9F7]/90 backdrop-blur-sm px-3 py-1 rounded-full text-[#645E59]">
                    {listing.condition}
                  </span>
                </div>
              </div>
              {listing.galleryImages.length > 1 && (
                <div className="flex gap-2">
                  {listing.galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-16 h-16 rounded-[4px] overflow-hidden border-2 transition-colors ${
                        activeImage === i ? 'border-[#A34828]' : 'border-[#E2DDD5] hover:border-[#A34828]/40'
                      }`}
                    >
                      <AppImage src={img.src} alt={img.alt} fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#A34828]">{listing.category}</span>
                {listing.isNew && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#A34828] text-[#FAF9F7] px-2 py-0.5 rounded-full">New</span>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#231F20] mb-2 leading-tight" style={{ letterSpacing: '-0.01em' }}>{listing.title}</h1>

              {listing.artistId ? (
                <Link href={`/artists/${listing.artistId}`} className="text-sm text-[#A34828] font-semibold hover:underline mb-1 inline-block">
                  {listing.artist} →
                </Link>
              ) : (
                <p className="text-sm text-[#A34828] font-semibold mb-1">{listing.artist}</p>
              )}

              <p className="text-sm text-[#645E59] mb-6">
                {listing.medium} · {listing.year}
                {listing.dimensions && ` · ${listing.dimensions}`}
                {listing.edition && ` · ${listing.edition}`}
              </p>

              <div className="flex flex-wrap gap-2 mb-7">
                {listing.badges.map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A34828] border border-[#E2DDD5] bg-[#FAF9F7] px-3 py-1 rounded-full">
                    {b}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="p-6 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] mb-6">
                <p className="text-xs text-[#645E59] mb-1">Fixed Price</p>
                {listing.originalPrice && (
                  <p className="text-sm text-[#645E59] line-through mb-0.5">{formatPrice(listing.originalPrice)}</p>
                )}
                <p className="font-display text-4xl font-semibold text-[#A34828] mb-1">{formatPrice(listing.price)}</p>
                <p className="text-xs text-[#645E59]">Includes IAH certification · 0% buyer premium</p>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setShowBuyModal(true)}
                    className="flex-1 bg-[#A34828] text-[#FAF9F7] font-semibold py-3.5 rounded-[4px] text-sm hover:bg-[#873B20] transition-colors"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => setWishlist(!wishlist)}
                    className={`w-12 h-12 rounded-[4px] border flex items-center justify-center transition-colors ${
                      wishlist ? 'border-[#A34828] bg-[#A34828]/10 text-[#A34828]' : 'border-[#E2DDD5] text-[#645E59] hover:text-[#231F20] hover:border-[#A34828]'
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#E2DDD5]">
                  {[
                    { icon: '🔐', text: 'IAH Verified' },
                    { icon: '📦', text: 'Insured Delivery' },
                    { icon: '🔄', text: '7-Day Returns' },
                  ].map((s) => (
                    <div key={s.text} className="flex items-center gap-1.5 text-xs text-[#645E59]">
                      <span>{s.icon}</span>
                      <span>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seller */}
              <div className="flex items-center gap-3 p-4 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px]">
                <div className="w-9 h-9 rounded-full bg-[#F5F3EF] border border-[#E2DDD5] flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A34828" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[#645E59]">Listed by</p>
                  <p className="text-sm font-semibold text-[#231F20] flex items-center gap-1.5">
                    {listing.sellerName}
                    {listing.sellerVerified && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3A6B4A" strokeWidth="2.5">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" />
                      </svg>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description + Provenance */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#231F20] mb-4">About This Work</h2>
                <p className="text-[#645E59] text-sm leading-relaxed">{listing.description}</p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#231F20] mb-4">Provenance</h2>
                <div className="p-5 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px]">
                  <p className="text-sm text-[#645E59] leading-relaxed">{listing.provenance}</p>
                  {listing.dppHash && (
                    <div className="mt-4 pt-4 border-t border-[#E2DDD5]">
                      <p className="text-xs text-[#645E59] mb-1.5">Digital Product Passport Hash</p>
                      <p className="hash-glow text-xs text-[#A34828] p-2 rounded-[4px] font-mono break-all">{listing.dppHash}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-[#231F20] mb-4">Details</h2>
              <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] divide-y divide-[#E2DDD5]">
                {[
                  { label: 'Category', value: listing.category },
                  { label: 'Medium', value: listing.medium },
                  { label: 'Year', value: listing.year },
                  listing.dimensions ? { label: 'Dimensions', value: listing.dimensions } : null,
                  listing.edition ? { label: 'Edition', value: listing.edition } : null,
                  { label: 'Condition', value: listing.condition },
                  { label: 'Listed', value: new Date(listing.listedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                ].filter(Boolean).map((row) => (
                  <div key={row!.label} className="flex items-start justify-between px-4 py-3 gap-4">
                    <span className="text-xs text-[#645E59] shrink-0">{row!.label}</span>
                    <span className="text-xs text-[#231F20] font-medium text-right">{row!.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related listings */}
          {relatedListings.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-semibold text-[#231F20] mb-8">More in {listing.category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedListings.map((rel) => (
                  <Link key={rel.id} href={`/marketplace/${rel.id}`} className="block group">
                    <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] overflow-hidden card-hover">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <AppImage
                          src={rel.image}
                          alt={rel.imageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-[#A34828] font-semibold mb-0.5 truncate">{rel.artist}</p>
                        <p className="font-display text-sm font-semibold text-[#231F20] line-clamp-1 mb-1">{rel.title}</p>
                        <p className="font-display text-base font-semibold text-[#231F20]">{formatPrice(rel.price)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
