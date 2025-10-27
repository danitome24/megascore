"use client";

import { useEffect, useState } from "react";
import type { User } from "../../components/leaderboard/list";
import { fetchLeaderboardData } from "@/lib/external/supabase/leaderboard";

interface UseLeaderboardDataReturn {
  data: User[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook to fetch and manage leaderboard data from Supabase.
 * Returns data, loading state, and error if any.
 */
export function useLeaderboardData(): UseLeaderboardDataReturn {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadLeaderboard() {
      try {
        setLoading(true);
        setError(null);

        const leaderboardData = await fetchLeaderboardData();

        if (isMounted) {
          setData(leaderboardData);
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : "Failed to fetch leaderboard";
          setError(message);
          console.error("Error loading leaderboard:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
