import { MegaReputationStats } from "@/lib/domain/shared/types";

export async function getMegaScoreStats(): Promise<MegaReputationStats> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const res = await fetch(`${baseUrl}/api/stats`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch stats: ${res.status}`);
    }

    const stats = await res.json();
    return stats as MegaReputationStats;
  } catch (error) {
    console.error("Error fetching MegaScore stats:", error);
    throw error;
  }
}
