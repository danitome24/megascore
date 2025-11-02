import { MegaReputationStats } from "@/lib/domain/shared/types";
import { supabaseClient } from "@/lib/external/supabase/client";

export async function getMegaScoreStats(): Promise<MegaReputationStats> {
  try {
    const supabase = await supabaseClient();
    // Fetch NFT holders (number of scores)
    const { count, error } = await supabase.from("scores").select("id", { count: "exact", head: true });

    if (error) throw error;

    return {
      holders: count || 0,
      metricsTracked: 12, // Constant: number of metrics tracked
    };
  } catch (error) {
    console.error("Error fetching MegaScore stats:", error);
    return {
      holders: 0,
      metricsTracked: 12,
    };
  }
}
