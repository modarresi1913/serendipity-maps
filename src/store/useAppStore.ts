import { create } from 'zustand';

interface LocationPoint {
  lat: number;
  lng: number;
  time: string;
  label: string;
}

interface BehavioralPattern {
  id: string;
  label: string;
  icon: string;
  frequency: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  energyLevel: number;
  vibe: 'quiet' | 'lively' | 'balanced';
  color: string;
}

interface SerendipityWindow {
  id: string;
  location: string;
  time: string;
  dayOfWeek: string;
  nearMissCount: number;
  description: string;
  nudge: string;
}

interface Encounter {
  id: string;
  description: string;
  distance: string;
  timestamp: string;
  vibe: string;
  connected: boolean;
}

interface PrivacySettings {
  ghostMode: boolean;
  selectiveVisibility: boolean;
  blockedZones: string[];
  blockedTimes: string[];
  dataOnDevice: boolean;
}

interface AppState {
  // UI State
  activeSection: string;
  setActiveSection: (s: string) => void;

  // Behavioral Patterns
  patterns: BehavioralPattern[];
  setPatterns: (p: BehavioralPattern[]) => void;
  patternLearned: boolean;
  setPatternLearned: (v: boolean) => void;

  // Serendipity Windows
  serendipityWindows: SerendipityWindow[];
  setSerendipityWindows: (w: SerendipityWindow[]) => void;

  // Encounters
  encounters: Encounter[];
  setEncounters: (e: Encounter[]) => void;
  activeEncounter: Encounter | null;
  setActiveEncounter: (e: Encounter | null) => void;

  // Serendipity Card
  showSerendipityCard: boolean;
  setShowSerendipityCard: (v: boolean) => void;
  selectedEncounter: Encounter | null;
  setSelectedEncounter: (e: Encounter | null) => void;

  // Privacy
  privacySettings: PrivacySettings;
  setPrivacySettings: (s: PrivacySettings) => void;

  // Temporal Layers
  friendshipIntent: string;
  setFriendshipIntent: (i: string) => void;

  // Demo animation
  isAnimating: boolean;
  setIsAnimating: (v: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeSection: 'hero',
  setActiveSection: (s) => set({ activeSection: s }),

  patterns: [
    { id: '1', label: 'Morning Coffee Ritual', icon: 'coffee', frequency: 92, timeOfDay: 'morning', energyLevel: 35, vibe: 'quiet', color: '#D4A574' },
    { id: '2', label: 'Trail Running', icon: 'running', frequency: 78, timeOfDay: 'morning', energyLevel: 85, vibe: 'lively', color: '#7CB9A8' },
    { id: '3', label: 'Bookstore Browsing', icon: 'book', frequency: 65, timeOfDay: 'afternoon', energyLevel: 25, vibe: 'quiet', color: '#B8A9C9' },
    { id: '4', label: 'Evening Park Walk', icon: 'trees', frequency: 88, timeOfDay: 'evening', energyLevel: 45, vibe: 'balanced', color: '#8FB8DE' },
    { id: '5', label: 'Late Night Writing', icon: 'pen-tool', frequency: 71, timeOfDay: 'night', energyLevel: 15, vibe: 'quiet', color: '#C9A9B8' },
    { id: '6', label: 'Weekend Market', icon: 'shopping-bag', frequency: 54, timeOfDay: 'morning', energyLevel: 60, vibe: 'lively', color: '#DEB887' },
  ],
  setPatterns: (p) => set({ patterns: p }),
  patternLearned: false,
  setPatternLearned: (v) => set({ patternLearned: v }),

  serendipityWindows: [
    { id: '1', location: 'Meridian Coffee Co.', time: '8:15 AM', dayOfWeek: 'Tomorrow', nearMissCount: 12, description: 'Your paths nearly crossed 12 times last month at this spot', nudge: 'Try the new seasonal blend — it just arrived today.' },
    { id: '2', location: 'Riverside Trail Head', time: '6:45 AM', dayOfWeek: 'Saturday', nearMissCount: 8, description: 'Someone with your exact running pace frequents this trail', nudge: 'A new connecting path opened last week — locals love the morning light there.' },
    { id: '3', location: 'The Quiet Page Bookstore', time: '3:30 PM', dayOfWeek: 'Sunday', nearMissCount: 5, description: 'A fellow browser shares your taste in contemporary fiction', nudge: 'The author reading this Sunday has been moved to the afternoon slot.' },
  ],
  setSerendipityWindows: (w) => set({ serendipityWindows: w }),

  encounters: [
    { id: '1', description: 'A person who loves trail running and quiet mornings is near you.', distance: '~15m', timestamp: 'Just now', vibe: 'quiet morning energy', connected: false },
    { id: '2', description: 'Someone who frequents the same bookstore aisle is close by.', distance: '~8m', timestamp: '2 min ago', vibe: 'contemplative reader', connected: true },
    { id: '3', description: 'A fellow evening park walker is within reach.', distance: '~22m', timestamp: 'Yesterday', vibe: 'balanced wanderer', connected: false },
  ],
  setEncounters: (e) => set({ encounters: e }),
  activeEncounter: null,
  setActiveEncounter: (e) => set({ activeEncounter: e }),

  showSerendipityCard: false,
  setShowSerendipityCard: (v) => set({ showSerendipityCard: v }),
  selectedEncounter: null,
  setSelectedEncounter: (e) => set({ selectedEncounter: e }),

  privacySettings: {
    ghostMode: false,
    selectiveVisibility: false,
    blockedZones: [],
    blockedTimes: [],
    dataOnDevice: true,
  },
  setPrivacySettings: (s) => set({ privacySettings: s }),

  friendshipIntent: '',
  setFriendshipIntent: (i) => set({ friendshipIntent: i }),

  isAnimating: false,
  setIsAnimating: (v) => set({ isAnimating: v }),
}));

export type { BehavioralPattern, SerendipityWindow, Encounter, PrivacySettings, LocationPoint };
