"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import { getLevelByScore } from "@/lib/domain/reputation/level";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

interface CalculatedScoreCardProps {
  score: number;
}

export function CalculatedScoreCard({ score }: CalculatedScoreCardProps) {
  const animatedScore = useCounterAnimation(0, score, 1000, true);
  const levelObj = getLevelByScore(score);
  const level = levelObj.level;

  return (
    <Card className="relative overflow-hidden border-2 border-mega-green/40 bg-gradient-to-br from-mega-green/5 via-background to-background shadow-xl">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue"></div>

      {/* Background accent */}
      <motion.div
        className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-mega-green/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <CardContent className="relative p-12">
        <div className="text-center">
          {/* Animated Score */}
          <motion.div
            className="relative mb-8 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              className="font-mono text-8xl font-bold text-mega-green"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {animatedScore}
            </motion.div>
          </motion.div>

          <motion.div
            className="mb-8 text-sm font-semibold uppercase tracking-widest text-mega-green"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your MegaReputation
          </motion.div>

          <motion.div
            className="mb-8 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Badge className="border border-mega-blue/30 bg-mega-blue/20 px-4 py-2 text-mega-blue transition-colors hover:bg-mega-blue/30">
              <Crown className="mr-2 h-4 w-4" />
              Level {level}
            </Badge>
          </motion.div>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-sm text-foreground/60">Ready to mint your exclusive NFT badge?</p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
