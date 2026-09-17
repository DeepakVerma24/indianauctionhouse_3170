import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExhibitionHubSection from '@/app/components/ExhibitionHubSection';

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <div className="pt-16">
        <ExhibitionHubSection />
      </div>
      <Footer />
    </main>
  );
}
