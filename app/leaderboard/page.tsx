"use client";

import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Crown } from "lucide-react";

export default function LeaderboardPage() {
  // Generate 50 mock leaderboard entries with deterministic data
  const generateLeaderboardData = () => {
    const addresses = [
      "0x1234...5678",
      "0x2345...6789",
      "0x3456...7890",
      "0x4567...8901",
      "0x5678...9012",
      "0x6789...0123",
      "0x7890...1234",
      "0x8901...2345",
      "0x9012...3456",
      "0x0123...4567",
      "0xabcd...ef01",
      "0xbcde...f012",
      "0xcdef...0123",
      "0xdef0...1234",
      "0xef01...2345",
      "0xf012...3456",
      "0x0123...4567",
      "0x1234...5678",
      "0x2345...6789",
      "0x3456...7890",
      "0x4567...8901",
      "0x5678...9012",
      "0x6789...0123",
      "0x7890...1234",
      "0x8901...2345",
      "0x9012...3456",
      "0x0123...4567",
      "0x1234...5678",
      "0x2345...6789",
      "0x3456...7890",
      "0x4567...8901",
      "0x5678...9012",
      "0x6789...0123",
      "0x7890...1234",
      "0x8901...2345",
      "0x9012...3456",
      "0x0123...4567",
      "0x1234...5678",
      "0x2345...6789",
      "0x3456...7890",
      "0x4567...8901",
      "0x5678...9012",
      "0x6789...0123",
      "0x7890...1234",
      "0x8901...2345",
      "0x9012...3456",
      "0x0123...4567",
      "0x1234...5678",
      "0x2345...6789",
      "0x3456...7890",
    ];

    const data = [];

    // Use deterministic values instead of Math.random()
    const scoreVariations = [
      5, -3, 8, 2, -1, 12, 7, -5, 15, 3, -2, 9, 4, -7, 11, 6, -4, 13, 1, -6,
    ];

    for (let i = 1; i <= 50; i++) {
      const baseScore =
        3000 - (i - 1) * 45 + scoreVariations[i % scoreVariations.length];
      const level = Math.max(1, Math.floor(baseScore / 250));

      data.push({
        rank: i,
        address:
          addresses[i % addresses.length] ||
          `0x${i.toString(16).padStart(4, "0")}...${(i * 123)
            .toString(16)
            .slice(-4)}`,
        score: baseScore,
        level,
      });
    }

    return data;
  };

  const leaderboardData = generateLeaderboardData();

  const getRankIcon = (rank: number) => {
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
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-foreground/10">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-foreground uppercase tracking-wide">
                Leaderboard
              </h1>
              <p className="text-base text-foreground/70">
                Top 50 MegaETH Network Performers
              </p>
            </div>
          </div>

          {/* Leaderboard */}
          <Card className="bg-background border-2 border-foreground/20 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mega-coral via-mega-pink to-mega-blue"></div>
            <CardHeader className="border-b border-foreground/10 p-6">
              <CardTitle className="flex items-center text-xl uppercase tracking-wide">
                <Trophy className="w-6 h-6 mr-3 text-mega-coral" />
                MegaReputation Rankings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {leaderboardData.map((user, index) => (
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
        </div>
      </div>
    </PageContainer>
  );
}
