import { Card, CardContent } from "@/components/ui/card";
import { Crown, Medal, Trophy } from "lucide-react";

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
      return <Crown className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Trophy className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Medal className="h-6 w-6 text-amber-600" />;
    default:
      return (
        <div className="flex h-8 w-8 items-center justify-center font-mono text-lg font-bold text-foreground">
          {rank}
        </div>
      );
  }
}

export function List({ users }: ListProps) {
  return (
    <>
      {/* Leaderboard Card */}
      <Card className="relative overflow-hidden border-2 border-foreground/20 bg-background shadow-xl">
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue"></div>
        <div className="border-b border-foreground/10 p-6">
          <div className="flex items-center text-xl font-bold uppercase tracking-wide">
            <Trophy className="mr-3 h-6 w-6 text-mega-coral" />
            MegaReputation Rankings
          </div>
        </div>
        <CardContent className="p-6">
          <div className="space-y-3">
            {users.map((user, index) => (
              <div
                key={index}
                className={`flex items-center justify-between rounded-lg p-4 transition-all duration-200 hover:bg-foreground/5 ${
                  user.rank <= 3
                    ? "border border-mega-coral/20 bg-gradient-to-r from-mega-coral/10 via-mega-pink/10 to-mega-blue/10"
                    : "border border-foreground/10"
                } `}
              >
                <div className="flex items-center space-x-6">
                  {/* Rank */}
                  <div className="flex w-12 items-center justify-center">{getRankIcon(user.rank)}</div>
                  {/* User Info */}
                  <div>
                    <div className="font-mono text-lg font-medium text-foreground">{user.address}</div>
                    <div className="mt-1 text-sm uppercase tracking-wide text-foreground/60">Level {user.level}</div>
                  </div>
                </div>
                {/* Score */}
                <div className="text-right">
                  <div className="font-mono text-2xl font-bold text-foreground">{user.score.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
