"use client";

import { ConnectOverlay } from "@/components/layout/connect-overlay";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/leaderboard/header";
import { List } from "@/components/leaderboard/list";
import { useLeaderboardData } from "@/hooks/leaderboard/use-leaderboard-data";

export default function LeaderboardPage() {
  const leaderboardData = useLeaderboardData();

  return (
    <PageContainer>
      <ConnectOverlay>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <Header />
            <List users={leaderboardData} />
          </div>
        </div>
      </ConnectOverlay>
    </PageContainer>
  );
}
