"use server";

import type { Account } from "@/lib/domain/account/types";
import { Address } from "@/lib/domain/shared/types";
import { supabaseClient } from "@/lib/external/supabase/client";

export async function getAccountByWallet(walletAddress: string): Promise<Account | null> {
  const supabase = await supabaseClient();
  const { data, error } = await supabase.from("accounts").select("*").eq("wallet_address", walletAddress).single();
  if (error || !data) return null;
  return {
    id: data.id,
    walletAddress: data.wallet_address as Address,
    mintedAt: data.minted_at,
    createdAt: data.created_at,
  };
}

export async function createAccount(walletAddress: string): Promise<Account | null> {
  const supabase = await supabaseClient();
  const { data, error } = await supabase
    .from("accounts")
    .insert({
      wallet_address: walletAddress.toLowerCase(),
      minted_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating account:", error);
    return null;
  }

  return {
    id: data.id,
    walletAddress: data.wallet_address as Address,
    mintedAt: data.minted_at,
    createdAt: data.created_at,
  };
}
