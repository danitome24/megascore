"use server";

import type { Score } from "@/lib/domain/score/types";
import { supabaseClient } from "@/lib/external/supabase/client";

export async function getScoreByAccountId(accountId: string): Promise<Score | null> {
  const supabase = await supabaseClient();
  const { data, error } = await supabase.from("scores").select("*").eq("account_id", accountId).single();
  if (error || !data) return null;
  return {
    id: data.id,
    accountId: data.account_id,
    score: data.score,
    updatedAt: data.updated_at,
  };
}
