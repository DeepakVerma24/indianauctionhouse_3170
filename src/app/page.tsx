import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import LiveTickerSection from './components/LiveTickerSection';
import HomepageOverviewSection from './components/HomepageOverviewSection';
import CategoryTabsSection from './components/CategoryTabsSection';
import ComplianceStrip from './components/ComplianceStrip';

export default function Homepage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <LiveTickerSection />
      <HomepageOverviewSection />
      <CategoryTabsSection />
      <ComplianceStrip />
      <Footer />
    </main>
  );
}