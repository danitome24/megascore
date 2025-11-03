"use client";

import { useState } from "react";
import { MetricScore } from "@/lib/domain/reputation/types";
import { useAccount } from "wagmi";

interface ScoreCalculationResult {
  success: boolean;
  score?: number;
  metrics?: MetricScore[];
}

/**
 * Hook: Fetch and calculate reputation score
 * Returns data without updating stores - component decides what to do
 */
export function useScoreCalculation() {
  const [isCalculating, setIsCalculating] = useState(false);
  const { address } = useAccount();

  const calculateScore = async (): Promise<ScoreCalculationResult> => {
    if (!address) {
      return { success: false };
    }

    setIsCalculating(true);

    try {
      const response = await fetch(`/api/score/calculate?wallet=${address}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to calculate score");
      }

      const data = await response.json();
      const calculatedScore = data.reputation.totalScore as number;
      const breakdownMetrics = data.reputation.breakdown as MetricScore[];

      return {
        success: true,
        score: calculatedScore,
        metrics: breakdownMetrics,
      };
    } catch (error) {
      console.error("Error calculating score:", error);
      return { success: false };
    } finally {
      setIsCalculating(false);
    }
  };

  return { calculateScore, isCalculating };
}
