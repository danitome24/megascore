"use server";

import { supabaseClient } from "./client";
import { Address, LeaderboardAccount } from "@/lib/domain/shared/types";

/**
 * Fetches the top 50 leaderboard entries from Supabase, ordered by score descending.
 * Returns an array of User objects with rank, address, score, and level.
 *
 * @returns Array of leaderboard users with rank, wallet address, score, and level
 */
export async function fetchLeaderboardData(): Promise<LeaderboardAccount[]> {
  const supabase = await supabaseClient();

  // Fetch top 50 scores with their associated account wallet addresses
  const { data: scores, error } = await supabase
    .from("scores")
    .select(
      `
      id,
      score,
      account_id,
      accounts!inner(wallet_address)
    `,
    )
    .order("score", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching leaderboard data:", error);
    return [];
  }

  // Map scores to LeaderboardAccount type with rank, address, score, and calculated level
  return (scores || []).map((row: any, idx: number) => ({
    address: row.accounts.wallet_address as Address,
    score: row.score as number,
    level: Math.max(1, Math.floor((row.score as number) / 250)),
  }));
}
