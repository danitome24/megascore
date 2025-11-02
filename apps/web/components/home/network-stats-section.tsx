import { NetworkStatsClient } from "@/components/home/network-stats-client";
import { getMegaScoreStats } from "@/lib/external/api/stats";

export async function NetworkStatsSection() {
  const stats = await getMegaScoreStats();

  const displayStats = [
    {
      value: `${stats.holders}+`,
      label: "Reputation Holders",
      description: "Users with verified MegaScore NFTs",
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
          <NetworkStatsClient stats={displayStats} />
        </div>
      </div>
    </section>
  );
}
