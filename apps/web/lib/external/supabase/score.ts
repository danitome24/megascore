"use server";

import type { Score } from "@/lib/domain/score/types";
import { supabaseClient } from "@/lib/external/supabase/client";

export async function createScore(accountId: string, score: number): Promise<Score | null> {
  const supabase = await supabaseClient();
  const { data, error } = await supabase.from("scores").insert({ account_id: accountId, score }).select().single();
  if (error || !data) {
    console.error("Error creating score:", error);
    return null;
  }
  return {
    id: data.id,
    accountId: data.account_id,
    score: data.score,
    updatedAt: data.updated_at,
  };
}

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
