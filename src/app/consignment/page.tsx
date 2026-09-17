import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PartnershipConsignmentSection from '@/app/components/PartnershipConsignmentSection';

export default function ConsignmentPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <div className="pt-16">
        <PartnershipConsignmentSection />
      </div>
      <Footer />
    </main>
  );
}
