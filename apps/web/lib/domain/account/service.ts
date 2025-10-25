import { Account } from "./types";
import { Metrics } from "@/lib/domain/metrics/types";
import { Referral } from "@/lib/domain/referral/types";
import { Score } from "@/lib/domain/score/types";
import { getAccountByWallet } from "@/lib/external/supabase/account";
import { getMetricsByAccountId } from "@/lib/external/supabase/metrics";
import { getReferralByAccountId } from "@/lib/external/supabase/referral";
import { getScoreByAccountId } from "@/lib/external/supabase/score";

export async function getAccountWithDetails(walletAddress: string): Promise<{
  account: Account | null;
  metrics: Metrics | null;
  score: Score | null;
  referral: Referral | null;
}> {
  const account = await getAccountByWallet(walletAddress);
  if (!account) {
    return { account: null, metrics: null, score: null, referral: null };
  }
  const [metrics, score, referral] = await Promise.all([
    getMetricsByAccountId(account.id),
    getScoreByAccountId(account.id),
    getReferralByAccountId(account.id),
  ]);
  return { account, metrics, score, referral };
}
