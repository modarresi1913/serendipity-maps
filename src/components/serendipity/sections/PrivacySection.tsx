'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import {
  Ghost,
  EyeOff,
  MapPinOff,
  Smartphone,
  Shield,
  Lock,
} from 'lucide-react';

export default function PrivacySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { privacySettings, setPrivacySettings } = useAppStore();
  const [newBlockedZone, setNewBlockedZone] = useState('');

  const toggleSetting = (key: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key],
    });
  };

  const addBlockedZone = () => {
    if (newBlockedZone.trim() && !privacySettings.blockedZones.includes(newBlockedZone.trim())) {
      setPrivacySettings({
        ...privacySettings,
        blockedZones: [...privacySettings.blockedZones, newBlockedZone.trim()],
      });
      setNewBlockedZone('');
    }
  };

  const removeBlockedZone = (zone: string) => {
    setPrivacySettings({
      ...privacySettings,
      blockedZones: privacySettings.blockedZones.filter((z) => z !== zone),
    });
  };

  const privacyFeatures = [
    {
      icon: Ghost,
      title: 'Ghost Mode',
      description:
        'The AI keeps learning your patterns but never orchestrates encounters. You are completely invisible to others.',
      toggleKey: 'ghostMode' as const,
      color: '#B8A9C9',
    },
    {
      icon: EyeOff,
      title: 'Selective Visibility',
      description:
        'Choose specific neighborhoods or times where you want to remain invisible.',
      toggleKey: 'selectiveVisibility' as const,
      color: '#D4A574',
    },
    {
      icon: Smartphone,
      title: 'On-Device Processing',
      description:
        'Your raw location data never leaves your phone. The server only receives anonymized behavioral vectors — no identities, no coordinates.',
      toggleKey: 'dataOnDevice' as const,
      color: '#7CB9A8',
    },
  ];

  return (
    <section id="privacy" className="relative py-32 px-6" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#B8A9C9]/2 rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#B8A9C9] text-sm font-medium tracking-widest uppercase mb-4">
            Module 5
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-6">
            Your Invisible <span className="text-gradient-aurora">Shield</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Privacy isn&apos;t a feature — it&apos;s the foundation. Every design
            decision starts with: how do we protect the user?
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* Privacy toggles */}
          <div className="space-y-4">
            {privacyFeatures.map((feature, i) => {
              const Icon = feature.icon;
              const isEnabled = privacySettings[feature.toggleKey];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="glass rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${feature.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: feature.color }} />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-muted-foreground/60 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Toggle switch */}
                    <button
                      onClick={() => toggleSetting(feature.toggleKey)}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-300 shrink-0 mt-1 ${
                        isEnabled ? '' : 'bg-[#2A2A3A]'
                      }`}
                      style={{
                        backgroundColor: isEnabled ? feature.color : undefined,
                      }}
                      aria-label={`Toggle ${feature.title}`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                          isEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Blocked zones panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass rounded-2xl p-6 h-fit"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPinOff className="w-4 h-4 text-[#C9A9B8]" />
              <h4 className="text-sm font-medium">Invisible Zones</h4>
            </div>

            <p className="text-xs text-muted-foreground/50 mb-4">
              Places where you&apos;ll never appear. The AI still learns but
              never orchestrates encounters here.
            </p>

            {/* Add zone */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newBlockedZone}
                onChange={(e) => setNewBlockedZone(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addBlockedZone()}
                placeholder="e.g., Near my office"
                className="flex-1 bg-[#1A1A25] border border-[#2A2A3A] rounded-lg px-3 py-2 text-xs text-foreground
                  placeholder:text-muted-foreground/30 focus:outline-none focus:border-[#C9A9B8]/30 transition-colors"
              />
              <button
                onClick={addBlockedZone}
                className="px-3 py-2 rounded-lg bg-[#C9A9B8]/10 text-[#C9A9B8] text-xs font-medium
                  hover:bg-[#C9A9B8]/20 transition-colors"
              >
                Add
              </button>
            </div>

            {/* Zone list */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {privacySettings.blockedZones.map((zone) => (
                <div
                  key={zone}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#1A1A25]/50"
                >
                  <span className="text-xs text-muted-foreground/70">{zone}</span>
                  <button
                    onClick={() => removeBlockedZone(zone)}
                    className="text-muted-foreground/30 hover:text-[#E85D5D] transition-colors text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {privacySettings.blockedZones.length === 0 && (
                <p className="text-[10px] text-muted-foreground/30 text-center py-4">
                  No invisible zones yet
                </p>
              )}
            </div>

            {/* Differential privacy badge */}
            <div className="mt-6 pt-4 border-t border-[#2A2A3A]">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-3.5 h-3.5 text-[#7CB9A8]" />
                <Lock className="w-3.5 h-3.5 text-[#7CB9A8]" />
                <span className="text-[10px] text-[#7CB9A8] font-medium">
                  Differential Privacy
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground/40 leading-relaxed">
                Your behavioral vectors are encrypted with differential privacy
                guarantees. Even if the server is compromised, individual
                patterns cannot be reverse-engineered.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}