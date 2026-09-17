'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Gallery artwork images that cycle as the video background
const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=1920&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1920&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1920&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1920&q=85&auto=format&fit=crop',
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [prevImg, setPrevImg] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
    intervalRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setPrevImg(null);
        setActiveImg((prev) => {
          const next = (prev + 1) % GALLERY_IMAGES.length;
          setPrevImg(prev);
          return next;
        });
        setFading(false);
      }, 900);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ minHeight: '100svh', backgroundColor: '#0A0906' }}
    >
      {/* ── Looping gallery image background ── */}
      <div className="absolute inset-0">
        {/* Previous image (fades out) */}
        {prevImg !== null && (
          <div
            className="absolute inset-0 transition-opacity duration-900"
            style={{
              opacity: fading ? 0 : 1,
              transition: 'opacity 0.9s ease-in-out',
            }}
          >
            <img
              src={GALLERY_IMAGES[prevImg]}
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </div>
        )}

        {/* Active image */}
        <div
          className="absolute inset-0"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
          }}
        >
          <img
            src={GALLERY_IMAGES[activeImg]}
            alt="Art gallery with luxury collections"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Deep cinematic overlay — layered for premium depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,7,5,0.55) 0%, rgba(8,7,5,0.30) 35%, rgba(8,7,5,0.45) 65%, rgba(8,7,5,0.80) 100%)',
          }}
        />
        {/* Radial vignette for focus */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(5,4,3,0.55) 100%)',
          }}
        />
        {/* Subtle warm tint overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(30, 18, 4, 0.18)',
          }}
        />
        {/* Grain texture for premium feel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
            opacity: 0.4,
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* ── Image progress dots ── */}
      <div
        className="absolute bottom-8 left-1/2 flex gap-2 z-20"
        style={{ transform: 'translateX(-50%)' }}
      >
        {GALLERY_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            aria-label={`Gallery image ${i + 1}`}
            style={{
              width: i === activeImg ? '28px' : '6px',
              height: '4px',
              borderRadius: '999px',
              backgroundColor: i === activeImg ? '#C8A96E' : 'rgba(200,169,110,0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ── Live ticker strip ── */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 sm:px-10 lg:px-16 py-3"
        style={{ borderBottom: '1px solid rgba(200,169,110,0.12)' }}
      >
        <div className="flex items-center gap-3">
          {mounted && (
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: '#E8533A' }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: '#E8533A' }}
              />
            </span>
          )}
          <span
            className="text-xs uppercase tracking-widest font-semibold"
            style={{ color: '#E8533A', fontFamily: '"DM Sans", system-ui, sans-serif', letterSpacing: '0.18em' }}
          >
            Live Auction
          </span>
          <span
            className="hidden sm:inline text-xs"
            style={{ color: 'rgba(249,248,246,0.35)', fontFamily: '"DM Sans", system-ui, sans-serif' }}
          >
            · Evening Sale — Heritage &amp; Masterworks · Lot 14 of 38
          </span>
        </div>
        <Link
          href="/marketplace"
          className="text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-70"
          style={{ color: '#C8A96E', fontFamily: '"DM Sans", system-ui, sans-serif', letterSpacing: '0.14em' }}
        >
          Enter Saleroom →
        </Link>
      </div>

      {/* ── Central hero content ── */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8"
        style={{ paddingTop: '80px', paddingBottom: '80px', maxWidth: '900px', margin: '0 auto' }}
      >
        {/* Eyebrow label */}
        <div className="flex items-center gap-3 mb-8">
          <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(200,169,110,0.5)' }} />
          <span
            className="text-xs uppercase tracking-widest font-medium"
            style={{
              color: 'rgba(200,169,110,0.85)',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              letterSpacing: '0.24em',
            }}
          >
            India&apos;s Premier Auction House
          </span>
          <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(200,169,110,0.5)' }} />
        </div>

        {/* Main headline — large serif */}
        <h1
          className="font-bold select-none mb-6 text-[45px]"
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(2.4rem, 5.5vw, 5.2rem)',
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
            color: '#F9F8F6',
            textShadow: '0 2px 40px rgba(0,0,0,0.5)',
          }}
        >
          India&apos;s premier destination for luxury,{' '}
          <em
            style={{
              fontStyle: 'italic',
              color: '#D4AF6A',
            }}
          >
            where the exceptional finds its keeper.
          </em>
        </h1>

        {/* Hairline divider */}
        <div
          style={{
            width: '48px',
            height: '1px',
            backgroundColor: 'rgba(200,169,110,0.45)',
            margin: '0 auto 28px',
          }}
        />

        {/* Subheadline */}
        <p
          className="leading-relaxed mb-10"
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 'clamp(0.95rem, 1.35vw, 1.15rem)',
            color: 'rgba(249,248,246,0.62)',
            lineHeight: 1.85,
            maxWidth: '720px',
            letterSpacing: '0.01em',
          }}
        >
          Rare masterpieces, royal jewels, and timeless antiquities from India&apos;s most distinguished
          collections. Each lot authenticated by leading specialists, every acquisition secured in escrow.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Primary CTA — solid antique gold */}
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2.5 font-semibold transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '0.9rem',
              letterSpacing: '0.025em',
              backgroundColor: '#C8A96E',
              color: '#0D0C0A',
              borderRadius: '4px',
              padding: '15px 32px',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 24px rgba(200,169,110,0.25)',
            }}
          >
            Browse live auctions
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Secondary CTA — outlined */}
          <Link
            href="/consignment"
            className="inline-flex items-center gap-2 font-medium transition-all duration-200 hover:bg-white/8 active:scale-95"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: '0.9rem',
              letterSpacing: '0.025em',
              color: 'rgba(249,248,246,0.85)',
              borderRadius: '4px',
              padding: '14px 28px',
              border: '1px solid rgba(249,248,246,0.28)',
              background: 'transparent',
              whiteSpace: 'nowrap',
            }}
          >
            Consign a lot
          </Link>
        </div>

        {/* Trust micro-line */}
        <div className="flex items-center gap-4 mt-10">
          {['KYC-Verified Sellers', 'Escrow Protected', 'NFC Provenance'].map((item, i) => (
            <React.Fragment key={item}>
              {i > 0 && (
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'rgba(200,169,110,0.35)', display: 'inline-block' }} />
              )}
              {/* item label removed */}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
