'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { MapPin, Clock, ArrowRight, Sparkles, Navigation } from 'lucide-react';

interface NearMissPath {
  user1X: number;
  user1Y: number;
  user2X: number;
  user2Y: number;
 gap: number;
}

export default function SerendipityWindowsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [activeWindow, setActiveWindow] = useState(0);
  const [showNudge, setShowNudge] = useState(false);

  // Near-miss path animation on canvas
  const drawNearMiss = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    let t = 0;

    // Generate two paths that nearly intersect
    const path1Points: { x: number; y: number }[] = [];
    const path2Points: { x: number; y: number }[] = [];
    const gap = 15 + Math.sin(t) * 5; // The near-miss gap

    for (let i = 0; i <= 50; i++) {
      const frac = i / 50;
      path1Points.push({
        x: w * 0.1 + frac * w * 0.35,
        y: h * 0.3 + Math.sin(frac * Math.PI * 2) * h * 0.15,
      });
      path2Points.push({
        x: w * 0.55 + frac * w * 0.35,
        y: h * 0.7 - Math.sin(frac * Math.PI * 2) * h * 0.15,
      });
    }

    const animate = () => {
      t += 0.005;
      ctx.clearRect(0, 0, w, h);

      const currentGap = 15 + Math.sin(t) * 8;

      // Draw paths
      const drawAnimatedPath = (
        points: { x: number; y: number }[],
        color: string,
        glowColor: string
      ) => {
        ctx.beginPath();
        points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 6]);
        ctx.lineDashOffset = -t * 20;
        ctx.stroke();
        ctx.setLineDash([]);
      };

      drawAnimatedPath(path1Points, 'rgba(212, 165, 116, 0.4)', 'rgba(212, 165, 116, 0.2)');
      drawAnimatedPath(path2Points, 'rgba(124, 185, 168, 0.4)', 'rgba(124, 185, 168, 0.2)');

      // Draw near-miss point (center of canvas)
      const cx = w * 0.5;
      const cy = h * 0.5;

      // Pulsing gap indicator
      const pulseScale = 1 + Math.sin(t * 3) * 0.2;
      const gapRadius = currentGap * pulseScale;

      // Gap zone
      ctx.beginPath();
      ctx.arc(cx, cy, gapRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(184, 169, 201, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // "Almost" text
      ctx.font = '11px var(--font-geist-sans)';
      ctx.fillStyle = 'rgba(184, 169, 201, 0.6)';
      ctx.textAlign = 'center';
      ctx.fillText(`${Math.round(currentGap)}m apart`, cx, cy + gapRadius + 18);

      // Two dots representing the two users
      const dot1X = cx - currentGap / 2;
        const dot1Y = cy;
      const dot2X = cx + currentGap / 2;
      const dot2Y = cy;

      // Glow for dots
      const grad1 = ctx.createRadialGradient(dot1X, dot1Y, 0, dot1X, dot1Y, 12);
      grad1.addColorStop(0, 'rgba(212, 165, 116, 0.5)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(dot1X - 12, dot1Y - 12, 24, 24);

      const grad2 = ctx.createRadialGradient(dot2X, dot2Y, 0, dot2X, dot2Y, 12);
      grad2.addColorStop(0, 'rgba(124, 185, 168, 0.5)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(dot2X - 12, dot2Y - 12, 24, 24);

      // Dots
      ctx.beginPath();
      ctx.arc(dot1X, dot1Y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#D4A574';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(dot2X, dot2Y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#7CB9A8';
      ctx.fill();

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    if (isInView) {
      const cleanup = drawNearMiss();
      return cleanup;
    }
  }, [isInView, drawNearMiss]);

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
          {/* Left: Near-miss visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <Navigation className="w-4 h-4 text-[#B8A9C9]" />
              <span className="text-xs text-muted-foreground/60">
                Near-miss analysis — live
              </span>
            </div>
            <div className="relative h-64 sm:h-72">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <p className="text-xs text-muted-foreground/40 mt-4 text-center">
              Two paths that nearly crossed — the gap is closing
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
