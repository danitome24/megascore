"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import { getLevelByScore, getPointsToNextLevel } from "@/lib/domain/reputation/level";
import { motion } from "framer-motion";
import { CheckCircle2, Crown, Flame, Sparkles, TrendingUp, Trophy } from "lucide-react";

interface ScoreCalculatedDisplayProps {
  score: number;
  onMint: () => Promise<void>;
  isLoading?: boolean;
}

export function ScoreCalculatedDisplay({ score, onMint, isLoading = false }: ScoreCalculatedDisplayProps) {
  const animatedScore = useCounterAnimation(0, score, 1000, true);
  const levelObj = getLevelByScore(score);
  const level = levelObj.level;
  const pointsToNext = getPointsToNextLevel(score);
  const percentile = Math.min(95, Math.floor((score / 1000) * 100) + 50);

  return (
    <div className="space-y-6">
      {/* Score Display Card */}
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
              <Badge className="border border-mega-coral/30 bg-mega-coral/20 px-4 py-2 text-mega-coral transition-colors hover:bg-mega-coral/30">
                <Trophy className="mr-2 h-4 w-4" />
                Level #{1000 - score}
              </Badge>
              <Badge className="border border-mega-blue/30 bg-mega-blue/20 px-4 py-2 text-mega-blue transition-colors hover:bg-mega-blue/30">
                <Crown className="mr-2 h-4 w-4" />
                Level {level}
                {pointsToNext !== null && (
                  <span className="ml-2 text-xs text-foreground/60">({pointsToNext} to next)</span>
                )}
              </Badge>
              <Badge className="border border-mega-green/30 bg-mega-green/20 px-4 py-2 text-mega-green transition-colors hover:bg-mega-green/30">
                <TrendingUp className="mr-2 h-4 w-4" />
                {percentile}th Percentile
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

      {/* Mint CTA Card: Only show if account has a score */}
      {score > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="relative overflow-hidden border-2 border-mega-pink/40 bg-gradient-to-br from-mega-pink/5 via-background to-background shadow-lg">
            {/* Background accent */}
            <motion.div
              className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-mega-pink/10 blur-3xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <CardContent className="relative p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-mega-pink" />
                    <h3 className="text-lg font-bold text-mega-pink">Lock in Your Score</h3>
                  </div>
                  <p className="text-sm text-foreground/60">
                    Mint an exclusive NFT badge to permanently record your reputation on-chain
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-mega-pink/20 bg-mega-pink/5 p-4">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-foreground/50">Cost</p>
                    <p className="text-xl font-bold text-mega-pink">5 USDT</p>
                  </div>
                  <Sparkles className="h-8 w-8 text-mega-pink/40" />
                </div>

                <Button
                  onClick={onMint}
                  disabled={isLoading}
                  size="lg"
                  className="h-12 w-full bg-gradient-to-r from-mega-pink to-mega-coral text-base font-semibold shadow-lg transition-all hover:from-mega-pink/90 hover:to-mega-coral/90 hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="mr-3 h-5 w-5 animate-spin" />
                      Minting Your NFT...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-3 h-5 w-5" />
                      Mint NFT Badge
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-foreground/40">
                  This will initiate a secure transaction to mint your exclusive reputation NFT
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
