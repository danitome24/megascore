import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useScoreStore } from "@/lib/store/score-store";
import { useUpdateScore } from "@/hooks/score/use-update-score";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import type { Rank } from "@/types/common";

export function ScoreDisplaySection() {
  const { currentScore, updatedScore, scoreIncrease } = useScoreStore();
  const { isScoreAnimating } = useUpdateScore();

  const scoreIncreased = updatedScore !== null;

  // Animate score from current to updated
  const targetScore = scoreIncreased && updatedScore ? updatedScore : currentScore;
  const animatedScore = useCounterAnimation(
    currentScore,
    targetScore,
    1500,
    scoreIncreased && updatedScore !== null
  );

  // Calculate rank dynamically
  const rank: Rank = {
    rank: 156,
    level: Math.floor(currentScore / 100),
    percentile: 85,
    nextLevelAt: 1000,
  };

  return (
    <Card className="bg-background border-2 border-foreground/20 shadow-xl overflow-hidden relative mb-6">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue"></div>
      <CardContent className="p-8">
        <div className="text-center">
          <motion.div
            className={`
              flex items-center justify-center gap-3 mb-4
              transition-all duration-300 relative
              ${isScoreAnimating ? "scale-110" : "scale-100"}
            `}
            animate={scoreIncreased ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              className={`
                text-6xl font-bold font-mono tracking-tight
                ${scoreIncreased ? "text-mega-green" : "text-foreground"}
              `}
              key={`score-${targetScore}`}
            >
              {animatedScore}
            </motion.div>
            {scoreIncreased && (
              <motion.div
                className="text-3xl font-bold text-mega-green animate-bounce"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                +{scoreIncrease}
              </motion.div>
            )}
            {/* Celebration particles */}
            {scoreIncreased && (
              <>
                <motion.div
                  className="absolute -top-4 -left-4 w-3 h-3 bg-mega-coral rounded-full animate-ping"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 w-2 h-2 bg-mega-blue rounded-full animate-ping animation-delay-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
                <motion.div
                  className="absolute -top-4 -right-4 w-2 h-2 bg-mega-green rounded-full animate-ping animation-delay-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-3 h-3 bg-mega-pink rounded-full animate-ping animation-delay-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                />
              </>
            )}
          </motion.div>
          <div className="text-xl text-foreground/70 mb-6 uppercase tracking-wide">
            MegaReputation Score
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge className="bg-mega-coral text-white px-4 py-2 text-base">
              <Trophy className="w-5 h-5 mr-2" />
              Rank #{rank.rank}
            </Badge>
            <Badge className="bg-mega-blue text-white px-4 py-2 text-base">
              Level {rank.level}
            </Badge>
            <Badge className="bg-mega-green text-white px-4 py-2 text-base">
              {rank.percentile}th Percentile
            </Badge>
          </div>
          <div className="max-w-md mx-auto space-y-3">
            <div className="flex justify-between text-base text-foreground/70">
              <span>Progress to Level {rank.level + 1}</span>
              <span>
                {Math.round((currentScore / rank.nextLevelAt) * 100)}%
              </span>
            </div>
            <Progress
              value={(currentScore / rank.nextLevelAt) * 100}
              className="h-4 bg-foreground/10"
            />
            <div className="text-sm text-foreground/60">
              {rank.nextLevelAt - currentScore} points to next level
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
