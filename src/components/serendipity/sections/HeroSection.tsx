'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import PathCanvas from '../PathCanvas';

export default function HeroSection() {
  const [showIntersection, setShowIntersection] = useState(false);
  const [intersectionProgress, setIntersectionProgress] = useState(0);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const progressRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const taglines = [
    'Where paths were meant to cross.',
    'The city brought you together.',
    'Coincidence, engineered.',
    'No profiles. No swiping. Just life.',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntersection(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showIntersection) return;

    const animate = () => {
      progressRef.current = Math.min(progressRef.current + 0.008, 1);
      setIntersectionProgress(progressRef.current);
      if (progressRef.current < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [showIntersection]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Canvas */}
      <div className="absolute inset-0 z-0">
        <PathCanvas
          showIntersection={showIntersection}
          intersectionProgress={intersectionProgress}
        />
      </div>

      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4A574]/5 rounded-full blur-[120px] animate-drift" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#B8A9C9]/5 rounded-full blur-[100px] animate-drift" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#7CB9A8]/3 rounded-full blur-[80px] animate-breathe" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full glow-ring">
            <Sparkles className="w-8 h-8 text-[#D4A574]" />
          </div>
        </motion.div>

        {/* App name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight mb-6"
        >
          <span className="text-gradient-serendipity">Serendipity</span>
          <br />
          <span className="text-foreground/70">Maps</span>
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="h-8 mb-10"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-lg sm:text-xl text-muted-foreground font-light tracking-wide"
            >
              {taglines[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-sm sm:text-base text-muted-foreground/60 max-w-xl mx-auto leading-relaxed mb-12"
        >
          Friendship is born from coincidence, not intention. We subtly orchestrate
          spatial overlaps so meaningful encounters happen{' '}
          <em className="text-[#D4A574]/80 not-italic">&ldquo;accidentally.&rdquo;</em>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => {
              document
                .getElementById('how-it-works')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-full bg-[#D4A574] text-[#0A0A0F] font-medium text-sm
              hover:bg-[#E8C8A0] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,165,116,0.3)]
              active:scale-95"
          >
            Discover How It Works
          </button>
          <button
            onClick={() => {
              document
                .getElementById('fingerprint')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-full border border-[#2A2A3A] text-muted-foreground font-medium text-sm
              hover:border-[#D4A574]/50 hover:text-[#D4A574] transition-all duration-300
              active:scale-95"
          >
            See Your Patterns
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
