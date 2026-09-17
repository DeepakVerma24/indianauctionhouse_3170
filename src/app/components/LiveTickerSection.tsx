'use client';
import React from 'react';

const tickerItems = [
  'Paddle #IAH-042 placed ₹3,80,000 on Lot 01 — Echoes of Monsoon',
  'Paddle #IAH-019 placed ₹2,75,000 on Lot 03 — Cosmic Tandava Nataraja',
  'Paddle #IAH-108 placed ₹6,75,000 on Lot 06 — 1969 JLC Memovox',
  'Paddle #IAH-237 placed ₹5,00,000 on Lot 04 — Geometric Meditations',
  'Lot 02 Reserve Met — Shri Nathji Kamal Talai ₹2,15,000',
  'Paddle #IAH-391 placed ₹5,80,000 on Lot 08 — Pahari Miniature',
  'Paddle #IAH-055 placed ₹7,50,000 on Lot 10 — Royal Basra Pearl Choker',
  'New bidder IAH-412 registered · Paddle assigned',
  'Paddle #IAH-179 placed ₹3,10,000 on Lot 05 — Royal Shikargah Patola',
  'Lot 07 — Muria Ancestral Tree of Life · Reserve Met ₹1,40,000',
];

export default function LiveTickerSection() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div className="border-y border-[#E2DDD5] bg-[#FAF9F7] relative overflow-hidden py-3">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAF9F7] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAF9F7] to-transparent z-10 pointer-events-none" />

      <div className="flex items-center gap-8 ticker-scroll" style={{ width: 'max-content' }}>
        {doubled?.map((item, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#A34828] shrink-0" />
            <span className="text-sm text-[#645E59] font-medium whitespace-nowrap">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}