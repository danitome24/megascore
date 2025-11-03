"use client";

import { createAccountAction } from "@/app/actions/account";
import { Account } from "@/lib/domain/account/types";
import { Metrics } from "@/lib/domain/metrics/types";
import { Score } from "@/lib/domain/score/types";

/**
 * Create a new account after minting NFT
 * Uses server action for better security and type safety
 *
 * @param walletAddress - User's wallet address
 * @param txHash - Transaction hash of the mint
 * @returns Created account data
 * @throws Error if account creation fails
 */
export async function createAccount(walletAddress: string, txHash: string): Promise<Account> {
  const result = await createAccountAction(walletAddress, txHash);

  if (!result.success) {
    throw new Error(result.error || "Failed to create account");
  }

  return result.account as Account;
}

export async function fetchAccountData(walletAddress: string): Promise<{
  account: Account;
  metrics: Metrics;
  score: Score;
} | null> {
  const res = await fetch(`/api/account/${walletAddress}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (res.status === 404) {
    return null; // Account not found
  }
  if (!res.ok) {
    throw new Error("Failed to fetch account");
  }

  const data = await res.json();
  return {
    account: data.account as Account,
    metrics: data.metrics as Metrics,
    score: data.score as Score,
  };
}
