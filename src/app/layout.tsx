import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Serendipity Maps — Where Paths Were Meant to Cross",
  description:
    "A location-based friendship platform that engineers serendipity instead of intentional matching. No profiles. No swiping. AI learns your spatial patterns, orchestrates real-world overlaps, and reveals connections after you naturally cross paths.",
  keywords: [
    "serendipity",
    "friendship app",
    "anti-swipe",
    "location-based social",
    "ambient computing",
    "behavioral fingerprinting",
    "privacy-first",
    "prosocial technology",
    "calm technology",
    "human connection",
    "coincidence engine",
    "spatial design",
    "differential privacy",
    "on-device AI",
    "real-world connection",
    "friendship discovery",
    "ethical tech",
    "human-centered AI",
    "mental health",
    "social isolation solution",
    "loneliness",
    "serendipity engine",
    "proximity detection",
    "zero UI",
    "post-algorithmic social",
  ],
  authors: [{ name: "modarresi1913" }],
  creator: "modarresi1913",
  publisher: "modarresi1913",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/modarresi1913/serendipity-maps",
    siteName: "Serendipity Maps",
    title: "Serendipity Maps — Where Paths Were Meant to Cross",
    description:
      "A location-based friendship platform that engineers serendipity instead of intentional matching. No profiles. No swiping. Just coincidence, designed.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serendipity Maps — Where Paths Were Meant to Cross",
    description:
      "No profiles. No swiping. AI engineers real-world coincidences between compatible people.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="llms.txt" type="text/plain" href="/docs/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareSourceCode",
              name: "Serendipity Maps",
              description:
                "A location-based friendship platform that engineers serendipity instead of intentional matching. No profiles, no swiping. AI learns spatial patterns and orchestrates real-world coincidences.",
              url: "https://github.com/modarresi1913/serendipity-maps",
              codeRepository: "https://github.com/modarresi1913/serendipity-maps",
              programmingLanguage: "TypeScript",
              runtimePlatform: "Next.js 16",
              license: "https://spdx.org/licenses/MIT",
              author: {
                "@type": "Person",
                name: "modarresi1913",
                url: "https://github.com/modarresi1913",
              },
              keywords:
                "serendipity, friendship app, anti-swipe, location-based social, ambient computing, privacy-first, calm technology, human connection, differential privacy",
              applicationCategory: "SocialApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Serendipity Maps?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Serendipity Maps is an open-source location-based friendship platform that uses AI to learn your movement patterns and engineer real-world coincidences with compatible people. Unlike dating apps, it has no profiles, no swiping, and no chat before meeting. It reveals a Serendipity Card after natural in-person encounters.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How is Serendipity Maps different from Tinder or Bumble?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tinder and Bumble require swiping through profiles and explicit matching. Serendipity Maps has no profiles and no swiping. Instead, it passively learns your spatial patterns and engineers real-world coincidences. Connection happens naturally, first. A Serendipity Card reveals compatibility after the fact.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is Serendipity Maps privacy-focused?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. All behavioral fingerprinting happens on-device. Raw location data never leaves your phone. Only differentially-private noisy signals are transmitted. It includes Ghost Mode for full invisibility, Invisible Zones to block detection at specific places, and Selective Visibility to control what pattern dimensions are shared.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What tech stack does Serendipity Maps use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Serendipity Maps is built with Next.js 16, TypeScript 5, Tailwind CSS 4, Framer Motion 12, Zustand 5, Leaflet with OpenStreetMap, Radix UI via shadcn/ui, and Prisma ORM. It features a dark ethereal glassmorphism design system with 12+ custom CSS animations.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
