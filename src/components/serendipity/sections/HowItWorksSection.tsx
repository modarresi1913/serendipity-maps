'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Footprints,
  MapPin,
  Eye,
  Gift,
  Clock,
  Shield,
} from 'lucide-react';

const steps = [
  {
    icon: Footprints,
    title: 'Your Invisible Fingerprint',
    subtitle: 'No profiles. No photos.',
    description:
      'The app quietly learns your daily rhythms — the coffee shop you visit at 8 AM, the trail you run on Saturdays, the bookstore where you lose track of time. It builds a behavioral fingerprint: your timing, your energy, your preferred vibe. All on-device. All private.',
    color: '#D4A574',
    bgGlow: 'rgba(212, 165, 116, 0.08)',
  },
  {
    icon: MapPin,
    title: 'The Gentle Overlap',
    subtitle: 'Micro-nudges, not matches.',
    description:
      'The AI finds serendipity windows — moments when someone with compatible patterns naturally crosses your path. It whispers a suggestion: "Try Cafe X tomorrow at 8:15 instead of your usual 8:00." You think you discovered something new. You don\'t know the AI orchestrated it.',
    color: '#7CB9A8',
    bgGlow: 'rgba(124, 185, 168, 0.08)',
  },
  {
    icon: Eye,
    title: 'The Ambient Signal',
    subtitle: 'No names. No photos. Just presence.',
    description:
      'When both of you are in the same space, a soft glow appears on your lock screen. A gentle vibration on your wrist. It means: "Someone compatible is within 20 meters. Look around." You notice each other naturally — same running shoes, same book — and conversation begins.',
    color: '#B8A9C9',
    bgGlow: 'rgba(184, 169, 201, 0.08)',
  },
  {
    icon: Gift,
    title: 'The Serendipity Card',
    subtitle: 'A souvenir of coincidence.',
    description:
      'After you meet, the app reveals a beautiful card: how many times your paths almost crossed, what patterns you share, a coincidence score. Only then can you connect digitally — as a memory of a real moment, not a prerequisite for one.',
    color: '#8FB8DE',
    bgGlow: 'rgba(143, 184, 222, 0.08)',
  },
  {
    icon: Clock,
    title: 'Temporal Friendship Layers',
    subtitle: 'Every connection has a natural lifespan.',
    description:
      '"A coffee friend for two weeks while I\'m in Tokyo." "A running partner for summer." "A deep conversation partner — no commitment." The AI respects these boundaries and orchestrates encounters that fit the season of your life.',
    color: '#C9A9B8',
    bgGlow: 'rgba(201, 169, 184, 0.08)',
  },
  {
    icon: Shield,
    title: 'Your Invisible Shield',
    subtitle: 'Ghost Mode. Selective Visibility. On-device.',
    description:
      'Turn on Ghost Mode and the AI keeps learning but never orchestrates. Block specific neighborhoods or times — never near my workplace. All data stays on your device. The server only knows anonymized vectors, not who you are.',
    color: '#DEB887',
    bgGlow: 'rgba(222, 184, 135, 0.08)',
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="relative py-32 px-6" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#7CB9A8]/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#B8A9C9]/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#7CB9A8] text-sm font-medium tracking-widest uppercase mb-4">
            The experience
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">
            How coincidence <span className="text-gradient-serendipity">unfolds</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Six invisible steps. No effort required. You just live your life, and the
            city starts feeling a little more connected.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Step navigation */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => setActiveStep(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left whitespace-nowrap transition-all duration-300 min-w-fit
                    ${
                      activeStep === i
                        ? 'glass border-l-2'
                        : 'hover:bg-[#1A1A25]/50'
                    }`}
                  style={{
                    borderLeftColor:
                      activeStep === i ? step.color : 'transparent',
                  }}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      activeStep === i ? 'glow-ring' : ''
                    }`}
                    style={{
                      backgroundColor:
                        activeStep === i
                          ? `${step.color}20`
                          : '#1A1A25',
                    }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{
                        color:
                          activeStep === i ? step.color : '#8A8A9A',
                      }}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      activeStep === i
                        ? 'text-foreground'
                        : 'text-muted-foreground/60'
                    }`}
                  >
                    {step.title}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Step detail */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div
              className="glass rounded-2xl p-8 sm:p-10 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #12121A 0%, ${steps[activeStep].bgGlow} 100%)`,
              }}
            >
              {/* Step number */}
              <div
                className="absolute top-6 right-8 text-7xl font-extralight opacity-5"
                style={{ color: steps[activeStep].color }}
              >
                {String(activeStep + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 glow-ring"
                  style={{
                    backgroundColor: `${steps[activeStep].color}15`,
                  }}
                >
                  {(() => {
                    const Icon = steps[activeStep].icon;
                    return (
                      <Icon
                        className="w-7 h-7"
                        style={{ color: steps[activeStep].color }}
                      />
                    );
                  })()}
                </div>

                {/* Title */}
                <h3
                  className="text-2xl sm:text-3xl font-light mb-2"
                  style={{ color: steps[activeStep].color }}
                >
                  {steps[activeStep].title}
                </h3>

                {/* Subtitle */}
                <p className="text-muted-foreground/60 text-sm mb-6">
                  {steps[activeStep].subtitle}
                </p>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed text-base">
                  {steps[activeStep].description}
                </p>

                {/* Visual indicator */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex-1 h-1 rounded-full bg-[#2A2A3A] overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: steps[activeStep].color }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground/40">
                    {activeStep + 1} / {steps.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
