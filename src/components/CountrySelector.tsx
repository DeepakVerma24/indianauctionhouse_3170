'use client';
import React, { useState, useRef, useEffect } from 'react';
import { COUNTRIES, useCurrencyLanguage } from '@/context/CurrencyLanguageContext';

export default function CountrySelector() {
  const { country, setCountry } = useCurrencyLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[5px] border border-[#E2DDD5] bg-[#FAF9F7] hover:border-[#A34828] hover:bg-white transition-all text-[#645E59] hover:text-[#231F20]"
        aria-label="Select country and currency"
      >
        <span className="text-base leading-none">{country.flag}</span>
        <span className="text-xs font-semibold tracking-wide hidden sm:block">{country.currencyCode}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[#E2DDD5] bg-[#F5F3EF]">
            <p className="text-xs font-semibold text-[#231F20] uppercase tracking-wider">Region & Currency</p>
            <p className="text-[10px] text-[#645E59] mt-0.5">Prices shown in selected currency</p>
          </div>

          {/* Country list */}
          <div className="max-h-72 overflow-y-auto">
            {COUNTRIES.map((c) => {
              const isActive = c.code === country.code;
              return (
                <button
                  key={c.code}
                  onClick={() => {
                    setCountry(c);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#F5F3EF] ${
                    isActive ? 'bg-[#FDF0EA]' : ''
                  }`}
                >
                  <span className="text-xl leading-none flex-shrink-0">{c.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm font-medium truncate ${isActive ? 'text-[#A34828]' : 'text-[#231F20]'}`}>
                        {c.name}
                      </span>
                      <span className={`text-xs font-semibold flex-shrink-0 ${isActive ? 'text-[#A34828]' : 'text-[#645E59]'}`}>
                        {c.currencyCode}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-[#645E59]">{c.currencySymbol} {c.currency}</span>
                      <span className="text-[10px] text-[#9E9890]">·</span>
                      <span className="text-[10px] text-[#9E9890]">{c.languageCode}</span>
                    </div>
                  </div>
                  {isActive && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A34828" strokeWidth="2.5" className="flex-shrink-0">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="px-4 py-2.5 border-t border-[#E2DDD5] bg-[#F5F3EF]">
            <p className="text-[10px] text-[#9E9890]">
              Indicative rates. Final billing in INR at checkout.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
