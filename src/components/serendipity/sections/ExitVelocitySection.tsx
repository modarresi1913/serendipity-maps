'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { DoorOpen, Clock, MapPin, Bus } from 'lucide-react';

const exitPoints = [
  {
    icon: MapPin,
    title: 'Near Transit',
    description:
      'Every suggested venue is within a 3-minute walk of a subway station, bus stop, or ride-share pickup point. You always know you can leave quickly.',
    color: '#8FB8DE',
  },
  {
    icon: Clock,
    title: 'Natural Time Limits',
    description:
      '"This popup gallery closes in 45 minutes." "The coffee shop stops seating at 9." The venue sets the boundary — not you. No awkward "I should go."',
    color: '#D4A574',
  },
  {
    icon: DoorOpen,
    title: 'Built-in Departure Cues',
    description:
      'The app recommends venues with natural endpoints: an event ending, a kitchen closing, a park clearing at dusk. The encounter has a shape, a beginning and an end.',
    color: '#7CB9A8',
  },
  {
    icon: Bus,
    title: 'The Paradox of Easy Exit',
    description:
      'When you know you can leave at any moment, you show up more freely. The easy exit makes you more willing to stay. Serendipity thrives in low-pressure spaces.',
    color: '#B8A9C9',
  },
];

export default function ExitVelocitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-32 px-6" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#8FB8DE]/2 rounded-full blur-[180px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#8FB8DE] text-sm font-medium tracking-widest uppercase mb-4">
            Design Principle
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">
            Easy Exit,{' '}
            <span className="text-gradient-aurora">Deeper Connection</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The best encounters happen when there&apos;s no pressure to stay. Every
            serendipity moment has built-in exit points — so you can show up
            without anxiety.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {exitPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="glass rounded-2xl p-6 group hover:border-opacity-50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${point.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: point.color }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">{point.title}</h4>
                    <p className="text-xs text-muted-foreground/60 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
