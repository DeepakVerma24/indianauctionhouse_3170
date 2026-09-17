'use client';
import React, { useState } from 'react';

const mapPins = [
  { id: 1, x: 28, y: 38, label: 'NGMA Mumbai', active: true },
  { id: 2, x: 52, y: 55, label: 'Jehangir Art Gallery', active: false },
  { id: 3, x: 71, y: 30, label: 'Kala Ghoda', active: false },
  { id: 4, x: 40, y: 68, label: 'Chhatrapati Shivaji Museum', active: false },
  { id: 5, x: 62, y: 72, label: 'Piramal Museum', active: false },
];

const hotspots = [
  { id: 1, x: 22, y: 42, label: 'Untitled No. 7', artist: 'Aarav Mehta' },
  { id: 2, x: 55, y: 35, label: 'Nathdwara Series III', artist: 'Master Kalyan Sharma' },
  { id: 3, x: 75, y: 60, label: 'Bronze Deity Form', artist: 'Swaminathan Sthapati' },
  { id: 4, x: 38, y: 70, label: 'Heritage Textile Panel', artist: 'Salvi Weavers' },
];

const featuredCards = [
  {
    type: 'Ongoing Exhibition',
    badge: '360° Tour Available',
    badgeColor: 'accent',
    title: 'Chromatic Dialogues: New Indian Abstraction',
    venue: 'National Gallery of Modern Art',
    city: 'Mumbai, Maharashtra',
    dates: '12 Sep – 30 Nov 2026',
    detail: null,
    cta: 'View Exhibition',
  },
  {
    type: 'Heritage Landmark',
    badge: 'UNESCO Listed',
    badgeColor: 'muted',
    title: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya',
    venue: 'Indo-Saracenic Revival Architecture',
    city: 'Fort, Mumbai',
    dates: null,
    detail: 'Est. 1922 · 50,000+ artefacts',
    cta: 'Get Directions →',
  },
  {
    type: 'Curated Art Walk',
    badge: 'Self-Guided',
    badgeColor: 'muted',
    title: 'Kala Ghoda Cultural Corridor',
    venue: '3 Galleries · 1.8 km route',
    city: 'Fort District, Mumbai',
    dates: null,
    detail: '~45 min walk · Open daily 10am–7pm',
    cta: 'Start Walk',
  },
];

const categories = ['All', 'Contemporary', 'Heritage Sites', 'Museums', 'Virtual Only'];

function MapViewport({ activePin, setActivePin }: { activePin: number; setActivePin: (id: number) => void }) {
  return (
    <div className="relative w-full h-full min-h-[340px] overflow-hidden">
      <iframe
        title="Mumbai Arts District Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.9!2d72.8318!3d18.9281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c73a0b3a0b%3A0x0!2sKala+Ghoda%2C+Mumbai%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
        className="absolute inset-0 w-full h-full"
        style={{ border: 0, filter: 'sepia(20%) saturate(0.8) brightness(1.05)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(245,243,239,0.08)' }} />

      {mapPins.map((pin) => (
        <button
          key={pin.id}
          onClick={() => setActivePin(pin.id)}
          className="absolute group z-10 transition-transform duration-200 hover:scale-110"
          style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -100%)' }}
          aria-label={pin.label}
        >
          <div className="relative flex flex-col items-center">
            <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 text-[10px] font-medium tracking-wide rounded-[4px] transition-all duration-200 pointer-events-none
              ${activePin === pin.id ? 'opacity-100 translate-y-0' : 'opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0'}`}
              style={{ background: '#FAF9F7', border: '1px solid #E2DDD5', color: '#231F20' }}>
              {pin.label}
            </div>
            <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.477 0 0 4.477 0 10c0 7.5 10 16 10 16s10-8.5 10-16C20 4.477 15.523 0 10 0z"
                fill={activePin === pin.id ? '#A34828' : '#FAF9F7'}
                stroke={activePin === pin.id ? '#873B20' : '#E2DDD5'}
                strokeWidth="1" />
              <circle cx="10" cy="10" r="3.5" fill={activePin === pin.id ? '#FAF9F7' : '#A34828'} />
            </svg>
            {activePin === pin.id && (
              <span className="absolute top-[2px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full animate-ping opacity-20" style={{ background: 'rgba(163,72,40,0.5)' }} />
            )}
          </div>
        </button>
      ))}

      <button className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 hover:scale-105"
        style={{ background: '#FAF9F7', border: '1px solid #E2DDD5', color: '#A34828', backdropFilter: 'blur(8px)' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
        </svg>
        Locate Near Me
      </button>

      <div className="absolute top-4 left-4 z-10 opacity-70">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="13" stroke="#A34828" strokeWidth="0.5" />
          <path d="M14 2 L16 12 L14 10 L12 12 Z" fill="#A34828" />
          <path d="M14 26 L16 16 L14 18 L12 16 Z" fill="#E2DDD5" />
          <text x="14" y="5" textAnchor="middle" fill="#A34828" fontSize="4" fontFamily="sans-serif">N</text>
        </svg>
      </div>
    </div>
  );
}

function GalleryViewport({ activeHotspot, setActiveHotspot }: { activeHotspot: number; setActiveHotspot: (id: number) => void }) {
  return (
    <div className="relative w-full h-full min-h-[340px] overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #F5F3EF 0%, #EDE9E3 60%, #E2DDD5 100%)' }}>
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="50" y1="55" x2="0" y2="100" stroke="#A34828" strokeWidth="0.3" />
          <line x1="50" y1="55" x2="100" y2="100" stroke="#A34828" strokeWidth="0.3" />
          <line x1="50" y1="55" x2="25" y2="100" stroke="#A34828" strokeWidth="0.2" />
          <line x1="50" y1="55" x2="75" y2="100" stroke="#A34828" strokeWidth="0.2" />
          <line x1="50" y1="55" x2="0" y2="0" stroke="#A34828" strokeWidth="0.2" />
          <line x1="50" y1="55" x2="100" y2="0" stroke="#A34828" strokeWidth="0.2" />
          <line x1="0" y1="55" x2="100" y2="55" stroke="#A34828" strokeWidth="0.3" />
          <rect x="5" y="10" width="18" height="38" fill="rgba(163,72,40,0.03)" stroke="rgba(163,72,40,0.15)" strokeWidth="0.3" />
          <rect x="27" y="10" width="18" height="38" fill="rgba(163,72,40,0.03)" stroke="rgba(163,72,40,0.15)" strokeWidth="0.3" />
          <rect x="55" y="10" width="18" height="38" fill="rgba(163,72,40,0.03)" stroke="rgba(163,72,40,0.15)" strokeWidth="0.3" />
          <rect x="77" y="10" width="18" height="38" fill="rgba(163,72,40,0.03)" stroke="rgba(163,72,40,0.15)" strokeWidth="0.3" />
        </svg>
        <div className="absolute top-0 left-[14%] w-16 h-24 opacity-30" style={{ background: 'radial-gradient(ellipse at top, rgba(163,72,40,0.3) 0%, transparent 70%)', filter: 'blur(8px)' }} />
        <div className="absolute top-0 left-[36%] w-16 h-24 opacity-30" style={{ background: 'radial-gradient(ellipse at top, rgba(163,72,40,0.3) 0%, transparent 70%)', filter: 'blur(8px)' }} />
        <div className="absolute top-0 left-[64%] w-16 h-24 opacity-30" style={{ background: 'radial-gradient(ellipse at top, rgba(163,72,40,0.3) 0%, transparent 70%)', filter: 'blur(8px)' }} />
        <div className="absolute top-0 left-[86%] w-16 h-24 opacity-30" style={{ background: 'radial-gradient(ellipse at top, rgba(163,72,40,0.3) 0%, transparent 70%)', filter: 'blur(8px)' }} />
      </div>

      {hotspots.map((spot) => (
        <button key={spot.id} onClick={() => setActiveHotspot(spot.id)}
          className="absolute z-10 group transition-all duration-200"
          style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
          aria-label={spot.label}>
          <div className="relative flex items-center justify-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${activeHotspot === spot.id ? 'scale-110' : 'group-hover:scale-110'}`}
              style={{
                background: activeHotspot === spot.id ? 'rgba(163,72,40,0.15)' : '#FAF9F7',
                border: `1.5px solid ${activeHotspot === spot.id ? '#A34828' : '#E2DDD5'}`,
              }}>
              <div className="w-2 h-2 rounded-full" style={{ background: activeHotspot === spot.id ? '#A34828' : '#645E59' }} />
            </div>
            <div className={`absolute left-full ml-2 whitespace-nowrap px-2.5 py-1 rounded-[4px] text-[10px] font-medium tracking-wide transition-all duration-200 pointer-events-none
              ${activeHotspot === spot.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              style={{ background: '#FAF9F7', border: '1px solid #E2DDD5', color: '#231F20' }}>
              <div style={{ color: '#A34828' }}>{spot.label}</div>
              <div style={{ color: '#645E59', fontSize: '9px' }}>{spot.artist}</div>
            </div>
          </div>
        </button>
      ))}

      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide"
        style={{ background: '#FAF9F7', border: '1px solid #E2DDD5', color: '#A34828' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#3A6B4A] animate-pulse" />
        360° Live
      </div>

      <button className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: '#FAF9F7', border: '1px solid #E2DDD5', color: '#645E59' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: '#FAF9F7', border: '1px solid #E2DDD5', color: '#645E59' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
      </button>
    </div>
  );
}

export default function ExhibitionHubSection() {
  const [activeTab, setActiveTab] = useState<'map' | 'tour'>('map');
  const [activePin, setActivePin] = useState(1);
  const [activeHotspot, setActiveHotspot] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const activePinLabel = mapPins.find((p) => p.id === activePin)?.label ?? 'Mumbai Arts District';
  const activeHotspotLabel = hotspots.find((h) => h.id === activeHotspot)?.label ?? 'Gallery Room 1';

  return (
    <section className="relative w-full py-20 overflow-hidden bg-[#F5F3EF]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 flex-shrink-0 bg-[#A34828]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#A34828]">
              Cultural Discovery &amp; Virtual Spaces
            </span>
            <div className="h-px flex-1 bg-[#E2DDD5]" />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold mb-3 leading-tight text-[#231F20]" style={{ letterSpacing: '-0.01em' }}>
                Explore Living Art: From Global Galleries to Virtual 3D Rooms
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#645E59]">
                Navigate ongoing exhibitions nearby or experience curated spaces from anywhere in the world.
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex-shrink-0">
              <div className="inline-flex p-1 rounded-[5px] bg-[#FAF9F7] border border-[#E2DDD5]">
                <button
                  onClick={() => setActiveTab('map')}
                  className="px-5 py-2 rounded-[4px] text-xs font-semibold tracking-wide transition-all duration-300"
                  style={{
                    background: activeTab === 'map' ? '#A34828' : 'transparent',
                    color: activeTab === 'map' ? '#FAF9F7' : '#645E59',
                  }}
                >
                  Explore Map &amp; Venues
                </button>
                <button
                  onClick={() => setActiveTab('tour')}
                  className="px-5 py-2 rounded-[4px] text-xs font-semibold tracking-wide transition-all duration-300"
                  style={{
                    background: activeTab === 'tour' ? '#A34828' : 'transparent',
                    color: activeTab === 'tour' ? '#FAF9F7' : '#645E59',
                  }}
                >
                  3D Virtual Tours
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Bento Layout */}
        <div className="flex flex-col lg:flex-row gap-5 mb-6">

          {/* Left — 60% — Interactive Viewport */}
          <div className="lg:w-[60%] flex-shrink-0">
            <div className="relative overflow-hidden rounded-[5px] border border-[#E2DDD5] bg-[#FAF9F7]" style={{ minHeight: '420px' }}>
              <div className="relative" style={{ height: '380px' }}>
                {activeTab === 'map' ? (
                  <MapViewport activePin={activePin} setActivePin={setActivePin} />
                ) : (
                  <GalleryViewport activeHotspot={activeHotspot} setActiveHotspot={setActiveHotspot} />
                )}
              </div>

              {/* Bottom overlay bar */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-3.5 bg-[#FAF9F7]/95 border-t border-[#E2DDD5]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#A34828]" />
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest truncate text-[#645E59]">
                      {activeTab === 'map' ? 'Active Location' : 'Active Tour'}
                    </p>
                    <p className="text-sm font-semibold truncate text-[#231F20]">
                      {activeTab === 'map' ? activePinLabel : activeHotspotLabel}
                    </p>
                  </div>
                </div>
                <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-[4px] text-xs font-semibold tracking-wide transition-all duration-200 hover:bg-[#873B20] bg-[#A34828] text-[#FAF9F7]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                  Launch Fullscreen Experience
                </button>
              </div>
            </div>
          </div>

          {/* Right — 40% — Featured Cards */}
          <div className="lg:w-[40%] flex flex-col gap-3">
            {featuredCards.map((card, idx) => (
              <div key={idx} className="group relative flex flex-col rounded-[5px] p-5 transition-all duration-300 cursor-pointer card-hover bg-[#FAF9F7] border border-[#E2DDD5]" style={{ flex: 1 }}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A34828]">
                    {card.type}
                  </span>
                  <span className="flex-shrink-0 px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wide border border-[#E2DDD5] text-[#645E59] bg-[#F5F3EF]">
                    {card.badge}
                  </span>
                </div>

                <h3 className="font-display text-base font-semibold leading-snug mb-1.5 text-[#231F20]">
                  {card.title}
                </h3>

                <p className="text-xs mb-0.5 text-[#645E59]">{card.venue}</p>
                <p className="text-xs mb-3 text-[#645E59]/70">{card.city}</p>

                {card.dates && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#A34828" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="text-[10px] text-[#645E59]">{card.dates}</span>
                  </div>
                )}
                {card.detail && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#A34828" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span className="text-[10px] text-[#645E59]">{card.detail}</span>
                  </div>
                )}

                <div className="mt-auto pt-3 border-t border-[#E2DDD5]">
                  <button className="text-xs font-semibold tracking-wide transition-colors duration-200 text-[#A34828] hover:text-[#873B20]">
                    {card.cta}
                    {card.cta !== 'Get Directions →' && (
                      <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Quick-Action Bar */}
        <div className="rounded-[5px] px-5 py-4 bg-[#FAF9F7] border border-[#E2DDD5]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-shrink-0 sm:w-64">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#645E59" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city, artist, or gallery..."
                className="w-full pl-9 pr-4 py-2.5 rounded-[4px] text-xs outline-none transition-all duration-200 placeholder:text-[#645E59]/50 bg-[#F5F3EF] border border-[#E2DDD5] text-[#231F20]"
                onFocus={(e) => { e.currentTarget.style.borderColor = '#A34828'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E2DDD5'; }}
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap flex-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-3 py-1.5 rounded-[4px] text-[10px] font-semibold tracking-wide transition-all duration-200"
                  style={{
                    background: activeCategory === cat ? '#A34828' : '#F5F3EF',
                    border: `1px solid ${activeCategory === cat ? '#A34828' : '#E2DDD5'}`,
                    color: activeCategory === cat ? '#FAF9F7' : '#645E59',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex-shrink-0">
              <a href="#submit-exhibition"
                className="text-[10px] font-medium tracking-wide transition-colors duration-200 hover:text-[#A34828] whitespace-nowrap text-[#645E59]"
                style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                Are you an institution or gallery? Submit your exhibition →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
