'use client';
import React, { useState, useMemo } from 'react';
import { useCurrencyLanguage } from '@/context/CurrencyLanguageContext';

interface LandedCostCalculatorProps {
  defaultHammer: number;
}

interface Destination {
  label: string;
  customsRate: number;
  flag: string;
}

const destinations: Destination[] = [
  { label: 'India (Domestic)', customsRate: 0, flag: '🇮🇳' },
  { label: 'United Arab Emirates', customsRate: 0.05, flag: '🇦🇪' },
  { label: 'United Kingdom', customsRate: 0.05, flag: '🇬🇧' },
  { label: 'United States', customsRate: 0.06, flag: '🇺🇸' },
  { label: 'Singapore', customsRate: 0.09, flag: '🇸🇬' },
];

function calculateLandedCost(hammerPrice: number, customsRate: number) {
  const premiumRate = 0.10;
  const gstRate = 0.18;
  const insuranceRate = 0.005;

  const buyersPremium = hammerPrice * premiumRate;
  const gstOnPremium = buyersPremium * gstRate;
  const shipping = hammerPrice >= 300000 ? 0 : 4500;
  const customs = hammerPrice * customsRate;
  const insurance = hammerPrice * insuranceRate;
  const totalLanded = hammerPrice + buyersPremium + gstOnPremium + shipping + customs + insurance;

  return { hammerPrice, buyersPremium, gstOnPremium, shipping, customs, insurance, totalLanded };
}

export default function LandedCostCalculator({ defaultHammer }: LandedCostCalculatorProps) {
  const { formatPrice } = useCurrencyLanguage();
  const [hammerPrice, setHammerPrice] = useState(defaultHammer);
  const [destinationIndex, setDestinationIndex] = useState(0);

  const dest = destinations[destinationIndex];
  const costs = useMemo(() => calculateLandedCost(hammerPrice, dest.customsRate), [hammerPrice, dest.customsRate]);

  const formatINR = (n: number) => formatPrice(n);
  const minBid = 100000;
  const maxBid = 2000000;

  const lineItems = [
    { label: 'Hammer Price', value: costs.hammerPrice, highlight: false },
    { label: "Buyer's Premium (10%)", value: costs.buyersPremium, highlight: false },
    { label: 'GST on Premium (18%)', value: costs.gstOnPremium, highlight: false },
    { label: `Customs / Import Duty (${dest.customsRate * 100}%)`, value: costs.customs, highlight: false },
    { label: 'Insurance (0.5%)', value: costs.insurance, highlight: false },
    { label: 'Insured Shipping', value: costs.shipping, highlight: false, note: costs.shipping === 0 ? 'Free above ₹3L' : undefined },
  ];

  return (
    <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] overflow-hidden">
      <div className="p-5 border-b border-[#E2DDD5]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🧮</span>
          <h3 className="font-display text-lg font-semibold text-[#231F20]">All-In Landed Cost</h3>
        </div>
        <p className="text-xs text-[#645E59]">No post-hammer surprises. Full cost transparency before you bid.</p>
      </div>

      <div className="p-5 space-y-5">
        {/* Destination selector */}
        <div>
          <label className="text-xs text-[#645E59] uppercase tracking-wider mb-2 block font-semibold">
            Shipping Destination
          </label>
          <div className="flex flex-wrap gap-2">
            {destinations.map((d, i) => (
              <button
                key={d.label}
                onClick={() => setDestinationIndex(i)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-[4px] border transition-all ${
                  destinationIndex === i
                    ? 'bg-[#A34828] text-[#FAF9F7] border-[#A34828]'
                    : 'border-[#E2DDD5] text-[#645E59] hover:border-[#A34828]'
                }`}
              >
                {d.flag} {d.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Hammer price slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[#645E59] uppercase tracking-wider font-semibold">Hammer Price</label>
            <span className="font-display text-lg font-semibold text-[#A34828]">{formatINR(hammerPrice)}</span>
          </div>
          <input
            type="range"
            min={minBid}
            max={maxBid}
            step={10000}
            value={hammerPrice}
            onChange={(e) => setHammerPrice(Number(e.target.value))}
            className="w-full accent-[#A34828] h-2 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-[#645E59] mt-1">
            <span>{formatINR(minBid)}</span>
            <span>{formatINR(maxBid)}</span>
          </div>
        </div>

        {/* Line items */}
        <div className="space-y-2">
          {lineItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-[#645E59] flex items-center gap-2">
                {item.label}
                {item.note && <span className="text-xs text-[#3A6B4A]">({item.note})</span>}
              </span>
              <span className={`font-medium ${item.value === 0 ? 'text-[#3A6B4A]' : 'text-[#231F20]'}`}>
                {item.value === 0 ? 'FREE' : formatINR(item.value)}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-[#E2DDD5] pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#231F20]">Total Landed Cost</span>
            <span className="font-display text-2xl font-semibold text-[#A34828]">{formatINR(costs.totalLanded)}</span>
          </div>
          <p className="text-xs text-[#645E59] mt-2">
            All-inclusive to {dest.flag} {dest.label}. Escrow held until 48hr post-delivery inspection.
          </p>
        </div>
      </div>
    </div>
  );
}