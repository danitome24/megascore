import { create } from "zustand";

export type ScoreState = {
  // Current score state (from database or last persisted state)
  currentScore: number;
  lastFetchedAt: Date | null;

  // Updated score state (after recalculation)
  updatedScore: number | null;
  scoreIncrease: number;
  lastUpdatedAt: Date | null;

  // NFT state
  hasNFT: boolean;

  // Actions
  setCurrentScore: (score: number) => void;
  setUpdatedScore: (score: number) => void;
  setHasNFT: (hasNFT: boolean) => void;
  persistScoreToNFT: () => void;
  commitScoreUpdate: () => void;
  reset: () => void;
};

export const useScoreStore = create<ScoreState>(set => ({
  // Initial state
  currentScore: 0,
  lastFetchedAt: null,
  updatedScore: null,
  scoreIncrease: 0,
  lastUpdatedAt: null,
  hasNFT: false,

  // Set the current score (from database or initial fetch)
  setCurrentScore: (score: number) =>
    set({
      currentScore: score,
      lastFetchedAt: new Date(),
    }),

  // Set the updated score after recalculation
  setUpdatedScore: (newScore: number) =>
    set(state => ({
      updatedScore: newScore,
      scoreIncrease: newScore - state.currentScore,
      lastUpdatedAt: new Date(),
    })),

  // Set NFT ownership status
  setHasNFT: (hasNFT: boolean) => set({ hasNFT }),

  // Persist updated score to NFT (marks it as current)
  persistScoreToNFT: () =>
    set(state => ({
      currentScore: state.updatedScore || state.currentScore,
      updatedScore: null,
      scoreIncrease: 0,
    })),

  // Commit score update (update currentScore with updatedScore and reset)
  commitScoreUpdate: () =>
    set(state => ({
      currentScore: state.updatedScore || state.currentScore,
      updatedScore: null,
      scoreIncrease: 0,
    })),

  // Reset to initial state
  reset: () =>
    set({
      currentScore: 0,
      lastFetchedAt: null,
      updatedScore: null,
      scoreIncrease: 0,
      lastUpdatedAt: null,
      hasNFT: false,
    }),
}));
