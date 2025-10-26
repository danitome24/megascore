"use server";

import type { Metrics, MetricsData } from "@/lib/domain/metrics/types";
import { supabaseClient } from "@/lib/external/supabase/client";

export async function createMetrics(accountId: string, data: MetricsData): Promise<Metrics | null> {
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
    data: metricsData.data as unknown as MetricsData,
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
    data: data.data as unknown as MetricsData,
    updatedAt: data.updated_at,
  };
}
