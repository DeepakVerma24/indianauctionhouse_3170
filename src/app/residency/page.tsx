'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  fullName: string;
  primaryMedium: string;
  portfolioLink: string;
  statement: string;
}

// ─── Fellowship Perks Data ────────────────────────────────────────────────────
const perks = [
  {
    tag: '01 / FINANCIAL',
    title: 'Guaranteed Stipend',
    body: 'Upfront financial security disbursed monthly throughout the residency term — no grants, no delays.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.3">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v2m0 8v2M9 9h4.5a1.5 1.5 0 010 3H10.5a1.5 1.5 0 000 3H15" />
      </svg>
    ),
  },
  {
    tag: '02 / LOGISTICS',
    title: 'Full Hospitality & Travel',
    body: 'Round-trip international transit, private accommodation, and chef-prepared artisanal dining for the full cohort term.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.3">
        <path d="M3 17l2-8h14l2 8H3z" />
        <path d="M7 17V9m5 8V9m5 8V9" />
        <path d="M1 17h22" />
        <circle cx="5" cy="20" r="1.5" />
        <circle cx="19" cy="20" r="1.5" />
      </svg>
    ),
  },
  {
    tag: '03 / PROTECTION',
    title: 'Health & Artwork Insurance',
    body: 'Complete medical coverage for fellows plus transit, liability, and in-studio insurance for every work produced.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.3">
        <path d="M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    tag: '04 / COMMERCE',
    title: 'Auction Profit Share',
    body: 'High hammer-split on primary auction sales plus perpetual secondary-market royalties encoded in the digital passport.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.3">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
];

// ─── Provenance Pillars Data ──────────────────────────────────────────────────
const pillars = [
  {
    num: 'I',
    title: 'NFC-from-Birth Hardware',
    body: 'Cryptographic micro-tag attached to canvas stretchers, tapped via IAH Admin App at the first sketch. Every brushstroke timestamped from genesis.',
  },
  {
    num: 'II',
    title: 'Artist Hub Media Engine',
    body: 'Dedicated film crew producing daily 4K reels and process diaries. The making becomes as collectible as the made.',
  },
  {
    num: 'III',
    title: '3D Virtual Open Studio',
    body: 'Photogrammetric spatial scan of the workspace, playable in VR/WebGL. Collectors walk the studio before the auction opens.',
  },
  {
    num: 'IV',
    title: 'Digital Product Passport',
    body: 'Immutable ledger record carrying pigment certificates, time-lapses, and curator voice notes. Provenance that outlives institutions.',
  },
];

// ─── Hotspot badges for studio preview ───────────────────────────────────────
const hotspots = [
  {
    label: 'Canvas #02: Jharokha Geometry',
    sublabel: 'NFC Verified • Oil on Linen',
    top: '38%',
    left: '28%',
  },
  {
    label: 'Sculpture Study: Bronze & Terracotta',
    sublabel: 'In Progress',
    top: '55%',
    left: '62%',
  },
];

const navPills = ['Reset Camera', 'Easel 1', 'Easel 2', 'Pigment Table'];

// ─── Multi-step form steps ────────────────────────────────────────────────────
const STEPS = ['Identity', 'Practice', 'Portfolio', 'Statement'];

export default function ResidencyPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    fullName: '',
    primaryMedium: '',
    portfolioLink: '',
    statement: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [activeNavPill, setActiveNavPill] = useState<string>('Reset Camera');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canAdvance = () => {
    if (step === 0) return form.fullName.trim().length > 1;
    if (step === 1) return form.primaryMedium.trim().length > 1;
    if (step === 2) return form.portfolioLink.trim().length > 4;
    if (step === 3) return form.statement.trim().length > 20;
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canAdvance()) setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ background: '#0F0F11', color: '#F8F7F4' }}>
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
        {/* Atmospheric grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(212,175,55,0.05) 0%, transparent 60%)',
          }}
        />
        {/* Thin horizontal rule lines */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(248,247,244,0.03) 80px)' }} />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12 py-24">
          {/* Tag */}
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px" style={{ background: '#D4AF37' }} />
            <span
              className="text-xs font-semibold tracking-[0.25em] uppercase"
              style={{ color: '#D4AF37', fontFamily: 'JetBrains Mono, IBM Plex Mono, monospace' }}
            >
              Cohort Inauguration &nbsp;•&nbsp; Applications Open
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-8 max-w-4xl"
            style={{ fontFamily: 'Fraunces, Crimson Text, Georgia, serif', color: '#F8F7F4', letterSpacing: '-0.02em' }}
          >
            A Fully-Funded Sanctuary for{' '}
            <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Living Masters</em>{' '}
            &amp; New Horizons
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-2xl mb-12"
            style={{ color: 'rgba(248,247,244,0.65)', fontFamily: 'DM Sans, Manrope, sans-serif' }}
          >
            Where historic artistic disciplines meet cryptographic NFC provenance, daily media production, and global auction representation.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#apply"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-200"
              style={{
                background: '#D4AF37',
                color: '#0F0F11',
                fontFamily: 'DM Sans, sans-serif',
                letterSpacing: '0.06em',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#E8C84A'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#D4AF37'; }}
            >
              Apply to the Residency
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#studio"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-200"
              style={{
                border: '1px solid rgba(212,175,55,0.6)',
                color: '#D4AF37',
                fontFamily: 'DM Sans, sans-serif',
                letterSpacing: '0.06em',
                background: 'transparent',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#D4AF37'; (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.06)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.6)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
              </svg>
              Step Inside the 3D Studio
            </a>
          </div>

          {/* Stat strip */}
          <div className="mt-20 flex flex-wrap gap-10 border-t pt-10" style={{ borderColor: 'rgba(248,247,244,0.08)' }}>
            {[
              { val: '12', label: 'Fellows per Cohort' },
              { val: '6 mo', label: 'Residency Duration' },
              { val: '100%', label: 'Funded & Insured' },
              { val: '∞', label: 'Secondary Royalties' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif', color: '#D4AF37' }}>{s.val}</div>
                <div className="text-xs uppercase tracking-widest" style={{ color: 'rgba(248,247,244,0.45)', fontFamily: 'JetBrains Mono, monospace' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FELLOWSHIP PERKS BENTO ───────────────────────────────────────── */}
      <section className="py-28 px-6 lg:px-12" style={{ borderTop: '1px solid rgba(248,247,244,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: '#D4AF37', fontFamily: 'JetBrains Mono, monospace' }}>
              Fellowship Benefits
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: 'Fraunces, serif', color: '#F8F7F4', letterSpacing: '-0.02em' }}>
              Every Fellow, Fully Supported
            </h2>
          </div>

          {/* Asymmetric bento: 2 wide + 2 tall */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(248,247,244,0.06)' }}>
            {perks.map((perk, i) => (
              <div
                key={perk.title}
                className="group relative p-8 flex flex-col justify-between transition-all duration-300"
                style={{
                  background: i % 2 === 0 ? '#0F0F11' : '#111114',
                  minHeight: i === 0 || i === 3 ? '320px' : '280px',
                }}
              >
                {/* Hover gold line */}
                <div
                  className="absolute top-0 left-0 w-full h-px transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
                />
                <div>
                  <div className="mb-6">{perk.icon}</div>
                  <span className="text-xs tracking-[0.2em] uppercase mb-3 block" style={{ color: 'rgba(212,175,55,0.6)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {perk.tag}
                  </span>
                  <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Fraunces, serif', color: '#F8F7F4' }}>
                    {perk.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,247,244,0.55)', fontFamily: 'DM Sans, sans-serif' }}>
                    {perk.body}
                  </p>
                </div>
                <div className="mt-8 w-8 h-px" style={{ background: '#D4AF37' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROVENANCE PILLARS 2×2 ───────────────────────────────────────── */}
      <section className="py-28 px-6 lg:px-12" style={{ borderTop: '1px solid rgba(248,247,244,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: '#D4AF37', fontFamily: 'JetBrains Mono, monospace' }}>
                Provenance Architecture
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: 'Fraunces, serif', color: '#F8F7F4', letterSpacing: '-0.02em' }}>
                The 4 Provenance Pillars
              </h2>
            </div>
            <p className="text-sm max-w-xs" style={{ color: 'rgba(248,247,244,0.45)', fontFamily: 'DM Sans, sans-serif' }}>
              A four-layer system that makes every work irrefutably authentic from first mark to final hammer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(248,247,244,0.06)' }}>
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="group relative p-10 transition-all duration-300"
                style={{ background: '#0F0F11' }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(212,175,55,0.04) 0%, transparent 70%)' }}
                />
                <div className="flex items-start gap-6">
                  <span
                    className="text-5xl font-bold shrink-0 leading-none"
                    style={{ fontFamily: 'Fraunces, serif', color: 'rgba(212,175,55,0.18)', letterSpacing: '-0.04em' }}
                  >
                    {p.num}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Fraunces, serif', color: '#F8F7F4' }}>
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,247,244,0.55)', fontFamily: 'DM Sans, sans-serif' }}>
                      {p.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE STUDIO PREVIEW ──────────────────────────────────────────── */}
      <section id="studio" className="py-28 px-6 lg:px-12" style={{ borderTop: '1px solid rgba(248,247,244,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: '#D4AF37', fontFamily: 'JetBrains Mono, monospace' }}>
              Virtual Access
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: 'Fraunces, serif', color: '#F8F7F4', letterSpacing: '-0.02em' }}>
              Live Studio Preview
            </h2>
          </div>

          {/* ── 3D Interactive Viewport ── */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: '16/9',
              background: 'linear-gradient(160deg, #1c1408 0%, #12100a 30%, #0e1510 55%, #0a0a14 100%)',
              border: '1px solid rgba(212,175,55,0.25)',
              boxShadow: '0 0 80px rgba(212,175,55,0.06), inset 0 0 120px rgba(0,0,0,0.6)',
            }}
          >
            {/* ── Architecturally Rich Studio Scene (SVG) ── */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="skylightGlow" cx="50%" cy="0%" r="55%">
                  <stop offset="0%" stopColor="#f5e6b0" stopOpacity="0.18" />
                  <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#0F0F11" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="floorReflect" cx="50%" cy="100%" r="60%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e1508" stopOpacity="1" />
                  <stop offset="50%" stopColor="#231a0c" stopOpacity="1" />
                  <stop offset="100%" stopColor="#1a1208" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1a1610" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0d0c09" stopOpacity="1" />
                </linearGradient>
                <filter id="softBlur">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>

              {/* Back wall — sandstone */}
              <rect x="0" y="0" width="1600" height="580" fill="url(#wallGrad)" />
              {/* Sandstone texture lines */}
              {[60, 120, 180, 240, 300, 360, 420, 480, 540].map((y) => (
                <line key={`wt${y}`} x1="0" y1={y} x2="1600" y2={y} stroke="rgba(212,175,55,0.04)" strokeWidth="1" />
              ))}
              {[100, 250, 400, 600, 800, 1000, 1200, 1400].map((x) => (
                <line key={`wv${x}`} x1={x} y1="0" x2={x} y2="580" stroke="rgba(212,175,55,0.025)" strokeWidth="0.5" />
              ))}

              {/* Polished stone floor */}
              <rect x="0" y="560" width="1600" height="340" fill="url(#floorGrad)" />
              <rect x="0" y="560" width="1600" height="340" fill="url(#floorReflect)" />
              {/* Floor tiles */}
              {[...Array(9)].map((_, i) => (
                <line key={`ft${i}`} x1={i * 200} y1="560" x2={i * 200} y2="900" stroke="rgba(212,175,55,0.06)" strokeWidth="1" />
              ))}
              {[600, 680, 760, 840].map((y) => (
                <line key={`fh${y}`} x1="0" y1={y} x2="1600" y2={y} stroke="rgba(212,175,55,0.04)" strokeWidth="1" />
              ))}

              {/* Perspective vanishing lines */}
              {[...Array(7)].map((_, i) => (
                <line key={`pl${i}`} x1={800 - 800 * (i / 7)} y1={900} x2={800} y2={460} stroke="rgba(212,175,55,0.03)" strokeWidth="1" />
              ))}
              {[...Array(7)].map((_, i) => (
                <line key={`pr${i}`} x1={800 + 800 * (i / 7)} y1={900} x2={800} y2={460} stroke="rgba(212,175,55,0.03)" strokeWidth="1" />
              ))}

              {/* Skylight panels at ceiling */}
              <rect x="550" y="0" width="500" height="8" fill="rgba(245,230,176,0.25)" />
              <rect x="560" y="0" width="480" height="4" fill="rgba(245,230,176,0.4)" />
              {/* Skylight glow cone */}
              <ellipse cx="800" cy="0" rx="280" ry="20" fill="rgba(245,230,176,0.12)" />
              <polygon points="560,0 1040,0 920,420 680,420" fill="url(#skylightGlow)" />

              {/* Directional light pool on floor */}
              <ellipse cx="800" cy="700" rx="220" ry="60" fill="rgba(245,230,176,0.06)" filter="url(#softBlur)" />

              {/* ── Easel 1 (left) with large oil canvas ── */}
              <g opacity="0.9">
                {/* Easel legs */}
                <line x1="340" y1="760" x2="390" y2="440" stroke="#8B6914" strokeWidth="3" />
                <line x1="460" y1="760" x2="410" y2="440" stroke="#8B6914" strokeWidth="3" />
                <line x1="340" y1="760" x2="460" y2="760" stroke="#8B6914" strokeWidth="2.5" />
                {/* Cross brace */}
                <line x1="355" y1="680" x2="445" y2="680" stroke="#8B6914" strokeWidth="2" />
                {/* Canvas frame */}
                <rect x="355" y="440" width="110" height="145" fill="#1a1205" stroke="#8B6914" strokeWidth="2.5" rx="1" />
                {/* Canvas painting — warm abstract */}
                <rect x="360" y="445" width="100" height="135" fill="#1e1508" />
                <rect x="362" y="447" width="96" height="131" fill="#221a0a" />
                {/* Jharokha geometry painting strokes */}
                <rect x="368" y="453" width="84" height="119" fill="#1c1408" />
                <polygon points="410,460 450,510 410,560 370,510" fill="none" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5" />
                <polygon points="410,468 442,508 410,548 378,508" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
                <line x1="410" y1="453" x2="410" y2="572" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
                <line x1="362" y1="508" x2="446" y2="508" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
                <circle cx="410" cy="508" r="8" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />
                {/* NFC tag indicator */}
                <rect x="362" y="568" width="12" height="8" fill="rgba(212,175,55,0.6)" rx="1" />
              </g>

              {/* ── Easel 2 (right) with canvas ── */}
              <g opacity="0.75">
                <line x1="1130" y1="740" x2="1175" y2="460" stroke="#8B6914" strokeWidth="3" />
                <line x1="1240" y1="740" x2="1195" y2="460" stroke="#8B6914" strokeWidth="3" />
                <line x1="1130" y1="740" x2="1240" y2="740" stroke="#8B6914" strokeWidth="2.5" />
                <line x1="1145" y1="660" x2="1225" y2="660" stroke="#8B6914" strokeWidth="2" />
                <rect x="1148" y="460" width="95" height="125" fill="#1a1205" stroke="#8B6914" strokeWidth="2.5" rx="1" />
                <rect x="1153" y="465" width="85" height="115" fill="#1c1408" />
                {/* Abstract painting strokes */}
                <line x1="1153" y1="490" x2="1238" y2="490" stroke="rgba(180,120,40,0.4)" strokeWidth="2" />
                <line x1="1153" y1="510" x2="1238" y2="510" stroke="rgba(180,120,40,0.3)" strokeWidth="1.5" />
                <ellipse cx="1195" cy="520" rx="28" ry="18" fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="1.5" />
                <line x1="1165" y1="540" x2="1225" y2="560" stroke="rgba(180,120,40,0.3)" strokeWidth="1.5" />
              </g>

              {/* ── Sculpture Plinth (center-right) ── */}
              <g opacity="0.8">
                {/* Plinth base */}
                <rect x="720" y="680" width="90" height="120" fill="#1e1a12" stroke="rgba(212,175,55,0.2)" strokeWidth="1.5" />
                <rect x="715" y="675" width="100" height="12" fill="#2a2418" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
                {/* Bronze sculpture silhouette */}
                <ellipse cx="765" cy="660" rx="22" ry="28" fill="#3d2e10" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" />
                <ellipse cx="765" cy="640" rx="14" ry="16" fill="#4a3812" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
                <ellipse cx="765" cy="625" rx="8" ry="10" fill="#5a4418" />
                {/* Terracotta base piece */}
                <ellipse cx="765" cy="678" rx="25" ry="8" fill="#6b3a1f" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
                {/* "In Progress" tag */}
                <rect x="740" y="800" width="50" height="14" fill="rgba(212,175,55,0.12)" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" rx="2" />
              </g>

              {/* ── Pigment Table (far left) ── */}
              <g opacity="0.6">
                <rect x="60" y="680" width="180" height="12" fill="#2a2010" stroke="rgba(212,175,55,0.15)" strokeWidth="1" />
                <rect x="70" y="692" width="8" height="80" fill="#1e1808" />
                <rect x="222" y="692" width="8" height="80" fill="#1e1808" />
                {/* Paint tubes and jars */}
                {[80, 100, 120, 140, 160, 180, 200].map((x, i) => (
                  <rect key={`pt${i}`} x={x} y={660} width="14" height={20 + i * 2} fill={['#8B1A1A','#D4AF37','#1A4A8B','#2A6B2A','#8B5A1A','#6B1A6B','#1A6B6B'][i]} opacity="0.7" rx="2" />
                ))}
                {/* Palette */}
                <ellipse cx="155" cy="658" rx="40" ry="18" fill="#2a1e0a" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
              </g>

              {/* ── Ambient wall sconces ── */}
              <g opacity="0.5">
                <rect x="200" y="280" width="6" height="40" fill="rgba(212,175,55,0.4)" />
                <ellipse cx="203" cy="278" rx="12" ry="6" fill="rgba(245,230,176,0.3)" />
                <ellipse cx="203" cy="278" rx="30" ry="20" fill="rgba(245,230,176,0.06)" filter="url(#softBlur)" />
              </g>
              <g opacity="0.4">
                <rect x="1390" y="300" width="6" height="40" fill="rgba(212,175,55,0.4)" />
                <ellipse cx="1393" cy="298" rx="12" ry="6" fill="rgba(245,230,176,0.3)" />
                <ellipse cx="1393" cy="298" rx="30" ry="20" fill="rgba(245,230,176,0.06)" filter="url(#softBlur)" />
              </g>

              {/* Atmospheric depth haze */}
              <rect x="0" y="0" width="200" height="900" fill="rgba(10,8,5,0.35)" />
              <rect x="1400" y="0" width="200" height="900" fill="rgba(10,8,5,0.35)" />
            </svg>

            {/* ── TOP-LEFT: Spatial Scan Badge ── */}
            <div
              className="absolute top-4 left-4 flex items-center gap-2.5 px-3.5 py-2"
              style={{
                background: 'rgba(15,15,17,0.88)',
                border: '1px solid rgba(212,175,55,0.4)',
                backdropFilter: 'blur(10px)',
                borderRadius: '4px',
              }}
            >
              {/* Orbit icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8">
                <circle cx="12" cy="12" r="3" />
                <ellipse cx="12" cy="12" rx="10" ry="4" />
                <line x1="12" y1="2" x2="12" y2="22" stroke="#D4AF37" strokeWidth="1.8" />
              </svg>
              <div>
                <div className="text-xs font-bold leading-tight" style={{ color: '#D4AF37', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>
                  3D Spatial Scan • Interactive Walkthrough
                </div>
                <div className="text-xs leading-tight mt-0.5" style={{ color: 'rgba(248,247,244,0.5)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em' }}>
                  Orbit / Walk Mode
                </div>
              </div>
            </div>

            {/* ── TOP-RIGHT: Fullscreen VR Pill ── */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 transition-all duration-200"
              style={{
                background: isFullscreen ? 'rgba(212,175,55,0.18)' : 'rgba(15,15,17,0.88)',
                border: `1px solid ${isFullscreen ? '#D4AF37' : 'rgba(212,175,55,0.4)'}`,
                backdropFilter: 'blur(10px)',
                borderRadius: '999px',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = '#D4AF37'; }}
              onMouseLeave={(e) => { if (!isFullscreen) { (e.currentTarget as HTMLElement).style.background = 'rgba(15,15,17,0.88)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.4)'; } }}
            >
              <span style={{ color: '#D4AF37', fontSize: '13px' }}>⛶</span>
              <span className="text-xs font-semibold" style={{ color: '#F8F7F4', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.05em' }}>
                Launch Fullscreen VR
              </span>
            </button>

            {/* ── PULSING HOTSPOTS ── */}
            {hotspots.map((h, i) => (
              <button
                key={h.label}
                onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
                className="absolute flex items-start gap-2.5 transition-all duration-200"
                style={{ top: h.top, left: h.left, transform: 'translate(-50%, -50%)', zIndex: 10 }}
              >
                {/* Pulsing dot */}
                <div className="relative shrink-0 mt-1" style={{ width: '18px', height: '18px' }}>
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ background: 'rgba(212,175,55,0.35)', animationDuration: '1.8s' }}
                  />
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ background: 'rgba(212,175,55,0.2)', animationDuration: '1.8s', animationDelay: '0.6s' }}
                  />
                  <span
                    className="absolute inset-0 rounded-full flex items-center justify-center"
                    style={{ background: '#D4AF37', boxShadow: '0 0 0 3px rgba(212,175,55,0.25)' }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: '#0F0F11' }} />
                  </span>
                </div>

                {/* Tooltip card */}
                {activeHotspot === i && (
                  <div
                    className="px-3.5 py-2.5 text-left"
                    style={{
                      background: 'rgba(15,15,17,0.94)',
                      border: '1px solid rgba(212,175,55,0.45)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '4px',
                      minWidth: '200px',
                    }}
                  >
                    <div className="text-xs font-bold mb-0.5" style={{ color: '#F8F7F4', fontFamily: 'DM Sans, sans-serif' }}>
                      {h.label}
                    </div>
                    <div className="text-xs" style={{ color: '#D4AF37', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em' }}>
                      {h.sublabel}
                    </div>
                  </div>
                )}
              </button>
            ))}

            {/* ── BOTTOM-CENTER: Floating Navigation Pill ── */}
            <div
              className="absolute bottom-5 left-1/2 flex items-center gap-1 px-2 py-1.5"
              style={{
                transform: 'translateX(-50%)',
                background: 'rgba(15,15,17,0.92)',
                border: '1px solid rgba(212,175,55,0.4)',
                backdropFilter: 'blur(14px)',
                borderRadius: '999px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
              }}
            >
              {navPills.map((pill) => (
                <button
                  key={pill}
                  onClick={() => setActiveNavPill(pill)}
                  className="px-4 py-1.5 text-xs font-semibold transition-all duration-200"
                  style={{
                    borderRadius: '999px',
                    background: activeNavPill === pill ? '#D4AF37' : 'transparent',
                    color: activeNavPill === pill ? '#0F0F11' : 'rgba(248,247,244,0.6)',
                    fontFamily: 'DM Sans, sans-serif',
                    letterSpacing: '0.04em',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => { if (activeNavPill !== pill) (e.currentTarget as HTMLElement).style.color = '#F8F7F4'; }}
                  onMouseLeave={(e) => { if (activeNavPill !== pill) (e.currentTarget as HTMLElement).style.color = 'rgba(248,247,244,0.6)'; }}
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 text-xs" style={{ color: 'rgba(248,247,244,0.3)', fontFamily: 'JetBrains Mono, monospace' }}>
            ↑ Click hotspot markers to identify studio elements · Full WebGL experience launches in VR-compatible browsers
          </p>

          {/* ── STUDIO SIDEBAR / BOTTOM PANEL ── */}
          <div
            className="mt-px grid grid-cols-1 lg:grid-cols-2"
            style={{
              border: '1px solid rgba(212,175,55,0.2)',
              borderTop: 'none',
              background: '#0c0c0e',
            }}
          >
            {/* ── LEFT: Active Artwork Details ── */}
            <div
              className="p-7 flex flex-col gap-5"
              style={{ borderRight: '1px solid rgba(212,175,55,0.12)' }}
            >
              {/* Section label */}
              <div className="flex items-center gap-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#D4AF37', boxShadow: '0 0 6px rgba(212,175,55,0.7)' }}
                />
                <span
                  className="text-xs font-semibold tracking-[0.18em] uppercase"
                  style={{ color: 'rgba(212,175,55,0.6)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Active Artwork Details
                </span>
              </div>

              {/* Highlighted Work */}
              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: 'rgba(248,247,244,0.35)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Highlighted Work on Easel
                </div>
                <div
                  className="text-lg font-bold leading-snug"
                  style={{ fontFamily: 'Fraunces, Crimson Text, Georgia, serif', color: '#F8F7F4' }}
                >
                  Heritage Horizon Study II
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(248,247,244,0.06)' }} />

              {/* Artist & Medium */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div
                    className="text-xs uppercase tracking-widest mb-1"
                    style={{ color: 'rgba(248,247,244,0.3)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Artist
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: '#F8F7F4', fontFamily: 'DM Sans, Manrope, sans-serif' }}
                  >
                    Resident Fellow
                  </div>
                </div>
                <div>
                  <div
                    className="text-xs uppercase tracking-widest mb-1"
                    style={{ color: 'rgba(248,247,244,0.3)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Medium
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: '#F8F7F4', fontFamily: 'DM Sans, Manrope, sans-serif' }}
                  >
                    Natural Mineral Pigments &amp; Gold Leaf
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(248,247,244,0.06)' }} />

              {/* Hardware Provenance */}
              <div className="flex flex-col gap-2.5">
                <div
                  className="text-xs uppercase tracking-widest mb-0.5"
                  style={{ color: 'rgba(248,247,244,0.3)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Hardware Provenance
                </div>
                {/* NFC Tag */}
                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold"
                    style={{
                      background: 'rgba(212,175,55,0.1)',
                      border: '1px solid rgba(212,175,55,0.35)',
                      borderRadius: '3px',
                      color: '#D4AF37',
                      fontFamily: 'JetBrains Mono, monospace',
                      letterSpacing: '0.05em',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: '#D4AF37' }}
                    />
                    Cryptographic NFC Micro-Tag Active
                  </span>
                </div>
                {/* Stretcher Signed */}
                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold"
                    style={{
                      background: 'rgba(248,247,244,0.04)',
                      border: '1px solid rgba(248,247,244,0.12)',
                      borderRadius: '3px',
                      color: 'rgba(248,247,244,0.65)',
                      fontFamily: 'JetBrains Mono, monospace',
                      letterSpacing: '0.05em',
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                      <path d="M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z" />
                    </svg>
                    Stretcher Signed
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Daily Studio Reels Stream ── */}
            <div className="p-7 flex flex-col gap-5">
              {/* Section label */}
              <div className="flex items-center gap-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'rgba(248,247,244,0.4)' }}
                />
                <span
                  className="text-xs font-semibold tracking-[0.18em] uppercase"
                  style={{ color: 'rgba(248,247,244,0.4)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Daily Studio Reels Stream
                </span>
              </div>

              {/* Reel Cards Row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { title: 'Layering Gold Foil', duration: '0:38', reel: 1, gradient: 'linear-gradient(160deg, #2a1e08 0%, #1a1205 100%)' },
                  { title: 'NFC Chip Inception Log', duration: '1:05', reel: 2, gradient: 'linear-gradient(160deg, #0e1a10 0%, #0a1208 100%)' },
                  { title: 'Curator Critique', duration: '1:45', reel: 3, gradient: 'linear-gradient(160deg, #12101a 0%, #0d0b14 100%)' },
                ].map((reel) => (
                  <div
                    key={reel.reel}
                    className="group relative flex flex-col overflow-hidden cursor-pointer"
                    style={{
                      border: '1px solid rgba(212,175,55,0.15)',
                      borderRadius: '4px',
                      background: reel.gradient,
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.45)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.15)'; }}
                  >
                    {/* Thumbnail area */}
                    <div
                      className="relative flex items-center justify-center"
                      style={{ aspectRatio: '9/14', background: 'rgba(0,0,0,0.2)' }}
                    >
                      {/* Abstract thumbnail visual */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 90 140" preserveAspectRatio="xMidYMid slice">
                        {reel.reel === 1 && (
                          <>
                            <rect x="0" y="0" width="90" height="140" fill="#1c1408" />
                            {[20, 35, 50, 65, 80, 95, 110].map((y, i) => (
                              <line key={i} x1="0" y1={y} x2="90" y2={y} stroke="rgba(212,175,55,0.15)" strokeWidth="1" />
                            ))}
                            <rect x="25" y="30" width="40" height="80" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
                            <rect x="30" y="35" width="30" height="70" fill="rgba(212,175,55,0.06)" />
                            {[40, 50, 60, 70, 80, 90].map((y, i) => (
                              <line key={i} x1="30" y1={y} x2="60" y2={y} stroke="rgba(212,175,55,0.2)" strokeWidth="0.8" />
                            ))}
                          </>
                        )}
                        {reel.reel === 2 && (
                          <>
                            <rect x="0" y="0" width="90" height="140" fill="#0e1a10" />
                            <circle cx="45" cy="70" r="28" fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="1" />
                            <circle cx="45" cy="70" r="18" fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth="0.8" />
                            <circle cx="45" cy="70" r="6" fill="rgba(212,175,55,0.4)" />
                            <line x1="63" y1="70" x2="73" y2="70" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
                            <line x1="54" y1="54.41" x2="59" y2="45.79" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
                            <line x1="36" y1="54.41" x2="31" y2="45.79" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
                            <line x1="27" y1="70" x2="17" y2="70" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
                            <line x1="36" y1="85.59" x2="31" y2="94.21" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
                            <line x1="54" y1="85.59" x2="59" y2="94.21" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
                          </>
                        )}
                        {reel.reel === 3 && (
                          <>
                            <rect x="0" y="0" width="90" height="140" fill="#12101a" />
                            <line x1="0" y1="70" x2="90" y2="70" stroke="rgba(212,175,55,0.12)" strokeWidth="1" />
                            <line x1="45" y1="0" x2="45" y2="140" stroke="rgba(212,175,55,0.12)" strokeWidth="1" />
                            <ellipse cx="45" cy="70" rx="32" ry="48" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
                            <ellipse cx="45" cy="70" rx="20" ry="30" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="0.8" />
                            <circle cx="45" cy="70" r="5" fill="rgba(212,175,55,0.35)" />
                          </>
                        )}
                      </svg>

                      {/* Play button */}
                      <div
                        className="relative z-10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'rgba(212,175,55,0.9)',
                          boxShadow: '0 0 20px rgba(212,175,55,0.4)',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#0F0F11">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>

                      {/* Duration badge */}
                      <div
                        className="absolute bottom-2 right-2 px-1.5 py-0.5 text-xs"
                        style={{
                          background: 'rgba(15,15,17,0.85)',
                          color: 'rgba(248,247,244,0.7)',
                          fontFamily: 'JetBrains Mono, monospace',
                          borderRadius: '2px',
                          fontSize: '10px',
                        }}
                      >
                        {reel.duration}
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="px-2.5 py-2">
                      <div
                        className="text-xs font-semibold leading-tight mb-0.5"
                        style={{ color: 'rgba(248,247,244,0.75)', fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {reel.title}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: 'rgba(212,175,55,0.55)', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px' }}
                      >
                        Reel {reel.reel}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ─────────────────────────────────────────────── */}
      <section id="apply" className="py-28 px-6 lg:px-12" style={{ borderTop: '1px solid rgba(248,247,244,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left info panel */}
            <div className="lg:col-span-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: '#D4AF37', fontFamily: 'JetBrains Mono, monospace' }}>
                Cohort Application
              </span>
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Fraunces, serif', color: '#F8F7F4', letterSpacing: '-0.02em' }}>
                Apply to the Residency
              </h2>
              <p className="text-sm leading-relaxed mb-10" style={{ color: 'rgba(248,247,244,0.55)', fontFamily: 'DM Sans, sans-serif' }}>
                Applications are reviewed by the IAH curatorial board. Shortlisted candidates receive a studio visit invitation within 21 days of submission.
              </p>

              {/* Badge */}
              <div
                className="inline-flex items-center gap-3 px-5 py-4"
                style={{
                  border: '1px solid rgba(212,175,55,0.35)',
                  background: 'rgba(212,175,55,0.04)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <div>
                  <div className="text-xs font-semibold" style={{ color: '#D4AF37', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em' }}>
                    COHORT STRICTLY LIMITED
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(248,247,244,0.5)', fontFamily: 'DM Sans, sans-serif' }}>
                    12 Fellows per intake cycle
                  </div>
                </div>
              </div>

              {/* Step indicators */}
              <div className="mt-12 space-y-3">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                      style={{
                        background: i < step ? '#D4AF37' : i === step ? 'rgba(212,175,55,0.15)' : 'transparent',
                        border: i <= step ? '1px solid #D4AF37' : '1px solid rgba(248,247,244,0.15)',
                        color: i < step ? '#0F0F11' : i === step ? '#D4AF37' : 'rgba(248,247,244,0.3)',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}
                    >
                      {i < step ? '✓' : i + 1}
                    </div>
                    <span
                      className="text-sm"
                      style={{
                        color: i === step ? '#F8F7F4' : 'rgba(248,247,244,0.35)',
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: i === step ? 600 : 400,
                      }}
                    >
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right form panel */}
            <div className="lg:col-span-3">
              <div
                className="p-10"
                style={{ background: '#111114', border: '1px solid rgba(248,247,244,0.07)' }}
              >
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid #D4AF37' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Fraunces, serif', color: '#F8F7F4' }}>
                      Application Received
                    </h3>
                    <p className="text-sm" style={{ color: 'rgba(248,247,244,0.5)', fontFamily: 'DM Sans, sans-serif' }}>
                      The IAH curatorial board will review your submission. Expect a response within 21 days.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Progress bar */}
                    <div className="mb-8">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs" style={{ color: 'rgba(248,247,244,0.4)', fontFamily: 'JetBrains Mono, monospace' }}>
                          Step {step + 1} of {STEPS.length}
                        </span>
                        <span className="text-xs" style={{ color: '#D4AF37', fontFamily: 'JetBrains Mono, monospace' }}>
                          {STEPS[step]}
                        </span>
                      </div>
                      <div className="w-full h-px" style={{ background: 'rgba(248,247,244,0.08)' }}>
                        <div
                          className="h-full transition-all duration-500"
                          style={{ width: `${((step + 1) / STEPS.length) * 100}%`, background: '#D4AF37' }}
                        />
                      </div>
                    </div>

                    {/* Step 0: Identity */}
                    {step === 0 && (
                      <div>
                        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'rgba(248,247,244,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
                          Artist Full Name
                        </label>
                        <input
                          type="text"
                          value={form.fullName}
                          onChange={(e) => handleChange('fullName', e.target.value)}
                          placeholder="As it appears on official documents"
                          className="w-full px-4 py-4 text-sm outline-none transition-all duration-200"
                          style={{
                            background: 'rgba(248,247,244,0.03)',
                            border: '1px solid rgba(248,247,244,0.1)',
                            color: '#F8F7F4',
                            fontFamily: 'DM Sans, sans-serif',
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(248,247,244,0.1)'; }}
                        />
                      </div>
                    )}

                    {/* Step 1: Practice */}
                    {step === 1 && (
                      <div>
                        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'rgba(248,247,244,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
                          Primary Medium
                        </label>
                        <input
                          type="text"
                          value={form.primaryMedium}
                          onChange={(e) => handleChange('primaryMedium', e.target.value)}
                          placeholder="e.g. Oil on linen, Miniature, Sculpture"
                          className="w-full px-4 py-4 text-sm outline-none transition-all duration-200"
                          style={{
                            background: 'rgba(248,247,244,0.03)',
                            border: '1px solid rgba(248,247,244,0.1)',
                            color: '#F8F7F4',
                            fontFamily: 'DM Sans, sans-serif',
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(248,247,244,0.1)'; }}
                        />
                      </div>
                    )}

                    {/* Step 2: Portfolio */}
                    {step === 2 && (
                      <div>
                        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'rgba(248,247,244,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
                          Portfolio Link (PDF / Drive)
                        </label>
                        <input
                          type="url"
                          value={form.portfolioLink}
                          onChange={(e) => handleChange('portfolioLink', e.target.value)}
                          placeholder="https://drive.google.com/…"
                          className="w-full px-4 py-4 text-sm outline-none transition-all duration-200"
                          style={{
                            background: 'rgba(248,247,244,0.03)',
                            border: '1px solid rgba(248,247,244,0.1)',
                            color: '#F8F7F4',
                            fontFamily: 'DM Sans, sans-serif',
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(248,247,244,0.1)'; }}
                        />
                        <p className="mt-2 text-xs" style={{ color: 'rgba(248,247,244,0.3)', fontFamily: 'DM Sans, sans-serif' }}>
                          Ensure link is publicly accessible or shared with residency@iah.art
                        </p>
                      </div>
                    )}

                    {/* Step 3: Statement */}
                    {step === 3 && (
                      <div>
                        <label className="block mb-2 text-xs uppercase tracking-widest" style={{ color: 'rgba(248,247,244,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
                          Statement of Purpose
                        </label>
                        <textarea
                          value={form.statement}
                          onChange={(e) => handleChange('statement', e.target.value)}
                          placeholder="Describe your practice, what you intend to create during the residency, and why provenance matters to your work…"
                          rows={7}
                          className="w-full px-4 py-4 text-sm outline-none transition-all duration-200 resize-none"
                          style={{
                            background: 'rgba(248,247,244,0.03)',
                            border: '1px solid rgba(248,247,244,0.1)',
                            color: '#F8F7F4',
                            fontFamily: 'DM Sans, sans-serif',
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(248,247,244,0.1)'; }}
                        />
                        <p className="mt-2 text-xs text-right" style={{ color: 'rgba(248,247,244,0.25)', fontFamily: 'JetBrains Mono, monospace' }}>
                          {form.statement.length} chars
                        </p>
                      </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between mt-10">
                      {step > 0 ? (
                        <button
                          type="button"
                          onClick={() => setStep((s) => s - 1)}
                          className="text-sm transition-colors"
                          style={{ color: 'rgba(248,247,244,0.4)', fontFamily: 'DM Sans, sans-serif' }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F8F7F4'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(248,247,244,0.4)'; }}
                        >
                          ← Back
                        </button>
                      ) : (
                        <span />
                      )}

                      {step < STEPS.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => { if (canAdvance()) setStep((s) => s + 1); }}
                          disabled={!canAdvance()}
                          className="px-8 py-3.5 text-sm font-semibold transition-all duration-200"
                          style={{
                            background: canAdvance() ? '#D4AF37' : 'rgba(212,175,55,0.2)',
                            color: canAdvance() ? '#0F0F11' : 'rgba(212,175,55,0.4)',
                            fontFamily: 'DM Sans, sans-serif',
                            letterSpacing: '0.06em',
                            cursor: canAdvance() ? 'pointer' : 'not-allowed',
                          }}
                        >
                          Continue →
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={!canAdvance()}
                          className="px-8 py-3.5 text-sm font-semibold transition-all duration-200"
                          style={{
                            background: canAdvance() ? '#D4AF37' : 'rgba(212,175,55,0.2)',
                            color: canAdvance() ? '#0F0F11' : 'rgba(212,175,55,0.4)',
                            fontFamily: 'DM Sans, sans-serif',
                            letterSpacing: '0.06em',
                            cursor: canAdvance() ? 'pointer' : 'not-allowed',
                          }}
                        >
                          Submit Application
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
