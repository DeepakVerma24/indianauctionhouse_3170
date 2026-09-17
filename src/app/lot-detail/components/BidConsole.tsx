'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useCurrencyLanguage } from '@/context/CurrencyLanguageContext';

interface BidConsoleProps {
  currentBid: number;
  estimateLow: number;
  estimateHigh: number;
  bidCount: number;
  reserveMet: boolean;
  onBidPlaced: () => void;
}

const mockBidHistory = [
  { paddle: 'IAH-042', amount: 675000, time: '21:28:14', winning: true },
  { paddle: 'IAH-179', amount: 650000, time: '21:27:33', winning: false },
  { paddle: 'IAH-042', amount: 625000, time: '21:25:11', winning: false },
  { paddle: 'IAH-391', amount: 600000, time: '21:22:45', winning: false },
  { paddle: 'IAH-179', amount: 575000, time: '21:18:02', winning: false },
];

const increments = [10000, 25000, 50000];

export default function BidConsole({
  currentBid, estimateLow, estimateHigh, bidCount, reserveMet, onBidPlaced
}: BidConsoleProps) {
  const { formatPrice } = useCurrencyLanguage();
  const [selectedIncrement, setSelectedIncrement] = useState(25000);
  const [customBid, setCustomBid] = useState('');
  const [bidHistory, setBidHistory] = useState(mockBidHistory);
  const [myBid, setMyBid] = useState(currentBid);
  const [bidPlaced, setBidPlaced] = useState(false);
  const [isLoggedIn] = useState(false);

  const nextBid = myBid + selectedIncrement;

  const handleBid = () => {
    if (!isLoggedIn) return;
    const newBid = customBid ? parseInt(customBid.replace(/,/g, '')) : nextBid;
    setBidHistory(prev => [{
      paddle: 'IAH-408',
      amount: newBid,
      time: new Date().toLocaleTimeString('en-IN'),
      winning: true,
    }, ...prev.map(b => ({ ...b, winning: false }))]);
    setMyBid(newBid);
    setBidPlaced(true);
    onBidPlaced();
    setTimeout(() => setBidPlaced(false), 3000);
  };

  const formatINR = (n: number) => formatPrice(n);

  return (
    <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] overflow-hidden">
      {/* Current bid header */}
      <div className="p-5 border-b border-[#E2DDD5]">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-[#645E59] uppercase tracking-wider mb-1">Current Bid</p>
            <p className="font-display text-3xl font-semibold text-[#A34828]">{formatINR(myBid)}</p>
            <p className="text-xs text-[#645E59] mt-1">
              Estimate: {formatINR(estimateLow)} – {formatINR(estimateHigh)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#645E59] mb-1">{bidCount} bids</p>
            {reserveMet && <p className="text-xs text-[#3A6B4A] font-semibold">✓ Reserve Met</p>}
          </div>
        </div>
      </div>

      {/* Bid input */}
      <div className="p-5 space-y-4">
        {/* Increment selector */}
        <div>
          <p className="text-xs text-[#645E59] uppercase tracking-wider mb-2">Bid Increment</p>
          <div className="flex gap-2">
            {increments.map((inc) => (
              <button
                key={inc}
                onClick={() => setSelectedIncrement(inc)}
                className={`flex-1 py-2 text-sm font-semibold rounded-[4px] border transition-all ${
                  selectedIncrement === inc
                    ? 'bg-[#A34828] text-[#FAF9F7] border-[#A34828]'
                    : 'border-[#E2DDD5] text-[#645E59] hover:border-[#A34828] hover:text-[#231F20]'
                }`}
              >
                +{formatINR(inc)}
              </button>
            ))}
          </div>
        </div>

        {/* Next bid display */}
        <div className="bg-[#F5F3EF] border border-[#E2DDD5] rounded-[4px] p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#645E59]">Your Next Bid</p>
            <p className="font-display text-xl font-semibold text-[#A34828]">{formatINR(nextBid)}</p>
          </div>
          <div className="text-xs text-[#645E59] text-right">
            <p>Buyer&apos;s Premium (10%)</p>
            <p className="text-[#A34828]">+{formatINR(Math.round(nextBid * 0.1))}</p>
          </div>
        </div>

        {/* Custom bid */}
        <div>
          <label className="text-xs text-[#645E59] uppercase tracking-wider mb-2 block font-semibold">
            Custom Bid Amount
          </label>
          <input
            type="text"
            placeholder="Enter custom amount..."
            value={customBid}
            onChange={(e) => setCustomBid(e.target.value)}
            className="w-full bg-[#F5F3EF] border border-[#E2DDD5] rounded-[4px] px-4 py-3 text-[#231F20] text-sm placeholder:text-[#645E59]/50 focus:outline-none focus:border-[#A34828] transition-colors"
          />
        </div>

        {/* Submit */}
        {isLoggedIn ? (
          <button
            onClick={handleBid}
            className={`w-full py-4 rounded-[4px] font-semibold text-base transition-all ${
              bidPlaced
                ? 'bg-[#3A6B4A] text-[#FAF9F7]'
                : 'bg-[#A34828] text-[#FAF9F7] hover:bg-[#873B20]'
            }`}
          >
            {bidPlaced ? '✓ Bid Placed — Paddle #IAH-408' : `Place Bid — ${formatINR(customBid ? parseInt(customBid.replace(/,/g, '')) || nextBid : nextBid)}`}
          </button>
        ) : (
          <Link
            href="/sign-up-login"
            className="w-full py-4 rounded-[4px] font-semibold text-base bg-[#A34828] text-[#FAF9F7] flex items-center justify-center gap-2 hover:bg-[#873B20] transition-colors"
          >
            Register to Bid
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        )}

        <p className="text-xs text-center text-[#645E59]">
          By placing a bid you agree to IAH Terms. Buyer&apos;s Premium: 10% + 18% GST on premium.
        </p>
      </div>

      {/* Bid history */}
      <div className="border-t border-[#E2DDD5]">
        <p className="text-xs text-[#645E59] uppercase tracking-wider font-semibold px-5 py-3">
          Bid History
        </p>
        <div className="divide-y divide-[#E2DDD5]">
          {bidHistory.slice(0, 5).map((bid, i) => (
            <div key={i} className={`flex items-center justify-between px-5 py-3 ${i === 0 ? 'bid-row-enter' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${bid.winning ? 'bg-[#3A6B4A]' : 'bg-[#E2DDD5]'}`} />
                <span className="text-sm font-mono text-[#645E59]">Paddle #{bid.paddle}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-semibold ${bid.winning ? 'text-[#A34828]' : 'text-[#645E59]'}`}>
                  {formatINR(bid.amount)}
                </span>
                <span className="text-xs text-[#645E59]/60 font-mono">{bid.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}