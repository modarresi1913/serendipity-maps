'use client';

import HeroSection from '@/components/serendipity/sections/HeroSection';
import PhilosophySection from '@/components/serendipity/sections/PhilosophySection';
import HowItWorksSection from '@/components/serendipity/sections/HowItWorksSection';
import BehavioralFingerprintSection from '@/components/serendipity/sections/BehavioralFingerprintSection';
import SerendipityWindowsSection from '@/components/serendipity/sections/SerendipityWindowsSection';
import EncounterSignalSection from '@/components/serendipity/sections/EncounterSignalSection';
import SerendipityCardSection from '@/components/serendipity/sections/SerendipityCardSection';
import TemporalLayersSection from '@/components/serendipity/sections/TemporalLayersSection';
import ExitVelocitySection from '@/components/serendipity/sections/ExitVelocitySection';
import PrivacySection from '@/components/serendipity/sections/PrivacySection';
import MetricsSection from '@/components/serendipity/sections/MetricsSection';
import FooterSection from '@/components/serendipity/sections/FooterSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] noise-overlay relative overflow-x-hidden">
      <HeroSection />
      <PhilosophySection />
      <HowItWorksSection />
      <BehavioralFingerprintSection />
      <SerendipityWindowsSection />
      <EncounterSignalSection />
      <SerendipityCardSection />
      <TemporalLayersSection />
      <ExitVelocitySection />
      <PrivacySection />
      <MetricsSection />
      <FooterSection />
    </main>
  );
}
