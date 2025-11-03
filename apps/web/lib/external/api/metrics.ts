import type { Metrics, OnChainActivity } from "@/lib/domain/metrics/types";

export async function createMetrics(accountId: string, data: OnChainActivity): Promise<Metrics> {
  const res = await fetch("/api/metrics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accountId, data }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Failed to store metrics in database");
  }

  const result = await res.json();
  return result.metrics as Metrics;
}

export async function updateMetrics(
  walletAddress: string,
  newData: OnChainActivity,
  oldData: OnChainActivity,
): Promise<{ metrics: Metrics; archived: boolean }> {
  const res = await fetch("/api/metrics", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress, newData, oldData }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Failed to update metrics");
  }

  const data = await res.json();
  return data;
}
