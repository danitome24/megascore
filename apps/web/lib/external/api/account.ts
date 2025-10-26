import { Account } from "@/lib/domain/account/types";

// Call the API to create a new account after minting
export async function createAccount(walletAddress: string): Promise<Account> {
  const res = await fetch("/api/account", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress }),
  });

  if (!res.ok) {
    throw new Error("Failed to create account");
  }

  const data = await res.json();
  return data.account as Account;
}

export async function getAccountByWallet(walletAddress: string): Promise<Account | null> {
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
  return data.account as Account;
}
