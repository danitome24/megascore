"use client";

import { StatsCard } from "@/components/home/stats-card";
import { motion } from "framer-motion";

interface NetworkStatsClientProps {
  stats: Array<{
    value: string;
    label: string;
    description: string;
  }>;
}

export function NetworkStatsClient({ stats }: NetworkStatsClientProps) {
  return (
    <motion.div
      className="space-y-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold uppercase tracking-[0.1em] text-foreground md:text-4xl">
        <span className="text-mega-blue">MegaScore</span> Impact
      </h2>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} value={stat.value} label={stat.label} description={stat.description} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
