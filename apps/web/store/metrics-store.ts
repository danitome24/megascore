import type { MetricScore } from "@/lib/domain/reputation/types";
import { create } from "zustand";

export type MetricsState = {
  // Current metrics breakdown (from database or last persisted state)
  currentMetrics: MetricScore[] | null;
  lastFetchedAt: Date | null;

  // Updated metrics breakdown (after recalculation)
  updatedMetrics: MetricScore[] | null;
  lastUpdatedAt: Date | null;

  // Actions
  setCurrentMetrics: (metrics: MetricScore[]) => void;
  setUpdatedMetrics: (metrics: MetricScore[]) => void;
  persistMetricsToDatabase: () => void;
  commitMetricsUpdate: () => void;
  reset: () => void;
};

export const useMetricsStore = create<MetricsState>(set => ({
  // Initial state
  currentMetrics: null,
  lastFetchedAt: null,
  updatedMetrics: null,
  lastUpdatedAt: null,

  // Set the current metrics breakdown (from database or initial fetch)
  setCurrentMetrics: (metrics: MetricScore[]) =>
    set({
      currentMetrics: metrics,
      lastFetchedAt: new Date(),
    }),

  // Set the updated metrics breakdown after recalculation
  setUpdatedMetrics: (metrics: MetricScore[]) =>
    set({
      updatedMetrics: metrics,
      lastUpdatedAt: new Date(),
    }),

  // Persist updated metrics to database (marks it as current)
  persistMetricsToDatabase: () =>
    set(state => ({
      currentMetrics: state.updatedMetrics || state.currentMetrics,
      updatedMetrics: null,
    })),

  // Commit metrics update (update currentMetrics with updatedMetrics and reset)
  commitMetricsUpdate: () =>
    set(state => ({
      currentMetrics: state.updatedMetrics || state.currentMetrics,
      updatedMetrics: null,
    })),

  // Reset to initial state
  reset: () =>
    set({
      currentMetrics: null,
      lastFetchedAt: null,
      updatedMetrics: null,
      lastUpdatedAt: null,
    }),
}));
