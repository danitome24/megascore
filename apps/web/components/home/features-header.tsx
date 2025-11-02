"use client";

import { motion } from "framer-motion";

export function FeaturesHeader() {
  return (
    <motion.div
      className="mb-16 space-y-6 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold uppercase tracking-[0.15em] text-foreground md:text-4xl">
        What is <span className="text-mega-coral">MegaReputation</span>?
      </h2>
      <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-foreground/70">
        A transparent scoring system that tracks your contributions to the MegaETH ecosystem
      </p>
    </motion.div>
  );
}
