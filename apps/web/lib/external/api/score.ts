"use client";

import { createScoreAction, updateScoreAction } from "@/app/actions/score";
import type { Score } from "@/lib/domain/score/types";

/**
 * Create score for an account
 * Uses server action for better security and type safety
 *
 * @param accountId - Account ID in database
 * @param score - Reputation score value
 * @returns Created score data
 * @throws Error if score creation fails
 */
export async function createScore(accountId: string, score: number): Promise<Score> {
  const result = await createScoreAction(accountId, score);

  if (!result.success) {
    throw new Error(result.error || "Failed to store score in database");
  }

  return result.score as Score;
}

/**
 * Update score for an account
 * Uses server action for better security and type safety
 *
 * Ensures score is monotonic (never decreases).
 *
 * @param walletAddress - User's wallet address
 * @param newScore - New reputation score value
 * @param oldScore - Previous reputation score
 * @returns Updated score data and archive status
 * @throws Error if score update fails
 */
export async function updateScore(
  walletAddress: string,
  newScore: number,
  oldScore: number,
): Promise<{ score: Score; archived: boolean }> {
  const result = await updateScoreAction(walletAddress, newScore, oldScore);

  if (!result.success) {
    throw new Error(result.error || "Failed to update score");
  }

  return {
    score: result.score as Score,
    archived: result.archived ?? false,
  };
}
