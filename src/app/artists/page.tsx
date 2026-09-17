'use client';
import React, { useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import { artists, Artist } from './data/artists';

/* ─── Stat pill ─────────────────────────────────────────────── */
function StatPill({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-2xl sm:text-3xl font-semibold text-[#FAF9F7]">{value}</p>
      <p className="text-xs text-[#FAF9F7]/60 uppercase tracking-widest mt-0.5">{label}</p>
    </div>
  );
}

/* ─── Featured card (tall portrait) ─────────────────────────── */
function FeaturedCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artists/${artist.id}`} className="block group shrink-0 w-64 sm:w-72">
      <div className="relative rounded-[5px] overflow-hidden border border-[#E2DDD5]/40 h-[420px] card-hover">
        <AppImage
          src={artist.heroImage}
          alt={artist.heroImageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="288px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {artist.activeLotIds.length > 0 && (
          <div className="absolute top-4 left-4">
            <span className="flex items-center gap-1.5 bg-[#FAF9F7]/90 backdrop-blur-sm text-[#3A6B4A] text-xs font-bold px-3 py-1.5 rounded-full border border-[#3A6B4A]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3A6B4A] animate-ping" />
              {artist.activeLotIds.length} Active Lot{artist.activeLotIds.length > 1 ? 's' : ''}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[10px] text-[#FAF9F7]/60 font-bold uppercase tracking-widest mb-1">{artist.school}</p>
          <h3 className="font-display text-xl font-semibold text-[#FAF9F7] mb-1 leading-tight">{artist.name}</h3>
          <p className="text-xs text-[#FAF9F7]/60 line-clamp-2 mb-3">{artist.bio.slice(0, 90)}…</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#FAF9F7]/50">{artist.followerCount.toLocaleString()} following</span>
              <span className="text-xs text-[#FAF9F7]/50">·</span>
              <span className="text-xs text-[#FAF9F7]/50">{artist.portfolioWorks.length} works</span>
            </div>
            <span className="text-xs text-[#E2C27D] font-semibold group-hover:underline">View Hub →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Compact grid card ──────────────────────────────────────── */
function ArtistGridCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artists/${artist.id}`} className="block group">
      <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] overflow-hidden card-hover h-full">
        <div className="relative h-52 overflow-hidden">
          <AppImage
            src={artist.heroImage}
            alt={artist.heroImageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          {/* Avatar overlay */}
          <div className="absolute bottom-3 left-3 flex items-end gap-2.5">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#E2DDD5]/80 shrink-0">
              <AppImage
                src={artist.avatarImage}
                alt={artist.avatarImageAlt}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-[10px] text-[#FAF9F7]/60 font-bold uppercase tracking-wider leading-none mb-0.5">{artist.school}</p>
              <p className="font-display text-sm font-semibold text-[#FAF9F7] leading-tight">{artist.name}</p>
            </div>
          </div>

          {artist.activeLotIds.length > 0 && (
            <div className="absolute top-2.5 right-2.5">
              <span className="flex items-center gap-1 bg-[#FAF9F7]/90 text-[#3A6B4A] text-[10px] font-bold px-2 py-1 rounded-full border border-[#3A6B4A]/30">
                <span className="w-1 h-1 rounded-full bg-[#3A6B4A] animate-ping" />
                Live
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs text-[#645E59] line-clamp-2 mb-3 leading-relaxed">{artist.bio.slice(0, 80)}…</p>
          <div className="flex items-center justify-between pt-3 border-t border-[#E2DDD5]">
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-sm font-bold text-[#231F20]">{artist.followerCount.toLocaleString()}</p>
                <p className="text-[10px] text-[#A09890] uppercase tracking-wide">Followers</p>
              </div>
              <div className="w-px h-6 bg-[#E2DDD5]" />
              <div className="text-center">
                <p className="text-sm font-bold text-[#231F20]">{artist.portfolioWorks.length}</p>
                <p className="text-[10px] text-[#A09890] uppercase tracking-wide">Works</p>
              </div>
              {artist.exhibitionCount && (
                <>
                  <div className="w-px h-6 bg-[#E2DDD5]" />
                  <div className="text-center">
                    <p className="text-sm font-bold text-[#231F20]">{artist.exhibitionCount}</p>
                    <p className="text-[10px] text-[#A09890] uppercase tracking-wide">Shows</p>
                  </div>
                </>
              )}
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#A34828] group-hover:translate-x-0.5 transition-transform">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Horizontal scroll row ──────────────────────────────────── */
function ScrollRow({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    ref.current?.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
  };
  return (
    <div className="mb-14">
      <div className="flex items-end justify-between mb-5 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#231F20]">{title}</h2>
          {subtitle && <p className="text-sm text-[#645E59] mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {(['left', 'right'] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              className="w-8 h-8 rounded-full border border-[#E2DDD5] flex items-center justify-center text-[#645E59] hover:text-[#231F20] hover:border-[#A34828] transition-colors"
              aria-label={`Scroll ${dir}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pl-4 sm:pl-6 lg:pl-8 pr-4 pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
const COHORTS = ['All', 'Udaipur Residency Cohort', 'Nathdwara Lineage Workshops', 'Patan, Gujarat'];

export default function ArtistsPage() {
  const [search, setSearch] = useState('');
  const [activeCohort, setActiveCohort] = useState('All');

  const totalWorks = artists.reduce((acc, a) => acc + a.portfolioWorks.length, 0);
  const totalFollowers = artists.reduce((acc, a) => acc + a.followerCount, 0);
  const liveArtists = artists.filter((a) => a.activeLotIds.length > 0).length;

  const filtered = useMemo(() => {
    return artists.filter((a) => {
      const matchSearch =
        !search ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.school.toLowerCase().includes(search.toLowerCase()) ||
        a.studioLocation.toLowerCase().includes(search.toLowerCase());
      const matchCohort = activeCohort === 'All' || a.school === activeCohort || a.cohort === activeCohort;
      return matchSearch && matchCohort;
    });
  }, [search, activeCohort]);

  const featured = artists.filter((a) => a.activeLotIds.length > 0);
  const udaipurCohort = artists.filter((a) => a.cohort === 'Udaipur Residency Cohort');
  const lineageWorkshops = artists.filter((a) => a.cohort === 'Nathdwara Lineage Workshops');

  return (
    <main className="min-h-screen bg-[#F5F3EF] overflow-x-hidden">
      <Header />

      {/* ── Cinematic hero ── */}
      <div className="relative h-[60vh] min-h-[440px] overflow-hidden">
        <AppImage
          src={artists[2].heroImage}
          alt="Artist Hub hero — Swaminathan Sthapati bronze casting studio"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410] via-[#1A1410]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1410]/70 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-10 max-w-7xl mx-auto">
          <p className="text-xs text-[#E2C27D] font-bold uppercase tracking-widest mb-3">IAH Registry</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#FAF9F7] mb-4" style={{ letterSpacing: '-0.02em' }}>
            Artist Hub
          </h1>
          <p className="text-[#FAF9F7]/70 text-base max-w-xl mb-8 leading-relaxed">
            Every artist whose work has passed through IAH&apos;s NFC registry — with their full career provenance ledger, studio feed, and active lots.
          </p>

          {/* Stats strip */}
          <div className="flex items-center gap-8 sm:gap-12">
            <StatPill value={artists.length} label="Artists" />
            <div className="w-px h-10 bg-[#FAF9F7]/20" />
            <StatPill value={totalWorks} label="Works Registered" />
            <div className="w-px h-10 bg-[#FAF9F7]/20" />
            <StatPill value={totalFollowers.toLocaleString()} label="Collector Followers" />
            <div className="w-px h-10 bg-[#FAF9F7]/20" />
            <StatPill value={liveArtists} label="Live in Drop 001" />
          </div>
        </div>
      </div>

      <div className="pt-12">
        {/* ── Featured scroll rail ── */}
        <ScrollRow title="Featured Artists" subtitle="Currently active in Drop 001">
          {featured.map((a) => (
            <FeaturedCard key={a.id} artist={a} />
          ))}
        </ScrollRow>

        {udaipurCohort.length > 0 && (
          <ScrollRow title="Udaipur Residency Cohort" subtitle="Contemporary painters from the IAH residency programme">
            {udaipurCohort.map((a) => (
              <FeaturedCard key={a.id} artist={a} />
            ))}
          </ScrollRow>
        )}

        {lineageWorkshops.length > 0 && (
          <ScrollRow title="Nathdwara Lineage Workshops" subtitle="Living masters of classical Indian craft traditions">
            {lineageWorkshops.map((a) => (
              <FeaturedCard key={a.id} artist={a} />
            ))}
          </ScrollRow>
        )}

        {/* ── Full registry grid ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="border-t border-[#E2DDD5] pt-12 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#231F20] mb-1">Full Registry</h2>
                <p className="text-sm text-[#645E59]">All {artists.length} artists with works in the IAH NFC provenance system</p>
              </div>
            </div>

            {/* Search + filter bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A09890]">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search artists, schools, locations…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[5px] text-sm text-[#231F20] placeholder:text-[#A09890] focus:outline-none focus:border-[#A34828] transition-colors"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {COHORTS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCohort(c)}
                    className={`px-3 py-2 rounded-[5px] text-xs font-semibold border transition-colors whitespace-nowrap ${
                      activeCohort === c
                        ? 'bg-[#A34828] text-[#FAF9F7] border-[#A34828]'
                        : 'bg-[#FAF9F7] text-[#645E59] border-[#E2DDD5] hover:border-[#A34828] hover:text-[#231F20]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#645E59] text-base">No artists match your search.</p>
              <button onClick={() => { setSearch(''); setActiveCohort('All'); }} className="mt-3 text-sm text-[#A34828] hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((artist) => (
                <ArtistGridCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
