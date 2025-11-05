"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/home/stats-card";
import { getMegaReputationStats } from "@/lib/external/api/stats";
import { motion } from "framer-motion";

interface StatData {
  value: string;
  label: string;
  description: string;
}

export function StatsSection() {
  const [stats, setStats] = useState<StatData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const data = await getMegaReputationStats();

        const displayStats: StatData[] = [
          {
            value: `${data.holders}+`,
            label: "Reputation Holders",
            description: "Users with verified MegaReputation NFTs",
          },
          {
            value: `${data.metricsTracked}`,
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

        setStats(displayStats);
        setError(null);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load statistics");
        // Set fallback stats
        setStats([
          {
            value: "0+",
            label: "Reputation Holders",
            description: "Users with verified MegaReputation NFTs",
          },
          {
            value: "0",
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
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="relative border-t border-foreground/10 py-24">
      <div className="from-mega-green/2 to-mega-coral/2 absolute inset-0 bg-gradient-to-r via-transparent" />
      <div className="container relative z-10 mx-auto px-8">
        <div className="mx-auto max-w-4xl text-center">
          {isLoading && (
            <motion.div
              className="space-y-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold uppercase tracking-[0.1em] text-foreground md:text-4xl">
                <span className="text-mega-blue">MegaReputation</span> Impact
              </h2>
              <div className="flex justify-center">
                <p className="text-foreground/60">Loading statistics...</p>
              </div>
            </motion.div>
          )}

          {!isLoading && (
            <motion.div
              className="space-y-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold uppercase tracking-[0.1em] text-foreground md:text-4xl">
                <span className="text-mega-blue">MegaReputation</span> Impact
              </h2>
              {error && <p className="text-center text-sm text-amber-500">{error}</p>}
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <StatsCard
                    key={index}
                    value={stat.value}
                    label={stat.label}
                    description={stat.description}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
