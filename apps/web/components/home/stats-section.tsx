import { StatsClient } from "@/components/home/stats-client";
import { getMegaReputationStats } from "@/lib/external/api/stats";

export async function StatsSection() {
  const stats = await getMegaReputationStats();

  const displayStats = [
    {
      value: `${stats.holders}+`,
      label: "Reputation Holders",
      description: "Users with verified MegaReputation NFTs",
    },
    {
      value: `${stats.metricsTracked}`,
      label: "Metrics Tracked",
      description: "On-chain activity categories monitored",
    },
    {
      value: "Leveling",
      label: "Achievement Tiers",
      description: "From Contributor to MegaLegend",
    },
    {
      value: "100%",
      label: "Soulbound",
      description: "Permanent, non-transferable NFTs",
    },
  ];

  return (
    <section className="relative border-t border-foreground/10 py-24">
      <div className="from-mega-green/2 to-mega-coral/2 absolute inset-0 bg-gradient-to-r via-transparent" />
      <div className="container relative z-10 mx-auto px-8">
        <div className="mx-auto max-w-4xl text-center">
          <StatsClient stats={displayStats} />
        </div>
      </div>
    </section>
  );
}
