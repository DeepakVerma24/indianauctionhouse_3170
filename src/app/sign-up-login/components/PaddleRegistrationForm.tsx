'use client';
import React, { useState } from 'react';
import Link from 'next/link';

type Step = 'phone' | 'otp' | 'details' | 'success';

const MOCK_OTP = '123456';
const MOCK_PADDLE = 'IAH-408';

export default function PaddleRegistrationForm() {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleSendOTP = () => {
    if (phone.length < 10) return;
    setOtpSent(true);
    setStep('otp');
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOTP = () => {
    if (otp === MOCK_OTP) {
      setOtpError('');
      setStep('details');
    } else {
      setOtpError('Incorrect OTP. Use 123456 for demo.');
    }
  };

  const handleCompleteRegistration = () => {
    if (!fullName || !email) return;
    setStep('success');
  };

  const trustSignals = [
    { icon: '🔐', label: '256-bit Encrypted' },
    { icon: '🏦', label: 'RBI Compliant' },
    { icon: '⚡', label: 'Instant Verification' },
    { icon: '🛡', label: 'KYC Verified' },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs text-[#A34828] font-semibold uppercase tracking-widest mb-3">Drop 001 — Paddle Registration</p>
          <h1 className="font-display text-hero-md text-[#231F20] mb-3" style={{ letterSpacing: '-0.01em' }}>
            {step === 'success' ? 'Welcome to the Saleroom' : 'Register to Bid'}
          </h1>
          <p className="text-[#645E59] text-sm">
            {step === 'success' ?'Your paddle is assigned and ready.' :'Frictionless OTP verification. Get your paddle in 60 seconds.'}
          </p>
        </div>

        {/* Progress indicator */}
        {step !== 'success' && (
          <div className="flex items-center gap-2 mb-8">
            {(['phone', 'otp', 'details'] as Step[]).map((s, i) => (
              <React.Fragment key={s}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold border transition-all ${
                  step === s
                    ? 'bg-[#A34828] text-[#FAF9F7] border-[#A34828]'
                    : ['otp', 'details', 'success'].indexOf(step) > i
                    ? 'bg-[#A34828]/10 text-[#A34828] border-[#A34828]/30' :'bg-[#FAF9F7] text-[#645E59] border-[#E2DDD5]'
                }`}>
                  {['otp', 'details', 'success'].indexOf(step) > i ? '✓' : i + 1}
                </div>
                {i < 2 && <div className={`flex-1 h-px ${['otp', 'details', 'success'].indexOf(step) > i ? 'bg-[#A34828]/30' : 'bg-[#E2DDD5]'}`} />}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Form card */}
        <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] overflow-hidden">
          {/* Step 1: Phone */}
          {step === 'phone' && (
            <div className="p-8 space-y-6">
              <div>
                <label className="text-xs text-[#645E59] uppercase tracking-wider mb-2 block font-semibold">
                  Mobile Number
                </label>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 bg-[#F5F3EF] border border-[#E2DDD5] rounded-[4px] px-3 py-3 text-sm text-[#231F20] font-medium shrink-0">
                    🇮🇳 +91
                  </div>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1 bg-[#F5F3EF] border border-[#E2DDD5] rounded-[4px] px-4 py-3 text-[#231F20] text-sm placeholder:text-[#645E59]/50 focus:outline-none focus:border-[#A34828] transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSendOTP}
                  disabled={phone.length < 10}
                  className="flex-1 py-4 bg-[#A34828] text-[#FAF9F7] font-semibold rounded-[4px] text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-[#873B20] transition-colors"
                >
                  <span>💬</span> Send OTP via WhatsApp
                </button>
              </div>
              <button
                onClick={handleSendOTP}
                disabled={phone.length < 10}
                className="w-full py-3 border border-[#231F20] text-[#231F20] font-semibold rounded-[4px] text-sm disabled:opacity-40 hover:bg-[#231F20] hover:text-[#FAF9F7] transition-all"
              >
                Send via SMS instead
              </button>

              <p className="text-xs text-center text-[#645E59]">
                By registering, you agree to IAH Terms of Participation and KYC requirements.
              </p>
            </div>
          )}

          {/* Step 2: OTP */}
          {step === 'otp' && (
            <div className="p-8 space-y-6">
              <div className="text-center py-4">
                <div className="text-4xl mb-3">📱</div>
                <p className="text-sm text-[#645E59]">
                  OTP sent to <span className="text-[#231F20] font-semibold">+91 {phone}</span>
                </p>
                <p className="text-xs text-[#A34828] mt-1 font-mono">Demo OTP: 123456</p>
              </div>

              <div>
                <label className="text-xs text-[#645E59] uppercase tracking-wider mb-2 block font-semibold">
                  Enter 6-Digit OTP
                </label>
                <input
                  type="text"
                  placeholder="• • • • • •"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className={`w-full bg-[#F5F3EF] border rounded-[4px] px-4 py-4 text-[#231F20] text-2xl text-center tracking-widest font-semibold focus:outline-none transition-colors ${
                    otpError ? 'border-[#8B2020]' : 'border-[#E2DDD5] focus:border-[#A34828]'
                  }`}
                />
                {otpError && <p className="text-xs text-[#8B2020] mt-2">{otpError}</p>}
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={otp.length < 6}
                className="w-full py-4 bg-[#A34828] text-[#FAF9F7] font-semibold rounded-[4px] text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#873B20] transition-colors"
              >
                Verify & Continue
              </button>

              <div className="flex items-center justify-between text-sm">
                <button onClick={() => setStep('phone')} className="text-[#645E59] hover:text-[#231F20] transition-colors">
                  ← Change Number
                </button>
                <button
                  disabled={resendTimer > 0}
                  className="text-[#A34828] disabled:text-[#645E59] disabled:cursor-not-allowed transition-colors"
                  onClick={handleSendOTP}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 'details' && (
            <div className="p-8 space-y-5">
              <div className="flex items-center gap-2 bg-[#F5F3EF] border border-[#E2DDD5] rounded-[4px] px-4 py-3">
                <span className="text-[#3A6B4A]">✓</span>
                <span className="text-sm text-[#3A6B4A] font-semibold">Phone verified — +91 {phone}</span>
              </div>

              <div>
                <label className="text-xs text-[#645E59] uppercase tracking-wider mb-2 block font-semibold">Full Legal Name</label>
                <input
                  type="text"
                  placeholder="As per PAN / Passport"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#F5F3EF] border border-[#E2DDD5] rounded-[4px] px-4 py-3 text-[#231F20] text-sm placeholder:text-[#645E59]/50 focus:outline-none focus:border-[#A34828] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-[#645E59] uppercase tracking-wider mb-2 block font-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F5F3EF] border border-[#E2DDD5] rounded-[4px] px-4 py-3 text-[#231F20] text-sm placeholder:text-[#645E59]/50 focus:outline-none focus:border-[#A34828] transition-colors"
                />
              </div>

              <div className="bg-[#F5F3EF] rounded-[4px] p-4 border border-[#E2DDD5]">
                <p className="text-xs text-[#645E59] mb-2">Pre-Authorization Limit</p>
                <p className="font-display text-xl font-semibold text-[#A34828]">₹15,00,000</p>
                <p className="text-xs text-[#645E59] mt-1">Refundable hold — released within 48hrs if unsuccessful</p>
              </div>

              <button
                onClick={handleCompleteRegistration}
                disabled={!fullName || !email}
                className="w-full py-4 bg-[#A34828] text-[#FAF9F7] font-semibold rounded-[4px] text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#873B20] transition-colors"
              >
                Get My Paddle →
              </button>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <div className="p-8 space-y-6 text-center">
              <div className="bg-[#F5F3EF] border border-[#E2DDD5] rounded-[5px] p-8">
                <p className="text-xs text-[#645E59] uppercase tracking-widest mb-2">Your Auction Paddle</p>
                <p className="font-display text-5xl font-semibold text-[#A34828] mb-2">{MOCK_PADDLE}</p>
                <p className="text-sm text-[#645E59]">{fullName || 'Verified Bidder'}</p>
                <div className="mt-4 pt-4 border-t border-[#E2DDD5] grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-xs text-[#645E59]">KYC Status</p>
                    <p className="text-sm font-semibold text-[#3A6B4A]">✓ Verified</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#645E59]">Bid Limit</p>
                    <p className="text-sm font-semibold text-[#A34828]">₹15,00,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#645E59]">Drop</p>
                    <p className="text-sm font-semibold text-[#231F20]">001 — Inaugural</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#645E59]">Lots Available</p>
                    <p className="text-sm font-semibold text-[#231F20]">10 Lots</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#645E59]">
                Welcome, {fullName?.split(' ')[0] || 'Bidder'}. You are now cleared to bid on all lots in Drop 001.
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="w-full py-4 bg-[#A34828] text-[#FAF9F7] font-semibold rounded-[4px] text-sm flex items-center justify-center gap-2 hover:bg-[#873B20] transition-colors"
                >
                  Enter Saleroom →
                </Link>
                <Link
                  href="/lot-detail"
                  className="w-full py-3 border border-[#231F20] text-[#231F20] font-semibold rounded-[4px] text-sm hover:bg-[#231F20] hover:text-[#FAF9F7] transition-colors"
                >
                  View Featured Lot
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-4 gap-3 mt-6">
          {trustSignals.map((signal) => (
            <div key={signal.label} className="text-center">
              <div className="text-xl mb-1">{signal.icon}</div>
              <p className="text-xs text-[#645E59] font-medium">{signal.label}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[#645E59] mt-6">
          Already have a paddle?{' '}
          <button className="text-[#A34828] font-semibold hover:underline">Sign in with OTP</button>
        </p>
      </div>
    </div>
  );
}