'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Sparkles, Clock, MapPin, Heart, Link2, ChevronRight } from 'lucide-react';

interface CardData {
  coincidenceScore: number;
  nearMissCount: number;
  sharedPatterns: string[];
  closestGap: string;
  location: string;
  timeOfEncounter: string;
  daysOfNearMisses: number;
}

const mockCardData: CardData = {
  coincidenceScore: 94,
  nearMissCount: 12,
  sharedPatterns: [
    'Morning coffee ritual (8:00-8:20 AM)',
    'Trail running on weekends',
    'Preference for quiet spaces',
    'Contemporary fiction reader',
    'Evening park walks after 7 PM',
  ],
  closestGap: '7 meters',
  location: 'Meridian Coffee Co.',
  timeOfEncounter: '8:17 AM, Tuesday',
  daysOfNearMisses: 23,
};

export default function SerendipityCardSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [showCard, setShowCard] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);

  const data = mockCardData;

  return (
    <section id="serendipity-card" className="relative py-32 px-6" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-[#D4A574]/3 rounded-full blur-[160px]" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#B8A9C9]/3 rounded-full blur-[130px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#D4A574] text-sm font-medium tracking-widest uppercase mb-4">
            Module 4
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">
            The Serendipity <span className="text-gradient-serendipity">Card</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            After you meet in person, the app reveals what brought you together. A
            beautiful souvenir of coincidence — a digital memory of a real moment.
          </p>
        </motion.div>

        {/* Trigger button */}
        <div className="flex justify-center mb-12">
          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            onClick={() => {
              setShowCard(true);
              setTimeout(() => setCardRevealed(true), 300);
            }}
            disabled={showCard}
            className="flex items-center gap-2 px-6 py-3 rounded-full glass text-sm text-muted-foreground
              hover:border-[#D4A574]/30 hover:text-[#D4A574] transition-all duration-300 disabled:opacity-40"
          >
            <Sparkles className="w-4 h-4" />
            Reveal your serendipity card
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* The Card */}
        <AnimatePresence>
          {showCard && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={
                cardRevealed
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.9, y: 30 }
              }
              transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
              className="max-w-lg mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden">
                {/* Card background */}
                <div className="relative bg-gradient-to-br from-[#14141E] via-[#18182A] to-[#14141E] p-8 border border-[#2A2A3A]/50">
                  {/* Decorative corner elements */}
                  <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-[#D4A574]/20 rounded-tl-lg" />
                  <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-[#7CB9A8]/20 rounded-br-lg" />

                  {/* Stars background */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-0.5 rounded-full bg-foreground/20 animate-star-twinkle"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4A574]/50" />\n                        <Sparkles className="w-4 h-4 text-[#D4A574]" />
                        <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4A574]/50" />\n                      </div>
                      <p className="text-xs text-muted-foreground/50 uppercase tracking-[0.3em] mb-1">
                        Your paths were meant to cross
                      </p>
                      <p className="text-xs text-muted-foreground/30">
                        {data.location} &middot; {data.timeOfEncounter}
                      </p>
                    </div>

                    {/* Coincidence Score — centerpiece */}
                    <div className="text-center mb-8">
                      <div className="relative inline-flex items-center justify-center">
                        {/* Outer ring */}
                        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                          <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#2A2A3A"
                            strokeWidth="2"
                          />
                          <motion.circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="url(#scoreGradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 54}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                            animate={{
                              strokeDashoffset:
                                2 * Math.PI * 54 * (1 - data.coincidenceScore / 100),
                            }}
                            transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
                          />
                          <defs>
                            <linearGradient
                              id="scoreGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#D4A574" />
                              <stop offset="100%" stopColor="#B8A9C9" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {/* Score number */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.span
                            className="text-3xl font-extralight text-gradient-serendipity"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                          >
                            {data.coincidenceScore}
                          </motion.span>
                          <span className="text-[9px] text-muted-foreground/40 uppercase tracking-widest">
                            Coincidence
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center">
                        <motion.p
                          className="text-xl font-light text-[#D4A574]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          {data.nearMissCount}
                        </motion.p>
                        <p className="text-[9px] text-muted-foreground/40 mt-0.5">
                          Near Misses
                        </p>
                      </div>
                      <div className="text-center">
                        <motion.p
                          className="text-xl font-light text-[#7CB9A8]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          {data.daysOfNearMisses}
                        </motion.p>
                        <p className="text-[9px] text-muted-foreground/40 mt-0.5">
                          Days Almost
                        </p>
                      </div>
                      <div className="text-center">
                        <motion.p
                          className="text-xl font-light text-[#B8A9C9]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.4 }}
                        >
                          {data.closestGap}
                        </motion.p>
                        <p className="text-[9px] text-muted-foreground/40 mt-0.5">
                          Closest Gap
                        </p>
                      </div>
                    </div>

                    {/* Shared patterns */}
                    <div className="mb-8">
                      <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest mb-3 text-center">
                        What the city noticed
                      </p>
                      <div className="space-y-2">
                        {data.sharedPatterns.map((pattern, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 + i * 0.15 }}
                            className="flex items-center gap-2.5"
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{
                                backgroundColor:
                                  ['#D4A574', '#7CB9A8', '#B8A9C9', '#8FB8DE', '#C9A9B8'][i],
                              }}
                            />
                            <span className="text-xs text-muted-foreground/70">
                              {pattern}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.5 }}
                      className="text-center pt-6 border-t border-[#2A2A3A]/50"
                    >
                      <p className="text-xs text-muted-foreground/50 italic leading-relaxed">
                        &ldquo;You both ran the same trail 12 times last month, 30 minutes
                        apart. The city was waiting for you to find each other.&rdquo;
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Action buttons below card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 }}
                className="flex justify-center gap-3 mt-6"
              >
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4A574] text-[#0A0A0F] text-sm font-medium
                  hover:bg-[#E8C8A0] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,165,116,0.3)]">
                  <Link2 className="w-3.5 h-3.5" />
                  Connect
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm text-muted-foreground
                  hover:border-[#B8A9C9]/30 transition-all duration-300">
                  <Heart className="w-3.5 h-3.5" />
                  Save as Memory
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}