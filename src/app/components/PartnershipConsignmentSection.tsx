'use client';

import React, { useState } from 'react';

type AudienceTab = 'private' | 'gallery';

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const TruckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const EyeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const privateCards = [
  {
    badge: 'FOUNDING PHASE',
    title: 'Founding 90-Day Phase',
    metric: '0%',
    metricLabel: 'Commission',
    highlight: true,
    perks: [
      'White-glove cataloging & photography',
      'Bank-grade escrow settlement',
      'Zero listing or reserve fees',
      'Dedicated consignment specialist',
      'Priority placement in curated sales',
    ],
    cta: 'Apply Now',
    note: 'First 90 days. Applications reviewed on curatorial merit.',
  },
  {
    badge: 'ONGOING',
    title: 'Standard Performance Tier',
    metric: '8%',
    metricLabel: 'Standard Rate',
    highlight: false,
    perks: [
      '8% on standard lots',
      '5% on premier & high-value lots',
      'Zero hidden listing fees',
      'Full provenance documentation',
      'Global buyer network access',
    ],
    cta: 'Learn More',
    note: 'Transparent, performance-aligned fee structure.',
  },
];

const galleryCards = [
  {
    badge: 'FOUNDING PHASE',
    title: 'Founding Gallery Program',
    metric: '0%',
    metricLabel: 'Transaction Deductions',
    highlight: true,
    perks: [
      '0% transaction deductions for 90 days',
      'Dedicated gallery liaison',
      'Institutional-grade cataloging',
      'Priority curation placement',
      'Co-branded marketing support',
    ],
    cta: 'Apply as Gallery',
    note: 'Initial 90-day curation period. Reviewed on institutional merit.',
  },
  {
    badge: 'MEMBERSHIP',
    title: 'Digital Showroom & Mapping Membership',
    metric: '3%',
    metricLabel: 'Sale Commission',
    highlight: false,
    perks: [
      '3D Virtual Gallery hosting',
      'Interactive cultural map listing',
      'Reduced 3% sale commission',
      'Unlimited digital inventory uploads',
      'Analytics & collector insights dashboard',
    ],
    cta: 'Explore Membership',
    note: 'Recurring access to full digital infrastructure suite.',
  },
];

const trustItems = [
  { icon: <ShieldIcon />, label: 'Bank-Grade Escrow Protection' },
  { icon: <TruckIcon />, label: 'White-Glove Insured Logistics' },
  { icon: <EyeIcon />, label: 'Strict Curatorial Vetting' },
];

export default function PartnershipConsignmentSection() {
  const [activeTab, setActiveTab] = useState<AudienceTab>('private');
  const cards = activeTab === 'private' ? privateCards : galleryCards;

  return (
    <section className="bg-[#111111] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.25em] font-semibold text-[#C5A059] uppercase mb-4">
            Partnership &amp; Consignment
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] leading-tight mb-5">
            Transparent Structures.<br className="hidden sm:block" /> Uncompromising Reach.
          </h2>
          <p className="text-[#9E9A94] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether consigning a single masterpiece or digitizing an entire museum collection, our model aligns with your success.
          </p>
        </div>

        {/* Founding Cohort Banner */}
        <div className="relative mb-14 rounded-[6px] p-[1px]"
          style={{ background: 'linear-gradient(135deg, #C5A059 0%, #8B6B2E 40%, #C5A059 70%, #E8C97A 100%)' }}>
          <div className="bg-[#1A1714] rounded-[5px] px-8 py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <span className="inline-block text-[10px] tracking-[0.2em] font-bold text-[#111111] bg-[#C5A059] px-3 py-1 rounded-sm mb-4 uppercase">
                Limited Launch Allocation
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F0] mb-3 leading-snug">
                Founding Consignor Cohort: <span className="text-[#C5A059]">0% Seller Commission</span> for 90 Days
              </h3>
              <p className="text-[#9E9A94] text-sm sm:text-base leading-relaxed max-w-xl">
                Inaugural consignors and gallery partners enjoy zero seller platform fees for their first 3 months. Applications reviewed on curatorial merit.
              </p>
            </div>
            <div className="shrink-0">
              <button className="bg-[#C5A059] hover:bg-[#D4B06A] text-[#111111] text-sm font-bold tracking-wide px-7 py-3 rounded-[4px] transition-colors duration-200 whitespace-nowrap">
                Apply to Founding Cohort
              </button>
            </div>
          </div>
        </div>

        {/* Audience Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-[#1C1C1C] border border-[#2E2E2E] rounded-full p-1 gap-1">
            <button
              onClick={() => setActiveTab('private')}
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200 ${
                activeTab === 'private' ?'bg-[#C5A059] text-[#111111]' :'text-[#9E9A94] hover:text-[#F5F5F0]'
              }`}
            >
              For Private Consignors &amp; Collectors
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200 ${
                activeTab === 'gallery' ?'bg-[#C5A059] text-[#111111]' :'text-[#9E9A94] hover:text-[#F5F5F0]'
              }`}
            >
              For Galleries &amp; Institutions
            </button>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`rounded-[6px] p-[1px] ${card.highlight ? 'bg-gradient-to-b from-[#C5A059] via-[#8B6B2E] to-[#2E2E2E]' : 'bg-[#2A2A2A]'}`}
            >
              <div className="bg-[#161616] rounded-[5px] p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <span className={`text-[10px] tracking-[0.2em] font-bold px-3 py-1 rounded-sm uppercase ${card.highlight ? 'bg-[#C5A059] text-[#111111]' : 'bg-[#2A2A2A] text-[#9E9A94] border border-[#3A3A3A]'}`}>
                    {card.badge}
                  </span>
                </div>
                <h4 className="font-serif text-lg text-[#F5F5F0] mb-4">{card.title}</h4>
                <div className="mb-6">
                  <span className={`font-serif text-6xl font-bold leading-none ${card.highlight ? 'text-[#C5A059]' : 'text-[#F5F5F0]'}`}>
                    {card.metric}
                  </span>
                  <span className="text-[#9E9A94] text-sm ml-2">{card.metricLabel}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {card.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0"><CheckIcon /></span>
                      <span className="text-[#C8C4BC] text-sm leading-relaxed">{perk}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  <button className={`w-full py-3 rounded-[4px] text-sm font-semibold tracking-wide transition-colors duration-200 ${card.highlight ? 'bg-[#C5A059] hover:bg-[#D4B06A] text-[#111111]' : 'border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#111111]'}`}>
                    {card.cta}
                  </button>
                  <p className="text-[#5E5A54] text-xs mt-3 text-center leading-relaxed">{card.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Strip */}
        <div className="border-t border-[#2A2A2A] pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {trustItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full border border-[#2E2E2E] flex items-center justify-center bg-[#1A1A1A]">
                  {item.icon}
                </div>
                <p className="text-[#C8C4BC] text-sm font-medium tracking-wide">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
