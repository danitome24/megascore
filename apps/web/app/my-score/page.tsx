"use client";

import { useEffect, useState } from "react";
import { ConnectWalletPrompt } from "@/components/layout/connect-wallet-prompt";
import { DataGatheredSection } from "@/components/my-score/data-gathered-section";
import { MyScoreHeader } from "@/components/my-score/header";
import { InitialScoreDisplay } from "@/components/my-score/initial-score-display";
import { NFTDisplaySection } from "@/components/my-score/nft-display-section";
import { ScoreCalculatedDisplay } from "@/components/my-score/score-calculated-display";
import { ScoreDisplaySection } from "@/components/my-score/score-display-section";
import { Loading } from "@/components/ui/loading";
import { useAccountInitialization } from "@/hooks/account/use-account-initialization";
import { useReputation } from "@/hooks/reputation/use-reputation";
import { useScoreCalculation } from "@/hooks/score/use-score-calculation";
import { useAccountStore } from "@/store/account-store";
import { useMetricsStore } from "@/store/metrics-store";
import { useScoreStore } from "@/store/score-store";
import { useAccount } from "wagmi";

type ScoreState = "loading" | "initial" | "calculated" | "minted";

export default function MyScorePage() {
  // Wallet connection
  const { status } = useAccount();

  // Page state
  const [scoreState, setScoreState] = useState<ScoreState>("loading");

  // Store data
  const { currentScore, setCurrentScore } = useScoreStore();
  const { currentMetrics, setCurrentMetrics } = useMetricsStore();
  const { isLoading: accountLoading, account } = useAccountStore();

  // Hooks
  useAccountInitialization();
  const { calculateScore, isCalculating } = useScoreCalculation();
  const { mint, isMinting } = useReputation();

  // Determine score state based on stores
  useEffect(() => {
    if (accountLoading) {
      setScoreState("loading");
    } else if (account?.mintedAt) {
      setScoreState("minted");
    } else if (currentMetrics && currentScore > 0) {
      setScoreState("calculated");
    } else if (currentScore === 0 && !currentMetrics) {
      setScoreState("initial");
    }
  }, [accountLoading, account?.mintedAt, currentScore, currentMetrics]);

  const handleCalculateScore = async () => {
    const result = await calculateScore();
    if (result.success && result.score && result.metrics) {
      setCurrentScore(result.score);
      setCurrentMetrics(result.metrics);
      setScoreState("calculated");
    }
  };

  const handleMintNFT = async () => {
    if (!currentMetrics) return;
    const result = await mint(currentScore, currentMetrics);
    if (result.success) {
      setScoreState("minted");
    }
  };

  // Show loading while wagmi is checking connection status
  if (status === "connecting" || status === "reconnecting") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading title="Welcome" className="py-12" />
      </div>
    );
  }

  // Show connect wallet screen if not connected
  if (status !== "connected") {
    return <ConnectWalletPrompt />;
  }

  // Show score page if connected
  return (
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
  );
}
