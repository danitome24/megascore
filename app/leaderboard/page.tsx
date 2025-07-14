"use client";

import { PageContainer } from "@/components/layout/page-container";
import { List } from "@/components/leaderboard/list";
import { useLeaderboardData } from "@/hooks/leaderboard/use-leaderboard-data";
import { Header } from "@/components/leaderboard/header";

export default function LeaderboardPage() {
  const leaderboardData = useLeaderboardData();

  return (
    <PageContainer>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Header />
          <List users={leaderboardData} />
        </div>
      </div>
    </PageContainer>
  );
}
