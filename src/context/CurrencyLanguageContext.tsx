'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  currencyCode: string;
  exchangeRate: number; // relative to INR
  language: string;
  languageCode: string;
  locale: string;
}

export const COUNTRIES: CountryConfig[] = [
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    currency: 'Indian Rupee',
    currencySymbol: '₹',
    currencyCode: 'INR',
    exchangeRate: 1,
    language: 'English (IN)',
    languageCode: 'EN',
    locale: 'en-IN',
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'US Dollar',
    currencySymbol: '$',
    currencyCode: 'USD',
    exchangeRate: 0.012,
    language: 'English (US)',
    languageCode: 'EN',
    locale: 'en-US',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'British Pound',
    currencySymbol: '£',
    currencyCode: 'GBP',
    exchangeRate: 0.0095,
    language: 'English (UK)',
    languageCode: 'EN',
    locale: 'en-GB',
  },
  {
    code: 'AE',
    name: 'UAE',
    flag: '🇦🇪',
    currency: 'UAE Dirham',
    currencySymbol: 'AED',
    currencyCode: 'AED',
    exchangeRate: 0.044,
    language: 'English (AE)',
    languageCode: 'EN',
    locale: 'en-AE',
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    currency: 'Singapore Dollar',
    currencySymbol: 'S$',
    currencyCode: 'SGD',
    exchangeRate: 0.016,
    language: 'English (SG)',
    languageCode: 'EN',
    locale: 'en-SG',
  },
  {
    code: 'EU',
    name: 'Europe',
    flag: '🇪🇺',
    currency: 'Euro',
    currencySymbol: '€',
    currencyCode: 'EUR',
    exchangeRate: 0.011,
    language: 'English (EU)',
    languageCode: 'EN',
    locale: 'en-DE',
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'Australian Dollar',
    currencySymbol: 'A$',
    currencyCode: 'AUD',
    exchangeRate: 0.018,
    language: 'English (AU)',
    languageCode: 'EN',
    locale: 'en-AU',
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'Canadian Dollar',
    currencySymbol: 'C$',
    currencyCode: 'CAD',
    exchangeRate: 0.016,
    language: 'English (CA)',
    languageCode: 'EN',
    locale: 'en-CA',
  },
];

interface CurrencyLanguageContextType {
  country: CountryConfig;
  setCountry: (country: CountryConfig) => void;
  formatPrice: (inrAmount: number, compact?: boolean) => string;
}

const CurrencyLanguageContext = createContext<CurrencyLanguageContextType | null>(null);

export function CurrencyLanguageProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = useState<CountryConfig>(COUNTRIES[0]);

  const setCountry = useCallback((c: CountryConfig) => {
    setCountryState(c);
  }, []);

  const formatPrice = useCallback(
    (inrAmount: number, compact = false): string => {
      const converted = inrAmount * country.exchangeRate;
      const sym = country.currencySymbol;

      if (compact) {
        if (country.code === 'IN') {
          if (converted >= 10000000) return `${sym}${(converted / 10000000).toFixed(1)}Cr`;
          if (converted >= 100000) return `${sym}${(converted / 100000).toFixed(1)}L`;
          if (converted >= 1000) return `${sym}${(converted / 1000).toFixed(0)}K`;
          return `${sym}${Math.round(converted).toLocaleString(country.locale)}`;
        }
        if (converted >= 1000000) return `${sym}${(converted / 1000000).toFixed(1)}M`;
        if (converted >= 1000) return `${sym}${(converted / 1000).toFixed(0)}K`;
        return `${sym}${Math.round(converted).toLocaleString(country.locale)}`;
      }

      return `${sym}${Math.round(converted).toLocaleString(country.locale)}`;
    },
    [country]
  );

  return (
    <CurrencyLanguageContext.Provider value={{ country, setCountry, formatPrice }}>
      {children}
    </CurrencyLanguageContext.Provider>
  );
}

export function useCurrencyLanguage() {
  const ctx = useContext(CurrencyLanguageContext);
  if (!ctx) throw new Error('useCurrencyLanguage must be used within CurrencyLanguageProvider');
  return ctx;
}
