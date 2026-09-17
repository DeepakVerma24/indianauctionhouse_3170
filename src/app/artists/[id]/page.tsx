'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import { getArtistById, PortfolioWork, BTSPost } from '../data/artists';

/* ─── Status pill ────────────────────────────────────────────── */
function StatusPill({ status }: { status: PortfolioWork['status'] }) {
  const map: Record<PortfolioWork['status'], { label: string; cls: string }> = {
    'In Drop 001': { label: 'In Drop 001', cls: 'text-[#A34828] bg-[#A34828]/10 border-[#A34828]/30' },
    Sold: { label: 'Sold', cls: 'text-[#645E59] bg-[#E2DDD5] border-[#E2DDD5]' },
    'In Private Collection': { label: 'Private Collection', cls: 'text-blue-600 bg-blue-50 border-blue-200' },
    Available: { label: 'Available', cls: 'text-[#3A6B4A] bg-[#3A6B4A]/10 border-[#3A6B4A]/30' },
  };
  const { label, cls } = map[status];
  return <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${cls}`}>{label}</span>;
}

/* ─── Portfolio work card ────────────────────────────────────── */
function WorkCard({ work, onClick }: { work: PortfolioWork; onClick: () => void }) {
  return (
    <button onClick={onClick} className="shrink-0 w-44 sm:w-52 text-left group">
      <div className="relative aspect-[3/4] rounded-[5px] overflow-hidden border border-[#E2DDD5] group-hover:border-[#A34828]/40 transition-colors mb-3">
        <AppImage
          src={work.image}
          alt={work.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="208px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-2.5 left-2.5 right-2.5">
          <StatusPill status={work.status} />
        </div>
        {(work.linkedLotId || work.linkedMarketplaceId) && (
          <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#A34828] flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
          </div>
        )}
      </div>
      <p className="text-sm font-semibold text-[#231F20] leading-tight mb-0.5 line-clamp-2">{work.title}</p>
      <p className="text-xs text-[#645E59]">{work.year} · {work.medium}</p>
      {work.estimateLow && (
        <p className="text-xs text-[#A34828] font-semibold mt-1">
          Est. ₹{(work.estimateLow / 100000).toFixed(1)}–{(work.estimateHigh! / 100000).toFixed(1)}L
        </p>
      )}
      {work.soldPrice && work.status === 'Sold' && (
        <p className="text-xs text-[#645E59] font-semibold mt-1">
          Sold ₹{(work.soldPrice / 100000).toFixed(1)}L
        </p>
      )}
    </button>
  );
}

/* ─── Provenance modal ───────────────────────────────────────── */
function ProvenanceModal({ work, onClose }: { work: PortfolioWork; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] w-full max-w-lg shadow-2xl">
        <div className="p-6 border-b border-[#E2DDD5] flex items-start justify-between">
          <div>
            <p className="text-xs text-[#A34828] font-bold uppercase tracking-widest mb-1">Provenance Chain</p>
            <h3 className="font-display text-lg font-bold text-[#231F20]">{work.title}</h3>
            <p className="text-sm text-[#645E59] mt-0.5">{work.year} · {work.medium}</p>
          </div>
          <button onClick={onClose} className="text-[#645E59] hover:text-[#231F20] transition-colors p-2 rounded-[5px] hover:bg-[#F0EDE8]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="relative pl-6 space-y-4">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-[#A34828]/20" />
            {work.provenanceChain.map((entry, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#A34828]/60 border-2 border-[#FAF9F7]" />
                <p className="text-xs font-bold text-[#A34828]">{entry.date}</p>
                <p className="text-sm text-[#645E59]">{entry.event}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#F0EDE8] border border-[#E2DDD5] rounded-[5px] p-4 mt-4">
            <p className="text-xs font-bold text-[#A34828] uppercase tracking-widest mb-1">DPP Hash</p>
            <p className="text-xs text-[#645E59] font-mono break-all">{work.dppHash}</p>
          </div>
          {(work.linkedLotId || work.linkedMarketplaceId) && (
            <div className="flex gap-3 mt-2">
              {work.linkedLotId && (
                <Link
                  href="/auctions"
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-[#A34828] text-[#FAF9F7] font-bold text-xs rounded-[5px] hover:bg-[#873B20] transition-colors text-center"
                >
                  View in Auction Room →
                </Link>
              )}
              {work.linkedMarketplaceId && (
                <Link
                  href={`/marketplace/${work.linkedMarketplaceId}`}
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-[#F0EDE8] border border-[#E2DDD5] text-[#231F20] font-bold text-xs rounded-[5px] hover:border-[#A34828] transition-colors text-center"
                >
                  View in Marketplace →
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="p-6 border-t border-[#E2DDD5]">
          <button onClick={onClose} className="w-full py-3 bg-[#F0EDE8] border border-[#E2DDD5] text-[#231F20] font-bold rounded-[5px] hover:border-[#A34828] transition-colors text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── BTS card ───────────────────────────────────────────────── */
function BTSCard({ post }: { post: BTSPost }) {
  const timeAgo = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };
  return (
    <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] overflow-hidden">
      {post.image && (
        <div className="relative aspect-video overflow-hidden">
          <AppImage src={post.image} alt={post.imageAlt || post.caption} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          {post.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
            post.type === 'photo' ? 'text-[#A34828] bg-[#A34828]/10 border-[#A34828]/30' :
            post.type === 'video' ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-[#645E59] bg-[#F0EDE8] border-[#E2DDD5]'
          }`}>
            {post.type === 'photo' ? '📷 Studio' : post.type === 'video' ? '🎬 Video' : '✍️ Note'}
          </span>
          <span className="text-xs text-[#A09890]">{timeAgo(post.timestamp)}</span>
        </div>
        <p className="text-sm text-[#645E59] leading-relaxed">{post.caption}</p>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function ArtistProfilePage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : '';
  const artist = getArtistById(id);

  const [selectedWork, setSelectedWork] = useState<PortfolioWork | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState<{ text: string; ts: string }[]>([
    { text: 'What is the drying time between gold leaf layers on the Belgian linen?', ts: '2026-09-07T10:00:00Z' },
    { text: 'Are you planning a second drop with IAH later this year?', ts: '2026-09-05T14:00:00Z' },
  ]);
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'studio' | 'provenance'>('portfolio');

  if (!artist) {
    return (
      <main className="min-h-screen bg-[#F5F3EF]">
        <Header />
        <div className="pt-32 text-center">
          <p className="text-[#645E59]">Artist not found.</p>
          <Link href="/artists" className="text-[#A34828] hover:underline mt-4 block">← Back to Artist Hub</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const handleSubmitQuestion = () => {
    if (!question.trim()) return;
    setQuestions([{ text: question.trim(), ts: new Date().toISOString() }, ...questions]);
    setQuestion('');
    setQuestionSubmitted(true);
  };

  const activeLots = artist.portfolioWorks.filter((w) => w.status === 'In Drop 001');
  const pastWorks = artist.portfolioWorks.filter((w) => w.status !== 'In Drop 001');
  const linkedWorks = artist.portfolioWorks.filter((w) => w.linkedLotId || w.linkedMarketplaceId);

  return (
    <main className="min-h-screen bg-[#F5F3EF] overflow-x-hidden">
      <Header />

      {/* ── Cinematic hero ── */}
      <div className="relative h-[52vh] min-h-[380px] overflow-hidden">
        <AppImage
          src={artist.heroImage}
          alt={artist.heroImageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F3EF] via-[#F5F3EF]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F3EF]/50 via-transparent to-transparent" />
      </div>

      {/* ── Profile header — overlaps hero ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-36 relative z-10 pb-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#645E59] mb-6">
          <Link href="/" className="hover:text-[#A34828] transition-colors">Saleroom</Link>
          <span>/</span>
          <Link href="/artists" className="hover:text-[#A34828] transition-colors">Artist Hub</Link>
          <span>/</span>
          <span className="text-[#231F20] font-semibold">{artist.name}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8">
          {/* Avatar */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[5px] overflow-hidden border-2 border-[#A34828]/40 shadow-xl shrink-0">
            <AppImage
              src={artist.avatarImage}
              alt={artist.avatarImageAlt}
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Name + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#A34828] uppercase tracking-widest border border-[#A34828]/30 rounded-full px-3 py-1 bg-[#A34828]/5">
                {artist.school}
              </span>
              {artist.activeLotIds.length > 0 && (
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#3A6B4A] bg-[#3A6B4A]/10 border border-[#3A6B4A]/30 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3A6B4A] animate-ping" />
                  {artist.activeLotIds.length} Active Lot{artist.activeLotIds.length > 1 ? 's' : ''} in Drop 001
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#231F20] mb-1" style={{ letterSpacing: '-0.01em' }}>
              {artist.name}
            </h1>
            <p className="text-[#645E59] text-sm">{artist.studioLocation}</p>
            {artist.specialisation && (
              <p className="text-xs text-[#A09890] mt-1">{artist.specialisation}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setNotifyEnabled(!notifyEnabled)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-[5px] border text-sm font-semibold transition-all ${
                notifyEnabled
                  ? 'bg-[#A34828]/10 border-[#A34828] text-[#A34828]'
                  : 'border-[#E2DDD5] text-[#645E59] hover:border-[#A34828]/40 hover:text-[#231F20] bg-[#FAF9F7]'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={notifyEnabled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {notifyEnabled ? 'Notified' : 'Notify Me'}
            </button>
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-5 py-2.5 rounded-[5px] text-sm font-bold transition-all ${
                isFollowing
                  ? 'bg-[#A34828]/10 border border-[#A34828] text-[#A34828]'
                  : 'bg-[#A34828] text-[#FAF9F7] hover:bg-[#873B20]'
              }`}
            >
              {isFollowing ? `Following · ${(artist.followerCount + 1).toLocaleString()}` : `Follow · ${artist.followerCount.toLocaleString()}`}
            </button>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Followers', value: (isFollowing ? artist.followerCount + 1 : artist.followerCount).toLocaleString() },
            { label: 'Works Registered', value: artist.portfolioWorks.length },
            { label: 'Exhibitions', value: artist.exhibitionCount ?? '—' },
            { label: 'Total Sales', value: artist.totalSalesValue ?? '—' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] p-4 text-center">
              <p className="font-display text-xl sm:text-2xl font-semibold text-[#231F20]">{value}</p>
              <p className="text-[10px] text-[#A09890] uppercase tracking-widest mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Bio ── */}
        <div className="max-w-3xl mb-8">
          <p className="text-[#645E59] leading-relaxed text-base">{artist.bio}</p>
        </div>

        {/* ── Awards ── */}
        {artist.awards && artist.awards.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {artist.awards.map((award, i) => (
              <div key={i} className="flex items-center gap-2 bg-[#FAF9F7] border border-[#E2DDD5] rounded-full px-3 py-1.5">
                <span className="text-[#E2C27D] text-xs">★</span>
                <span className="text-xs text-[#231F20] font-semibold">{award.title}</span>
                <span className="text-xs text-[#A09890]">{award.year}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Tab nav ── */}
        <div className="flex items-center gap-1 border-b border-[#E2DDD5]">
          {([
            { key: 'portfolio', label: 'Portfolio' },
            { key: 'studio', label: 'Studio Feed' },
            { key: 'provenance', label: 'Provenance Ledger' },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                activeTab === key
                  ? 'border-[#A34828] text-[#A34828]'
                  : 'border-transparent text-[#645E59] hover:text-[#231F20]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-14">

        {/* PORTFOLIO TAB */}
        {activeTab === 'portfolio' && (
          <>
            {/* Active lots */}
            {activeLots.length > 0 && (
              <section>
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <p className="text-xs text-[#A34828] font-bold uppercase tracking-widest mb-1">Now in Drop 001</p>
                    <h2 className="font-display text-2xl font-semibold text-[#231F20]">Active Works</h2>
                  </div>
                  <Link href="/auctions" className="text-sm text-[#A34828] hover:underline font-semibold">
                    View in Auction Room →
                  </Link>
                </div>
                <div className="flex gap-5 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                  {activeLots.map((work) => (
                    <WorkCard key={work.workId} work={work} onClick={() => setSelectedWork(work)} />
                  ))}
                </div>
              </section>
            )}

            {/* Linked marketplace works */}
            {linkedWorks.length > 0 && (
              <section>
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <p className="text-xs text-[#3A6B4A] font-bold uppercase tracking-widest mb-1">Linked Works</p>
                    <h2 className="font-display text-2xl font-semibold text-[#231F20]">Available in Marketplace & Auctions</h2>
                  </div>
                  <Link href="/marketplace" className="text-sm text-[#A34828] hover:underline font-semibold">
                    Browse Marketplace →
                  </Link>
                </div>
                <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] divide-y divide-[#E2DDD5]">
                  {linkedWorks.map((work) => (
                    <div key={work.workId} className="flex items-center gap-4 p-4">
                      <div className="relative w-14 h-14 rounded-[5px] overflow-hidden border border-[#E2DDD5] shrink-0">
                        <AppImage src={work.image} alt={work.imageAlt} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <p className="text-sm font-semibold text-[#231F20]">{work.title}</p>
                          <StatusPill status={work.status} />
                        </div>
                        <p className="text-xs text-[#645E59]">{work.year} · {work.medium}</p>
                        {work.estimateLow && (
                          <p className="text-xs text-[#A34828] font-semibold mt-0.5">
                            Est. ₹{(work.estimateLow / 100000).toFixed(1)}–{(work.estimateHigh! / 100000).toFixed(1)}L
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {work.linkedLotId && (
                          <Link
                            href="/auctions"
                            className="text-xs font-bold text-[#A34828] border border-[#A34828]/30 bg-[#A34828]/5 px-3 py-1.5 rounded-[5px] hover:bg-[#A34828] hover:text-[#FAF9F7] transition-colors"
                          >
                            Bid Now
                          </Link>
                        )}
                        {work.linkedMarketplaceId && (
                          <Link
                            href={`/marketplace/${work.linkedMarketplaceId}`}
                            className="text-xs font-bold text-[#231F20] border border-[#E2DDD5] bg-[#FAF9F7] px-3 py-1.5 rounded-[5px] hover:border-[#A34828] transition-colors"
                          >
                            Buy Now
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Past works */}
            {pastWorks.length > 0 && (
              <section>
                <div className="mb-5">
                  <p className="text-xs text-[#645E59] font-bold uppercase tracking-widest mb-1">Portfolio</p>
                  <h2 className="font-display text-2xl font-semibold text-[#231F20]">Past & Collected Works</h2>
                </div>
                <div className="flex gap-5 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                  {pastWorks.map((work) => (
                    <WorkCard key={work.workId} work={work} onClick={() => setSelectedWork(work)} />
                  ))}
                </div>
                <p className="text-xs text-[#A09890] mt-3">Click any work to view its full provenance chain.</p>
              </section>
            )}
          </>
        )}

        {/* STUDIO FEED TAB */}
        {activeTab === 'studio' && (
          <div className="grid lg:grid-cols-2 gap-8 pt-4">
            {/* BTS feed */}
            <section>
              <div className="mb-5">
                <p className="text-xs text-[#A34828] font-bold uppercase tracking-widest mb-1">Artist-Controlled</p>
                <h2 className="font-display text-2xl font-semibold text-[#231F20]">Studio Feed</h2>
                <p className="text-sm text-[#645E59] mt-1">Process notes, work-in-progress, and studio dispatches — direct from the artist.</p>
              </div>
              <div className="space-y-4">
                {artist.btsFeed.map((post) => (
                  <BTSCard key={post.id} post={post} />
                ))}
              </div>
            </section>

            {/* Ask the Artist */}
            <section>
              <div className="mb-5">
                <p className="text-xs text-[#A34828] font-bold uppercase tracking-widest mb-1">Direct Engagement</p>
                <h2 className="font-display text-2xl font-semibold text-[#231F20]">Ask the Artist</h2>
                <p className="text-sm text-[#645E59] mt-1">Questions from collectors and the artist&apos;s responses.</p>
              </div>

              <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] p-5 mb-5">
                <p className="text-sm font-semibold text-[#231F20] mb-3">Submit a question</p>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask about process, materials, provenance, or upcoming work…"
                  rows={3}
                  className="w-full bg-[#F5F3EF] border border-[#E2DDD5] rounded-[5px] px-4 py-3 text-sm text-[#231F20] placeholder:text-[#A09890] resize-none focus:outline-none focus:border-[#A34828] transition-colors"
                />
                {questionSubmitted && (
                  <p className="text-xs text-[#3A6B4A] mt-2 mb-2">✓ Question submitted — the artist will respond within 48 hours.</p>
                )}
                <button
                  onClick={handleSubmitQuestion}
                  disabled={!question.trim()}
                  className="mt-3 w-full py-2.5 bg-[#A34828]/10 border border-[#A34828]/30 text-[#A34828] font-bold text-sm rounded-[5px] hover:bg-[#A34828] hover:text-[#FAF9F7] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit Question
                </button>
              </div>

              <div className="space-y-3">
                {questions.map((q, i) => (
                  <div key={i} className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#A34828]/10 border border-[#A34828]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#A34828]">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-[#231F20] leading-relaxed">{q.text}</p>
                        <p className="text-xs text-[#A09890] mt-1">Collector · Awaiting response</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notify toggle */}
              <div className="mt-6 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#231F20]">New drop notifications</p>
                  <p className="text-xs text-[#645E59] mt-0.5">Get notified when {artist.name.split(' ')[0]} has new works in an IAH drop.</p>
                </div>
                <button
                  onClick={() => setNotifyEnabled(!notifyEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${notifyEnabled ? 'bg-[#A34828]' : 'bg-[#E2DDD5]'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${notifyEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </section>
          </div>
        )}

        {/* PROVENANCE LEDGER TAB */}
        {activeTab === 'provenance' && (
          <section className="pt-4">
            <div className="mb-6">
              <p className="text-xs text-[#A34828] font-bold uppercase tracking-widest mb-1">IAH NFC Registry</p>
              <h2 className="font-display text-2xl font-semibold text-[#231F20] mb-1">Lifelong Provenance Ledger</h2>
              <p className="text-sm text-[#645E59]">Every work by {artist.name} that has passed through IAH&apos;s NFC registry — chained chronologically.</p>
            </div>
            <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] overflow-hidden">
              <div className="p-5 border-b border-[#E2DDD5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔐</span>
                  <div>
                    <p className="text-sm font-bold text-[#231F20]">{artist.portfolioWorks.length} works registered</p>
                    <p className="text-xs text-[#645E59]">Immutable NFC-linked provenance</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#A34828] bg-[#A34828]/10 border border-[#A34828]/30 rounded-full px-3 py-1">
                  DPP Certified
                </span>
              </div>
              <div className="divide-y divide-[#E2DDD5]">
                {artist.portfolioWorks.map((work) => (
                  <button
                    key={work.workId}
                    onClick={() => setSelectedWork(work)}
                    className="w-full p-5 flex items-center gap-4 hover:bg-[#F5F3EF] transition-colors text-left group"
                  >
                    <div className="relative w-14 h-14 rounded-[5px] overflow-hidden border border-[#E2DDD5] shrink-0">
                      <AppImage src={work.image} alt={work.imageAlt} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <p className="text-sm font-semibold text-[#231F20]">{work.title}</p>
                        <StatusPill status={work.status} />
                      </div>
                      <p className="text-xs text-[#645E59]">{work.year} · {work.medium}</p>
                      <p className="text-xs text-[#A09890] font-mono mt-0.5 truncate">{work.dppHash}</p>
                    </div>
                    <div className="text-[#A09890] group-hover:text-[#A34828] transition-colors shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Provenance modal */}
      {selectedWork && (
        <ProvenanceModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}

      <Footer />
    </main>
  );
}
