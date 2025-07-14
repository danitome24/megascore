import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Medal, Crown } from "lucide-react";

export interface User {
  rank: number;
  address: string;
  score: number;
  level: number;
}

interface ListProps {
  users: User[];
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-500" />;
    case 2:
      return <Trophy className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Medal className="w-6 h-6 text-amber-600" />;
    default:
      return (
        <div className="w-8 h-8 flex items-center justify-center text-lg font-bold text-foreground font-mono">
          {rank}
        </div>
      );
  }
}

export function List({ users }: ListProps) {
  return (
    <>
      {/* Leaderboard Card */}
      <Card className="bg-background border-2 border-foreground/20 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue"></div>
        <div className="border-b border-foreground/10 p-6">
          <div className="flex items-center text-xl uppercase tracking-wide font-bold">
            <Trophy className="w-6 h-6 mr-3 text-mega-coral" />
            MegaReputation Rankings
          </div>
        </div>
        <CardContent className="p-6">
          <div className="space-y-3">
            {users.map((user, index) => (
              <div
                key={index}
                className={`
                  flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:bg-foreground/5
                  ${
                    user.rank <= 3
                      ? "bg-gradient-to-r from-mega-coral/10 via-mega-pink/10 to-mega-blue/10 border border-mega-coral/20"
                      : "border border-foreground/10"
                  }
                `}
              >
                <div className="flex items-center space-x-6">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(user.rank)}
                  </div>
                  {/* User Info */}
                  <div>
                    <div className="font-mono text-lg font-medium text-foreground">
                      {user.address}
                    </div>
                    <div className="text-sm text-foreground/60 uppercase tracking-wide mt-1">
                      Level {user.level}
                    </div>
                  </div>
                </div>
                {/* Score */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground font-mono">
                    {user.score.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
