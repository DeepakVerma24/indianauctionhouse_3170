import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LotDetailConsole from './components/LotDetailConsole';

export default function LotDetailPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <LotDetailConsole />
      <Footer />
    </main>
  );
}