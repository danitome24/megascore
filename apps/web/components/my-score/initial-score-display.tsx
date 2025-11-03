"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Zap } from "lucide-react";

interface InitialScoreDisplayProps {
  onCalculate: () => Promise<void>;
  isLoading?: boolean;
}

export function InitialScoreDisplay({ onCalculate, isLoading = false }: InitialScoreDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Score Display Card */}
      <Card className="relative overflow-hidden border-2 border-mega-coral/30 bg-gradient-to-br from-background to-mega-coral/5 shadow-xl">
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue"></div>
        <CardContent className="p-12">
          <div className="text-center">
            {/* Animated Score */}
            <motion.div
              className="relative mb-8 flex items-center justify-center"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="font-mono text-8xl font-bold text-foreground/30"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                0
              </motion.div>
              {/* Pulsing glow effect */}
              <motion.div
                className="absolute h-32 w-32 rounded-full bg-mega-coral/10 blur-2xl"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.div>

            <motion.div
              className="mb-2 text-xl font-semibold uppercase tracking-widest text-mega-coral"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Reputation Score
            </motion.div>

            <motion.div
              className="mb-8 text-sm tracking-wide text-foreground/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Ready to discover your on-chain reputation
            </motion.div>

            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Badge className="border border-mega-coral/30 bg-mega-coral/20 px-4 py-2 text-mega-coral">
                <Trophy className="mr-2 h-4 w-4" />
                Not Ranked Yet
              </Badge>
            </motion.div>

            <motion.div
              className="mb-10 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-foreground/60">
                Analyze your on-chain activity and unlock your unique reputation score.
              </p>
              <p className="text-xs text-foreground/40">Takes a few seconds to calculate</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Button
          onClick={onCalculate}
          disabled={isLoading}
          size="lg"
          className="h-14 w-full bg-gradient-to-r from-mega-coral to-mega-pink text-base font-semibold shadow-lg transition-shadow hover:from-mega-coral/90 hover:to-mega-pink/90 hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <Zap className="mr-3 h-5 w-5 animate-spin" />
              Analyzing Your Activity...
            </>
          ) : (
            <>
              <Zap className="mr-3 h-5 w-5" />
              Calculate My Score
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
