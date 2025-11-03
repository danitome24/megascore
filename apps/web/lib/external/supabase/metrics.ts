"use server";

import { getAccountByWallet } from "./account";
import type { Metrics, OnChainActivity } from "@/lib/domain/metrics/types";
import { supabaseClient } from "@/lib/external/supabase/client";

export async function createMetrics(accountId: string, data: OnChainActivity): Promise<Metrics | null> {
  const supabase = await supabaseClient();

  const serializableData = {
    ...data,
  };
  const { data: metricsData, error } = await supabase
    .from("metrics")
    .insert({ account_id: accountId, data: serializableData })
    .select()
    .single();
  if (error || !metricsData) {
    console.error("Error creating metrics:", error);
    return null;
  }
  return {
    id: metricsData.id,
    accountId: metricsData.account_id,
    data: metricsData.data as unknown as OnChainActivity,
    updatedAt: metricsData.updated_at,
  };
}

export async function getMetricsByAccountId(accountId: string): Promise<Metrics | null> {
  const supabase = await supabaseClient();
  const { data, error } = await supabase.from("metrics").select("*").eq("account_id", accountId).single();
  if (error || !data) return null;
  return {
    id: data.id,
    accountId: data.account_id,
    data: data.data as unknown as OnChainActivity,
    updatedAt: data.updated_at,
  };
}

export async function updateMetrics(
  walletAddress: string,
  newData: OnChainActivity,
  oldData: OnChainActivity,
): Promise<{ metrics: Metrics; archived: boolean } | null> {
  const supabase = await supabaseClient();

  // Get account ID from wallet address
  const account = await getAccountByWallet(walletAddress);
  if (!account) {
    console.error("Account not found for wallet:", walletAddress);
    return null;
  }

  const accountId = account.id;

  // First, archive the old metrics in metrics_history
  const { error: archiveError } = await supabase
    .from("metrics_history")
    .insert({ account_id: accountId, data: oldData, recorded_at: new Date().toISOString() });

  if (archiveError) {
    console.error("Error archiving metrics to history:", archiveError);
    return null;
  }

  // Then, update the current metrics
  const { data, error } = await supabase
    .from("metrics")
    .update({ data: newData, updated_at: new Date().toISOString() })
    .eq("account_id", accountId)
    .select()
    .single();

  if (error || !data) {
    console.error("Error updating metrics:", error);
    return null;
  }

  return {
    metrics: {
      id: data.id,
      accountId: data.account_id,
      data: data.data as unknown as OnChainActivity,
      updatedAt: data.updated_at,
    },
    archived: true,
  };
}
