'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { X as XIcon } from 'lucide-react';

const comparisons = [
  {
    them: 'Tinder',
    theirWay: 'Profile-first. You judge a photo. Swipe. Hope.',
    ourWay: 'Behavior-first. You live your life. The city connects you.',
  },
  {
    them: 'Bumble',
    theirWay: 'Women message first. Still starts with a photo and a bio.',
    ourWay: 'No messaging before meeting. The real world is the first conversation.',
  },
  {
    them: 'Meetup',
    theirWay: 'Group events. Scheduled. Intentional. Sometimes awkward.',
    ourWay: 'One-on-one spatial collision. Organic. Unplanned. Natural.',
  },
  {
    them: 'Timeleft',
    theirWay: 'Blind dinner. A special event. Not part of daily life.',
    ourWay: 'Woven into your routine. The coffee shop. The park. The trail.',
  },
];

export default function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[#D4A574] text-sm font-medium tracking-widest uppercase mb-4">
            A different philosophy
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">
            Not another{' '}
            <span className="text-gradient-aurora line-through decoration-muted-foreground/30">
              dating app
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every existing platform forces intention: create a profile, browse others,
            make a choice. Serendipity Maps removes intention entirely. You don&apos;t
            choose — life chooses for you.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {comparisons.map((item, i) => (
            <motion.div
              key={item.them}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="glass rounded-2xl p-6 sm:p-8 group hover:border-[#D4A574]/20 transition-all duration-500"
            >
              <div className="grid sm:grid-cols-[120px_1fr_1fr] gap-4 sm:gap-8 items-start">
                {/* App name */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2A2A3A] flex items-center justify-center">
                    <XIcon className="w-4 h-4 text-muted-foreground/50" />
                  </div>
                  <span className="text-muted-foreground/60 font-medium">{item.them}</span>
                </div>

                {/* Their way */}
                <div>
                  <p className="text-sm text-muted-foreground/40 mb-1">Forces you to</p>
                  <p className="text-muted-foreground/70 text-sm leading-relaxed">
                    {item.theirWay}
                  </p>
                </div>

                {/* Our way */}
                <div>
                  <p className="text-sm text-[#D4A574]/60 mb-1">We let you</p>
                  <p className="text-[#D4A574]/90 text-sm leading-relaxed font-medium">
                    {item.ourWay}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
