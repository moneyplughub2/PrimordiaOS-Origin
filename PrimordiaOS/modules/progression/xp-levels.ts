// modules/progression/xp-levels.ts

import { XPState } from "./xp-engine";

export interface Unlocks {
  chambers: string[];
  modules: string[];
  automationTiers: string[];
  worldFeatures: string[];
  loreFragments: string[];
}

const LEVEL_UNLOCKS: Record<number, Unlocks> = {
  0: {
    chambers: ["Primordia:Init"],
    modules: ["cli", "basic-automation"],
    automationTiers: [],
    worldFeatures: [],
    loreFragments: [],
  },
  1: {
    chambers: ["Primordia:Core"],
    modules: ["autopost", "scheduler"],
    automationTiers: ["tier-1"],
    worldFeatures: ["enter-primordia-world"],
    loreFragments: ["primordia-origin-01"],
  },
  2: {
    chambers: ["Primordia:Bridge"],
    modules: ["physics-pipeline"],
    automationTiers: ["tier-2"],
    worldFeatures: ["basic-interactions"],
    loreFragments: ["primordia-origin-02"],
  },
  // extend as needed…
};

export function getUnlocksForLevel(level: number): Unlocks {
  return (
    LEVEL_UNLOCKS[level] ?? {
      chambers: [],
      modules: [],
      automationTiers: [],
      worldFeatures: [],
      loreFragments: [],
    }
  );
}

export function resolveCurrentUnlocks(state: XPState): Unlocks {
  return getUnlocksForLevel(state.level);
}
