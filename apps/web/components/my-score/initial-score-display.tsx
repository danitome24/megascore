"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Trophy, Zap } from "lucide-react";

interface InitialScoreDisplayProps {
  onCalculate: () => Promise<void>;
  isLoading?: boolean;
}

export function InitialScoreDisplay({ onCalculate, isLoading = false }: InitialScoreDisplayProps) {
  return (
    <Card className="relative overflow-hidden border-2 border-foreground/20 bg-background shadow-xl">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue"></div>
      <CardContent className="p-12">
        <div className="text-center">
          <motion.div
            className="relative mb-8 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div className="font-mono text-7xl font-bold text-foreground/40">0</motion.div>
          </motion.div>

          <div className="mb-8 text-xl uppercase tracking-wide text-foreground/70">MegaReputation Score</div>

          <div className="mb-8 flex flex-wrap justify-center gap-3">
            <Badge className="bg-foreground/10 px-4 py-2 text-foreground/50">
              <Trophy className="mr-2 h-4 w-4" />
              Not Ranked
            </Badge>
          </div>

          <p className="mb-8 max-w-md text-gray-400">
            Your score is currently 0. Click the button below to analyze your on-chain activity and calculate your
            reputation score.
          </p>

          <Button
            onClick={onCalculate}
            disabled={isLoading}
            size="lg"
            className="w-full bg-mega-coral hover:bg-mega-coral/90"
          >
            {isLoading ? (
              <>
                <Zap className="mr-2 h-5 w-5 animate-spin" />
                Calculating Your Score...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Calculate My Score
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
