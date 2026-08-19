'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Clock, Coffee, Bike, MessageCircle, ArrowRight } from 'lucide-react';

const intents = [
  {
    id: 'coffee-tokyo',
    icon: Coffee,
    title: 'Coffee friend for 2 weeks',
    context: 'While I\'m in Tokyo',
    description:
      'You\'re visiting a new city for a short time. You don\'t want a deep commitment — just someone to share mornings with. The AI finds a fellow traveler who visits the same cafe district and loves quiet conversation.',
    duration: '14 days',
    color: '#D4A574',
  },
  {
    id: 'running-summer',
    icon: Bike,
    title: 'Running partner for summer',
    context: 'Seasonal companionship',
    description:
      'You want someone who matches your pace and your trails. When autumn comes, the connection naturally fades — no awkward breakup, no guilt. Just a beautiful season of shared sunrise runs.',
    duration: '~90 days',
    color: '#7CB9A8',
  },
  {
    id: 'deep-conversation',
    icon: MessageCircle,
    title: 'Deep conversation partner',
    context: 'No commitment',
    description:
      'You want someone who\'s up for 2 AM conversations about philosophy, art, and the human condition. No schedule, no obligation. Just when the mood strikes and the paths align.',
    duration: 'Open-ended',
    color: '#B8A9C9',
  },
];

export default function TemporalLayersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);

  return (
    <section id="temporal-layers" className="relative py-32 px-6" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C9A9B8]/3 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#C9A9B8] text-sm font-medium tracking-widest uppercase mb-4">
            Friendship Layers
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">
            Every Connection Has a{' '}
            <span className="text-gradient-serendipity">Natural Season</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Not every friendship is meant to last forever. Some are for a season, a
            trip, a morning. Set your intent and the AI respects it.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {intents.map((intent, i) => {
            const Icon = intent.icon;
            const isSelected = selectedIntent === intent.id;

            return (
              <motion.div
                key={intent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                onClick={() =>
                  setSelectedIntent(isSelected ? null : intent.id)
                }
                className={`glass rounded-2xl p-6 cursor-pointer transition-all duration-500 ${
                  isSelected ? 'border-opacity-100' : ''
                }`}
                style={{
                  borderTop: `3px solid ${isSelected ? intent.color : 'transparent'}`,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${intent.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: intent.color }} />
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-foreground/30" />
                    <span className="text-[10px] text-muted-foreground/40">
                      {intent.duration}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-medium mb-1">{intent.title}</h4>
                <p className="text-[10px] text-muted-foreground/40 mb-4">
                  {intent.context}
                </p>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs text-muted-foreground/70 leading-relaxed">
                      {intent.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs" style={{ color: intent.color }}>
                      <ArrowRight className="w-3 h-3" />
                      <span className="font-medium">Set as my intent</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
