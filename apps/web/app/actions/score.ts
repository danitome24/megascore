"use server";

import type { Score } from "@/lib/domain/score/types";
import { createScore as dbCreateScore, updateScore as dbUpdateScore } from "@/lib/external/supabase/score";
import { isAddress } from "viem";

interface CreateScoreResult {
  success: boolean;
  score?: Score;
  error?: string;
}

interface UpdateScoreResult {
  success: boolean;
  score?: Score;
  archived?: boolean;
  error?: string;
}

/**
 * Server Action: Create score for an account
 *
 * Stores reputation score for a user account.
 * This replaces the POST /api/score endpoint.
 *
 * @param accountId - Account ID in database
 * @param score - Reputation score value
 * @returns Result with score data or error message
 */
export async function createScoreAction(accountId: string, score: number): Promise<CreateScoreResult> {
  try {
    // Validation: Check if accountId provided
    if (!accountId || accountId.trim() === "") {
      return {
        success: false,
        error: "accountId is required",
      };
    }

    // Validation: Check score is not negative
    if (score < 0) {
      return {
        success: false,
        error: "score cannot be negative",
      };
    }

    // Create score in database
    const scoreRecord = await dbCreateScore(accountId, score);

    if (!scoreRecord) {
      return {
        success: false,
        error: "Failed to create score in database",
      };
    }

    return {
      success: true,
      score: scoreRecord,
    };
  } catch (error) {
    console.error("Error creating score:", error);

    if (error instanceof Error) {
      if (error.message.includes("duplicate") || error.message.includes("unique")) {
        return {
          success: false,
          error: "Score already exists for this account",
        };
      }
      if (error.message.includes("not found")) {
        return {
          success: false,
          error: "Account not found",
        };
      }
    }

    return {
      success: false,
      error: "Internal server error",
    };
  }
}

/**
 * Server Action: Update score for an account
 *
 * Updates reputation score and optionally archives old score.
 * This replaces the PUT /api/score endpoint.
 *
 * @param walletAddress - User's wallet address
 * @param newScore - New reputation score value
 * @param oldScore - Previous reputation score (for comparison)
 * @returns Result with updated score and archive status or error message
 */
export async function updateScoreAction(
  walletAddress: string,
  newScore: number,
  oldScore: number,
): Promise<UpdateScoreResult> {
  try {
    // Validation: Check if walletAddress provided
    if (!walletAddress || walletAddress.trim() === "") {
      return {
        success: false,
        error: "walletAddress is required",
      };
    }

    // Validation: Check Ethereum address format
    if (!isAddress(walletAddress)) {
      return {
        success: false,
        error: "Invalid wallet address format",
      };
    }

    // Validation: Check if newScore is a valid number
    if (typeof newScore !== "number" || isNaN(newScore)) {
      return {
        success: false,
        error: "newScore must be a valid number",
      };
    }

    // Validation: Check if oldScore is a valid number
    if (typeof oldScore !== "number" || isNaN(oldScore)) {
      return {
        success: false,
        error: "oldScore must be a valid number",
      };
    }

    // Validation: Check scores are not negative
    if (newScore < 0 || oldScore < 0) {
      return {
        success: false,
        error: "scores cannot be negative",
      };
    }

    // Validation: Ensure score actually increased (monotonic)
    if (newScore < oldScore) {
      return {
        success: false,
        error: "Score cannot decrease - reputation is monotonic",
      };
    }

    // Validation: Ensure score changed
    if (newScore === oldScore) {
      return {
        success: false,
        error: "No score change detected",
      };
    }

    // Update score in database
    const result = await dbUpdateScore(walletAddress, newScore, oldScore);

    if (!result || !result.score) {
      return {
        success: false,
        error: "Failed to update score in database",
      };
    }

    return {
      success: true,
      score: result.score,
      archived: result.archived ?? false,
    };
  } catch (error) {
    console.error("Error updating score:", error);

    if (error instanceof Error) {
      if (error.message.includes("not found")) {
        return {
          success: false,
          error: "Account or score not found",
        };
      }
    }

    return {
      success: false,
      error: "Internal server error",
    };
  }
}
