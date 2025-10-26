import { Account } from "./types";
import { Metrics } from "@/lib/domain/metrics/types";
import { Referral } from "@/lib/domain/referral/types";
import { Score } from "@/lib/domain/score/types";
import { getAccountByWallet } from "@/lib/external/supabase/account";
import { getMetricsByAccountId } from "@/lib/external/supabase/metrics";
import { getReferralByAccountId } from "@/lib/external/supabase/referral";
import { getScoreByAccountId } from "@/lib/external/supabase/score";

export async function getAccountWithDetails(walletAddress: string): Promise<{
  account: Account;
  metrics: Metrics;
  score: Score;
  // referral: Referral;
} | null> {
  const account = await getAccountByWallet(walletAddress);
  if (!account) {
    console.error("Account not found for wallet address:", walletAddress);
    return null;
  }
  const [metrics, score] = await Promise.all([
    getMetricsByAccountId(account.id),
    getScoreByAccountId(account.id),
    // getReferralByAccountId(account.id),
  ]);
  if (!metrics || !score) {
    console.error("Missing related data for account id:", account.id);
    return null;
  }

  return { account, metrics, score };
}
