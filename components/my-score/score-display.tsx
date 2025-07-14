import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import type { Score } from "@/types/common";

interface ScoreDisplayProps {
  userScore: Score;
  scoreIncreased: boolean;
  scoreIncrease: number;
  isScoreAnimating: boolean;
}

export function ScoreDisplay({
  userScore,
  scoreIncreased,
  scoreIncrease,
  isScoreAnimating,
}: ScoreDisplayProps) {
  return (
    <Card className="bg-background border-2 border-foreground/20 shadow-xl overflow-hidden relative mb-6">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue"></div>
      <CardContent className="p-8">
        <div className="text-center">
          <div
            className={`
              flex items-center justify-center gap-3 mb-4
              transition-all duration-300 relative
              ${isScoreAnimating ? "scale-110" : "scale-100"}
            `}
          >
            <div
              className={`
                text-6xl font-bold font-mono tracking-tight
                ${scoreIncreased ? "text-mega-green" : "text-foreground"}
              `}
            >
              {userScore.total}
            </div>
            {scoreIncreased && (
              <div className="text-3xl font-bold text-mega-green animate-bounce">
                +{scoreIncrease}
              </div>
            )}
            {/* Celebration particles */}
            {scoreIncreased && (
              <>
                <div className="absolute -top-4 -left-4 w-3 h-3 bg-mega-coral rounded-full animate-ping"></div>
                <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-mega-blue rounded-full animate-ping animation-delay-300"></div>
                <div className="absolute -top-4 -right-4 w-2 h-2 bg-mega-green rounded-full animate-ping animation-delay-500"></div>
                <div className="absolute -bottom-4 -left-4 w-3 h-3 bg-mega-pink rounded-full animate-ping animation-delay-700"></div>
              </>
            )}
          </div>
          <div className="text-xl text-foreground/70 mb-6 uppercase tracking-wide">
            MegaReputation Score
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge className="bg-mega-coral text-white px-4 py-2 text-base">
              <Trophy className="w-5 h-5 mr-2" />
              Rank #{userScore.rank}
            </Badge>
            <Badge className="bg-mega-blue text-white px-4 py-2 text-base">
              Level {userScore.level}
            </Badge>
            <Badge className="bg-mega-green text-white px-4 py-2 text-base">
              {userScore.percentile}th Percentile
            </Badge>
          </div>
          <div className="max-w-md mx-auto space-y-3">
            <div className="flex justify-between text-base text-foreground/70">
              <span>Progress to Level {userScore.level + 1}</span>
              <span>
                {Math.round((userScore.total / userScore.nextLevelAt) * 100)}%
              </span>
            </div>
            <Progress
              value={(userScore.total / userScore.nextLevelAt) * 100}
              className="h-4 bg-foreground/10"
            />
            <div className="text-sm text-foreground/60">
              {userScore.nextLevelAt - userScore.total} points to next level
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
