'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/store/useAppStore';
import {
  Coffee,
  Bike,
  BookOpen,
  TreePine,
  PenTool,
  ShoppingBag,
  Zap,
  Moon,
  Sun,
  Sunset,
  Volume2,
  VolumeX,
} from 'lucide-react';

const MapCanvas = dynamic(() => import('../MapCanvas'), { ssr: false });

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  coffee: Coffee,
  running: Bike,
  book: BookOpen,
  trees: TreePine,
  'pen-tool': PenTool,
  'shopping-bag': ShoppingBag,
};

const timeIcons = {
  morning: Sun,
  afternoon: Sun,
  evening: Sunset,
  night: Moon,
};

const vibeLabels = {
  quiet: { label: 'Quiet', icon: VolumeX, color: '#B8A9C9' },
  lively: { label: 'Lively', icon: Volume2, color: '#7CB9A8' },
  balanced: { label: 'Balanced', icon: Zap, color: '#D4A574' },
};

const timeLabels = {
  morning: { label: 'Morning', range: '6 AM – 12 PM', color: '#E8C8A0' },
  afternoon: { label: 'Afternoon', range: '12 PM – 5 PM', color: '#D4A574' },
  evening: { label: 'Evening', range: '5 PM – 9 PM', color: '#B8A9C9' },
  night: { label: 'Night', range: '9 PM – 6 AM', color: '#8FB8DE' },
};

const mapCenter: [number, number] = [35.6892, 51.3890];

const mapPoints = [
  { lat: 35.6920, lng: 51.3870, label: 'Morning Coffee Ritual', color: '#D4A574', type: 'pattern' as const },
  { lat: 35.6950, lng: 51.3920, label: 'Trail Running Start', color: '#7CB9A8', type: 'pattern' as const },
  { lat: 35.6840, lng: 51.3850, label: 'Bookstore Browsing', color: '#B8A9C9', type: 'pattern' as const },
  { lat: 35.6870, lng: 51.3940, label: 'Evening Park Walk', color: '#8FB8DE', type: 'pattern' as const },
  { lat: 35.6895, lng: 51.3860, label: 'Late Night Writing', color: '#C9A9B8', type: 'pattern' as const },
  { lat: 35.6905, lng: 51.3910, label: 'Weekend Market', color: '#DEB887', type: 'pattern' as const },
];

const mapPaths = [
  {
    coords: [
      [35.6900, 51.3880],
      [35.6910, 51.3875],
      [35.6920, 51.3870],
    ] as [number, number][],
    color: '#D4A574',
    dash: true,
  },
  {
    coords: [
      [35.6892, 51.3890],
      [35.6920, 51.3900],
      [35.6950, 51.3920],
    ] as [number, number][],
    color: '#7CB9A8',
    dash: true,
  },
  {
    coords: [
      [35.6920, 51.3870],
      [35.6900, 51.3860],
      [35.6870, 51.3850],
      [35.6840, 51.3850],
    ] as [number, number][],
    color: '#B8A9C9',
    dash: true,
  },
];

export default function BehavioralFingerprintSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { patterns, patternLearned, setPatternLearned } = useAppStore();
  const [learningProgress, setLearningProgress] = useState(0);
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);
  const [highlightedPoint, setHighlightedPoint] = useState<string | null>(null);

  useEffect(() => {
    if (!isInView || patternLearned) return;
    const timer = setInterval(() => {
      setLearningProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [isInView, patternLearned]);

  useEffect(() => {
    if (learningProgress >= 100 && !patternLearned) {
      setPatternLearned(true);
    }
  }, [learningProgress, patternLearned, setPatternLearned]);

  // Calculate aggregate stats
  const avgEnergy = Math.round(
    patterns.reduce((sum, p) => sum + p.energyLevel, 0) / patterns.length
  );
  const dominantVibe =
    patterns
      .reduce(
        (acc, p) => {
          acc[p.vibe] = (acc[p.vibe] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ) || {};
  const topVibe = Object.entries(dominantVibe).sort((a, b) => b[1] - a[1])[0]?.[0] as
    | 'quiet'
    | 'lively'
    | 'balanced';

  return (
    <section id="fingerprint" className="relative py-32 px-6" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#D4A574]/3 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#D4A574] text-sm font-medium tracking-widest uppercase mb-4">
            Module 1
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">
            Your Invisible <span className="text-gradient-serendipity">Fingerprint</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            No photos. No bios. The app learns who you are by where you go, when you go
            there, and how you move through the world. Here&apos;s what it sees.
          </p>
        </motion.div>

        {/* Learning animation */}
        {!patternLearned && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-8 mb-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#D4A574] animate-pulse-glow" />
              <span className="text-sm text-[#D4A574] font-medium">
                Learning your patterns...
              </span>
            </div>
            <div className="w-full max-w-md mx-auto h-2 rounded-full bg-[#2A2A3A] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#D4A574] to-[#E8C8A0]"
                style={{ width: `${learningProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-xs text-muted-foreground/40 mt-3">
              Analyzing spatial data, timing preferences, and energy patterns...
            </p>
          </motion.div>
        )}

        {/* Patterns grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={patternLearned ? { opacity: 1 } : { opacity: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-xl p-4 text-center">
              <p className="text-2xl font-light text-[#D4A574]">{patterns.length}</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Patterns Found</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <p className="text-2xl font-light text-[#7CB9A8]">{avgEnergy}%</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Avg Energy</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <p className="text-2xl font-light text-[#B8A9C9]">
                {vibeLabels[topVibe]?.label || 'Mixed'}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">Dominant Vibe</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <p className="text-2xl font-light text-[#8FB8DE]">92%</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Consistency</p>
            </div>
          </div>

          {/* Map + Patterns layout */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-6">
            {/* Map */}
            <div className="glass rounded-2xl overflow-hidden order-2 lg:order-1">
              <div className="p-4 border-b border-[#2A2A3A]/50">
                <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">Spatial Pattern Map</p>
              </div>
              <div className="relative h-[350px] sm:h-[420px]">
                <MapCanvas
                  center={mapCenter}
                  zoom={15}
                  points={
                    highlightedPoint
                      ? mapPoints.filter((p) => p.label === highlightedPoint)
                      : mapPoints
                  }
                  paths={highlightedPoint ? [] : mapPaths}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Pattern cards */}
            <div className="space-y-3 order-1 lg:order-2 max-h-[500px] overflow-y-auto pr-1">
            {patterns.map((pattern, i) => {
              const Icon = iconMap[pattern.icon] || Coffee;
              const timeInfo = timeLabels[pattern.timeOfDay];
              const vibeInfo = vibeLabels[pattern.vibe];
              const VibeIcon = vibeInfo.icon;
              const isExpanded = expandedPattern === pattern.id;

              return (
                <motion.div
                  key={pattern.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={patternLearned ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() =>
                    setExpandedPattern(isExpanded ? null : pattern.id)
                  }
                  onMouseEnter={() => setHighlightedPoint(pattern.label)}
                  onMouseLeave={() => setHighlightedPoint(null)}
                  className={`glass rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:border-opacity-50 ${
                    isExpanded ? 'border-[#2A2A3A]' : ''
                  }`}
                  style={{
                    borderLeft: `3px solid ${pattern.color}40`,
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${pattern.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: pattern.color }} />
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${timeInfo.color}15`,
                        color: timeInfo.color,
                      }}
                    >
                      {timeInfo.label}
                    </span>
                  </div>

                  <h4 className="text-sm font-medium mb-1">{pattern.label}</h4>
                  <p className="text-xs text-muted-foreground/50 mb-4">
                    {timeInfo.range}
                  </p>

                  {/* Frequency bar */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-muted-foreground/40">
                        Frequency
                      </span>
                      <span className="text-[10px]" style={{ color: pattern.color }}>
                        {pattern.frequency}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#2A2A3A] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: patternLearned ? `${pattern.frequency}%` : '0%',
                          backgroundColor: pattern.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="pt-3 border-t border-[#2A2A3A]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-muted-foreground/40">
                          Energy Level
                        </span>
                        <span className="text-[10px] text-muted-foreground/70">
                          {pattern.energyLevel}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#2A2A3A] overflow-hidden mb-3">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#7CB9A8] to-[#D4A574]"
                          style={{ width: `${pattern.energyLevel}%` }}
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <VibeIcon
                          className="w-3.5 h-3.5"
                          style={{ color: vibeInfo.color }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: vibeInfo.color }}
                        >
                          {vibeInfo.label} vibe
                        </span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
