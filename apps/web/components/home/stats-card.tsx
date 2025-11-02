"use client";

import { motion } from "framer-motion";

interface StatsCardProps {
  value: string | number;
  label: string;
  description: string;
  index: number;
}

export function StatsCard({ value, label, description, index }: StatsCardProps) {
  return (
    <motion.div
      className="group border-2 border-foreground/10 p-6 text-center transition-all duration-300 hover:border-mega-coral/30 hover:bg-mega-coral/5"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="mb-2 text-3xl font-bold text-foreground transition-colors duration-300 group-hover:text-mega-coral md:text-4xl">
        {value}
      </div>
      <div className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-foreground/60">{label}</div>
      <div className="text-xs text-foreground/40 transition-colors duration-300 group-hover:text-foreground/60">
        {description}
      </div>
    </motion.div>
  );
}
