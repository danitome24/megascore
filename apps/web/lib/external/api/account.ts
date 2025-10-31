import { Account } from "@/lib/domain/account/types";
import { Metrics } from "@/lib/domain/metrics/types";
import { Score } from "@/lib/domain/score/types";

// Call the API to create a new account after minting
export async function createAccount(walletAddress: string, txHash: string): Promise<Account> {
  const res = await fetch("/api/account", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress, txHash }),
  });

  if (!res.ok) {
    throw new Error("Failed to create account");
  }

  const data = await res.json();
  return data.account as Account;
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
