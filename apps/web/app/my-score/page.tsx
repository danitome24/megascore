"use client";

import { useEffect, useState } from "react";
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
import { ConnectKitButton } from "connectkit";
import { Wallet } from "lucide-react";
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
    return (
      <div className="mt-14 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mega-coral/10">
              <Wallet className="h-8 w-8 text-mega-coral" />
            </div>
          </div>

          <h1 className="mb-3 text-3xl font-bold uppercase tracking-wider">Connect Your Wallet</h1>
          <p className="mb-8 text-foreground/70">
            Connect your wallet to view your MegaScore, track your on-chain reputation, and access your Soulbound NFT.
          </p>

          <ConnectKitButton.Custom>
            {({ show, isConnecting }) => (
              <button
                onClick={show}
                disabled={isConnecting}
                className="mx-auto flex items-center gap-2 rounded-none border-2 border-mega-coral/50 bg-mega-coral px-8 py-3 text-sm font-medium uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:border-mega-coral hover:bg-mega-coral/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Wallet size={16} />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </ConnectKitButton.Custom>
        </div>
      </div>
    );
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
