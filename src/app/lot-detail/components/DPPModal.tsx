'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';


interface DPPModalProps {
  lot: {
    lotNumber: number;
    title: string;
    artist: string;
    creationYear: string;
    medium: string;
    dimensions: string;
    school: string;
    nfcUid: string;
    dppHash: string;
    conditionScorecard: Record<string, string>;
  };
  onClose: () => void;
}

const conditionScores = [
  { label: 'Structure Integrity', score: 9 },
  { label: 'Surface Condition', score: 8 },
  { label: 'Authenticity', score: 10 },
  { label: 'Provenance Clarity', score: 9 },
];

const custodyTimeline = [
  { date: '1969', event: 'Manufactured by Jaeger-LeCoultre, Le Sentier, Switzerland' },
  { date: '1971', event: 'Acquired by Maharaja of Jaipur — Gübelin Geneva receipt on file' },
  { date: '1984', event: 'Swiss service performed — movement cleaned, lubricated' },
  { date: '2009', event: 'Full overhaul by Jaeger-LeCoultre Heritage Department' },
  { date: '2024', event: 'Consigned to IAH — NFC chip embedded, DPP issued' },
  { date: '2026', event: 'Drop 001 — Authenticated by Dr. R. Sen, Chief Curator' },
];

export default function DPPModal({ lot, onClose }: DPPModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center modal-backdrop bg-black/80 backdrop-blur-sm overflow-y-auto py-8 px-4">
      <div className="bg-card border border-primary/30 rounded-2xl w-full max-w-3xl shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-primary text-xl">🔐</span>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">IAH Digital Product Passport</span>
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">Immutable Registry Hash</h2>
            <p className="text-sm text-muted-foreground mt-1">Lot {String(lot.lotNumber).padStart(2, '0')} — {lot.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* NFC UID */}
          <div className="compliance-badge rounded-xl px-5 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">NFC Physical Chip UID</p>
              <p className="font-mono text-primary font-bold text-lg">{lot.nfcUid}</p>
            </div>
            <div className="text-3xl">📡</div>
          </div>

          {/* Two-column attribution + verification */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Section 1 */}
            <div className="bg-muted/30 rounded-xl p-4 border border-border space-y-3">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Artwork Attribution</p>
              {[
                { label: 'Title', value: lot.title },
                { label: 'Artist / Maker', value: lot.artist },
                { label: 'Creation Date', value: lot.creationYear },
                { label: 'Medium', value: lot.medium },
                { label: 'Dimensions', value: lot.dimensions },
                { label: 'Studio Origin', value: lot.school },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm text-foreground font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Section 2 */}
            <div className="bg-muted/30 rounded-xl p-4 border border-border space-y-3">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Forensic Verification</p>
              {[
                { key: 'uv_inspection', icon: '🔬', label: 'UV Inspection' },
                { key: 'pigment_stability', icon: '🎨', label: 'Material Stability' },
                { key: 'stretcher_tag', icon: '📌', label: 'Physical Tag' },
                { key: 'escrow_protection', icon: '🏦', label: 'Escrow' },
                { key: 'title_guarantee', icon: '📜', label: 'Title' },
                { key: 'statutory_compliance', icon: '✈', label: 'Compliance' },
              ].map((item) => (
                <div key={item.key}>
                  <p className="text-xs text-muted-foreground">{item.icon} {item.label}</p>
                  <p className="text-xs text-foreground font-medium leading-snug">{lot.conditionScorecard[item.key]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Condition scorecard */}
          <div className="bg-muted/30 rounded-xl p-4 border border-border">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Forensic Condition Scorecard</p>
            <div className="space-y-3">
              {conditionScores.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className="text-sm font-bold text-primary">{item.score}/10</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full condition-bar"
                      style={{ '--bar-width': `${item.score * 10}%`, width: `${item.score * 10}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chain of custody */}
          <div className="bg-muted/30 rounded-xl p-4 border border-border">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Chain of Custody</p>
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-2 top-0 bottom-0 w-px bg-primary/20" />
              {custodyTimeline.map((entry, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-primary/60 border-2 border-background" />
                  <p className="text-xs font-bold text-primary">{entry.date}</p>
                  <p className="text-sm text-muted-foreground">{entry.event}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic hash */}
          <div className="hash-glow rounded-xl p-4 space-y-2">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Cryptographic Provenance Hash</p>
            <p className="text-sm text-primary font-mono break-all">{lot.dppHash} (Immutable Ledger)</p>
            <p className="text-xs text-muted-foreground">
              Co-signed by: {lot.artist} & Dr. R. Sen (Chief Curator, IAH)
            </p>
            <p className="text-xs text-muted-foreground">
              Status: Bound to Physical Lot • Transferred to Winning Bidder at Hammer
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Return to Saleroom
          </button>
          <button className="flex-1 py-3 border border-primary/40 text-primary font-bold rounded-xl hover:bg-primary/10 transition-colors text-sm">
            Download PDF Passport
          </button>
        </div>
        {/* Artist ledger link */}
        <div className="px-6 pb-6">
          <Link
            href="/artists/jaeger-lecoultre"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 border border-border rounded-xl text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            <span>🎨</span>
            View artist's full provenance ledger
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}