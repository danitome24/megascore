"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart3, Users, Wallet, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative border-t border-foreground/10 py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-mega-coral/5 via-transparent to-mega-blue/5" />
      <div className="container relative z-10 mx-auto px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="group relative overflow-hidden border-2 border-foreground/20 bg-background shadow-2xl transition-all duration-700 hover:shadow-[0_0_60px_rgba(0,0,0,0.3)]">
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue transition-all duration-500 group-hover:h-2"></div>
              <CardContent className="relative p-12 text-center md:p-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="mb-6 text-3xl font-bold uppercase tracking-[0.1em] text-foreground transition-colors duration-500 group-hover:text-mega-coral md:text-4xl">
                    Ready to Start?
                  </h2>
                </motion.div>
                <motion.p
                  className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-foreground/70"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Connect your wallet and start building your on-chain reputation. Every transaction and interaction
                  contributes to your MegaReputation score.
                </motion.p>
                <motion.div
                  className="flex flex-col items-center justify-center gap-6 sm:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Link href="/my-score">
                    <Button
                      size="lg"
                      className="h-auto border-0 bg-mega-coral px-12 py-6 text-sm font-medium uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-mega-coral/90 hover:shadow-xl"
                    >
                      <Wallet className="mr-3 h-5 w-5" />
                      Get My Score
                    </Button>
                  </Link>
                  <Link href="/leaderboard">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-auto border-2 border-foreground/30 bg-transparent px-12 py-6 text-sm font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 hover:border-mega-blue hover:bg-mega-blue hover:text-white"
                    >
                      <BarChart3 className="mr-3 h-5 w-5" />
                      View Rankings
                    </Button>
                  </Link>
                </motion.div>
                {/* Simple Social Proof */}
                <motion.div
                  className="mt-12 border-t border-foreground/10 pt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center space-x-8 text-sm text-foreground/60">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span className="uppercase tracking-[0.15em]">2.4K+ Users</span>
                    </div>
                    <div className="h-4 w-px bg-foreground/20"></div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span className="uppercase tracking-[0.15em]">Live Updates</span>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
