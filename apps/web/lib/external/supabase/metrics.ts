"use server";

import { getAccountByWallet } from "./account";
import type { Metrics } from "@/lib/domain/metrics/types";
import { MetricScore } from "@/lib/domain/reputation/types";
import { supabaseClient } from "@/lib/external/supabase/client";

export async function createMetrics(accountId: string, data: MetricScore[]): Promise<Metrics | null> {
  const supabase = await supabaseClient();

  const serializableData = JSON.parse(JSON.stringify(data));
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
    data: metricsData.data,
    updatedAt: metricsData.updated_at,
  } as Metrics;
}

export async function getMetricsByAccountId(accountId: string): Promise<Metrics | null> {
  const supabase = await supabaseClient();
  const { data, error } = await supabase.from("metrics").select("*").eq("account_id", accountId).single();
  if (error || !data) return null;
  return {
    id: data.id,
    accountId: data.account_id,
    data: data.data,
    updatedAt: data.updated_at,
  } as Metrics;
}

export async function updateMetrics(
  walletAddress: string,
  newData: MetricScore[],
  oldData: MetricScore[],
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
  const serializableOldData = JSON.parse(JSON.stringify(oldData));
  const { error: archiveError } = await supabase
    .from("metrics_history")
    .insert({ account_id: accountId, data: serializableOldData, recorded_at: new Date().toISOString() });

  if (archiveError) {
    console.error("Error archiving metrics to history:", archiveError);
    return null;
  }

  // Then, update the current metrics
  const serializableNewData = JSON.parse(JSON.stringify(newData));
  const { data, error } = await supabase
    .from("metrics")
    .update({ data: serializableNewData, updated_at: new Date().toISOString() })
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
      data: data.data,
      updatedAt: data.updated_at,
    } as Metrics,
    archived: true,
  };
}
