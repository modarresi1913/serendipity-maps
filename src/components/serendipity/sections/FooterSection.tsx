'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles } from 'lucide-react';

export default function FooterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer ref={ref} className="relative py-20 px-6 border-t border-[#2A2A3A]/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Tagline */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#D4A574]/60" />
            </div>
            <p className="text-lg sm:text-xl font-light text-gradient-serendipity mb-2">
              Coincidence, engineered.
            </p>
            <p className="text-xs text-muted-foreground/40">
              The city brought you together.
            </p>
          </div>

          {/* Brand */}
          <p className="text-xs text-muted-foreground/20 font-mono tracking-widest uppercase">
            Serendipity Maps
          </p>

          {/* Principles */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-6 mb-8">
            {[
              'No profiles',
              'No swiping',
              'No chat before meeting',
              'On-device privacy',
              'Differential privacy',
            ].map((principle) => (
              <span
                key={principle}
                className="text-[10px] text-muted-foreground/30"
              >
                {principle}
              </span>
            ))}
          </div>

          <div className="h-px w-16 mx-auto bg-[#2A2A3A]/50 mb-6" />

          <p className="text-[10px] text-muted-foreground/15">
            An MVP concept. Built with care for a world that needs more accidental friends.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}