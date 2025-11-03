"use server";

import type { Metrics } from "@/lib/domain/metrics/types";
import { MetricScore } from "@/lib/domain/reputation/types";
import { createMetrics as dbCreateMetrics, updateMetrics as dbUpdateMetrics } from "@/lib/external/supabase/metrics";

interface CreateMetricsResult {
  success: boolean;
  metrics?: Metrics;
  error?: string;
}

interface UpdateMetricsResult {
  success: boolean;
  metrics?: Metrics;
  archived?: boolean;
  error?: string;
}

/**
 * Server Action: Create metrics for an account
 *
 * Stores on-chain activity metrics for a user account.
 * This replaces the POST /api/metrics endpoint.
 *
 * @param accountId - Account ID in database
 * @param data - On-chain activity metrics
 * @returns Result with metrics data or error message
 */
export async function createMetricsAction(accountId: string, data: MetricScore[]): Promise<CreateMetricsResult> {
  try {
    // Validation: Check if accountId provided
    if (!accountId || accountId.trim() === "") {
      return {
        success: false,
        error: "accountId is required",
      };
    }

    // Validation: Check if data provided
    if (!data) {
      return {
        success: false,
        error: "metrics data is required",
      };
    }

    // Create metrics in database
    const metrics = await dbCreateMetrics(accountId, data);

    if (!metrics) {
      return {
        success: false,
        error: "Failed to create metrics in database",
      };
    }

    return {
      success: true,
      metrics,
    };
  } catch (error) {
    console.error("Error creating metrics:", error);

    if (error instanceof Error) {
      if (error.message.includes("duplicate") || error.message.includes("unique")) {
        return {
          success: false,
          error: "Metrics already exist for this account",
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
 * Server Action: Update metrics for an account
 *
 * Updates metric score breakdown and optionally archives old metrics.
 * This replaces the PUT /api/metrics endpoint.
 *
 * @param walletAddress - User's wallet address
 * @param newData - New metric score breakdown
 * @param oldData - Previous metric score breakdown (for comparison)
 * @returns Result with updated metrics and archive status or error message
 */
export async function updateMetricsAction(
  walletAddress: string,
  newData: MetricScore[],
  oldData: MetricScore[],
): Promise<UpdateMetricsResult> {
  try {
    // Validation: Check if walletAddress provided
    if (!walletAddress || walletAddress.trim() === "") {
      return {
        success: false,
        error: "walletAddress is required",
      };
    }

    // Validation: Check Ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return {
        success: false,
        error: "Invalid wallet address format",
      };
    }

    // Validation: Check if newData provided
    if (!newData) {
      return {
        success: false,
        error: "newData is required",
      };
    }

    // Validation: Check if oldData provided (for comparison)
    if (!oldData) {
      return {
        success: false,
        error: "oldData is required",
      };
    }

    // Validation: Ensure metrics actually changed
    const hasChanges = JSON.stringify(newData) !== JSON.stringify(oldData);

    if (!hasChanges) {
      return {
        success: false,
        error: "No changes detected in metrics",
      };
    }

    // Validation: Check required fields in MetricScore[]
    if (!Array.isArray(newData) || newData.length === 0) {
      return {
        success: false,
        error: "Invalid metrics data structure",
      };
    }

    // Update metrics in database
    const result = await dbUpdateMetrics(walletAddress, newData, oldData);

    if (!result || !result.metrics) {
      return {
        success: false,
        error: "Failed to update metrics in database",
      };
    }

    return {
      success: true,
      metrics: result.metrics,
      archived: result.archived ?? false,
    };
  } catch (error) {
    console.error("Error updating metrics:", error);

    if (error instanceof Error) {
      if (error.message.includes("not found")) {
        return {
          success: false,
          error: "Account or metrics not found",
        };
      }
    }

    return {
      success: false,
      error: "Internal server error",
    };
  }
}
