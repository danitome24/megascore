"use client";

import { useEffect, useState } from "react";
import { ConnectOverlay } from "@/components/layout/connect-overlay";
import { DataGatheredSection } from "@/components/my-score/data-gathered-section";
import { MyScoreHeader } from "@/components/my-score/header";
import { InitialScoreDisplay } from "@/components/my-score/initial-score-display";
import { NFTDisplaySection } from "@/components/my-score/nft-display-section";
import { ScoreCalculatedDisplay } from "@/components/my-score/score-calculated-display";
import { ScoreDisplaySection } from "@/components/my-score/score-display-section";
import { Loading } from "@/components/ui/loading";
import { useMintReputation } from "@/hooks/contracts/use-mint-reputation";
import { MetricScore } from "@/lib/domain/reputation/types";
import { createAccount as apiCreateAccount, fetchAccountData } from "@/lib/external/api/account";
import { createMetrics as apiCreateMetrics } from "@/lib/external/api/metrics";
import { createScore as apiCreateScore } from "@/lib/external/api/score";
import { useAccountStore } from "@/store/account-store";
import { useMetricsStore } from "@/store/metrics-store";
import { useScoreStore } from "@/store/score-store";
import { useAccount } from "wagmi";

export default function MyScorePage() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [scoreState, setScoreState] = useState<"loading" | "initial" | "calculated" | "minted">("loading");

  const { address } = useAccount();
  const { setCurrentScore, setHasNFT, currentScore } = useScoreStore();
  const { setCurrentMetrics } = useMetricsStore();
  const { setAccount, setLoading: setAccountLoading, setError: setAccountError } = useAccountStore();
  const { mintReputation, isMinting } = useMintReputation();

  // Fetch account data on mount and address change
  useEffect(() => {
    if (!address) {
      setScoreState("initial");
      return;
    }

    let isMounted = true;
    setScoreState("loading");
    setAccountLoading(true);

    (async () => {
      try {
        const data = await fetchAccountData(address);

        if (!isMounted) return;

        if (data) {
          const { account, score } = data;
          const hasNFT = !!account.mintedAt;
          const scoreValue = score?.score ?? 0;

          // Update stores
          setAccount(account);
          setCurrentScore(scoreValue);
          setHasNFT(hasNFT);

          // Determine state
          setScoreState(hasNFT ? "minted" : scoreValue > 0 ? "calculated" : "initial");
          setAccountError(null);
        } else {
          setScoreState("initial");
          setAccount(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching account data:", error);
          setAccountError(error as Error);
          setScoreState("initial");
        }
      } finally {
        if (isMounted) {
          setAccountLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [address, setAccount, setCurrentScore, setHasNFT, setCurrentMetrics, setAccountLoading, setAccountError]);

  const handleCalculateScore = async () => {
    if (!address) return;
    setIsCalculating(true);
    try {
      // Call API to calculate score
      const response = await fetch(`/api/score/calculate?wallet=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to calculate score");
      }

      const data = await response.json();
      const calculatedScore = data.reputation.totalScore as number;
      const breakdownMetrics = data.reputation.breakdown as MetricScore[];

      setCurrentScore(calculatedScore);
      setScoreState("calculated");
      setCurrentMetrics(breakdownMetrics);
    } catch (error) {
      console.error("Error calculating score:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleMintNFT = async () => {
    if (!address || !currentScore) return;
    try {
      setAccountLoading(true);

      // 1. Call blockchain minting logic using the hook
      const txHash = await mintReputation(currentScore);

      // 2. Create account in DB with mint_tx
      const newAccountData = await apiCreateAccount(address, txHash);

      // 3. Update account store with full account data
      setAccount(newAccountData);

      // 4. Create score record
      await apiCreateScore(newAccountData.id, currentScore);

      // 5. Create metrics
      // await apiCreateMetrics(newAccountData.id, metricsData);

      setHasNFT(true);
      setScoreState("minted");
      setAccountError(null);
    } catch (error) {
      console.error("Minting or DB error:", error);
      setAccountError(error as Error);
    } finally {
      setAccountLoading(false);
    }
  };

  return (
    <>
      <ConnectOverlay>
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <MyScoreHeader />

            {scoreState === "loading" && <Loading title="Loading your score..." className="py-12" />}

            {scoreState === "initial" && (
              <InitialScoreDisplay onCalculate={handleCalculateScore} isLoading={isCalculating} />
            )}

            {scoreState === "calculated" && (
              <ScoreCalculatedDisplay score={currentScore} onMint={handleMintNFT} isLoading={isMinting} />
            )}

            {scoreState === "minted" && (
              <>
                <ScoreDisplaySection />
                <NFTDisplaySection />
                <DataGatheredSection />
              </>
            )}
          </div>
        </div>
      </ConnectOverlay>
    </>
  );
}
