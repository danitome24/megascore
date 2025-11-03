import { useEffect } from "react";
import { fetchAccountData } from "@/lib/external/api/account";
import { useAccountStore } from "@/store/account-store";
import { useMetricsStore } from "@/store/metrics-store";
import { useScoreStore } from "@/store/score-store";
import { useAccount } from "wagmi";

/**
 * Hook: Fetch account data on mount and address change
 * Returns the fetched data and loading/error states
 */
export function useAccountInitialization() {
  const { address } = useAccount();
  const { setAccount, setLoading, setError } = useAccountStore();
  const { setCurrentScore, setHasNFT } = useScoreStore();
  const { setCurrentMetrics } = useMetricsStore();

  useEffect(() => {
    if (!address) {
      return;
    }

    let isMounted = true;
    setLoading(true);

    (async () => {
      try {
        const data = await fetchAccountData(address);

        if (!isMounted) return;

        if (data) {
          const { account, score, metrics } = data;

          setAccount(account);
          setCurrentScore(score.score ?? 0);
          setHasNFT(!!account.mintedAt);
          setCurrentMetrics(metrics.data);
          setError(null);
        } else {
          setAccount(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching account data:", error);
          setError(error as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [address, setAccount, setCurrentScore, setHasNFT, setCurrentMetrics, setLoading, setError]);
}
