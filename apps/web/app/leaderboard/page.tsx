"use client";

import { ConnectOverlay } from "@/components/layout/connect-overlay";
import { PageContainer } from "@/components/layout/page-container";
import { Header } from "@/components/leaderboard/header";
import { List } from "@/components/leaderboard/list";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLeaderboardData } from "@/hooks/leaderboard/use-leaderboard-data";
import { Loader2 } from "lucide-react";

export default function LeaderboardPage() {
  const { data, loading, error } = useLeaderboardData();

  return (
    <PageContainer>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <Header />

          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-mega-coral" />
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!loading && data.length === 0 && !error && (
            <Alert className="mb-6">
              <AlertDescription>No leaderboard data available</AlertDescription>
            </Alert>
          )}

          {!loading && data.length > 0 && <List users={data} />}
        </div>
      </div>
    </PageContainer>
  );
}
