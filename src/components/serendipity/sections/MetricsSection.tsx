'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const metrics = [
  {
    label: 'Serendipity Moments',
    subtitle: 'per month',
    value: '4.2',
    unit: 'moments',
    description: 'The average user experiences 4.2 meaningful spatial coincidences per month.',
    color: '#D4A574',
  },
  {
    label: 'In-Person Conversation',
    subtitle: 'avg. length',
    value: '23',
    unit: 'min',
    description: 'Conversations that start from serendipity last an average of 23 minutes — longer than most first dates.',
    color: '#7CB9A8',
  },
  {
    label: 'Friendship Longevity',
    subtitle: 'still connected after 6 months',
    value: '67',
    unit: '%',
    description: 'Two-thirds of connections made through serendipity develop into lasting friendships.',
    color: '#B8A9C9',
  },
  {
    label: 'Anxiety Reduction',
    subtitle: 'users report less social anxiety',
    value: '89',
    unit: '%',
    description: 'Because encounters feel accidental, users report dramatically reduced approach anxiety.',
    color: '#8FB8DE',
  },
];

export default function MetricsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-32 px-6" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#D4A574]/2 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-[#B8A9C9]/2 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#8FB8DE] text-sm font-medium tracking-widest uppercase mb-4">
            Redefining Success
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">
            Not <span className="line-through text-muted-foreground/30">matches</span>.
            {' '}<span className="text-gradient-serendipity">Moments</span>.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We measure what matters: real-world encounters, genuine conversations,
            and friendships that endure — not screen time and swipe counts.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass rounded-2xl p-6 text-center group hover:border-opacity-50 transition-all duration-300"
            >
              <p className="text-xs text-muted-foreground/40 mb-4">{metric.label}</p>
              <div className="mb-1">
                <motion.span
                  className="text-4xl font-extralight"
                  style={{ color: metric.color }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                >
                  {metric.value}
                </motion.span>
                <span className="text-sm text-muted-foreground/40 ml-1">
                  {metric.unit}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground/30 mb-4">
                {metric.subtitle}
              </p>
              <p className="text-xs text-muted-foreground/50 leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
