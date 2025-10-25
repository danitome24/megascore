import type { Metrics, MetricsData } from "@/lib/domain/metrics/types";
import { supabase } from "@/lib/external/supabase/client";

export async function getMetricsByAccountId(accountId: string): Promise<Metrics | null> {
  const { data, error } = await supabase.from("metrics").select("*").eq("account_id", accountId).single();
  if (error || !data) return null;
  return {
    id: data.id,
    accountId: data.account_id,
    data: data.data as unknown as MetricsData,
    updatedAt: data.updated_at,
  };
}
