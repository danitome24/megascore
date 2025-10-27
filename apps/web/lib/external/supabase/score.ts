"use server";

import { getAccountByWallet } from "./account";
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

export async function updateScore(
  walletAddress: string,
  newScore: number,
  oldScore: number,
): Promise<{ score: Score; archived: boolean } | null> {
  const supabase = await supabaseClient();

  // Get account ID from wallet address
  const account = await getAccountByWallet(walletAddress);
  if (!account) {
    console.error("Account not found for wallet:", walletAddress);
    return null;
  }

  const accountId = account.id;

  // First, archive the old score in scores_history
  const { error: archiveError } = await supabase
    .from("scores_history")
    .insert({ account_id: accountId, score: oldScore, recorded_at: new Date().toISOString() });

  if (archiveError) {
    console.error("Error archiving score to history:", archiveError);
    return null;
  }

  // Then, update the current score
  const { data, error } = await supabase
    .from("scores")
    .update({ score: newScore, updated_at: new Date().toISOString() })
    .eq("account_id", accountId)
    .select()
    .single();

  if (error || !data) {
    console.error("Error updating score:", error);
    return null;
  }

  return {
    score: {
      id: data.id,
      accountId: data.account_id,
      score: data.score,
      updatedAt: data.updated_at,
    },
    archived: true,
  };
}
