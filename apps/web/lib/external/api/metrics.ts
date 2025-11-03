"use client";

import { createMetricsAction, updateMetricsAction } from "@/app/actions/metrics";
import type { Metrics, OnChainActivity } from "@/lib/domain/metrics/types";

/**
 * Create metrics for an account
 * Uses server action for better security and type safety
 *
 * @param accountId - Account ID in database
 * @param data - On-chain activity metrics
 * @returns Created metrics data
 * @throws Error if metrics creation fails
 */
export async function createMetrics(accountId: string, data: OnChainActivity): Promise<Metrics> {
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
 * @param newData - New on-chain activity metrics
 * @param oldData - Previous on-chain activity metrics
 * @returns Updated metrics data and archive status
 * @throws Error if metrics update fails
 */
export async function updateMetrics(
  walletAddress: string,
  newData: OnChainActivity,
  oldData: OnChainActivity,
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
