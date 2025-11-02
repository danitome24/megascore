import { Header } from "@/components/leaderboard/header";
import { List } from "@/components/leaderboard/list";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LeaderboardAccount } from "@/lib/domain/shared/types";
import { fetchLeaderboardData } from "@/lib/external/supabase/leaderboard";

// Disable caching for this page
export const revalidate = 0; // ISR: revalidate immediately (no cache)
export const dynamic = "force-dynamic"; // Force dynamic rendering

export default async function LeaderboardPage() {
  let data: LeaderboardAccount[] = [];
  let error: string | null = null;

  try {
    data = await fetchLeaderboardData();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch leaderboard";
    console.error("Error fetching leaderboard:", err);
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <Header />

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {data.length === 0 && !error && (
            <Alert className="mb-6">
              <AlertDescription>No leaderboard data available</AlertDescription>
            </Alert>
          )}

          {data.length > 0 && <List accounts={data} />}
        </div>
      </div>
    </>
  );
}
