'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Clock, Sparkles, Navigation } from 'lucide-react';

const MapCanvas = dynamic(() => import('../MapCanvas'), { ssr: false });

const mapCenter: [number, number] = [35.6892, 51.3890];

const windowLocations = [
  {
    lat: 35.6920, lng: 51.3870,
    user1Path: [
      [35.6900, 51.3880],
      [35.6910, 51.3875],
      [35.6920, 51.3870],
      [35.6925, 51.3865],
    ] as [number, number][],
    user2Path: [
      [35.6930, 51.3860],
      [35.6925, 51.3868],
      [35.6920, 51.3875],
      [35.6915, 51.3880],
    ] as [number, number][],
    overlapCenter: { lat: 35.6922, lng: 51.3872, radius: 80 },
  },
  {
    lat: 35.6950, lng: 51.3920,
    user1Path: [
      [35.6930, 51.3900],
      [35.6940, 51.3910],
      [35.6950, 51.3920],
      [35.6960, 51.3930],
    ] as [number, number][],
    user2Path: [
      [35.6965, 51.3925],
      [35.6955, 51.3922],
      [35.6948, 51.3918],
      [35.6940, 51.3910],
    ] as [number, number][],
    overlapCenter: { lat: 35.6952, lng: 51.3920, radius: 120 },
  },
  {
    lat: 35.6840, lng: 51.3850,
    user1Path: [
      [35.6860, 51.3840],
      [35.6850, 51.3845],
      [35.6840, 51.3850],
      [35.6830, 51.3860],
    ] as [number, number][],
    user2Path: [
      [35.6835, 51.3865],
      [35.6840, 51.3858],
      [35.6845, 51.3850],
      [35.6850, 51.3842],
    ] as [number, number][],
    overlapCenter: { lat: 35.6842, lng: 51.3855, radius: 60 },
  },
];

export default function SerendipityWindowsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeWindow, setActiveWindow] = useState(0);
  const [showNudge, setShowNudge] = useState(false);

  const windows = [
    {
      location: 'Meridian Coffee Co.',
      time: '8:15 AM',
      day: 'Tomorrow',
      nearMisses: 12,
      nudge: 'Try the new seasonal blend — it just arrived today.',
      detail: 'You both ordered oat lattes 14 times last month, always between 8:00 and 8:20 AM. Your paths came within 20 meters but never overlapped.',
    },
    {
      location: 'Riverside Trail Head',
      time: '6:45 AM',
      day: 'Saturday',
      nearMisses: 8,
      nudge: 'A new connecting path opened last week — locals love the morning light there.',
      detail: 'You both run 5K at similar paces. Last month, you started within 10 minutes of each other 8 times on the same trail.',
    },
    {
      location: 'The Quiet Page Bookstore',
      time: '3:30 PM',
      day: 'Sunday',
      nearMisses: 5,
      nudge: 'The author reading this Sunday has been moved to the afternoon slot.',
      detail: 'You both browsed the contemporary fiction section 5 times. You picked up the same book twice — Murakami, 3 weeks apart.',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowNudge(true), 3000);
    return () => clearTimeout(timer);
  }, [activeWindow]);

  const activeLoc = windowLocations[activeWindow];

  const mapPoints = [
    { lat: activeLoc.lat, lng: activeLoc.lng, label: windows[activeWindow].location, color: '#7CB9A8', type: 'serendipity' as const, pulse: true },
  ];

  const mapPaths = [
    { coords: activeLoc.user1Path, color: '#D4A574', dash: true },
    { coords: activeLoc.user2Path, color: '#7CB9A8', dash: true },
  ];

  const overlapZones = [
    { lat: activeLoc.overlapCenter.lat, lng: activeLoc.overlapCenter.lng, radius: activeLoc.overlapCenter.radius, color: '#B8A9C9' },
  ];

  return (
    <section id="overlap-engine" className="relative py-32 px-6" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-[#7CB9A8]/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#7CB9A8] text-sm font-medium tracking-widest uppercase mb-4">
            Module 2
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">
            Serendipity <span className="text-gradient-aurora">Windows</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The AI finds moments when compatible people naturally cross paths. It
            calculates the gap — and whispers a nudge to close it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Map with near-miss paths */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-[#2A2A3A]/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#B8A9C9]" />
                <span className="text-xs text-muted-foreground/60">
                  Near-miss analysis — live
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#D4A574]" />
                  <span className="text-[10px] text-muted-foreground/40">You</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#7CB9A8]" />
                  <span className="text-[10px] text-muted-foreground/40">Them</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#B8A9C9]/50" />
                  <span className="text-[10px] text-muted-foreground/40">Overlap zone</span>
                </div>
              </div>
            </div>
            <div className="relative h-72 sm:h-80">
              <MapCanvas
                key={activeWindow}
                center={[activeLoc.lat, activeLoc.lng]}
                zoom={16}
                points={mapPoints}
                paths={mapPaths}
                showOverlap={overlapZones}
                className="w-full h-full"
              />
            </div>
            <p className="text-xs text-muted-foreground/40 p-4 pt-2 text-center">
              {windows[activeWindow].nearMisses} near-misses detected &middot; gap closing
            </p>
          </motion.div>

          {/* Right: Serendipity windows list */}
          <div className="space-y-4">
            {windows.map((win, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                onClick={() => {
                  setActiveWindow(i);
                  setShowNudge(false);
                }}
                className={`glass rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                  activeWindow === i
                    ? 'border-[#7CB9A8]/30'
                    : 'hover:bg-[#1A1A25]/30'
                }`}
                style={{
                  borderLeft:
                    activeWindow === i
                      ? '3px solid #7CB9A8'
                      : '3px solid transparent',
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#7CB9A8]" />
                    <span className="text-sm font-medium">{win.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-muted-foreground/40" />
                    <span className="text-xs text-muted-foreground/60">
                      {win.time}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground/50 mb-3">
                  {win.day} &middot;{' '}
                  <span className="text-[#D4A574]/80">
                    {win.nearMisses} near-misses last month
                  </span>
                </p>

                {activeWindow === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs text-muted-foreground/70 leading-relaxed mb-4">
                      {win.detail}
                    </p>

                    {/* Nudge card */}
                    {showNudge && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-lg p-3 bg-[#7CB9A8]/5 border border-[#7CB9A8]/10"
                      >
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Sparkles className="w-3 h-3 text-[#7CB9A8]" />
                          <span className="text-[10px] text-[#7CB9A8] font-medium uppercase tracking-wider">
                            Gentle Nudge
                          </span>
                        </div>
                        <p className="text-xs text-[#7CB9A8]/80 leading-relaxed italic">
                          &ldquo;{win.nudge}&rdquo;
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
