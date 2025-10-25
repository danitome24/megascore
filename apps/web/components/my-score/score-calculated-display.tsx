"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles, Trophy } from "lucide-react";

interface ScoreCalculatedDisplayProps {
  score: number;
  onMint: () => Promise<void>;
  isLoading?: boolean;
}

export function ScoreCalculatedDisplay({ score, onMint, isLoading = false }: ScoreCalculatedDisplayProps) {
  const animatedScore = useCounterAnimation(0, score, 1000, true);
  const rank = Math.floor(score / 100);
  const percentile = Math.min(95, Math.floor((score / 1000) * 100) + 50);

  return (
    <div className="space-y-6">
      {/* Score Display Card */}
      <Card className="relative overflow-hidden border-2 border-mega-green/30 bg-background shadow-xl">
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue"></div>
        <CardContent className="p-12">
          <div className="text-center">
            <motion.div
              className="relative mb-6 flex items-center justify-center gap-3"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <motion.div
                className="font-mono text-7xl font-bold text-mega-green"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {animatedScore}
              </motion.div>

              {/* Celebration animation */}
              <motion.div
                className="absolute text-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: -20 }}
                transition={{ delay: 0.5, duration: 1, repeat: Infinity }}
              >
                ✨
              </motion.div>
            </motion.div>

            <motion.div
              className="mb-8 text-xl uppercase tracking-wide text-foreground/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              MegaReputation Score
            </motion.div>

            <motion.div
              className="mb-8 flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Badge className="bg-mega-coral px-4 py-2 text-white">
                <Trophy className="mr-2 h-4 w-4" />
                Rank #{1000 - score}
              </Badge>
              <Badge className="bg-mega-blue px-4 py-2 text-white">Level {rank}</Badge>
              <Badge className="bg-mega-green px-4 py-2 text-white">{percentile}th Percentile</Badge>
            </motion.div>

            <motion.div
              className="mb-8 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="mb-2 flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-mega-green" />
                Score calculated successfully
              </div>
              Ready to mint your NFT badge?
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Mint CTA Card */}
      <Card className="border-2 border-mega-pink/30 bg-gradient-to-br from-mega-pink/5 to-transparent">
        <CardContent className="p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="mb-1 text-lg font-semibold text-mega-pink">Lock in Your Score</h3>
              <p className="text-sm text-gray-400">Mint an exclusive NFT badge to permanently record your reputation</p>
            </div>
            <Badge className="whitespace-nowrap bg-mega-green text-white">5 USDT</Badge>
          </div>
          <Button
            onClick={onMint}
            disabled={isLoading}
            size="lg"
            className="w-full bg-gradient-to-r from-mega-pink to-mega-coral hover:from-mega-pink/90 hover:to-mega-coral/90"
          >
            {isLoading ? (
              <>
                <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                Minting NFT...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Mint NFT - 5 USDT
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
