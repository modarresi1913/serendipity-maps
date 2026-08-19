'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Activity, Heart, Eye } from 'lucide-react';

export default function EncounterSignalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [signalActive, setSignalActive] = useState(false);
  const [signalPhase, setSignalPhase] = useState(0);
  const [distance, setDistance] = useState(45);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setSignalActive(true), 1500);
    return () => clearTimeout(timer);
  }, [isInView]);

  // Simulate distance decreasing
  useEffect(() => {
    if (!signalActive) return;
    const timer = setInterval(() => {
      setDistance((prev) => {
        if (prev <= 8) {
          clearInterval(timer);
          setSignalPhase(2);
          return 8;
        }
        if (prev <= 20) setSignalPhase(1);
        return prev - 2;
      });
    }, 300);
    return () => clearInterval(timer);
  }, [signalActive]);

  const getSignalColor = () => {
    if (distance > 30) return '#B8A9C9';
    if (distance > 15) return '#D4A574';
    return '#7CB9A8';
  };

  return (
    <section id="encounter-signal" className="relative py-32 px-6" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B8A9C9]/3 rounded-full blur-[180px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#B8A9C9] text-sm font-medium tracking-widest uppercase mb-4">
            Module 3
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">
            The Ambient <span className="text-gradient-aurora">Signal</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            No names. No photos. Just a gentle awareness that someone compatible is
            nearby. The signal fades as they move away. A moment, not a commitment.
          </p>
        </motion.div>

        {/* Phone mockup */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Phone frame */}
            <div className="relative w-72 sm:w-80 h-[580px] sm:h-[620px] rounded-[3rem] border-2 border-[#2A2A3A] bg-[#0A0A0F] overflow-hidden shadow-2xl">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0A0A0F] rounded-b-2xl z-20" />

              {/* Screen content */}
              <div className="absolute inset-2 rounded-[2.5rem] overflow-hidden">
                {/* Lock screen bg */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F18] to-[#0A0A0F]" />

                {/* Time */}
                <div className="relative z-10 pt-14 text-center">
                  <p className="text-5xl font-extralight text-foreground/80 tracking-tight">
                    8:17
                  </p>
                  <p className="text-xs text-muted-foreground/40 mt-1">
                    Tuesday, August 20
                  </p>
                </div>

                {/* Signal area */}
                <div className="relative z-10 flex-1 flex items-center justify-center px-8 mt-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      signalActive
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{ duration: 1 }}
                    className="text-center"
                  >
                    {/* Pulsing rings */}
                    <div className="relative w-40 h-40 mx-auto mb-6">
                      {[1, 2, 3].map((ring) => (
                        <motion.div
                          key={ring}
                          className="absolute inset-0 rounded-full border"
                          animate={
                            signalActive
                              ? {
                                  scale: [1, 1.3 + ring * 0.2],
                                  opacity: [0.4, 0],
                                }
                              : { scale: 1, opacity: 0 }
                          }
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: ring * 0.5,
                            ease: 'easeOut',
                          }}
                          style={{
                            borderColor: `${getSignalColor()}30`,
                          }}
                        />
                      ))}

                      {/* Core glow */}
                      <motion.div
                        className="absolute inset-8 rounded-full"
                        animate={
                          signalActive
                            ? {
                                boxShadow: `0 0 ${30 + distance}px ${getSignalColor()}40, 0 0 ${60 + distance}px ${getSignalColor()}15`,
                              }
                            : { boxShadow: 'none' }
                        }
                        transition={{ duration: 0.5 }}
                        style={{
                          background: `radial-gradient(circle, ${getSignalColor()}15 0%, transparent 70%)`,
                        }}
                      />

                      {/* Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {signalPhase === 0 && (
                          <Eye
                            className="w-10 h-10"
                            style={{ color: getSignalColor() }}
                          />
                        )}
                        {signalPhase === 1 && (
                          <Activity
                            className="w-10 h-10"
                            style={{ color: getSignalColor() }}
                          />
                        )}
                        {signalPhase === 2 && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Heart
                              className="w-10 h-10"
                              style={{ color: getSignalColor() }}
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Signal text */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={signalActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <p className="text-sm text-muted-foreground/70 leading-relaxed">
                        A person who loves{' '}
                        <span style={{ color: getSignalColor() }}>
                          trail running
                        </span>{' '}
                        and{' '}
                        <span style={{ color: getSignalColor() }}>
                          quiet mornings
                        </span>{' '}
                        is near you.
                      </p>
                      <p
                        className="text-xs mt-3 font-mono"
                        style={{ color: `${getSignalColor()}80` }}
                      >
                        ~{distance}m away
                      </p>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Bottom hint */}
                <div className="absolute bottom-8 left-0 right-0 text-center z-10">
                  <p className="text-[10px] text-muted-foreground/30">
                    Look around.
                  </p>
                </div>

                {/* Swipe hint */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center z-10">
                  <div className="w-32 h-1 rounded-full bg-foreground/20" />
                </div>
              </div>
            </div>

            {/* Ambient glow around phone */}
            {signalActive && (
              <motion.div
                className="absolute -inset-8 rounded-[4rem] pointer-events-none"
                animate={{
                  boxShadow: `0 0 ${40 + (45 - distance) * 2}px ${getSignalColor()}10, 0 0 ${80 + (45 - distance) * 3}px ${getSignalColor()}05`,
                }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.div>
        </div>

        {/* Legend below phone */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex justify-center gap-6 mt-12"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#B8A9C9]" />
            <span className="text-[10px] text-muted-foreground/50">
              {'Awareness (>30m)'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4A574]" />
            <span className="text-[10px] text-muted-foreground/50">
              Proximity (15-30m)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#7CB9A8]" />
            <span className="text-[10px] text-muted-foreground/50">
              {'Encounter (<15m)'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}