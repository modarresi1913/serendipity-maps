<p align="center">
  <br>
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white" alt="Leaflet" />
  <br><br>
  <img width="120" alt="Serendipity Maps" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>">
  <h1 align="center">Serendipity Maps</h1>
  <p align="center"><i>Where paths were meant to cross.</i></p>
  <p align="center">
    <a href="#-the-problem">The Problem</a> ·
    <a href="#-how-it-works">How It Works</a> ·
    <a href="#-architecture">Architecture</a> ·
    <a href="#-getting-started">Getting Started</a> ·
    <a href="#%EF%B8%8F-license">License</a>
  </p>
  <br>
</p>

---

## The Problem

Every social app asks the same question: **"Who do you want to meet?"**

And every time, we lie. We describe who we *think* we want — not who we actually resonate with. Dating apps reduced connection to a swipe. Meetup reduced it to a calendar event. LinkedIn reduced it to a transaction.

But think about your closest friendships. How did they actually start?

> *"You too? I'm always here on Tuesday mornings."*
>
> *"Wait, you also read at this cafe every weekend?"*
>
> *"We've been at this trail head at the same time for months."*

The best connections in your life weren't matched by an algorithm. They were **coincidences that felt like destiny**.

**Serendipity Maps doesn't find people for you. It engineers the conditions where you find each other.**

---

## The Idea

<p align="center">
  <img src="https://img.shields.io/badge/Philosophy-Anti--Matching-F44E6A" alt="Philosophy" />
  <img src="https://img.shields.io/badge/Privacy-First--Class_Citizen-7CB9A8" alt="Privacy" />
  <img src="https://img.shields.io/badge/Friction-Near--Zero-D4A574" alt="Friction" />
</p>

Serendipity Maps is a **location-based friendship platform** that treats human connection as a *spatial design problem*, not a search problem.

### No profiles. No swiping. No chat before meeting.

Instead:

- **AI learns your behavioral fingerprint** — where you go, when you go, how you move, what vibes you gravitate toward — all passively, all on-device.
- **An overlap engine calculates serendipity windows** — those precise moments when two behaviorally compatible people are about to share the same space.
- **An ambient signal system nudges you** — not with a notification, but with a subtle feeling. A screen glow. A proximity hint. Something that feels like intuition.
- **After you naturally cross paths**, a Serendipity Card reveals what you share — a coincidence score, overlapping patterns, connection potential.

You don't choose who to meet. **The city chooses for you.**

---

## How It Works

```
  ┌─────────────────────────────────────────────────────────────┐
  │                                                             │
  │   You walk into a coffee shop on a random Tuesday morning   │
  │                        ·                                    │
  │                        ▼                                    │
  │   ┌─────────────────┐    ┌──────────────────┐              │
  │   │  Behavioral      │───▶│  Overlap Engine   │              │
  │   │  Fingerprint     │    │  detects window   │              │
  │   │  (on-device)     │    │  with someone     │              │
  │   └─────────────────┘    │  compatible       │              │
  │                          └────────┬─────────┘              │
  │                                   │                         │
  │                                   ▼                         │
  │                          ┌──────────────────┐              │
  │                          │  Ambient Signal   │              │
  │                          │  gentle nudge     │              │
  │                          │  (not a ping)     │              │
  │                          └────────┬─────────┘              │
  │                                   │                         │
  │                                   ▼                         │
  │   ┌──────────────────────────────────────────────┐         │
  │   │  You notice someone. They notice you.        │         │
  │   │  A conversation happens. Naturally.           │         │
  │   └──────────────────┬───────────────────────────┘         │
  │                      │                                      │
  │                      ▼                                      │
  │   ┌──────────────────────────────────────────────┐         │
  │   │  Serendipity Card reveals:                   │         │
  │   │  - 87% coincidence score                      │         │
  │   │  - You both come here every Tuesday           │         │
  │   │  - Shared: indie bookstores, morning trails   │         │
  │   │  - This was your 3rd near-miss this month     │         │
  │   └──────────────────────────────────────────────┘         │
  │                                                             │
  └─────────────────────────────────────────────────────────────┘
```

---

## MVP Modules

| # | Module | What It Does |
|---|--------|-------------|
| 1 | **Behavioral Fingerprinting** | AI passively learns your spatial patterns, timing rhythms, energy cycles, and vibe preferences — entirely on-device, zero data leaves your phone |
| 2 | **Overlap Engine** | Calculates real-time "serendipity windows" — the moments when two behaviorally compatible humans are about to share the same physical space |
| 3 | **Ambient Signal** | Subtle proximity hints (screen glow, distance simulation) that feel like intuition, not another notification to dismiss |
| 4 | **Serendipity Card** | Post-encounter reveal: coincidence score, shared behavioral patterns, missed connections history, and connection potential |
| 5 | **Privacy Controls** | Ghost mode, selective visibility, invisible zones (ex: workplace, therapist's office), on-device processing, differential privacy guarantees |

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout — dark ethereal theme
│   ├── page.tsx                # Composes all 11 interactive sections
│   └── globals.css             # 12+ keyframe animations, glassmorphism system
│
├── components/
│   └── serendipity/
│       ├── PathCanvas.tsx           # Hero — animated Bezier paths crossing a star field
│       ├── MapCanvas.tsx            # Interactive Leaflet/OSM map with proximity layers
│       └── sections/
│           ├── HeroSection.tsx              # Landing — animated path-crossing canvas
│           ├── HowItWorksSection.tsx         # 6-step interactive walkthrough
│           ├── BehavioralFingerprintSection.tsx  # AI pattern learning visualization
│           ├── SerendipityWindowsSection.tsx      # Real map with near-miss zones
│           ├── EncounterSignalSection.tsx        # Phone mockup, proximity rings
│           ├── SerendipityCardSection.tsx        # Post-encounter card reveal
│           ├── PhilosophySection.tsx             # Comparison vs Tinder/Bumble/Meetup
│           ├── TemporalLayersSection.tsx         # Friendship intent layers
│           ├── PrivacySection.tsx                # Working toggles, zone management
│           ├── ExitVelocitySection.tsx           # 4 design principles
│           ├── MetricsSection.tsx                # Success metric cards
│           └── FooterSection.tsx
│
├── store/
│   └── useAppStore.ts          # Zustand — patterns, windows, encounters, privacy
│
└── lib/
    └── utils.ts                # Shared utilities
```

---

## Why This Is Different

| | Tinder / Bumble | Meetup / Eventbrite | Bumble BFF | Slowly / Penpal | **Serendipity Maps** |
|---|---|---|---|---|---|
| **Discovery** | Swipe profiles | Browse events | Swipe friends | Text-based | Spatial overlap |
| **Intent** | Explicit (dating) | Explicit (interest) | Explicit (friends) | Explicit (letters) | Implicit — revealed after |
| **Privacy** | Public profile | Public RSVP | Public profile | Anonymous | Differential privacy, on-device |
| **Connection** | Chat first | Schedule first | Chat first | Write first | **Meet first, card later** |
| **Friction** | High (decision fatigue) | Medium (planning) | Medium (swiping) | Low (but slow) | **Near-zero (ambient)** |
| **Authenticity** | Low (curated) | Medium | Low (curated) | Medium | **High (unscripted)** |

---

## Tech Stack

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
  <a href="https://zustand.docs.pmnd.rs/"><img src="https://img.shields.io/badge/Zustand-5-orange?style=for-the-badge" alt="Zustand" /></a>
  <a href="https://leafletjs.com/"><img src="https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet" /></a>
  <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" /></a>
</p>

### Design System

| Element | Value |
|---------|-------|
| **Theme** | Dark ethereal with glassmorphism |
| **Amber** | `#D4A574` — warmth, sunrise, possibility |
| **Aurora** | `#B8A9C9` — mystery, twilight, wonder |
| **Teal** | `#7CB9A8` — calm, flow, trust |
| **Blue** | `#8FB8DE` — depth, distance, longing |
| **Rose** | `#C9A9B8` — softness, humanity, connection |
| **Animations** | Float, pulse-glow, drift, path-draw, shimmer, encounter-pulse, breathe, card-reveal, star-twinkle, gentle-spin |
| **Typography** | Geist Sans + Geist Mono |

---

## Getting Started

```bash
# Clone the repo
$ git clone https://github.com/modarresi1913/serendipity-maps.git
$ cd serendipity-maps

# Install dependencies
$ npm install

# Set up the database
$ npx prisma generate
$ npx prisma db push

# Start the dev server
$ npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** and scroll through the experience.

---

## The 4 Design Principles

**1. Zero-Choice Interface**
> The user never picks, swipes, or selects. The system presents zero decisions. Connection emerges from spatial coincidence, not choice paralysis.

**2. Invisibility by Default**
> The product should feel like it's not there. No feed, no inbox, no dashboard. Just life — slightly more magical.

**3. Post-Hoc Revelation**
> Information about compatibility is revealed *after* an encounter, not before. This prevents confirmation bias and preserves the authenticity of the moment.

**4. Graceful Decay**
> Every nudge has a natural expiration. Unacted signals dissolve. The system never pressures — it suggests, then steps back.

---

## Target Metrics

| Metric | Target | Why It Matters |
|--------|--------|---------------|
| **Serendipity Rate** | >40% of nudges lead to encounters | Measures if overlaps feel natural, not forced |
| **Friendship Conversion** | >25% of encounters become lasting connections | The ultimate proof of behavioral compatibility |
| **Privacy Comfort Score** | >4.5 / 5.0 | If users don't feel safe, nothing else matters |
| **Weekly Retention** | >60% after 3 months | Ambient products live or die by quiet consistency |

---

## Privacy-First Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    YOUR PHONE ONLY                       │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Behavioral   │  │ Spatial      │  │ Differential │  │
│  │ Fingerprint  │  │ Patterns     │  │ Privacy Layer│  │
│  │ (encrypted)  │  │ (on-device)  │  │ (epsilon ≤ 1)│  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                  │          │
│         └────────────────┬┘──────────────────┘          │
│                          │                              │
│                   ┌──────▼──────┐                       │
│                   │ Only        │                       │
│                   │ anonymous,  │                       │
│                   │ noisy       │                       │
│                   │ signals     │                       │
│                   │ leave here  │                       │
│                   └──────┬──────┘                       │
└──────────────────────────┼──────────────────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  Overlap Engine │
                  │  (server-side)  │
                  │  sees only      │
                  │  fuzzy tokens   │
                  └─────────────────┘
```

- **Ghost Mode** — Full invisibility. You vanish from all calculations.
- **Invisible Zones** — Add places where you never want to be detected (workplace, therapist's office, home).
- **Selective Visibility** — Control which pattern dimensions are shared (timing yes, location no).
- **On-Device Processing** — Raw location data never leaves your device. Only differentially-private signals are transmitted.

---

## Roadmap

- [x] Behavioral Fingerprinting visualization
- [x] Serendipity Windows with interactive map (Leaflet/OSM)
- [x] Ambient Signal phone mockup with proximity animation
- [x] Serendipity Card post-encounter reveal
- [x] Privacy Controls (working toggles, zone management)
- [x] Dark ethereal design system with glassmorphism
- [ ] Real-time overlap calculation backend
- [ ] On-device ML model for pattern extraction
- [ ] Differential privacy implementation
- [ ] Native iOS/Android companion (ambient signal delivery)
- [ ] Serendipity Card sharing and connection flow
- [ ] Multi-city support with pattern transfer

---

## Contributing

This is an open experiment in rethinking how humans connect. Ideas, PRs, and brutal honesty are all welcome.

1. Fork it
2. Create your branch (`git checkout -b feature/your-idea`)
3. Commit your changes (`git commit -m 'Add something serendipitous'`)
4. Push to the branch (`git push origin feature/your-idea`)
5. Open a Pull Request

---

## License

[MIT](LICENSE) — Build something beautiful with it.

---

<p align="center">
  <br>
  <img width="60" alt="✦" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>">
  <br><br>
  <sub>Built with the belief that the best connections are the ones you didn't plan.</sub>
  <br><br>
</p>
