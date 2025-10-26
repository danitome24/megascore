import type { Score } from "@/lib/domain/score/types";

export async function createScore(accountId: string, score: number): Promise<Score> {
  const res = await fetch("/api/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accountId, score }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Failed to store score in database");
  }

  const data = await res.json();
  return data.score as Score;
}

export async function updateScore(
  walletAddress: string,
  newScore: number,
  oldScore: number,
): Promise<{ score: Score; archived: boolean }> {
  const res = await fetch("/api/score", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress, newScore, oldScore }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Failed to update score");
  }

  const data = await res.json();
  return data;
}
