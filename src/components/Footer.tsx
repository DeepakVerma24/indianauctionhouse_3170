import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-[#E2DDD5] bg-[#FAF9F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="flex items-center gap-3">
              <AppLogo size={32} />
              <span className="font-display text-base font-semibold text-[#231F20] tracking-wide">Indian Auction House</span>
            </div>
            <p className="text-sm text-[#645E59] leading-relaxed">
              India&apos;s premier platform for museum-grade art, heritage textiles, and certified estate items.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-10">
            <div>
              <p className="text-xs font-semibold text-[#231F20] uppercase tracking-widest mb-4">Auction</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/" className="text-sm text-[#645E59] hover:text-[#A34828] transition-colors">The Saleroom</Link>
                <Link href="/lot-detail" className="text-sm text-[#645E59] hover:text-[#A34828] transition-colors">Browse Lots</Link>
                <Link href="/sign-up-login" className="text-sm text-[#645E59] hover:text-[#A34828] transition-colors">Register to Bid</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#231F20] uppercase tracking-widest mb-4">Discover</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/artists" className="text-sm text-[#645E59] hover:text-[#A34828] transition-colors">Artist Hub</Link>
                <Link href="/marketplace" className="text-sm text-[#645E59] hover:text-[#A34828] transition-colors">Marketplace</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#231F20] uppercase tracking-widest mb-4">Legal</p>
              <div className="flex flex-col gap-2.5">
                <span className="text-sm text-[#645E59] hover:text-[#A34828] transition-colors cursor-pointer">Terms of Sale</span>
                <span className="text-sm text-[#645E59] hover:text-[#A34828] transition-colors cursor-pointer">Privacy Policy</span>
                <span className="text-sm text-[#645E59] hover:text-[#A34828] transition-colors cursor-pointer">Compliance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E2DDD5] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#645E59]">© 2026 Indian Auction House. All rights reserved.</p>
          <p className="text-xs text-[#645E59]">Regulated · ASI Registered · CITES Compliant</p>
        </div>
      </div>
    </footer>
  );
}