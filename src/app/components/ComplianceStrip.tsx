import React from 'react';

const badges = [
  { icon: '🛡', label: 'ASI Registered', sub: 'Antiquities Survey of India' },
  { icon: '✈', label: 'Export Licensed', sub: 'Customs Pre-Cleared' },
  { icon: '🔐', label: 'Provenance Verified', sub: 'Cryptographic DPP' },
  { icon: '🌿', label: 'CITES Compliant', sub: 'No Prohibited Materials' },
  { icon: '🏦', label: 'Escrow Protected', sub: 'Bank-Grade Settlement' },
  { icon: '0%', label: 'Zero Seller Fee', sub: 'Max Net Proceeds' },
];

export default function ComplianceStrip() {
  return (
    <section className="border-y border-[#E2DDD5] bg-[#FAF9F7] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs text-[#645E59] uppercase tracking-widest font-semibold mb-10">
          Compliance & Trust Standards
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges?.map((badge) => (
            <div key={badge?.label} className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] p-5 text-center">
              <div className="text-2xl mb-3">{badge?.icon}</div>
              <div className="text-sm font-semibold text-[#231F20]">{badge?.label}</div>
              <div className="text-xs text-[#645E59] mt-1">{badge?.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}