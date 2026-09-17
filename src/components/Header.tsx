'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import CountrySelector from '@/components/CountrySelector';

const navLinks = [
  { label: 'Auctions', href: '/auctions' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Artist Hub', href: '/artists' },
  { label: 'Residency', href: '/residency' },
  { label: 'Explore', href: '/explore' },
  { label: 'Sell & Exhibit', href: '/consignment' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF9F7]/95 backdrop-blur-md border-b border-[#E2DDD5]'
          : 'bg-[#F5F3EF]/90 backdrop-blur-sm border-b border-[#E2DDD5]'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <AppLogo size={36} />
            <div>
              <span className="font-display text-base font-semibold text-[#231F20] tracking-wide hidden sm:block" style={{ letterSpacing: '0.04em' }}>
                Indian Auction House
              </span>
              <span className="font-display text-base font-semibold text-[#231F20] tracking-wide sm:hidden">
                IAH
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                className="text-sm font-medium text-[#645E59] hover:text-[#231F20] transition-colors tracking-wide"
              >
                {link?.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3A6B4A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3A6B4A]" />
              </span>
              <span className="text-xs font-semibold text-[#3A6B4A] uppercase tracking-wider">Live</span>
            </div>
            {/* Country / Currency / Language selector */}
            <CountrySelector />
            {/* Cart icon */}
            <Link
              href="/cart"
              className="relative p-2 text-[#645E59] hover:text-[#231F20] transition-colors"
              aria-label="View cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#A34828] text-[#FAF9F7] text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                6
              </span>
            </Link>
            {/* Account icon */}
            <Link
              href="/account"
              className="p-2 text-[#645E59] hover:text-[#231F20] transition-colors"
              aria-label="My Account"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </Link>
            <Link
              href="/sign-up-login"
              className="bg-[#A34828] text-[#FAF9F7] text-xs font-semibold px-5 py-2.5 rounded-[5px] hover:bg-[#873B20] transition-colors tracking-wide"
            >
              Register to Bid
            </Link>
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-[#645E59] hover:text-[#231F20] transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 5h16M4 12h16M4 19h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#FAF9F7]/98 backdrop-blur-md flex flex-col pt-20 px-6"
          onClick={() => setMenuOpen(false)}
        >
          <div className="space-y-0" onClick={(e) => e?.stopPropagation()}>
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                onClick={() => setMenuOpen(false)}
                className="block py-5 text-lg font-display font-medium text-[#231F20] border-b border-[#E2DDD5] hover:text-[#A34828] transition-colors tracking-wide"
              >
                {link?.label}
              </Link>
            ))}
            <div className="pt-6">
              <Link
                href="/sign-up-login"
                onClick={() => setMenuOpen(false)}
                className="block w-full py-4 bg-[#A34828] text-[#FAF9F7] font-semibold text-center rounded-[5px] hover:bg-[#873B20] transition-colors tracking-wide"
              >
                Register to Bid
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}