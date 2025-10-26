import { Account } from "@/lib/domain/account/types";

// Call the API to create a new account after minting
export async function createAccount(walletAddress: string): Promise<Account | null> {
  const res = await fetch("/api/account", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress }),
  });

  if (!res.ok) {
    throw new Error("Failed to create account");
  }

  return res.json();
}
