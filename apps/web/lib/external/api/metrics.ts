"use client";

import { createMetricsAction, updateMetricsAction } from "@/app/actions/metrics";
import type { Metrics } from "@/lib/domain/metrics/types";
import { MetricScore } from "@/lib/domain/reputation/types";

/**
 * Create metrics for an account
 * Uses server action for better security and type safety
 *
 * @param accountId - Account ID in database
 * @param data - Metric score breakdown
 * @returns Created metrics data
 * @throws Error if metrics creation fails
 */
export async function createMetrics(accountId: string, data: MetricScore[]): Promise<Metrics> {
  const result = await createMetricsAction(accountId, data);

  if (!result.success) {
    throw new Error(result.error || "Failed to store metrics in database");
  }

  return result.metrics as Metrics;
}

/**
 * Update metrics for an account
 * Uses server action for better security and type safety
 *
 * @param walletAddress - User's wallet address
 * @param newData - New metric score breakdown
 * @param oldData - Previous metric score breakdown
 * @returns Updated metrics data and archive status
 * @throws Error if metrics update fails
 */
export async function updateMetrics(
  walletAddress: string,
  newData: MetricScore[],
  oldData: MetricScore[],
): Promise<{ metrics: Metrics; archived: boolean }> {
  const result = await updateMetricsAction(walletAddress, newData, oldData);

  if (!result.success) {
    throw new Error(result.error || "Failed to update metrics");
  }

  return {
    metrics: result.metrics as Metrics,
    archived: result.archived ?? false,
  };
}
