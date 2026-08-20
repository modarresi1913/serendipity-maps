# Serendipity Maps

> Where paths were meant to cross.

A location-based friendship platform that engineers serendipity instead of intentional matching. No profiles. No swiping. No chat before meeting. AI learns your spatial patterns, orchestrates real-world overlaps via micro-nudges, and reveals a **serendipity card** after in-person encounters.

---

## Philosophy

Traditional social apps treat human connection as a search problem. Serendipity Maps treats it as a **spatial design problem**. Instead of matching people based on declared preferences, it learns behavioral fingerprints from movement patterns, timing habits, and ambient signals — then gently engineers real-world coincidences.

The core belief: the best friendships start with *"You too? I'm always here on Tuesday mornings."*

---

## MVP Modules

| Module | Description |
|--------|-------------|
| **Behavioral Fingerprinting** | AI learns spatial patterns, timing habits, energy levels, and vibe preferences from passive observation |
| **Overlap Engine** | Calculates "serendipity windows" — moments when two compatible people are about to be in the same place |
| **Ambient Signal** | Subtle proximity notifications (lock screen glow, distance simulation) that feel like intuition, not alerts |
| **Serendipity Card** | Post-encounter reveal showing coincidence score, shared patterns, and connection potential |
| **Privacy Controls** | Ghost mode, selective visibility, on-device processing, invisible zones, differential privacy |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + custom glassmorphism design system
- **Animation:** Framer Motion + 12+ custom CSS keyframe animations
- **State:** Zustand
- **Maps:** Leaflet + OpenStreetMap
- **UI Components:** Radix UI primitives via shadcn/ui
- **Database:** Prisma ORM (schema included)

---

## Getting Started

```bash
# Install dependencies
npm install

# Set up database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with dark theme
│   ├── page.tsx            # Main page assembling all sections
│   └── globals.css         # Custom theme, animations, glassmorphism
├── components/
│   └── serendipity/
│       ├── PathCanvas.tsx       # Hero animated canvas (Bezier paths, star field)
│       ├── MapCanvas.tsx        # Interactive Leaflet map
│       └── sections/
│           ├── HeroSection.tsx
│           ├── HowItWorksSection.tsx
│           ├── BehavioralFingerprintSection.tsx
│           ├── SerendipityWindowsSection.tsx
│           ├── EncounterSignalSection.tsx
│           ├── SerendipityCardSection.tsx
│           ├── PhilosophySection.tsx
│           ├── TemporalLayersSection.tsx
│           ├── PrivacySection.tsx
│           ├── ExitVelocitySection.tsx
│           ├── MetricsSection.tsx
│           └── FooterSection.tsx
├── store/
│   └── useAppStore.ts     # Zustand global state
└── lib/
    └── utils.ts            # Utility functions
```

---

## Design System

- **Theme:** Dark ethereal with glassmorphism
- **Palette:** Amber (#D4A574), Aurora (#B8A9C9), Teal (#7CB9A8), Blue (#8FB8DE), Rose (#C9A9B8)
- **Animations:** Float, pulse-glow, drift, path-draw, shimmer, encounter-pulse, breathe, card-reveal, star-twinkle
- **Typography:** Geist Sans + Geist Mono

---

## Key Differentiators vs Traditional Apps

| Feature | Tinder / Bumble | Meetup / Eventbrite | **Serendipity Maps** |
|---------|----------------|---------------------|---------------------|
| Discovery | Swipe-based profiles | Event listings | Spatial pattern overlap |
| Intent | Explicit matching | Interest groups | Implicit, revealed post-encounter |
| Privacy | Public profiles | Public events | On-device, differential privacy |
| Connection | Chat-first | Schedule-first | Meet-first, card-later |
| UX Friction | High (decision fatigue) | Medium (planning required) | Near-zero (ambient) |

---

## Success Metrics (Target)

- **Serendipity Rate:** >40% of nudges result in actual encounters
- **Friendship Conversion:** >25% of encounters lead to lasting connections
- **Privacy Comfort Score:** >4.5/5 user comfort rating
- **Engagement:** >60% weekly active users after 3 months

---

## License

MIT
