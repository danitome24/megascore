import type { Metrics, MetricsData } from "@/lib/domain/metrics/types";

export async function createMetrics(accountId: string, data: MetricsData): Promise<Metrics> {
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
