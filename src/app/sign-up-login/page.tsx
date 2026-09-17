import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PaddleRegistrationForm from './components/PaddleRegistrationForm';

export default function SignUpLoginPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EF] overflow-x-hidden">
      <Header />
      <PaddleRegistrationForm />
      <Footer />
    </main>
  );
}