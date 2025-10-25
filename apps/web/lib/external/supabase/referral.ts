import type { Referral } from "@/lib/domain/referral/types";
import { supabase } from "@/lib/external/supabase/client";

export async function getReferralByAccountId(accountId: string): Promise<Referral | null> {
  const { data, error } = await supabase.from("referrals").select("*").eq("account_id", accountId).single();
  if (error || !data) return null;
  return {
    id: data.id,
    accountId: data.account_id,
    referralCode: data.referral_code,
    redeemCount: data.redeem_count,
    createdAt: data.created_at,
  };
}
