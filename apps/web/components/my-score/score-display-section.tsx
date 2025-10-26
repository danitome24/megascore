import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUpdateScore } from "@/hooks/score/use-update-score";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import { getPointsToNextRank, getRankByScore } from "@/lib/domain/score/ranks";
import { useScoreStore } from "@/store/score-store";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export function ScoreDisplaySection() {
  const { currentScore, updatedScore, scoreIncrease } = useScoreStore();
  const { isScoreAnimating } = useUpdateScore();

  const scoreIncreased = updatedScore !== null;

  // Animate score from current to updated
  const targetScore = scoreIncreased && updatedScore ? updatedScore : currentScore;
  const animatedScore = useCounterAnimation(currentScore, targetScore, 1500, scoreIncreased && updatedScore !== null);

  // Calculate rank dynamically
  const rankObj = getRankByScore(currentScore);
  const rank = rankObj.rank;
  // Find next level's minScore, or Infinity if at max
  const nextRankObj = getRankByScore(rankObj.maxScore + 1);
  const nextLevelAt = nextRankObj && nextRankObj.rank > rank ? nextRankObj.minScore : Infinity;
  const pointsToNext = getPointsToNextRank(currentScore);
  const percentile = Math.min(95, Math.floor((currentScore / 1000) * 100) + 50);
  // Progress within current level
  const progress =
    nextLevelAt !== Infinity ? ((currentScore - rankObj.minScore) / (nextLevelAt - rankObj.minScore)) * 100 : 100;

  return (
    <Card className="relative mb-6 overflow-hidden border-2 border-foreground/20 bg-background shadow-xl">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue"></div>
      <CardContent className="p-8">
        <div className="text-center">
          <motion.div
            className={`relative mb-4 flex items-center justify-center gap-3 transition-all duration-300 ${isScoreAnimating ? "scale-110" : "scale-100"} `}
            animate={scoreIncreased ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              className={`font-mono text-6xl font-bold tracking-tight ${scoreIncreased ? "text-mega-green" : "text-foreground"} `}
              key={`score-${targetScore}`}
            >
              {animatedScore}
            </motion.div>
            {scoreIncreased && (
              <motion.div
                className="animate-bounce text-3xl font-bold text-mega-green"
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
                  className="absolute -left-4 -top-4 h-3 w-3 animate-ping rounded-full bg-mega-coral"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                />
                <motion.div
                  className="animation-delay-300 absolute -bottom-4 -right-4 h-2 w-2 animate-ping rounded-full bg-mega-blue"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
                <motion.div
                  className="animation-delay-500 absolute -right-4 -top-4 h-2 w-2 animate-ping rounded-full bg-mega-green"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                />
                <motion.div
                  className="animation-delay-700 absolute -bottom-4 -left-4 h-3 w-3 animate-ping rounded-full bg-mega-pink"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                />
              </>
            )}
          </motion.div>
          <div className="mb-6 text-xl uppercase tracking-wide text-foreground/70">MegaReputation Score</div>
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            <Badge className="bg-mega-coral px-4 py-2 text-base text-white">
              <Trophy className="mr-2 h-5 w-5" />
              Rank #{rank}
            </Badge>
            {/* <Badge className="bg-mega-blue px-4 py-2 text-base text-white">Percentile {percentile}</Badge> */}
          </div>
          <div className="mx-auto max-w-md space-y-3">
            <div className="flex justify-between text-base text-foreground/70">
              <span>Progress to Next Rank</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-4 bg-foreground/10" />
            <div className="text-sm text-foreground/60">
              {pointsToNext !== null ? `${pointsToNext} points to next rank` : "Max rank reached"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
